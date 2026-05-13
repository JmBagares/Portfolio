import { useState, useRef } from 'react'
import { motion } from 'framer-motion'

export default function MagneticButton({ children, className = '', ...props }) {
  const ref = useRef(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const { href, target, rel, ...restProps } = props

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const deltaX = (e.clientX - centerX) * 0.3
    const deltaY = (e.clientY - centerY) * 0.3
    setOffset({ x: deltaX, y: deltaY })
  }

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 })
  }

  const sharedProps = {
    ref,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    animate: { x: offset.x, y: offset.y },
    transition: { type: 'spring', stiffness: 300, damping: 15, mass: 0.3 },
    className: `magnetic-btn relative inline-flex items-center justify-center overflow-hidden text-center no-underline font-sans font-semibold tracking-wide
        px-8 py-4 
        shadow-lg hover:shadow-xl
        transition-all duration-500
        ${className}`,
    style: {
      background: 'var(--t-btn-bg)',
      color: 'var(--t-btn-text)',
      borderRadius: 'var(--t-btn-radius)',
      border: '1px solid var(--button-border)',
      boxShadow: 'var(--t-btn-shadow)',
    },
  }

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      <motion.span
        className="absolute inset-0 opacity-0"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{
          background: 'var(--t-btn-bg)',
          borderRadius: 'var(--t-btn-radius)',
          filter: 'brightness(1.15) saturate(1.1)',
        }}
      />
    </>
  )

  if (href) {
    return (
      <motion.a
        {...sharedProps}
        href={href}
        target={target}
        rel={rel}
        {...restProps}
      >
        {content}
      </motion.a>
    )
  }

  return (
    <motion.button
      {...sharedProps}
      {...restProps}
    >
      {content}
    </motion.button>
  )
}
