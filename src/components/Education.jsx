import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import StreetArtLayer from './StreetArtLayer'

const education = [
  {
    id: 1,
    school: 'Cavite State University — Bacoor Campus',
    degree: 'Bachelor of Science in Computer Science',
    period: 'Expected Graduation: 2026',
    current: true,
    color: '#56B6C6',
  },
  {
    id: 2,
    school: 'University of Perpetual Help System DALTA — Las Piñas Campus',
    degree: 'Senior High School (ICT Strand)',
    period: 'Graduated: 2020',
    current: false,
    color: '#8ACBD0',
  },
]

export default function Education() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section id="education" className="py-24 md:py-36 relative overflow-hidden" ref={sectionRef}>
      <StreetArtLayer sectionId="education" />
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-teal text-sm font-semibold uppercase tracking-[0.3em] block mb-4">
            Background
          </span>
          <h2 className="education-section__title text-4xl md:text-6xl transition-colors duration-700" style={{ fontFamily: 'var(--t-heading-font)', color: 'var(--t-text)' }}>
            Education
          </h2>
        </motion.div>
        
        {/* Timeline */}
        <div className="relative max-w-2xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-deep/10" />

          <div className="space-y-12">
            {education.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 + index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="relative pl-16 md:pl-20"
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-6 top-1 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full border-2 relative"
                    style={{
                      borderColor: item.color,
                      backgroundColor: item.current ? item.color : 'transparent',
                    }}>
                    {item.current && (
                      <div className="absolute inset-0 rounded-full animate-ping opacity-30"
                        style={{ backgroundColor: item.color }} />
                    )}
                  </div>
                </div>

                {/* Card */}
                <div className="glass-card p-6 rounded-[24px] transition-all duration-300">
                  {/* Period badge */}
                  <span className="inline-block text-xs font-semibold uppercase tracking-[0.15em] px-3 py-1 rounded-full mb-3"
                    style={{
                      backgroundColor: `${item.color}15`,
                      color: item.color,
                      border: `1px solid ${item.color}25`,
                    }}>
                    {item.period}
                  </span>

                  <h3 className="text-lg md:text-xl font-semibold leading-snug mb-1 transition-colors duration-700" style={{ color: 'var(--t-text)' }}>
                    {item.school}
                  </h3>
                  <p className="text-sm md:text-base font-light transition-colors duration-700" style={{ color: 'var(--t-text-muted)' }}>
                    {item.degree}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
