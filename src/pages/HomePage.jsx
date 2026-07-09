import { useState } from 'react'
import Hero from '../components/Hero'
import ProductShowcase from '../components/ProductShowcase'
import CTASection from '../components/CTASection'
import Footer from '../components/Footer'
import RegistrationModal from '../components/RegistrationModal'
import PastRegistrations from '../components/PastRegistrations'

export default function HomePage() {
  const [showModal, setShowModal] = useState(false)
  const [showPastRegistrations, setShowPastRegistrations] = useState(false)

  if (showPastRegistrations) {
    return <PastRegistrations onBack={() => setShowPastRegistrations(false)} />
  }

  return (
    // Using Tailwind CSS utility classes
    <div className="min-h-screen bg-white">
      <Hero onRegisterClick={() => setShowModal(true)} />
      <ProductShowcase />
      <CTASection
        onRegisterClick={() => setShowModal(true)}
        onViewQrCodes={() => setShowPastRegistrations(true)}
      />
      <Footer />
      {showModal && <RegistrationModal onClose={() => setShowModal(false)} />}
    </div>
  )
}
