import { createContext, useContext, useState, useEffect } from 'react'
import { data as defaultPortfolioData } from '../data/portfolioData'
import { articles as defaultArticles } from '../data/articlesData'
import { subscribeToPortfolioSettings, savePortfolioSettings } from '../lib/firebase'

export const DEFAULT_SOLAR_SYSTEM = {
  sunSize: 48,
  planetScale: 1.0,
  orbitSpeed: 1.0,
  orbitRadiusScale: 1.0,
  showEarthCityLights: true,
  showSaturnRings: true,
  showJupiterRedSpot: true,
  showOrbitRings: true,
  sunGlowColor: '#FDB813',
}

export const DEFAULT_THEME_SETTINGS = {
  accentColor: 'cyan', // 'cyan' | 'emerald' | 'purple' | 'amber' | 'rose'
  glowIntensity: 1.0,
  customBgImage: '',
  avatarUrl: '/profile.jpg',
}

export const DEFAULT_FAQ = [
  {
    q: 'Apakah Fahri Xz menerima jasa pembuatan website?',
    a: 'Ya, saya melayani pembuatan website portofolio, landing page, dan bisnis online responsif berbasis React dan Tailwind CSS.'
  },
  {
    q: 'Bagaimana cara memesan preset atau jasa video editing?',
    a: 'Anda dapat langsung menghubungi saya via WhatsApp di nomor resmi atau melalui tautan Instagram/CapCut.'
  },
  {
    q: 'Apakah FahriXz Store masih beroperasi?',
    a: 'FahriXz Store berjalan aktif sebagai bisnis online berbasis WhatsApp dari tahun 2022 hingga 2024 untuk layanan akun game dan desain logo.'
  }
]

export const DEFAULT_CHANGELOG = [
  {
    version: 'v2.5.0',
    date: 'Agustus 2026',
    title: 'Admin Panel Full Sync & Firebase Realtime',
    changes: ['Integrasi Admin Panel Lengkap', 'Manajemen Artikel, Social Media, Gallery & Sertifikat', 'Fitur Live Project Preview & Realtime Firestore']
  },
  {
    version: 'v2.0.0',
    date: 'Juli 2026',
    title: 'Futuristic Solar System 3D & AI Assistant',
    changes: ['Tata Surya Interaktif 3D dengan Planet Realistis', 'Integrasi AI Assistant Gemini 2.5', 'Command Palette & Visual Sound FX']
  }
]

export const DEFAULT_USES_STACK = [
  { name: 'CapCut Pro', category: 'Editing & Video', desc: 'Aplikasi utama pembuatan preset, beat sync, dan video pendek.' },
  { name: 'VS Code', category: 'Development', desc: 'Code editor favorit untuk React, Tailwind, dan TypeScript.' },
  { name: 'React + Vite', category: 'Web Tech', desc: 'Framework frontend modern berperforma tinggi.' },
  { name: 'Tailwind CSS', category: 'Styling', desc: 'Utility-first CSS framework untuk UI presisi.' },
  { name: 'Firebase Firestore', category: 'Database', desc: 'Database realtime cloud untuk menyimpan data website.' }
]

export const DEFAULT_JOURNEY = [
  { year: '2022', title: 'Awal Mulai Digital Creator & FahriXz Store', desc: 'Mulai mendalami video editing, desain logo, dan membuka bisnis online di WhatsApp.' },
  { year: '2023–2025', title: 'Pendidikan Bisnis Digital & Creator CapCut', desc: 'Pendidikan SMK Bisnis Digital, PKL di Top Mart & Larisso Stationery, serta aktif membuat preset CapCut viral.' },
  { year: '2026', title: 'Ekspedisi, Konsultan & Web Developer', desc: 'Pengalaman kerja di Shopee Xpress & BESTPROFIT FUTURES, serta mengembangkan website portofolio interaktif.' }
]

const PortfolioContext = createContext(null)

export function PortfolioProvider({ children }) {
  const [portfolioData, setPortfolioData] = useState(() => {
    // Check localStorage cache first for instant render
    const cached = localStorage.getItem('fahrixz_portfolio_settings_cache')
    if (cached) {
      try {
        const parsed = JSON.parse(cached)
        return {
          ...defaultPortfolioData,
          articles: defaultArticles,
          faq: DEFAULT_FAQ,
          changelog: DEFAULT_CHANGELOG,
          usesStack: DEFAULT_USES_STACK,
          developerJourney: DEFAULT_JOURNEY,
          solarSystem: DEFAULT_SOLAR_SYSTEM,
          themeSettings: DEFAULT_THEME_SETTINGS,
          ...parsed,
        }
      } catch (e) {
        console.warn('Failed to parse cached portfolio settings:', e)
      }
    }
    return {
      ...defaultPortfolioData,
      articles: defaultArticles,
      faq: DEFAULT_FAQ,
      changelog: DEFAULT_CHANGELOG,
      usesStack: DEFAULT_USES_STACK,
      developerJourney: DEFAULT_JOURNEY,
      solarSystem: DEFAULT_SOLAR_SYSTEM,
      themeSettings: DEFAULT_THEME_SETTINGS,
    }
  })

  const [isLoading, setIsLoading] = useState(true)

  // Subscribe to realtime Firestore changes
  useEffect(() => {
    const unsubscribe = subscribeToPortfolioSettings(
      (firestoreData) => {
        setIsLoading(false)
        if (firestoreData) {
          // Merge firestore data with defaults
          const merged = {
            ...defaultPortfolioData,
            articles: firestoreData.articles || defaultArticles,
            faq: firestoreData.faq || DEFAULT_FAQ,
            changelog: firestoreData.changelog || DEFAULT_CHANGELOG,
            usesStack: firestoreData.usesStack || DEFAULT_USES_STACK,
            developerJourney: firestoreData.developerJourney || DEFAULT_JOURNEY,
            ...firestoreData,
            personal: { ...defaultPortfolioData.personal, ...firestoreData.personal },
            hero: { ...defaultPortfolioData.hero, ...firestoreData.hero },
            about: { ...defaultPortfolioData.about, ...firestoreData.about },
            projects: firestoreData.projects || defaultPortfolioData.projects,
            services: firestoreData.services || defaultPortfolioData.services,
            skills: firestoreData.skills || defaultPortfolioData.skills,
            socialMedia: firestoreData.socialMedia || defaultPortfolioData.socialMedia,
            certificates: firestoreData.certificates || defaultPortfolioData.certificates,
            gallery: firestoreData.gallery || defaultPortfolioData.gallery,
            experiences: firestoreData.experiences || defaultPortfolioData.experiences,
            education: firestoreData.education || defaultPortfolioData.education,
            stats: firestoreData.stats || defaultPortfolioData.stats,
            solarSystem: { ...DEFAULT_SOLAR_SYSTEM, ...firestoreData.solarSystem },
            themeSettings: { ...DEFAULT_THEME_SETTINGS, ...firestoreData.themeSettings },
          }
          setPortfolioData(merged)
          localStorage.setItem('fahrixz_portfolio_settings_cache', JSON.stringify(merged))
        }
      },
      (err) => {
        console.warn('Firestore subscription fallback:', err)
        setIsLoading(false)
      }
    )

    return () => unsubscribe()
  }, [])

  // Function to save new settings to Firestore
  const updateSettings = async (newCompleteData) => {
    // Optimistic UI update
    setPortfolioData(newCompleteData)
    localStorage.setItem('fahrixz_portfolio_settings_cache', JSON.stringify(newCompleteData))

    const res = await savePortfolioSettings(newCompleteData)
    return res
  }

  // Function to reset all settings to initial defaults
  const resetToDefault = async () => {
    const defaultData = {
      ...defaultPortfolioData,
      articles: defaultArticles,
      faq: DEFAULT_FAQ,
      changelog: DEFAULT_CHANGELOG,
      usesStack: DEFAULT_USES_STACK,
      developerJourney: DEFAULT_JOURNEY,
      solarSystem: DEFAULT_SOLAR_SYSTEM,
      themeSettings: DEFAULT_THEME_SETTINGS,
    }
    setPortfolioData(defaultData)
    localStorage.setItem('fahrixz_portfolio_settings_cache', JSON.stringify(defaultData))
    const res = await savePortfolioSettings(defaultData)
    return res
  }

  return (
    <PortfolioContext.Provider
      value={{
        portfolioData,
        solarSystem: portfolioData.solarSystem || DEFAULT_SOLAR_SYSTEM,
        themeSettings: portfolioData.themeSettings || DEFAULT_THEME_SETTINGS,
        personal: portfolioData.personal || defaultPortfolioData.personal,
        hero: portfolioData.hero || defaultPortfolioData.hero,
        about: portfolioData.about || defaultPortfolioData.about,
        projects: portfolioData.projects || defaultPortfolioData.projects,
        services: portfolioData.services || defaultPortfolioData.services,
        skills: portfolioData.skills || defaultPortfolioData.skills,
        experiences: portfolioData.experiences || defaultPortfolioData.experiences,
        education: portfolioData.education || defaultPortfolioData.education,
        certificates: portfolioData.certificates || defaultPortfolioData.certificates,
        gallery: portfolioData.gallery || defaultPortfolioData.gallery,
        socialMedia: portfolioData.socialMedia || defaultPortfolioData.socialMedia,
        stats: portfolioData.stats || defaultPortfolioData.stats,
        articles: portfolioData.articles || defaultArticles,
        faq: portfolioData.faq || DEFAULT_FAQ,
        changelog: portfolioData.changelog || DEFAULT_CHANGELOG,
        usesStack: portfolioData.usesStack || DEFAULT_USES_STACK,
        developerJourney: portfolioData.developerJourney || DEFAULT_JOURNEY,
        updateSettings,
        resetToDefault,
        isLoading,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  )
}

export const usePortfolio = () => {
  const context = useContext(PortfolioContext)
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider')
  }
  return context
}

