import { useState } from 'react'
import { Camera, RefreshCw } from 'lucide-react'
import AdminQRScanner from './AdminQRScanner'
import VerificationResult from './VerificationResult'
import { useVerification } from '../../hooks/useVerification'
import { primaryButtonClasses, secondaryButtonClasses } from '../../utils/uiClasses'

export default function ScannerPanel() {
  const [scanning, setScanning] = useState(false)
  const [scannerKey, setScannerKey] = useState(0)
  const { result, status, confirmedAt, lookup, handleMarkPurchased } = useVerification()

  function handleScan(code) {
    lookup(code)
    setScanning(false)
    setTimeout(() => {
      setScannerKey((k) => k + 1)
      setScanning(true)
    }, 1500)
  }

  return (
    <div className="space-y-4">
      {!scanning ? (
        <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
          <Camera className="text-neutral mx-auto mb-4" size={40} />
          <h3 className="font-display font-semibold text-ink mb-2">QR Code Scanner</h3>
          <p className="text-sm text-neutral mb-6">
            Point the camera at a registration QR code to verify
          </p>
          <button
            type="button"
            onClick={() => setScanning(true)}
            className={`inline-flex items-center gap-2 px-5 py-2.5 ${primaryButtonClasses}`}
          >
            <Camera size={16} />
            Start Scanning
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <AdminQRScanner key={scannerKey} onScan={handleScan} />
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setScanning(false)}
              className={`flex-1 text-ink py-2.5 min-h-11 ${secondaryButtonClasses}`}
            >
              Stop
            </button>
            <button
              type="button"
              onClick={() => setScannerKey((k) => k + 1)}
              className={`flex items-center justify-center gap-1.5 text-ink px-4 py-2.5 min-h-11 ${secondaryButtonClasses}`}
            >
              <RefreshCw size={16} />
              Reset
            </button>
          </div>
        </div>
      )}

      <VerificationResult
        status={status}
        result={result}
        confirmedAt={confirmedAt}
        onMarkPurchased={handleMarkPurchased}
      />
    </div>
  )
}
