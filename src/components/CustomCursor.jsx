import { useState, useEffect, useRef } from 'react'

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const cursorRef = useRef(null)

  useEffect(() => {
    // Check if touch device
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (isTouchDevice || prefersReducedMotion) return

    setIsVisible(true)

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseOver = (e) => {
      const target = e.target
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer') ||
        target.closest('.cursor-pointer')
      ) {
        setIsHovering(true)
      }
    }

    const handleMouseOut = (e) => {
      const target = e.target
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer') ||
        target.closest('.cursor-pointer')
      ) {
        setIsHovering(false)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
    }
  }, [])

  if (!isVisible) return null

  return (
    <>
      {/* Outer Glow Ring */}
      <div
        ref={cursorRef}
        className="custom-cursor fixed pointer-events-none z-[9999] rounded-full hidden sm:block"
        style={{
          left: position.x - (isHovering ? 20 : 12),
          top: position.y - (isHovering ? 20 : 12),
          width: isHovering ? 40 : 24,
          height: isHovering ? 40 : 24,
          border: isHovering ? '1.5px solid #06b6d4' : '1.5px solid rgba(255, 255, 255, 0.25)',
          background: isHovering ? 'rgba(6, 182, 212, 0.15)' : 'rgba(255, 255, 255, 0.02)',
          boxShadow: isHovering ? '0 0 15px rgba(6, 182, 212, 0.4)' : 'none',
          transition: 'width 0.2s cubic-bezier(0.16, 1, 0.3, 1), height 0.2s cubic-bezier(0.16, 1, 0.3, 1), border 0.2s, background 0.2s, box-shadow 0.2s',
          transform: 'translate3d(0, 0, 0)',
        }}
      />
      {/* Inner Pinpoint Dot */}
      <div
        className="fixed pointer-events-none z-[9999] rounded-full bg-cyan-400 hidden sm:block"
        style={{
          left: position.x - 3,
          top: position.y - 3,
          width: 6,
          height: 6,
          boxShadow: '0 0 8px rgba(6, 182, 212, 0.8)',
          transition: 'transform 0.1s ease-out',
          transform: `scale(${isHovering ? 1.5 : 1})`,
        }}
      />
    </>
  )
}
