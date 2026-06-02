import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const STORAGE_KEY = 'preloader-shown'

export default function Preloader() {
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return false
    // Show only once per browser session.
    return sessionStorage.getItem(STORAGE_KEY) !== '1'
  })

  useEffect(() => {
    if (!visible) {
      return undefined
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [visible])

  const handleEnter = () => {
    sessionStorage.setItem(STORAGE_KEY, '1')
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="preloader"
          initial={{ opacity: 1 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            className="preloader__inner"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -28, scale: 0.96 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="preloader__eyebrow">Hello there</span>
            <span className="preloader__logo">
              Welcome<span>.</span>
            </span>
            <span className="preloader__tagline">
              I&apos;m Jan Manuel, a React Native &amp; Front-End Developer. Make yourself at home and take a look around my work.
            </span>

            <button type="button" className="preloader__btn" onClick={handleEnter}>
              <span>Explore Portfolio</span>
              <span className="preloader__arrow" aria-hidden="true">→</span>
            </button>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
