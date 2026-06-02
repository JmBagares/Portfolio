import { lazy, Suspense, useEffect } from 'react'
import { Analytics } from '@vercel/analytics/react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AboutMe from './components/AboutMe'
import SelectedWorks from './components/SelectedWorks'
import Skills from './components/Skills'
import Education from './components/Education'
import Contact from './components/Contact'
import CustomCursor from './components/CustomCursor'
import ErrorBoundary from './components/ErrorBoundary'
import { initializeAnalytics, initScrollDepthTracking } from './utils/analytics'

// The turntable pulls in react-dnd + the vinyl player, so it's split out of the
// initial bundle and loaded once the user scrolls toward it.
const TurntableSection = lazy(() => import('./components/TurntableSection'))

export default function App() {
  useEffect(() => {
    initializeAnalytics()
    const cleanupScrollTracking = initScrollDepthTracking()
    return cleanupScrollTracking
  }, [])

  return (
    <div className="min-h-screen">
      <CustomCursor />
      <Navbar />

      <main className="portfolio-shell relative">
        <Hero />
        <AboutMe />
        <SelectedWorks />

        <ErrorBoundary>
          <Suspense fallback={<div style={{ minHeight: '60vh' }} aria-hidden="true" />}>
            <TurntableSection />
          </Suspense>
        </ErrorBoundary>

        <Skills />
        <Education />
        <Contact />
      </main>
      <Analytics />
    </div>
  )
}
