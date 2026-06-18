import { motion } from 'framer-motion'

export default function CTASection({ onRegisterClick, onViewQrCodes }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6 }}
      className="bg-lime py-16 px-4 text-center"
    >
      <h2 className="text-3xl font-display font-bold text-ink">Ready to Join Us?</h2>
      <p className="text-ink/70 mt-3 max-w-md mx-auto">
        Secure your spot at AYD 2026 with KcBlendz
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-7">
        <motion.button
          type="button"
          onClick={onRegisterClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="bg-ink text-white rounded-full px-8 py-3 font-display font-semibold shadow-soft transition-all duration-150 hover:bg-ink/90 hover:shadow-elevated min-h-11"
        >
          Indicate Your Interest
        </motion.button>
        <motion.button
          type="button"
          onClick={onViewQrCodes}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="border border-ink/30 text-ink rounded-full px-8 py-3 font-display font-semibold bg-white/40 transition-all duration-150 hover:bg-white/70 hover:shadow-soft min-h-11"
        >
          View My QR Codes
        </motion.button>
      </div>
    </motion.section>
  )
}
