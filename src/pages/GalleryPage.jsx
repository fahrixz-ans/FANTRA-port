import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Image as ImageIcon, Maximize2, Award, FileText, Activity } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { getLocalizedData } from '../data/fantraData'
import Lightbox from '../components/Lightbox'

export default function GalleryPage() {
  const { t, lang } = useLanguage()
  const [searchParams, setSearchParams] = useSearchParams()
  const { certificates, achievements, activities } = getLocalizedData(lang)

  const initialTab = searchParams.get('tab') || 'certificate'
  const [activeTab, setActiveTab] = useState(initialTab)
  const [lightboxData, setLightboxData] = useState({ isOpen: false, initialIndex: 0 })

  useEffect(() => {
    const tabParam = searchParams.get('tab')
    if (tabParam && ['certificate', 'achievement', 'activity'].includes(tabParam)) {
      setActiveTab(tabParam)
    }
  }, [searchParams])

  const handleTabChange = (tabId) => {
    setActiveTab(tabId)
    setSearchParams({ tab: tabId })
  }

  const tabs = [
    { id: 'certificate', name: t('gallery.tabs.certificate', 'Certificate'), count: certificates.length, icon: FileText },
    { id: 'achievement', name: t('gallery.tabs.achievement', 'Achievement'), count: achievements.length, icon: Award },
    { id: 'activity', name: t('gallery.tabs.activity', 'Activity'), count: activities.length, icon: Activity },
  ]

  let currentItems = []
  if (activeTab === 'certificate') currentItems = certificates
  else if (activeTab === 'achievement') currentItems = achievements
  else if (activeTab === 'activity') currentItems = activities

  return (
    <div className="pt-28 pb-20 min-h-screen bg-transparent text-white">
      <div className="fantra-container">
        {/* HEADER */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-widest text-cyan-400 uppercase mb-4">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>{t('gallery.badge', 'GALERI & DOKUMENTASI')}</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-sans font-black tracking-tight text-white mb-4">
            {t('gallery.title', 'Koleksi Visual & Arsip Kegiatan')}
          </h1>
          <p className="text-base text-zinc-400">
            {t(
              'gallery.subtitle',
              'Dokumentasi sertifikasi, capaian, dan aktivitas di balik layar.'
            )}
          </p>
        </div>

        {/* 3 TABS */}
        <div className="flex flex-wrap gap-2 p-1.5 bg-zinc-950 border border-white/10 rounded-2xl sm:rounded-full mb-12 max-w-fit">
          {tabs.map((tab) => {
            const active = activeTab === tab.id
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl sm:rounded-full text-xs font-mono tracking-wider transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400 ${
                  active
                    ? 'bg-white text-black font-bold shadow-lg'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.name}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${active ? 'bg-black/10 text-black' : 'bg-white/10 text-zinc-300'}`}>
                  {tab.count}
                </span>
              </button>
            )
          })}
        </div>

        {/* ITEMS GRID */}
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
                {/* Image */}
                <div
                  onClick={() => setLightboxData({ isOpen: true, initialIndex: idx })}
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

                {/* Details */}
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-lg font-sans font-bold text-white group-hover:text-cyan-400 transition-colors mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-4">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-zinc-500">
                    <span>{item.year || item.date || item.organizer}</span>
                    <button
                      onClick={() => setLightboxData({ isOpen: true, initialIndex: idx })}
                      className="text-cyan-400 hover:text-cyan-300 font-semibold focus:outline-none"
                    >
                      {t('gallery.viewImage', 'Perbesar Gambar')}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {lightboxData.isOpen && (
        <Lightbox
          items={currentItems}
          initialIndex={lightboxData.initialIndex}
          onClose={() => setLightboxData({ isOpen: false, initialIndex: 0 })}
        />
      )}
    </div>
  )
}
