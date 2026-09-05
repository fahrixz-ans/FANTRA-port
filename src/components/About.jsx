import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Compass, Target, MapPin, ChevronDown, Send, Globe } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { getLocalizedData } from '../data/fantraData'

export default function About() {
  const [showMore, setShowMore] = useState(false)
  const { t, lang } = useLanguage()
  const { profile } = getLocalizedData(lang)

  return (
    <section id="about-section" className="py-20 sm:py-28 relative border-t border-white/5 bg-black/30 backdrop-blur-xs">
      <div className="fantra-container">
        {/* SECTION HEADER */}
        <div className="max-w-3xl mb-14 text-center mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#220049]/40 border border-[#72a1de]/40 text-xs font-mono tracking-widest text-cyan-400 uppercase mb-4 shadow-[0_0_15px_rgba(114,161,222,0.2)]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('about.badge', 'TENTANG SAYA')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold text-white tracking-tight leading-tight">
            {t('about.title', 'Kreativitas Digital yang Terarah & Berkarakter')}
          </h2>
          <p className="text-sm sm:text-base text-zinc-300 mt-4 leading-relaxed max-w-2xl mx-auto">
            {t(
              'about.subtitle',
              'Memadukan kepekaan estetika visual, digital branding, dan eksekusi multimedia modern untuk menghadirkan karya yang bermakna.'
            )}
          </p>
        </div>

        {/* MASTER REFERENCE BENTO GRID (4 INFO CARDS WITH IMAGES & GLOBE VIDEO) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch mb-12">
          {/* CARD 1: Identity & Background (grid1.png) */}
          <div className="fantra-card bg-zinc-950/80 border-white/10 p-6 flex flex-col justify-between group hover:border-cyan-500/40 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-xl font-sans font-bold text-white mb-2">
                {t('about.card1.title', "Hi there, I'm Fantra")}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-4">
                {t(
                  'about.card1.desc',
                  'Berdedikasi menciptakan konten visual, eksplorasi media digital, dan project kreatif dengan perhatian mendalam pada estetika dan komposisi.'
                )}
              </p>
            </div>
            <div className="relative mt-4 w-full h-44 rounded-xl overflow-hidden bg-zinc-900/60 border border-white/10 flex items-center justify-center">
              <img
                src="/images/grid1.png"
                alt="Fantra Creative Profile"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* CARD 2: Tech & Creative Stack (grid2.png) */}
          <div className="fantra-card bg-zinc-950/80 border-white/10 p-6 flex flex-col justify-between group hover:border-cyan-500/40 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-xl font-sans font-bold text-white mb-2">
                {t('about.card2.title', 'Creative & Digital Stack')}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-4">
                {t(
                  'about.card2.desc',
                  'Menguasai berbagai tools visual design, video editing, platform multimedia, dan framework modern untuk menciptakan pengalaman digital berkelas.'
                )}
              </p>
            </div>
            <div className="relative mt-4 w-full h-44 rounded-xl overflow-hidden bg-zinc-900/60 border border-white/10 flex items-center justify-center">
              <img
                src="/images/grid2.png"
                alt="Tech and Creative Stack"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* CARD 3: Global Remote Collaboration (glob.mp4) */}
          <div className="fantra-card bg-zinc-950/80 border-white/10 p-6 flex flex-col justify-between group hover:border-cyan-500/40 relative overflow-hidden md:col-span-2 lg:col-span-1">
            <div className="relative z-10">
              <h3 className="text-xl font-sans font-bold text-white mb-2">
                {t('about.card3.title', 'Flexible Remote Collaboration')}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-4">
                {t(
                  'about.card3.desc',
                  'Berbasis di Indonesia dan terbuka untuk kolaborasi digital, project kreatif, serta kerja sama profesional secara global.'
                )}
              </p>
            </div>
            <div className="relative mt-2 w-full h-36 rounded-xl overflow-hidden bg-zinc-900/60 border border-white/10 flex items-center justify-center">
              <video
                src="/videos/glob.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover mix-blend-screen opacity-90"
              />
            </div>
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono text-cyan-400 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5" />
                {profile.location}
              </span>
              <Link
                to="/contact"
                className="btn-editorial-accent py-1.5 px-4 text-xs font-mono font-semibold"
              >
                <Send className="w-3 h-3 mr-1" />
                {t('common.contactMe', 'Contact Me')}
              </Link>
            </div>
          </div>

          {/* CARD 4: Passion for Visual & Digital Craft (grid4.png) */}
          <div className="fantra-card bg-zinc-950/80 border-white/10 p-6 flex flex-col md:flex-row items-center justify-between group hover:border-cyan-500/40 relative overflow-hidden md:col-span-2 lg:col-span-3 gap-6">
            <div className="flex-1">
              <h3 className="text-2xl font-sans font-bold text-white mb-3">
                {t('about.card4.title', 'Passion for Visual Storytelling & Digital Creation')}
              </h3>
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed mb-4">
                {t(
                  'about.card4.desc',
                  'Bagi saya, setiap desain visual dan project multimedia adalah kombinasi seni, komunikasi, dan teknologi. Saya senang mengeksplorasi teknik baru, meningkatkan kualitas karya, serta menghasilkan identitas visual yang memikat.'
                )}
              </p>

              <button
                onClick={() => setShowMore((prev) => !prev)}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-cyan-400 hover:text-cyan-300 font-semibold focus:outline-none rounded-lg transition-colors cursor-pointer"
              >
                <span>
                  {showMore
                    ? t('about.hideDetails', 'Tutup Rincian')
                    : t('about.moreAboutMe', 'Lebih Banyak Tentang Saya')}
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${
                    showMore ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </div>

            <div className="w-full md:w-72 h-44 rounded-xl overflow-hidden bg-zinc-900/60 border border-white/10 shrink-0">
              <img
                src="/images/grid4.png"
                alt="Passion for Craft"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>

        {/* EXPANDABLE SECTION FOR DETAILED PRINCIPLES & VALUES */}
        <AnimatePresence>
          {showMore && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="overflow-hidden mb-12"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                {/* FOCUS */}
                <div className="p-6 rounded-2xl bg-zinc-950/80 border border-white/10">
                  <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-2">
                    <Compass className="w-4 h-4" />
                    <span>{t('about.details.focusTitle', 'Fokus & Minat')}</span>
                  </div>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    {t(
                      'about.details.focusDesc',
                      'Pembuatan konten visual, digital branding, editing multimedia, motion graphics, dan eksplorasi platform media modern.'
                    )}
                  </p>
                </div>

                {/* VALUES */}
                <div className="p-6 rounded-2xl bg-zinc-950/80 border border-white/10">
                  <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-2">
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
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
