import { motion } from 'framer-motion'
import { useState } from 'react'

function fadeUp(i) {
  return {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }
}

const IconWhatsApp = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

const IconEmail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="20" height="20" aria-hidden="true">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-10 7L2 7" />
  </svg>
)

const IconLocation = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="20" height="20" aria-hidden="true">
    <path d="M12 2a7 7 0 0 1 7 7c0 5.25-7 13-7 13S5 14.25 5 9a7 7 0 0 1 7-7z" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>
)

export default function ContactoSection() {
  const [form, setForm] = useState({ nombre: '', email: '', mensaje: '' })
  const [enviado, setEnviado] = useState(false)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setEnviado(true)
  }

  return (
    <section className="section section--contacto" id="contacto">
      <div className="section-glow section-glow--purple-center" />
      <div className="section-glow section-glow--blue-left" />

      <div className="section-inner">
        <motion.div className="section-header" {...fadeUp(0)}>
          <span className="section-tag">Hablemos</span>
          <h2 className="section-title">
            ¿Listo para tu <span className="gradient-text">Mundo Digital</span>?
          </h2>
          <p className="section-subtitle">
            Cuéntanos tu proyecto y te respondemos en menos de 24 horas. Sin vueltas, sin costos ocultos.
          </p>
        </motion.div>

        <div className="contacto-layout">

          {/* Formulario */}
          <motion.div className="contacto-form-wrap" {...fadeUp(1)}>
            {!enviado ? (
              <form className="contacto-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="nombre">Tu nombre</label>
                  <input
                    id="nombre"
                    name="nombre"
                    type="text"
                    placeholder="¿Cómo te llamas?"
                    value={form.nombre}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Correo electrónico</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="tu@correo.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="mensaje">Cuéntanos tu proyecto</label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    rows={5}
                    placeholder="¿Qué necesitas? Landing page, sistema web, diseño... Cuéntanos todo."
                    value={form.mensaje}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="btn-primary glow-border contacto-btn">
                  Enviar mensaje →
                </button>
              </form>
            ) : (
              <div className="contacto-success">
                <div className="success-icon">✓</div>
                <h3>¡Mensaje recibido!</h3>
                <p>Gracias por escribirnos. Te contactamos a la brevedad.</p>
              </div>
            )}
          </motion.div>

          {/* Info de contacto */}
          <motion.div className="contacto-info" {...fadeUp(2)}>
            <div className="contacto-info-card">
              <h3>También puedes escribirnos directo</h3>

              <a
                href="https://wa.me/51915175071"
                target="_blank"
                rel="noreferrer"
                className="contacto-canal"
              >
                <div className="canal-icono canal-icono--whatsapp">
                  <IconWhatsApp />
                </div>
                <div>
                  <strong>WhatsApp</strong>
                  <span>+51 915 175 071</span>
                </div>
              </a>

              <a href="mailto:xzstewie@gmail.com" className="contacto-canal">
                <div className="canal-icono canal-icono--email">
                  <IconEmail />
                </div>
                <div>
                  <strong>Email</strong>
                  <span>xzstewie@gmail.com</span>
                </div>
              </a>

              <div className="contacto-canal">
                <div className="canal-icono canal-icono--ubicacion">
                  <IconLocation />
                </div>
                <div>
                  <strong>Ubicación</strong>
                  <span>Perú</span>
                </div>
              </div>

              <div className="contacto-horario">
                <p>Lunes a viernes, 9am – 7pm</p>
                <p>Nos contactaremos a la brevedad posible.</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Footer mínimo */}
      <div className="footer">
        <p>© 2026 LandingYa · Hecho con dedicación desde Perú 🇵🇪</p>
      </div>
    </section>
  )
}
