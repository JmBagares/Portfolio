import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AboutMe from './components/AboutMe'
import SelectedWorks from './components/SelectedWorks'
import TurntableSection from './components/TurntableSection'
import Skills from './components/Skills'
import Education from './components/Education'
import Contact from './components/Contact'
import CustomCursor from './components/CustomCursor'

export default function App() {
  return (
    <div className="min-h-screen">
      <CustomCursor />
      <Navbar />

      <main className="portfolio-shell relative">
        <Hero />
        <AboutMe />
        <SelectedWorks />

        <TurntableSection />

        <Skills />
        <Education />
        <Contact />
      </main>
    </div>
  )
}
