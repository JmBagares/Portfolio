import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useTheme } from '../theme/ThemeContext'
import { trackEvent } from '../utils/analytics'
import StreetArtLayer from './StreetArtLayer'
import petSosPreviewOne from '../assets/Projects/PetSOS/1.jpg'
import petSosPreviewTwo from '../assets/Projects/PetSOS/2.jpg'
import petSosPreviewThree from '../assets/Projects/PetSOS/3.jpg'
import petSosPreviewFour from '../assets/Projects/PetSOS/4.jpg'
import enrollmentPreview from '../assets/Projects/webp/enrollment.webp'
import enrollmentPreviewTwo from '../assets/Projects/webp/enrollment2.webp'
import enrollmentPreviewThree from '../assets/Projects/webp/enrollment3.webp'
import enrollmentPreviewFour from '../assets/Projects/webp/enrollment4.webp'
import gamePreviewOne from '../assets/Projects/webp/game1.webp'
import gamePreviewTwo from '../assets/Projects/webp/game2.webp'
import magnavalPreview from '../assets/Projects/webp/magnaval.webp'
import warduzPreview from '../assets/Projects/webp/warduz.webp'
import webItPreview from '../assets/Projects/webp/image1.webp'
import landingPageOne from '../assets/Projects/landingPage/webp/PetSOS1.webp'
import landingPageTwo from '../assets/Projects/landingPage/webp/PetSOS2.webp'
import landingPageThree from '../assets/Projects/landingPage/webp/PetSOS3.webp'
import landingPageFour from '../assets/Projects/landingPage/webp/PetSOS4.webp'
import landingPageFive from '../assets/Projects/landingPage/webp/PetSOS5.webp'
import landingPageSix from '../assets/Projects/landingPage/webp/PetSOS6.webp'
import lunanPreviewOne from '../assets/lunan/1.jpg'
import lunanPreviewTwo from '../assets/lunan/2.jpg'
import lunanPreviewThree from '../assets/lunan/3.jpg'
import lunanPreviewFour from '../assets/lunan/4.jpg'
import lunanPreviewFive from '../assets/lunan/5.jpg'
import lunanPreviewSix from '../assets/lunan/6.jpg'

const projects = [
  {
    id: 1,
    title: 'PetSOS',
    category: 'Mobile App',
    group: 'Mobile',
    description: 'Developed a community-based animal rescue mobile app focused on real-time incident reporting, geolocation tracking, volunteer coordination, and clear rescue flows. The product also integrated backend services and AI-assisted response support to help turn reports into faster, more organized action.',
    tags: ['React Native', 'Expo', 'Roboflow', 'OpenRouter (DeepSeek)', 'OpenStreetMap', 'Geolocation', 'API Integration', 'UI/UX', 'AI-Assisted Features'],
    status: 'Thesis Project',
    color: '#56B6C6',
    image: petSosPreviewOne,
    previews: [
      { src: petSosPreviewOne, alt: 'PetSOS mobile screen one' },
      { src: petSosPreviewTwo, alt: 'PetSOS mobile screen two' },
      { src: petSosPreviewThree, alt: 'PetSOS mobile screen three' },
      { src: petSosPreviewFour, alt: 'PetSOS mobile screen four' },
    ],
    phoneSlides: [
      { src: petSosPreviewOne, alt: 'PetSOS mobile screen one' },
      { src: petSosPreviewTwo, alt: 'PetSOS mobile screen two' },
      { src: petSosPreviewThree, alt: 'PetSOS mobile screen three' },
      { src: petSosPreviewFour, alt: 'PetSOS mobile screen four' },
    ],
    caseStudyUrl: '/case-study-petsos.html',
    links: [
      { label: 'View on GitHub', href: 'https://github.com/JmBagares/petsos-prototype' },
    ],
  },
  {
    id: 7,
    title: 'Lunan',
    category: 'Mobile App',
    group: 'Mobile',
    description: 'A cross-platform React Native (Expo) travel-diary app for pinning, photographing, and revisiting your favorite places on an interactive map. Features offline local storage, reverse geocoding, photo galleries, categories & ratings, light/dark theming, and JSON backups.',
    tags: ['React Native', 'Expo SDK 56', 'React Navigation', 'Leaflet / OpenStreetMap', 'AsyncStorage', 'expo-location', 'expo-image-picker'],
    status: 'Mobile App',
    color: '#8ACBD0',
    image: lunanPreviewOne,
    previews: [
      { src: lunanPreviewOne, alt: 'Lunan mobile screen one' },
      { src: lunanPreviewTwo, alt: 'Lunan mobile screen two' },
      { src: lunanPreviewThree, alt: 'Lunan mobile screen three' },
      { src: lunanPreviewFour, alt: 'Lunan mobile screen four' },
      { src: lunanPreviewFive, alt: 'Lunan mobile screen five' },
      { src: lunanPreviewSix, alt: 'Lunan mobile screen six' },
    ],
    phoneSlides: [
      { src: lunanPreviewOne, alt: 'Lunan mobile screen one' },
      { src: lunanPreviewTwo, alt: 'Lunan mobile screen two' },
      { src: lunanPreviewThree, alt: 'Lunan mobile screen three' },
      { src: lunanPreviewFour, alt: 'Lunan mobile screen four' },
      { src: lunanPreviewFive, alt: 'Lunan mobile screen five' },
      { src: lunanPreviewSix, alt: 'Lunan mobile screen six' },
    ],
    links: [
      { label: 'View on GitHub', href: 'https://github.com/JmBagares/Lunan' },
    ],
  },
  {
    id: 8,
    title: 'SignSense',
    category: 'AI / Computer Vision',
    group: 'Web',
    description: 'A real-time American Sign Language recognition and air-drawing web app that runs entirely in the browser. A neural network reads ASL fingerspelling into text, a GRU model recognizes whole-word signs from body and hand motion, and hand gestures let you draw in mid-air — all processed on-device, so the webcam feed never leaves your machine.',
    tags: ['React', 'MediaPipe', 'TensorFlow / Keras', 'Computer Vision', 'Canvas API'],
    status: 'Live Website',
    color: '#7C5CFF',
    image: '/projects/signsense/cover.svg',
    previews: [
      { src: '/projects/signsense/cover.svg', alt: 'SignSense real-time ASL recognition' },
    ],
    links: [
      { label: 'Live Demo', href: 'https://sign-sense-chi.vercel.app/' },
    ],
  },
  {
    id: 6,
    title: 'PetSOS Landing Page',
    category: 'Landing Page',
    group: 'Web',
    description: 'A sleek, modern promotional website for the PetSOS animal rescue mobile app. It features a highly interactive GSAP-powered DotGrid background, fluid Framer Motion entry animations, glassmorphism UI elements, and a responsive layout built with React 19 and Tailwind CSS.',
    tags: ['React 19', 'Tailwind CSS', 'Framer Motion', 'GSAP', 'TypeScript'],
    status: 'Live Website',
    color: '#F59E0B',
    image: landingPageOne,
    previews: [
      { src: landingPageOne, alt: 'PetSOS landing page preview 1' },
      { src: landingPageTwo, alt: 'PetSOS landing page preview 2' },
      { src: landingPageThree, alt: 'PetSOS landing page preview 3' },
      { src: landingPageFour, alt: 'PetSOS landing page preview 4' },
      { src: landingPageFive, alt: 'PetSOS landing page preview 5' },
      { src: landingPageSix, alt: 'PetSOS landing page preview 6' },
    ],
    images: [
      { src: landingPageOne, alt: 'PetSOS landing page preview 1' },
      { src: landingPageTwo, alt: 'PetSOS landing page preview 2' },
      { src: landingPageThree, alt: 'PetSOS landing page preview 3' },
      { src: landingPageFour, alt: 'PetSOS landing page preview 4' },
      { src: landingPageFive, alt: 'PetSOS landing page preview 5' },
      { src: landingPageSix, alt: 'PetSOS landing page preview 6' },
    ],
    links: [
      { label: 'Visit Website', href: 'https://pet-sos.vercel.app/' },
    ],
  },
  {
    id: 2,
    title: 'WordPress Business & Pet Shop Sites',
    category: 'WordPress / Elementor',
    group: 'Web',
    description: 'Developed and deployed two responsive WordPress websites using Elementor for Magnaval Services and Warduz Pet Shop, customizing themes, structuring service and product content, and refining the mobile experience for clear browsing on every screen size.',
    tags: ['WordPress', 'Elementor', 'Responsive Design', 'Theme Customization'],
    status: 'Live Websites',
    color: '#D4AF37',
    previews: [
      { src: magnavalPreview, alt: 'Magnaval Services website preview' },
      { src: warduzPreview, alt: 'Warduz Pet Shop website preview' },
    ],
    images: [
      { src: magnavalPreview, alt: 'Magnaval Services website preview' },
      { src: warduzPreview, alt: 'Warduz Pet Shop website preview' },
    ],
    links: [
      { label: 'Magnaval Services', href: 'https://magnavalservices.com' },
      { label: 'Warduz Pet Shop', href: 'https://warduzpetshop.com' },
    ],
  },
  {
    id: 3,
    title: 'Enrollment System Front End',
    category: 'Team Product UI',
    group: 'Web',
    description: 'Designed and developed the responsive front end of an enrollment system with React.js, CSS, and Bootstrap, using Axios-powered API requests and real-time form validation to keep the student flow smooth while coordinating closely with the team on backend integration and modern UI polish.',
    tags: ['React.js', 'CSS', 'Bootstrap', 'Axios', 'Form Validation'],
    status: 'Frontend Build',
    color: '#8ACBD0',
    image: enrollmentPreview,
    previews: [
      { src: enrollmentPreview, alt: 'Enrollment System front end preview' },
      { src: enrollmentPreviewTwo, alt: 'Enrollment System front end preview two' },
      { src: enrollmentPreviewThree, alt: 'Enrollment System front end preview three' },
      { src: enrollmentPreviewFour, alt: 'Enrollment System front end preview four' },
    ],
    links: [
      { label: 'View on GitHub', href: 'https://github.com/JmBagares/Enrollment-System' },
    ],
  },
  {
    id: 4,
    title: "Adventurer's Quest",
    category: 'Game Development',
    group: 'Game',
    description: 'Built a 2D adventure game in Godot, designing playable encounters, scene flow, and interaction systems while iterating on level structure and the overall gameplay loop. The project highlights hands-on work with game logic, environment setup, and shaping a more complete player experience from multiple connected scenes.',
    tags: ['Godot', '2D Game Development', 'Scene Design', 'Gameplay Logic'],
    status: 'Game Project',
    color: '#D4AF37',
    previews: [
      { src: gamePreviewOne, alt: "Adventurer's Quest gameplay preview one" },
      { src: gamePreviewTwo, alt: "Adventurer's Quest gameplay preview two" },
    ],
    images: [
      { src: gamePreviewOne, alt: "Adventurer's Quest gameplay preview one" },
      { src: gamePreviewTwo, alt: "Adventurer's Quest gameplay preview two" },
    ],
    links: [
      { label: 'View on GitHub', href: 'https://github.com/JmBagares/Adventurer-s-Quest' },
    ],
  },
  {
    id: 5,
    title: 'WebIT',
    category: 'Frontend Development',
    group: 'Web',
    description: 'Built a fictional company website for a course project, focusing on polished frontend layout, clean section structure, responsive presentation, and a more confident visual flow. The project highlights my ability to translate a subject requirement into a complete landing-page style experience.',
    tags: ['React.js', 'Frontend UI', 'Responsive Design', 'Component Layout'],
    status: 'Subject Project',
    color: '#56B6C6',
    image: webItPreview,
    previews: [
      { src: webItPreview, alt: 'WebIT website preview' },
    ],
    links: [
      { label: 'Visit Website', href: 'https://webit-fj6kgkjsx-jmbagares-projects.vercel.app/' },
    ],
  },
]

function getCardDescription(description, maxLength = 150) {
  if (description.length <= maxLength) {
    return description
  }

  const trimmedDescription = description.slice(0, maxLength).trimEnd()
  const lastWordBoundary = trimmedDescription.lastIndexOf(' ')
  const safeDescription = lastWordBoundary > 0
    ? trimmedDescription.slice(0, lastWordBoundary)
    : trimmedDescription

  return `${safeDescription}.....`
}

function ProjectCard({ project, index, onOpenProject }) {
  const { theme } = useTheme()
  const cardRef = useRef(null)
  const [isCardHovered, setIsCardHovered] = useState(false)
  const [isPhonePreviewOpen, setIsPhonePreviewOpen] = useState(false)
  const [activePhoneSlideIndex, setActivePhoneSlideIndex] = useState(0)
  const isInView = useInView(cardRef, { once: true, margin: '-50px' })
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ['start end', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])
  const projectTone = [
    theme.css['--t-accent'],
    theme.css['--t-accent-light'],
    theme.css['--t-accent-soft'] || theme.css['--t-accent'],
  ][index % 3]
  const previewImages = project.images?.length ? project.images : [{ src: project.image, alt: project.title }]
  const hasImageGrid = previewImages.length > 1
  const hasPhonePreview = project.phoneSlides?.length > 0
  const activePhoneSlide = hasPhonePreview ? project.phoneSlides[activePhoneSlideIndex] : null
  const hoverChipLabel = hasPhonePreview
    ? 'Open Preview'
    : project.links?.length
      ? 'View Project'
      : 'View Details'
  const cardDescription = hasPhonePreview && isPhonePreviewOpen
    ? project.description
    : getCardDescription(project.description)

  useEffect(() => {
    if (!hasPhonePreview || !isPhonePreviewOpen || project.phoneSlides.length < 2) {
      return undefined
    }

    const intervalId = window.setInterval(() => {
      setActivePhoneSlideIndex((currentIndex) => (currentIndex + 1) % project.phoneSlides.length)
    }, 3200)

    return () => window.clearInterval(intervalId)
  }, [hasPhonePreview, isPhonePreviewOpen, project.phoneSlides])

  const togglePhonePreview = () => {
    if (!hasPhonePreview) {
      return
    }

    setIsPhonePreviewOpen((currentState) => {
      if (!currentState) {
        trackEvent('project_preview_open', { project: project.title })
      }
      return !currentState
    })
  }

  const changePhoneSlide = (direction) => {
    if (!hasPhonePreview) {
      return
    }

    setActivePhoneSlideIndex((currentIndex) => {
      const slideCount = project.phoneSlides.length
      return (currentIndex + direction + slideCount) % slideCount
    })
  }

  const jumpToPhoneSlide = (slideIndex) => {
    setActivePhoneSlideIndex(slideIndex)
  }

  const handleCardClick = (event) => {
    if (event.target.closest('a, button')) {
      return
    }

    if (hasPhonePreview) {
      return
    }

    onOpenProject(project)
  }

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      exit={{ opacity: 0, y: 24 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group selected-works__item"
    >
      <motion.div
        className={`glass-card selected-works__card overflow-hidden h-full flex flex-col ${hasPhonePreview ? '' : 'cursor-pointer'}`}
        animate={theme.motion.floatY || {}}
        whileHover={theme.motion.cardHover}
        transition={theme.motion.cardSpring}
        onHoverStart={() => setIsCardHovered(true)}
        onHoverEnd={() => setIsCardHovered(false)}
        onClick={handleCardClick}
      >
        <div
          className={`relative overflow-hidden rounded-t-[24px] transition-[height] duration-500 ease-out ${hasPhonePreview && isPhonePreviewOpen ? 'h-168 sm:h-156 md:h-156 lg:h-160' : 'h-60 md:h-65'}`}
        >
          {hasPhonePreview && isPhonePreviewOpen ? (
            <div
              className="flex h-full flex-col items-center justify-start gap-4 px-4 pt-10 pb-5 sm:px-6 sm:pt-8 sm:pb-6 md:pt-12 md:pb-8 lg:pt-14 lg:pb-10"
              style={{
                background: `radial-gradient(circle at top, color-mix(in srgb, ${projectTone} 26%, transparent) 0%, transparent 48%), linear-gradient(180deg, color-mix(in srgb, var(--overlay-scrim) 82%, ${projectTone} 18%) 0%, color-mix(in srgb, var(--surface) 88%, ${projectTone} 12%) 100%)`,
              }}
            >
              <div className="relative mt-2 w-48 max-w-full rounded-[2.6rem] border border-white/12 bg-black/85 p-2 shadow-[0_28px_60px_rgba(0,0,0,0.34)] sm:mt-0 sm:w-52 md:mt-2 md:w-55 lg:mt-3">
                <div className="pointer-events-none absolute left-1/2 top-3 z-20 h-6 w-28 -translate-x-1/2 rounded-full bg-black/90 shadow-[0_6px_16px_rgba(0,0,0,0.45)]" />
                <div className="relative overflow-hidden rounded-[2rem] bg-black" style={{ aspectRatio: '9 / 19.5' }}>
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activePhoneSlide.src}
                      src={activePhoneSlide.src}
                      alt={activePhoneSlide.alt}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full bg-white object-contain object-top"
                      initial={{ opacity: 0, x: 18 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -18 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                    />
                  </AnimatePresence>
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b from-black/35 to-transparent" />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-black/30 to-transparent" />
                </div>
              </div>

              <div className="flex w-full max-w-76 flex-col items-center gap-3" onClick={(event) => event.stopPropagation()}>
                <div className="flex w-full items-center justify-between gap-3">
                  <p className="text-left text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: 'var(--label-text)' }}>
                    {project.title} App Screens
                  </p>
                  <button
                    type="button"
                    className="rounded-full px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] transition-transform duration-300 hover:-translate-y-0.5"
                    style={{
                      backgroundColor: `color-mix(in srgb, var(--badge-bg) 80%, ${projectTone} 20%)`,
                      color: 'var(--badge-text)',
                      border: `1px solid color-mix(in srgb, var(--badge-border) 68%, ${projectTone} 32%)`,
                    }}
                    onClick={togglePhonePreview}
                  >
                    Close Preview
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition-transform duration-300 hover:-translate-y-0.5"
                    style={{
                      backgroundColor: `color-mix(in srgb, var(--badge-bg) 80%, ${projectTone} 20%)`,
                      color: 'var(--badge-text)',
                      border: `1px solid color-mix(in srgb, var(--badge-border) 68%, ${projectTone} 32%)`,
                    }}
                    onClick={() => changePhoneSlide(-1)}
                  >
                    Prev
                  </button>
                  <span className="min-w-18 text-center text-xs font-medium" style={{ color: 'var(--card-muted)' }}>
                    {activePhoneSlideIndex + 1} / {project.phoneSlides.length}
                  </span>
                  <button
                    type="button"
                    className="rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition-transform duration-300 hover:-translate-y-0.5"
                    style={{
                      backgroundColor: `color-mix(in srgb, var(--badge-bg) 80%, ${projectTone} 20%)`,
                      color: 'var(--badge-text)',
                      border: `1px solid color-mix(in srgb, var(--badge-border) 68%, ${projectTone} 32%)`,
                    }}
                    onClick={() => changePhoneSlide(1)}
                  >
                    Next
                  </button>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {project.phoneSlides.map((slide, slideIndex) => (
                    <button
                      key={slide.src}
                      type="button"
                      aria-label={`Go to ${project.title} screen ${slideIndex + 1}`}
                      className="h-2.5 w-2.5 rounded-full transition-transform duration-300"
                      style={{
                        backgroundColor: slideIndex === activePhoneSlideIndex
                          ? projectTone
                          : 'color-mix(in srgb, var(--badge-border) 74%, transparent)',
                        transform: slideIndex === activePhoneSlideIndex ? 'scale(1.15)' : 'scale(1)',
                      }}
                      onClick={() => jumpToPhoneSlide(slideIndex)}
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : hasImageGrid ? (
            <div className="grid h-full grid-cols-2 gap-1 p-1">
              {previewImages.map((image) => (
                <motion.img
                  key={image.src}
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full rounded-[18px] object-cover"
                  style={{ y: imageY }}
                  animate={{ scale: isCardHovered ? 1.04 : 1 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                />
              ))}
            </div>
          ) : (
            <motion.img
              src={previewImages[0].src}
              alt={previewImages[0].alt}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
              style={{ y: imageY }}
              animate={{ scale: isCardHovered ? 1.05 : 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
          )}
          {!isPhonePreviewOpen ? (
            <motion.div
              className="pointer-events-none absolute inset-0"
              initial={false}
              animate={isCardHovered ? 'hover' : 'rest'}
            >
              <motion.div
                className="absolute inset-0"
                variants={{
                  rest: { opacity: 0.18 },
                  hover: { opacity: 1 },
                }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                style={{
                  background: `linear-gradient(180deg, color-mix(in srgb, ${projectTone} 12%, transparent) 0%, transparent 34%, color-mix(in srgb, var(--overlay-scrim) 82%, ${projectTone} 18%) 100%)`,
                }}
              />
              <motion.div
                className="absolute inset-3 rounded-[20px]"
                variants={{
                  rest: { opacity: 0.2, scale: 0.985 },
                  hover: { opacity: 0.92, scale: 1 },
                }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  border: `1px solid color-mix(in srgb, ${projectTone} 58%, rgba(255,255,255,0.2))`,
                  boxShadow: `0 0 0 1px color-mix(in srgb, ${projectTone} 18%, transparent), inset 0 0 0 1px rgba(255,255,255,0.08)`,
                }}
              />
              <motion.div
                className="selected-works__hover-chip absolute right-4 top-4 inline-flex items-center gap-2 rounded-full px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.18em]"
                variants={{
                  rest: { opacity: 0, x: 10, y: -8 },
                  hover: { opacity: 1, x: 0, y: 0 },
                }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  backgroundColor: `color-mix(in srgb, var(--badge-bg) 84%, ${projectTone} 16%)`,
                  color: 'var(--badge-text)',
                  border: `1px solid color-mix(in srgb, var(--badge-border) 74%, ${projectTone} 26%)`,
                  boxShadow: '0 16px 30px rgba(0,0,0,0.18)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <span>{hoverChipLabel}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M7 17L17 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M9 7H17V15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.div>
            </motion.div>
          ) : null}
          {hasPhonePreview && !isPhonePreviewOpen ? (
            <div className="pointer-events-none absolute bottom-4 right-4 rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] shadow-[0_12px_30px_rgba(0,0,0,0.24)]"
              style={{
                backgroundColor: `color-mix(in srgb, var(--badge-bg) 82%, ${projectTone} 18%)`,
                color: 'var(--badge-text)',
                border: `1px solid color-mix(in srgb, var(--badge-border) 72%, ${projectTone} 28%)`,
              }}
            >
              Interactive Preview
            </div>
          ) : null}
        </div>
        <div className="p-6 flex flex-col gap-4 grow">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="text-[11px] font-semibold uppercase tracking-[0.2em] inline-flex items-center"
              style={{ color: 'var(--label-text)', borderLeft: `3px solid ${projectTone}`, paddingLeft: '0.6rem' }}
            >
              {project.category}
            </span>
            {project.status && (
              <span
                className="rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em]"
                style={{
                  backgroundColor: `color-mix(in srgb, var(--status-bg) 82%, ${projectTone} 18%)`,
                  color: 'var(--status-text)',
                  border: `1px solid color-mix(in srgb, var(--badge-border) 74%, ${projectTone} 26%)`,
                }}
              >
                {project.status}
              </span>
            )}
          </div>
          <h3 className="text-2xl mb-4 transition-colors duration-700" style={{ fontFamily: 'var(--t-heading-font)', color: 'var(--card-text)' }}>
            {project.title}
          </h3>
          <p className="selected-works__summary text-sm leading-6 m-0" style={{ color: 'var(--card-muted)' }}>
            {cardDescription}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="text-xs px-3 py-1 rounded-full font-medium"
                style={{
                  backgroundColor: `color-mix(in srgb, var(--badge-bg) 82%, ${projectTone} 18%)`,
                  color: 'var(--badge-text)',
                  border: `1px solid color-mix(in srgb, var(--badge-border) 70%, ${projectTone} 30%)`,
                }}>
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-auto flex flex-col gap-3 pt-1">
            {hasPhonePreview ? (
              <button
                type="button"
                className="w-full rounded-full px-4 py-3 text-sm font-semibold uppercase tracking-[0.18em] transition-transform duration-300 hover:-translate-y-0.5 sm:w-fit"
                style={{
                  backgroundColor: `color-mix(in srgb, var(--badge-bg) 82%, ${projectTone} 18%)`,
                  color: 'var(--badge-text)',
                  border: `1px solid color-mix(in srgb, var(--badge-border) 72%, ${projectTone} 28%)`,
                }}
                onClick={togglePhonePreview}
              >
                {isPhonePreviewOpen ? 'Hide App Preview' : 'Open App Preview'}
              </button>
            ) : null}
            {project.caseStudyUrl ? (
              <a
                href={project.caseStudyUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="w-full rounded-full px-4 py-3 text-center text-sm font-semibold uppercase tracking-[0.18em] no-underline transition-transform duration-300 hover:-translate-y-0.5 sm:w-fit"
                style={{
                  background: projectTone,
                  color: 'var(--t-btn-text, #0e1116)',
                  border: `1px solid ${projectTone}`,
                }}
                onClick={() => trackEvent('case_study_open', { project: project.title })}
              >
                Read Case Study
              </a>
            ) : null}
            {project.links?.length ? (
              <div className="selected-works__links flex flex-wrap gap-3">
              {project.links.map((link) => (
                <a
                  key={link.href}
                  className="theme-link-muted text-sm font-medium"
                  href={link.href}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {link.label}
                </a>
              ))}
              </div>
            ) : null}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function ProjectModal({ project, onClose }) {
  const [activePreviewIndex, setActivePreviewIndex] = useState(0)

  if (!project) {
    return null
  }

  const previews = project.previews?.length
    ? project.previews
    : project.images?.length
      ? project.images
      : [{ src: project.image, alt: `${project.title} preview` }]
  const activePreview = previews[activePreviewIndex] ?? previews[0]
  const modalTitleId = `selected-works-modal-title-${project.id}`
  const modalDescriptionId = `selected-works-modal-description-${project.id}`

  return (
    <motion.div
      className="selected-works-modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      onClick={onClose}
    >
      <motion.div
        className="glass-card selected-works-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={modalTitleId}
        aria-describedby={modalDescriptionId}
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 18, scale: 0.98 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="selected-works-modal__content">
          <div className="selected-works-modal__header">
            <div className="selected-works-modal__heading-copy">
              <div className="selected-works-modal__eyebrow-row">
                <span className="selected-works-modal__eyebrow" style={{ borderLeft: `3px solid ${project.color}`, paddingLeft: '0.65rem' }}>
                  {project.category}
                </span>
                {project.status ? (
                  <span
                    className="selected-works-modal__status"
                    style={{
                      backgroundColor: `color-mix(in srgb, var(--status-bg) 82%, ${project.color} 18%)`,
                      color: 'var(--status-text)',
                      border: `1px solid color-mix(in srgb, var(--badge-border) 74%, ${project.color} 26%)`,
                    }}
                  >
                    {project.status}
                  </span>
                ) : null}
              </div>
              <h3 id={modalTitleId} className="selected-works-modal__title">
                {project.title}
              </h3>
            </div>

            <button
              type="button"
              className="selected-works-modal__close"
              aria-label={`Close ${project.title} project details`}
              onClick={onClose}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>

          <div className="selected-works-modal__body">
            <div className="selected-works-modal__preview-column">
              <div className="selected-works-modal__preview-shell">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activePreview.src}
                    src={activePreview.src}
                    alt={activePreview.alt}
                    loading="lazy"
                    decoding="async"
                    className="selected-works-modal__preview-image"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.24, ease: 'easeOut' }}
                  />
                </AnimatePresence>
              </div>

              {previews.length > 1 ? (
                <div className="selected-works-modal__thumb-row" aria-label={`${project.title} preview images`}>
                  {previews.map((preview, previewIndex) => (
                    <button
                      key={preview.src}
                      type="button"
                      className={`selected-works-modal__thumb ${previewIndex === activePreviewIndex ? 'selected-works-modal__thumb--active' : ''}`}
                      aria-label={`Show preview ${previewIndex + 1} for ${project.title}`}
                      onClick={() => setActivePreviewIndex(previewIndex)}
                    >
                      <img src={preview.src} alt="" aria-hidden="true" />
                    </button>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="selected-works-modal__details">
              <p id={modalDescriptionId} className="selected-works-modal__description">
                {project.description}
              </p>

              {project.tags?.length ? (
                <div className="selected-works-modal__section">
                  <span className="selected-works-modal__section-label">Tech Stack</span>
                  <div className="selected-works-modal__tag-row">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="selected-works-modal__tag"
                        style={{
                          backgroundColor: `color-mix(in srgb, var(--badge-bg) 82%, ${project.color} 18%)`,
                          color: 'var(--badge-text)',
                          border: `1px solid color-mix(in srgb, var(--badge-border) 70%, ${project.color} 30%)`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}

              {project.links?.length ? (
                <div className="selected-works-modal__section">
                  <span className="selected-works-modal__section-label">Project Links</span>
                  <div className="selected-works-modal__link-row">
                    {project.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="selected-works-modal__link"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

const PROJECT_FILTERS = ['All', ...Array.from(new Set(projects.map((project) => project.group).filter(Boolean)))]

export default function SelectedWorks() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [activeProject, setActiveProject] = useState(null)
  const [showAllProjects, setShowAllProjects] = useState(false)
  const [activeFilter, setActiveFilter] = useState('All')

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter((project) => project.group === activeFilter)
  const visibleProjects = showAllProjects ? filteredProjects : filteredProjects.slice(0, 4)

  const handleFilterChange = (filter) => {
    setActiveFilter(filter)
    setShowAllProjects(false)
  }

  const handleOpenProject = (project) => {
    trackEvent('project_view', { project: project.title })
    setActiveProject(project)
  }

  useEffect(() => {
    if (!activeProject) {
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
        setActiveProject(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
      document.body.style.paddingRight = previousPaddingRight
    }
  }, [activeProject])

  return (
    <section id="selected-works" className="selected-works-section py-24 md:py-36 relative overflow-hidden" ref={sectionRef}>
      <StreetArtLayer sectionId="selected-works" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="theme-label text-sm font-semibold uppercase tracking-[0.3em] block mb-4">Portfolio</span>
          <h2 className="selected-works-section__title text-4xl md:text-6xl lg:text-7xl transition-colors duration-700" style={{ fontFamily: 'var(--t-heading-font)', color: 'var(--text-primary)' }}>
            Selected Works
          </h2>
        </motion.div>

        <motion.div
          className="mb-10 flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          role="tablist"
          aria-label="Filter projects by category"
        >
          {PROJECT_FILTERS.map((filter) => {
            const isActive = activeFilter === filter
            return (
              <button
                key={filter}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => handleFilterChange(filter)}
                className="rounded-full px-5 py-2 text-sm font-semibold uppercase tracking-[0.16em] transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: isActive ? 'var(--t-btn-bg)' : 'color-mix(in srgb, var(--card-bg) 76%, transparent)',
                  color: isActive ? 'var(--t-btn-text)' : 'var(--text-muted)',
                  border: `1px solid ${isActive ? 'var(--button-border)' : 'color-mix(in srgb, var(--t-accent) 18%, transparent)'}`,
                  boxShadow: isActive ? 'var(--t-btn-shadow)' : 'none',
                }}
              >
                {filter}
              </button>
            )
          })}
        </motion.div>

        <div id="selected-works-grid" className="selected-works__grid">
          <AnimatePresence initial={false}>
            {visibleProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} onOpenProject={handleOpenProject} />
            ))}
          </AnimatePresence>
        </div>
        {filteredProjects.length > 4 ? (
          <motion.div
            className="mt-10 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              type="button"
              className="magnetic-btn rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] transition-transform duration-300 hover:-translate-y-0.5"
              style={{
                background: 'var(--t-btn-bg)',
                color: 'var(--t-btn-text)',
                borderRadius: 'var(--t-btn-radius)',
                border: '1px solid var(--button-border)',
                boxShadow: 'var(--t-btn-shadow)',
              }}
              onClick={() => setShowAllProjects((currentState) => !currentState)}
              aria-expanded={showAllProjects}
              aria-controls="selected-works-grid"
            >
              {showAllProjects ? 'Show Less' : 'Show More'}
            </button>
          </motion.div>
        ) : null}
      </div>

      <AnimatePresence>
        {activeProject ? <ProjectModal key={activeProject.id} project={activeProject} onClose={() => setActiveProject(null)} /> : null}
      </AnimatePresence>
    </section>
  )
}
