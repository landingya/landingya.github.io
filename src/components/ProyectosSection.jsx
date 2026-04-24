import { motion } from 'framer-motion'

const proyectos = [
  {
    nombre: 'Cevichería El Muelle',
    tipo: 'Landing Page',
    desc: 'Landing premium para restaurante de mariscos en Miraflores. Reservas online, menú animado y galería de platos.',
    color: 'from-cyan-500 to-blue-600',
    grad: 'linear-gradient(135deg, #06b6d4, #2563eb)',
    tags: ['Restaurante', 'Reservas', 'Lima'],
  },
  {
    nombre: 'AndesInmobiliaria',
    tipo: 'Sistema Web',
    desc: 'Plataforma de gestión de propiedades para inmobiliaria con más de 200 inmuebles en Lima y provincias.',
    color: 'from-purple-500 to-indigo-600',
    grad: 'linear-gradient(135deg, #8b5cf6, #4f46e5)',
    tags: ['Inmobiliaria', 'Dashboard', 'CRM'],
  },
  {
    nombre: 'FitnessPro Perú',
    tipo: 'Landing + App',
    desc: 'Landing y app web para cadena de gimnasios. Registro de miembros, clases online y seguimiento de rutinas.',
    color: 'from-orange-500 to-pink-600',
    grad: 'linear-gradient(135deg, #f97316, #db2777)',
    tags: ['Fitness', 'Membresías', 'App'],
  },
  {
    nombre: 'Clínica Salud+',
    tipo: 'Landing Page',
    desc: 'Presencia digital para clínica privada en San Isidro. Citas online, especialidades y portal de pacientes.',
    color: 'from-teal-500 to-cyan-600',
    grad: 'linear-gradient(135deg, #14b8a6, #0891b2)',
    tags: ['Salud', 'Citas', 'Corporativo'],
  },
  {
    nombre: 'ArtesaníaPerú',
    tipo: 'E-commerce',
    desc: 'Tienda online de artesanías y textiles peruanos con envíos internacionales. Catálogo de 500+ productos.',
    color: 'from-amber-500 to-orange-600',
    grad: 'linear-gradient(135deg, #f59e0b, #ea580c)',
    tags: ['E-commerce', 'Exportación', 'Cultura'],
  },
  {
    nombre: 'LegalMind Estudio',
    tipo: 'Landing Page',
    desc: 'Landing corporativa para estudio de abogados especializado en derecho empresarial y comercio exterior.',
    color: 'from-slate-500 to-blue-700',
    grad: 'linear-gradient(135deg, #64748b, #1d4ed8)',
    tags: ['Legal', 'Corporativo', 'B2B'],
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
              <div className="proyecto-preview" style={{ background: p.grad }}>
                <div className="proyecto-preview-inner">
                  <span className="proyecto-tipo-badge">{p.tipo}</span>
                  <span className="proyecto-nombre-preview">{p.nombre}</span>
                </div>
              </div>

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
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
