import { useState } from 'react'
import { findRegistrationByQrCode, markAsPurchased } from './useRegistrations'

export function useVerification() {
  const [result, setResult] = useState(null)
  const [status, setStatus] = useState('')
  const [confirmedAt, setConfirmedAt] = useState(null)

  async function lookup(code) {
    setStatus('')
    setConfirmedAt(null)
    if (!code.trim()) return
    try {
      const registration = await findRegistrationByQrCode(code.trim())
      if (registration) {
        setResult(registration)
        setStatus('valid')
      } else {
        setResult(null)
        setStatus('invalid')
      }
    } catch {
      setResult(null)
      setStatus('error')
    }
  }

  async function handleMarkPurchased() {
    if (!result) return
    try {
      const updated = await markAsPurchased(result.id)
      setResult(updated)
      setConfirmedAt(updated.verified_at)
    } catch {
      setStatus('error')
    }
  }

  return { result, status, confirmedAt, lookup, handleMarkPurchased }
}
