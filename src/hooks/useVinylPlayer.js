import { useCallback, useEffect, useRef, useState } from 'react'

const DEFAULT_VOLUME = 0.78

export default function useVinylPlayer() {
  const [loadedRecord, setLoadedRecord] = useState(null)
  const [activeSong, setActiveSong] = useState(null)
  const [isRecordLoaded, setIsRecordLoaded] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [volume, setVolume] = useState(DEFAULT_VOLUME)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [playbackError, setPlaybackError] = useState('')
  const [draggedFromPlatterId, setDraggedFromPlatterId] = useState(null)

  const audioRef = useRef(null)
  const frameRef = useRef(null)
  const playbackTokenRef = useRef(0)

  const invalidatePlayback = useCallback(() => {
    playbackTokenRef.current += 1
    return playbackTokenRef.current
  }, [])

  const syncTimelineFromAudio = useCallback((audio = audioRef.current) => {
    const nextDuration = Number.isFinite(audio?.duration) ? audio.duration : 0
    const nextTime = Number.isFinite(audio?.currentTime) ? audio.currentTime : 0

    setDuration(nextDuration)
    setCurrentTime(nextTime)
    setProgress(nextDuration > 0 ? nextTime / nextDuration : 0)
  }, [])

  const stopProgressLoop = useCallback(() => {
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current)
      frameRef.current = null
    }
  }, [])

  const cleanupAudio = useCallback(() => {
    const audio = audioRef.current

    stopProgressLoop()

    if (!audio) {
      return
    }

    audio.pause()
    audio.onerror = null
    audio.onended = null
    audio.onloadedmetadata = null

    try {
      audio.src = ''
      audio.load()
    } catch {
      // Ignore cleanup issues from a detached media element.
    }

    audioRef.current = null
  }, [stopProgressLoop])

  const resetVisualPlaybackState = useCallback(({ keepRecord = false } = {}) => {
    cleanupAudio()
    setIsPlaying(false)
    setIsLoading(false)
    setProgress(0)
    setCurrentTime(0)
    setDuration(0)
    setDraggedFromPlatterId(null)

    if (!keepRecord) {
      setLoadedRecord(null)
      setActiveSong(null)
      setIsRecordLoaded(false)
    }
  }, [cleanupAudio])

  const startProgressLoop = useCallback(() => {
    stopProgressLoop()

    const tick = () => {
      const audio = audioRef.current

      if (!audio) {
        frameRef.current = null
        return
      }

      const durationValue = Number.isFinite(audio.duration) ? audio.duration : 0
      const currentValue = Number.isFinite(audio.currentTime) ? audio.currentTime : 0
      const nextProgress = durationValue > 0 ? currentValue / durationValue : 0

      setDuration((previousDuration) => (
        Math.abs(previousDuration - durationValue) < 0.05 ? previousDuration : durationValue
      ))
      setCurrentTime((previousTime) => (
        Math.abs(previousTime - currentValue) < 0.05 ? previousTime : currentValue
      ))
      setProgress((previousProgress) => (
        Math.abs(previousProgress - nextProgress) < 0.002 ? previousProgress : nextProgress
      ))

      if (!audio.paused && !audio.ended) {
        frameRef.current = requestAnimationFrame(tick)
      } else {
        frameRef.current = null
      }
    }

    frameRef.current = requestAnimationFrame(tick)
  }, [stopProgressLoop])

  const handlePlaybackError = useCallback((record, message) => {
    invalidatePlayback()
    resetVisualPlaybackState()
    setPlaybackError(message || `Couldn't play ${record?.title ?? 'this record'}.`)
  }, [invalidatePlayback, resetVisualPlaybackState])

  const replayCurrentTrack = useCallback(() => {
    const audio = audioRef.current

    if (!audio) {
      return
    }

    try {
      audio.currentTime = 0
    } catch {
      // Ignore browsers that block time resets.
    }

    setCurrentTime(0)
    setProgress(0)

    audio.play().catch(() => {
      // If replay fails, just stop gracefully.
      setIsPlaying(false)
      setIsLoading(false)
    })

    startProgressLoop()
  }, [startProgressLoop])

  const loadRecord = useCallback(async (record) => {
    const requestToken = invalidatePlayback()
    resetVisualPlaybackState()

    setLoadedRecord(record)
    setActiveSong(record)
    setIsRecordLoaded(true)
    setPlaybackError('')
    setIsLoading(true)

    const audio = new Audio(record.src)
    audio.preload = 'auto'
    audio.loop = false
    audio.volume = volume
    audio.onloadedmetadata = () => {
      if (audioRef.current !== audio || playbackTokenRef.current !== requestToken) {
        return
      }

      setDuration(Number.isFinite(audio.duration) ? audio.duration : 0)
    }
    audio.onerror = () => {
      if (audioRef.current !== audio || playbackTokenRef.current !== requestToken) {
        return
      }

      handlePlaybackError(record, `Couldn't load "${record.title}". The audio file failed in the browser.`)
    }
    audio.onended = () => {
      if (audioRef.current !== audio || playbackTokenRef.current !== requestToken) {
        return
      }

      replayCurrentTrack()
    }

    audioRef.current = audio
    audio.load()

    try {
      await audio.play()

      if (audioRef.current !== audio || playbackTokenRef.current !== requestToken) {
        audio.pause()
        return
      }

      setIsLoading(false)
      setIsPlaying(true)
      startProgressLoop()
    } catch {
      if (playbackTokenRef.current !== requestToken) {
        return
      }

      handlePlaybackError(
        record,
        `Couldn't start "${record.title}". Browser playback was blocked or the file could not be decoded.`,
      )
    }
  }, [handlePlaybackError, invalidatePlayback, replayCurrentTrack, resetVisualPlaybackState, startProgressLoop, volume])

  const unloadRecord = useCallback(() => {
    invalidatePlayback()
    setPlaybackError('')
    resetVisualPlaybackState()
  }, [invalidatePlayback, resetVisualPlaybackState])

  const pausePlayback = useCallback(() => {
    invalidatePlayback()
    stopProgressLoop()
    setPlaybackError('')
    setIsLoading(false)
    setIsPlaying(false)

    const audio = audioRef.current

    if (!audio) {
      return
    }

    audio.pause()
    syncTimelineFromAudio(audio)
  }, [invalidatePlayback, stopProgressLoop, syncTimelineFromAudio])

  const stopPlayback = useCallback(({
    releaseAudio = false,
    resetDuration = false,
    clearDraggedFromPlatter = true,
  } = {}) => {
    invalidatePlayback()
    const audio = audioRef.current

    stopProgressLoop()
    setPlaybackError('')
    setIsLoading(false)
    setIsPlaying(false)
    setProgress(0)
    setCurrentTime(0)
    if (clearDraggedFromPlatter) {
      setDraggedFromPlatterId(null)
    }

    if (!audio) {
      if (resetDuration || releaseAudio) {
        setDuration(0)
      }
      return
    }

    audio.pause()

    try {
      audio.currentTime = 0
    } catch {
      // Ignore browsers that block time resets on a torn-down element.
    }

    if (releaseAudio) {
      cleanupAudio()
      setDuration(0)
      return
    }

    syncTimelineFromAudio(audio)
  }, [cleanupAudio, invalidatePlayback, stopProgressLoop, syncTimelineFromAudio])

  const beginPlatterDrag = useCallback((record) => {
    if (!record) {
      return
    }

    stopPlayback({ releaseAudio: true, clearDraggedFromPlatter: false })
    setDraggedFromPlatterId(record.id)
  }, [stopPlayback])

  const finishPlatterDrag = useCallback((didDrop) => {
    if (didDrop) {
      setDraggedFromPlatterId(null)
      return
    }

    invalidatePlayback()
    setDraggedFromPlatterId(null)
    setLoadedRecord(null)
    setActiveSong(null)
    setIsRecordLoaded(false)
    setIsPlaying(false)
    setIsLoading(false)
    setProgress(0)
    setCurrentTime(0)
    setDuration(0)
    setPlaybackError('')
  }, [invalidatePlayback])

  const playLoadedRecord = useCallback(async () => {
    if (!loadedRecord) {
      return
    }

    const audio = audioRef.current

    if (!audio) {
      void loadRecord(loadedRecord)
      return
    }

    const requestToken = invalidatePlayback()
    setPlaybackError('')
    setIsLoading(true)

    try {
      audio.volume = volume

      if (Number.isFinite(audio.duration) && audio.currentTime >= Math.max(audio.duration - 0.15, 0)) {
        audio.currentTime = 0
        setCurrentTime(0)
        setProgress(0)
      }

      await audio.play()

      if (playbackTokenRef.current !== requestToken || audioRef.current !== audio) {
        audio.pause()
        return
      }

      syncTimelineFromAudio(audio)
      setIsLoading(false)
      setIsPlaying(true)
      startProgressLoop()
    } catch {
      if (playbackTokenRef.current !== requestToken) {
        return
      }

      handlePlaybackError(
        loadedRecord,
        `Couldn't start "${loadedRecord.title}". Browser playback was blocked or the file could not be decoded.`,
      )
    }
  }, [handlePlaybackError, invalidatePlayback, loadRecord, loadedRecord, startProgressLoop, syncTimelineFromAudio, volume])

  useEffect(() => (
    () => {
      cleanupAudio()
    }
  ), [cleanupAudio])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  return {
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
    stopPlayback,
    beginPlatterDrag,
    finishPlatterDrag,
    playLoadedRecord,
  }
}