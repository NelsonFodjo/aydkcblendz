import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, PartyPopper } from 'lucide-react'
import { pickRaffleWinner, fetchRaffleWinner } from '../../hooks/useRegistrations'
import { formatTimestamp } from '../../utils/formatters'
import { primaryButtonClasses } from '../../utils/uiClasses'

export default function RafflePanel({ stats }) {
  const [winner, setWinner] = useState(null)
  const [loadingWinner, setLoadingWinner] = useState(true)
  const [picking, setPicking] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchRaffleWinner()
      .then(setWinner)
      .finally(() => setLoadingWinner(false))
  }, [])

  async function handlePickWinner() {
    setPicking(true)
    setError('')
    try {
      const result = await pickRaffleWinner()
      setWinner(result)
    } catch (err) {
      setError(err.message || 'Could not pick a winner. Try again.')
    } finally {
      setPicking(false)
    }
  }

  const eligibleCount = stats.verified

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
        <Sparkles className="text-gold mx-auto mb-4" size={40} />
        <h3 className="font-display font-semibold text-ink mb-2">Raffle Draw</h3>
        <p className="text-sm text-neutral mb-6">
          Picks a random winner from everyone marked as purchased ({eligibleCount} eligible)
        </p>
        <button
          type="button"
          onClick={handlePickWinner}
          disabled={picking || eligibleCount === 0}
          className={`inline-flex items-center gap-2 px-6 py-3 ${primaryButtonClasses}`}
        >
          <Sparkles size={16} />
          {picking ? 'Picking...' : winner ? 'Pick Again' : 'Pick a Winner'}
        </button>
        {eligibleCount === 0 && (
          <p className="text-xs text-neutral mt-3">No purchasers yet to pick from.</p>
        )}
        {error && <p className="text-coral text-sm mt-3">{error}</p>}
      </div>

      <AnimatePresence mode="wait">
        {!loadingWinner && winner && (
          <motion.div
            key={winner.id}
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="bg-gradient-to-br from-lime/20 to-gold/20 border border-lime/40 rounded-xl p-6 text-center"
          >
            <PartyPopper className="text-gold mx-auto mb-3" size={32} />
            <p className="text-xs font-display font-semibold text-neutral uppercase tracking-wide mb-1">
              Current Winner
            </p>
            <h4 className="font-display font-bold text-2xl text-ink">{winner.name}</h4>
            {winner.registration_number != null && (
              <p className="text-sm text-neutral mt-1">Interest #{winner.registration_number}</p>
            )}
            <p className="text-sm text-neutral mt-1">{winner.whatsapp}</p>
            <p className="text-sm text-neutral">{winner.deanery}</p>
            {winner.updated_at && (
              <p className="text-xs text-neutral mt-3">
                Drawn {formatTimestamp(winner.updated_at)}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
