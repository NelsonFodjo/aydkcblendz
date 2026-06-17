import { useMemo, useState } from 'react'
import { Search, Download, CheckCircle } from 'lucide-react'
import { markAsPurchased } from '../../hooks/useRegistrations'
import { formatTimestamp, toCsv, downloadCsv } from '../../utils/formatters'

export default function RegistrantsPanel({ stats, loading, refresh }) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const rows = stats.rows || []
    const q = query.trim().toLowerCase()
    if (!q) return rows
    return rows.filter(
      (row) => row.name?.toLowerCase().includes(q) || row.whatsapp?.toLowerCase().includes(q),
    )
  }, [stats.rows, query])

  async function handleVerify(id) {
    try {
      await markAsPurchased(id)
      refresh()
    } catch {
      // surfaced implicitly: row simply won't update
    }
  }

  function handleExport() {
    const csv = toCsv(stats.rows || [])
    downloadCsv(csv, `kcblendz-ayd-registrations-${new Date().toISOString().slice(0, 10)}.csv`)
  }

  if (loading) {
    return <p className="text-neutral">Loading registrants...</p>
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral" size={16} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name or phone..."
            className="w-full border-2 border-gray-200 rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:border-lime focus:ring-2 focus:ring-lime/20 transition-colors duration-150"
          />
        </div>
        <button
          type="button"
          onClick={handleExport}
          className="flex items-center justify-center gap-1.5 border border-gray-200 text-ink rounded-lg px-4 py-2 font-medium hover:border-lime hover:bg-lime/5 transition-colors duration-200 shrink-0 min-h-11 sm:min-h-0"
        >
          <Download size={16} />
          CSV
        </button>
      </div>

      <p className="text-sm text-neutral">
        {filtered.length} registration{filtered.length !== 1 ? 's' : ''} found
      </p>

      <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-8 text-center text-neutral">No registrations found</div>
        ) : (
          filtered.map((row) => (
            <div
              key={row.id}
              className="flex items-center justify-between gap-3 p-4 hover:bg-gray-50 transition-colors duration-150"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-medium text-ink truncate">{row.name}</span>
                </div>
                <p className="text-sm text-neutral truncate">
                  {row.whatsapp} · {row.deanery}
                </p>
                {row.created_at && (
                  <p className="text-xs text-neutral mt-0.5">{formatTimestamp(row.created_at)}</p>
                )}
              </div>
              {row.verified_at ? (
                <span className="flex items-center gap-1 bg-lime text-ink text-xs font-medium rounded-full px-2.5 py-1 shrink-0">
                  <CheckCircle size={12} />
                  Verified
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => handleVerify(row.id)}
                  className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 hover:border-lime hover:bg-lime/5 transition-colors duration-200 shrink-0"
                >
                  Verify
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
