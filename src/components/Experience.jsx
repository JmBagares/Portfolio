import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import StreetArtLayer from './StreetArtLayer'

// NOTE: `period` values below are placeholders — update them to the real
// dates for each engagement before sharing this with recruiters.
const experience = [
  {
    id: 1,
    role: 'Lead Developer — Mobile Application',
    org: 'PetSOS · Undergraduate Thesis (Cavite State University × Dasmariñas City Veterinary Office)',
    period: '2025 – 2026',
    current: true,
    color: '#56B6C6',
    points: [
      'Led a four-person team and built the React Native (Expo, TypeScript) mobile app from the ground up.',
      'Implemented geotagged incident reporting, volunteer dispatch with live tracking, and camera-based rescue proof.',
      'Integrated the app with a Supabase backend and an AI prioritization service (Roboflow).',
      'Scored 4.64 / 5 (“Excellent”) on the ISO 25010 quality model across 50 evaluators.',
    ],
  },
  {
    id: 2,
    role: 'Freelance Web Developer',
    org: 'Magnaval Services & Warduz Pet Shop · Client Work',
    period: '2024',
    current: false,
    color: '#8ACBD0',
    points: [
      'Designed, built, and deployed two live, responsive WordPress / Elementor business sites for real clients.',
      'Customized themes, structured service and product content, and refined the mobile experience across screen sizes.',
    ],
  },
]

export default function Experience() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section id="experience" className="py-24 md:py-36 relative overflow-hidden" ref={sectionRef}>
      <StreetArtLayer sectionId="experience" />
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-teal text-sm font-semibold uppercase tracking-[0.3em] block mb-4">
            Where I&apos;ve Worked
          </span>
          <h2 className="education-section__title text-4xl md:text-6xl transition-colors duration-700" style={{ fontFamily: 'var(--t-heading-font)', color: 'var(--t-text)' }}>
            Experience
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-2xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-deep/10" />

          <div className="space-y-12">
            {experience.map((item, index) => (
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
                    {item.role}
                  </h3>
                  <p className="text-sm md:text-base font-light mb-4 transition-colors duration-700" style={{ color: 'var(--t-text-muted)' }}>
                    {item.org}
                  </p>

                  <ul className="space-y-2">
                    {item.points.map((point) => (
                      <li key={point} className="relative pl-5 text-sm font-light leading-relaxed transition-colors duration-700" style={{ color: 'var(--t-text-muted)' }}>
                        <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
