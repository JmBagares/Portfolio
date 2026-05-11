import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'

function formatTime(totalSeconds) {
  if (!Number.isFinite(totalSeconds) || totalSeconds <= 0) {
    return '0:00'
  }

  const minutes = Math.floor(totalSeconds / 60)
  const seconds = Math.floor(totalSeconds % 60)
  return `${minutes}:${String(seconds).padStart(2, '0')}`
}

function EqualizerBars({ isPlaying }) {
  return (
    <span className={`now-playing-indicator__equalizer ${isPlaying ? 'now-playing-indicator__equalizer--active' : ''}`} aria-hidden="true">
      {[0, 1, 2, 3].map((bar) => (
        <span
          key={bar}
          className="now-playing-indicator__bar"
          style={{ animationDelay: `${bar * 0.12}s` }}
        />
      ))}
    </span>
  )
}

export default function NowPlayingIndicator({ song, isPlaying, currentTime, duration }) {
  return createPortal(
    <AnimatePresence>
      {isPlaying && song ? (
        <motion.aside
          className="now-playing-indicator"
          initial={{ opacity: 0, y: 18, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 14, scale: 0.96 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          aria-live="polite"
        >
          <div className="now-playing-indicator__header">
            <span className="now-playing-indicator__eyebrow">Now Playing</span>
            <EqualizerBars isPlaying={isPlaying} />
          </div>

          <div className="now-playing-indicator__body">
            <p className="now-playing-indicator__title">{song.title}</p>
            <p className="now-playing-indicator__artist">{song.artist}</p>
          </div>

          <div className="now-playing-indicator__meta">
            <span>{`${formatTime(currentTime)} / ${formatTime(duration)}`}</span>
          </div>
        </motion.aside>
      ) : null}
    </AnimatePresence>,
    document.body,
  )
}
