import { useEffect, useState } from 'react'
import { motion, useMotionValue, animate } from 'framer-motion'

export default function AnimatedCounter({ value }) {
  const motionValue = useMotionValue(0)
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    const controls = animate(motionValue, value, {
      duration: 1.2,
      ease: 'easeOut',
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    })
    return () => controls.stop()
  }, [value, motionValue])

  return <motion.span>{display}</motion.span>
}
