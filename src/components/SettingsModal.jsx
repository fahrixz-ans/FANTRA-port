import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sliders, X, RotateCcw, Sparkles, Wind, Cloud, Eye, Move } from 'lucide-react'
import { soundManager } from '../lib/soundManager'
import { getStoredTheme } from '../lib/themeManager'

// --- Storage Helpers for Dark Mode Solar Speed ---
export const getStoredSpeed = () => {
  if (typeof window === 'undefined') return 1.5
  const saved = localStorage.getItem('fahrixz_solar_system_speed')
  if (saved) {
    const val = parseFloat(saved)
    if (!isNaN(val) && val >= 0.2 && val <= 5.0) return val
  }
  return 1.5
}

export const setStoredSpeed = (speed) => {
  if (typeof window === 'undefined') return
  localStorage.setItem('fahrixz_solar_system_speed', speed.toString())
  window.dispatchEvent(
    new CustomEvent('solar-system-speed-changed', { detail: { speed } })
  )
}

// --- Storage Helpers for Light Mode Atmosphere Settings ---
export const getStoredAtmosphere = () => {
  if (typeof window === 'undefined') {
    return { auroraSpeed: 35, cloudSpeed: 25, auroraIntensity: 35, parallaxIntensity: 30 }
  }
  const saved = localStorage.getItem('fahrixz_atmosphere_settings')
  if (saved) {
    try {
      const parsed = JSON.parse(saved)
      return {
        auroraSpeed: parsed.auroraSpeed ?? 35,
        cloudSpeed: parsed.cloudSpeed ?? 25,
        auroraIntensity: parsed.auroraIntensity ?? 35,
        parallaxIntensity: parsed.parallaxIntensity ?? 30,
      }
    } catch (e) {
      // fallback
    }
  }
  return { auroraSpeed: 35, cloudSpeed: 25, auroraIntensity: 35, parallaxIntensity: 30 }
}

export const setStoredAtmosphere = (settings) => {
  if (typeof window === 'undefined') return
  localStorage.setItem('fahrixz_atmosphere_settings', JSON.stringify(settings))
  window.dispatchEvent(
    new CustomEvent('atmosphere-settings-changed', { detail: settings })
  )
}

export default function SettingsModal({ isOpen, onClose }) {
  const [theme, setTheme] = useState(getStoredTheme())
  const [solarSpeed, setSolarSpeed] = useState(getStoredSpeed)
  const [atmoSettings, setAtmoSettings] = useState(getStoredAtmosphere)

  useEffect(() => {
    setSolarSpeed(getStoredSpeed())
    setAtmoSettings(getStoredAtmosphere())
    setTheme(getStoredTheme())

    const handleThemeChange = (e) => {
      if (e.detail?.theme) {
        setTheme(e.detail.theme)
      }
    }
    window.addEventListener('theme-changed', handleThemeChange)
    return () => window.removeEventListener('theme-changed', handleThemeChange)
  }, [isOpen])

  const isDark = theme === 'dark'

  // Dark Mode speed handler
  const handleSolarSpeedChange = (newSpeed) => {
    const rounded = Math.round(newSpeed * 10) / 10
    setSolarSpeed(rounded)
    setStoredSpeed(rounded)
  }

  // Light Mode atmosphere handler
  const handleAtmoChange = (key, val) => {
    const next = { ...atmoSettings, [key]: val }
    setAtmoSettings(next)
    setStoredAtmosphere(next)
  }

  const handleResetDefaults = () => {
    soundManager.play('click')
    if (isDark) {
      handleSolarSpeedChange(1.5)
    } else {
      const defaults = { auroraSpeed: 35, cloudSpeed: 25, auroraIntensity: 35, parallaxIntensity: 30 }
      setAtmoSettings(defaults)
      setStoredAtmosphere(defaults)
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 cursor-pointer"
          onClick={() => {
            soundManager.play('click')
            onClose()
          }}
        />

        {/* Floating Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className={`relative z-10 w-full max-w-md rounded-3xl p-6 border shadow-2xl backdrop-blur-2xl transition-colors duration-500 ${
            isDark
              ? 'bg-galaxy-card/90 border-white/15 text-galaxy-text shadow-cyan-500/10'
              : 'bg-white/85 border-sky-300/40 text-slate-800 shadow-sky-500/15'
          }`}
        >
          {/* Header with Title */}
          <div className={`flex items-center justify-between border-b pb-4 ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
            <div className="flex items-center gap-2.5">
              <div className={`w-9 h-9 rounded-xl border flex items-center justify-center ${
                isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-sky-100/80 border-sky-200 text-sky-600'
              }`}>
                <Sliders className="w-4 h-4 stroke-[1.75]" />
              </div>
              <div>
                <motion.h3
                  key={isDark ? 'dark-title' : 'light-title'}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.25 }}
                  className={`text-sm font-bold tracking-wide uppercase ${isDark ? 'text-white' : 'text-slate-900'}`}
                >
                  {isDark ? 'SOLAR CONTROL' : 'ATMOSPHERE CONTROL'}
                </motion.h3>
                <motion.p
                  key={isDark ? 'dark-sub' : 'light-sub'}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.25 }}
                  className={`text-[11px] ${isDark ? 'text-galaxy-text-muted' : 'text-slate-500'}`}
                >
                  {isDark ? 'Rotasi & Kecepatan Orbit Tata Surya' : 'Pergerakan Aurora & Awan Atmosfer'}
                </motion.p>
              </div>
            </div>

            <button
              onClick={() => {
                soundManager.play('click')
                onClose()
              }}
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                isDark
                  ? 'bg-white/5 border-white/10 hover:border-white/20 text-galaxy-text-muted hover:text-white'
                  : 'bg-slate-100 border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-800'
              }`}
              title="Tutup Panel"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Adaptive Body Content with Smooth Transition */}
          <AnimatePresence mode="wait">
            {isDark ? (
              /* 🌌 DARK THEME: SOLAR CONTROL CONTENT */
              <motion.div
                key="dark-solar-controls"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="py-4 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 text-white">
                    <Sparkles className="w-3.5 h-3.5 text-galaxy-primary" />
                    <span>Rotation Speed</span>
                  </span>
                  <span className="text-sm font-extrabold font-mono text-galaxy-primary bg-galaxy-primary/10 px-2.5 py-1 rounded-lg border border-galaxy-primary/30">
                    {solarSpeed.toFixed(1)}x
                  </span>
                </div>

                {/* Range Slider */}
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0.5"
                    max="3.0"
                    step="0.1"
                    value={solarSpeed}
                    onChange={(e) => handleSolarSpeedChange(parseFloat(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-galaxy-primary hover:bg-white/20 transition-all"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-galaxy-text-muted px-1">
                    <span>0.5x (Lambat)</span>
                    <span>1.5x (Default)</span>
                    <span>3.0x (Cepat)</span>
                  </div>
                </div>

                {/* Quick Speed Preset Buttons */}
                <div className="grid grid-cols-5 gap-1.5 pt-1">
                  {[0.5, 1.0, 1.5, 2.0, 3.0].map((preset) => (
                    <button
                      key={preset}
                      onClick={() => {
                        soundManager.play('pop')
                        handleSolarSpeedChange(preset)
                      }}
                      className={`py-1.5 rounded-xl text-xs font-bold font-mono transition-all border cursor-pointer ${
                        solarSpeed === preset
                          ? 'bg-galaxy-primary text-galaxy-bg border-galaxy-primary shadow-md shadow-galaxy-primary/20'
                          : 'bg-white/5 border-white/10 text-galaxy-text-muted hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {preset}x
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              /* ☀️ LIGHT THEME: ATMOSPHERE CONTROL CONTENT */
              <motion.div
                key="light-atmo-controls"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="py-4 space-y-4"
              >
                {/* 1. Aurora Speed */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-800">
                    <span className="flex items-center gap-1.5">
                      <Wind className="w-3.5 h-3.5 text-sky-500" />
                      <span>Aurora Speed</span>
                    </span>
                    <span className="font-mono text-sky-600 bg-sky-100 px-2 py-0.5 rounded font-bold">
                      {atmoSettings.auroraSpeed}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={atmoSettings.auroraSpeed}
                    onChange={(e) => handleAtmoChange('auroraSpeed', parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-500"
                  />
                </div>

                {/* 2. Cloud Speed */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-800">
                    <span className="flex items-center gap-1.5">
                      <Cloud className="w-3.5 h-3.5 text-sky-500" />
                      <span>Cloud Speed</span>
                    </span>
                    <span className="font-mono text-sky-600 bg-sky-100 px-2 py-0.5 rounded font-bold">
                      {atmoSettings.cloudSpeed}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={atmoSettings.cloudSpeed}
                    onChange={(e) => handleAtmoChange('cloudSpeed', parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-500"
                  />
                </div>

                {/* 3. Aurora Intensity */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-800">
                    <span className="flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-sky-500" />
                      <span>Aurora Intensity</span>
                    </span>
                    <span className="font-mono text-sky-600 bg-sky-100 px-2 py-0.5 rounded font-bold">
                      {atmoSettings.auroraIntensity}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={atmoSettings.auroraIntensity}
                    onChange={(e) => handleAtmoChange('auroraIntensity', parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-500"
                  />
                </div>

                {/* 4. Parallax Intensity */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-800">
                    <span className="flex items-center gap-1.5">
                      <Move className="w-3.5 h-3.5 text-sky-500" />
                      <span>Parallax</span>
                    </span>
                    <span className="font-mono text-sky-600 bg-sky-100 px-2 py-0.5 rounded font-bold">
                      {atmoSettings.parallaxIntensity}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={atmoSettings.parallaxIntensity}
                    onChange={(e) => handleAtmoChange('parallaxIntensity', parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-500"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer Actions */}
          <div className={`pt-3 border-t flex items-center justify-between gap-3 ${
            isDark ? 'border-white/10' : 'border-slate-200'
          }`}>
            <button
              onClick={handleResetDefaults}
              className={`px-3.5 py-2 rounded-2xl border text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                isDark
                  ? 'bg-white/5 border-white/10 hover:bg-white/10 text-galaxy-text-muted hover:text-white'
                  : 'bg-slate-100 border-slate-200 hover:bg-slate-200 text-slate-600 hover:text-slate-900'
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Default</span>
            </button>

            <button
              onClick={() => {
                soundManager.play('click')
                onClose()
              }}
              className={`px-5 py-2 rounded-2xl text-xs font-bold shadow-lg transition-all cursor-pointer ${
                isDark
                  ? 'bg-galaxy-primary hover:bg-cyan-400 text-galaxy-bg shadow-galaxy-primary/30'
                  : 'bg-sky-500 hover:bg-sky-600 text-white shadow-sky-500/25'
              }`}
            >
              Simpan
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
