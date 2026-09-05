import React, { useRef, useEffect } from 'react'

export default function EnvironmentBackground() {
  const galaxyRef = useRef(null)
  const blackholeRef = useRef(null)

  useEffect(() => {
    // Ensure autoplay starts smoothly
    if (galaxyRef.current) {
      galaxyRef.current.play().catch(() => {})
    }
    if (blackholeRef.current) {
      blackholeRef.current.play().catch(() => {})
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#030014]">
      {/* Deep Navy/Purple Tint Layer matching reference (.container background-color: #001f7c38) */}
      <div className="absolute inset-0 bg-[#030014]/80 z-[-3]" />

      {/* 1. MASTER FIXED BACKGROUND VIDEO (galaxy.mp4) */}
      <video
        ref={galaxyRef}
        autoPlay
        loop
        muted
        playsInline
        poster="/hero-arctic-stars.jpg"
        className="fixed inset-0 w-full h-full object-cover z-[-2] opacity-80 mix-blend-screen pointer-events-none"
        src="/videos/galaxy.mp4"
      />

      {/* 2. TOP BLACKHOLE VIDEO EFFECT (.blackhole-box from master reference) */}
      <div className="absolute top-0 left-0 right-0 w-full flex justify-center z-[-1] mix-blend-lighten pointer-events-none overflow-hidden select-none">
        <video
          ref={blackholeRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full max-w-none md:w-[110%] min-w-[1000px] -mt-[28%] sm:-mt-[24%] md:-mt-[22%] lg:-mt-[20%] object-cover opacity-90"
          src="/videos/blackhole.mp4"
        />
      </div>

      {/* 3. Subtle ambient cosmic vignette to blend seamlessly */}
      <div className="absolute inset-0 bg-radial-vignette opacity-60 z-[-1] pointer-events-none" />
    </div>
  )
}
