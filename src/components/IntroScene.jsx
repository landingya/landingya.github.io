import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import GlobeViz from './GlobeViz'

const INTRO_DURATION_MS = 4500
const STEP_INTERVAL_MS = 45
const COMPLETE_DELAY_MS = 700

function getIntroGlobeSize() {
  if (typeof window === 'undefined') return 500
  if (window.innerWidth < 480) return 280
  if (window.innerWidth < 768) return 360
  return 500
}

export default function IntroScene({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState('Iniciando experiencia')
  const [done, setDone] = useState(false)
  const [globeSize, setGlobeSize] = useState(getIntroGlobeSize)

  useEffect(() => {
    const handleResize = () => setGlobeSize(getIntroGlobeSize())
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const totalSteps = Math.floor(INTRO_DURATION_MS / STEP_INTERVAL_MS)
    let currentStep = 0
    let completeTimer = 0

    const progressTimer = window.setInterval(() => {
      currentStep += 1
      const nextValue = Math.min((currentStep / totalSteps) * 100, 100)
      setProgress(nextValue)

      if (nextValue < 30) {
        setLoadingText('Iniciando experiencia')
      } else if (nextValue < 65) {
        setLoadingText('Construyendo presencia digital')
      } else if (nextValue < 90) {
        setLoadingText('Preparando tu mundo')
      } else {
        setLoadingText('Listo')
      }

      if (nextValue >= 100) {
        window.clearInterval(progressTimer)
        setDone(true)
        completeTimer = window.setTimeout(() => {
          onComplete()
        }, COMPLETE_DELAY_MS)
      }
    }, STEP_INTERVAL_MS)

    return () => {
      window.clearInterval(progressTimer)
      if (completeTimer) {
        window.clearTimeout(completeTimer)
      }
    }
  }, [onComplete])

  return (
    <motion.div
      className="intro-scene"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8 } }}
    >
      <div
        style={{
          position: 'absolute',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(14,165,233,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      />

      <div className="intro-center">
        <GlobeViz size={globeSize} />

        <motion.div
          className="intro-status"
          animate={done ? { opacity: 0, y: 14 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          <motion.p
            key={loadingText}
            className="intro-loading-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
            style={{
              marginTop: 28,
              fontSize: 11,
              letterSpacing: '0.3em',
              color: '#475569',
              textTransform: 'uppercase',
              fontWeight: 500,
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            {loadingText}
          </motion.p>

          <div
            className="intro-progress-track"
            aria-hidden="true"
            style={{
              marginTop: 16,
              width: 200,
              height: 1,
              background: 'rgba(255,255,255,0.08)',
              borderRadius: 4,
              overflow: 'hidden',
            }}
          >
            <motion.div
              className="intro-progress-fill"
              style={{
                width: 0,
                height: '100%',
                borderRadius: 4,
                background: 'linear-gradient(90deg, #0EA5E9, #8B5CF6)',
              }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1, ease: 'linear' }}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
