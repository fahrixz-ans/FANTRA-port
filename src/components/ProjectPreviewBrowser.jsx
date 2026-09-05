import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { soundManager } from '../lib/soundManager'

export default function ProjectPreviewBrowser({ project, isOpen, onClose }) {
  const [viewport, setViewport] = useState('desktop') // 'desktop' | 'tablet' | 'mobile'
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState(false)
  const [iframeKey, setIframeKey] = useState(0)
  const iframeRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return
    setIsLoading(true)
    setLoadError(false)

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (isFullscreen) {
          soundManager.play('fullscreen-exit')
          setIsFullscreen(false)
        } else {
          soundManager.play('close')
          onClose()
        }
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, project, isFullscreen, onClose])

  if (!project || !isOpen) return null

  const projectUrl = project.liveDemo || project.projectUrl || 'https://fahriandriansaputra-portofolio.vercel.app'

  const handleRefresh = () => {
    soundManager.play('click')
    setIsLoading(true)
    setLoadError(false)
    setIframeKey((prev) => prev + 1)
  }

  const handleOpenNewTab = () => {
    soundManager.play('launch')
    window.open(projectUrl, '_blank', 'noopener,noreferrer')
  }

  const toggleFullscreenMode = () => {
    if (!isFullscreen) {
      soundManager.play('fullscreen')
    } else {
      soundManager.play('fullscreen-exit')
    }
    setIsFullscreen(!isFullscreen)
  }

  // Width container per viewport mode
  const getViewportWidthClass = () => {
    switch (viewport) {
      case 'mobile':
        return 'w-[375px] max-w-full'
      case 'tablet':
        return 'w-[768px] max-w-full'
      case 'desktop':
      default:
        return 'w-full'
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-2 sm:p-4 md:p-6"
        onClick={() => {
          soundManager.play('close')
          onClose()
        }}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 15 }}
          transition={{ duration: 0.25 }}
          className={`bg-galaxy-card border border-white/15 rounded-2xl overflow-hidden flex flex-col shadow-2xl transition-all duration-300 relative ${
            isFullscreen
              ? 'fixed inset-2 sm:inset-4 z-50 max-w-none h-[calc(100vh-2rem)]'
              : 'w-full max-w-6xl h-[88vh]'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Window Chrome Bar */}
          <div className="bg-galaxy-card-alt px-4 py-3 border-b border-white/10 flex items-center justify-between shrink-0 select-none">
            {/* Mac Dot Controls & Title */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    soundManager.play('close')
                    onClose()
                  }}
                  className="w-3 h-3 rounded-full bg-slate-600 hover:bg-red-500/80 transition-colors"
                  title="Close Preview"
                />
                <button
                  onClick={toggleFullscreenMode}
                  className="w-3 h-3 rounded-full bg-slate-700 hover:bg-yellow-500/80 transition-colors"
                  title="Toggle Fullscreen"
                />
                <button
                  onClick={handleRefresh}
                  className="w-3 h-3 rounded-full bg-slate-800 hover:bg-green-500/80 transition-colors"
                  title="Refresh Page"
                />
              </div>
              <span className="text-xs font-mono font-bold text-galaxy-muted hidden sm:inline-block pl-2 border-l border-white/10">
                Project Preview • {project.nama}
              </span>
            </div>

            {/* Viewport Switcher Controls */}
            <div className="flex items-center gap-1 bg-black/40 p-1 rounded-lg border border-white/10 text-xs">
              <button
                onClick={() => {
                  soundManager.play('filter')
                  setViewport('desktop')
                }}
                className={`px-2.5 py-1 rounded-md flex items-center gap-1.5 font-medium transition-all ${
                  viewport === 'desktop'
                    ? 'bg-galaxy-primary text-galaxy-bg font-bold shadow-sm'
                    : 'text-galaxy-muted hover:text-white'
                }`}
                title="Desktop View (100%)"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
                <span className="hidden md:inline">Desktop</span>
              </button>

              <button
                onClick={() => {
                  soundManager.play('filter')
                  setViewport('tablet')
                }}
                className={`px-2.5 py-1 rounded-md flex items-center gap-1.5 font-medium transition-all ${
                  viewport === 'tablet'
                    ? 'bg-galaxy-primary text-galaxy-bg font-bold shadow-sm'
                    : 'text-galaxy-muted hover:text-white'
                }`}
                title="Tablet View (768px)"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
                  <line x1="12" y1="18" x2="12.01" y2="18" />
                </svg>
                <span className="hidden md:inline">Tablet</span>
              </button>

              <button
                onClick={() => {
                  soundManager.play('filter')
                  setViewport('mobile')
                }}
                className={`px-2.5 py-1 rounded-md flex items-center gap-1.5 font-medium transition-all ${
                  viewport === 'mobile'
                    ? 'bg-galaxy-primary text-galaxy-bg font-bold shadow-sm'
                    : 'text-galaxy-muted hover:text-white'
                }`}
                title="Mobile View (375px)"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                  <line x1="12" y1="18" x2="12.01" y2="18" />
                </svg>
                <span className="hidden md:inline">Mobile</span>
              </button>
            </div>

            {/* Action icons */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleFullscreenMode}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-galaxy-muted hover:text-white transition-colors"
                title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Mode'}
              >
                {isFullscreen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="4 14 10 14 10 20" />
                    <polyline points="20 10 14 10 14 4" />
                    <line x1="14" y1="10" x2="21" y2="3" />
                    <line x1="3" y1="21" x2="10" y2="14" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 3 21 3 21 9" />
                    <polyline points="9 21 3 21 3 15" />
                    <line x1="21" y1="3" x2="14" y2="10" />
                    <line x1="3" y1="21" x2="10" y2="14" />
                  </svg>
                )}
              </button>
              <button
                onClick={() => {
                  soundManager.play('close')
                  onClose()
                }}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-galaxy-muted hover:text-white transition-colors"
                title="Close Browser"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Navigation Address Toolbar */}
          <div className="bg-galaxy-card p-2 sm:p-2.5 border-b border-white/10 flex items-center gap-2 text-xs shrink-0">
            {/* Navigation buttons */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => iframeRef.current?.contentWindow?.history.back()}
                className="p-1.5 rounded-md hover:bg-white/10 text-galaxy-muted hover:text-white transition-colors"
                title="Back"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
              </button>
              <button
                onClick={() => iframeRef.current?.contentWindow?.history.forward()}
                className="p-1.5 rounded-md hover:bg-white/10 text-galaxy-muted hover:text-white transition-colors"
                title="Forward"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
              <button
                onClick={handleRefresh}
                className={`p-1.5 rounded-md hover:bg-white/10 text-galaxy-muted hover:text-white transition-colors ${
                  isLoading ? 'animate-spin text-galaxy-primary' : ''
                }`}
                title="Reload"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="23 4 23 10 17 10" />
                  <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                </svg>
              </button>
            </div>

            {/* Address Bar */}
            <div className="flex-1 bg-black/50 border border-white/10 rounded-full py-1.5 px-3 flex items-center gap-2 overflow-hidden">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400 shrink-0">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span className="font-mono text-[11px] text-galaxy-text truncate">
                {projectUrl}
              </span>
            </div>

            {/* External Tab Link */}
            <button
              onClick={handleOpenNewTab}
              className="btn-primary text-[11px] py-1 px-3 shadow-sm flex items-center gap-1 shrink-0 font-semibold"
              title="Open in New Tab"
            >
              <span>Open in New Tab</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </button>
          </div>

          {/* Browser Main Canvas Frame */}
          <div className="flex-1 bg-black/60 relative flex items-center justify-center overflow-hidden p-2">
            {/* Loading Overlay Spinner */}
            {isLoading && !loadError && (
              <div className="absolute inset-0 bg-galaxy-bg/90 backdrop-blur-sm z-20 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-10 h-10 border-3 border-galaxy-primary/30 border-t-galaxy-primary rounded-full animate-spin mb-4" />
                <p className="text-xs font-mono font-bold text-galaxy-primary mb-1">
                  Memuat Live Preview...
                </p>
                <p className="text-[11px] text-galaxy-muted">
                  Menghubungkan ke {projectUrl}
                </p>
              </div>
            )}

            {/* Error or Restricted iFrame Fallback Banner */}
            {loadError && (
              <div className="absolute inset-0 bg-galaxy-card/95 backdrop-blur-md z-30 flex flex-col items-center justify-center p-8 text-center max-w-lg mx-auto my-auto rounded-2xl border border-white/10 shadow-2xl">
                <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center text-xl mb-4">
                  🔒
                </div>
                <h4 className="text-base font-bold text-galaxy-text mb-2">
                  Preview Tidak Dapat Ditampilkan di Dalam Portfolio
                </h4>
                <p className="text-xs text-galaxy-muted leading-relaxed mb-6">
                  Website ini tidak mengizinkan embedded preview karena kebijakan keamanan (X-Frame-Options / Content Security Policy).
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <button
                    onClick={handleOpenNewTab}
                    className="btn-primary text-xs py-2 px-5 font-bold flex items-center gap-2"
                  >
                    <span>Open Project ↗</span>
                  </button>
                  <button
                    onClick={onClose}
                    className="btn-outline text-xs py-2 px-4"
                  >
                    Kembali ke Portofolio
                  </button>
                </div>
              </div>
            )}

            {/* Realtime iFrame Container */}
            <div
              className={`h-full transition-all duration-300 mx-auto rounded-lg overflow-hidden border border-white/10 shadow-xl bg-white ${getViewportWidthClass()}`}
            >
              <iframe
                key={iframeKey}
                ref={iframeRef}
                src={projectUrl}
                title={`Live Preview - ${project.nama}`}
                className="w-full h-full border-0"
                onLoad={() => setIsLoading(false)}
                onError={() => {
                  setIsLoading(false)
                  setLoadError(true)
                }}
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
