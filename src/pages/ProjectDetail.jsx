import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import SEO from '../components/SEO'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { extendedData } from '../data/extendedData'

export default function ProjectDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()

  const project = extendedData.detailedProjects.find(
    (p) => p.slug === slug || p.id === slug
  ) || extendedData.detailedProjects[0]

  const [deviceMode, setDeviceMode] = useState('desktop') // 'desktop' | 'tablet' | 'mobile'

  if (!project) {
    return (
      <div className="min-h-screen bg-galaxy-bg text-galaxy-text flex flex-col justify-center items-center p-4">
        <h1 className="text-2xl font-bold mb-4">Proyek tidak ditemukan</h1>
        <Link to="/projects" className="text-galaxy-primary underline">Kembali ke Project Explorer</Link>
      </div>
    )
  }

  const getDeviceWidth = () => {
    switch (deviceMode) {
      case 'mobile': return 'max-w-[375px]'
      case 'tablet': return 'max-w-[768px]'
      default: return 'w-full'
    }
  }

  return (
    <div className="min-h-screen bg-galaxy-bg text-galaxy-text font-sans">
      <SEO 
        title={`${project.name} — FahriXz Official Project`}
        description={project.description}
      />
      <Navbar />

      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-galaxy-text-muted mb-6">
          <Link to="/" className="hover:text-galaxy-primary">Home</Link>
          <span>/</span>
          <Link to="/projects" className="hover:text-galaxy-primary">Projects</Link>
          <span>/</span>
          <span className="text-white font-semibold">{project.name}</span>
        </div>

        {/* Hero Header */}
        <div className="bg-galaxy-card border border-white/10 rounded-2xl p-6 sm:p-8 mb-10 backdrop-blur-xl">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-galaxy-primary/20 text-galaxy-primary text-xs font-bold border border-galaxy-primary/30">
                {project.category}
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                {project.status}
              </span>
              <span className="text-xs font-mono text-galaxy-text-muted">
                {project.version} ({project.year})
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Link
                to={`/projects/compare?p1=${project.slug}`}
                className="px-3.5 py-1.5 rounded-lg bg-galaxy-card-alt border border-white/20 text-xs font-bold hover:border-galaxy-primary transition-colors"
              >
                Compare Specs
              </Link>
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-1.5 rounded-lg bg-galaxy-primary text-galaxy-bg font-bold text-xs hover:opacity-90 transition-opacity"
                >
                  Buka Link Resmi
                </a>
              )}
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white mb-3">
            {project.name}
          </h1>
          <p className="text-galaxy-text-muted text-sm sm:text-base max-w-3xl mb-6">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, idx) => (
              <span key={idx} className="text-xs px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-galaxy-text font-mono">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Live Demo Device Interactive Preview */}
        <div className="bg-galaxy-card border border-white/10 rounded-2xl p-6 mb-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 border-b border-white/10 pb-4">
            <div>
              <h2 className="text-lg font-bold text-white">Live Project Demo & Device Preview</h2>
              <p className="text-xs text-galaxy-text-muted">Ganti mode perangkat untuk melihat tampilan responsif.</p>
            </div>

            {/* Mode Toggles */}
            <div className="flex items-center bg-galaxy-card-alt p-1 rounded-xl border border-white/10">
              <button
                onClick={() => setDeviceMode('desktop')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                  deviceMode === 'desktop' ? 'bg-galaxy-primary text-galaxy-bg' : 'text-galaxy-text-muted'
                }`}
              >
                Desktop
              </button>
              <button
                onClick={() => setDeviceMode('tablet')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                  deviceMode === 'tablet' ? 'bg-galaxy-primary text-galaxy-bg' : 'text-galaxy-text-muted'
                }`}
              >
                Tablet
              </button>
              <button
                onClick={() => setDeviceMode('mobile')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                  deviceMode === 'mobile' ? 'bg-galaxy-primary text-galaxy-bg' : 'text-galaxy-text-muted'
                }`}
              >
                Mobile
              </button>
            </div>
          </div>

          <div className="flex justify-center bg-black/50 p-4 rounded-xl border border-white/10 min-h-[360px] overflow-hidden">
            <div className={`transition-all duration-300 mx-auto ${getDeviceWidth()} w-full bg-galaxy-card-alt rounded-lg overflow-hidden border border-white/20 shadow-2xl`}>
              {/* Device Frame Header */}
              <div className="bg-galaxy-bg px-4 py-2 flex items-center justify-between border-b border-white/10 text-xs font-mono text-galaxy-text-muted">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                </div>
                <span className="truncate max-w-[200px]">{project.demoUrl || 'FahriXz Preview Frame'}</span>
                <span className="uppercase text-[10px]">{deviceMode}</span>
              </div>

              {/* Preview Content */}
              <div className="p-4 flex flex-col items-center justify-center text-center py-10">
                <img
                  src={project.thumbnail}
                  alt={`Preview ${project.name}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full max-h-[300px] object-cover rounded-lg mb-4 border border-white/10"
                />
                <h3 className="text-base font-bold text-white mb-1">{project.name}</h3>
                <p className="text-xs text-galaxy-text-muted max-w-md mb-4">{project.description}</p>
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-lg bg-galaxy-primary text-galaxy-bg font-bold text-xs"
                  >
                    Buka Preview Langsung &rarr;
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Project Health & Health Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Health Monitor */}
          <div className="bg-galaxy-card border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              Project Health Status
            </h3>
            <div className="space-y-3 font-mono text-xs">
              {Object.entries(project.health || {}).map(([key, status]) => (
                <div key={key} className="flex justify-between items-center p-2.5 rounded-lg bg-galaxy-card-alt border border-white/5">
                  <span className="capitalize text-galaxy-text-muted">{key}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    status === 'ACTIVE' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  }`}>
                    {status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Contributors */}
          <div className="bg-galaxy-card border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Project Contributors</h3>
            <div className="space-y-3">
              {project.contributors?.map((c, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-galaxy-card-alt border border-white/5">
                  <img src={c.avatar} alt={c.name} className="w-10 h-10 rounded-full object-cover border border-white/20" />
                  <div>
                    <h4 className="text-sm font-bold text-white">{c.name}</h4>
                    <p className="text-xs text-galaxy-text-muted">{c.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Project Story Timeline */}
        {project.story && (
          <div className="bg-galaxy-card border border-white/10 rounded-2xl p-6 sm:p-8 mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Project Story & Journey</h2>
            <div className="space-y-6 border-l-2 border-galaxy-primary/30 pl-4 sm:pl-6">
              {Object.entries(project.story).map(([phase, text]) => (
                <div key={phase} className="relative">
                  <div className="absolute -left-[23px] sm:-left-[31px] top-0 w-3 h-3 rounded-full bg-galaxy-primary border-2 border-galaxy-bg" />
                  <span className="uppercase text-[11px] font-bold font-mono text-galaxy-primary mb-1 block">
                    {phase}
                  </span>
                  <p className="text-xs sm:text-sm text-galaxy-text leading-relaxed bg-galaxy-card-alt/60 p-3 rounded-xl border border-white/5">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Changelog & Roadmap Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Changelog */}
          <div className="bg-galaxy-card border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Project Changelog</h3>
            <div className="space-y-4">
              {project.changelog?.map((ch, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-galaxy-card-alt border border-white/5">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-mono text-xs font-bold text-galaxy-primary">{ch.version}</span>
                    <span className="text-[10px] text-galaxy-text-muted">{ch.date}</span>
                  </div>
                  {ch.new && (
                    <div className="mb-2">
                      <span className="text-[10px] font-bold text-emerald-400 block mb-1">NEW:</span>
                      <ul className="list-disc list-inside text-xs text-galaxy-text-muted space-y-0.5">
                        {ch.new.map((n, i) => <li key={i}>{n}</li>)}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Roadmap */}
          <div className="bg-galaxy-card border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Project Roadmap</h3>
            <div className="space-y-3">
              {project.roadmap?.map((rm, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 rounded-xl bg-galaxy-card-alt border border-white/5">
                  <div>
                    <h4 className="text-xs font-bold text-white">{rm.title}</h4>
                    <span className="text-[10px] text-galaxy-text-muted">{rm.category}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    rm.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-blue-500/20 text-blue-400'
                  }`}>
                    {rm.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
