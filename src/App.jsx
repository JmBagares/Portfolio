import { lazy, Suspense, useEffect } from 'react'
import { MotionConfig } from 'framer-motion'
import { Analytics } from '@vercel/analytics/react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AboutMe from './components/AboutMe'
import SelectedWorks from './components/SelectedWorks'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Education from './components/Education'
import Contact from './components/Contact'
import CustomCursor from './components/CustomCursor'
import ErrorBoundary from './components/ErrorBoundary'
import InfoGuide from './components/InfoGuide'
import { initializeAnalytics, initScrollDepthTracking } from './utils/analytics'

// The turntable pulls in react-dnd + the vinyl player, so it's split out of the
// initial bundle.
const TurntableSection = lazy(() => import('./components/TurntableSection'))

export default function App() {
  useEffect(() => {
    initializeAnalytics()
    const cleanupScrollTracking = initScrollDepthTracking()
    return cleanupScrollTracking
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen">
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <CustomCursor />
        <Navbar />
        <InfoGuide />

        <main id="main-content" className="portfolio-shell relative">
          <Hero />
          <SelectedWorks />
          <Experience />
          <Skills />
          <AboutMe />
          <Education />

          <ErrorBoundary>
            <Suspense fallback={<div style={{ minHeight: '60vh' }} aria-hidden="true" />}>
              <TurntableSection />
            </Suspense>
          </ErrorBoundary>

          <Contact />
        </main>
        <Analytics />
      </div>
    </MotionConfig>
  )
}
