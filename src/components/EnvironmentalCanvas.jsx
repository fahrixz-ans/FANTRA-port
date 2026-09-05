import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function EnvironmentalCanvas() {
  const [mousePos, setMousePos] = useState({ x: typeof window !== 'undefined' ? window.innerWidth / 2 : 600, y: 300 })
  const [smoothMouse, setSmoothMouse] = useState({ x: typeof window !== 'undefined' ? window.innerWidth / 2 : 600, y: 300 })
  const [reducedMotion, setReducedMotion] = useState(false)
  const reqRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mediaQuery.matches)
    const handleMotionChange = (e) => setReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handleMotionChange)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      mediaQuery.removeEventListener('change', handleMotionChange)
      if (reqRef.current) cancelAnimationFrame(reqRef.current)
    }
  }, [])

  // Smooth lerp for ambient cursor halo
  useEffect(() => {
    let currentX = mousePos.x
    let currentY = mousePos.y

    const loop = () => {
      currentX += (mousePos.x - currentX) * 0.08
      currentY += (mousePos.y - currentY) * 0.08
      setSmoothMouse({ x: currentX, y: currentY })
      reqRef.current = requestAnimationFrame(loop)
    }

    reqRef.current = requestAnimationFrame(loop)
    return () => {
      if (reqRef.current) cancelAnimationFrame(reqRef.current)
    }
  }, [mousePos])

  // Parallax offsets based on cursor
  const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1200
  const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 800
  const mouseOffsetX = ((smoothMouse.x - windowWidth / 2) / (windowWidth / 2)) * 20
  const mouseOffsetY = ((smoothMouse.y - windowHeight / 2) / (windowHeight / 2)) * 20

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#020205] select-none">
      {/* 1. DEEP COSMIC SPACE BACKGROUND & VIGNETTE */}
      <div className="absolute inset-0 bg-radial-dark-space opacity-95" />

      {/* 2. SUBTLE CELESTIAL HORIZON CURVATURE (Upper atmospheric limb) */}
      <div
        className="absolute -top-[520px] -left-[260px] w-[1050px] h-[1050px] rounded-full bg-gradient-to-b from-cyan-500/20 via-blue-600/10 to-transparent border border-cyan-400/20 blur-xs pointer-events-none transition-transform duration-700 ease-out"
        style={{
          transform: `translate3d(${mouseOffsetX * -0.5}px, ${mouseOffsetY * -0.5}px, 0)`,
          boxShadow: '0 0 120px rgba(6, 182, 212, 0.2), inset 0 0 80px rgba(56, 189, 248, 0.15)',
        }}
      />

      {/* 3. MULTI-LAYERED COSMIC NEBULA & MILKY WAY DUST BANDS */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none transition-transform duration-1000 ease-out"
        style={{
          transform: `translate3d(${mouseOffsetX * -0.3}px, ${mouseOffsetY * -0.3}px, 0)`,
        }}
      >
        {/* Nebula Cloud A - Violet / Indigo */}
        <div className="absolute top-[15%] -left-[10%] w-[750px] h-[750px] rounded-full bg-purple-900/15 blur-[150px]" />
        
        {/* Nebula Cloud B - Cyan / Sky Blue */}
        <div className="absolute top-[40%] right-[-5%] w-[850px] h-[850px] rounded-full bg-cyan-900/15 blur-[160px]" />

        {/* Nebula Cloud C - Deep Emerald / Teal Accent */}
        <div className="absolute bottom-[-10%] left-[20%] w-[650px] h-[650px] rounded-full bg-teal-900/10 blur-[140px]" />

        {/* Milky Way Diagonal Luminescent Dust Band */}
        <div className="absolute top-[-15%] left-[-15%] w-[140%] h-[130%] -rotate-12 bg-gradient-to-r from-transparent via-cyan-500/8 via-purple-500/10 via-blue-500/8 to-transparent blur-[100px]" />
      </div>

      {/* 4. AURORA BOREALIS FLOWING RIBBONS */}
      <div
        className="absolute top-0 left-0 right-0 h-[480px] overflow-hidden pointer-events-none transition-transform duration-700 ease-out opacity-40"
        style={{
          transform: `translate3d(${mouseOffsetX * 0.4}px, ${mouseOffsetY * 0.4}px, 0)`,
        }}
      >
        <div
          className="w-[160%] h-full -ml-[30%] bg-gradient-to-r from-cyan-400/30 via-emerald-300/25 via-sky-300/20 to-blue-400/20 blur-[85px]"
          style={{
            animation: reducedMotion ? 'none' : 'auroraFlow 22s ease-in-out infinite',
          }}
        />
        <div
          className="absolute top-8 left-[-10%] w-[140%] h-[70%] bg-gradient-to-r from-transparent via-purple-400/20 via-cyan-300/25 to-transparent blur-[100px]"
          style={{
            animation: reducedMotion ? 'none' : 'auroraFlow 28s ease-in-out infinite reverse',
          }}
        />
      </div>

      {/* 5. DYNAMIC STARFIELD WITH PARALLAX TWINKLING STARS */}
      <StarFieldCanvas reducedMotion={reducedMotion} mouseOffset={{ x: mouseOffsetX, y: mouseOffsetY }} />

      {/* 6. SHOOTING STARS & METEORS */}
      {!reducedMotion && <ShootingStarsCanvas />}

      {/* 7. INTERACTIVE CURSOR AMBIENT LIGHT HALO */}
      <div
        className="fixed w-[500px] h-[500px] rounded-full pointer-events-none z-10 transition-opacity duration-300 -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `${smoothMouse.x}px`,
          top: `${smoothMouse.y}px`,
          background: 'radial-gradient(circle, rgba(6,182,212,0.18) 0%, rgba(56,189,248,0.08) 35%, rgba(168,85,247,0.04) 55%, transparent 70%)',
        }}
      />

      {/* 8. SUBTLE COSMIC MATRIX / TECH GRID */}
      <div className="absolute inset-0 cosmic-grid-overlay opacity-35" />

      {/* 9. BOTTOM HORIZON AMBIENT GLOW */}
      <div className="absolute bottom-0 left-0 right-0 h-[280px] bg-gradient-to-t from-cyan-950/20 via-black/40 to-transparent blur-xl pointer-events-none" />
    </div>
  )
}

function StarFieldCanvas({ reducedMotion, mouseOffset }) {
  const [stars, setStars] = useState([])

  useEffect(() => {
    const starCount = reducedMotion ? 40 : 100
    const starColors = [
      'rgba(255, 255, 255, 0.95)',
      'rgba(186, 230, 253, 0.9)',
      'rgba(165, 243, 252, 0.85)',
      'rgba(224, 231, 255, 0.9)',
      'rgba(245, 208, 254, 0.8)',
    ]

    const generated = Array.from({ length: starCount }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 2.2 + 0.6,
      opacity: Math.random() * 0.7 + 0.3,
      duration: Math.random() * 4 + 2.5,
      delay: Math.random() * 6,
      color: starColors[Math.floor(Math.random() * starColors.length)],
      depth: Math.random() * 0.8 + 0.2,
    }))
    setStars(generated)
  }, [reducedMotion])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full pointer-events-none transition-transform duration-500 ease-out"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: star.color,
            boxShadow: star.size > 1.8 ? `0 0 6px ${star.color}` : 'none',
            opacity: star.opacity,
            transform: `translate3d(${mouseOffset.x * star.depth}px, ${mouseOffset.y * star.depth}px, 0)`,
            animation: reducedMotion ? 'none' : `starTwinkle ${star.duration}s ease-in-out infinite`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

function ShootingStarsCanvas() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="shooting-star shooting-star-1" />
      <div className="shooting-star shooting-star-2" />
      <div
        className="shooting-star"
        style={{
          top: '55%',
          right: '15%',
          width: '160px',
          animation: 'shootingStarAnim1 14s linear infinite',
          animationDelay: '9s',
        }}
      />
    </div>
  )
}
