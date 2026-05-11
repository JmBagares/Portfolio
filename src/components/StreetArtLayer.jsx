import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../theme/ThemeContext'
import { sectionMediaByTheme } from '../theme/themeMedia'

export default function StreetArtLayer({ sectionId }) {
  const { themeId } = useTheme()
  const posters = sectionMediaByTheme[themeId]?.[sectionId] ?? []
  const layerRef = useRef(null)

  if (!posters.length) {
    return null
  }

  return (
    <div ref={layerRef} className="section-media-layer" aria-hidden="true">
      {posters.map((poster, index) => (
        <motion.figure
          key={poster.id}
          className={`${poster.className} section-media--draggable`}
          data-decoration-kind={poster.kind}
          drag
          dragConstraints={layerRef}
          dragElastic={0.18}
          dragMomentum={false}
          dragTransition={{ bounceStiffness: 420, bounceDamping: 28 }}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          whileDrag={{ scale: 1.05, zIndex: 8, cursor: 'grabbing' }}
          transition={{
            opacity: { duration: 0.45, delay: 0.08 * index },
            scale: { duration: 0.45, delay: 0.08 * index },
          }}
        >
          <motion.div
            initial={{ y: 12, rotate: 0 }}
            animate={poster.animate}
            transition={{
              y: { duration: 11 + index, repeat: Infinity, ease: 'easeInOut' },
              rotate: { duration: 13 + index, repeat: Infinity, ease: 'easeInOut' },
            }}
          >
            <div className={`section-media__frame section-media__frame--${poster.frameVariant}`}>
              {poster.kind === 'video' ? (
                <video
                  className="section-media__video"
                  src={poster.src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  aria-hidden="true"
                  draggable={false}
                />
              ) : (
                <img className="section-media__image" src={poster.src} alt="" draggable={false} />
              )}
            </div>
          </motion.div>
        </motion.figure>
      ))}
    </div>
  )
}