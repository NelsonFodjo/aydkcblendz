import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../utils/supabase'

export function useRegistrationCount() {
  const [count, setCount] = useState(0)

  const refresh = useCallback(async () => {
    const { count: total } = await supabase
      .from('registrations')
      .select('*', { count: 'exact', head: true })
    setCount(total ?? 0)
  }, [])

  useEffect(() => {
    queueMicrotask(refresh)

    const channel = supabase
      .channel('registrations-count')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'registrations' }, () => {
        refresh()
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [refresh])

  return count
}

export async function insertRegistration(data) {
  const { data: inserted, error } = await supabase
    .from('registrations')
    .insert(data)
    .select()
    .single()
  if (error) throw error
  return inserted
}

export async function updateRegistration(id, data) {
  const { error } = await supabase.from('registrations').update(data).eq('id', id)
  if (error) throw error
}

export async function findRegistrationByQrCode(qrCodeId) {
  const { data, error } = await supabase
    .from('registrations')
    .select('*')
    .eq('qr_code_id', qrCodeId)
    .maybeSingle()
  if (error) throw error
  return data
}

export async function markAsPurchased(id) {
  const { data, error } = await supabase
    .from('registrations')
    .update({ verified_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function pickRaffleWinner() {
  const { data: candidates, error: fetchError } = await supabase
    .from('registrations')
    .select('*')
    .not('verified_at', 'is', null)
  if (fetchError) throw fetchError
  if (!candidates || candidates.length === 0) {
    throw new Error('No purchasers to pick from yet.')
  }

  const winner = candidates[Math.floor(Math.random() * candidates.length)]

  const { error: clearError } = await supabase
    .from('registrations')
    .update({ is_winner: false })
    .eq('is_winner', true)
  if (clearError) throw clearError

  const { data: updated, error: setError } = await supabase
    .from('registrations')
    .update({ is_winner: true })
    .eq('id', winner.id)
    .select()
    .single()
  if (setError) throw setError
  return updated
}

export async function fetchRaffleWinner() {
  const { data, error } = await supabase
    .from('registrations')
    .select('*')
    .eq('is_winner', true)
    .maybeSingle()
  if (error) throw error
  return data
}

export async function fetchAllRegistrations() {
  const { data, error } = await supabase
    .from('registrations')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export function useAdminStats() {
  const [stats, setStats] = useState({
    total: 0,
    verified: 0,
    pending: 0,
    purchasedToday: 0,
    topDeaneries: [],
    productBreakdown: [],
    sourceBreakdown: [],
    dailyRegistrations: [],
    recentRegistrations: [],
    rows: [],
  })
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    setLoading(true)
    const rows = await fetchAllRegistrations()

    const total = rows.length
    const verified = rows.filter((r) => r.verified_at).length
    const pending = total - verified

    const today = new Date().toISOString().slice(0, 10)
    const purchasedToday = rows.filter((r) => r.verified_at?.slice(0, 10) === today).length

    const deaneryCounts = {}
    const productCounts = {}
    const sourceCounts = {}
    const dailyCounts = {}
    for (const row of rows) {
      if (row.deanery) deaneryCounts[row.deanery] = (deaneryCounts[row.deanery] || 0) + 1
      if (row.product_interest) {
        productCounts[row.product_interest] = (productCounts[row.product_interest] || 0) + 1
      }
      if (row.conviction_source) {
        sourceCounts[row.conviction_source] = (sourceCounts[row.conviction_source] || 0) + 1
      }
      const day = row.created_at?.slice(0, 10)
      if (day) dailyCounts[day] = (dailyCounts[day] || 0) + 1
    }

    const topDeaneries = Object.entries(deaneryCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([deanery, count]) => ({ deanery, count }))

    const productBreakdown = Object.entries(productCounts).map(([product, count]) => ({
      product,
      count,
      percentage: total > 0 ? Math.round((count / total) * 100) : 0,
    }))

    const sourceBreakdown = Object.entries(sourceCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([source, count]) => ({ source, count }))

    const dailyRegistrations = Object.entries(dailyCounts)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .slice(-7)
      .map(([date, count]) => ({ date, count }))

    const recentRegistrations = rows.slice(0, 5)

    setStats({
      total,
      verified,
      pending,
      purchasedToday,
      topDeaneries,
      productBreakdown,
      sourceBreakdown,
      dailyRegistrations,
      recentRegistrations,
      rows,
    })
    setLoading(false)
  }, [])

  useEffect(() => {
    queueMicrotask(refresh)

    const channel = supabase
      .channel('registrations-stats')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'registrations' }, () => {
        refresh()
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [refresh])

  return { stats, loading, refresh }
}
