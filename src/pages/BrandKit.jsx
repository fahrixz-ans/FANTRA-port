import SEO from '../components/SEO'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { extendedData } from '../data/extendedData'

export default function BrandKit() {
  const { brandKit } = extendedData

  return (
    <div className="min-h-screen bg-galaxy-bg text-galaxy-text font-sans">
      <SEO 
        title="Brand Kit & Assets — FahriXz Official Guidelines"
        description="Panduan identitas visual, logo, skema warna, dan tata letak resmi brand FahriXz (Fahri Andrian Saputra)."
      />
      <Navbar />

      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-galaxy-primary/10 border border-galaxy-primary/30 text-galaxy-primary text-xs font-semibold mb-3">
            FahriXz Official Visual Assets
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-3">
            BRAND KIT & GUIDELINES
          </h1>
          <p className="text-galaxy-text-muted text-sm sm:text-base">
            Identitas resmi brand {brandKit.brandName} ({brandKit.fullName}): Logo, skema warna galaksi, tipografi, dan asset publikasi.
          </p>
        </div>

        {/* Brand Colors Swatches */}
        <div className="bg-galaxy-card border border-white/10 rounded-2xl p-6 sm:p-8 mb-12 backdrop-blur-xl">
          <h2 className="text-xl font-bold text-white mb-6">Skema Warna Resmi Brand</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {brandKit.colors.map((c, i) => (
              <div key={i} className="bg-galaxy-card-alt border border-white/10 rounded-xl overflow-hidden">
                <div className="h-24 w-full" style={{ backgroundColor: c.hex }} />
                <div className="p-4">
                  <h3 className="text-sm font-bold text-white mb-1">{c.name}</h3>
                  <p className="font-mono text-xs text-galaxy-primary mb-2">{c.hex}</p>
                  <p className="text-[11px] text-galaxy-text-muted">{c.usage}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Typography */}
        <div className="bg-galaxy-card border border-white/10 rounded-2xl p-6 sm:p-8 mb-12 backdrop-blur-xl">
          <h2 className="text-xl font-bold text-white mb-6">Tipografi & Himpunan Font</h2>
          <div className="space-y-4">
            {brandKit.typography.map((t, i) => (
              <div key={i} className="p-4 rounded-xl bg-galaxy-card-alt border border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div>
                  <h3 className="text-sm font-bold text-white">{t.name}</h3>
                  <p className="text-xs text-galaxy-text-muted">{t.usage}</p>
                </div>
                <span className="font-mono text-xs text-galaxy-primary font-bold px-3 py-1 rounded bg-galaxy-primary/10 border border-galaxy-primary/20">
                  {t.font}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Asset Downloads */}
        <div className="bg-galaxy-card border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-xl">
          <h2 className="text-xl font-bold text-white mb-6">Unduh Asset & Panduan</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {brandKit.downloads.map((d, i) => (
              <a
                key={i}
                href={d.url}
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-xl bg-galaxy-card-alt border border-white/10 hover:border-galaxy-primary transition-all flex items-center justify-between group"
              >
                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-galaxy-primary transition-colors">{d.name}</h3>
                  <span className="text-xs text-galaxy-text-muted font-mono">{d.size} • {d.format}</span>
                </div>
                <span className="px-3 py-1 rounded-lg bg-galaxy-primary text-galaxy-bg font-bold text-xs">
                  Unduh &rarr;
                </span>
              </a>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
