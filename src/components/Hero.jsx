import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import Particles from './Particles'
import MagneticButton from './MagneticButton'
import ErrorBoundary from './ErrorBoundary'
import { useTheme } from '../theme/ThemeContext'
import { trackEvent } from '../utils/analytics'
import cvFile from '../assets/Jan Manuel Bagares CV.pdf'

const GridScan = lazy(() => import('./GridScan'))
const Dither = lazy(() => import('./Dither'))

const heroCopyVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.12,
    },
  },
}

const heroItemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
  },
}

/* ─── Background per theme (unchanged) ────────────────────── */
function HeroBackground({ theme, themeId }) {
  if (themeId === 'missin-you-crazy') {
    return (
      <div className="hero-scene hero-scene--missin" aria-hidden="true">
        <Suspense fallback={null}>
          <div className="hero-scene__effect hero-scene__effect--grid">
            <GridScan
              sensitivity={0.48} lineThickness={1} linesColor="#2a3355"
              gridScale={0.15} lineStyle="dashed" lineJitter={0.06}
              scanColor="#ff99e8" scanOpacity={0.26} enablePost
              bloomIntensity={0.34} bloomThreshold={0.16} bloomSmoothing={0.18}
              chromaticAberration={0.0014} noiseIntensity={0.008}
              scanGlow={0.34} scanSoftness={1.6} scanDuration={2.6} scanDelay={2.4}
              className="w-full h-full"
            />
          </div>
        </Suspense>
        <div className="hero-scene__wash hero-scene__wash--missin" />
        <div className="hero-scene__glow hero-scene__glow--missin-purple" />
        <div className="hero-scene__glow hero-scene__glow--missin-pink" />
        <div className="hero-scene__cityline" />
      </div>
    )
  }

  if (themeId === 'hip-hop-mix') {
    return (
      <div className="hero-scene hero-scene--hiphop" aria-hidden="true">
        <Suspense fallback={null}>
          <div className="hero-scene__effect hero-scene__effect--dither">
            <Dither
              className="hero-dither-canvas" waveSpeed={0.085}
              waveFrequency={4.6} waveAmplitude={0.5}
              waveColor={[0.62, 0.14, 0.08]} colorNum={5} pixelSize={2.6}
              disableAnimation={false} enableMouseInteraction mouseRadius={0.18}
            />
          </div>
        </Suspense>
        <div className="hero-scene__wash hero-scene__wash--hiphop" />
        <div className="hero-scene__glow hero-scene__glow--hiphop-gold" />
        <div className="hero-scene__glow hero-scene__glow--hiphop-red" />
        <div className="hero-scene__border hero-scene__border--hiphop" />
      </div>
    )
  }

  return (
    <div className="hero-scene hero-scene--default" aria-hidden="true">
      <Particles
        particleColors={[theme.css['--t-accent'], theme.css['--t-accent-light'], theme.css['--t-text']]}
        particleCount={200} particleSpread={10} speed={0.1}
        particleBaseSize={300} moveParticlesOnHover particleHoverFactor={2}
        alphaParticles disableRotation={false}
      />
    </div>
  )
}

/* ─── Hero Component ──────────────────────────────────────── */
export default function Hero() {
  const { theme, themeId } = useTheme()
  const isMissin = themeId === 'missin-you-crazy'
  const isHipHop = themeId === 'hip-hop-mix'

  const titleFont = isHipHop
    ? '"Marsneveneksk", "Old English Text MT", "Lucida Blackletter", serif'
    : undefined

  const scrollToWorks = () => {
    document.getElementById('selected-works')?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className={`hero-section relative min-h-screen flex items-center justify-center overflow-hidden px-6 ${
        isMissin ? 'hero-section--missin' : isHipHop ? 'hero-section--hiphop' : 'hero-section--default'
      }`}
    >
      <div className="hero-section__backdrop absolute inset-0 z-0">
        <ErrorBoundary>
          <HeroBackground theme={theme} themeId={themeId} />
        </ErrorBoundary>
      </div>

      <div
        className={`hero-section__content relative z-10 mx-auto ${
          isMissin ? 'hero-section__content--framed' : ''
        } ${isHipHop ? 'hero-section__content--hiphop' : ''} hero-section__content--stack`}
      >
        <motion.div
          className="hero-copy"
          variants={heroCopyVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 className="hero-title hero-title--single-line" style={{ fontFamily: titleFont }} variants={heroItemVariants}>
            Jan Manuel Bagares
          </motion.h1>

          <motion.p className="hero-subtitle" variants={heroItemVariants}>
            <span>Junior Frontend Developer</span>
            <span className="hero-subtitle__separator" aria-hidden="true">|</span>
            <span>React &amp; TypeScript</span>
          </motion.p>

          <motion.p
            className="hero-availability"
            variants={heroItemVariants}
            style={{
              fontSize: '0.8rem',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              opacity: 0.78,
              margin: '0.35rem 0 0',
            }}
          >
            Las Pi&ntilde;as City, Metro Manila, Philippines
            <span className="block mt-2 normal-case tracking-[0.04em]">
              Available for full-time, part-time, and freelance work · Remote, hybrid, or on-site
            </span>
          </motion.p>

          <motion.div className="hero-stats" variants={heroItemVariants}>
            <span className="hero-stat">
              <span className="hero-stat__number">BSCS</span>
              <span className="hero-stat__label">2026 Graduate</span>
            </span>
            <span className="hero-stat__divider" aria-hidden="true" />
            <span className="hero-stat">
              <span className="hero-stat__number">React</span>
              <span className="hero-stat__label">TypeScript</span>
            </span>
            <span className="hero-stat__divider" aria-hidden="true" />
            <span className="hero-stat">
              <span className="hero-stat__number">2</span>
              <span className="hero-stat__label">Company Websites</span>
            </span>
          </motion.div>

          <motion.div className="hero-cta-wrap" variants={heroItemVariants}>
            <div className="hero-actions flex flex-wrap items-center justify-center gap-4">
              <MagneticButton onClick={scrollToWorks}>
                View Projects
              </MagneticButton>
              <MagneticButton
                href={cvFile}
                download="Jan Manuel Bagares CV.pdf"
                aria-label="Download Jan Manuel Bagares frontend developer resume"
                onClick={() => trackEvent('cv_download', { location: 'hero' })}
              >
                Download Resume
              </MagneticButton>
              <MagneticButton onClick={scrollToContact}>
                Contact Me
              </MagneticButton>
            </div>
          </motion.div>
          <motion.div className="hero-profile-links" variants={heroItemVariants} aria-label="Professional profiles and email">
            <a href="https://github.com/JmBagares" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/jan-manuel-bagares-977760337/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="mailto:jmbagares52@gmail.com">Email</a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        type="button"
        className="hero-scroll-indicator"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
        onClick={scrollToWorks}
        aria-label="Scroll to selected projects"
      >
        <span className="hero-scroll-indicator__text">Explore my projects</span>
        <svg
          className="hero-scroll-indicator__arrow"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M12 5v14M5 12l7 7 7-7"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.button>
    </section>
  )
}
