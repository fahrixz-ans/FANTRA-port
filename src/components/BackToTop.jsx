import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useMagnetic } from '../hooks/useMagnetic'

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const magneticRef = useMagnetic(0.3)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          ref={magneticRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-galaxy-card/80 border border-white/10 backdrop-blur-xl text-galaxy-primary hover:text-white hover:border-galaxy-primary/50 flex items-center justify-center z-50 hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-galaxy-primary/20 cursor-pointer focus:outline-none focus:ring-2 focus:ring-galaxy-primary"
          aria-label="Kembali ke atas"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 15l-6-6-6 6"/>
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
