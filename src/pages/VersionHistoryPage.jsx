import SEO from '../components/SEO'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { extendedData } from '../data/extendedData'

export default function VersionHistoryPage() {
  return (
    <div className="min-h-screen bg-galaxy-bg text-galaxy-text font-sans">
      <SEO 
        title="Version History — FahriXz Official Changelog"
        description="Riwayat perkembangan versi website dan ekosistem official FahriXz mulai dari versi 1.0 hingga 4.0."
      />
      <Navbar />

      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-2">
            VERSION HISTORY
          </h1>
          <p className="text-galaxy-text-muted text-sm">
            Riwayat perkembangan dan fitur baru di setiap iterasi rilis website FahriXz.
          </p>
        </div>

        <div className="space-y-8">
          {extendedData.versionHistory.map((vh, i) => (
            <div key={i} className="bg-galaxy-card border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-xl">
              <div className="flex justify-between items-center mb-3">
                <span className="font-mono font-bold text-galaxy-primary text-base px-3 py-1 rounded bg-galaxy-primary/10 border border-galaxy-primary/20">
                  {vh.version}
                </span>
                <span className="text-xs text-galaxy-text-muted font-mono">{vh.date}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{vh.title}</h3>
              <ul className="space-y-2 list-disc list-inside text-xs sm:text-sm text-galaxy-text-muted">
                {vh.highlights.map((h, idx) => (
                  <li key={idx}>{h}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
