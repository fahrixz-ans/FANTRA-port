import { data } from '../data/portfolioData'
import ScrollReveal from './ScrollReveal'

function EducationCard({ item, index }) {
  const hasLogo = item.logoPath && !item.logoPath.includes('placeholder')

  return (
    <ScrollReveal delay={index * 0.1}>
      <div
        className={`galaxy-card p-6 h-full flex flex-col justify-between relative overflow-hidden transition-all duration-300 ${
          item.isHighlighted
            ? 'border-galaxy-primary/40 bg-gradient-to-b from-galaxy-card to-galaxy-card-alt shadow-lg shadow-galaxy-primary/5'
            : 'hover:border-white/20'
        }`}
      >
        {item.isHighlighted && (
          <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-galaxy-primary text-galaxy-bg">
            Pendidikan Terakhir
          </span>
        )}

        <div>
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/10 p-2 flex items-center justify-center shrink-0 shadow-md">
              {hasLogo ? (
                <img
                  src={item.logoPath}
                  alt={`Logo Instansi Pendidikan ${item.nama} - Riwayat Pendidikan FahriXz (Fahri Andrian Saputra)`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-contain"
                />
              ) : (
                <span className="text-lg font-bold text-galaxy-primary">
                  {item.tingkat || item.nama.charAt(0)}
                </span>
              )}
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono text-galaxy-primary font-bold tracking-wider">
                  {item.tahun}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold">
                  {item.status}
                </span>
              </div>
              <h3 className="text-galaxy-text font-bold text-base sm:text-lg leading-snug">
                {item.nama}
              </h3>
            </div>
          </div>

          <p className="text-galaxy-muted text-xs mb-3">
            📍 {item.kota}
          </p>

          {item.jurusan && (
            <div className="p-3 bg-galaxy-card-alt rounded-lg border border-white/5 mb-3">
              <span className="text-[11px] text-galaxy-muted block mb-0.5 font-mono">
                Jurusan / Program Studi:
              </span>
              <span className="text-xs font-bold text-galaxy-primary">
                {item.jurusan}
              </span>
            </div>
          )}

          {item.detail && (
            <p className="text-xs text-galaxy-muted leading-relaxed italic">
              {item.detail}
            </p>
          )}
        </div>
      </div>
    </ScrollReveal>
  )
}

export default function Education() {
  const educationList = data.education || []

  return (
    <section id="education" className="py-20 md:py-28 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-galaxy-primary/10 border border-galaxy-primary/20 text-xs font-semibold text-galaxy-primary mb-3">
            RIWAYAT PENDIDIKAN
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-galaxy-text mb-3">
            Pendidikan Resmi
          </h2>
          <p className="text-galaxy-muted text-base max-w-2xl mb-12">
            Jejak langkah pendidikan formal dari tingkat Sekolah Dasar hingga Sekolah Menengah Kejuruan Bisnis Digital.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {educationList.map((item, i) => (
            <EducationCard key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
