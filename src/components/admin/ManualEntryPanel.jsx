import { useState } from 'react'
import { Search } from 'lucide-react'
import VerificationResult from './VerificationResult'
import { useVerification } from '../../hooks/useVerification'
import { primaryButtonClasses } from '../../utils/uiClasses'

export default function ManualEntryPanel() {
  const [code, setCode] = useState('')
  const { result, status, confirmedAt, lookup, handleMarkPurchased } = useVerification()

  function handleSubmit(e) {
    e.preventDefault()
    lookup(code)
  }

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-display font-semibold text-ink mb-1">Manual Verification</h3>
        <p className="text-sm text-neutral mb-4">
          Paste the registration ID to verify manually
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Registration ID"
            className="flex-1 min-w-0 bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-xs outline-none transition-all duration-150 focus:border-lime focus:ring-4 focus:ring-lime/15"
          />
          <button
            type="submit"
            disabled={!code.trim()}
            className={`flex items-center justify-center gap-1.5 px-4 py-2 min-h-11 sm:min-h-0 ${primaryButtonClasses}`}
          >
            <Search size={16} />
            Verify
          </button>
        </form>
      </div>

      <VerificationResult
        status={status}
        result={result}
        confirmedAt={confirmedAt}
        onMarkPurchased={handleMarkPurchased}
      />
    </div>
  )
}
