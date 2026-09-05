import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cpu, Palette, Code, Sparkles, Monitor, Layers, Wrench, Globe, CheckCircle2 } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { getLocalizedData } from '../data/fantraData'

export default function Skills() {
  const { t, lang } = useLanguage()
  const localizedData = getLocalizedData(lang)
  const { skills } = localizedData
  const [activeCategory, setActiveCategory] = useState('all')

  const techIcons = [
    { src: '/images/1.png', label: 'HTML5' },
    { src: '/images/2.png', label: 'CSS3 / Tailwind' },
    { src: '/images/3.webp', label: 'JavaScript' },
    { src: '/images/4.webp', label: 'React' },
    { src: '/images/5.png', label: 'TypeScript' },
    { src: '/images/6.png', label: 'Next.js' },
    { src: '/images/7.png', label: 'Node.js' },
    { src: '/images/8.png', label: 'Figma' },
    { src: '/images/9.png', label: 'Creative Suite' },
  ]

  // Structured skill categories as requested: Digital, Web, Tools
  const structuredCategories = [
    {
      id: 'digital',
      name: t('skills.categories.digital', 'Digital'),
      icon: Globe,
      color: 'from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-400',
      description: t(
        'skills.categories.digitalDesc',
        'Strategi visual branding, produksi konten multimedia, dan digital presence.'
      ),
      items: [
        { name: 'Digital Branding', level: 90 },
        { name: 'Digital Marketing', level: 85 },
        { name: 'Content Creation', level: 92 },
        { name: 'Visual Storytelling', level: 88 },
        { name: 'Social Media Strategy', level: 85 },
      ],
    },
    {
      id: 'web',
      name: t('skills.categories.web', 'Web'),
      icon: Code,
      color: 'from-cyan-500/20 to-blue-500/20 border-cyan-500/30 text-cyan-400',
      description: t(
        'skills.categories.webDesc',
        'Pengembangan antarmuka website modern, responsif, dan interaktif.'
      ),
      items: [
        { name: 'HTML5 & CSS3', level: 95 },
        { name: 'JavaScript (ES6+)', level: 88 },
        { name: 'TypeScript', level: 82 },
        { name: 'React & Vite', level: 88 },
        { name: 'Tailwind CSS', level: 92 },
      ],
    },
    {
      id: 'tools',
      name: t('skills.categories.tools', 'Tools'),
      icon: Wrench,
      color: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-400',
      description: t(
        'skills.categories.toolsDesc',
        'Infrastruktur deploy, basis data, visual tools, dan asset management.'
      ),
      items: [
        { name: 'Firebase & Firestore', level: 85 },
        { name: 'Cloudinary', level: 88 },
        { name: 'Vercel / Deployment', level: 90 },
        { name: 'Figma & Design Tools', level: 88 },
        { name: 'Git & GitHub', level: 85 },
      ],
    },
  ]

  const visibleCategories =
    activeCategory === 'all'
      ? structuredCategories
      : structuredCategories.filter((c) => c.id === activeCategory)

  return (
    <section className="py-20 sm:py-28 relative border-t border-white/5 bg-black/40 overflow-hidden">
      <div className="fantra-container">
        {/* SECTION TITLE */}
        <div className="max-w-3xl mb-14 text-center mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#220049]/40 border border-[#72a1de]/40 text-xs font-mono tracking-widest text-cyan-400 uppercase mb-4 shadow-[0_0_15px_rgba(114,161,222,0.2)]">
            <Cpu className="w-3.5 h-3.5" />
            <span>{t('skills.badge', 'KEAHLIAN & KAPABILITAS')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold text-white tracking-tight">
            {t('skills.title', 'My Skills & Creative Arsenal')}{' '}
            <span className="gradient">💪</span>
          </h2>
          <p className="text-sm sm:text-base text-zinc-300 mt-4 max-w-2xl mx-auto leading-relaxed">
            {t(
              'skills.subtitle',
              'Sinergi keahlian visual design, multimedia storytelling, dan penguasaan platform teknologi kreatif modern.'
            )}
          </p>
        </div>

        {/* MASTER REFERENCE DIGITAL BRAIN & 2-COLUMN HIGHLIGHT DISPLAY */}
        <div className="relative w-full max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 my-8">
          {/* LEFT WING: VISUAL DESIGNER */}
          <div className="w-full lg:w-1/3 fantra-card bg-zinc-950/80 border-white/10 p-6 flex flex-col gap-4 relative z-10">
            <div className="flex items-center gap-3 pb-3 border-b border-white/10">
              <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400">
                <Palette className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-sans font-bold text-white">
                <span className="gradient">{t('skills.designerTitle', 'Visual Designer')}</span>
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {t(
                'skills.designerDesc',
                'Keahlian dalam komposisi grafis, UI styling, tipografi, warna, visual branding, serta tools desain seperti Figma, Photoshop, dan Premiere Pro.'
              )}
            </p>
            <div className="space-y-2.5 pt-2 border-t border-white/5">
              {skills.creative.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-300">{item.name}</span>
                    <span className="font-mono text-cyan-400 font-semibold">{item.level}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full"
                      style={{ width: `${item.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CENTER: GLOWING DIGITAL BRAIN CENTERPIECE */}
          <div className="w-full lg:w-1/3 flex items-center justify-center relative my-2 lg:my-0">
            <div className="relative w-60 h-60 sm:w-72 sm:h-72 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-600/30 to-blue-500/20 rounded-full blur-2xl animate-pulse" />
              <img
                src="/images/digital_brain.png"
                alt="Digital Brain Core"
                className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_30px_rgba(6,182,212,0.4)] animate-[floatSlow_8s_ease-in-out_infinite]"
              />
            </div>
          </div>

          {/* RIGHT WING: DIGITAL CREATOR */}
          <div className="w-full lg:w-1/3 fantra-card bg-zinc-950/80 border-white/10 p-6 flex flex-col gap-4 relative z-10">
            <div className="flex items-center gap-3 pb-3 border-b border-white/10">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400">
                <Code className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-sans font-bold text-white">
                <span className="gradient">{t('skills.techTitle', 'Digital Creator')}</span>
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {t(
                'skills.techDesc',
                'Keahlian dalam pembuatan website interaktif, integrasi media digital, modern web frameworks, dan optimasi konten untuk audiens online.'
              )}
            </p>
            <div className="space-y-2.5 pt-2 border-t border-white/5">
              {skills.digital.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-300">{item.name}</span>
                    <span className="font-mono text-cyan-400 font-semibold">{item.level}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                      style={{ width: `${item.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3 STRUCTURED SKILL CATEGORIES: DIGITAL | WEB | TOOLS */}
        <div className="mt-14 pt-10 border-t border-white/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            <div className="text-left">
              <h3 className="text-xl sm:text-2xl font-sans font-bold text-white">
                {t('skills.matrixTitle', 'Struktur Keahlian & Domain Spesialisasi')}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                {t(
                  'skills.matrixSubtitle',
                  'Pemetaan keahlian dalam 3 pilar: Digital Strategy, Web Engineering, dan Tools & Cloud.'
                )}
              </p>
            </div>

            {/* Category Switcher Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-zinc-950 border border-white/10 rounded-full shrink-0">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all focus:outline-none ${
                  activeCategory === 'all'
                    ? 'bg-white text-black font-bold shadow-md'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {t('common.all', 'Semua')}
              </button>
              {structuredCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all focus:outline-none ${
                    activeCategory === cat.id
                      ? 'bg-white text-black font-bold shadow-md'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AnimatePresence>
              {visibleCategories.map((cat) => {
                const Icon = cat.icon
                return (
                  <motion.div
                    key={cat.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="fantra-card bg-zinc-950/80 border-white/10 p-6 flex flex-col justify-between hover:border-cyan-500/30 transition-all duration-300"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-cyan-400">
                          <Icon className="w-5 h-5" />
                        </div>
                        <h4 className="text-lg font-sans font-bold text-white">
                          {cat.name}
                        </h4>
                      </div>
                      <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                        {cat.description}
                      </p>

                      <div className="space-y-3">
                        {cat.items.map((item, idx) => (
                          <div key={idx} className="space-y-1">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-zinc-300 flex items-center gap-1.5">
                                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                                {item.name}
                              </span>
                              <span className="font-mono text-zinc-400 text-[11px]">{item.level}%</span>
                            </div>
                            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-cyan-400/80 rounded-full"
                                style={{ width: `${item.level}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* MASTER REFERENCE INFINITE MARQUEE SLIDER FOR TECH ICONS */}
        <div className="mt-16 pt-10 border-t border-white/10">
          <p className="text-center text-xs font-mono tracking-widest text-zinc-400 uppercase mb-8">
            {t('skills.techSliderTitle', 'TECHNOLOGY & TOOLCHAIN ARSENAL')}
          </p>

          <div className="marquee-slider w-full py-4">
            <div className="marquee-track">
              {/* Double array for continuous seamless infinite loop */}
              {[...techIcons, ...techIcons].map((icon, idx) => (
                <div
                  key={`${icon.src}-${idx}`}
                  className="flex flex-col items-center justify-center p-3 rounded-2xl bg-zinc-950/80 border border-white/10 hover:border-cyan-500/50 hover:bg-zinc-900 transition-all duration-300 w-24 h-24 sm:w-28 sm:h-28 shrink-0 group cursor-pointer"
                >
                  <img
                    src={icon.src}
                    alt={icon.label}
                    className="w-10 h-10 sm:w-12 sm:h-12 object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]"
                  />
                  <span className="mt-2 text-[10px] font-mono text-zinc-400 group-hover:text-cyan-400 transition-colors whitespace-nowrap text-center">
                    {icon.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
