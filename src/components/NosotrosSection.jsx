import { motion } from 'framer-motion'

const stats = [
  { numero: '50+', label: 'Proyectos entregados' },
  { numero: '35+', label: 'Clientes satisfechos' },
  { numero: '3',   label: 'Años de experiencia' },
  { numero: '98%', label: 'Clientes que vuelven' },
]

const valores = [
  { titulo: 'Calidad antes que cantidad', desc: 'Preferimos hacer pocos proyectos y hacerlos bien. Cada trabajo que sale lleva nuestro nombre.' },
  { titulo: 'Comunicación directa', desc: 'Sin intermediarios, sin vueltas. Hablamos claro desde el día uno y entregamos lo que prometemos.' },
  { titulo: 'Resultado real', desc: 'No nos interesa solo que se vea bonito. Nos interesa que funcione y que tu negocio crezca de verdad.' },
]

function fadeUp(i) {
  return {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }
}

export default function NosotrosSection() {
  return (
    <section className="section" id="nosotros">
      <div className="section-glow section-glow--purple-left" />
      <div className="section-glow section-glow--blue-right" />

      <div className="section-inner">
        <div className="nosotros-layout">

          {/* Columna izquierda — texto */}
          <div className="nosotros-content">
            <motion.span className="section-tag" {...fadeUp(0)}>Quiénes somos</motion.span>
            <motion.h2 className="section-title" style={{ textAlign: 'left' }} {...fadeUp(1)}>
              Un equipo peruano<br />con visión <span className="gradient-text">global</span>
            </motion.h2>
            <motion.p className="section-subtitle" style={{ textAlign: 'left', maxWidth: 480 }} {...fadeUp(2)}>
              Somos un equipo apasionado por el diseño y la tecnología con la misión de que cualquier negocio, grande o chico, tenga una presencia digital de primer nivel.
            </motion.p>
            <motion.p className="section-subtitle" style={{ textAlign: 'left', maxWidth: 480, marginTop: 0 }} {...fadeUp(3)}>
              Trabajamos con clientes de todo el mundo: Latinoamérica, Europa y más allá. Creamos proyectos de alto impacto sin importar la ubicación.
            </motion.p>

            <motion.div className="valores-list" {...fadeUp(4)}>
              {valores.map((v) => (
                <div key={v.titulo} className="valor-item">
                  <div className="valor-dot" />
                  <div>
                    <strong>{v.titulo}</strong>
                    <p>{v.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Columna derecha — stats */}
          <div className="nosotros-stats">
            {stats.map((s, i) => (
              <motion.div key={s.label} className="stat-card" {...fadeUp(i + 1)}>
                <span className="stat-numero">{s.numero}</span>
                <span className="stat-label">{s.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
