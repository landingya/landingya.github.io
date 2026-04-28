import { motion } from 'framer-motion'

const proyectos = [
  {
    nombre: 'UCF — Universidad Continental',
    tipo: 'Landing Educación',
    desc: 'Landing de admisión 2026 con countdown en vivo, verificación DNI vía RENIEC, mapa de sedes Leaflet y formulario de pre-admisión.',
    color: 'from-slate-800 to-blue-900',
    grad: 'linear-gradient(135deg, #0B1A2E 0%, #1a3a6b 100%)',
    tags: ['Educación', 'DNI API', 'Demo en vivo'],
    href: '/demos/educacion/',
    img: '/ucf-preview.jpg',
  },
  {
    nombre: 'MedPrime Lima — Clínica Privada',
    tipo: 'Landing Salud',
    desc: 'Landing para clínica privada con widget de clima Lima, agendamiento de citas con verificación DNI vía RENIEC, mapa de sedes y equipo médico.',
    color: 'from-teal-500 to-cyan-600',
    grad: 'linear-gradient(135deg, #14b8a6, #0891b2)',
    tags: ['Salud', 'DNI API', 'Demo en vivo'],
    href: '/demos/salud/',
    img: '/salud-preview.jpg',
  },
]

function fadeUp(i) {
  return {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }
}

export default function ProyectosSection() {
  return (
    <section className="section" id="proyectos">
      <div className="section-glow section-glow--blue-center" />

      <div className="section-inner">
        <motion.div className="section-header" {...fadeUp(0)}>
          <span className="section-tag">Nuestro trabajo</span>
          <h2 className="section-title">
            Proyectos que nos <span className="gradient-text">enorgullecen</span>
          </h2>
          <p className="section-subtitle">
            Cada proyecto es distinto. Acá te mostramos algunos de los mundos digitales que creamos para nuestros clientes.
          </p>
        </motion.div>

        <div className="proyectos-grid">
          {proyectos.map((p, i) => (
            <motion.article key={p.nombre} className="proyecto-card" {...fadeUp(i + 1)}>
              {/* Preview visual */}
              {p.href ? (
                <a href={p.href} target="_blank" rel="noopener noreferrer" className="proyecto-preview proyecto-preview--link" style={p.img ? {} : { background: p.grad }}>
                  {p.img && <img src={p.img} alt={p.nombre} className="proyecto-preview-img" />}
                  <div className="proyecto-preview-inner">
                    <span className="proyecto-tipo-badge">{p.tipo}</span>
                    <span className="proyecto-nombre-preview">{p.nombre}</span>
                  </div>
                  <span className="proyecto-preview-hover">Ver demo →</span>
                </a>
              ) : (
                <div className="proyecto-preview" style={{ background: p.grad }}>
                  <div className="proyecto-preview-inner">
                    <span className="proyecto-tipo-badge">{p.tipo}</span>
                    <span className="proyecto-nombre-preview">{p.nombre}</span>
                  </div>
                </div>
              )}

              <div className="proyecto-info">
                <div className="proyecto-header-row">
                  <h3 className="proyecto-nombre">{p.nombre}</h3>
                  <span className="proyecto-tipo">{p.tipo}</span>
                </div>
                <p className="proyecto-desc">{p.desc}</p>
                <div className="proyecto-tags">
                  {p.tags.map((t) => (
                    <span key={t} className="proyecto-tag">{t}</span>
                  ))}
                </div>
                {p.href && (
                  <a href={p.href} target="_blank" rel="noopener noreferrer" className="proyecto-demo-link">
                    Ver demo en vivo →
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
