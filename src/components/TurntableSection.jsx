import { useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { musicOverlayByTheme } from '../theme/themeMedia'
import { useTheme } from '../theme/ThemeContext'
import VinylPlayer from './VinylPlayer'

export default function TurntableSection() {
  const { themeId } = useTheme()
  const [isPlaying, setIsPlaying] = useState(false)
  const stageRef = useRef(null)
  const overlayConfig = musicOverlayByTheme[themeId] ?? null

  const mediaFrameClass = useMemo(() => {
    if (themeId === 'happiness') return 'music-section__media-frame music-section__media-frame--happiness'
    if (themeId === 'missin-you-crazy') return 'music-section__media-frame music-section__media-frame--missin'
    if (themeId === 'hip-hop-mix') return 'music-section__media-frame music-section__media-frame--hiphop'
    return 'music-section__media-frame'
  }, [themeId])

  const floatingMedia = isPlaying && overlayConfig ? (
    <motion.figure
      className={`${overlayConfig.shellClassName} music-section__media-shell--draggable`}
      data-decoration-kind="animated"
      aria-hidden="true"
      drag
      dragConstraints={stageRef}
      dragElastic={0.18}
      dragMomentum={false}
      dragTransition={{ bounceStiffness: 420, bounceDamping: 28 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      whileDrag={{ scale: 1.05, zIndex: 8, cursor: 'grabbing' }}
    >
      <motion.div
        initial={{ y: 16, rotate: 8 }}
        animate={{ y: 0, rotate: 14 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      >
        <div></div>
        <div className={mediaFrameClass}>
          <img className="music-section__media-image" src={overlayConfig.src} alt="" draggable={false} />
        </div>
      </motion.div>
    </motion.figure>
  ) : null

  return (
    <section id="music" className="music-section py-24 md:py-32">
      <div className="music-section__glow" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="music-section__intro music-section__intro--compact mb-8 md:mb-10">
          <span className="theme-label text-sm font-semibold uppercase tracking-[0.3em] block">Music</span>
          <p className="m-0 text-sm md:text-base leading-7" style={{ color: 'var(--text-muted)' }}>
            Choose a song to change the theme. Drag a sleeve onto the platter, or tap an album cover to load it.
          </p>
        </div>

        <div ref={stageRef} className="music-section__stage">
          <DndProvider backend={HTML5Backend}>
            <VinylPlayer floatingMedia={floatingMedia} onPlaybackStateChange={setIsPlaying} />
          </DndProvider>
        </div>
      </div>
    </section>
  )
}