const WHATSAPP_REGEX = /^\+?[0-9]{7,15}$/
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateStepOne({ name, whatsapp, email, deanery }) {
  const errors = {}
  if (!name.trim()) errors.name = 'Name is required'
  if (!WHATSAPP_REGEX.test(whatsapp.trim())) {
    errors.whatsapp = 'Enter a valid WhatsApp number'
  }
  if (email.trim() && !EMAIL_REGEX.test(email.trim())) {
    errors.email = 'Enter a valid email'
  }
  if (!deanery) errors.deanery = 'Select a deanery'
  return errors
}

export function validateStepThree({ parish, convictionSource, productInterest }) {
  const errors = {}
  if (!parish.trim()) errors.parish = 'Parish is required'
  if (!convictionSource) errors.convictionSource = 'Please select an option'
  if (!productInterest) errors.productInterest = 'Please select an option'
  return errors
}

export function validatePin(pin) {
  return /^[0-9]{4}$/.test(pin)
}
