import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Sparkles, User, Briefcase, Mail, ArrowRight } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { fantraData } from '../data/fantraData'

export default function Hero() {
  const { t } = useLanguage()
  const { profile } = fantraData

  // Glitch transformation states:
  // Names: "FAHRI ANDRIAN SAPUTRA" <-> "FANTRA"
  // Interval: 2.4s normal display, ~350ms glitch burst
  const [displayName, setDisplayName] = useState('FAHRI ANDRIAN SAPUTRA')
  const [isGlitching, setIsGlitching] = useState(false)
  const heroVideoRef = useRef(null)

  useEffect(() => {
    let timeoutId

    const triggerGlitchLoop = () => {
      // 1. Wait for 2.4 seconds in normal state
      timeoutId = setTimeout(() => {
        // 2. Start glitch effect
        setIsGlitching(true)

        // 3. Halfway through glitch, switch text
        setTimeout(() => {
          setDisplayName((prev) =>
            prev === 'FAHRI ANDRIAN SAPUTRA' ? 'FANTRA' : 'FAHRI ANDRIAN SAPUTRA'
          )
        }, 180)

        // 4. End glitch burst and schedule next cycle
        setTimeout(() => {
          setIsGlitching(false)
          triggerGlitchLoop()
        }, 360)
      }, 2400)
    }

    triggerGlitchLoop()

    return () => {
      clearTimeout(timeoutId)
    }
  }, [])

  useEffect(() => {
    if (heroVideoRef.current) {
      heroVideoRef.current.play().catch(() => {})
    }
  }, [])

  const handleScrollToSection = (id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative min-h-screen w-full flex items-center justify-between overflow-hidden pt-20 pb-16 px-4 sm:px-8 md:px-12 lg:px-16">
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* LEFT COLUMN: HERO INFORMATION */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="lg:col-span-7 flex flex-col justify-center text-left"
        >
          {/* Top Badge matching reference style */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#220049]/40 border border-[#72a1de]/40 text-xs sm:text-sm font-mono tracking-widest text-[#72a1de] uppercase shadow-[0_0_15px_rgba(114,161,222,0.3)] mb-6 max-w-fit backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>{t('hero.badge', 'DIGITAL CREATIVE & VISUAL PORTFOLIO')}</span>
          </div>

          {/* GLITCH NAME TRANSFORMATION DISPLAY WITH STABLE BOUNDS */}
          <div className="min-h-[90px] sm:min-h-[120px] md:min-h-[140px] flex items-center mb-4">
            <div
              className={`glitch-wrapper ${isGlitching ? 'glitch-active' : ''}`}
              data-text={displayName}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black tracking-tight text-white leading-tight">
                {displayName === 'FANTRA' ? (
                  <span className="gradient">{displayName}</span>
                ) : (
                  <span className="text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.4)]">
                    {displayName}
                  </span>
                )}
              </h1>
            </div>
          </div>

          {/* Subheading / Tagline with Reference Gradient Treatment */}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-zinc-200 tracking-tight mb-4">
            {t('hero.taglinePrefix', 'Kreativitas Digital')} &bull;{' '}
            <span className="gradient">
              {t('hero.taglineHighlight', 'Visual Creation & Multimedia')}
            </span>
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-zinc-300 max-w-xl leading-relaxed mb-8 font-sans">
            {t(
              'hero.description',
              'Mengeksplorasi estetika visual, konten digital interaktif, dan kreasi media modern yang presisi dan berkarakter.'
            )}
          </p>

          {/* 3 FUNCTIONING HERO CTAS */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            {/* CTA 1: ABOUT ME */}
            <Link
              to="/about"
              className="btn-editorial-primary flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-mono font-bold tracking-wider hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            >
              <User className="w-4 h-4" />
              <span>{t('hero.cta.about', 'ABOUT ME')}</span>
            </Link>

            {/* CTA 2: EXPLORE PROJECTS */}
            <Link
              to="/projects"
              className="btn-editorial-accent flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-mono font-bold tracking-wider hover:scale-105 transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)]"
            >
              <Briefcase className="w-4 h-4" />
              <span>{t('hero.cta.projects', 'EXPLORE PROJECTS')}</span>
            </Link>

            {/* CTA 3: CONTACT ME */}
            <Link
              to="/contact"
              className="btn-editorial-outline flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-mono font-bold tracking-wider hover:scale-105 transition-all"
            >
              <Mail className="w-4 h-4 text-cyan-400" />
              <span>{t('hero.cta.contact', 'CONTACT ME')}</span>
            </Link>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: HERO VIDEO / TECH HOLOGRAM FROM MASTER REFERENCE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="lg:col-span-5 flex items-center justify-center relative pointer-events-none"
        >
          <div className="relative w-full max-w-[480px] aspect-square flex items-center justify-center">
            {/* Hologram ambient glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500/20 via-purple-600/20 to-transparent blur-3xl opacity-60 animate-pulse" />

            {/* Reference hero-video.mp4 with mix-blend-mode: lighten */}
            <video
              ref={heroVideoRef}
              autoPlay
              loop
              muted
              playsInline
              poster="/hero-arctic-stars.jpg"
              className="w-full h-full object-contain mix-blend-lighten scale-110 drop-shadow-[0_0_35px_rgba(114,161,222,0.4)]"
              src="/videos/hero-video.mp4"
            />
          </div>
        </motion.div>
      </div>

      {/* SCROLL DOWN INDICATOR FROM MASTER REFERENCE */}
      <div
        onClick={() => handleScrollToSection('about-section')}
        className="scroll-down hidden sm:block z-20"
        title="Scroll Down"
      />
    </section>
  )
}
