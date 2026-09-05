import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Image as ImageIcon, ArrowUpRight, Maximize2, Sparkles, FileText, Activity } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { getLocalizedData } from '../data/fantraData'

export default function GalleryPreview({ onOpenImage }) {
  const { t, lang } = useLanguage()
  const { certificates, achievements, activities } = getLocalizedData(lang)
  const [activeTab, setActiveTab] = useState('certificate')

  const tabs = [
    { id: 'certificate', name: t('gallery.tabs.certificate', 'Certificate'), count: certificates.length },
    { id: 'achievement', name: t('gallery.tabs.achievement', 'Achievement'), count: achievements.length },
    { id: 'activity', name: t('gallery.tabs.activity', 'Activity'), count: activities.length },
  ]

  let currentItems = []
  if (activeTab === 'certificate') currentItems = certificates
  else if (activeTab === 'achievement') currentItems = achievements
  else if (activeTab === 'activity') currentItems = activities

  return (
    <section className="py-20 sm:py-28 relative border-t border-white/5">
      <div className="fantra-container">
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-widest text-cyan-400 uppercase mb-4">
              <ImageIcon className="w-3.5 h-3.5" />
              <span>{t('gallery.badge', 'GALERI & DOKUMENTASI')}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold text-white tracking-tight">
              {t('gallery.title', 'Koleksi Visual & Arsip Kegiatan')}
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 mt-3">
              {t(
                'gallery.subtitle',
                'Dokumentasi sertifikasi, capaian, dan aktivitas di balik layar.'
              )}
            </p>
          </div>

          {/* GALLERY TABS */}
          <div className="flex items-center gap-2 p-1.5 bg-zinc-950 border border-white/10 rounded-full">
            {tabs.map((tab) => {
              const active = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400 ${
                    active
                      ? 'bg-white text-black font-bold shadow-md'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab.name}
                </button>
              )
            })}
          </div>
        </div>

        {/* GALLERY ITEMS GRID */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {currentItems.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="fantra-card bg-zinc-950/80 p-0 overflow-hidden group hover:border-cyan-500/30 transition-all duration-300 flex flex-col"
              >
                {/* Image Container */}
                <div
                  onClick={() => onOpenImage && onOpenImage(currentItems, idx)}
                  className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-900 cursor-pointer"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />

                  {/* Hover Overlay Zoom Button */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="p-3 rounded-full bg-black/80 text-cyan-400 border border-cyan-400/30 shadow-xl scale-90 group-hover:scale-100 transition-transform">
                      <Maximize2 className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono uppercase text-cyan-400">
                      {item.category || item.issuer || item.date}
                    </span>
                  </div>
                </div>

                {/* Card Text */}
                <div className="p-5 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-base font-sans font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-1 mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed mb-4">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                    <span>{item.year || item.date || item.organizer}</span>
                    <button
                      onClick={() => onOpenImage && onOpenImage(currentItems, idx)}
                      className="text-cyan-400 hover:text-cyan-300 font-semibold focus:outline-none"
                    >
                      {t('gallery.viewImage', 'Perbesar')}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* BOTTOM CTA: FULL GALLERY PAGE */}
        <div className="mt-12 text-center">
          <Link
            to="/gallery"
            className="btn-editorial-outline inline-flex items-center gap-2 text-xs py-3 px-8"
          >
            <span>{t('gallery.viewAll', 'Buka Galeri Penuh')}</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
