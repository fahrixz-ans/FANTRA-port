import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Briefcase, Calendar, MapPin, CheckCircle2, Sparkles } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { getLocalizedData } from '../data/fantraData'

export default function Experience() {
  const { t, lang } = useLanguage()
  const { experiences } = getLocalizedData(lang)
  const [activeTab, setActiveTab] = useState('magang')

  const filteredExperiences = experiences.filter(
    (exp) => (exp.categoryKey || exp.category).toLowerCase() === activeTab.toLowerCase()
  )

  return (
    <section className="py-20 sm:py-28 relative border-t border-white/5 bg-black/40">
      <div className="fantra-container">
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-widest text-cyan-400 uppercase mb-4">
              <Briefcase className="w-3.5 h-3.5" />
              <span>{t('experience.badge', 'PENGALAMAN')}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold text-white tracking-tight">
              {t('experience.title', 'Jejak Praktik & Pengalaman Kerja')}
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 mt-3">
              {t(
                'experience.subtitle',
                'Riwayat pengalaman praktik lapangan dan peran profesional yang pernah dijalani.'
              )}
            </p>
          </div>

          {/* INTERNAL NAVBAR: [ MAGANG ] [ KERJA ] */}
          <div className="flex items-center gap-2 p-1.5 bg-zinc-950 border border-white/10 rounded-full self-start md:self-auto">
            <button
              onClick={() => setActiveTab('magang')}
              className={`px-5 py-2 rounded-full text-xs font-mono font-bold tracking-wider transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400 ${
                activeTab === 'magang'
                  ? 'bg-white text-black shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              [ {t('experience.tabs.magang', 'MAGANG')} ]
            </button>
            <button
              onClick={() => setActiveTab('kerja')}
              className={`px-5 py-2 rounded-full text-xs font-mono font-bold tracking-wider transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400 ${
                activeTab === 'kerja'
                  ? 'bg-white text-black shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              [ {t('experience.tabs.kerja', 'KERJA')} ]
            </button>
          </div>
        </div>

        {/* TIMELINE LIST */}
        <div className="space-y-6 max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {filteredExperiences.map((exp, idx) => (
                <div
                  key={exp.id}
                  className="fantra-card bg-zinc-950/80 p-6 sm:p-8 hover:border-cyan-500/30 transition-all duration-300 relative overflow-hidden"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-mono text-cyan-400 uppercase tracking-wider">
                          {exp.category}
                        </span>
                        <span className="text-xs font-mono text-zinc-500">#{idx + 1}</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-sans font-bold text-white">
                        {exp.role}
                      </h3>
                      <p className="text-sm font-semibold text-cyan-400/90 mt-0.5">
                        {exp.company}
                      </p>
                    </div>

                    <div className="flex flex-col sm:items-end text-xs font-mono text-zinc-400 shrink-0">
                      <div className="flex items-center gap-1.5 text-zinc-300">
                        <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{exp.period}</span>
                      </div>
                      {exp.location && (
                        <div className="flex items-center gap-1.5 text-zinc-500 mt-1">
                          <MapPin className="w-3 h-3 text-zinc-500" />
                          <span>{exp.location}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-zinc-300 leading-relaxed mb-6 pt-2 border-t border-white/5">
                    {exp.desc}
                  </p>

                  {/* Bullet activities */}
                  {exp.activities && exp.activities.length > 0 && (
                    <div className="space-y-2 pt-2 bg-white/5 p-4 rounded-2xl border border-white/10">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                        {t('experience.activities', 'Tanggung Jawab & Aktivitas:')}
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {exp.activities.map((act, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-zinc-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                            <span>{act}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
