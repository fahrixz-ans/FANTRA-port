import SEO from '../components/SEO'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { extendedData } from '../data/extendedData'

export default function ExperimentLab() {
  return (
    <div className="min-h-screen bg-galaxy-bg text-galaxy-text font-sans">
      <SEO 
        title="Experiment Lab — FahriXz Tech Prototypes"
        description="Laboratorium eksperimen teknologi, kecerdasan buatan Gemini AI, efek suara Web Audio, dan animasi galaksi oleh FahriXz."
      />
      <Navbar />

      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-3">
            FahriXz R&D Prototypes
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-3">
            EXPERIMENT LAB
          </h1>
          <p className="text-galaxy-text-muted text-sm sm:text-base">
            Ruang eksperimen pembuatan prototype UI interaktif, pengintegrasian AI Gemini 2.5 Flash, dan eksplorasi sintesis Web Audio API.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {extendedData.labExperiments.map((exp) => (
            <div key={exp.id} className="bg-galaxy-card border border-white/10 hover:border-cyan-500/40 rounded-2xl p-6 backdrop-blur-xl flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                    {exp.category}
                  </span>
                  <span className="text-[10px] font-mono text-galaxy-text-muted px-2 py-0.5 rounded bg-white/5">
                    {exp.status}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{exp.title}</h3>
                <p className="text-xs text-galaxy-text-muted mb-4 leading-relaxed">{exp.desc}</p>
              </div>

              <div className="flex flex-wrap gap-1 border-t border-white/10 pt-4">
                {exp.tech.map((t, i) => (
                  <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-galaxy-text font-mono">
                    {t}
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
