import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'

const GUIDE_ITEMS = [
  {
    icon: '🧭',
    title: 'Navigate',
    body: 'Use the top navigation bar to jump between sections, or simply scroll down to explore. You can grab my Resume any time from the navbar.',
  },
  {
    icon: '🎵',
    title: 'Change the vibe',
    body: 'Head to the Music section, then drag a vinyl onto the turntable (or tap an album) and press Play. Each song re-themes the entire site, so try all three!',
  },
  {
    icon: '🗂️',
    title: 'Browse my work',
    body: 'In Selected Works, filter projects by All, Mobile, Web, or Game. Click any card to read the full details and see the tech stack.',
  },
  {
    icon: '📱',
    title: 'Preview the mobile apps',
    body: 'For app projects like PetSOS and Lunan, hit “Open App Preview” to flip through interactive phone screens right inside the card.',
  },
  {
    icon: '🎨',
    title: 'Play around',
    body: 'When a music theme is active, the street-art posters and stickers scattered across sections are draggable, so toss them around.',
  },
  {
    icon: '✉️',
    title: 'Get in touch',
    body: 'Reach me through the contact form at the bottom of the page, or use the social links there. I’d love to hear from you.',
  },
]

export default function InfoGuide() {
  const [open, setOpen] = useState(false)
  const closeButtonRef = useRef(null)

  useEffect(() => {
    if (!open) {
      return undefined
    }

    const previousOverflow = document.body.style.overflow
    const previousPaddingRight = document.body.style.paddingRight
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

    document.body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    closeButtonRef.current?.focus()

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
      document.body.style.paddingRight = previousPaddingRight
    }
  }, [open])

  return (
    <>
      <motion.button
        type="button"
        className="info-guide-fab"
        onClick={() => setOpen(true)}
        aria-label="How to navigate this portfolio"
        aria-haspopup="dialog"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
      >
        <span className="info-guide-fab__pulse" aria-hidden="true" />
        <span className="info-guide-fab__glyph" aria-hidden="true">i</span>
      </motion.button>

      {createPortal(
        <AnimatePresence>
          {open ? (
            <motion.div
              className="info-guide-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              onClick={() => setOpen(false)}
            >
              <motion.div
                className="glass-card info-guide-panel"
                role="dialog"
                aria-modal="true"
                aria-labelledby="info-guide-title"
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 18, scale: 0.98 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                onClick={(event) => event.stopPropagation()}
              >
                <div className="info-guide-panel__header">
                  <div>
                    <span className="info-guide-panel__eyebrow">Quick Guide</span>
                    <h2 id="info-guide-title" className="info-guide-panel__title">
                      How to explore this portfolio
                    </h2>
                  </div>
                  <button
                    ref={closeButtonRef}
                    type="button"
                    className="info-guide-panel__close"
                    aria-label="Close guide"
                    onClick={() => setOpen(false)}
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>

                <ul className="info-guide-panel__list">
                  {GUIDE_ITEMS.map((item) => (
                    <li key={item.title} className="info-guide-item">
                      <span className="info-guide-item__icon" aria-hidden="true">{item.icon}</span>
                      <div>
                        <h3 className="info-guide-item__title">{item.title}</h3>
                        <p className="info-guide-item__body">{item.body}</p>
                      </div>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  className="info-guide-panel__cta"
                  onClick={() => setOpen(false)}
                >
                  Got it, let’s explore
                </button>
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>,
        document.body,
      )}
    </>
  )
}
