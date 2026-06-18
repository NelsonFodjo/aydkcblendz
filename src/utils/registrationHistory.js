const STORAGE_KEY = 'kcblendz_registrations'

export function getRegistrationHistory() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  } catch {
    return []
  }
}

export function addRegistrationToHistory({ qrCodeId, name, registrationNumber }) {
  const history = getRegistrationHistory()
  history.push({ qrCodeId, name, registrationNumber, createdAt: new Date().toISOString() })
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history))
}
