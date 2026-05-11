import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import StreetArtLayer from './StreetArtLayer'

const FEATURED_PROJECT = {
  title: 'PetSOS',
  tags: ['Expo', 'React Native', 'TypeScript', 'AI/ML', 'Geolocation'],
}

export default function AboutMe() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section id="about" className="py-24 md:py-36 relative overflow-hidden" ref={sectionRef}>
      {/* Subtle background accent */}
      <div className="absolute top-0 right-0 w-125 h-125 rounded-full opacity-8 blur-[80px] pointer-events-none transition-colors duration-1000"
        style={{ background: 'radial-gradient(circle, var(--t-accent), transparent 70%)' }} />
      <StreetArtLayer sectionId="about" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-teal text-sm font-semibold uppercase tracking-[0.3em] block mb-4">
            About
          </span>
          <h2 className="about-section__title text-4xl md:text-6xl lg:text-7xl transition-colors duration-700"
            style={{ fontFamily: 'var(--t-heading-font)' }}>
            About Me
          </h2>
        </motion.div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Photo placeholder */}
          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative">
              <div
                className="w-full aspect-3/4 rounded-[32px] flex flex-col items-center justify-center gap-4 overflow-hidden transition-colors duration-700"
                style={{
                  background: 'var(--t-card-bg)',
                  border: '2px dashed var(--t-card-border)',
                }}
              >
                {/* Avatar placeholder icon */}
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" className="opacity-30">
                  <circle cx="32" cy="24" r="12" stroke="#56B6C6" strokeWidth="2" />
                  <path d="M10 56c0-12.15 9.85-22 22-22s22 9.85 22 22" stroke="#56B6C6" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <span className="text-teal/40 text-sm font-medium tracking-wide">Photo Coming Soon</span>
              </div>

              <div className="absolute -bottom-4 -right-4 w-full h-full rounded-[32px] -z-10 transition-colors duration-700"
                style={{
                  background: 'var(--t-btn-bg)',
                  opacity: 0.12,
                }}
              />
            </div>

          </motion.div>

          {/* Bio text */}
          <motion.div
            className="lg:col-span-8 space-y-6"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-lg md:text-xl leading-relaxed font-light transition-colors duration-700" style={{ color: 'var(--t-text)' }}>
              Passionate and driven <strong className="font-semibold">Front-End Developer</strong> based
              in Las Piñas, Metro Manila, Philippines. At 24 years old, I am a Bachelor of Science in Computer
              Science student dedicated to building immersive digital experiences.
            </p>

            <p className="text-base md:text-lg leading-relaxed font-light transition-colors duration-700" style={{ color: 'var(--t-text-muted)' }}>
              I thrive at the intersection of creativity and logic, with a deep interest in developing
              applications and crafting creative UI/UX. My technical expertise is built on a foundation
              of <strong className="font-medium" style={{ color: 'var(--t-text)' }}>HTML, CSS, JavaScript, and React.js</strong>,
              complemented by a strong hands-on background in PC maintenance, assembly, and troubleshooting.
              I am particularly fascinated by the synergy between high-end hardware and modern software development.
            </p>

            {/* Featured Project Card */}
            <motion.div
              className="glass-card mt-8 p-6 md:p-8 rounded-[24px] relative overflow-hidden"
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Accent stripe */}
              <div className="absolute top-0 left-0 w-1.5 h-full rounded-l-[24px]"
                style={{ background: 'var(--t-btn-bg)' }} />

              <div className="pl-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-teal text-xs font-semibold uppercase tracking-[0.2em]">Featured Project</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-teal" />
                </div>

                <h3 className="text-2xl md:text-3xl mb-4 transition-colors duration-700"
                  style={{ fontFamily: 'var(--t-heading-font)', color: 'var(--t-text)' }}>
                  {FEATURED_PROJECT.title}
                </h3>

                <p className="text-base leading-relaxed font-light transition-colors duration-700" style={{ color: 'var(--t-text-muted)' }}>
                  A major highlight of my academic career is my thesis project, <strong className="font-medium" style={{ color: 'var(--t-text)' }}>{FEATURED_PROJECT.title}</strong>—an
                  App-Based AI-Assisted Geolocation and Automated Response System for Community-Based Animal
                  Rescue. I served as the <strong className="font-medium" style={{ color: 'var(--t-text)' }}>Lead Developer</strong> for
                  the mobile application, which I built from the ground up
                  using <strong className="font-medium" style={{ color: 'var(--t-text)' }}>Expo, React Native, and TypeScript</strong>.
                  This project showcases my ability to leverage cutting-edge frameworks to solve real-world
                  problems while managing the complexities of mobile architecture and geolocation services.
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2 mt-5">
                  {FEATURED_PROJECT.tags.map(tag => (
                    <span key={tag}
                      className="text-xs px-3 py-1 rounded-full font-medium"
                      style={{
                        backgroundColor: 'rgba(86,182,198,0.1)',
                        color: '#56B6C6',
                        border: '1px solid rgba(86,182,198,0.2)',
                      }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
