import SEO from '../components/SEO'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { extendedData } from '../data/extendedData'

export default function Garden() {
  return (
    <div className="min-h-screen bg-galaxy-bg text-galaxy-text font-sans">
      <SEO 
        title="Digital Garden — FahriXz Notes & Learning Logs"
        description="Catatan belajar, pemikiran teknologi, dan dokumentasi perkembangan proyek digital FahriXz (Fahri Andrian Saputra)."
      />
      <Navbar />

      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-3">
            Digital Notes & Seeds
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-3">
            DIGITAL GARDEN
          </h1>
          <p className="text-galaxy-text-muted text-sm sm:text-base">
            Catatan belajar informal, eksperimen kecil, dan pemikiran seputar teknologi web dan pembuatan konten.
          </p>
        </div>

        <div className="space-y-6 max-w-4xl mx-auto">
          {extendedData.digitalGarden.map((note) => (
            <div key={note.id} className="bg-galaxy-card border border-white/10 rounded-2xl p-6 backdrop-blur-xl hover:border-emerald-500/30 transition-all">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-mono text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                  {note.category}
                </span>
                <span className="text-xs text-galaxy-text-muted font-mono">{note.date}</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{note.title}</h3>
              <p className="text-xs text-galaxy-text-muted mb-4 leading-relaxed">{note.excerpt}</p>
              <div className="flex flex-wrap gap-1.5">
                {note.tags.map((t, i) => (
                  <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-galaxy-text-muted border border-white/5">
                    #{t}
                  </span>
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
