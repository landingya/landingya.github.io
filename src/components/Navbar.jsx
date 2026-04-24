import { motion } from 'framer-motion'

const links = ['Inicio', 'Servicios', 'Nosotros', 'Proyectos', 'Contacto']

export default function Navbar() {
  return (
    <motion.nav
      className="navbar"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <a className="navbar-logo" href="#inicio" aria-label="LandingYa">
        <span className="logo-landing">Landing</span>
        <span className="logo-ya">Ya</span>
      </a>

      {/* Links centrados absolutamente con glassmorphism */}
      <ul className="navbar-links">
        {links.map((item) => (
          <li key={item}>
            <a href={`#${item.toLowerCase()}`}>{item}</a>
          </li>
        ))}
      </ul>
    </motion.nav>
  )
}
