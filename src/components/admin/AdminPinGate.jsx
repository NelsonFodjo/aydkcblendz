import { useState } from 'react'
import { Lock } from 'lucide-react'
import { validatePin } from '../../utils/validation'
import { primaryButtonClasses } from '../../utils/uiClasses'

const ADMIN_PIN = import.meta.env.VITE_ADMIN_PIN

export default function AdminPinGate({ onAuthenticated }) {
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!validatePin(pin) || pin !== ADMIN_PIN) {
      setError('Invalid PIN. Try again.')
      return
    }
    sessionStorage.setItem('kcblendz-admin-authed', 'true')
    onAuthenticated()
  }

  return (
    <div className="min-h-screen bg-offwhite flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white rounded-xl shadow-elevated p-8 text-center"
      >
        <div className="w-12 h-12 rounded-full bg-lime/20 flex items-center justify-center mx-auto mb-4">
          <Lock className="text-ink" size={22} />
        </div>
        <h1 className="font-display font-bold text-xl text-ink mb-2">Admin Access</h1>
        <p className="text-neutral text-sm mb-5">
          Enter Admin PIN to access verification dashboard
        </p>
        <input
          type="password"
          inputMode="numeric"
          maxLength={4}
          value={pin}
          onChange={(e) => {
            setError('')
            setPin(e.target.value.replace(/\D/g, ''))
          }}
          className="w-full text-center text-2xl tracking-widest bg-white border border-gray-200 rounded-xl px-3 py-3 shadow-xs outline-none transition-all duration-150 focus:border-lime focus:ring-4 focus:ring-lime/15"
          aria-label="Admin PIN"
          autoFocus
        />
        {error && <p className="text-coral text-sm mt-2">{error}</p>}
        <button
          type="submit"
          className={`w-full mt-5 py-2.5 min-h-11 ${primaryButtonClasses}`}
        >
          Unlock
        </button>
      </form>
    </div>
  )
}
