import SEO from '../components/SEO'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { extendedData } from '../data/extendedData'

export default function BuildInPublicPage() {
  return (
    <div className="min-h-screen bg-galaxy-bg text-galaxy-text font-sans">
      <SEO 
        title="Build In Public — FahriXz Development Tracker"
        description="Transparansi progres pembangunan proyek, fitur yang sedang dikerjakan, dan checklist tugas FahriXz."
      />
      <Navbar />

      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold mb-3">
            Transparent Development Log
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-2">
            BUILD IN PUBLIC
          </h1>
          <p className="text-galaxy-text-muted text-sm">
            Melihat langsung proses pembangunan proyek digital FahriXz secara terbuka dan berkelanjutan.
          </p>
        </div>

        <div className="space-y-8">
          {extendedData.buildInPublic.map((bip, i) => (
            <div key={i} className="bg-galaxy-card border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-xl">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xl font-bold text-white">{bip.projectName}</h3>
                <span className="font-mono text-xs font-bold text-blue-400">{bip.progress}% Selesai</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2.5 rounded-full bg-white/10 overflow-hidden mb-6">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-galaxy-primary transition-all duration-500"
                  style={{ width: `${bip.progress}%` }}
                />
              </div>

              <div className="space-y-2">
                {bip.tasks.map((task, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-xs text-galaxy-text-muted">
                    <span className={`w-4 h-4 rounded flex items-center justify-center text-[10px] font-bold ${
                      task.done ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-white/5 text-white/40 border border-white/10'
                    }`}>
                      {task.done ? '✓' : ''}
                    </span>
                    <span className={task.done ? 'line-through text-white/50' : 'text-white font-medium'}>
                      {task.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
