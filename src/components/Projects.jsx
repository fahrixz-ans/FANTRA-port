import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FolderGit2,
  ExternalLink,
  Info,
  X,
  Sparkles,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowUpRight,
  Play,
} from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { getLocalizedData } from '../data/fantraData'

export default function Projects() {
  const { t, lang } = useLanguage()
  const { projects } = getLocalizedData(lang)
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedProject, setSelectedProject] = useState(null)

  // Categories as specified: all, website, media, design, digital, other
  const categoryList = [
    { key: 'all', labelKey: 'projects.categories.all', defaultLabel: 'Semua' },
    { key: 'website', labelKey: 'projects.categories.website', defaultLabel: 'Website' },
    { key: 'media', labelKey: 'projects.categories.media', defaultLabel: 'Media' },
    { key: 'design', labelKey: 'projects.categories.design', defaultLabel: 'Design' },
    { key: 'digital', labelKey: 'projects.categories.digital', defaultLabel: 'Digital' },
    { key: 'other', labelKey: 'projects.categories.other', defaultLabel: 'Other' },
  ]

  const filteredProjects =
    activeCategory === 'all'
      ? projects
      : projects.filter((p) => (p.categoryKey || '').toLowerCase() === activeCategory.toLowerCase())

  return (
    <section id="projects-section" className="py-20 sm:py-28 relative border-t border-white/5 bg-black/30">
      <div className="fantra-container">
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#220049]/40 border border-[#72a1de]/40 text-xs font-mono tracking-widest text-cyan-400 uppercase mb-4 shadow-[0_0_15px_rgba(114,161,222,0.2)]">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>{t('projects.badge', 'KARYA PILIHAN')}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold text-white tracking-tight">
              {t('projects.title', 'Showcase & Eksplorasi Project')}{' '}
              <span className="gradient">👨‍💻</span>
            </h2>
            <p className="text-sm sm:text-base text-zinc-300 mt-3 leading-relaxed">
              {t(
                'projects.subtitle',
                'Koleksi karya kreasi visual, media digital, dan implementasi teknologi interaktif.'
              )}
            </p>
          </div>

          {/* 5 INTERNAL NAVIGATION CATEGORY TABS (Website, Media, Design, Digital, Other) */}
          <div className="flex flex-wrap gap-1.5 p-1.5 bg-zinc-950/90 border border-white/10 rounded-full backdrop-blur-md">
            {categoryList.map((cat) => {
              const isActive = activeCategory === cat.key
              const label = t(cat.labelKey, cat.defaultLabel)

              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400 cursor-pointer ${
                    isActive
                      ? 'bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.4)]'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {label}
                </button>
              )
            })}
          </div>
        </div>

        {/* PROJECTS GRID WITH VIDEO PREVIEW INTERACTION */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project, index) => {
              // Assign project videos for interactive preview
              const videoSrc =
                index === 0
                  ? '/videos/project1.mp4'
                  : index === 1
                  ? '/videos/project2.mp4'
                  : index === 2
                  ? '/videos/project3.mp4'
                  : null

              return (
                <ProjectCard
                  key={project.id}
                  project={project}
                  videoSrc={videoSrc}
                  onSelect={() => setSelectedProject(project)}
                  t={t}
                />
              )
            })}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16 text-zinc-500 font-mono text-sm">
            {t('projects.empty', 'Belum ada project di kategori ini.')}
          </div>
        )}
      </div>

      {/* PROJECT DETAIL MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-3xl bg-zinc-950 border border-white/20 rounded-3xl overflow-hidden shadow-2xl z-10 my-8 max-h-[90vh] flex flex-col"
            >
              {/* Header Image */}
              <div className="relative aspect-video max-h-72 w-full overflow-hidden bg-zinc-900">
                <img
                  src={selectedProject.thumbnail}
                  alt={selectedProject.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/70 hover:bg-black text-white border border-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  aria-label="Tutup Detail"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="absolute bottom-4 left-6 right-6 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/30 text-xs font-mono text-cyan-400 uppercase">
                      {selectedProject.category}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-mono text-zinc-300">
                      {selectedProject.year}
                    </span>
                  </div>
                </div>
              </div>

              {/* Modal Scrollable Body */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2">
                    {selectedProject.title}
                  </h3>
                  <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                    {selectedProject.overview || selectedProject.shortDesc}
                  </p>
                </div>

                {/* Goal & Concept Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selectedProject.goal && (
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-1">
                        {t('projects.concept', 'Tujuan Proyek')}
                      </h4>
                      <p className="text-xs text-zinc-300 leading-relaxed">
                        {selectedProject.goal}
                      </p>
                    </div>
                  )}

                  {selectedProject.concept && (
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-1">
                        {t('projects.concept', 'Konsep & Visual')}
                      </h4>
                      <p className="text-xs text-zinc-300 leading-relaxed">
                        {selectedProject.concept}
                      </p>
                    </div>
                  )}
                </div>

                {/* Features List */}
                {selectedProject.features && (
                  <div>
                    <h4 className="text-sm font-mono uppercase tracking-wider text-white mb-3">
                      {t('projects.features', 'Fitur Utama')}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedProject.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tech Stack */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                    {t('projects.toolsUsed', 'Teknologi & Tools')}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((item) => (
                      <span
                        key={item}
                        className="px-3 py-1 rounded-full bg-white/5 border border-white/15 text-xs font-mono text-zinc-200"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-white/10 bg-zinc-950 flex items-center justify-between">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="btn-editorial-outline text-xs py-2.5 px-5"
                >
                  {t('nav.close', 'Tutup')}
                </button>

                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-editorial-accent text-xs py-2.5 px-5"
                  >
                    <span>{t('projects.livePreview', 'Kunjungi Live')}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}

function ProjectCard({ project, videoSrc, onSelect, t }) {
  const [isHovered, setIsHovered] = useState(false)
  const videoRef = useRef(null)

  const handleMouseEnter = () => {
    setIsHovered(true)
    if (videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    if (videoRef.current) {
      videoRef.current.pause()
    }
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="fantra-card bg-zinc-950/80 p-0 overflow-hidden flex flex-col group hover:border-cyan-500/40 transition-all duration-300 relative shadow-xl"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Video or Image Preview Box matching reference */}
      <div className="relative aspect-video w-full overflow-hidden bg-zinc-900">
        {videoSrc ? (
          <>
            <video
              ref={videoRef}
              src={videoSrc}
              loop
              muted
              playsInline
              className={`w-full h-full object-cover transition-opacity duration-500 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
            />
            <img
              src={project.thumbnail}
              alt={project.title}
              referrerPolicy="no-referrer"
              loading="lazy"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                isHovered ? 'opacity-0' : 'opacity-100'
              }`}
            />
          </>
        ) : (
          <img
            src={project.thumbnail}
            alt={project.title}
            referrerPolicy="no-referrer"
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent pointer-events-none" />

        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[11px] font-mono uppercase text-cyan-400">
            {project.category}
          </span>
        </div>

        <div className="absolute top-3 right-3">
          <span className="px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[11px] font-mono text-zinc-300">
            {project.year}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 flex flex-col flex-grow justify-between">
        <div>
          <h3 className="text-xl font-display font-bold text-white group-hover:text-cyan-400 transition-colors mb-2">
            {project.title}
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed line-clamp-3 mb-4">
            {project.shortDesc}
          </p>

          {/* Tech Badges */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.tech.map((tItem) => (
              <span
                key={tItem}
                className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-zinc-300"
              >
                {tItem}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
          <button
            onClick={onSelect}
            className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-white hover:text-cyan-400 transition-colors focus:outline-none focus:ring-1 focus:ring-cyan-400 rounded py-1 cursor-pointer"
          >
            <Info className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t('projects.viewDetails', 'Detail Lengkap')}</span>
          </button>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-mono text-cyan-400 hover:text-cyan-300 focus:outline-none focus:ring-1 focus:ring-cyan-400 rounded py-1 px-2.5 bg-cyan-950/40 border border-cyan-500/20 hover:bg-cyan-900/50 transition-colors"
            >
              <span>{t('projects.livePreview', 'Live Preview')}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}
