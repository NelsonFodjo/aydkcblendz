import { useMemo, useState } from 'react'
import { Search, FileText, CheckCircle } from 'lucide-react'
import { markAsPurchased } from '../../hooks/useRegistrations'
import { formatTimestamp, printRegistrationsPdf } from '../../utils/formatters'
import { secondaryButtonClasses } from '../../utils/uiClasses'

export default function RegistrantsPanel({ stats, loading, refresh }) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const rows = stats.rows || []
    const q = query.trim().toLowerCase()
    if (!q) return rows
    return rows.filter(
      (row) =>
        row.name?.toLowerCase().includes(q) ||
        row.whatsapp?.toLowerCase().includes(q) ||
        String(row.registration_number ?? '').includes(q),
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
    printRegistrationsPdf(stats.rows || [])
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
            placeholder="Search name, phone, or ID..."
            className="w-full bg-white border border-gray-200 rounded-xl pl-9 pr-3 py-2 shadow-xs outline-none transition-all duration-150 focus:border-lime focus:ring-4 focus:ring-lime/15"
          />
        </div>
        <button
          type="button"
          onClick={handleExport}
          className={`flex items-center justify-center gap-1.5 text-ink px-4 py-2 shrink-0 min-h-11 sm:min-h-0 ${secondaryButtonClasses}`}
        >
          <FileText size={16} />
          PDF
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
                  {row.registration_number != null && (
                    <span className="text-xs text-neutral shrink-0">#{row.registration_number}</span>
                  )}
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
                  Purchased
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => handleVerify(row.id)}
                  className={`text-sm px-3 py-1.5 shrink-0 ${secondaryButtonClasses}`}
                >
                  Mark Purchased
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
