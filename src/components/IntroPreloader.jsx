import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// 15 distinct greetings in 15 different languages as requested
const GREETINGS = [
  { text: 'Hello', lang: 'English' },
  { text: 'Halo', lang: 'Indonesia' },
  { text: 'Hola', lang: 'Spanish' },
  { text: 'Bonjour', lang: 'French' },
  { text: 'Hallo', lang: 'German' },
  { text: 'Ciao', lang: 'Italian' },
  { text: 'Olá', lang: 'Portuguese' },
  { text: 'Привет', lang: 'Russian' },
  { text: '你好', lang: 'Chinese' },
  { text: 'こんにちは', lang: 'Japanese' },
  { text: '안녕하세요', lang: 'Korean' },
  { text: 'مرحبا', lang: 'Arabic' },
  { text: 'नमस्ते', lang: 'Hindi' },
  { text: 'สวัสดี', lang: 'Thai' },
  { text: 'Merhaba', lang: 'Turkish' },
]

export default function IntroPreloader({ onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFadingOut, setIsFadingOut] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setIsVisible(false)
      if (onComplete) onComplete()
      return
    }

    // 15 greetings over ~4.0s total (~266ms per greeting)
    const intervalTime = 266
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev < GREETINGS.length - 1) {
          return prev + 1
        } else {
          clearInterval(interval)
          // 4 seconds completed -> start 0.6s fade-out
          setIsFadingOut(true)
          setTimeout(() => {
            setIsVisible(false)
            if (onComplete) onComplete()
          }, 600)
          return prev
        }
      })
    }, intervalTime)

    return () => clearInterval(interval)
  }, [onComplete])

  if (!isVisible) return null

  const currentGreeting = GREETINGS[currentIndex] || GREETINGS[0]

  return (
    <AnimatePresence>
      {!isFadingOut && (
        <motion.div
          key="fantra-intro-preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-black text-white select-none pointer-events-auto"
          aria-live="polite"
          aria-label="Loading Intro"
        >
          {/* Subtle background ambient line */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.05)_0%,transparent_70%)]" />

          {/* Centered Greeting Text with smooth readable transition */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
            <div className="flex items-center justify-center h-28 sm:h-36">
              <motion.h1
                key={currentGreeting.text}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 1.02 }}
                transition={{ duration: 0.16, ease: 'easeOut' }}
                className="text-4xl sm:text-6xl md:text-7xl font-sans font-bold tracking-tight text-white"
              >
                {currentGreeting.text}
              </motion.h1>
            </div>

            {/* Language Subtitle indicator */}
            <motion.div
              key={`sub-${currentGreeting.lang}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.16 }}
              className="mt-3 text-xs sm:text-sm font-mono tracking-widest uppercase text-zinc-400"
            >
              {currentGreeting.lang}
            </motion.div>
          </div>

          {/* Bottom discreet brand & progress indicator */}
          <div className="absolute bottom-10 left-0 right-0 px-8 flex items-center justify-between text-xs font-mono text-zinc-600 max-w-7xl mx-auto">
            <span className="tracking-widest uppercase">FANTRA</span>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              <span>{Math.round(((currentIndex + 1) / GREETINGS.length) * 100)}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
