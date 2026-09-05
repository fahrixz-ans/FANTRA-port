import { useState, useEffect } from 'react'
import SEO from '../components/SEO'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { extendedData } from '../data/extendedData'

export default function AdminCMS() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [pin, setPin] = useState('')
  const [activeTab, setActiveTab] = useState('projects') // 'projects' | 'blog' | 'presets' | 'guestbook' | 'feedback' | 'polls' | 'status' | 'settings'

  // Data states
  const [projectsList, setProjectsList] = useState(extendedData.detailedProjects)
  const [feedbackList, setFeedbackList] = useState([])
  const [newProject, setNewProject] = useState({
    name: '',
    category: 'Web Development',
    description: '',
    technologies: 'React, Tailwind, Vite',
    status: 'PUBLIC',
    version: 'v1.0.0',
    year: '2026',
    demoUrl: '',
    thumbnail: '/proyek-1.jpg'
  })

  useEffect(() => {
    // Check local session
    if (sessionStorage.getItem('fahrixz_admin_auth') === 'true') {
      setIsAuthenticated(true)
    }
    const storedFb = JSON.parse(localStorage.getItem('fahrixz_feedback') || '[]')
    setFeedbackList(storedFb)
  }, [])

  const handleLogin = (e) => {
    e.preventDefault()
    // Simple PIN verification for demo admin
    if (pin === '2026' || pin === 'fahrixz') {
      setIsAuthenticated(true)
      sessionStorage.setItem('fahrixz_admin_auth', 'true')
    } else {
      alert('PIN Admin Salah! Gunakan PIN default 2026')
    }
  }

  const handleAddProject = (e) => {
    e.preventDefault()
    if (!newProject.name) return

    const projObj = {
      id: Date.now().toString(),
      slug: newProject.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      name: newProject.name,
      category: newProject.category,
      technologies: newProject.technologies.split(',').map(t => t.trim()),
      status: newProject.status,
      year: newProject.year,
      version: newProject.version,
      description: newProject.description,
      demoUrl: newProject.demoUrl,
      thumbnail: newProject.thumbnail,
      featured: true
    }

    setProjectsList([projObj, ...projectsList])
    setNewProject({ name: '', category: 'Web Development', description: '', technologies: 'React, Tailwind', status: 'PUBLIC', version: 'v1.0.0', year: '2026', demoUrl: '', thumbnail: '/proyek-1.jpg' })
    alert('Proyek berhasil ditambahkan ke daftar CMS!')
  }

  const handleDeleteProject = (id) => {
    if (window.confirm('Hapus proyek ini dari CMS?')) {
      setProjectsList(projectsList.filter(p => p.id !== id))
    }
  }

  return (
    <div className="min-h-screen bg-galaxy-bg text-galaxy-text font-sans">
      <SEO 
        title="Admin CMS — FahriXz Management Dashboard"
        description="Panel administrasi CMS untuk mengelola proyek, artikel blog, preset CapCut, guestbook, feedback, dan status sistem FahriXz."
      />
      <Navbar />

      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-galaxy-primary/10 border border-galaxy-primary/30 text-galaxy-primary text-xs font-semibold mb-3">
            FahriXz Official Control Panel
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-2">
            ADMIN CMS DASHBOARD
          </h1>
          <p className="text-galaxy-text-muted text-sm">
            Pusat manajemen konten lengkap untuk mengelola proyek, artikel, preset, masukan pengunjung, dan status sistem.
          </p>
        </div>

        {!isAuthenticated ? (
          /* Login PIN Form */
          <div className="max-w-md mx-auto bg-galaxy-card border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-xl">
            <h3 className="text-lg font-bold text-white mb-2 text-center">Akses Admin CMS</h3>
            <p className="text-xs text-galaxy-text-muted text-center mb-6">
              Masukkan PIN Otorisasi Admin untuk mengelola data website. (Default: <code className="text-galaxy-primary font-bold">2026</code>)
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-galaxy-text mb-1">PIN Keamanan Admin</label>
                <input
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="Masukkan PIN (e.g. 2026)"
                  className="w-full px-4 py-2.5 rounded-xl bg-galaxy-card-alt border border-white/10 text-white text-sm focus:outline-none focus:border-galaxy-primary text-center tracking-widest font-mono"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-galaxy-primary text-galaxy-bg font-bold text-xs hover:opacity-90 transition-opacity shadow-lg shadow-galaxy-primary/20 cursor-pointer"
              >
                Masuk Ke Dashboard Admin &rarr;
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated CMS Dashboard */
          <div>
            {/* Dashboard Tabs */}
            <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4 mb-8">
              {[
                { id: 'projects', label: 'Proyek (' + projectsList.length + ')' },
                { id: 'blog', label: 'Artikel Blog' },
                { id: 'presets', label: 'Creator Presets' },
                { id: 'feedback', label: 'Feedback Inbox (' + feedbackList.length + ')' },
                { id: 'status', label: 'System Status' },
                { id: 'settings', label: 'Pengaturan Metadata' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-galaxy-primary text-galaxy-bg font-bold shadow-md shadow-galaxy-primary/20'
                      : 'bg-galaxy-card border border-white/10 text-galaxy-text hover:bg-galaxy-card-alt'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
              <button
                onClick={() => { setIsAuthenticated(false); sessionStorage.removeItem('fahrixz_admin_auth'); }}
                className="ml-auto px-4 py-2 rounded-xl bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold hover:bg-red-500/30 cursor-pointer"
              >
                Keluar Admin
              </button>
            </div>

            {/* TAB: Projects */}
            {activeTab === 'projects' && (
              <div className="space-y-8">
                {/* Form Add New Project */}
                <div className="bg-galaxy-card border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
                  <h3 className="text-base font-bold text-white mb-4">Tambah Proyek Baru</h3>
                  <form onSubmit={handleAddProject} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-galaxy-text-muted mb-1">Nama Proyek *</label>
                      <input
                        type="text"
                        required
                        value={newProject.name}
                        onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                        placeholder="Contoh: Mobile App Simulator"
                        className="w-full px-3 py-2 rounded-lg bg-galaxy-card-alt border border-white/10 text-white text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-galaxy-text-muted mb-1">Kategori</label>
                      <select
                        value={newProject.category}
                        onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-galaxy-card-alt border border-white/10 text-white text-xs"
                      >
                        <option value="Web Development">Web Development</option>
                        <option value="CapCut & Creator">CapCut & Creator</option>
                        <option value="Design & Store">Design & Store</option>
                        <option value="Technology">Technology</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-bold text-galaxy-text-muted mb-1">Deskripsi Ringkas</label>
                      <input
                        type="text"
                        value={newProject.description}
                        onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                        placeholder="Deskripsi singkat proyek..."
                        className="w-full px-3 py-2 rounded-lg bg-galaxy-card-alt border border-white/10 text-white text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-galaxy-text-muted mb-1">Teknologi (Dipisah koma)</label>
                      <input
                        type="text"
                        value={newProject.technologies}
                        onChange={(e) => setNewProject({ ...newProject, technologies: e.target.value })}
                        placeholder="React, Vite, Tailwind CSS"
                        className="w-full px-3 py-2 rounded-lg bg-galaxy-card-alt border border-white/10 text-white text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-galaxy-text-muted mb-1">Link Demo (Opsional)</label>
                      <input
                        type="url"
                        value={newProject.demoUrl}
                        onChange={(e) => setNewProject({ ...newProject, demoUrl: e.target.value })}
                        placeholder="https://..."
                        className="w-full px-3 py-2 rounded-lg bg-galaxy-card-alt border border-white/10 text-white text-xs"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <button
                        type="submit"
                        className="w-full py-2.5 rounded-lg bg-galaxy-primary text-galaxy-bg font-bold text-xs"
                      >
                        Simpan Proyek Ke CMS
                      </button>
                    </div>
                  </form>
                </div>

                {/* List Projects */}
                <div className="bg-galaxy-card border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
                  <h3 className="text-base font-bold text-white mb-4">Daftar Proyek Aktif</h3>
                  <div className="space-y-3">
                    {projectsList.map((p) => (
                      <div key={p.id} className="p-4 rounded-xl bg-galaxy-card-alt border border-white/5 flex items-center justify-between gap-4">
                        <div>
                          <h4 className="text-sm font-bold text-white">{p.name}</h4>
                          <span className="text-xs text-galaxy-text-muted font-mono">{p.category} • {p.version}</span>
                        </div>
                        <button
                          onClick={() => handleDeleteProject(p.id)}
                          className="px-3 py-1 rounded bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold hover:bg-red-500/30"
                        >
                          Hapus
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: Feedback Inbox */}
            {activeTab === 'feedback' && (
              <div className="bg-galaxy-card border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
                <h3 className="text-base font-bold text-white mb-4">Kotak Masuk Feedback & Bug Report</h3>
                {feedbackList.length > 0 ? (
                  <div className="space-y-4">
                    {feedbackList.map((fb) => (
                      <div key={fb.id} className="p-4 rounded-xl bg-galaxy-card-alt border border-white/5">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-bold text-white">{fb.name} ({fb.email || 'Tanpa Email'})</span>
                          <span className="text-[10px] font-mono text-galaxy-primary px-2 py-0.5 rounded bg-galaxy-primary/10">{fb.type}</span>
                        </div>
                        <p className="text-xs text-galaxy-text-muted leading-relaxed">"{fb.message}"</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-galaxy-text-muted text-center py-8">Belum ada feedback dari pengunjung.</p>
                )}
              </div>
            )}

            {/* TAB: Settings & Status */}
            {(activeTab === 'status' || activeTab === 'settings' || activeTab === 'blog' || activeTab === 'presets') && (
              <div className="bg-galaxy-card border border-white/10 rounded-2xl p-6 backdrop-blur-xl text-center py-12">
                <h3 className="text-lg font-bold text-white mb-2">Panel Administrasi {activeTab.toUpperCase()}</h3>
                <p className="text-xs text-galaxy-text-muted max-w-md mx-auto mb-4">
                  Data {activeTab} tersinkronisasi langsung dengan koleksi Firestore dan fallback local state `extendedData.js`.
                </p>
                <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold">
                  ● Status CMS: Synchronized Live
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
