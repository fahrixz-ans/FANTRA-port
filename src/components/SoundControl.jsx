import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { soundManager } from '../lib/soundManager'

export default function SoundControl({ compact = false }) {
  const [state, setState] = useState(soundManager.getSoundState())
  const [popoverOpen, setPopoverOpen] = useState(false)

  useEffect(() => {
    const unsubscribe = soundManager.subscribe((newState) => {
      setState(newState)
    })
    return () => unsubscribe()
  }, [])

  const toggleSound = (e) => {
    e.stopPropagation()
    const nextState = soundManager.toggleSound()
    if (nextState) {
      soundManager.play('nav-click')
    }
  }

  const handleVolumeChange = (e) => {
    const vol = parseFloat(e.target.value)
    soundManager.setVolume(vol)
  }

  const testSound = (name) => {
    soundManager.play(name)
  }

  return (
    <div className="relative inline-block">
      {/* Sound Toggle Trigger Button */}
      <div className="flex items-center gap-1">
        <button
          onClick={toggleSound}
          onMouseEnter={() => soundManager.play('hover')}
          className={`flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-full transition-all duration-200 border ${
            state.isEnabled
              ? 'bg-galaxy-primary/10 text-galaxy-primary border-galaxy-primary/30 hover:bg-galaxy-primary/20 shadow-sm'
              : 'bg-galaxy-card-alt text-galaxy-muted border-white/10 hover:text-galaxy-text'
          }`}
          title={state.isEnabled ? 'Matikan SFX Audio (UI Sound)' : 'Aktifkan SFX Audio (UI Sound)'}
        >
          <span className="text-sm leading-none">{state.isEnabled ? '🔊' : '🔇'}</span>

          {!compact && (
            <span className="font-mono text-[10px] font-bold tracking-wider hidden sm:inline-block">
              {state.isEnabled ? 'SFX ON' : 'SFX OFF'}
            </span>
          )}

          {/* Equalizer Visualizer Bars */}
          {state.isEnabled && (
            <div className="flex items-center gap-0.5 h-3 ml-0.5">
              <span
                className={`w-0.5 bg-galaxy-primary rounded-full transition-all duration-150 ${
                  state.isPlaying ? 'h-3 animate-pulse' : 'h-1.5 opacity-60'
                }`}
              />
              <span
                className={`w-0.5 bg-galaxy-primary rounded-full transition-all duration-150 ${
                  state.isPlaying ? 'h-2.5 animate-pulse delay-75' : 'h-2 opacity-60'
                }`}
              />
              <span
                className={`w-0.5 bg-galaxy-primary rounded-full transition-all duration-150 ${
                  state.isPlaying ? 'h-3.5 animate-pulse delay-100' : 'h-1 opacity-60'
                }`}
              />
            </div>
          )}
        </button>

        {/* Settings Gear Popover Trigger */}
        <button
          onClick={() => {
            setPopoverOpen(!popoverOpen)
            soundManager.play('click')
          }}
          onMouseEnter={() => soundManager.play('hover')}
          className="p-1.5 rounded-full text-galaxy-muted hover:text-galaxy-primary hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"
          title="Pengaturan SFX Audio"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        </button>
      </div>

      {/* Popover Controls Menu */}
      <AnimatePresence>
        {popoverOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setPopoverOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 8 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-full mt-2 z-50 w-64 p-4 rounded-2xl bg-galaxy-card/95 backdrop-blur-2xl border border-white/10 shadow-2xl text-galaxy-text"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm">🔊</span>
                  <span className="text-xs font-mono font-bold tracking-wide uppercase">
                    UI Sound System
                  </span>
                </div>
                <button
                  onClick={toggleSound}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold transition-colors ${
                    state.isEnabled
                      ? 'bg-galaxy-primary/20 text-galaxy-primary border border-galaxy-primary/40'
                      : 'bg-white/5 text-galaxy-muted border border-white/10'
                  }`}
                >
                  {state.isEnabled ? 'ENABLED' : 'MUTED'}
                </button>
              </div>

              {/* Volume Slider */}
              <div className="space-y-1.5 mb-4">
                <div className="flex justify-between text-[11px] font-mono text-galaxy-muted">
                  <span>Volume Audio</span>
                  <span>{Math.round(state.masterVolume * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="0.5"
                  step="0.01"
                  value={state.masterVolume}
                  onChange={handleVolumeChange}
                  disabled={!state.isEnabled}
                  className="w-full accent-galaxy-primary bg-galaxy-card-alt h-1.5 rounded-lg appearance-none cursor-pointer disabled:opacity-40"
                />
              </div>

              {/* Test Sound Quick Presets */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono text-galaxy-muted uppercase tracking-wider block">
                  Uji Suara SFX
                </span>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    onClick={() => testSound('click')}
                    disabled={!state.isEnabled}
                    className="px-2 py-1 bg-galaxy-card-alt hover:bg-galaxy-primary/20 text-[10px] font-mono text-galaxy-muted hover:text-galaxy-primary rounded border border-white/5 transition-all text-center disabled:opacity-30"
                  >
                    Click
                  </button>
                  <button
                    onClick={() => testSound('project-open')}
                    disabled={!state.isEnabled}
                    className="px-2 py-1 bg-galaxy-card-alt hover:bg-galaxy-primary/20 text-[10px] font-mono text-galaxy-muted hover:text-galaxy-primary rounded border border-white/5 transition-all text-center disabled:opacity-30"
                  >
                    Project
                  </button>
                  <button
                    onClick={() => testSound('success')}
                    disabled={!state.isEnabled}
                    className="px-2 py-1 bg-galaxy-card-alt hover:bg-galaxy-primary/20 text-[10px] font-mono text-galaxy-muted hover:text-galaxy-primary rounded border border-white/5 transition-all text-center disabled:opacity-30"
                  >
                    Success
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
