import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { getStoredTheme, toggleTheme } from '../lib/themeManager'
import { soundManager } from '../lib/soundManager'

export default function ThemeToggle({ compact = false, className = '' }) {
  const [theme, setTheme] = useState(getStoredTheme())

  useEffect(() => {
    const handleThemeChange = (e) => {
      if (e.detail?.theme) {
        setTheme(e.detail.theme)
      }
    }
    window.addEventListener('theme-changed', handleThemeChange)
    return () => window.removeEventListener('theme-changed', handleThemeChange)
  }, [])

  const isLight = theme === 'light'

  const handleToggle = () => {
    soundManager.play('click')
    const newTheme = toggleTheme()
    setTheme(newTheme)
  }

  if (compact) {
    return (
      <button
        onClick={handleToggle}
        onMouseEnter={() => soundManager.play('hover')}
        className={`p-2 rounded-xl bg-galaxy-card-alt border border-white/10 text-galaxy-text hover:text-galaxy-primary transition-all flex items-center justify-center cursor-pointer ${className}`}
        aria-label={isLight ? 'Beralih ke Mode Gelap Galaxy' : 'Beralih ke Mode Terang High-Contrast'}
        title={isLight ? 'Beralih ke Mode Gelap Galaxy' : 'Beralih ke Mode Terang (Aksesibilitas Tinggi)'}
      >
        {isLight ? <Sun className="w-4 h-4 text-cyan-400" /> : <Moon className="w-4 h-4 text-galaxy-primary" />}
      </button>
    )
  }

  return (
    <button
      onClick={handleToggle}
      onMouseEnter={() => soundManager.play('hover')}
      className={`relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-galaxy-card-alt border border-white/15 text-xs font-semibold text-galaxy-text hover:border-galaxy-primary/40 transition-all select-none cursor-pointer focus-visible:outline-2 focus-visible:outline-galaxy-primary ${className}`}
      aria-label={isLight ? 'Aktifkan Mode Gelap Galaxy' : 'Aktifkan Mode Terang Aksesibilitas'}
      title="Ubah Tema Tampilan (Galaxy Dark / High-Contrast Light)"
    >
      <div className="relative w-8 h-4 rounded-full bg-white/10 p-0.5 flex items-center">
        <motion.div
          className="w-3.5 h-3.5 rounded-full flex items-center justify-center"
          animate={{ x: isLight ? 14 : 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        >
          {isLight ? (
            <Sun className="w-3.5 h-3.5 text-cyan-400" />
          ) : (
            <Moon className="w-3.5 h-3.5 text-galaxy-primary" />
          )}
        </motion.div>
      </div>
      <span className="font-mono text-[11px] text-galaxy-text-muted">
        {isLight ? 'Mode Terang' : 'Mode Galaxy'}
      </span>
    </button>
  )
}
