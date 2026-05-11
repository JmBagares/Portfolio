import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../theme/ThemeContext'

const INTERACTIVE_SELECTOR = [
  'a',
  'button',
  '[role="button"]',
  '.magnetic-btn',
  '.music-sleeve__cover',
  '.music-sleeve__record-hit',
  '.record-player__button',
].join(', ')

export default function CustomCursor() {
  const { themeId } = useTheme()
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [trailing, setTrailing] = useState([])
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isPointerDown, setIsPointerDown] = useState(false)
  const [canRenderCursor, setCanRenderCursor] = useState(false)

  const cursorTheme = useMemo(() => {
    if (themeId === 'happiness') {
      return {
        mainSize: 12,
        ringSize: 34,
        hoverScale: 2.15,
        trailSize: 7,
        trailRadius: '999px',
        mainRadius: '42% 58% 52% 48% / 45% 46% 54% 55%',
        ringRadius: '999px',
        ringRotation: -8,
        mainRotation: 6,
        mainBackground: 'linear-gradient(135deg, var(--t-cursor-color), color-mix(in srgb, var(--t-cursor-ring) 62%, white 38%))',
        mainBorder: '1px solid rgba(255,255,255,0.48)',
        mainShadow: '0 8px 18px rgba(244, 162, 97, 0.26)',
        ringBorder: '2px solid color-mix(in srgb, var(--t-cursor-ring) 72%, white 28%)',
        ringShadow: '0 0 0 1px rgba(255,255,255,0.22)',
        trailBackground: 'color-mix(in srgb, var(--t-cursor-color) 78%, white 22%)',
        trailOpacity: 0.46,
      }
    }

    if (themeId === 'missin-you-crazy') {
      return {
        mainSize: 10,
        ringSize: 38,
        hoverScale: 2.4,
        trailSize: 6,
        trailRadius: '999px',
        mainRadius: '999px',
        ringRadius: '999px',
        ringRotation: 0,
        mainRotation: 0,
        mainBackground: 'radial-gradient(circle, color-mix(in srgb, var(--t-cursor-color) 72%, white 28%) 0%, var(--t-cursor-color) 70%, rgba(233,69,96,0.78) 100%)',
        mainBorder: '1px solid rgba(255,255,255,0.24)',
        mainShadow: '0 0 18px rgba(233, 69, 96, 0.42), 0 0 34px rgba(157, 78, 221, 0.22)',
        ringBorder: '1.5px solid color-mix(in srgb, var(--t-cursor-ring) 72%, white 28%)',
        ringShadow: '0 0 20px rgba(240, 98, 146, 0.26), inset 0 0 14px rgba(233, 69, 96, 0.14)',
        trailBackground: 'color-mix(in srgb, var(--t-cursor-ring) 72%, var(--t-cursor-color) 28%)',
        trailOpacity: 0.4,
      }
    }

    return {
      mainSize: 11,
      ringSize: 32,
      hoverScale: 2.2,
      trailSize: 5,
      trailRadius: '3px',
      mainRadius: '3px',
      ringRadius: '8px',
      ringRotation: 10,
      mainRotation: -8,
      mainBackground: 'linear-gradient(135deg, color-mix(in srgb, var(--t-cursor-color) 92%, #d4af37 8%), color-mix(in srgb, var(--t-cursor-ring) 48%, #8b0000 52%))',
      mainBorder: '1px solid rgba(212,175,55,0.42)',
      mainShadow: '0 0 0 1px rgba(0,0,0,0.5), 0 8px 16px rgba(0,0,0,0.32)',
      ringBorder: '2px dashed color-mix(in srgb, var(--t-cursor-ring) 62%, #d4af37 38%)',
      ringShadow: '0 0 0 1px rgba(0,0,0,0.54), inset 0 0 0 1px rgba(139,0,0,0.2)',
      trailBackground: 'linear-gradient(135deg, color-mix(in srgb, var(--t-cursor-color) 82%, #d4af37 18%), rgba(139,0,0,0.92))',
      trailOpacity: 0.34,
    }
  }, [themeId])

  useEffect(() => {
    const media = window.matchMedia('(hover: hover) and (pointer: fine)')
    const syncPointerCapability = () => {
      setCanRenderCursor(media.matches)
      setIsVisible(media.matches)
    }

    syncPointerCapability()
    media.addEventListener('change', syncPointerCapability)

    const handleMouseMove = (e) => {
      if (!media.matches) return
      setPosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)

      setTrailing((prev) => {
        const next = [
          ...prev,
          { x: e.clientX, y: e.clientY, id: Date.now() + Math.random() },
        ]
        return next.slice(-8)
      })
    }

    const handleMouseEnter = () => {
      if (media.matches) setIsVisible(true)
    }
    const handleMouseLeave = () => setIsVisible(false)
    const handlePointerDown = () => setIsPointerDown(true)
    const handlePointerUp = () => setIsPointerDown(false)

    const handlePointerOver = (event) => {
      setIsHovering(Boolean(event.target.closest(INTERACTIVE_SELECTOR)))
    }

    const handlePointerOut = (event) => {
      const nextTarget = event.relatedTarget
      if (!nextTarget || !nextTarget.closest?.(INTERACTIVE_SELECTOR)) {
        setIsHovering(false)
      }
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('pointerup', handlePointerUp)
    document.addEventListener('pointercancel', handlePointerUp)
    document.addEventListener('pointerover', handlePointerOver)
    document.addEventListener('pointerout', handlePointerOut)

    return () => {
      media.removeEventListener('change', syncPointerCapability)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('pointerup', handlePointerUp)
      document.removeEventListener('pointercancel', handlePointerUp)
      document.removeEventListener('pointerover', handlePointerOver)
      document.removeEventListener('pointerout', handlePointerOut)
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setTrailing((prev) => prev.slice(-6))
    }, 80)
    return () => clearInterval(interval)
  }, [])

  if (!canRenderCursor || !isVisible) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]">
      <AnimatePresence>
        {trailing.map((point) => (
          <motion.div
            key={point.id}
            initial={{ opacity: 0.6, scale: 1 }}
            animate={{ opacity: 0, scale: 0.3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="absolute"
            style={{
              left: point.x - cursorTheme.trailSize / 2,
              top: point.y - cursorTheme.trailSize / 2,
              width: cursorTheme.trailSize,
              height: cursorTheme.trailSize,
              borderRadius: cursorTheme.trailRadius,
              background: cursorTheme.trailBackground,
              opacity: cursorTheme.trailOpacity,
              filter: themeId === 'missin-you-crazy' ? 'blur(1px)' : 'none',
            }}
          />
        ))}
      </AnimatePresence>

      <motion.div
        className="absolute"
        animate={{
          x: position.x - cursorTheme.mainSize / 2,
          y: position.y - cursorTheme.mainSize / 2,
          scale: isHovering ? cursorTheme.hoverScale : isPointerDown ? 0.82 : 1,
          rotate: isHovering ? cursorTheme.mainRotation : 0,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
        style={{
          width: cursorTheme.mainSize,
          height: cursorTheme.mainSize,
          borderRadius: cursorTheme.mainRadius,
          background: isHovering ? 'transparent' : cursorTheme.mainBackground,
          border: isHovering ? cursorTheme.mainBorder : 'none',
          boxShadow: isHovering ? 'none' : cursorTheme.mainShadow,
          mixBlendMode: themeId === 'hip-hop-mix' ? 'normal' : 'multiply',
        }}
      />

      <motion.div
        className="absolute"
        animate={{
          x: position.x - cursorTheme.ringSize / 2,
          y: position.y - cursorTheme.ringSize / 2,
          scale: isHovering ? 1.8 : 1,
          rotate: isHovering ? cursorTheme.ringRotation : 0,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 20, mass: 0.8 }}
        style={{
          width: cursorTheme.ringSize,
          height: cursorTheme.ringSize,
          borderRadius: cursorTheme.ringRadius,
          border: cursorTheme.ringBorder,
          opacity: isHovering ? 0.8 : 0.48,
          boxShadow: cursorTheme.ringShadow,
        }}
      />
    </div>
  )
}
