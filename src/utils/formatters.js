export function formatTimestamp(isoString) {
  if (!isoString) return ''
  return new Date(isoString).toLocaleString('en-NG', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}

export function printRegistrationsPdf(rows) {
  const escapeHtml = (value) => {
    const str = value == null ? '' : String(value)
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
  }

  const tableRows = rows
    .map(
      (row, i) => `
      <tr>
        <td>${i + 1}</td>
        <td>${escapeHtml(row.registration_number ?? '')}</td>
        <td>${escapeHtml(row.name)}</td>
        <td>${escapeHtml(row.whatsapp)}</td>
        <td>${escapeHtml(row.email)}</td>
        <td>${escapeHtml(row.deanery)}</td>
        <td>${escapeHtml(row.parish)}</td>
        <td>${escapeHtml(formatTimestamp(row.created_at))}</td>
        <td>${row.verified_at ? 'Yes' : 'No'}</td>
      </tr>`,
    )
    .join('')

  const html = `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>KcBlendz AYD Registrations</title>
        <style>
          body { font-family: Arial, Helvetica, sans-serif; margin: 24px; color: #1a1a1a; }
          h1 { font-size: 18px; margin-bottom: 2px; }
          p.meta { color: #6b7280; font-size: 12px; margin-top: 0; margin-bottom: 16px; }
          table { width: 100%; border-collapse: collapse; font-size: 11px; }
          th, td { border: 1px solid #e5e7eb; padding: 6px 8px; text-align: left; }
          th { background: #f8f9fa; }
          @media print {
            @page { size: A4 landscape; margin: 12mm; }
          }
        </style>
      </head>
      <body>
        <h1>KcBlendz AYD Registrations</h1>
        <p class="meta">${rows.length} registrants &middot; Generated ${new Date().toLocaleString('en-NG', { dateStyle: 'medium', timeStyle: 'short' })}</p>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Reg. No.</th>
              <th>Name</th>
              <th>WhatsApp</th>
              <th>Email</th>
              <th>Deanery</th>
              <th>Parish</th>
              <th>Registered</th>
              <th>Verified</th>
            </tr>
          </thead>
          <tbody>${tableRows}</tbody>
        </table>
        <script>window.onload = () => window.print();</script>
      </body>
    </html>`

  const printWindow = window.open('', '_blank')
  if (!printWindow) return
  printWindow.document.write(html)
  printWindow.document.close()
}
