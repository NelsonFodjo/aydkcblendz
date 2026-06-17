export default function CTASection({ onRegisterClick, onViewQrCodes }) {
  return (
    <section className="bg-lime py-16 px-4 text-center">
      <h2 className="text-3xl font-display font-bold text-ink">Ready to Join Us?</h2>
      <p className="text-ink/70 mt-3 max-w-md mx-auto">
        Secure your spot at AYD 2026 with KcBlendz
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-7">
        <button
          type="button"
          onClick={onRegisterClick}
          className="bg-ink text-white rounded-full px-8 py-3 font-display font-semibold hover:bg-ink/90 transition-colors duration-200 min-h-11"
        >
          Indicate Your Interest
        </button>
        <button
          type="button"
          onClick={onViewQrCodes}
          className="border border-ink/30 text-ink rounded-full px-8 py-3 font-display font-semibold hover:bg-ink/5 transition-colors duration-200 min-h-11"
        >
          View My QR Codes
        </button>
      </div>
    </section>
  )
}
