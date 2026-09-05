import React, { createContext, useContext, useState, useEffect } from 'react'
import id from '../locales/id.json'
import en from '../locales/en.json'
import ja from '../locales/ja.json'
import zh from '../locales/zh.json'
import ko from '../locales/ko.json'
import es from '../locales/es.json'
import fr from '../locales/fr.json'

const translations = {
  id,
  en,
  ja,
  zh,
  ko,
  es,
  fr,
}

export const LANGUAGES = [
  { code: 'id', name: 'Bahasa Indonesia', short: 'ID', flag: '🇮🇩' },
  { code: 'en', name: 'English', short: 'EN', flag: '🇺🇸' },
  { code: 'ja', name: '日本語', short: 'JA', flag: '🇯🇵' },
  { code: 'zh', name: '中文', short: 'ZH', flag: '🇨🇳' },
  { code: 'ko', name: '한국어', short: 'KO', flag: '🇰🇷' },
  { code: 'es', name: 'Español', short: 'ES', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', short: 'FR', flag: '🇫🇷' },
]

const LanguageContext = createContext({
  lang: 'id',
  setLang: () => {},
  t: (key, fallback) => fallback || key,
  languages: LANGUAGES,
})

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try {
      const saved = localStorage.getItem('fantra_lang')
      if (saved && translations[saved]) return saved
    } catch {
      // fallback
    }
    return 'id'
  })

  const setLang = (newLang) => {
    if (translations[newLang]) {
      setLangState(newLang)
      try {
        localStorage.setItem('fantra_lang', newLang)
      } catch (err) {
        console.error('Failed to save language preference:', err)
      }
      document.documentElement.lang = newLang
    }
  }

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  // Key navigation helper e.g. t('hero.name')
  const t = (keyPath, fallback = '') => {
    const keys = keyPath.split('.')
    let current = translations[lang] || translations.id

    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key]
      } else {
        // Fallback to English, then Indonesian
        let fallbackVal = translations.en
        for (const fbKey of keys) {
          if (fallbackVal && typeof fallbackVal === 'object' && fbKey in fallbackVal) {
            fallbackVal = fallbackVal[fbKey]
          } else {
            fallbackVal = undefined
            break
          }
        }
        return fallbackVal !== undefined ? fallbackVal : (fallback || keyPath)
      }
    }
    return current !== undefined ? current : (fallback || keyPath)
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, languages: LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

export default LanguageContext
