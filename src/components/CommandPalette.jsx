import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Globe,
  Rocket,
  Scale,
  Palette,
  Sparkles,
  FlaskConical,
  BookOpen,
  Sprout,
  Users,
  MessageSquare,
  Send,
  Image,
  Newspaper,
  Activity,
  Zap,
  History,
  Hammer,
  Compass,
  Clock,
  Settings,
  SunMoon,
  Search
} from 'lucide-react'
import { extendedData } from '../data/extendedData'
import { toggleTheme } from '../lib/themeManager'
import { soundManager } from '../lib/soundManager'

export default function CommandPalette({ isOpen, onClose }) {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        if (isOpen) onClose()
        else setQuery('')
      }
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const pages = [
    { label: 'FahriXz Universe (Ecosystem Map)', path: '/universe', type: 'Ecosystem', icon: Globe },
    { label: 'Project Explorer', path: '/projects', type: 'Proyek', icon: Rocket },
    { label: 'Compare Projects Tool', path: '/projects/compare', type: 'Proyek', icon: Scale },
    { label: 'Creator Hub & Preset Library', path: '/creator', type: 'Creator', icon: Palette },
    { label: 'Before & After Showcase', path: '/showcase', type: 'Showcase', icon: Sparkles },
    { label: 'Experiment Lab', path: '/lab', type: 'Lab', icon: FlaskConical },
    { label: 'Blog & Wawasan Artikel', path: '/blog', type: 'Blog', icon: BookOpen },
    { label: 'Digital Garden Notes', path: '/garden', type: 'Garden', icon: Sprout },
    { label: 'Community Hub & YourFams', path: '/community', type: 'Community', icon: Users },
    { label: 'Guestbook (Buku Tamu)', path: '/guestbook', type: 'Community', icon: MessageSquare },
    { label: 'Feedback & Bug Report', path: '/feedback', type: 'Support', icon: Send },
    { label: 'Brand Kit & Assets', path: '/brand', type: 'Brand', icon: Image },
    { label: 'Press Kit & Media Bio', path: '/press', type: 'Press', icon: Newspaper },
    { label: 'System Status Dashboard', path: '/status', type: 'System', icon: Activity },
    { label: 'Activity Feed Logs', path: '/activity', type: 'Activity', icon: Zap },
    { label: 'Version History', path: '/versions', type: 'Versions', icon: History },
    { label: 'Build In Public Tracker', path: '/build', type: 'Build', icon: Hammer },
    { label: 'What I\'m Doing Now', path: '/now', type: 'Now', icon: Compass },
    { label: 'Career & Education Timeline', path: '/timeline', type: 'Career', icon: Clock },
    { label: 'Admin CMS Dashboard', path: '/admin', type: 'Admin', icon: Settings }
  ]

  const items = [
    {
      label: 'Ubah Tema (High-Contrast Terang / Galaxy Dark)',
      type: 'Pengaturan',
      icon: SunMoon,
      action: () => { soundManager.play('click'); onClose(); toggleTheme(); }
    },
    ...pages.map((p) => ({
      label: p.label,
      type: p.type,
      icon: p.icon,
      action: () => { soundManager.play('nav-click'); navigate(p.path); onClose(); }
    })),
    ...extendedData.detailedProjects.map((dp) => ({
      label: `Proyek Detail: ${dp.name}`,
      type: 'Proyek Detail',
      icon: Rocket,
      action: () => { soundManager.play('nav-click'); navigate(`/projects/${dp.slug}`); onClose(); }
    })),
    ...extendedData.creatorPresets.map((cp) => ({
      label: `Preset: ${cp.title}`,
      type: 'CapCut / AM',
      icon: Palette,
      action: () => { soundManager.play('nav-click'); navigate('/creator'); onClose(); }
    }))
  ]

  const filtered = items.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase().trim())
  )

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-start justify-center pt-20 px-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.2 }}
          className="bg-galaxy-card border border-white/10 rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header search bar */}
          <div className="p-4 border-b border-white/10 flex items-center gap-3 bg-galaxy-card-alt">
            <Search className="w-5 h-5 text-galaxy-primary" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari di seluruh ekosistem FahriXz... (Esc untuk tutup)"
              className="w-full bg-transparent text-sm text-galaxy-text placeholder:text-galaxy-text-muted focus:outline-none"
            />
            <span className="text-[10px] font-mono font-bold px-2 py-1 rounded bg-white/5 border border-white/10 text-galaxy-text-muted">
              ESC
            </span>
          </div>

          {/* Results list */}
          <div className="max-h-80 overflow-y-auto p-2 space-y-1">
            {filtered.length > 0 ? (
              filtered.map((item, index) => {
                const ItemIcon = item.icon
                return (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.01, x: 2 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={item.action}
                    onMouseEnter={() => soundManager.play('hover')}
                    className="w-full text-left px-3.5 py-2.5 rounded-xl hover:bg-galaxy-primary/10 hover:border-galaxy-primary/30 border border-transparent flex items-center justify-between text-xs text-galaxy-text transition-colors group cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <ItemIcon className="w-4 h-4 text-galaxy-primary group-hover:scale-110 transition-transform" />
                      <span className="font-medium group-hover:text-galaxy-primary transition-colors">
                        {item.label}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-galaxy-card-alt border border-white/5 text-galaxy-text-muted">
                      {item.type}
                    </span>
                  </motion.button>
                )
              })
            ) : (
              <div className="p-8 text-center text-galaxy-text-muted text-xs">
                Tidak ada hasil ditemukan untuk "{query}".
              </div>
            )}
          </div>

          <div className="p-3 border-t border-white/5 bg-galaxy-card-alt flex items-center justify-between text-[11px] text-galaxy-text-muted font-mono">
            <span>Pintasan Cepat: Ctrl + K</span>
            <span>{filtered.length} Hasil Index</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

