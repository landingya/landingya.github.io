import { motion } from 'framer-motion'

const IconLayout = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="28" height="28" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18M9 21V9" />
  </svg>
)

const IconCode = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="28" height="28" aria-hidden="true">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
)

const IconPen = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="28" height="28" aria-hidden="true">
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
  </svg>
)

const IconChart = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="28" height="28" aria-hidden="true">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </svg>
)

const servicios = [
  {
    Icono: IconLayout,
    color: 'var(--blue-main)',
    titulo: 'Landing Pages Premium',
    desc: 'Páginas que convierten visitas en clientes de verdad. Diseño de alto impacto, animaciones fluidas y estructura pensada para vender.',
    tags: ['Animaciones', 'Conversión', 'Responsive'],
  },
  {
    Icono: IconCode,
    color: 'var(--purple-main)',
    titulo: 'Sistemas Web a Medida',
    desc: 'Desarrollamos plataformas, dashboards y aplicaciones según lo que tu negocio necesita. Nada genérico, todo hecho para ti.',
    tags: ['React', 'Node.js', 'Bases de datos'],
  },
  {
    Icono: IconPen,
    color: 'var(--cyan-accent)',
    titulo: 'Diseño UI/UX',
    desc: 'Interfaces modernas, limpias y fáciles de usar que dejan huella. Tu marca se va a ver profesional desde el primer clic.',
    tags: ['Figma', 'Prototipado', 'Identidad visual'],
  },
  {
    Icono: IconChart,
    color: '#34d399',
    titulo: 'SEO & Performance',
    desc: 'De nada sirve una página bonita si nadie la encuentra. Optimizamos para que Google te ubique primero y cargue rápido.',
    tags: ['Google', 'Core Web Vitals', 'Analytics'],
  },
]

function fadeUp(i) {
  return {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }
}

export default function ServiciosSection() {
  return (
    <section className="section" id="servicios">
      {/* Gradientes de fondo */}
      <div className="section-glow section-glow--blue-left" />
      <div className="section-glow section-glow--purple-right" />

      <div className="section-inner">
        <motion.div className="section-header" {...fadeUp(0)}>
          <span className="section-tag">Lo que hacemos</span>
          <h2 className="section-title">
            Servicios que <span className="gradient-text">Transforman</span>
          </h2>
          <p className="section-subtitle">
            Creamos presencias digitales completas para marcas y negocios que quieren destacar en el mundo online.
          </p>
        </motion.div>

        <div className="servicios-grid">
          {servicios.map((s, i) => (
            <motion.div key={s.titulo} className="servicio-card" {...fadeUp(i + 1)}>
              <div className="servicio-icono" style={{ color: s.color }}><s.Icono /></div>
              <h3 className="servicio-titulo">{s.titulo}</h3>
              <p className="servicio-desc">{s.desc}</p>
              <div className="servicio-tags">
                {s.tags.map((t) => (
                  <span key={t} className="servicio-tag">{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
