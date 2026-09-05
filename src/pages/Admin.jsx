import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LogIn,
  LogOut,
  Save,
  User,
  Sun,
  Palette,
  Briefcase,
  Layers,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Plus,
  Trash2,
  RotateCcw,
  Globe,
  Settings,
  ShieldCheck,
  Code,
  FileText,
  Image as ImageIcon,
  MessageSquare,
  HelpCircle,
  Activity,
  Compass,
  Wrench,
  Award,
  Camera,
  RefreshCw,
  Mail,
  Edit3,
  List,
  Check,
  Clock,
  ChevronRight,
  Menu,
  X,
  Search,
  Sliders,
  Terminal,
  Cpu,
  LayoutDashboard
} from 'lucide-react'
import {
  loginWithGoogle,
  logoutAdmin,
  subscribeToAuth,
  subscribeToGuestbook,
  deleteGuestbookMessage
} from '../lib/firebase'
import { usePortfolio, DEFAULT_SOLAR_SYSTEM, DEFAULT_THEME_SETTINGS } from '../context/PortfolioContext'
import SolarSystem from '../components/solar-system/SolarSystem'

export default function Admin() {
  const { portfolioData, updateSettings, resetToDefault } = usePortfolio()

  // Auth State
  const [user, setUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [authError, setAuthError] = useState('')

  // HashRouter / Tab Sync
  const validModuleIds = [
    'dashboard', 'profile', 'hero', 'about', 'images', 'gallery', 'certificates',
    'projects', 'skills', 'services', 'articles', 'experience', 'journey', 'faq',
    'uses_changelog', 'social', 'guestbook', 'solarsystem', 'analytics'
  ]

  const parseHashModule = () => {
    const hash = window.location.hash.replace('#/', '').replace('#', '').trim()
    if (!hash || hash === 'admin' || !validModuleIds.includes(hash)) {
      return 'dashboard'
    }
    return hash
  }

  const [activeModule, setActiveModule] = useState(parseHashModule)

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [formData, setFormData] = useState(portfolioData)
  const [guestbookMessages, setGuestbookMessages] = useState([])
  const [isSaving, setIsSaving] = useState(false)
  const [saveToast, setSaveToast] = useState({ show: false, message: '', type: 'success' })
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // Sub-entity Form States
  // 1. Project Form
  const [editingProjectIndex, setEditingProjectIndex] = useState(null)
  const [projectForm, setProjectForm] = useState({
    nama: '',
    deskripsi: '',
    category: 'Web Development',
    tech: '',
    liveDemo: '',
    githubUrl: '',
    thumbnail: '/proyek-1.jpg',
    year: '2026',
    status: 'Featured Project',
    featured: true
  })

  // 2. Skill Form
  const [editingSkillIndex, setEditingSkillIndex] = useState(null)
  const [skillForm, setSkillForm] = useState({
    category: 'Creative',
    nama: '',
    level: 85,
    icon: '⚡',
    deskripsi: ''
  })

  // 3. Service Form
  const [editingServiceIndex, setEditingServiceIndex] = useState(null)
  const [serviceForm, setServiceForm] = useState({
    title: '',
    icon: '🚀',
    desc: ''
  })

  // 4. Article Form
  const [editingArticleIndex, setEditingArticleIndex] = useState(null)
  const [articleForm, setArticleForm] = useState({
    title: '',
    slug: '',
    category: 'Content Creation',
    excerpt: '',
    content: '',
    date: 'Agustus 2026',
    readTime: '5 min baca',
    featuredImage: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1200&auto=format&fit=crop',
    tags: 'CapCut, Video Editing, Creative'
  })

  // 5. Experience Form
  const [editingExpIndex, setEditingExpIndex] = useState(null)
  const [expForm, setExpForm] = useState({
    company: '',
    role: '',
    period: '',
    category: 'Pengalaman Kerja',
    type: 'Pekerjaan',
    desc: '',
    activities: ''
  })

  // 6. Certificate Form
  const [certForm, setCertForm] = useState('')

  // 7. Gallery Form
  const [galleryForm, setGalleryForm] = useState({
    path: '/gallery-1.jpg',
    title: '',
    category: 'Editing'
  })

  // 8. FAQ Form
  const [faqForm, setFaqForm] = useState({ q: '', a: '' })

  // 9. Journey Form
  const [journeyForm, setJourneyForm] = useState({ year: '2026', title: '', desc: '' })

  // 10. Uses Stack Form
  const [usesForm, setUsesForm] = useState({ name: '', category: 'Development', desc: '' })

  // 11. Changelog Form
  const [changelogForm, setChangelogForm] = useState({ version: 'v2.6.0', date: 'Agustus 2026', title: '', changes: '' })

  // Sync formData when portfolioData changes
  useEffect(() => {
    setFormData(portfolioData)
  }, [portfolioData])

  // Sync HashRouter hash with active module
  useEffect(() => {
    const handleHashChange = () => {
      setActiveModule(parseHashModule())
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const navigateModule = (modId) => {
    setActiveModule(modId)
    window.location.hash = `#/${modId}`
    setSidebarOpen(false)
  }

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsubscribe = subscribeToAuth((currentUser) => {
      setUser(currentUser)
      setAuthLoading(false)
    })
    return () => unsubscribe()
  }, [])

  // Listen to Guestbook Messages
  useEffect(() => {
    if (user) {
      const unsubGb = subscribeToGuestbook((messages) => {
        setGuestbookMessages(messages)
      })
      return () => unsubGb()
    }
  }, [user])

  // Handle Google Login
  const handleGoogleLogin = async () => {
    setAuthLoading(true)
    setAuthError('')
    const { user: loggedUser, error } = await loginWithGoogle()
    if (error) {
      setAuthError(error)
    } else {
      setUser(loggedUser)
    }
    setAuthLoading(false)
  }

  // Handle Logout
  const handleLogout = async () => {
    await logoutAdmin()
    setUser(null)
  }

  // Helper for updating nested formData state
  const handleNestedChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }))
  }

  // Handle Save All Settings
  const handleSaveAll = async () => {
    setIsSaving(true)
    setSaveToast({ show: false, message: '', type: 'success' })

    const res = await updateSettings(formData)
    setIsSaving(false)

    if (res.success) {
      setSaveToast({
        show: true,
        message: '✅ Semua data portofolio berhasil disimpan ke Firestore secara realtime!',
        type: 'success'
      })
      setTimeout(() => setSaveToast({ show: false, message: '', type: 'success' }), 4000)
    } else {
      setSaveToast({
        show: true,
        message: `❌ Gagal menyimpan: ${res.error}`,
        type: 'error'
      })
    }
  }

  // Reset to Default
  const handleResetConfirm = async () => {
    setIsSaving(true)
    setShowResetConfirm(false)
    const res = await resetToDefault()
    setIsSaving(false)
    if (res.success) {
      setSaveToast({
        show: true,
        message: '🔄 Semua data berhasil direset ke pengaturan standar bawaan.',
        type: 'success'
      })
      setTimeout(() => setSaveToast({ show: false, message: '', type: 'success' }), 4000)
    }
  }

  // Loading indicator for Auth check
  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4 font-sans">
        <div className="w-12 h-12 rounded-full border-4 border-cyan-500/30 border-t-cyan-400 animate-spin mb-4" />
        <p className="text-slate-400 font-mono text-sm">Memeriksa Sesi Administrator...</p>
      </div>
    )
  }

  // LOGIN SCREEN (If not authenticated)
  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="relative z-10 w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-2xl p-8 shadow-2xl backdrop-blur-xl text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(6,182,212,0.4)]">
            <ShieldCheck className="w-9 h-9 text-white" />
          </div>

          <h1 className="text-2xl font-bold font-mono tracking-tight text-white mb-2">
            Admin Suite Portofolio
          </h1>
          <p className="text-slate-400 text-sm mb-6">
            Masuk dengan Akun Google Administrator untuk mengelola konten, media sosial, artikel, tata surya, dan riwayat pekerjaan secara penuh.
          </p>

          {authError && (
            <div className="mb-4 p-3 rounded-lg bg-red-950/80 border border-red-800 text-red-300 text-xs text-left flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{authError}</span>
            </div>
          )}

          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 py-3.5 px-4 rounded-xl bg-white text-slate-900 font-semibold text-sm hover:bg-slate-100 transition-all shadow-lg active:scale-95 cursor-pointer"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span>Masuk dengan Google</span>
          </button>

          <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span>Fahri Xz System v2.5</span>
            <a href="/" className="text-cyan-400 hover:underline flex items-center gap-1">
              Ke Website <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </motion.div>
      </div>
    )
  }

  // Sidebar Menu Categories Definitions
  const menuCategories = [
    {
      group: 'Overview & Ringkasan',
      items: [
        { id: 'dashboard', label: 'Dashboard Overview', icon: LayoutDashboard }
      ]
    },
    {
      group: 'Brand & Teks Utama',
      items: [
        { id: 'profile', label: 'Profil & Identitas Diri', icon: User },
        { id: 'hero', label: 'Hero Display & Teks', icon: Sparkles },
        { id: 'about', label: 'Bio Paragraf & Counter', icon: Compass }
      ]
    },
    {
      group: 'Media & Galeri',
      items: [
        { id: 'images', label: 'Avatar & Custom Background', icon: ImageIcon },
        { id: 'gallery', label: 'Dokumentasi Kegiatan', icon: Camera },
        { id: 'certificates', label: 'Sertifikat & Lisensi', icon: Award }
      ]
    },
    {
      group: 'Konten & Karya',
      items: [
        { id: 'projects', label: 'Kelola Project Portofolio', icon: Briefcase },
        { id: 'skills', label: 'Keahlian, Level & Stack', icon: Layers },
        { id: 'services', label: 'Layanan & Penawaran Jasa', icon: Wrench },
        { id: 'articles', label: 'Artikel & Wawasan Blog', icon: FileText }
      ]
    },
    {
      group: 'Karir & Catatan',
      items: [
        { id: 'experience', label: 'Karir, Pendidikan & PKL', icon: Clock },
        { id: 'journey', label: 'Developer Journey Timeline', icon: Terminal },
        { id: 'faq', label: 'Pertanyaan Umum (FAQ)', icon: HelpCircle },
        { id: 'uses_changelog', label: 'Uses Gear & Changelog', icon: Cpu }
      ]
    },
    {
      group: 'Kontak & Interaksi',
      items: [
        { id: 'social', label: 'Sosial Media & Kontak', icon: Globe },
        { id: 'guestbook', label: 'Pesan Masuk / Buku Tamu', icon: MessageSquare, badge: guestbookMessages.length }
      ]
    },
    {
      group: 'Sistem & Visual 3D',
      items: [
        { id: 'solarsystem', label: 'Visual Tata Surya 3D', icon: Sun },
        { id: 'analytics', label: 'Status & Reset System', icon: Activity }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col md:flex-row pb-28 md:pb-0">
      {/* Mobile Top Navigation */}
      <div className="md:hidden sticky top-0 z-50 bg-slate-900 border-b border-slate-800 p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg bg-slate-800 text-cyan-400 border border-slate-700"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <span className="font-bold font-mono text-sm text-cyan-300">Admin Dashboard</span>
        </div>

        <button
          onClick={handleSaveAll}
          disabled={isSaving}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-400 text-slate-950 font-bold text-xs"
        >
          <Save className="w-3.5 h-3.5" />
          <span>Simpan</span>
        </button>
      </div>

      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="md:hidden fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm"
        />
      )}

      {/* LEFT SIDEBAR NAVIGATION */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-40 h-screen w-72 bg-slate-900/95 border-r border-slate-800 p-4 flex flex-col justify-between backdrop-blur-xl transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="space-y-6 overflow-y-auto pr-1">
          {/* Header Identity */}
          <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="truncate">
              <h2 className="text-sm font-bold text-white font-mono truncate">Admin Suite</h2>
              <p className="text-[10px] text-cyan-400 font-mono">Fahri Xz v2.5 Realtime</p>
            </div>
          </div>

          {/* Quick Search Module */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Cari modul pengelola..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-200 outline-none focus:border-cyan-500"
            />
          </div>

          {/* Navigation Groups */}
          <nav className="space-y-5">
            {menuCategories.map((cat, cidx) => {
              const filteredItems = cat.items.filter((item) =>
                item.label.toLowerCase().includes(searchQuery.toLowerCase())
              )
              if (filteredItems.length === 0) return null

              return (
                <div key={cidx} className="space-y-1.5">
                  <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 px-2">
                    {cat.group}
                  </p>
                  {filteredItems.map((item) => {
                    const Icon = item.icon
                    const isActive = activeModule === item.id

                    return (
                      <button
                        key={item.id}
                        onClick={() => navigateModule(item.id)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                          isActive
                            ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                            : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200 border border-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                          <span className="truncate">{item.label}</span>
                        </div>
                        {item.badge !== undefined && item.badge > 0 && (
                          <span className="px-1.5 py-0.5 text-[9px] font-bold rounded-full bg-cyan-500 text-slate-950">
                            {item.badge}
                          </span>
                        )}
                      </button>
                    )
                  })}
                </div>
              )
            })}
          </nav>
        </div>

        {/* User Profile & Website Link at Bottom */}
        <div className="pt-4 border-t border-slate-800 space-y-3 shrink-0">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-xs font-mono text-slate-300 border border-slate-700 transition-colors"
          >
            <span className="flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-cyan-400" /> Ke Website Utama
            </span>
            <ExternalLink className="w-3 h-3 text-slate-500" />
          </a>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2 truncate">
              {user.photoURL ? (
                <img src={user.photoURL} alt={user.displayName} className="w-7 h-7 rounded-full border border-cyan-500/50 shrink-0" />
              ) : (
                <div className="w-7 h-7 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-400 flex items-center justify-center text-xs font-bold shrink-0">
                  A
                </div>
              )}
              <div className="truncate text-left">
                <p className="text-xs font-bold text-slate-200 truncate">{user.displayName || 'Admin'}</p>
                <p className="text-[9px] text-slate-500 truncate">{user.email}</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="p-1.5 rounded-lg bg-red-950/60 hover:bg-red-900 text-red-400 border border-red-800/60 transition-colors cursor-pointer"
              title="Keluar"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* RIGHT MAIN CONTENT AREA */}
      <main className="flex-1 p-4 md:p-8 max-w-6xl mx-auto space-y-6">
        {/* Module Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-semibold">
              Admin Module Control
            </span>
            <h1 className="text-xl font-bold font-mono text-white flex items-center gap-2">
              {activeModule === 'dashboard' && 'Dashboard Overview & Monitoring'}
              {activeModule === 'profile' && 'Identitas & Profil Bisnis'}
              {activeModule === 'hero' && 'Hero Section & Teks Utama'}
              {activeModule === 'about' && 'Bio Paragraf & Stat Counters'}
              {activeModule === 'images' && 'Gambar, Avatar & Custom Background'}
              {activeModule === 'gallery' && 'Dokumentasi Kegiatan & Foto Galeri'}
              {activeModule === 'certificates' && 'Dokumentasi Sertifikat & Lisensi'}
              {activeModule === 'projects' && 'Kelola Project Portofolio'}
              {activeModule === 'skills' && 'Keahlian, Skill Level & Tech Radar'}
              {activeModule === 'services' && 'Layanan & Penawaran Jasa'}
              {activeModule === 'articles' && 'CRUD Artikel & Wawasan Blog'}
              {activeModule === 'experience' && 'Riwayat Pekerjaan, Pendidikan & PKL'}
              {activeModule === 'journey' && 'Developer Journey & Timeline'}
              {activeModule === 'faq' && 'Pertanyaan Umum (FAQ)'}
              {activeModule === 'uses_changelog' && 'Uses Stack Gear & Website Changelog'}
              {activeModule === 'social' && 'Media Sosial & Kontak Resmi'}
              {activeModule === 'guestbook' && 'Buku Tamu / Pesan Masuk'}
              {activeModule === 'solarsystem' && 'Tata Surya 3D Interaktif'}
              {activeModule === 'analytics' && 'Status System & Reset Firestore'}
            </h1>
          </div>

          <button
            onClick={handleSaveAll}
            disabled={isSaving}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold font-mono text-xs shadow-lg transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            {isSaving ? (
              <>
                <div className="w-4 h-4 rounded-full border-2 border-slate-950 border-t-transparent animate-spin" />
                <span>Menyimpan...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Simpan Perubahan</span>
              </>
            )}
          </button>
        </div>

        {/* MODULE 0: DASHBOARD OVERVIEW */}
        {activeModule === 'dashboard' && (
          <div className="space-y-6">
            {/* Welcome & Status Banner */}
            <div className="bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-950/90 border border-slate-800/80 rounded-2xl p-6 shadow-xl relative overflow-hidden backdrop-blur-md">
              <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      Realtime Firestore Active
                    </span>
                    <span className="text-[11px] font-mono text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-full border border-slate-700">
                      v2.5.0 Production
                    </span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold font-mono text-white">
                    Selamat Datang, {formData.personal?.namaLengkap || 'Administrator'}!
                  </h2>
                  <p className="text-xs md:text-sm text-slate-300 max-w-2xl">
                    Kelola seluruh informasi profil, proyek, keahlian, artikel blog, media sosial, sertifikat, hingga konfigurasi Tata Surya 3D secara penuh dengan sinkronisasi realtime.
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={() => navigateModule('profile')}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs border border-slate-700 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <User className="w-4 h-4 text-cyan-400" />
                    <span>Edit Profil</span>
                  </button>
                  <button
                    onClick={handleSaveAll}
                    disabled={isSaving}
                    className="px-4 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold font-mono text-xs shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Simpan Semua</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Metrics Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
              <div
                onClick={() => navigateModule('projects')}
                className="bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800 hover:border-cyan-500/40 p-4 rounded-2xl transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold">Proyek</span>
                  <Briefcase className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                </div>
                <p className="text-2xl font-bold font-mono text-white">{formData.projects?.length || 0}</p>
                <span className="text-[10px] text-cyan-400 flex items-center gap-1 mt-1 font-mono">
                  Kelola Proyek <ChevronRight className="w-3 h-3" />
                </span>
              </div>

              <div
                onClick={() => navigateModule('skills')}
                className="bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800 hover:border-purple-500/40 p-4 rounded-2xl transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold">Keahlian</span>
                  <Layers className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
                </div>
                <p className="text-2xl font-bold font-mono text-white">{formData.skills?.length || 0}</p>
                <span className="text-[10px] text-purple-400 flex items-center gap-1 mt-1 font-mono">
                  Skill Tech Stack <ChevronRight className="w-3 h-3" />
                </span>
              </div>

              <div
                onClick={() => navigateModule('articles')}
                className="bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800 hover:border-emerald-500/40 p-4 rounded-2xl transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold">Artikel</span>
                  <FileText className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                </div>
                <p className="text-2xl font-bold font-mono text-white">{formData.articles?.length || 0}</p>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1 mt-1 font-mono">
                  Kelola Blog <ChevronRight className="w-3 h-3" />
                </span>
              </div>

              <div
                onClick={() => navigateModule('services')}
                className="bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800 hover:border-amber-500/40 p-4 rounded-2xl transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold">Layanan</span>
                  <Wrench className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                </div>
                <p className="text-2xl font-bold font-mono text-white">{formData.services?.length || 0}</p>
                <span className="text-[10px] text-amber-400 flex items-center gap-1 mt-1 font-mono">
                  Penawaran Jasa <ChevronRight className="w-3 h-3" />
                </span>
              </div>

              <div
                onClick={() => navigateModule('certificates')}
                className="bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800 hover:border-blue-500/40 p-4 rounded-2xl transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold">Sertifikat</span>
                  <Award className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                </div>
                <p className="text-2xl font-bold font-mono text-white">{formData.certificates?.length || 0}</p>
                <span className="text-[10px] text-blue-400 flex items-center gap-1 mt-1 font-mono">
                  Sertifikat & Lisensi <ChevronRight className="w-3 h-3" />
                </span>
              </div>

              <div
                onClick={() => navigateModule('guestbook')}
                className="bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800 hover:border-rose-500/40 p-4 rounded-2xl transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold">Buku Tamu</span>
                  <MessageSquare className="w-4 h-4 text-rose-400 group-hover:scale-110 transition-transform" />
                </div>
                <p className="text-2xl font-bold font-mono text-white">{guestbookMessages.length}</p>
                <span className="text-[10px] text-rose-400 flex items-center gap-1 mt-1 font-mono">
                  Pesan Masuk <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>

            {/* Sub-module Grid Management */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold font-mono text-slate-200 flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-cyan-400" /> Modul Pengelolaan Utama
                </h3>
                <span className="text-xs text-slate-400 font-mono">Pilih modul untuk mengedit isi website</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { id: 'profile', title: 'Profil & Identitas Diri', desc: 'Nama lengkap, peran/tagline, lokasi, status Hireable, dan link CV', icon: User, color: 'text-cyan-400', border: 'hover:border-cyan-500/50' },
                  { id: 'hero', title: 'Hero Section & Teks Utama', desc: 'Atur salam pembuka, sub-salam, ringkasan hero, dan tombol CTA', icon: Sparkles, color: 'text-yellow-400', border: 'hover:border-yellow-500/50' },
                  { id: 'about', title: 'Bio Paragraf & Counter', desc: 'Teks paragraf biografi tentang saya dan ringkasan statistik angka', icon: Compass, color: 'text-emerald-400', border: 'hover:border-emerald-500/50' },
                  { id: 'images', title: 'Avatar & Custom Background', desc: 'URL foto avatar profil utama dan gambar latar belakang kustom', icon: ImageIcon, color: 'text-purple-400', border: 'hover:border-purple-500/50' },
                  { id: 'projects', title: 'Kelola Project Portofolio', desc: 'Tambah, edit, hapus karya proyek, tech stack, thumbnail, dan link demo', icon: Briefcase, color: 'text-blue-400', border: 'hover:border-blue-500/50' },
                  { id: 'skills', title: 'Keahlian, Level & Stack', desc: 'Tingkat penguasaan keahlian (%), kategori, dan radar teknologi', icon: Layers, color: 'text-indigo-400', border: 'hover:border-indigo-500/50' },
                  { id: 'services', title: 'Layanan & Penawaran Jasa', desc: 'Judul layanan, emoji ikon, dan rincian penawaran jasa', icon: Wrench, color: 'text-amber-400', border: 'hover:border-amber-500/50' },
                  { id: 'articles', title: 'CRUD Artikel & Blog', desc: 'Penulisan artikel blog Markdown, slug, kategori, dan estimasi baca', icon: FileText, color: 'text-teal-400', border: 'hover:border-teal-500/50' },
                  { id: 'experience', title: 'Riwayat Pekerjaan & PKL', icon: Clock, desc: 'Pengalaman kerja/PKL, nama instansi, periode, dan aktivitas', color: 'text-sky-400', border: 'hover:border-sky-500/50' },
                  { id: 'certificates', title: 'Sertifikat & Lisensi', icon: Award, desc: 'Daftar sertifikat keahlian, gambar lisensi, dan pencapaian', color: 'text-violet-400', border: 'hover:border-violet-500/50' },
                  { id: 'gallery', title: 'Dokumentasi Kegiatan', icon: Camera, desc: 'Galeri foto dokumentasi acara, proses kerja, dan kegiatan', color: 'text-rose-400', border: 'hover:border-rose-500/50' },
                  { id: 'social', title: 'Media Sosial & Kontak', icon: Globe, desc: 'Link resmi WhatsApp, TikTok, CapCut Creator, IG, GitHub, Email', color: 'text-green-400', border: 'hover:border-green-500/50' },
                  { id: 'solarsystem', title: 'Visual Tata Surya 3D', icon: Sun, desc: 'Ukuran matahari, skala planet, kecepatan orbit, dan efek visual 3D', color: 'text-orange-400', border: 'hover:border-orange-500/50' },
                  { id: 'guestbook', title: 'Pesan Masuk Buku Tamu', icon: MessageSquare, desc: 'Kelola dan moderasi pesan apresiasi dari pengunjung website', color: 'text-pink-400', border: 'hover:border-pink-500/50' },
                  { id: 'analytics', title: 'Status System & Reset', icon: Activity, desc: 'Pantau status Firestore database dan opsi reset data ke default', color: 'text-red-400', border: 'hover:border-red-500/50' }
                ].map((mod) => {
                  const IconComp = mod.icon
                  return (
                    <div
                      key={mod.id}
                      onClick={() => navigateModule(mod.id)}
                      className={`bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 ${mod.border} p-5 rounded-2xl transition-all cursor-pointer flex flex-col justify-between space-y-3 group backdrop-blur-sm`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <div className={`p-2.5 rounded-xl bg-slate-950 border border-slate-800 ${mod.color} group-hover:scale-110 transition-transform`}>
                            <IconComp className="w-5 h-5" />
                          </div>
                          <h4 className="text-xs font-bold font-mono text-white group-hover:text-cyan-300 transition-colors">
                            {mod.title}
                          </h4>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-relaxed">
                          {mod.desc}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] font-mono font-bold text-slate-400 group-hover:text-cyan-400">
                        <span>Kelola Modul</span>
                        <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Latest Guestbook Messages Preview */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold font-mono text-white flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-rose-400" /> Pesan Masuk Terbaru ({guestbookMessages.length})
                </h3>
                <button
                  onClick={() => navigateModule('guestbook')}
                  className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  Lihat Semua Pesan <ChevronRight className="w-3 h-3" />
                </button>
              </div>

              {guestbookMessages.length === 0 ? (
                <div className="p-6 text-center text-slate-500 font-mono text-xs bg-slate-950 rounded-xl border border-slate-800">
                  Belum ada pesan masuk di buku tamu.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {guestbookMessages.slice(0, 4).map((msg) => (
                    <div key={msg.id} className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-cyan-300 font-mono">{msg.nama || 'Pengunjung'}</span>
                        <span className="text-[9px] text-slate-500 font-mono">{msg.dateStr || ''}</span>
                      </div>
                      <p className="text-xs text-slate-300 line-clamp-2">{msg.pesan}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* MODULE 1: PROFIL & IDENTITAS */}
        {activeModule === 'profile' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h2 className="text-sm font-bold font-mono text-cyan-400 flex items-center gap-2">
                <User className="w-4 h-4" /> Identitas Diri & Brand Bisnis
              </h2>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  value={formData.personal?.namaLengkap || ''}
                  onChange={(e) => handleNestedChange('personal', 'namaLengkap', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:border-cyan-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Nama Panggilan</label>
                <input
                  type="text"
                  value={formData.personal?.namaPanggilan || ''}
                  onChange={(e) => handleNestedChange('personal', 'namaPanggilan', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:border-cyan-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Nama Publik / Brand</label>
                <input
                  type="text"
                  value={formData.personal?.namaPublik || ''}
                  onChange={(e) => handleNestedChange('personal', 'namaPublik', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:border-cyan-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Nama Bisnis (FahriXz Store)</label>
                <input
                  type="text"
                  value={formData.personal?.namaBisnis || ''}
                  onChange={(e) => handleNestedChange('personal', 'namaBisnis', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:border-cyan-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Jenis Bisnis</label>
                <input
                  type="text"
                  value={formData.personal?.jenisBisnis || ''}
                  onChange={(e) => handleNestedChange('personal', 'jenisBisnis', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:border-cyan-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Pendidikan Terakhir</label>
                <input
                  type="text"
                  value={formData.personal?.pendidikanTerakhir || ''}
                  onChange={(e) => handleNestedChange('personal', 'pendidikanTerakhir', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:border-cyan-500 outline-none"
                />
              </div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h2 className="text-sm font-bold font-mono text-cyan-400 flex items-center gap-2">
                <Globe className="w-4 h-4" /> Domisili & Kontak Utama
              </h2>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Domisili Lengkap</label>
                <textarea
                  rows={3}
                  value={formData.personal?.domisili || ''}
                  onChange={(e) => handleNestedChange('personal', 'domisili', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:border-cyan-500 outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Email Resmi</label>
                <input
                  type="email"
                  value={formData.personal?.email || ''}
                  onChange={(e) => handleNestedChange('personal', 'email', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:border-cyan-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">WhatsApp Chat Link / Nomor</label>
                <input
                  type="text"
                  value={formData.personal?.whatsappUrl || ''}
                  onChange={(e) => handleNestedChange('personal', 'whatsappUrl', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:border-cyan-500 outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* MODULE 2: HERO & TEXT LAYOUT */}
        {activeModule === 'hero' && (
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-sm font-bold font-mono text-cyan-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> Teks Display Section Hero
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Salam Pembuka</label>
                <input
                  type="text"
                  value={formData.hero?.salam || ''}
                  onChange={(e) => handleNestedChange('hero', 'salam', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:border-cyan-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Sub-Salam / Header Role</label>
                <input
                  type="text"
                  value={formData.hero?.subSalam || ''}
                  onChange={(e) => handleNestedChange('hero', 'subSalam', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:border-cyan-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Nama Utama Display</label>
                <input
                  type="text"
                  value={formData.hero?.nama || ''}
                  onChange={(e) => handleNestedChange('hero', 'nama', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:border-cyan-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Role Utama (ALL CAPS)</label>
                <input
                  type="text"
                  value={formData.hero?.role || ''}
                  onChange={(e) => handleNestedChange('hero', 'role', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:border-cyan-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Tagline Utama</label>
              <input
                type="text"
                value={formData.hero?.tagline || ''}
                onChange={(e) => handleNestedChange('hero', 'tagline', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:border-cyan-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Deskripsi Ringkas Hero</label>
              <textarea
                rows={3}
                value={formData.hero?.deskripsi || ''}
                onChange={(e) => handleNestedChange('hero', 'deskripsi', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:border-cyan-500 outline-none resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Label Tombol CTA 1</label>
                <input
                  type="text"
                  value={formData.hero?.cta1 || 'View My Work'}
                  onChange={(e) => handleNestedChange('hero', 'cta1', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:border-cyan-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Label Tombol CTA 2</label>
                <input
                  type="text"
                  value={formData.hero?.cta2 || 'Download CV'}
                  onChange={(e) => handleNestedChange('hero', 'cta2', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:border-cyan-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Label Tombol CTA 3</label>
                <input
                  type="text"
                  value={formData.hero?.cta3 || 'Contact Me'}
                  onChange={(e) => handleNestedChange('hero', 'cta3', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:border-cyan-500 outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* MODULE 3: BIO & STATS */}
        {activeModule === 'about' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h2 className="text-sm font-bold font-mono text-cyan-400 flex items-center gap-2">
                <Compass className="w-4 h-4" /> Paragraf Tentang Saya & CV
              </h2>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Paragraf Deskripsi Bio</label>
                <textarea
                  rows={8}
                  value={formData.about?.paragraf || ''}
                  onChange={(e) => handleNestedChange('about', 'paragraf', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:border-cyan-500 outline-none resize-none font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Label Tombol Download CV</label>
                <input
                  type="text"
                  value={formData.about?.ctaLabel || ''}
                  onChange={(e) => handleNestedChange('about', 'ctaLabel', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:border-cyan-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Link File CV</label>
                <input
                  type="text"
                  value={formData.about?.ctaLink || ''}
                  onChange={(e) => handleNestedChange('about', 'ctaLink', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:border-cyan-500 outline-none"
                />
              </div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h2 className="text-sm font-bold font-mono text-cyan-400 flex items-center gap-2">
                <Activity className="w-4 h-4" /> Statistik Highlight (Stats Counter)
              </h2>

              {(formData.stats || []).map((stat, idx) => (
                <div key={idx} className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center gap-3">
                  <span className="text-xl">{stat.icon}</span>
                  <div className="grid grid-cols-2 gap-2 flex-1">
                    <input
                      type="text"
                      value={stat.label}
                      onChange={(e) => {
                        const newStats = [...formData.stats]
                        newStats[idx].label = e.target.value
                        setFormData((prev) => ({ ...prev, stats: newStats }))
                      }}
                      className="bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-slate-200"
                    />
                    <input
                      type="text"
                      value={stat.value}
                      onChange={(e) => {
                        const newStats = [...formData.stats]
                        newStats[idx].value = e.target.value
                        setFormData((prev) => ({ ...prev, stats: newStats }))
                      }}
                      className="bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-cyan-300 font-bold"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MODULE 4: GAMBAR, AVATAR & CUSTOM BG */}
        {activeModule === 'images' && (
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-6 max-w-3xl">
            <h2 className="text-sm font-bold font-mono text-cyan-400 flex items-center gap-2">
              <ImageIcon className="w-4 h-4" /> Kelola Gambar Profil & Latar Belakang
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">URL Foto Profil / Avatar</label>
                <input
                  type="text"
                  value={formData.themeSettings?.avatarUrl || ''}
                  onChange={(e) => handleNestedChange('themeSettings', 'avatarUrl', e.target.value)}
                  placeholder="/profile.jpg atau HTTPS URL"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:border-cyan-500 outline-none mb-2"
                />
                {formData.themeSettings?.avatarUrl && (
                  <div className="flex items-center gap-4 p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <img src={formData.themeSettings.avatarUrl} alt="Preview Avatar" className="w-16 h-16 rounded-full object-cover border-2 border-cyan-500 shadow-md" />
                    <div>
                      <p className="text-xs font-bold text-slate-200 font-mono">Avatar Aktif Website</p>
                      <p className="text-[10px] text-slate-500 font-mono">{formData.themeSettings.avatarUrl}</p>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">URL Gambar Latar Belakang Kustom</label>
                <input
                  type="text"
                  value={formData.themeSettings?.customBgImage || ''}
                  onChange={(e) => handleNestedChange('themeSettings', 'customBgImage', e.target.value)}
                  placeholder="Kosongkan untuk menggunakan latar galaksi 3D default"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:border-cyan-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Warna Akses Utama Website</label>
                <select
                  value={formData.themeSettings?.accentColor || 'cyan'}
                  onChange={(e) => handleNestedChange('themeSettings', 'accentColor', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:border-cyan-500 outline-none"
                >
                  <option value="cyan">Cyan Galactic (Default)</option>
                  <option value="emerald">Emerald Nebula</option>
                  <option value="purple">Cosmic Purple</option>
                  <option value="amber">Amber Solar</option>
                  <option value="rose">Rose Starlight</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* MODULE 5: GALLERY FOTO KEGIATAN */}
        {activeModule === 'gallery' && (
          <div className="space-y-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h2 className="text-sm font-bold font-mono text-cyan-400 flex items-center gap-2">
                <Camera className="w-4 h-4" /> Tambah Dokumentasi Kegiatan Baru
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  value={galleryForm.path}
                  onChange={(e) => setGalleryForm({ ...galleryForm, path: e.target.value })}
                  placeholder="URL Foto (/gallery-1.jpg atau https://...)"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none"
                />
                <input
                  type="text"
                  value={galleryForm.title}
                  onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                  placeholder="Judul Kegiatan / Keterangan Foto"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none"
                />
                <select
                  value={galleryForm.category}
                  onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none"
                >
                  <option value="Editing">Editing</option>
                  <option value="Pendidikan">Pendidikan</option>
                  <option value="Pekerjaan">Pekerjaan</option>
                  <option value="Kegiatan">Kegiatan</option>
                </select>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (!galleryForm.path.trim()) return
                  const updated = [...(formData.gallery || []), galleryForm]
                  setFormData((prev) => ({ ...prev, gallery: updated }))
                  setGalleryForm({ path: '/gallery-1.jpg', title: '', category: 'Editing' })
                }}
                className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Foto Galeri</span>
              </button>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-sm font-bold font-mono text-slate-200 mb-4">Daftar Galeri Aktif ({formData.gallery?.length || 0})</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {(formData.gallery || []).map((gal, idx) => (
                  <div key={idx} className="relative group rounded-xl overflow-hidden border border-slate-800 bg-slate-950 flex flex-col justify-between">
                    <img src={gal.path} alt={gal.title} className="w-full h-32 object-cover" />
                    <div className="p-2.5 bg-slate-900 text-[10px] font-mono text-slate-300 flex justify-between items-center">
                      <span className="truncate">{gal.title || 'Foto Galeri'}</span>
                      <button
                        onClick={() => {
                          const updated = formData.gallery.filter((_, i) => i !== idx)
                          setFormData((prev) => ({ ...prev, gallery: updated }))
                        }}
                        className="text-red-400 hover:text-red-300 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* MODULE 6: SERTIFIKAT & LISENSI */}
        {activeModule === 'certificates' && (
          <div className="space-y-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h2 className="text-sm font-bold font-mono text-cyan-400 flex items-center gap-2">
                <Award className="w-4 h-4" /> Tambah Sertifikat & Penghargaan
              </h2>

              <div className="flex gap-3">
                <input
                  type="text"
                  value={certForm}
                  onChange={(e) => setCertForm(e.target.value)}
                  placeholder="URL / File Sertifikat (/sertifikat-1.jpg atau HTTPS)"
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (!certForm.trim()) return
                    const updated = [...(formData.certificates || []), certForm]
                    setFormData((prev) => ({ ...prev, certificates: updated }))
                    setCertForm('')
                  }}
                  className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Sertifikat</span>
                </button>
              </div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-sm font-bold font-mono text-slate-200 mb-4">Daftar Sertifikat ({formData.certificates?.length || 0})</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {(formData.certificates || []).map((c, idx) => (
                  <div key={idx} className="relative group rounded-xl overflow-hidden border border-slate-800 bg-slate-950 flex flex-col justify-between">
                    <img src={c} alt={`Sertifikat ${idx + 1}`} className="w-full h-36 object-cover" />
                    <div className="p-2.5 bg-slate-900 text-[10px] font-mono text-slate-300 flex justify-between items-center">
                      <span className="truncate">Sertifikat #{idx + 1}</span>
                      <button
                        onClick={() => {
                          const updated = formData.certificates.filter((_, i) => i !== idx)
                          setFormData((prev) => ({ ...prev, certificates: updated }))
                        }}
                        className="text-red-400 hover:text-red-300 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* MODULE 7: PROJECTS */}
        {activeModule === 'projects' && (
          <div className="space-y-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h2 className="text-sm font-bold font-mono text-cyan-400 flex items-center gap-2">
                <Plus className="w-4 h-4" /> {editingProjectIndex !== null ? 'Edit Project' : 'Tambah Project Baru'}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Nama Project</label>
                  <input
                    type="text"
                    value={projectForm.nama}
                    onChange={(e) => setProjectForm({ ...projectForm, nama: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none"
                    placeholder="Contoh: Fahri Xz Portfolio"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Kategori</label>
                  <select
                    value={projectForm.category}
                    onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none"
                  >
                    <option value="Web Development">Web Development</option>
                    <option value="CapCut">CapCut</option>
                    <option value="Design">Design</option>
                    <option value="Technology">Technology</option>
                    <option value="Editing">Editing</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Tech Stack (pisahkan koma)</label>
                  <input
                    type="text"
                    value={projectForm.tech}
                    onChange={(e) => setProjectForm({ ...projectForm, tech: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none"
                    placeholder="React, Vite, Tailwind CSS, Gemini AI"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Thumbnail Gambar (URL)</label>
                  <input
                    type="text"
                    value={projectForm.thumbnail}
                    onChange={(e) => setProjectForm({ ...projectForm, thumbnail: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none"
                    placeholder="/proyek-1.jpg atau https://..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">URL Live Demo</label>
                  <input
                    type="text"
                    value={projectForm.liveDemo}
                    onChange={(e) => setProjectForm({ ...projectForm, liveDemo: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none"
                    placeholder="https://..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">URL GitHub</label>
                  <input
                    type="text"
                    value={projectForm.githubUrl}
                    onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none"
                    placeholder="https://github.com/..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Deskripsi Project</label>
                <textarea
                  rows={3}
                  value={projectForm.deskripsi}
                  onChange={(e) => setProjectForm({ ...projectForm, deskripsi: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none resize-none"
                />
              </div>

              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => {
                    if (!projectForm.nama.trim()) return
                    const newProjects = [...(formData.projects || [])]
                    const techArr = typeof projectForm.tech === 'string'
                      ? projectForm.tech.split(',').map((s) => s.trim()).filter(Boolean)
                      : projectForm.tech

                    const projectItem = {
                      id: editingProjectIndex !== null ? newProjects[editingProjectIndex].id : Date.now(),
                      nama: projectForm.nama,
                      deskripsi: projectForm.deskripsi,
                      category: projectForm.category,
                      tech: techArr,
                      liveDemo: projectForm.liveDemo,
                      githubUrl: projectForm.githubUrl,
                      thumbnail: projectForm.thumbnail,
                      year: projectForm.year || '2026',
                      status: projectForm.status || 'Featured Project',
                      featured: true
                    }

                    if (editingProjectIndex !== null) {
                      newProjects[editingProjectIndex] = projectItem
                    } else {
                      newProjects.unshift(projectItem)
                    }

                    setFormData((prev) => ({ ...prev, projects: newProjects }))
                    setEditingProjectIndex(null)
                    setProjectForm({
                      nama: '',
                      deskripsi: '',
                      category: 'Web Development',
                      tech: '',
                      liveDemo: '',
                      githubUrl: '',
                      thumbnail: '/proyek-1.jpg',
                      year: '2026',
                      status: 'Featured Project',
                      featured: true
                    })
                  }}
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>{editingProjectIndex !== null ? 'Simpan Edit Project' : 'Tambah Ke Daftar Project'}</span>
                </button>

                {editingProjectIndex !== null && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingProjectIndex(null)
                      setProjectForm({
                        nama: '',
                        deskripsi: '',
                        category: 'Web Development',
                        tech: '',
                        liveDemo: '',
                        githubUrl: '',
                        thumbnail: '/proyek-1.jpg',
                        year: '2026',
                        status: 'Featured Project',
                        featured: true
                      })
                    }}
                    className="px-3 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs hover:bg-slate-700 cursor-pointer"
                  >
                    Batal Edit
                  </button>
                )}
              </div>
            </div>

            {/* Existing Projects List */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-bold font-mono text-slate-200">Daftar Project Saat Ini ({formData.projects?.length || 0})</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(formData.projects || []).map((proj, idx) => (
                  <div key={idx} className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex flex-col justify-between gap-2">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-cyan-300 font-mono">{proj.nama}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">{proj.category}</span>
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-2 mb-2">{proj.deskripsi}</p>
                      <div className="flex flex-wrap gap-1">
                        {(proj.tech || []).map((t, tidx) => (
                          <span key={tidx} className="text-[9px] bg-slate-900 text-slate-300 px-1.5 py-0.5 rounded border border-slate-800">{t}</span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                      <span className="text-[10px] text-slate-500 font-mono">Tahun: {proj.year}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setEditingProjectIndex(idx)
                            setProjectForm({
                              nama: proj.nama || '',
                              deskripsi: proj.deskripsi || '',
                              category: proj.category || 'Web Development',
                              tech: Array.isArray(proj.tech) ? proj.tech.join(', ') : proj.tech || '',
                              liveDemo: proj.liveDemo || '',
                              githubUrl: proj.githubUrl || '',
                              thumbnail: proj.thumbnail || '/proyek-1.jpg',
                              year: proj.year || '2026',
                              status: proj.status || 'Featured Project',
                              featured: true
                            })
                          }}
                          className="p-1.5 rounded bg-slate-800 text-cyan-400 hover:bg-slate-700 cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            const updated = formData.projects.filter((_, i) => i !== idx)
                            setFormData((prev) => ({ ...prev, projects: updated }))
                          }}
                          className="p-1.5 rounded bg-red-950/60 text-red-400 hover:bg-red-900/80 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* MODULE 8: SKILLS */}
        {activeModule === 'skills' && (
          <div className="space-y-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h2 className="text-sm font-bold font-mono text-cyan-400 flex items-center gap-2">
                <Layers className="w-4 h-4" /> Kelola Keahlian & Tech Stack
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Nama Skill</label>
                  <input
                    type="text"
                    value={skillForm.nama}
                    onChange={(e) => setSkillForm({ ...skillForm, nama: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none"
                    placeholder="Contoh: CapCut Creator"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Kategori</label>
                  <select
                    value={skillForm.category}
                    onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none"
                  >
                    <option value="Creative">Creative</option>
                    <option value="Technology">Technology</option>
                    <option value="Business">Business</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Level ({skillForm.level}%)</label>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={skillForm.level}
                    onChange={(e) => setSkillForm({ ...skillForm, level: Number(e.target.value) })}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Deskripsi Singkat Skill</label>
                <input
                  type="text"
                  value={skillForm.deskripsi}
                  onChange={(e) => setSkillForm({ ...skillForm, deskripsi: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none"
                  placeholder="Pembuatan preset & video editing beat sync..."
                />
              </div>

              <button
                type="button"
                onClick={() => {
                  if (!skillForm.nama.trim()) return
                  const newSkills = [...(formData.skills || [])]
                  if (editingSkillIndex !== null) {
                    newSkills[editingSkillIndex] = skillForm
                  } else {
                    newSkills.push(skillForm)
                  }
                  setFormData((prev) => ({ ...prev, skills: newSkills }))
                  setEditingSkillIndex(null)
                  setSkillForm({ category: 'Creative', nama: '', level: 85, icon: '⚡', deskripsi: '' })
                }}
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>{editingSkillIndex !== null ? 'Simpan Edit Skill' : 'Tambah Skill Baru'}</span>
              </button>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-sm font-bold font-mono text-slate-200 mb-4">Daftar Skill Aktif ({formData.skills?.length || 0})</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {(formData.skills || []).map((sk, idx) => (
                  <div key={idx} className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-slate-200">{sk.nama}</span>
                        <span className="text-[10px] font-mono text-cyan-400 font-semibold">{sk.level}%</span>
                      </div>
                      <p className="text-[10px] text-slate-400">{sk.category} • {sk.deskripsi}</p>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          setEditingSkillIndex(idx)
                          setSkillForm(sk)
                        }}
                        className="p-1 rounded bg-slate-800 text-cyan-400 hover:bg-slate-700 cursor-pointer"
                      >
                        <Edit3 className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => {
                          const updated = formData.skills.filter((_, i) => i !== idx)
                          setFormData((prev) => ({ ...prev, skills: updated }))
                        }}
                        className="p-1 rounded bg-red-950/60 text-red-400 hover:bg-red-900/80 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* MODULE 9: SERVICES */}
        {activeModule === 'services' && (
          <div className="space-y-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h2 className="text-sm font-bold font-mono text-cyan-400 flex items-center gap-2">
                <Wrench className="w-4 h-4" /> Kelola Layanan yang Ditawarkan
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Judul Layanan</label>
                  <input
                    type="text"
                    value={serviceForm.title}
                    onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none"
                    placeholder="Video Editing"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Icon Emoji</label>
                  <input
                    type="text"
                    value={serviceForm.icon}
                    onChange={(e) => setServiceForm({ ...serviceForm, icon: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none"
                    placeholder="🎬"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Deskripsi Layanan</label>
                <textarea
                  rows={2}
                  value={serviceForm.desc}
                  onChange={(e) => setServiceForm({ ...serviceForm, desc: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none resize-none"
                />
              </div>

              <button
                type="button"
                onClick={() => {
                  if (!serviceForm.title.trim()) return
                  const updated = [...(formData.services || [])]
                  if (editingServiceIndex !== null) {
                    updated[editingServiceIndex] = serviceForm
                  } else {
                    updated.push(serviceForm)
                  }
                  setFormData((prev) => ({ ...prev, services: updated }))
                  setEditingServiceIndex(null)
                  setServiceForm({ title: '', icon: '🚀', desc: '' })
                }}
                className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>{editingServiceIndex !== null ? 'Simpan Service' : 'Tambah Layanan'}</span>
              </button>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-sm font-bold font-mono text-slate-200 mb-4">Daftar Layanan ({formData.services?.length || 0})</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(formData.services || []).map((srv, idx) => (
                  <div key={idx} className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex items-start justify-between">
                    <div className="flex gap-3">
                      <span className="text-2xl">{srv.icon}</span>
                      <div>
                        <h4 className="text-xs font-bold text-cyan-300 font-mono">{srv.title}</h4>
                        <p className="text-xs text-slate-400 mt-1">{srv.desc}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          setEditingServiceIndex(idx)
                          setServiceForm(srv)
                        }}
                        className="p-1 rounded bg-slate-800 text-cyan-400 hover:bg-slate-700 cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          const updated = formData.services.filter((_, i) => i !== idx)
                          setFormData((prev) => ({ ...prev, services: updated }))
                        }}
                        className="p-1 rounded bg-red-950/60 text-red-400 hover:bg-red-900/80 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* MODULE 10: ARTICLES */}
        {activeModule === 'articles' && (
          <div className="space-y-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h2 className="text-sm font-bold font-mono text-cyan-400 flex items-center gap-2">
                <FileText className="w-4 h-4" /> {editingArticleIndex !== null ? 'Edit Artikel' : 'Tulis Artikel / Wawasan Baru'}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Judul Artikel</label>
                  <input
                    type="text"
                    value={articleForm.title}
                    onChange={(e) => setArticleForm({ ...articleForm, title: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none"
                    placeholder="Panduan Video Editing CapCut"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Kategori Artikel</label>
                  <select
                    value={articleForm.category}
                    onChange={(e) => setArticleForm({ ...articleForm, category: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none"
                  >
                    <option value="Content Creation">Content Creation</option>
                    <option value="Tutorial">Tutorial</option>
                    <option value="E-Commerce & Digital">E-Commerce & Digital</option>
                    <option value="Web Development">Web Development</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Featured Image URL</label>
                  <input
                    type="text"
                    value={articleForm.featuredImage}
                    onChange={(e) => setArticleForm({ ...articleForm, featuredImage: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Tags (pisahkan koma)</label>
                  <input
                    type="text"
                    value={articleForm.tags}
                    onChange={(e) => setArticleForm({ ...articleForm, tags: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Ringkasan / Excerpt</label>
                <textarea
                  rows={2}
                  value={articleForm.excerpt}
                  onChange={(e) => setArticleForm({ ...articleForm, excerpt: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Konten Lengkap Artikel (Markdown Supported)</label>
                <textarea
                  rows={6}
                  value={articleForm.content}
                  onChange={(e) => setArticleForm({ ...articleForm, content: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none resize-none font-mono"
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => {
                    if (!articleForm.title.trim()) return
                    const updated = [...(formData.articles || [])]
                    const tagsArr = typeof articleForm.tags === 'string'
                      ? articleForm.tags.split(',').map((t) => t.trim()).filter(Boolean)
                      : articleForm.tags

                    const slug = articleForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')

                    const artItem = {
                      id: editingArticleIndex !== null ? updated[editingArticleIndex].id : String(Date.now()),
                      title: articleForm.title,
                      slug: slug,
                      category: articleForm.category,
                      excerpt: articleForm.excerpt,
                      content: articleForm.content,
                      date: articleForm.date || 'Agustus 2026',
                      readTime: articleForm.readTime || '5 min baca',
                      featuredImage: articleForm.featuredImage,
                      tags: tagsArr
                    }

                    if (editingArticleIndex !== null) {
                      updated[editingArticleIndex] = artItem
                    } else {
                      updated.unshift(artItem)
                    }

                    setFormData((prev) => ({ ...prev, articles: updated }))
                    setEditingArticleIndex(null)
                    setArticleForm({
                      title: '',
                      slug: '',
                      category: 'Content Creation',
                      excerpt: '',
                      content: '',
                      date: 'Agustus 2026',
                      readTime: '5 min baca',
                      featuredImage: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1200&auto=format&fit=crop',
                      tags: 'CapCut, Video Editing, Creative'
                    })
                  }}
                  className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>{editingArticleIndex !== null ? 'Simpan Edit Artikel' : 'Publikasikan Artikel'}</span>
                </button>
              </div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-sm font-bold font-mono text-slate-200 mb-4">Daftar Artikel Published ({formData.articles?.length || 0})</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(formData.articles || []).map((art, idx) => (
                  <div key={idx} className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-cyan-300 font-mono truncate">{art.title}</span>
                        <span className="text-[9px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800 shrink-0">{art.category}</span>
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-2 my-2">{art.excerpt}</p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                      <span className="text-[10px] text-slate-500 font-mono">{art.date}</span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            setEditingArticleIndex(idx)
                            setArticleForm({
                              title: art.title || '',
                              slug: art.slug || '',
                              category: art.category || 'Content Creation',
                              excerpt: art.excerpt || '',
                              content: art.content || '',
                              date: art.date || 'Agustus 2026',
                              readTime: art.readTime || '5 min baca',
                              featuredImage: art.featuredImage || '',
                              tags: Array.isArray(art.tags) ? art.tags.join(', ') : art.tags || ''
                            })
                          }}
                          className="p-1.5 rounded bg-slate-800 text-cyan-400 hover:bg-slate-700 cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            const updated = formData.articles.filter((_, i) => i !== idx)
                            setFormData((prev) => ({ ...prev, articles: updated }))
                          }}
                          className="p-1.5 rounded bg-red-950/60 text-red-400 hover:bg-red-900 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* MODULE 11: EXPERIENCE */}
        {activeModule === 'experience' && (
          <div className="space-y-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h2 className="text-sm font-bold font-mono text-cyan-400 flex items-center gap-2">
                <Clock className="w-4 h-4" /> Kelola Riwayat Pekerjaan, Pendidikan & PKL
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  value={expForm.company}
                  onChange={(e) => setExpForm({ ...expForm, company: e.target.value })}
                  placeholder="Nama Perusahaan / Institusi"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none"
                />
                <input
                  type="text"
                  value={expForm.role}
                  onChange={(e) => setExpForm({ ...expForm, role: e.target.value })}
                  placeholder="Jabatan / Posisi / Tingkat"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none"
                />
                <input
                  type="text"
                  value={expForm.period}
                  onChange={(e) => setExpForm({ ...expForm, period: e.target.value })}
                  placeholder="Periode (Contoh: 2023 - 2025)"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none"
                />
              </div>

              <div>
                <textarea
                  rows={2}
                  value={expForm.desc}
                  onChange={(e) => setExpForm({ ...expForm, desc: e.target.value })}
                  placeholder="Deskripsi Tugas & Tanggung Jawab Singkat"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none resize-none"
                />
              </div>

              <button
                type="button"
                onClick={() => {
                  if (!expForm.company.trim()) return
                  const updated = [...(formData.experiences || [])]
                  if (editingExpIndex !== null) {
                    updated[editingExpIndex] = expForm
                  } else {
                    updated.push(expForm)
                  }
                  setFormData((prev) => ({ ...prev, experiences: updated }))
                  setEditingExpIndex(null)
                  setExpForm({ company: '', role: '', period: '', category: 'Pengalaman Kerja', type: 'Pekerjaan', desc: '', activities: '' })
                }}
                className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>{editingExpIndex !== null ? 'Simpan Edit Riwayat' : 'Tambah Riwayat Pekerjaan'}</span>
              </button>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-sm font-bold font-mono text-slate-200 mb-4">Daftar Karir & Pendidikan ({formData.experiences?.length || 0})</h3>
              <div className="space-y-3">
                {(formData.experiences || []).map((exp, idx) => (
                  <div key={idx} className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-cyan-300 font-mono">{exp.company}</span>
                        <span className="text-[10px] text-slate-400 font-mono">({exp.period})</span>
                      </div>
                      <p className="text-xs font-semibold text-slate-200 mt-1">{exp.role}</p>
                      <p className="text-xs text-slate-400 mt-1">{exp.desc}</p>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          setEditingExpIndex(idx)
                          setExpForm(exp)
                        }}
                        className="p-1.5 rounded bg-slate-800 text-cyan-400 hover:bg-slate-700 cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          const updated = formData.experiences.filter((_, i) => i !== idx)
                          setFormData((prev) => ({ ...prev, experiences: updated }))
                        }}
                        className="p-1.5 rounded bg-red-950/60 text-red-400 hover:bg-red-900 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* MODULE 12: DEVELOPER JOURNEY */}
        {activeModule === 'journey' && (
          <div className="space-y-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h2 className="text-sm font-bold font-mono text-cyan-400 flex items-center gap-2">
                <Terminal className="w-4 h-4" /> Tambah Timeline Developer Journey
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  value={journeyForm.year}
                  onChange={(e) => setJourneyForm({ ...journeyForm, year: e.target.value })}
                  placeholder="Tahun (Contoh: 2026)"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none"
                />
                <input
                  type="text"
                  value={journeyForm.title}
                  onChange={(e) => setJourneyForm({ ...journeyForm, title: e.target.value })}
                  placeholder="Judul Milestones"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none"
                />
              </div>

              <div>
                <textarea
                  rows={2}
                  value={journeyForm.desc}
                  onChange={(e) => setJourneyForm({ ...journeyForm, desc: e.target.value })}
                  placeholder="Keterangan Pencapaian / Milestone..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none resize-none"
                />
              </div>

              <button
                type="button"
                onClick={() => {
                  if (!journeyForm.title.trim()) return
                  const updated = [...(formData.developerJourney || []), journeyForm]
                  setFormData((prev) => ({ ...prev, developerJourney: updated }))
                  setJourneyForm({ year: '2026', title: '', desc: '' })
                }}
                className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Milestone Journey</span>
              </button>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-sm font-bold font-mono text-slate-200 mb-4">Timeline Active Journey ({formData.developerJourney?.length || 0})</h3>
              <div className="space-y-3">
                {(formData.developerJourney || []).map((j, idx) => (
                  <div key={idx} className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-start justify-between">
                    <div>
                      <span className="text-xs font-bold text-cyan-300 font-mono">{j.year} — {j.title}</span>
                      <p className="text-xs text-slate-400 mt-1">{j.desc}</p>
                    </div>
                    <button
                      onClick={() => {
                        const updated = formData.developerJourney.filter((_, i) => i !== idx)
                        setFormData((prev) => ({ ...prev, developerJourney: updated }))
                      }}
                      className="text-red-400 hover:text-red-300 p-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* MODULE 13: FAQ */}
        {activeModule === 'faq' && (
          <div className="space-y-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h2 className="text-sm font-bold font-mono text-cyan-400 flex items-center gap-2">
                <HelpCircle className="w-4 h-4" /> Kelola Pertanyaan Umum (FAQ)
              </h2>

              <div className="space-y-3">
                <input
                  type="text"
                  value={faqForm.q}
                  onChange={(e) => setFaqForm({ ...faqForm, q: e.target.value })}
                  placeholder="Pertanyaan (Contoh: Apakah melayani jasa pemesanan preset?)"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none"
                />
                <textarea
                  rows={2}
                  value={faqForm.a}
                  onChange={(e) => setFaqForm({ ...faqForm, a: e.target.value })}
                  placeholder="Jawaban Singkat & Jelas"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none resize-none"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (!faqForm.q.trim()) return
                    const updated = [...(formData.faq || []), faqForm]
                    setFormData((prev) => ({ ...prev, faq: updated }))
                    setFaqForm({ q: '', a: '' })
                  }}
                  className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Item FAQ</span>
                </button>
              </div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-sm font-bold font-mono text-slate-200 mb-4">Daftar FAQ Aktif ({formData.faq?.length || 0})</h3>
              <div className="space-y-3">
                {(formData.faq || []).map((faqItem, idx) => (
                  <div key={idx} className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-start justify-between">
                    <div>
                      <p className="text-xs font-bold text-cyan-300 font-mono">Q: {faqItem.q}</p>
                      <p className="text-xs text-slate-400 mt-1">A: {faqItem.a}</p>
                    </div>
                    <button
                      onClick={() => {
                        const updated = formData.faq.filter((_, i) => i !== idx)
                        setFormData((prev) => ({ ...prev, faq: updated }))
                      }}
                      className="text-red-400 hover:text-red-300 p-1 cursor-pointer shrink-0 ml-2"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* MODULE 14: USES GEAR & CHANGELOG */}
        {activeModule === 'uses_changelog' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h2 className="text-sm font-bold font-mono text-cyan-400 flex items-center gap-2">
                <Cpu className="w-4 h-4" /> Kelola Uses & Stack Gear
              </h2>

              <div className="space-y-3">
                <input
                  type="text"
                  value={usesForm.name}
                  onChange={(e) => setUsesForm({ ...usesForm, name: e.target.value })}
                  placeholder="Nama Tools / Software (CapCut, VS Code, dll)"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none"
                />
                <input
                  type="text"
                  value={usesForm.category}
                  onChange={(e) => setUsesForm({ ...usesForm, category: e.target.value })}
                  placeholder="Kategori (Editing, Development, Mobile)"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none"
                />
                <input
                  type="text"
                  value={usesForm.desc}
                  onChange={(e) => setUsesForm({ ...usesForm, desc: e.target.value })}
                  placeholder="Deskripsi Penggunaan"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (!usesForm.name.trim()) return
                    const updated = [...(formData.usesStack || []), usesForm]
                    setFormData((prev) => ({ ...prev, usesStack: updated }))
                    setUsesForm({ name: '', category: 'Development', desc: '' })
                  }}
                  className="w-full py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
                >
                  Tambah Tools Gear
                </button>
              </div>

              <div className="space-y-2 pt-2">
                {(formData.usesStack || []).map((u, idx) => (
                  <div key={idx} className="p-2.5 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-cyan-300 font-mono">{u.name}</span>
                      <p className="text-[10px] text-slate-400">{u.category} — {u.desc}</p>
                    </div>
                    <button
                      onClick={() => {
                        const updated = formData.usesStack.filter((_, i) => i !== idx)
                        setFormData((prev) => ({ ...prev, usesStack: updated }))
                      }}
                      className="text-red-400 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h2 className="text-sm font-bold font-mono text-cyan-400 flex items-center gap-2">
                <List className="w-4 h-4" /> Kelola Website Changelog
              </h2>

              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={changelogForm.version}
                    onChange={(e) => setChangelogForm({ ...changelogForm, version: e.target.value })}
                    placeholder="Versi (v2.5.0)"
                    className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none"
                  />
                  <input
                    type="text"
                    value={changelogForm.date}
                    onChange={(e) => setChangelogForm({ ...changelogForm, date: e.target.value })}
                    placeholder="Tanggal (Agustus 2026)"
                    className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none"
                  />
                </div>
                <input
                  type="text"
                  value={changelogForm.title}
                  onChange={(e) => setChangelogForm({ ...changelogForm, title: e.target.value })}
                  placeholder="Judul Rilis"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none"
                />
                <textarea
                  rows={2}
                  value={changelogForm.changes}
                  onChange={(e) => setChangelogForm({ ...changelogForm, changes: e.target.value })}
                  placeholder="Perubahan (pisahkan dengan koma)"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none resize-none"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (!changelogForm.title.trim()) return
                    const changeArr = typeof changelogForm.changes === 'string'
                      ? changelogForm.changes.split(',').map((c) => c.trim()).filter(Boolean)
                      : changelogForm.changes

                    const updated = [
                      {
                        version: changelogForm.version,
                        date: changelogForm.date,
                        title: changelogForm.title,
                        changes: changeArr
                      },
                      ...(formData.changelog || [])
                    ]
                    setFormData((prev) => ({ ...prev, changelog: updated }))
                    setChangelogForm({ version: 'v2.6.0', date: 'Agustus 2026', title: '', changes: '' })
                  }}
                  className="w-full py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
                >
                  Rilis Changelog Baru
                </button>
              </div>

              <div className="space-y-2 pt-2">
                {(formData.changelog || []).map((ch, idx) => (
                  <div key={idx} className="p-3 bg-slate-950 border border-slate-800 rounded-lg space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-cyan-300 font-mono">{ch.version} — {ch.title}</span>
                      <button
                        onClick={() => {
                          const updated = formData.changelog.filter((_, i) => i !== idx)
                          setFormData((prev) => ({ ...prev, changelog: updated }))
                        }}
                        className="text-red-400 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-[10px] text-slate-400">{ch.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* MODULE 15: SOSIAL MEDIA & KONTAK */}
        {activeModule === 'social' && (
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4 max-w-3xl">
            <h2 className="text-sm font-bold font-mono text-cyan-400 flex items-center gap-2">
              <Globe className="w-4 h-4" /> Kelola Link Tautan Media Sosial Resmi
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">WhatsApp Chat Link / Tautan</label>
                <input
                  type="text"
                  value={formData.personal?.whatsappUrl || ''}
                  onChange={(e) => handleNestedChange('personal', 'whatsappUrl', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">TikTok Link Profil</label>
                <input
                  type="text"
                  value={formData.personal?.tiktokUrl || ''}
                  onChange={(e) => handleNestedChange('personal', 'tiktokUrl', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">CapCut Creator Profil Link</label>
                <input
                  type="text"
                  value={formData.personal?.capcutUrl || ''}
                  onChange={(e) => handleNestedChange('personal', 'capcutUrl', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Instagram Link</label>
                <input
                  type="text"
                  value={formData.personal?.instagramUrl || ''}
                  onChange={(e) => handleNestedChange('personal', 'instagramUrl', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">GitHub Repositories Link</label>
                <input
                  type="text"
                  value={formData.personal?.githubUrl || ''}
                  onChange={(e) => handleNestedChange('personal', 'githubUrl', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Email Resmi</label>
                <input
                  type="email"
                  value={formData.personal?.email || ''}
                  onChange={(e) => handleNestedChange('personal', 'email', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* MODULE 16: GUESTBOOK / PESAN MASUK */}
        {activeModule === 'guestbook' && (
          <div className="space-y-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold font-mono text-cyan-400 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" /> Pesan Masuk & Buku Tamu ({guestbookMessages.length})
                </h2>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded border border-emerald-800">
                  Firestore Realtime Sync
                </span>
              </div>

              {guestbookMessages.length === 0 ? (
                <div className="p-8 text-center text-slate-500 font-mono text-xs bg-slate-950 rounded-xl border border-slate-800">
                  Belum ada pesan masuk di buku tamu.
                </div>
              ) : (
                <div className="space-y-3">
                  {guestbookMessages.map((msg) => (
                    <div key={msg.id} className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-cyan-300 font-mono">{msg.nama || 'Pengunjung'}</span>
                          <span className="text-[10px] text-slate-500 font-mono">{msg.dateStr || ''}</span>
                        </div>
                        <p className="text-xs text-slate-300 mt-1">{msg.pesan}</p>
                      </div>

                      <button
                        onClick={async () => {
                          await deleteGuestbookMessage(msg.id)
                        }}
                        className="p-1.5 rounded bg-red-950/60 text-red-400 hover:bg-red-900 transition-colors cursor-pointer shrink-0"
                        title="Hapus Pesan"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* MODULE 17: SOLAR SYSTEM 3D */}
        {activeModule === 'solarsystem' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-6 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold font-mono text-cyan-400 flex items-center gap-2">
                  <Sun className="w-4 h-4" /> Pengaturan Ukuran & Skala Tata Surya
                </h2>
                <button
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, solarSystem: DEFAULT_SOLAR_SYSTEM }))}
                  className="text-xs text-slate-400 hover:text-cyan-300 flex items-center gap-1 font-mono cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" /> Reset Standard
                </button>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono text-slate-300 mb-1">
                  <span>Ukuran Diameter Matahari (px):</span>
                  <span className="text-cyan-400 font-bold">{formData.solarSystem?.sunSize || 48} px</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="120"
                  value={formData.solarSystem?.sunSize || 48}
                  onChange={(e) => handleNestedChange('solarSystem', 'sunSize', Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono text-slate-300 mb-1">
                  <span>Skala Ukuran Planet:</span>
                  <span className="text-cyan-400 font-bold">{(formData.solarSystem?.planetScale || 1.0).toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="2.5"
                  step="0.1"
                  value={formData.solarSystem?.planetScale || 1.0}
                  onChange={(e) => handleNestedChange('solarSystem', 'planetScale', Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono text-slate-300 mb-1">
                  <span>Kecepatan Orbit Planet:</span>
                  <span className="text-cyan-400 font-bold">{(formData.solarSystem?.orbitSpeed || 1.0).toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="4.0"
                  step="0.1"
                  value={formData.solarSystem?.orbitSpeed || 1.0}
                  onChange={(e) => handleNestedChange('solarSystem', 'orbitSpeed', Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono text-slate-300 mb-1">
                  <span>Warna Kerlip Matahari (Sun Glow):</span>
                  <input
                    type="color"
                    value={formData.solarSystem?.sunGlowColor || '#FDB813'}
                    onChange={(e) => handleNestedChange('solarSystem', 'sunGlowColor', e.target.value)}
                    className="w-8 h-6 rounded cursor-pointer border border-slate-700 bg-transparent"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 space-y-3">
                <h3 className="text-xs font-mono font-bold text-slate-300">Toggle Fitur Visual 3D</h3>

                {[
                  { key: 'showEarthCityLights', label: 'Cahaya Lampu Kota Bumi (Night Lights)' },
                  { key: 'showSaturnRings', label: 'Cincin Megah Planet Saturnus' },
                  { key: 'showJupiterRedSpot', label: 'Bintik Merah Raksasa Jupiter' },
                  { key: 'showOrbitRings', label: 'Garis Lintasan Orbit Planet' }
                ].map((item) => (
                  <label key={item.key} className="flex items-center justify-between text-xs text-slate-300 cursor-pointer p-2 rounded-lg bg-slate-950 border border-slate-800">
                    <span>{item.label}</span>
                    <input
                      type="checkbox"
                      checked={formData.solarSystem?.[item.key] ?? true}
                      onChange={(e) => handleNestedChange('solarSystem', item.key, e.target.checked)}
                      className="w-4 h-4 accent-cyan-400 cursor-pointer"
                    />
                  </label>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center relative min-h-[420px] overflow-hidden">
              <span className="absolute top-4 left-4 text-xs font-mono text-cyan-400 font-semibold bg-cyan-950/80 px-2.5 py-1 rounded border border-cyan-800 z-20">
                Live Interactive Solar System Preview
              </span>
              <SolarSystem size={380} interactive={true} overrideSettings={formData.solarSystem} />
            </div>
          </div>
        )}

        {/* MODULE 18: ANALYTICS & RESET */}
        {activeModule === 'analytics' && (
          <div className="space-y-6 max-w-4xl">
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h2 className="text-sm font-bold font-mono text-cyan-400 flex items-center gap-2">
                <Activity className="w-4 h-4" /> Status Sistem & Analitik Latar
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
                  <span className="text-[10px] font-mono text-slate-400">Database Status</span>
                  <p className="text-sm font-bold text-emerald-400 flex items-center gap-1.5 mt-1 font-mono">
                    <Check className="w-4 h-4" /> Firestore Online
                  </p>
                </div>

                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
                  <span className="text-[10px] font-mono text-slate-400">System Version</span>
                  <p className="text-sm font-bold text-cyan-300 font-mono mt-1">v2.5.0 Production</p>
                </div>

                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
                  <span className="text-[10px] font-mono text-slate-400">Local Cache</span>
                  <p className="text-sm font-bold text-slate-200 font-mono mt-1">Active</p>
                </div>
              </div>
            </div>

            <div className="bg-red-950/20 border border-red-900/50 rounded-2xl p-6 space-y-4">
              <h2 className="text-sm font-bold font-mono text-red-400 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" /> Reset Data Firestore ke Default
              </h2>
              <p className="text-xs text-slate-400">
                Fitur ini akan mengembalikan seluruh teks, project, keahlian, media sosial, artikel, dan parameter tata surya kembali ke konfigurasi standar asli website.
              </p>

              <button
                type="button"
                onClick={() => setShowResetConfirm(true)}
                className="px-4 py-2.5 rounded-xl bg-red-900/80 hover:bg-red-800 text-red-100 font-bold text-xs flex items-center gap-2 cursor-pointer transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reset Semua Data ke Standar Awal</span>
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Floating Save Toolbar for Desktop */}
      <div className="hidden md:flex fixed bottom-6 right-8 z-50 bg-slate-900/90 border border-cyan-500/40 p-2.5 px-6 rounded-2xl shadow-[0_0_30px_rgba(6,182,212,0.3)] backdrop-blur-xl items-center gap-4">
        <span className="text-xs font-mono text-slate-300">
          Simpan perubahan ke Firestore?
        </span>

        <button
          onClick={handleSaveAll}
          disabled={isSaving}
          className="flex items-center gap-2 px-5 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold font-mono text-xs shadow-lg transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
        >
          {isSaving ? (
            <>
              <div className="w-4 h-4 rounded-full border-2 border-slate-950 border-t-transparent animate-spin" />
              <span>Menyimpan...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Simpan Sekarang</span>
            </>
          )}
        </button>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {saveToast.show && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`fixed top-20 right-6 z-50 p-4 rounded-xl border text-xs font-mono shadow-2xl backdrop-blur-xl max-w-sm ${
              saveToast.type === 'success'
                ? 'bg-emerald-950/90 border-emerald-500 text-emerald-200'
                : 'bg-red-950/90 border-red-500 text-red-200'
            }`}
          >
            {saveToast.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reset Confirmation Modal */}
      <AnimatePresence>
        {showResetConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full text-center space-y-4"
            >
              <div className="w-12 h-12 rounded-full bg-red-950 border border-red-800 text-red-400 flex items-center justify-center mx-auto">
                <AlertCircle className="w-6 h-6" />
              </div>

              <h3 className="text-base font-bold text-white font-mono">Konfirmasi Reset Data</h3>
              <p className="text-xs text-slate-400">
                Apakah Anda yakin ingin mengembalikan seluruh data ke standar asli? Perubahan kustom di Firestore akan ditimpa.
              </p>

              <div className="flex gap-3 justify-center pt-2">
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs hover:bg-slate-700 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  onClick={handleResetConfirm}
                  className="px-4 py-2 rounded-xl bg-red-600 text-white font-bold text-xs hover:bg-red-500 cursor-pointer"
                >
                  Ya, Reset Sekarang
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
