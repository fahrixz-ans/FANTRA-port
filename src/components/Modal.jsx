import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Modal({ project, isOpen, onClose, onOpenLivePreview }) {
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!project) return null

  const projectUrl = project.liveDemo || project.projectUrl

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="bg-galaxy-card border border-white/10 rounded-2xl overflow-hidden max-w-2xl w-full max-h-[85vh] flex flex-col relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header & Close */}
            <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-galaxy-card-alt shrink-0">
              <div className="pr-8">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-galaxy-primary">
                  {project.category || 'Detail Proyek'}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-galaxy-text truncate">
                  {project.nama}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-galaxy-muted hover:text-white transition-colors"
                aria-label="Tutup modal"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
              {/* Image Banner */}
              <div className="relative aspect-video rounded-xl overflow-hidden bg-black/40 border border-white/10">
                <img
                  src={project.thumbnail}
                  alt={`Pratinjau Tangkapan Layar Proyek ${project.nama} oleh FahriXz (Fahri Andrian Saputra)`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Description */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-galaxy-muted font-bold mb-1">
                  Deskripsi Proyek
                </h4>
                <p className="text-galaxy-muted text-sm leading-relaxed">
                  {project.deskripsi}
                </p>
              </div>

              {/* Key Features */}
              {project.fitur && project.fitur.length > 0 && (
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-galaxy-muted font-bold mb-2">
                    Fitur Utama
                  </h4>
                  <ul className="grid sm:grid-cols-2 gap-2 text-xs text-galaxy-text">
                    {project.fitur.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 bg-galaxy-card-alt p-2.5 rounded-lg border border-white/5">
                        <span className="text-galaxy-primary">⚡</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tech Stack */}
              {project.tech && project.tech.length > 0 && (
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-galaxy-muted font-bold mb-2">
                    Teknologi Digunakan
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 bg-galaxy-card-alt rounded-lg text-xs font-mono text-galaxy-primary border border-galaxy-primary/20"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer Action Buttons */}
            <div className="p-4 border-t border-white/10 bg-galaxy-card-alt flex flex-wrap gap-3 justify-end shrink-0">
              {projectUrl && (
                <button
                  onClick={() => {
                    onClose()
                    if (onOpenLivePreview) {
                      onOpenLivePreview(project)
                    } else {
                      window.open(projectUrl, '_blank')
                    }
                  }}
                  className="btn-primary text-xs py-2 px-4 shadow-md flex items-center gap-2 font-bold"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                  <span>Launch Live Preview</span>
                </button>
              )}

              {projectUrl && (
                <a
                  href={projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline text-xs py-2 px-3 flex items-center gap-1"
                >
                  <span>Open in New Tab</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              )}

              <button
                onClick={onClose}
                className="btn-outline text-xs py-2 px-4"
              >
                Tutup
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
