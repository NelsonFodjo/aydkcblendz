export function formatTimestamp(isoString) {
  if (!isoString) return ''
  return new Date(isoString).toLocaleString('en-NG', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}

export function toCsv(rows) {
  const columns = [
    'name',
    'whatsapp',
    'email',
    'deanery',
    'parish',
    'conviction_source',
    'product_interest',
    'qr_code_id',
    'created_at',
    'verified_at',
  ]
  const header = columns.join(',')
  const escapeCell = (value) => {
    const str = value == null ? '' : String(value)
    return `"${str.replace(/"/g, '""')}"`
  }
  const lines = rows.map((row) => columns.map((col) => escapeCell(row[col])).join(','))
  return [header, ...lines].join('\n')
}

export function downloadCsv(csvString, filename) {
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}
