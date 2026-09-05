import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowUp, Phone, Instagram, MessageSquare, ExternalLink } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { fantraData } from '../data/fantraData'

export default function Footer() {
  const { t } = useLanguage()
  const { profile } = fantraData

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const navLinks = [
    { name: t('nav.home', 'Home'), path: '/' },
    { name: t('nav.about', 'About'), path: '/about' },
    { name: t('nav.projects', 'Projects'), path: '/projects' },
    { name: t('nav.gallery', 'Gallery'), path: '/gallery' },
    { name: t('nav.experience', 'Experience'), path: '/experience' },
    { name: t('nav.contact', 'Contact'), path: '/contact' },
  ]

  const socials = [
    { name: 'WhatsApp', url: profile.whatsapp },
    { name: 'Instagram', url: profile.instagram },
    { name: 'TikTok', url: profile.tiktok },
    { name: 'CapCut', url: profile.capcut },
  ]

  return (
    <footer className="bg-black border-t border-white/10 pt-16 pb-12 text-zinc-400">
      <div className="fantra-container">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* BRAND COLUMN */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="font-display font-black text-2xl text-white tracking-tight">
                {profile.callsign}
              </span>
              <div className="px-2 py-0.5 rounded bg-white/10 border border-white/15 text-[10px] font-mono text-zinc-300">
                FANTRA / LOGO
              </div>
            </div>

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-sm">
              {t(
                'hero.description',
                'Mengeksplorasi estetika visual, konten digital interaktif, dan kreasi media modern.'
              )}
            </p>
          </div>

          {/* NAVIGATION LINKS */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-300 mb-4">
              {t('footer.navigation', 'Navigasi')}
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {navLinks.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="hover:text-cyan-400 transition-colors py-1 focus:outline-none focus:text-cyan-400"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* SOCIAL & CONNECT */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-300 mb-4">
              {t('footer.connect', 'Terhubung')}
            </h4>
            <div className="flex flex-col gap-2 text-xs">
              {socials.map((soc) => (
                <a
                  key={soc.name}
                  href={soc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 transition-colors py-1 flex items-center gap-1.5 focus:outline-none focus:text-cyan-400"
                >
                  <span>{soc.name}</span>
                  <ExternalLink className="w-3 h-3 text-zinc-600" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM COPYRIGHT & BACK TO TOP */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <p>{t('footer.copyright', '© Fantra. Seluruh hak cipta dilindungi.')}</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors focus:outline-none focus:ring-1 focus:ring-cyan-400 rounded px-2 py-1"
          >
            <span>{t('footer.backToTop', 'Kembali ke Atas')}</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  )
}
