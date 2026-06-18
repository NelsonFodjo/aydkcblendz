import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, Download, QrCode, Trophy } from 'lucide-react'
import { QRCodeCanvas } from 'qrcode.react'
import { getRegistrationHistory } from '../utils/registrationHistory'
import { findRegistrationByQrCode } from '../hooks/useRegistrations'

function QrCard({ entry }) {
  const wrapperRef = useRef(null)
  const [isWinner, setIsWinner] = useState(false)

  useEffect(() => {
    findRegistrationByQrCode(entry.qrCodeId)
      .then((registration) => setIsWinner(Boolean(registration?.is_winner)))
      .catch(() => {})
  }, [entry.qrCodeId])

  function handleDownload() {
    const canvas = wrapperRef.current?.querySelector('canvas')
    if (!canvas) return
    const url = canvas.toDataURL('image/png')
    const link = document.createElement('a')
    link.href = url
    link.download =
      entry.registrationNumber != null
        ? `KcBlendz-AYD-${entry.registrationNumber}.png`
        : `${entry.qrCodeId}.png`
    link.click()
  }

  return (
    <div
      className={`bg-white rounded-xl border p-6 shadow-soft ${
        isWinner ? 'border-gold ring-2 ring-gold/40' : 'border-gray-200'
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-display font-semibold text-ink">{entry.name}</h3>
          {entry.registrationNumber != null && (
            <p className="text-xs text-neutral">Interest #{entry.registrationNumber}</p>
          )}
        </div>
        <button
          type="button"
          onClick={handleDownload}
          className="flex items-center gap-1.5 text-sm border border-gray-200 rounded-lg px-3 py-1.5 hover:border-lime hover:bg-lime/5 transition-colors duration-200"
        >
          <Download size={14} />
          Save
        </button>
      </div>

      {isWinner && (
        <div className="flex items-center gap-1.5 bg-gold/15 text-ink text-xs font-display font-semibold rounded-full px-3 py-1.5 mb-4 w-fit">
          <Trophy size={14} className="text-gold" />
          Raffle Winner!
        </div>
      )}

      <div ref={wrapperRef} className="bg-white rounded-lg p-3 inline-block border border-gray-100">
        <QRCodeCanvas value={entry.qrCodeId} size={160} includeMargin />
      </div>
      <p className="font-mono text-xs text-ink bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 select-all break-all mt-3">
        {entry.qrCodeId}
      </p>
    </div>
  )
}

export default function PastRegistrations({ onBack }) {
  const history = getRegistrationHistory()

  return (
    <div className="min-h-screen bg-offwhite px-4 py-12">
      <div className="max-w-md mx-auto">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-neutral hover:text-ink mb-6 transition-colors duration-200"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <h1 className="font-display font-bold text-2xl text-ink mb-2">Your QR Codes</h1>
        <p className="text-neutral text-sm mb-8">Interest submissions from this device</p>

        {history.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
            <QrCode className="text-neutral mx-auto mb-4" size={40} />
            <p className="font-medium text-ink mb-1">No submissions yet</p>
            <p className="text-sm text-neutral">
              Once you indicate your interest, your QR code will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((entry) => (
              <QrCard key={entry.qrCodeId} entry={entry} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
