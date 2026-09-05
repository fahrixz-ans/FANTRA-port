import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { extendedData } from '../data/extendedData'

export default function ProjectsExplorer() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const categories = ['All', 'Web Development', 'CapCut & Creator', 'Design & Store', 'Technology']

  const projects = extendedData.detailedProjects.filter((proj) => {
    const matchesCat = selectedCategory === 'All' || proj.category === selectedCategory
    const matchesQuery = searchQuery === '' || 
      proj.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.technologies.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      proj.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCat && matchesQuery
  })

  return (
    <div className="min-h-screen bg-galaxy-bg text-galaxy-text font-sans">
      <SEO 
        title="Project Explorer — FahriXz Official Projects"
        description="Jelajahi seluruh proyek web development, template CapCut, desain logo, dan teknologi garapan FahriXz (Fahri Andrian Saputra)."
      />
      <Navbar />

      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 border-b border-white/10 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-galaxy-primary/10 border border-galaxy-primary/30 text-galaxy-primary text-xs font-semibold mb-3">
              FahriXz Official Portfolio
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-2">
              PROJECT EXPLORER
            </h1>
            <p className="text-galaxy-text-muted text-sm sm:text-base max-w-2xl">
              Showcase resmi proyek aplikasi web, karya kreator CapCut/Alight Motion, dan riset teknologi oleh FahriXz.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/projects/compare"
              className="px-4 py-2.5 rounded-xl bg-galaxy-card-alt border border-white/20 text-white hover:border-galaxy-primary text-xs font-bold transition-all flex items-center gap-2"
            >
              <span>Compare Projects</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-8">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-galaxy-primary text-galaxy-bg shadow-md shadow-galaxy-primary/20 font-bold'
                    : 'bg-galaxy-card/80 border border-white/10 text-galaxy-text hover:bg-galaxy-card-alt'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari proyek atau teknologi..."
              className="w-full px-4 py-2.5 pl-10 rounded-xl bg-galaxy-card border border-white/10 text-white placeholder-galaxy-text-muted text-xs focus:outline-none focus:border-galaxy-primary transition-colors"
            />
            <svg className="w-4 h-4 text-galaxy-text-muted absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Project Cards Grid */}
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {projects.map((proj) => (
              <motion.div
                key={proj.id}
                whileHover={{ y: -5 }}
                className="bg-galaxy-card border border-white/10 hover:border-galaxy-primary/40 rounded-2xl overflow-hidden backdrop-blur-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-video overflow-hidden bg-black/40">
                    <img
                      src={proj.thumbnail}
                      alt={`Proyek ${proj.name} - FahriXz`}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-galaxy-bg/80 backdrop-blur-md text-galaxy-primary text-[11px] font-bold border border-galaxy-primary/30">
                        {proj.category}
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-400 text-[11px] font-bold border border-emerald-500/30">
                        {proj.status}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-white group-hover:text-galaxy-primary transition-colors">
                        {proj.name}
                      </h3>
                      <span className="text-xs font-mono text-galaxy-text-muted px-2 py-0.5 rounded bg-white/5">
                        {proj.year}
                      </span>
                    </div>

                    <p className="text-xs text-galaxy-text-muted mb-4 line-clamp-3 leading-relaxed">
                      {proj.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {proj.technologies.map((t, idx) => (
                        <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-galaxy-text border border-white/10">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-0 border-t border-white/10 pt-4 flex items-center justify-between">
                  <span className="text-xs text-galaxy-text-muted font-mono">
                    Version: {proj.version}
                  </span>

                  <Link
                    to={`/projects/${proj.slug}`}
                    className="px-4 py-2 rounded-lg bg-galaxy-primary text-galaxy-bg font-bold text-xs hover:opacity-90 transition-opacity flex items-center gap-1.5 shadow-md shadow-galaxy-primary/20"
                  >
                    <span>Detail & Live Demo</span>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-galaxy-card/40 rounded-2xl border border-white/10">
            <p className="text-galaxy-text-muted text-sm mb-2">Tidak ada proyek yang sesuai dengan kriteria pencarian.</p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="text-xs font-bold text-galaxy-primary hover:underline cursor-pointer"
            >
              Reset Filter & Search
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
