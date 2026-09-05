import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Globe, ChevronDown, Sparkles } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const { lang, setLang, t, languages } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile drawer and lang popover on route change
  useEffect(() => {
    setIsOpen(false)
    setLangOpen(false)
  }, [location.pathname])

  const navLinks = [
    { name: t('nav.home', 'Home'), path: '/' },
    { name: t('nav.about', 'About'), path: '/about' },
    { name: t('nav.projects', 'Projects'), path: '/projects' },
    { name: t('nav.gallery', 'Gallery'), path: '/gallery' },
    { name: t('nav.experience', 'Experience'), path: '/experience' },
    { name: t('nav.contact', 'Contact'), path: '/contact' },
  ]

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  const currentLangObj = languages.find((l) => l.code === lang) || languages[0]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-black/85 backdrop-blur-md border-b border-white/10 py-3.5 shadow-2xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="fantra-container flex items-center justify-between">
        {/* LOGO PLACEHOLDER */}
        <Link
          to="/"
          className="group flex items-center gap-2.5 focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded-lg p-1"
          aria-label="Fantra Home"
        >
          <div className="px-2.5 py-1 rounded bg-white/10 border border-white/20 group-hover:border-cyan-400/50 group-hover:bg-cyan-950/30 transition-colors">
            <span className="font-mono text-xs font-bold tracking-widest text-white group-hover:text-cyan-400 transition-colors">
              FANTRA
            </span>
            <span className="ml-1.5 text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
              / LOGO
            </span>
          </div>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const active = isActive(link.path)
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-400 ${
                  active
                    ? 'text-white font-semibold'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.name}
                {active && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 bg-white/10 border border-white/15 rounded-full -z-10 shadow-sm"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            )
          })}
        </nav>

        {/* RIGHT CONTROLS: LANGUAGE SELECTOR + MOBILE TOGGLE */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setLangOpen((prev) => !prev)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono bg-white/5 border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400"
              aria-expanded={langOpen}
              aria-label={t('nav.selectLanguage', 'Select Language')}
            >
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span className="font-semibold">{currentLangObj.short}</span>
              <ChevronDown
                className={`w-3 h-3 transition-transform duration-200 ${
                  langOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            <AnimatePresence>
              {langOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setLangOpen(false)}
                    aria-hidden="true"
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-48 bg-zinc-950 border border-white/15 rounded-xl shadow-2xl p-1.5 z-50 backdrop-blur-xl"
                  >
                    <div className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest text-zinc-500 border-b border-white/10 mb-1">
                      {t('nav.selectLanguage', 'Select Language')}
                    </div>
                    {languages.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => {
                          setLang(l.code)
                          setLangOpen(false)
                        }}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors text-left ${
                          lang === l.code
                            ? 'bg-cyan-500/15 text-cyan-400 font-semibold'
                            : 'text-zinc-300 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>{l.flag}</span>
                          <span>{l.name}</span>
                        </span>
                        <span className="font-mono text-[10px] text-zinc-500">{l.short}</span>
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="md:hidden p-2 rounded-full text-zinc-300 hover:text-white bg-white/5 border border-white/10 hover:border-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400"
            aria-label={isOpen ? t('nav.close', 'Close Menu') : t('nav.menu', 'Open Menu')}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden bg-zinc-950/95 border-b border-white/10 backdrop-blur-2xl overflow-hidden"
          >
            <div className="fantra-container py-6 flex flex-col gap-2">
              {navLinks.map((link) => {
                const active = isActive(link.path)
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-all ${
                      active
                        ? 'bg-white/10 text-white font-semibold border border-white/15'
                        : 'text-zinc-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span>{link.name}</span>
                    {active && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />}
                  </Link>
                )
              })}

              <div className="pt-4 mt-2 border-t border-white/10 flex items-center justify-between text-xs text-zinc-500 font-mono">
                <span>FANTRA PORTFOLIO</span>
                <span className="text-cyan-400">{currentLangObj.name}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
