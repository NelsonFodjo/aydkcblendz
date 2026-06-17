import { useRef } from 'react'
import { ArrowLeft, Download, QrCode } from 'lucide-react'
import { QRCodeCanvas } from 'qrcode.react'
import { getRegistrationHistory } from '../utils/registrationHistory'

function QrCard({ entry }) {
  const wrapperRef = useRef(null)

  function handleDownload() {
    const canvas = wrapperRef.current?.querySelector('canvas')
    if (!canvas) return
    const url = canvas.toDataURL('image/png')
    const link = document.createElement('a')
    link.href = url
    link.download = `${entry.qrCodeId}.png`
    link.click()
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-soft">
      <div className="flex items-start justify-between mb-4">
        <h3 className="font-display font-semibold text-ink">{entry.name}</h3>
        <button
          type="button"
          onClick={handleDownload}
          className="flex items-center gap-1.5 text-sm border border-gray-200 rounded-lg px-3 py-1.5 hover:border-lime hover:bg-lime/5 transition-colors duration-200"
        >
          <Download size={14} />
          Save
        </button>
      </div>
      <div ref={wrapperRef} className="bg-white rounded-lg p-3 inline-block border border-gray-100">
        <QRCodeCanvas value={entry.qrCodeId} size={160} includeMargin />
      </div>
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
