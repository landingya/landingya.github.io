import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import GlobeViz from './GlobeViz'
import Navbar from './Navbar'

function getHeroGlobeSize() {
  if (typeof window === 'undefined') return 560
  if (window.innerWidth < 480) return 300
  if (window.innerWidth < 768) return 360
  if (window.innerWidth < 1100) return 520
  return 560
}

function fadeInUp(delay, y = 20) {
  return {
    initial: { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: {
      delay,
      duration: 0.72,
      ease: [0.22, 1, 0.36, 1],
    },
  }
}

function fadeInX(delay, x = -30) {
  return {
    initial: { opacity: 0, x },
    animate: { opacity: 1, x: 0 },
    transition: {
      delay,
      duration: 0.78,
      ease: [0.22, 1, 0.36, 1],
    },
  }
}

export default function HeroSection() {
  const [globeSize, setGlobeSize] = useState(getHeroGlobeSize)
  const [globeMounted, setGlobeMounted] = useState(true)
  const sectionRef = useRef(null)

  useEffect(() => {
    const handleResize = () => setGlobeSize(getHeroGlobeSize())
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Montar/desmontar globo según visibilidad — libera GPU al scrollear
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setGlobeMounted(entry.isIntersecting),
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <motion.section
      ref={sectionRef}
      className="hero-scene"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
      id="inicio"
    >
      {/* Glow azul principal — centrado en la mitad derecha, dentro del viewport */}
      <div
        style={{
          position: 'absolute',
          right: '-10%',
          top: '50%',
          transform: 'translateY(-50%)',
          width: 900,
          height: 900,
          background:
            'radial-gradient(circle, rgba(14,165,233,0.22) 0%, rgba(14,165,233,0.08) 40%, transparent 65%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      {/* Glow púrpura — esquina superior derecha */}
      <div
        style={{
          position: 'absolute',
          top: '-15%',
          right: '15%',
          width: 800,
          height: 800,
          background:
            'radial-gradient(circle, rgba(139,92,246,0.28) 0%, rgba(139,92,246,0.1) 40%, transparent 62%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      {/* Glow azul sutil — esquina inferior izquierda */}
      <div
        style={{
          position: 'absolute',
          bottom: '-5%',
          left: '-5%',
          width: 500,
          height: 500,
          background:
            'radial-gradient(circle, rgba(14,165,233,0.1) 0%, transparent 60%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div className="hero-grid-overlay" />

      <Navbar />

      <div className="hero-main">
        <div className="hero-left">
          <motion.span className="hero-tag" {...fadeInUp(0.2, 14)}>
            Agencia Digital Premium
          </motion.span>

          <motion.h1 className="hero-title" {...fadeInX(0.35)}>
            Diseñamos el Mundo
            <br />
            <span className="hero-title-gradient">Digital</span> de tu Marca
          </motion.h1>

          <motion.p className="hero-subtitle" {...fadeInX(0.5)}>
            Landings premium y sistemas digitales que convierten visitantes en
            clientes.
          </motion.p>

          <motion.div className="hero-actions" {...fadeInUp(0.65)}>
            <a href="#servicios" className="btn-primary glow-border">
              Ver Servicios
            </a>
            <a href="#contacto" className="btn-secondary">
              Contáctenos
            </a>
          </motion.div>
        </div>

        <div className="hero-right">
          <div
            className="hero-globe-glow"
            aria-hidden="true"
            style={{
              position: 'absolute',
              width: 580,
              height: 580,
              borderRadius: '50%',
              background:
                'radial-gradient(circle, rgba(14,165,233,0.28) 0%, rgba(14,165,233,0.1) 45%, transparent 68%)',
              filter: 'blur(30px)',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />
          <div className="hero-globe-wrap" style={{ zIndex: 1 }}>
            {globeMounted && <GlobeViz size={globeSize} />}
          </div>
        </div>
      </div>
    </motion.section>
  )
}
