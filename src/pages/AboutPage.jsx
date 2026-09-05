import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, MapPin, Target, Compass, Award, Briefcase, Layers } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { getLocalizedData } from '../data/fantraData'
import Skills from '../components/Skills'
import Experience from '../components/Experience'

export default function AboutPage() {
  const { t, lang } = useLanguage()
  const { profile } = getLocalizedData(lang)

  return (
    <div className="pt-28 pb-20 min-h-screen bg-transparent text-white">
      <div className="fantra-container">
        {/* PAGE HEADER */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-widest text-cyan-400 uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('about.badge', 'TENTANG SAYA')}</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-sans font-black tracking-tight text-white mb-6">
            {t('about.title', 'Kreativitas Digital yang Terarah & Berkarakter')}
          </h1>
          <p className="text-lg sm:text-xl text-cyan-400 font-sans font-semibold mb-6">
            {profile.name} — {profile.tagline}
          </p>
          <p className="text-base text-zinc-300 leading-relaxed max-w-2xl">
            {t(
              'about.intro',
              'Halo! Saya Fantra, seorang Digital Creative & Visual Enthusiast yang berdedikasi menciptakan konten visual menarik, eksplorasi media digital, dan project kreatif berorientasi detail.'
            )}
          </p>
        </div>

        {/* PROFILE CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Card 1 */}
          <div className="fantra-card bg-zinc-950/80 p-6">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-3">
              <Compass className="w-4 h-4" />
              <span>{t('about.details.focusTitle', 'Fokus Utama')}</span>
            </div>
            <p className="text-sm text-zinc-300 leading-relaxed">
              {t(
                'about.details.focusDesc',
                'Pembuatan konten visual, digital branding, editing multimedia, motion graphics, dan eksplorasi platform digital modern.'
              )}
            </p>
          </div>

          {/* Card 2 */}
          <div className="fantra-card bg-zinc-950/80 p-6">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-3">
              <Target className="w-4 h-4" />
              <span>{t('about.details.valuesTitle', 'Prinsip Kerja')}</span>
            </div>
            <p className="text-sm text-zinc-300 leading-relaxed">
              {t(
                'about.details.valuesDesc',
                'Kreativitas terstruktur, perhatian pada detail mikro, kedisiplinan eksekusi, dan pembelajaran berkelanjutan.'
              )}
            </p>
          </div>

          {/* Card 3 */}
          <div className="fantra-card bg-zinc-950/80 p-6">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-3">
              <MapPin className="w-4 h-4" />
              <span>{t('about.details.locationTitle', 'Domisili')}</span>
            </div>
            <p className="text-sm text-zinc-300 leading-relaxed">
              {t(
                'about.details.locationDesc',
                'Berbasis di Lampung, Indonesia — terbuka untuk kolaborasi kreatif dan project digital inovatif.'
              )}
            </p>
          </div>
        </div>
      </div>

      {/* SKILLS SECTION */}
      <Skills />

      {/* EXPERIENCE EMBEDDED */}
      <Experience />
    </div>
  )
}
