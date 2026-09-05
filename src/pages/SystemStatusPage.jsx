import SEO from '../components/SEO'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { extendedData } from '../data/extendedData'

export default function SystemStatusPage() {
  return (
    <div className="min-h-screen bg-galaxy-bg text-galaxy-text font-sans">
      <SEO 
        title="System Status — FahriXz Operational Status"
        description="Status operasional real-time layanan web, API Gemini, link sosial media, dan saluran FahriXz Store."
      />
      <Navbar />

      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            All Systems Operational
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-2">
            SYSTEM STATUS
          </h1>
          <p className="text-galaxy-text-muted text-sm">
            Pantau ketersediaan dan performa layanan ekosistem digital FahriXz secara langsung.
          </p>
        </div>

        <div className="bg-galaxy-card border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-xl">
          <div className="space-y-4">
            {extendedData.systemStatus.map((s, i) => (
              <div key={i} className="p-4 rounded-xl bg-galaxy-card-alt border border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div>
                  <h3 className="text-sm font-bold text-white mb-1">{s.service}</h3>
                  <p className="text-xs text-galaxy-text-muted font-mono">Uptime: {s.uptime} • Latency: {s.responseTime}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold font-mono ${
                  s.status === 'OPERATIONAL' 
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                    : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                }`}>
                  ● {s.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
