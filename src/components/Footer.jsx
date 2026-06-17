const CONTACTS = [
  { name: 'Pauline Anyanwu', display: '+234 803 727 8271', phone: '+2348037278271' },
  { name: 'Tobias Kingsley', display: '+234 816 964 5678', phone: '+2348169645678' },
  { name: 'Kelechi Oparaji', display: '+230 5858 9775', phone: '+23058589775' },
]

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-10 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="font-display font-semibold text-ink mb-4">Contact</h2>
        <ul className="flex flex-col sm:flex-row sm:justify-center gap-3 sm:gap-8 text-neutral">
          {CONTACTS.map((contact) => (
            <li key={contact.name}>
              {contact.name}:{' '}
              <a href={`tel:${contact.phone}`} className="text-ink hover:text-lime transition-colors duration-200">
                {contact.display}
              </a>
            </li>
          ))}
        </ul>
        <p className="text-gray-400 text-sm mt-8">&copy; 2026 KcBlendz. All rights reserved.</p>
      </div>
    </footer>
  )
}
