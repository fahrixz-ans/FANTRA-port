import ScrollReveal from './ScrollReveal'
import { extendedData } from '../data/extendedData'

export default function NowStatusUpdates() {
  const { nowStatus } = extendedData

  return (
    <section id="now" className="py-20 md:py-28 overflow-hidden relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-semibold text-cyan-400 mb-3">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            LIVE STATUS & NOW PAGE
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-galaxy-text mb-3">
            Status & Changelog Website
          </h2>
          <p className="text-galaxy-muted text-base max-w-2xl mb-12">
            Fokus aktivitas saat ini, pembaruan versi website, dan metrik sistem secara langsung.
          </p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left - Now & Status */}
          <div className="lg:col-span-6 space-y-6">
            <ScrollReveal delay={0.1}>
              <div className="galaxy-card p-6 border border-cyan-500/20 bg-cyan-500/5">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg">📌</span>
                  <h3 className="text-lg font-bold text-galaxy-text">Apa yang Sedang Dikerjakan?</h3>
                </div>
                <p className="text-sm text-galaxy-text leading-relaxed mb-4">
                  "{nowStatus.currentFocus}"
                </p>
                <div className="space-y-2 text-xs text-galaxy-muted font-mono pt-3 border-t border-white/10">
                  <div>🎯 Target Pembelajaran: <span className="text-galaxy-primary">{nowStatus.learningGoal}</span></div>
                  <div>📍 Domisili: <span className="text-galaxy-text">{nowStatus.location}</span></div>
                  <div>💼 Ketersediaan: <span className="text-cyan-400 font-bold">{nowStatus.statusText}</span></div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="galaxy-card p-6 grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-galaxy-card-alt border border-white/5">
                  <span className="text-xs text-galaxy-muted block mb-1">Uptime Website</span>
                  <span className="text-2xl font-bold text-cyan-400 font-mono">{nowStatus.uptime}</span>
                </div>
                <div className="p-4 rounded-xl bg-galaxy-card-alt border border-white/5">
                  <span className="text-xs text-galaxy-muted block mb-1">Versi Rilis</span>
                  <span className="text-2xl font-bold text-galaxy-primary font-mono">{nowStatus.version}</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right - Changelog */}
          <div className="lg:col-span-6">
            <ScrollReveal delay={0.25}>
              <div className="galaxy-card p-6">
                <h3 className="text-lg font-bold text-galaxy-text mb-4 flex items-center gap-2">
                  <span>📜</span> Riwayat Pembaruan (Changelog)
                </h3>
                <div className="space-y-4">
                  {nowStatus.changelog.map((item, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-galaxy-card-alt border border-white/5 text-xs space-y-1">
                      <div className="flex items-center justify-between font-mono">
                        <span className="font-bold text-galaxy-primary">{item.version}</span>
                        <span className="text-galaxy-muted">{item.date}</span>
                      </div>
                      <p className="text-galaxy-text leading-relaxed pt-1">{item.notes}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
