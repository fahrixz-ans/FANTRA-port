import { useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { extendedData } from '../data/extendedData'

export default function CreatorHub() {
  const [activeCategory, setActiveCategory] = useState('All')

  const categories = ['All', 'CapCut', 'Alight Motion', 'AR']

  const presets = extendedData.creatorPresets.filter((p) => {
    return activeCategory === 'All' || p.category === activeCategory
  })

  return (
    <div className="min-h-screen bg-galaxy-bg text-galaxy-text font-sans">
      <SEO 
        title="Creator Hub & Preset Library — FahriXz (CapCut & AM Presets)"
        description="Pusat karya kreator FahriXz: Preset CapCut viral, Alight Motion XML presets, animasi motion graphics, dan karya Augmented Reality."
      />
      <Navbar />

      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-semibold mb-3">
            FahriXz Digital Creator Suite
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-3">
            CREATOR HUB & PRESET VAULT
          </h1>
          <p className="text-galaxy-text-muted text-sm sm:text-base">
            Kumpulan preset CapCut, Alight Motion, efek visual motion graphics, dan filter Augmented Reality buatan FahriXz.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                  : 'bg-galaxy-card border border-white/10 text-galaxy-text hover:bg-galaxy-card-alt'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Presets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
          {presets.map((preset) => (
            <div
              key={preset.id}
              className="bg-galaxy-card border border-white/10 hover:border-purple-500/40 rounded-2xl overflow-hidden backdrop-blur-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-video overflow-hidden bg-black/40">
                  <img
                    src={preset.image}
                    alt={preset.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-purple-600/80 text-white text-[10px] font-bold">
                      {preset.category}
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-black/60 text-galaxy-text-muted text-[10px] font-mono">
                      {preset.duration}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors mb-2">
                    {preset.title}
                  </h3>
                  <p className="text-xs text-galaxy-text-muted mb-4 leading-relaxed">
                    {preset.description}
                  </p>

                  <div className="flex items-center gap-4 text-xs font-mono text-galaxy-text-muted border-t border-white/10 pt-3">
                    <span>Views: <strong className="text-white">{preset.views}</strong></span>
                    <span>Downloads: <strong className="text-white">{preset.downloads}</strong></span>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <a
                  href={preset.link}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 rounded-xl bg-purple-600 text-white font-bold text-xs text-center block hover:bg-purple-500 transition-colors shadow-lg shadow-purple-600/20"
                >
                  Gunakan Preset / Template ini &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Link to Before/After Showcase */}
        <div className="bg-gradient-to-r from-purple-900/30 via-galaxy-card to-indigo-900/30 border border-purple-500/30 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Lihat Hasil Transformation Before / After</h2>
          <p className="text-xs text-galaxy-text-muted max-w-xl mx-auto mb-6">
            Eksplorasi perbandingan interaktif antara foto mentah dan hasil color grading cinematic serta sketsa logo e-sports.
          </p>
          <Link
            to="/showcase"
            className="px-6 py-3 rounded-xl bg-white text-galaxy-bg font-bold text-xs hover:bg-galaxy-text transition-colors inline-block"
          >
            Buka Interactive Before / After Showcase &rarr;
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}
