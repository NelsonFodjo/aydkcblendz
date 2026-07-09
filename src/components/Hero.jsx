import { motion } from 'framer-motion'
import { useRegistrationCount } from '../hooks/useRegistrations'
import { useCountdown } from '../hooks/useCountdown'
import AnimatedCounter from './AnimatedCounter'

const SMOOTHIE_IMG = 'https://res.cloudinary.com/dazv72mhz/image/upload/v1781722506/smoothie_ff99dn.jpg'

const VID = 'https://res.cloudinary.com/dazv72mhz/video/upload/v1783631262/kcblendz_ukxrrx.mp4'

const KCBLENDZ_LOGO =
  'https://res.cloudinary.com/dazv72mhz/image/upload/v1781727958/kcblendz_logo-removebg-preview_rcs9lv.png'
const AYD_LOGO = 'https://res.cloudinary.com/dazv72mhz/image/upload/v1783631688/AYD_Logo_oklrd5.png'

const MARQUEE_WORDS = [
  { text: 'Nourishing Lives', color: 'text-lime' },
  { text: 'Inspiring Wellness', color: 'text-gold' },
  { text: 'Fresh', color: 'text-white' },
  { text: 'Natural', color: 'text-lime' },
  { text: 'Bold', color: 'text-gold' },
  { text: 'Vibrant', color: 'text-white' },
  { text: 'Community', color: 'text-lime' },
  { text: 'Refreshing', color: 'text-gold' },
  { text: 'AYD 2026', color: 'text-white' },
  { text: 'KCBLENDZ', color: 'text-white' },
]

function Marquee() {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/10 bg-ink/50 py-3 overflow-hidden">
      <motion.div
        className="flex w-max whitespace-nowrap items-center"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
      >
        {[...MARQUEE_WORDS, ...MARQUEE_WORDS].map((word, i) => (
          <span key={`${word.text}-${i}`} className="flex items-center">
            <span className={`font-display font-semibold text-sm uppercase tracking-wide ${word.color}`}>
              {word.text}
            </span>
            <span className="text-white/40 mx-3">&middot;</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}

function CountdownBox({ value, label }) {
  return (
    <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-lg px-3 sm:px-4 py-2.5 text-center min-w-16">
      <div className="font-display font-bold text-2xl sm:text-3xl text-white tabular-nums">
        {String(value).padStart(2, '0')}
      </div>
      <div className="text-[10px] sm:text-xs text-gray-300 mt-0.5 uppercase tracking-wide">
        {label}
      </div>
    </div>
  )
}

export default function Hero({ onRegisterClick }) {
  const count = useRegistrationCount()
  const { days, hours, minutes, seconds } = useCountdown()

  return (
    <section className="relative min-h-[100dvh] overflow-hidden flex flex-col items-center justify-center">
  {/* Background Video */}
  <video
    className="absolute inset-0 w-full h-full object-cover"
    autoPlay
    muted
    loop
    playsInline
  >
    <source src={VID} type="video/mp4" />
    Your browser does not support the video tag.
  </video>

  

      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/50 to-ink/80" />

      <div className="max-w-3xl mx-auto px-4 pt-16 sm:pt-20 pb-12 sm:pb-24 relative z-10 text-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <img
            src={KCBLENDZ_LOGO}
            alt="KcBlendz"
            className="h-20 sm:h-35 w-auto mx-auto mb-3"
            loading="lazy"
          />

          <div className="flex items-center justify-center gap-2">
            <img src={AYD_LOGO} alt="AYD" className="h-10 sm:h-20 w-auto" loading="lazy" />
            <span className="inline-block bg-lime text-ink font-display font-semibold text-xs sm:text-sm px-4 py-1.5 rounded-full uppercase tracking-wide">
              August 9, 2026
            </span>
          </div>

          <h1 className="font-display font-bold text-white text-3xl sm:text-5xl mt-4 leading-tight">
            Nourishing Lives!
          </h1>
          <p className="font-display font-bold text-lime text-3xl sm:text-5xl leading-tight">
            Inspiring Wellness!
          </p>

          <p className="text-gray-200 text-base sm:text-lg mt-4 max-w-lg mx-auto leading-relaxed">
            Join KcBlendz at AYD for an unforgettable experience of fresh, natural blends and
            vibrant community.
          </p>

          <div className="flex items-center justify-center gap-2 sm:gap-4 mt-6">
            <CountdownBox value={days} label="Days" />
            <CountdownBox value={hours} label="Hours" />
            <CountdownBox value={minutes} label="Mins" />
            <CountdownBox value={seconds} label="Secs" />
          </div>

          <p className="mt-4 text-gray-300 text-sm flex items-center justify-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-lime" aria-hidden="true" />
            <span className="font-semibold text-white">
              <AnimatedCounter value={count} />
            </span>
            people interested
          </p>

          <motion.button
            type="button"
            onClick={onRegisterClick}
            animate={{
              boxShadow: [
                '0 0 0 0 rgba(184,228,36,0.4)',
                '0 0 0 12px rgba(184,228,36,0)',
                '0 0 0 0 rgba(184,228,36,0)',
              ],
            }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95, backgroundColor: '#ffd700' }}
            className="font-display font-semibold mt-5 bg-lime text-ink rounded-full px-8 h-12 inline-flex items-center"
          >
            Indicate Your Interest
          </motion.button>
        </motion.div>
      </div>

      <Marquee />
    </section>
  )
}
