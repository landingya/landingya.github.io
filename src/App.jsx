import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useState } from 'react'
import ContactoSection from './components/ContactoSection'
import FloatingButtons from './components/FloatingButtons'
import HeroSection from './components/HeroSection'
import IntroScene from './components/IntroScene'
import NosotrosSection from './components/NosotrosSection'
import ProyectosSection from './components/ProyectosSection'
import ServiciosSection from './components/ServiciosSection'

function App() {
  const [phase, setPhase] = useState('intro')

  const handleIntroComplete = useCallback(() => {
    setPhase('hero')
  }, [])

  return (
    <main className="app-shell">
      <AnimatePresence>
        {phase === 'intro' && (
          <IntroScene key="intro" onComplete={handleIntroComplete} />
        )}
      </AnimatePresence>

      {phase === 'hero' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <HeroSection />
          <ServiciosSection />
          <NosotrosSection />
          <ProyectosSection />
          <ContactoSection />
          <FloatingButtons />
        </motion.div>
      )}
    </main>
  )
}

export default App
