import { useEffect, useState } from 'react'
import StepOne from './registration/StepOne'
import StepTwo from './registration/StepTwo'
import StepThree from './registration/StepThree'
import { insertRegistration, updateRegistration } from '../hooks/useRegistrations'
import { addRegistrationToHistory } from '../utils/registrationHistory'

const initialForm = {
  name: '',
  whatsapp: '',
  email: '',
  deanery: '',
  parish: '',
  convictionSource: '',
  productInterest: '',
}

export default function RegistrationModal({ onClose }) {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState(initialForm)
  const [qrCodeId, setQrCodeId] = useState('')
  const [registrationDbId, setRegistrationDbId] = useState(null)
  const [registrationNumber, setRegistrationNumber] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  async function handleStepOneSubmit(data) {
    const newQrCodeId = crypto.randomUUID()
    try {
      setError('')
      const inserted = await insertRegistration({
        name: data.name,
        whatsapp: data.whatsapp,
        email: data.email || null,
        deanery: data.deanery,
        qr_code_id: newQrCodeId,
      })
      setForm((prev) => ({ ...prev, ...data }))
      setQrCodeId(newQrCodeId)
      setRegistrationDbId(inserted.id)
      addRegistrationToHistory({ qrCodeId: newQrCodeId, name: data.name })
      setStep(2)
    } catch {
      setError('Something went wrong. Please try again.')
    }
  }

  async function handleStepThreeSubmit(data) {
    try {
      setError('')
      await updateRegistration(registrationDbId, {
        parish: data.parish,
        conviction_source: data.convictionSource,
        product_interest: data.productInterest,
      })
      setForm((prev) => ({ ...prev, ...data }))
      setStep(4)
    } catch {
      setError('Something went wrong. Please try again.')
    }
  }

  function handleRegisterAnother() {
    setForm(initialForm)
    setQrCodeId('')
    setRegistrationDbId(null)
    setError('')
    setStep(1)
  }

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center p-0 sm:p-4 z-50"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full h-full sm:h-auto sm:max-w-md sm:max-h-[90vh] bg-white rounded-none sm:rounded-2xl shadow-deep p-5 sm:p-7 relative overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close registration form"
          className="absolute top-4 right-4 text-gray-400 hover:text-ink w-11 h-11 flex items-center justify-center"
        >
          ✕
        </button>

        <h2 className="text-center font-display font-bold text-xl text-ink mb-1">
          Indicate Your Interest
        </h2>
        <p className="text-center text-neutral text-sm mb-5">AYD 2026 — August 9, 2026</p>

        {step <= 3 && (
          <div className="flex items-center justify-center gap-2 mb-6">
            {[1, 2, 3].map((s) => (
              <span
                key={s}
                className={`h-2 rounded-full transition-all duration-300 ${
                  s === step ? 'w-8 bg-lime' : s < step ? 'w-2 bg-lime' : 'w-2 bg-gray-200'
                }`}
              />
            ))}
          </div>
        )}

        {error && <p className="text-red-600 text-sm mb-3 text-center">{error}</p>}

        {step === 1 && <StepOne initialData={form} onSubmit={handleStepOneSubmit} />}

        {step === 2 && (
          <StepTwo
            qrCodeId={qrCodeId}
            onContinue={() => setStep(3)}
            onRegisterAnother={handleRegisterAnother}
          />
        )}

        {step === 3 && (
          <StepThree
            initialData={form}
            onSubmit={handleStepThreeSubmit}
            onRegisterAnother={handleRegisterAnother}
          />
        )}

        {step === 4 && (
          <div className="text-center space-y-4">
            <h3 className="font-display font-semibold text-xl text-ink">Thanks, {form.name}!</h3>
            <p className="text-neutral">
              You're all set for AYD on August 9. Don't forget your QR code for the raffle.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="w-full bg-lime text-ink rounded-full py-3 font-display font-semibold hover:bg-gold transition-colors duration-200 min-h-11"
            >
              Close
            </button>
            <button
              type="button"
              onClick={handleRegisterAnother}
              className="w-full text-gray-500 text-sm hover:text-ink transition-colors duration-200 min-h-11"
            >
              Register Someone Else on This Phone
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
