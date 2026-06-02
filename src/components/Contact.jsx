import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import StreetArtLayer from './StreetArtLayer'

const SOCIAL_LINKS = [
  { label: 'Facebook', href: 'https://www.facebook.com/jm.bagares.14/', external: true },
  { label: 'GitHub', href: 'https://github.com/JmBagares', external: true },
  { label: 'Instagram', href: 'https://www.instagram.com/ziim_69/', external: true },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jan-manuel-bagares-977760337/', external: true },
  { label: 'Gmail', href: 'mailto:jmbagares52@gmail.com', external: false },
]

export default function Contact() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [isExpanded, setIsExpanded] = useState(false)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const btnRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!btnRef.current) return
    const rect = btnRef.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    setOffset({ x: (e.clientX - cx) * 0.2, y: (e.clientY - cy) * 0.2 })
  }

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 })
    setIsExpanded(false)
  }

  return (
    <footer id="contact" className="py-24 md:py-36 relative overflow-hidden" ref={sectionRef}>
      {/* Background decorative element */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-200 h-100 rounded-full opacity-10 transition-colors duration-1000"
          style={{ background: 'radial-gradient(ellipse, var(--t-accent), transparent 70%)' }}
        />
      </div>
      <StreetArtLayer sectionId="contact" />

      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="theme-label text-sm font-semibold uppercase tracking-[0.3em] block mb-4">
            Get in Touch
          </span>
          <h2 className="contact-section__title text-4xl md:text-6xl lg:text-7xl mb-6 transition-colors duration-700"
            style={{ fontFamily: 'var(--t-heading-font)', color: 'var(--text-primary)' }}>
            Have a project in mind?
          </h2>
          <p className="text-lg md:text-xl max-w-xl mx-auto mb-14 font-light transition-colors duration-700"
            style={{ color: 'var(--text-muted)' }}>
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
        </motion.div>

        {/* Expanding "Let's Talk" button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.a
            ref={btnRef}
            href="mailto:jmbagares52@gmail.com"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={handleMouseLeave}
            animate={{
              x: offset.x, y: offset.y,
              paddingLeft: isExpanded ? 64 : 48,
              paddingRight: isExpanded ? 64 : 48,
              paddingTop: isExpanded ? 28 : 20,
              paddingBottom: isExpanded ? 28 : 20,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 15, mass: 0.3 }}
            className="magnetic-btn inline-flex items-center gap-3 text-xl md:text-2xl font-semibold no-underline"
            style={{ 
              background: 'var(--t-btn-bg)',
              color: 'var(--t-btn-text)',
              borderRadius: 'var(--t-btn-radius)',
              transition: 'background 0.8s ease, color 0.8s ease, border-radius 0.8s ease'
            }}
          >
            <span>Let's Talk</span>
            <motion.span
              animate={{ x: isExpanded ? 6 : 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            >
              →
            </motion.span>
          </motion.a>
        </motion.div>

        {/* Social links */}
        <motion.div
          className="mt-20 flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {SOCIAL_LINKS.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              className="theme-link-muted inline-flex items-center gap-2 rounded-full border px-4 py-3 text-sm font-medium tracking-wide no-underline"
              whileHover={{ y: -3 }}
              style={{
                borderColor: 'color-mix(in srgb, var(--t-accent) 18%, transparent)',
                background: 'color-mix(in srgb, var(--card-bg) 76%, transparent)',
                boxShadow: '0 12px 28px rgba(0,0,0,0.08)',
              }}
            >
              <span>{link.label}</span>
              <span aria-hidden="true">/</span>
            </motion.a>
          ))}
        </motion.div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t" style={{ borderColor: 'color-mix(in srgb, var(--t-text) 10%, transparent)' }}>
          <p className="text-sm font-light" style={{ color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} — Designed & Built with precision
            </p>
        </div>
      </div>
    </footer>
  )
}
