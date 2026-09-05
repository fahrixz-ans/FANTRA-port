// Theme Manager for Dark Galaxy vs High-Contrast Light Mode
import { soundManager } from './soundManager'

const STORAGE_KEY = 'fahrixz_theme_preference'

export const getStoredTheme = () => {
  if (typeof window === 'undefined') return 'dark'
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return saved
    // Check system preference if not set
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  } catch (e) {
    return 'dark'
  }
}

export const applyTheme = (theme) => {
  if (typeof document === 'undefined') return
  const isLight = theme === 'light'
  
  if (isLight) {
    document.documentElement.classList.add('light-mode')
    document.documentElement.setAttribute('data-theme', 'light')
  } else {
    document.documentElement.classList.remove('light-mode')
    document.documentElement.setAttribute('data-theme', 'dark')
  }

  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch (e) {
    // Ignore storage errors
  }

  // Notify listeners
  window.dispatchEvent(new CustomEvent('theme-changed', { detail: { theme } }))
}

export const toggleTheme = () => {
  const current = getStoredTheme()
  const nextTheme = current === 'light' ? 'dark' : 'light'
  soundManager.play('theme-toggle')
  applyTheme(nextTheme)
  return nextTheme
}

// Initial theme application on module load
if (typeof window !== 'undefined') {
  applyTheme(getStoredTheme())
}
