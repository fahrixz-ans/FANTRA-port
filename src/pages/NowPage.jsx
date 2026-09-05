import SEO from '../components/SEO'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { extendedData } from '../data/extendedData'

export default function NowPage() {
  const { nowStatus } = extendedData

  return (
    <div className="min-h-screen bg-galaxy-bg text-galaxy-text font-sans">
      <SEO 
        title="Now Page — What FahriXz Is Doing Now"
        description="Fokus utama, lokasi, target belajar, dan status ketersediaan terkini dari FahriXz (Fahri Andrian Saputra)."
      />
      <Navbar />

      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-galaxy-primary/10 border border-galaxy-primary/30 text-galaxy-primary text-xs font-semibold mb-3">
            Status Terkini (Now Page)
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-2">
            WHAT I'M DOING NOW
          </h1>
          <p className="text-galaxy-text-muted text-sm">
            Inspirasi dari nownownow.com — halaman publikasi fokus harian dan aktivitas FahriXz.
          </p>
        </div>

        <div className="bg-galaxy-card border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-xl space-y-6">
          <div className="p-4 rounded-xl bg-galaxy-card-alt border border-white/5">
            <span className="text-[10px] font-bold text-galaxy-primary uppercase tracking-wider block mb-1">FOKUS UTAMA SAAT INI</span>
            <p className="text-sm font-semibold text-white">{nowStatus.currentFocus}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-galaxy-card-alt border border-white/5">
              <span className="text-[10px] font-bold text-galaxy-text-muted uppercase tracking-wider block mb-1">LOKASI FISIK</span>
              <p className="text-white font-medium">{nowStatus.location}</p>
            </div>

            <div className="p-4 rounded-xl bg-galaxy-card-alt border border-white/5">
              <span className="text-[10px] font-bold text-galaxy-text-muted uppercase tracking-wider block mb-1">TARGET PEMBELAJARAN</span>
              <p className="text-white font-medium">{nowStatus.learningGoal}</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold text-center">
            {nowStatus.statusText}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
