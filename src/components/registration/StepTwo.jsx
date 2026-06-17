import { useRef } from 'react'
import { CheckCircle, Download } from 'lucide-react'
import { QRCodeCanvas } from 'qrcode.react'

export default function StepTwo({ qrCodeId, onContinue, onRegisterAnother }) {
  const canvasWrapperRef = useRef(null)

  function handleDownload() {
    const canvas = canvasWrapperRef.current?.querySelector('canvas')
    if (!canvas) return
    const url = canvas.toDataURL('image/png')
    const link = document.createElement('a')
    link.href = url
    link.download = `${qrCodeId}.png`
    link.click()
  }

  return (
    <div className="text-center space-y-5">
      <div className="w-14 h-14 rounded-full bg-lime/20 flex items-center justify-center mx-auto">
        <CheckCircle className="text-lime" size={28} />
      </div>

      <div>
        <h2 className="font-display font-bold text-2xl text-ink">You're In!</h2>
        <p className="text-neutral text-sm mt-1">
          Show this at AYD on Aug 9 to be eligible for the raffle
        </p>
      </div>

      <div
        ref={canvasWrapperRef}
        className="bg-white rounded-xl p-3 sm:p-4 inline-block border border-gray-100 shadow-soft max-w-full"
      >
        <QRCodeCanvas value={qrCodeId} size={200} includeMargin />
      </div>

      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={handleDownload}
          className="w-full flex items-center justify-center gap-2 border border-gray-200 text-ink rounded-xl py-3 font-medium hover:border-lime hover:bg-lime/5 transition-colors duration-200 min-h-11"
        >
          <Download size={16} />
          Download QR Code
        </button>

        <button
          type="button"
          onClick={onContinue}
          className="w-full bg-lime text-ink rounded-xl py-3 font-display font-semibold hover:bg-gold transition-colors duration-200 min-h-11"
        >
          Continue
        </button>

        <button
          type="button"
          onClick={onRegisterAnother}
          className="w-full text-gray-500 text-sm hover:text-ink transition-colors duration-200 min-h-11"
        >
          Register Someone Else on This Phone
        </button>
      </div>
    </div>
  )
}
