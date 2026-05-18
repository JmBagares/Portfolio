import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'

const navLinks = [
  { label: 'About', href: '#about', sectionId: 'about' },
  { label: 'Works', href: '#selected-works', sectionId: 'selected-works' },
  { label: 'Music', href: '#music', sectionId: 'music' },
  { label: 'Skills', href: '#skills', sectionId: 'skills' },
  { label: 'Education', href: '#education', sectionId: 'education' },
  { label: 'Contact', href: '#contact', sectionId: 'contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  const updateActiveSection = useCallback(() => {
    const sections = navLinks.map(l => l.sectionId).map(id => document.getElementById(id)).filter(Boolean)
    const scrollPos = window.scrollY + window.innerHeight * 0.35
    let current = ''
    for (const section of sections) {
      if (section.offsetTop <= scrollPos) {
        current = section.id
      }
    }
    setActiveSection(current)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
      updateActiveSection()
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    updateActiveSection()
    return () => window.removeEventListener('scroll', onScroll)
  }, [updateActiveSection])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-3 backdrop-blur-xl shadow-sm bg-(--t-nav-bg)'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="font-semibold text-lg tracking-tight no-underline" style={{ color: 'var(--t-text)' }}>
          <span style={{ fontFamily: 'var(--t-heading-font)', fontSize: '1.5rem', transition: 'font-family 0.5s ease' }}>JM</span>
          <span style={{ color: 'var(--accent-ink)', transition: 'color 0.8s ease' }}>.</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`theme-link-muted text-sm font-medium tracking-wide no-underline relative group ${activeSection === link.sectionId ? 'nav-link--active' : ''}`}
            >
              {link.label}
              <span
                className={`absolute -bottom-1 left-0 h-0.5 transition-all duration-300 ${activeSection !== link.sectionId ? 'group-hover:w-full' : ''}`}
                style={{
                  backgroundColor: 'var(--accent-ink)',
                  width: activeSection === link.sectionId ? '100%' : '0%',
                }}
              />
            </a>
          ))}
          <a
            href="mailto:jmbagares52@gmail.com"
            className="magnetic-btn px-5 py-2 text-sm font-semibold no-underline"
            style={{ 
              background: 'var(--t-btn-bg)', 
              color: 'var(--t-btn-text)',
              borderRadius: 'var(--t-btn-radius)',
              transition: 'background 0.8s ease, color 0.8s ease, border-radius 0.8s ease'
            }}
          >
            Hire Me
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden flex flex-col gap-1.5 bg-transparent border-none p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <motion.span
            animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="block w-6 h-0.5"
            style={{ backgroundColor: 'var(--t-text)' }}
          />
          <motion.span
            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block w-6 h-0.5"
            style={{ backgroundColor: 'var(--t-text)' }}
          />
          <motion.span
            animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="block w-6 h-0.5"
            style={{ backgroundColor: 'var(--t-text)' }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden backdrop-blur-xl"
            style={{ backgroundColor: 'var(--t-nav-bg)' }}
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-lg font-medium no-underline"
                  style={{ color: activeSection === link.sectionId ? 'var(--t-accent)' : 'var(--text-primary)' }}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="mailto:jmbagares52@gmail.com"
                onClick={() => setMobileOpen(false)}
                className="magnetic-btn mt-2 px-5 py-3 text-center text-sm font-semibold no-underline"
                style={{
                  background: 'var(--t-btn-bg)',
                  color: 'var(--t-btn-text)',
                  borderRadius: 'var(--t-btn-radius)',
                }}
              >
                Hire Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll progress bar */}
      <motion.div
        className="nav-scroll-progress"
        style={{ scaleX: smoothProgress, transformOrigin: '0%' }}
        aria-hidden="true"
      />
    </motion.nav>
  )
}
