import SEO from '../components/SEO'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { extendedData } from '../data/extendedData'

export default function ActivityFeedPage() {
  return (
    <div className="min-h-screen bg-galaxy-bg text-galaxy-text font-sans">
      <SEO 
        title="Activity Feed — FahriXz Real-Time Log"
        description="Log riwayat aktivitas, pembaruan proyek, rilis preset, dan milestone karier FahriXz (Fahri Andrian Saputra)."
      />
      <Navbar />

      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-2">
            ACTIVITY FEED
          </h1>
          <p className="text-galaxy-text-muted text-sm">
            Riwayat pembaruan proyek, aktivitas pembuatan konten, dan milestone FahriXz.
          </p>
        </div>

        <div className="bg-galaxy-card border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-xl space-y-6">
          {extendedData.activityFeed.map((act) => (
            <div key={act.id} className="p-4 rounded-xl bg-galaxy-card-alt border border-white/5 flex items-start gap-4">
              <span className="px-2.5 py-1 rounded bg-galaxy-primary/20 text-galaxy-primary text-[10px] font-bold font-mono border border-galaxy-primary/30">
                {act.badge}
              </span>
              <div>
                <h3 className="text-sm font-bold text-white mb-1">{act.title}</h3>
                <span className="text-xs text-galaxy-text-muted font-mono">{act.date} • {act.category}</span>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
