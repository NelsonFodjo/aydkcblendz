import { CheckCircle2, XCircle } from 'lucide-react'
import { formatTimestamp } from '../../utils/formatters'

export default function VerificationResult({ status, result, confirmedAt, onMarkPurchased }) {
  if (status === 'valid' && result) {
    return (
      <div className="border border-lime/40 bg-lime/10 rounded-xl p-4 space-y-2">
        <p className="flex items-center gap-1.5 font-display font-semibold text-ink">
          <CheckCircle2 className="text-lime" size={18} />
          Valid Registration
        </p>
        <p className="text-neutral">
          <span className="font-medium text-ink">Name:</span> {result.name}
        </p>
        <p className="text-neutral">
          <span className="font-medium text-ink">WhatsApp:</span> {result.whatsapp}
        </p>
        <p className="text-neutral">
          <span className="font-medium text-ink">Registered:</span>{' '}
          {formatTimestamp(result.created_at)}
        </p>
        {result.verified_at ? (
          <p className="text-ink font-medium pt-1">
            ✅ Purchase verified at {formatTimestamp(confirmedAt || result.verified_at)}
          </p>
        ) : (
          <button
            type="button"
            onClick={onMarkPurchased}
            className="w-full bg-lime text-ink rounded-lg py-2.5 font-display font-semibold hover:bg-gold transition-colors duration-200 min-h-11"
          >
            MARK AS PURCHASED
          </button>
        )}
      </div>
    )
  }

  if (status === 'invalid') {
    return (
      <div className="flex items-center gap-1.5 border border-coral/30 bg-coral/10 rounded-xl p-4">
        <XCircle className="text-coral" size={18} />
        <p className="font-display font-semibold text-coral">Invalid Code</p>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="border border-coral/30 bg-coral/10 rounded-xl p-4">
        <p className="font-medium text-coral">Something went wrong. Please try again.</p>
      </div>
    )
  }

  return null
}
