import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useDrag, useDragLayer, useDrop } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'
import seeYouAgainBg from '../assets/BG/SeeYouAgain.jpg'
import nobodyKnowsBg from '../assets/BG/russ.jpg'
import writeThisDownBg from '../assets/BG/WritethisDownBG.jpg'
import seeYouAgainSrc from '../assets/songs/SEE YOU AGAIN featuring Kali Uchis.mp3'
import nobodyKnowsSrc from '../assets/songs/Russ - Nobody Knows (Official Audio).mp3'
import writeThisDownSrc from '../assets/songs/write_this_down.mp3'
import useVinylPlayer from '../hooks/useVinylPlayer'
import { useTheme } from '../theme/ThemeContext'
import NowPlayingIndicator from './NowPlayingIndicator'

const VINYL_ITEM = 'vinyl-record'

const RECORDS = [
  {
    id: 'happiness',
    title: 'See You Again',
    artist: 'Tyler, The Creator feat. Kali Uchis',
    src: seeYouAgainSrc,
    sleeveImage: seeYouAgainBg,
    labelColor: '#F09A54',
    labelDark: '#D76B3A',
    accent: '#f2b574',
  },
  {
    id: 'missin-you-crazy',
    title: 'Nobody Knows',
    artist: 'Russ',
    src: nobodyKnowsSrc,
    sleeveImage: nobodyKnowsBg,
    labelColor: '#7A6EE6',
    labelDark: '#4E449E',
    accent: '#7fa1ff',
  },
  {
    id: 'hip-hop-mix',
    title: 'Write This Down',
    artist: '2Pac, Pop Smoke',
    src: writeThisDownSrc,
    sleeveImage: writeThisDownBg,
    labelColor: '#8C8C8C',
    labelDark: '#2C2C2C',
    accent: '#c7c7c7',
  },
]

function formatTime(totalSeconds) {
  if (!Number.isFinite(totalSeconds) || totalSeconds <= 0) {
    return '0:00'
  }

  const minutes = Math.floor(totalSeconds / 60)
  const seconds = Math.floor(totalSeconds % 60)
  return `${minutes}:${String(seconds).padStart(2, '0')}`
}

function VinylDisc({ record, size = 140, spinning = false, titleSize = '0.58rem' }) {
  const dimension = typeof size === 'number' ? `${size}px` : size
  const titleLength = record.title.length
  const isLongTitle = titleLength > 14
  const isMediumTitle = titleLength > 9
  const resolvedTitleSize = isLongTitle
    ? '0.4rem'
    : isMediumTitle
      ? '0.5rem'
      : titleSize
  const resolvedTitleWidth = isLongTitle ? '62%' : isMediumTitle ? '68%' : '72%'
  const resolvedArtistWidth = isLongTitle ? '64%' : isMediumTitle ? '70%' : '74%'
  const resolvedLetterSpacing = isLongTitle ? '0.07em' : isMediumTitle ? '0.09em' : '0.12em'

  return (
    <div
      className={`rounded-full relative will-change-transform ${spinning ? 'vinyl-spinning' : ''}`}
      style={{
        width: dimension,
        height: dimension,
        background: 'radial-gradient(circle, #262626 0%, #111111 52%, #050505 100%)',
      }}
    >
      <div className="absolute inset-0 rounded-full vinyl-grooves" />
      <div
        className="absolute inset-0 rounded-full"
        style={{
          boxShadow: 'inset 0 0 10px rgba(255,255,255,0.08), inset 0 -18px 28px rgba(0,0,0,0.26)',
        }}
      />
      <div
        className="absolute rounded-full flex flex-col items-center justify-center"
        style={{
          width: '36%',
          height: '36%',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(circle at 40% 35%, ${record.labelColor}, ${record.labelDark})`,
          boxShadow: 'inset 0 1px 3px rgba(255,255,255,0.25)',
        }}
      >
        <span
          className="text-white font-bold leading-tight text-center uppercase tracking-[0.12em]"
          style={{
            fontSize: resolvedTitleSize,
            width: resolvedTitleWidth,
            maxWidth: resolvedTitleWidth,
            paddingInline: '0.08rem',
            lineHeight: 1.14,
            letterSpacing: resolvedLetterSpacing,
            whiteSpace: 'normal',
            overflowWrap: isLongTitle ? 'anywhere' : 'normal',
          }}
        >
          {record.title}
        </span>
        <span
          className="text-white/70 leading-tight text-center text-[10px] md:text-[11px]"
          style={{ width: resolvedArtistWidth, maxWidth: resolvedArtistWidth, lineHeight: 1.18 }}
        >
          {record.artist}
        </span>
      </div>
      <div
        className="absolute rounded-full bg-black border border-gray-700"
        style={{
          width: '4%',
          height: '4%',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
    </div>
  )
}

function SleeveRecord({ record, isLoaded, isPeeked }) {
  const [{ isDragging }, dragRef, previewRef] = useDrag(() => ({
    type: VINYL_ITEM,
    item: { record, origin: 'sleeve' },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [isLoaded, record])

  useEffect(() => {
    previewRef(getEmptyImage(), { captureDraggingState: true })
  }, [previewRef])

  return (
    <motion.div
      className="music-sleeve__record-wrap"
      animate={{
        x: isLoaded ? '8%' : isPeeked ? '72%' : '12%',
        rotate: isLoaded ? -6 : isPeeked ? 8 : 0,
        scale: isDragging ? 1.04 : isPeeked ? 1.02 : 1,
        opacity: isLoaded ? 0.12 : 1,
      }}
      transition={{ type: 'spring', stiffness: 240, damping: 22 }}
    >
      <div ref={dragRef} className="music-sleeve__record-hit">
        <VinylDisc record={record} size="100%" titleSize="0.62rem" />
      </div>
    </motion.div>
  )
}

function AlbumSleeve({ record, isLoaded, onCue }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.article
      className="music-sleeve-card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className={`music-sleeve ${isLoaded ? 'music-sleeve--loaded' : ''}`}>
        <SleeveRecord record={record} isLoaded={isLoaded} isPeeked={isHovered} />

        <button
          type="button"
          className="music-sleeve__cover"
          style={{ backgroundImage: `linear-gradient(180deg, rgba(28, 20, 14, 0.22), rgba(16, 10, 7, 0.64)), url(${record.sleeveImage})` }}
          onClick={() => {
            if (!isLoaded) {
              onCue(record)
            }
          }}
        >
          <div className="music-sleeve__grain" />
          <div className="music-sleeve__copy">
            <span className="music-sleeve__artist">{record.artist}</span>
            <h3 className="music-sleeve__title">{record.title}</h3>
          </div>

          <span
            className="music-sleeve__badge"
            style={{
              backgroundColor: `color-mix(in srgb, var(--badge-bg) 78%, ${record.accent} 22%)`,
              borderColor: `color-mix(in srgb, var(--badge-border) 72%, ${record.accent} 28%)`,
            }}
          >
            {isLoaded ? 'On deck' : 'Drag vinyl'}
          </span>

          {isLoaded && <span className="music-sleeve__used-state">Sleeve open</span>}
        </button>
      </div>
    </motion.article>
  )
}

function DragRecordLayer() {
  const { currentOffset, isDragging, item } = useDragLayer((monitor) => ({
    currentOffset: monitor.getClientOffset(),
    isDragging: monitor.isDragging(),
    item: monitor.getItem(),
  }))

  const previewSize = 248

  if (!isDragging || !currentOffset || !item?.record) {
    return null
  }

  return (
    <div className="drag-layer-shell">
      <motion.div
        className="drag-layer-record"
        style={{ transform: `translate(${currentOffset.x - previewSize / 2}px, ${currentOffset.y - previewSize / 2}px)` }}
      >
        <VinylDisc record={item.record} size={previewSize} spinning titleSize="0.86rem" />
      </motion.div>
    </div>
  )
}

function LoadedPlatterRecord({ record, isPlaying, onLiftOff, onDragFinish }) {
  const [{ isDragging }, dragRef, previewRef] = useDrag(() => ({
    type: VINYL_ITEM,
    item: () => {
      onLiftOff(record)
      return { record, origin: 'platter' }
    },
    end: (_item, monitor) => {
      onDragFinish(monitor.didDrop())
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [onDragFinish, onLiftOff, record])

  useEffect(() => {
    previewRef(getEmptyImage(), { captureDraggingState: true })
  }, [previewRef])

  return (
    <motion.div
      ref={dragRef}
      initial={{ opacity: 0, scale: 0.84, y: 18, rotate: -14 }}
      animate={{ opacity: isDragging ? 0 : 1, scale: 1, y: 0, rotate: 0 }}
      exit={{ opacity: 0, scale: 0.72, y: 18 }}
      transition={{ type: 'spring', stiffness: 220, damping: 20 }}
      className="record-player__loaded-disc"
      style={{ willChange: 'transform' }}
    >
      <VinylDisc record={record} size="100%" spinning={isPlaying} titleSize="0.72rem" />
    </motion.div>
  )
}

export default function VinylPlayer({ floatingMedia, onPlaybackStateChange }) {
  const { setThemeSource } = useTheme()
  const [dropZoneVersion, setDropZoneVersion] = useState(0)

  const {
    activeSong,
    loadedRecord,
    isRecordLoaded,
    isPlaying,
    isLoading,
    volume,
    setVolume,
    progress,
    currentTime,
    duration,
    playbackError,
    draggedFromPlatterId,
    loadRecord,
    unloadRecord,
    pausePlayback,
    beginPlatterDrag,
    finishPlatterDrag,
    playLoadedRecord,
  } = useVinylPlayer()

  const [dropState, dropRef] = useDrop(() => ({
    accept: VINYL_ITEM,
    drop: (item) => {
      void loadRecord(item.record)
      return { target: 'platter' }
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
      isOver: monitor.isOver({ shallow: true }),
    }),
  }), [loadRecord])

  const { isDragging: isAnyRecordDragging, item: activeDragItem } = useDragLayer((monitor) => ({
    isDragging: monitor.isDragging(),
    item: monitor.getItem(),
  }))

  const handleCueRecord = useCallback((record) => {
    void loadRecord(record)
  }, [loadRecord])

  const handleNextRecord = useCallback(() => {
    const currentId = loadedRecord?.id ?? activeSong?.id ?? RECORDS[0].id
    const currentIndex = Math.max(RECORDS.findIndex((record) => record.id === currentId), 0)
    const nextRecord = RECORDS[(currentIndex + 1) % RECORDS.length]
    void loadRecord(nextRecord)
  }, [activeSong, loadRecord, loadedRecord])

  const handlePlayButton = useCallback(() => {
    if (!loadedRecord) {
      void loadRecord(activeSong ?? RECORDS[0])
      return
    }

    if (isLoading) {
      return
    }

    void playLoadedRecord()
  }, [activeSong, isLoading, loadRecord, loadedRecord, playLoadedRecord])

  const handlePauseButton = useCallback(() => {
    if (!loadedRecord || !isPlaying) {
      return
    }

    pausePlayback()
  }, [isPlaying, loadedRecord, pausePlayback])

  const handleEjectButton = useCallback(() => {
    unloadRecord()
    setDropZoneVersion((currentVersion) => currentVersion + 1)
  }, [unloadRecord])

  const progressPercent = Math.round(progress * 100)
  const volumePercent = Math.round(volume * 100)
  const loadedRecordHidden = loadedRecord && draggedFromPlatterId === loadedRecord.id
  const isDraggingFromSleeve = isAnyRecordDragging && activeDragItem?.origin === 'sleeve'
  const shouldHideLoadedRecord = Boolean(loadedRecord && (loadedRecordHidden || isDraggingFromSleeve))
  const isPaused = isRecordLoaded && !isPlaying && !isLoading
  const playButtonLabel = !loadedRecord ? 'Start' : isLoading ? 'Cueing' : isPaused && currentTime > 0.2 ? 'Resume' : 'Play'
  const statusLine = playbackError
    ? 'Playback issue'
    : isPlaying
      ? 'Now spinning'
      : isLoading
        ? 'Cueing side'
        : isRecordLoaded
          ? 'Paused'
          : 'Deck is idle'

  useEffect(() => {
    setThemeSource({
      songId: activeSong?.id ?? loadedRecord?.id ?? null,
      isPlaying,
    })
  }, [activeSong, isPlaying, loadedRecord, setThemeSource])

  useEffect(() => (
    () => {
      setThemeSource({ songId: null, isPlaying: false })
    }
  ), [setThemeSource])

  useEffect(() => {
    onPlaybackStateChange?.(isPlaying)
  }, [isPlaying, onPlaybackStateChange])

  return (
    <div className="vinyl-player-layout">
      <div className="record-player-wrap">
        <div className="record-player-shell">
          <div className="record-player-body">
            <div className="record-player-body__grain" aria-hidden="true" />
            <div className="record-player-body__shine" aria-hidden="true" />

          <div className="record-player__deck-zone">
            <motion.div
              key={dropZoneVersion}
              ref={dropRef}
              className={`record-player__platter ${dropState.isOver && dropState.canDrop ? 'platter-drop-glow record-player__platter--active' : ''}`}
              animate={{ scale: dropState.isOver && dropState.canDrop ? 1.015 : 1 }}
              transition={{ type: 'spring', stiffness: 240, damping: 18 }}
            >
              <div className="record-player__strobe" aria-hidden="true" />
              <div className="record-player__mat" aria-hidden="true" />

              <div className="record-player__loaded-record">
                <AnimatePresence>
                  {loadedRecord && !shouldHideLoadedRecord && (
                    <LoadedPlatterRecord
                      key={loadedRecord.id}
                      record={loadedRecord}
                      isPlaying={isPlaying}
                      onLiftOff={beginPlatterDrag}
                      onDragFinish={finishPlatterDrag}
                    />
                  )}
                </AnimatePresence>
              </div>

              <div className="spindle-target-shell">
                <motion.div
                  className={`spindle-target ${dropState.isOver && dropState.canDrop ? 'spindle-target--active' : ''}`}
                  animate={{ scale: dropState.isOver && dropState.canDrop ? 1.08 : 1 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                >
                  <div className="spindle-target__pin" />
                </motion.div>
              </div>

              {!loadedRecord && !dropState.isOver && (
                <div className="record-player__drop-copy-wrap">
                  <span className="record-player__drop-copy">Drop vinyl here</span>
                </div>
              )}
            </motion.div>
          </div>

            <div className="record-player__console">
            <div className="record-player__fader-shell">
              <label className="record-player__fader" htmlFor="record-player-volume">
                <input
                  id="record-player-volume"
                  className="record-player__fader-input"
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={(event) => {
                    setVolume(Number(event.target.value))
                  }}
                  aria-label={`Volume ${volumePercent}%`}
                />
              </label>
            </div>

            <div className="record-player__console-top">
              <span className="record-player__eyebrow">Music archive</span>
              <span className={`record-player__status ${isPlaying ? 'record-player__status--live' : ''}`}>
                {statusLine}
              </span>
            </div>

            <div className="record-player__screen">
              <div className="record-player__screen-header">
                <span>Now Playing</span>
                <span className="record-player__screen-dot" aria-hidden="true" />
              </div>

              <AnimatePresence mode="wait">
                {activeSong ? (
                  <motion.div
                    key={activeSong.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.22 }}
                  >
                    <p className="record-player__screen-title">{activeSong.title}</p>
                    <p className="record-player__screen-artist">{activeSong.artist}</p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="record-player__screen-title">Turntable Ready</p>
                    <p className="record-player__screen-artist">Drag a vinyl from the sleeves below.</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="record-player__progress">
                <motion.span
                  className="record-player__progress-fill"
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.18, ease: 'linear' }}
                />
              </div>

              <div className="record-player__progress-meta">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {playbackError && <p className="playback-alert record-player__error">{playbackError}</p>}

            <div className="record-player__controls">
              <button
                type="button"
                className="record-player__button"
                onClick={handlePlayButton}
                disabled={isLoading}
                aria-label={loadedRecord ? `${playButtonLabel} ${loadedRecord.title}` : 'Load and play the first record'}
              >
                {playButtonLabel}
              </button>
              <button
                type="button"
                className="record-player__button record-player__button--secondary"
                onClick={handlePauseButton}
                disabled={!loadedRecord || !isPlaying}
                aria-label="Pause current record"
              >
                Pause
              </button>
              <button
                type="button"
                className="record-player__button record-player__button--secondary"
                onClick={handleNextRecord}
                aria-label="Load the next record"
              >
                Next
              </button>
              <button
                type="button"
                className="record-player__button record-player__button--ghost"
                onClick={loadedRecord ? handleEjectButton : () => void loadRecord(RECORDS[0])}
                aria-label={loadedRecord ? 'Eject current record' : 'Cue the first record'}
              >
                {loadedRecord ? 'Eject' : 'Cue First'}
              </button>
            </div>
            </div>
          </div>

          {floatingMedia}
        </div>
      </div>

      <div className="music-sleeve-row">
        {RECORDS.map((record) => (
          <AlbumSleeve
            key={record.id}
            record={record}
            isLoaded={loadedRecord?.id === record.id && draggedFromPlatterId !== record.id}
            onCue={handleCueRecord}
          />
        ))}
      </div>

      <DragRecordLayer />

      <NowPlayingIndicator
        song={activeSong ?? loadedRecord}
        isPlaying={isPlaying}
        currentTime={currentTime}
        duration={duration}
      />
    </div>
  )
}