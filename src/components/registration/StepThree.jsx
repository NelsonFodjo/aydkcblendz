import { useState } from 'react'
import { CONVICTION_SOURCES, PRODUCT_INTERESTS } from '../../utils/deaneries'
import { validateStepThree } from '../../utils/validation'

const inputClasses =
  'w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-lime/30 focus:border-lime transition-colors duration-150'

function RadioOption({ name, value, label, checked, onChange }) {
  return (
    <label
      className={`flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm cursor-pointer transition-colors duration-150 max-w-full ${
        checked ? 'bg-lime border-lime text-ink' : 'bg-white border-gray-200 text-neutral hover:bg-lime/5'
      }`}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="accent-lime shrink-0"
      />
      <span className="break-words">{label}</span>
    </label>
  )
}

export default function StepThree({ initialData, onSubmit, onRegisterAnother }) {
  const [parish, setParish] = useState(initialData.parish)
  const [convictionSource, setConvictionSource] = useState(initialData.convictionSource)
  const [productInterest, setProductInterest] = useState(initialData.productInterest)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    const data = { parish: parish.trim(), convictionSource, productInterest }
    const newErrors = validateStepThree(data)
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="parish" className="block text-sm font-semibold text-ink mb-1.5">
          Your Parish
        </label>
        <input
          id="parish"
          type="text"
          value={parish}
          onChange={(e) => setParish(e.target.value)}
          placeholder="e.g. Holy Cross Parish"
          className={inputClasses}
        />
        {errors.parish && <p className="text-coral text-sm mt-1">{errors.parish}</p>}
      </div>

      <fieldset>
        <legend className="block text-sm font-semibold text-ink mb-2">
          What convinced you to experience AYD with KcBlendz?
        </legend>
        <div className="flex flex-wrap gap-2">
          {CONVICTION_SOURCES.map((option) => (
            <RadioOption
              key={option}
              name="convictionSource"
              value={option}
              label={option}
              checked={convictionSource === option}
              onChange={(e) => setConvictionSource(e.target.value)}
            />
          ))}
        </div>
        {errors.convictionSource && (
          <p className="text-coral text-sm mt-1">{errors.convictionSource}</p>
        )}
      </fieldset>

      <fieldset>
        <legend className="block text-sm font-semibold text-ink mb-2">
          Which KcBlendz product are you most interested in experiencing?
        </legend>
        <div className="flex flex-wrap gap-2">
          {PRODUCT_INTERESTS.map((option) => (
            <RadioOption
              key={option}
              name="productInterest"
              value={option}
              label={option}
              checked={productInterest === option}
              onChange={(e) => setProductInterest(e.target.value)}
            />
          ))}
        </div>
        {errors.productInterest && (
          <p className="text-coral text-sm mt-1">{errors.productInterest}</p>
        )}
      </fieldset>

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-lime text-ink rounded-full py-3.5 font-display font-semibold hover:bg-gold transition-colors duration-200 disabled:opacity-60 min-h-12"
      >
        {submitting ? 'Submitting...' : 'Done'}
      </button>

      <button
        type="button"
        onClick={onRegisterAnother}
        className="w-full text-gray-500 text-sm hover:text-ink transition-colors duration-200 min-h-11"
      >
        Register Someone Else on This Phone
      </button>
    </form>
  )
}
