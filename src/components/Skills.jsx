import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import wallBackground from '../assets/streets/bg wall.png'
import { useTheme } from '../theme/ThemeContext'
import StreetArtLayer from './StreetArtLayer'

const headingFonts = [
  '"DonGraffiti", "Impact", sans-serif',
  '"AnotherTag", "Trebuchet MS", sans-serif',
]

const tagFonts = [
  '"MostWasted", "Arial Black", sans-serif',
  '"AnotherTag", "Trebuchet MS", sans-serif',
]

const stickerTilts = ['-5deg', '3deg', '-2deg', '6deg', '-7deg', '2deg']

const skillCategories = [
  {
    label: 'Development',
    skills: [
      { name: 'HTML5 / CSS', color: '#56B6C6' },
      { name: 'JavaScript', color: '#8ACBD0' },
      { name: 'TypeScript', color: '#56B6C6' },
      { name: 'React', color: '#8ACBD0' },
      { name: 'React Native', color: '#8ACBD0' },
      { name: 'Framer Motion', color: '#56B6C6' },
      { name: 'Expo', color: '#56B6C6' },
      { name: 'Tailwind CSS', color: '#8ACBD0' },
      { name: 'Vite', color: '#56B6C6' },
      { name: 'Supabase', color: '#8ACBD0' },
      { name: 'Git', color: '#56B6C6' },
    ],
  },
  {
    label: 'Design & Hardware',
    skills: [
      { name: 'WordPress', color: '#8ACBD0' },
      { name: 'Elementor', color: '#56B6C6' },
      { name: 'Photoshop', color: '#8ACBD0' },
      { name: 'PC Assembly & Troubleshooting', color: '#56B6C6' },
      { name: 'Computer Hardware & Maintenance', color: '#8ACBD0' },
      { name: 'Networking Basics', color: '#56B6C6' },
    ],
  },
]

function SkillPill({ skill, index }) {
  const { theme } = useTheme()
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const ref = useRef(null)
  const skillTone = [
    theme.css['--t-accent'],
    theme.css['--t-accent-light'],
    theme.css['--t-accent-soft'] || theme.css['--t-accent'],
  ][index % 3]

  const handleMouseMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) * 0.15
    const dy = (e.clientY - cy) * 0.15
    setOffset({ x: dx, y: dy })
  }

  const handleMouseLeave = () => setOffset({ x: 0, y: 0 })

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: offset.x, y: offset.y }}
      initial={{ opacity: 0, scale: 0.7, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        type: 'spring', stiffness: 200, damping: 12,
        opacity: { delay: index * 0.05, duration: 0.5 },
        scale: { delay: index * 0.05, duration: 0.5 },
      }}
      whileHover={{ scale: 1.1, boxShadow: `0 8px 30px ${skillTone}40` }}
      className="inline-flex items-center px-6 py-3 rounded-full font-medium text-sm select-none"
      style={{
        backgroundColor: `color-mix(in srgb, var(--skill-bg) 86%, ${skillTone} 14%)`,
        color: 'var(--skill-text)',
        border: `1.5px solid color-mix(in srgb, var(--skill-border) 74%, ${skillTone} 26%)`,
      }}
    >
      <span className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: skillTone }} />
      {skill.name}
    </motion.div>
  )
}

export default function Skills() {
  const { theme, themeId } = useTheme()
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const isHipHopTheme = themeId === 'hip-hop-mix'

  let globalIndex = 0

  if (isHipHopTheme) {
    return (
      <section
        id="skills"
        className="skills-wall skills-wall--hiphop py-24 md:py-36"
        ref={sectionRef}
        style={{ '--skills-wall-image': `url(${wallBackground})` }}
      >
        <StreetArtLayer sectionId="skills" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="theme-label text-sm font-semibold uppercase tracking-[0.3em] block mb-4">
              Expertise
            </span>
            <h2
              className="skills-wall__title skills-wall__title--hiphop text-4xl md:text-6xl transition-colors duration-700"
              style={{ color: 'var(--text-primary)' }}
            >
              Skills &amp; Tools
            </h2>
          </motion.div>

          <div className="skills-wall__stage">
            {skillCategories.map((category, categoryIndex) => (
              <motion.article
                key={category.label}
                className={`skills-wall__column skills-wall__column--${categoryIndex + 1}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: categoryIndex * 0.08 }}
              >
                <p className="skills-wall__scribble">Street notes</p>
                <h3
                  className="skills-wall__heading"
                  style={{
                    color: 'var(--text-primary)',
                    fontFamily: headingFonts[categoryIndex % headingFonts.length],
                  }}
                >
                  {category.label}
                </h3>

                <div className="skills-wall__tag-grid">
                  {category.skills.map((skill) => {
                    const idx = globalIndex++
                    const tilt = stickerTilts[idx % stickerTilts.length]

                    return (
                      <motion.div
                        key={skill.name}
                        className={`skills-wall__tag skills-wall__tag--${(idx % 4) + 1}`}
                        initial={{ opacity: 0, y: 16, rotate: -2 }}
                        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                        viewport={{ once: true, margin: '-20px' }}
                        transition={{ duration: 0.35, delay: idx * 0.04 }}
                        whileHover={{ y: -4, rotate: 0, scale: 1.02 }}
                        style={{
                          fontFamily: tagFonts[idx % tagFonts.length],
                          '--street-accent': skill.color,
                          '--street-tilt': tilt,
                        }}
                      >
                        <span className="skills-wall__tag-name">{skill.name}</span>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="skills" className="py-24 md:py-36 relative overflow-hidden" ref={sectionRef}>
      <StreetArtLayer sectionId="skills" />
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div className="mb-16 text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="theme-label text-sm font-semibold uppercase tracking-[0.3em] block mb-4">
            Expertise
          </span>
          <h2 className="text-4xl md:text-6xl transition-colors duration-700" style={{ fontFamily: 'var(--t-heading-font)', color: 'var(--text-primary)' }}>
            Skills & Tools
          </h2>
        </motion.div>

        <div className="space-y-12">
          {skillCategories.map((category) => (
            <div key={category.label}>
              <motion.h3
                className="text-xs uppercase tracking-[0.25em] font-semibold mb-5 text-center transition-colors duration-700"
                style={{ color: 'var(--text-secondary)' }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                {category.label}
              </motion.h3>
              <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                {category.skills.map((skill) => {
                  const idx = globalIndex++
                  return <SkillPill key={skill.name} skill={skill} index={idx} />
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
