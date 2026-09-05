import React, { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react'

export default function Lightbox({
  src,
  title,
  desc,
  items = [],
  initialIndex = 0,
  onClose,
}) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)

  // Use items if provided, otherwise fallback to single item with src/title
  const playlist =
    items && items.length > 0
      ? items
      : src
      ? [{ image: src, title: title || '', desc: desc || '' }]
      : []

  const currentItem = playlist[currentIndex] || playlist[0] || {}
  const currentSrc = currentItem.image || currentItem.src || src
  const currentTitle = currentItem.title || title || ''
  const currentDesc = currentItem.desc || desc || ''

  const handlePrev = useCallback(() => {
    if (playlist.length <= 1) return
    setCurrentIndex((prev) => (prev === 0 ? playlist.length - 1 : prev - 1))
  }, [playlist.length])

  const handleNext = useCallback(() => {
    if (playlist.length <= 1) return
    setCurrentIndex((prev) => (prev === playlist.length - 1 ? 0 : prev + 1))
  }, [playlist.length])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowLeft') {
        handlePrev()
      } else if (e.key === 'ArrowRight') {
        handleNext()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose, handlePrev, handleNext])

  // Touch swipe support for mobile interaction
  const minSwipeDistance = 50

  const onTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      handleNext()
    } else if (isRightSwipe) {
      handlePrev()
    }
  }

  if (!currentSrc) return null

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 select-none"
        role="dialog"
        aria-modal="true"
        aria-label="Image Preview Dialog"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/95 backdrop-blur-2xl"
        />

        {/* Top Controls Bar */}
        <div className="fixed top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
          <div className="pointer-events-auto px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-white/15 text-xs font-mono text-zinc-300 backdrop-blur-md flex items-center gap-2">
            <span className="text-cyan-400 font-semibold">
              {currentIndex + 1}
            </span>
            <span className="text-zinc-600">/</span>
            <span>{playlist.length}</span>
          </div>

          <button
            onClick={onClose}
            className="pointer-events-auto p-2.5 text-zinc-400 hover:text-white bg-zinc-900/90 hover:bg-zinc-800 rounded-full border border-white/15 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow-xl"
            aria-label="Tutup Preview"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Previous Navigation Button */}
        {playlist.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              handlePrev()
            }}
            className="fixed left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/15 backdrop-blur-md transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400 hidden sm:flex items-center justify-center shadow-2xl hover:scale-105"
            aria-label="Foto Sebelumnya"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Next Navigation Button */}
        {playlist.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleNext()
            }}
            className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/15 backdrop-blur-md transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400 hidden sm:flex items-center justify-center shadow-2xl hover:scale-105"
            aria-label="Foto Selanjutnya"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        {/* Main Content Modal Box */}
        <motion.div
          key={currentSrc}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="relative max-w-5xl max-h-[88vh] z-10 flex flex-col items-center justify-center w-full"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Image Container with high contrast border and subtle backdrop */}
          <div className="rounded-2xl overflow-hidden border border-white/20 shadow-[0_0_50px_rgba(0,0,0,0.8)] bg-black max-h-[75vh] flex items-center justify-center relative">
            <img
              src={currentSrc}
              alt={currentTitle || 'Preview Image'}
              referrerPolicy="no-referrer"
              className="w-auto h-auto max-h-[75vh] max-w-full object-contain"
            />
          </div>

          {/* Caption & Metadata */}
          {currentTitle && (
            <div className="mt-4 px-5 py-2.5 rounded-2xl bg-zinc-950/90 border border-white/15 backdrop-blur-xl text-center max-w-xl shadow-2xl">
              <h4 className="text-sm font-sans font-bold text-white mb-0.5">
                {currentTitle}
              </h4>
              {currentDesc && (
                <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                  {currentDesc}
                </p>
              )}
            </div>
          )}

          {/* Mobile Bottom Navigation Bar */}
          {playlist.length > 1 && (
            <div className="flex sm:hidden items-center justify-center gap-4 mt-3 z-20">
              <button
                onClick={handlePrev}
                className="px-4 py-1.5 rounded-full bg-zinc-900 border border-white/15 text-xs font-mono text-zinc-300 flex items-center gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Prev</span>
              </button>
              <button
                onClick={handleNext}
                className="px-4 py-1.5 rounded-full bg-zinc-900 border border-white/15 text-xs font-mono text-zinc-300 flex items-center gap-1"
              >
                <span>Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
