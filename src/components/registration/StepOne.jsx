import { useState } from 'react'
import { DEANERIES } from '../../utils/deaneries'
import { validateStepOne } from '../../utils/validation'
import { COUNTRY_CODES, DEFAULT_COUNTRY_CODE } from '../../utils/countryCodes'
import { inputClasses, primaryButtonClasses } from '../../utils/uiClasses'

function parseInitialWhatsapp(value) {
  const match = COUNTRY_CODES.find((c) => value.startsWith(c.code))
  if (match) {
    return { countryCode: match.code, localNumber: value.slice(match.code.length).trim() }
  }
  return { countryCode: DEFAULT_COUNTRY_CODE, localNumber: value }
}

export default function StepOne({ initialData, onSubmit }) {
  const initialWhatsapp = parseInitialWhatsapp(initialData.whatsapp)
  const [name, setName] = useState(initialData.name)
  const [countryCode, setCountryCode] = useState(initialWhatsapp.countryCode)
  const [localNumber, setLocalNumber] = useState(initialWhatsapp.localNumber)
  const [email, setEmail] = useState(initialData.email)
  const [deanery, setDeanery] = useState(initialData.deanery)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    const whatsapp = `${countryCode}${localNumber.trim().replace(/\s+/g, '').replace(/^0+/, '')}`
    const data = { name: name.trim(), whatsapp, email: email.trim(), deanery }
    const newErrors = validateStepOne(data)
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    setSubmitting(true)
    try {
      await onSubmit(data)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-ink mb-1.5">
          Full Name *
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value)
            setErrors((prev) => ({ ...prev, name: undefined }))
          }}
          placeholder="Enter your full name"
          className={inputClasses}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && (
          <p id="name-error" className="text-coral text-sm mt-1">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="whatsapp" className="block text-sm font-semibold text-ink mb-1.5">
          WhatsApp Number *
        </label>
        <div className="flex gap-2">
          <select
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            aria-label="Country code"
            className={`${inputClasses} basis-[88px] grow-0 shrink-0 px-2`}
          >
            {COUNTRY_CODES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.flag} {c.code}
              </option>
            ))}
          </select>
          <input
            id="whatsapp"
            type="tel"
            value={localNumber}
            onChange={(e) => {
              setLocalNumber(e.target.value.replace(/[^0-9\s]/g, ''))
              setErrors((prev) => ({ ...prev, whatsapp: undefined }))
            }}
            placeholder="XXX XXX XXXX"
            className={`${inputClasses} grow basis-0 min-w-0`}
            aria-invalid={Boolean(errors.whatsapp)}
            aria-describedby={errors.whatsapp ? 'whatsapp-error' : undefined}
          />
        </div>
        {errors.whatsapp && (
          <p id="whatsapp-error" className="text-coral text-sm mt-1">
            {errors.whatsapp}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-ink mb-1.5">
          Email (optional)
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            setErrors((prev) => ({ ...prev, email: undefined }))
          }}
          placeholder="your@email.com"
          className={inputClasses}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <p id="email-error" className="text-coral text-sm mt-1">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="deanery" className="block text-sm font-semibold text-ink mb-1.5">
          Deanery *
        </label>
        <select
          id="deanery"
          value={deanery}
          onChange={(e) => {
            setDeanery(e.target.value)
            setErrors((prev) => ({ ...prev, deanery: undefined }))
          }}
          className={inputClasses}
          aria-invalid={Boolean(errors.deanery)}
          aria-describedby={errors.deanery ? 'deanery-error' : undefined}
        >
          <option value="">Select your deanery</option>
          {DEANERIES.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
        {errors.deanery && (
          <p id="deanery-error" className="text-coral text-sm mt-1">
            {errors.deanery}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className={`w-full py-3.5 min-h-12 ${primaryButtonClasses}`}
      >
        {submitting ? 'Submitting...' : 'Submit Interest'}
      </button>
    </form>
  )
}
