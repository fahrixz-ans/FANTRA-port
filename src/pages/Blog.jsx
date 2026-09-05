import { useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { articles } from '../data/articlesData'

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const categories = ['All', 'Content Creation', 'Bisnis & Entrepreneurship', 'Bisnis & Ritel', 'Web Dev', 'AI & Tech']

  const filteredArticles = articles.filter((art) => {
    const matchesCat = selectedCategory === 'All' || art.category === selectedCategory
    const matchesQuery = searchQuery === '' || 
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.tags?.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCat && matchesQuery
  })

  return (
    <div className="min-h-screen bg-galaxy-bg text-galaxy-text font-sans">
      <SEO 
        title="Blog & Wawasan — FahriXz Official Articles"
        description="Artikel, panduan preset CapCut, pengalaman bisnis online FahriXz Store, dan strategi operasional oleh FahriXz (Fahri Andrian Saputra)."
      />
      <Navbar />

      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-3">
            FahriXz Official Blog & Articles
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-3">
            BLOG & WAWASAN
          </h1>
          <p className="text-galaxy-text-muted text-sm sm:text-base">
            Kumpulan artikel original, panduan pembuatan preset CapCut, pengalaman riil pengelolaan FahriXz Store, dan operasional bisnis.
          </p>
        </div>

        {/* Filter & Search Controls */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-10">
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-emerald-500 text-galaxy-bg font-bold shadow-md shadow-emerald-500/20'
                    : 'bg-galaxy-card border border-white/10 text-galaxy-text hover:bg-galaxy-card-alt'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari artikel atau topik..."
              className="w-full px-4 py-2 rounded-xl bg-galaxy-card border border-white/10 text-white placeholder-galaxy-text-muted text-xs focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredArticles.map((art) => (
            <article
              key={art.id}
              className="bg-galaxy-card border border-white/10 hover:border-emerald-500/40 rounded-2xl overflow-hidden backdrop-blur-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-video overflow-hidden bg-black/40">
                  <img
                    src={art.featuredImage}
                    alt={art.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-emerald-500/80 text-galaxy-bg text-[10px] font-bold">
                    {art.category}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 text-[11px] text-galaxy-text-muted mb-2 font-mono">
                    <span>{art.date}</span>
                    <span>•</span>
                    <span>{art.readTime}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors mb-2 leading-snug">
                    {art.title}
                  </h3>

                  <p className="text-xs text-galaxy-text-muted mb-4 line-clamp-3 leading-relaxed">
                    {art.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {art.tags?.map((t, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-galaxy-text-muted border border-white/5">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-white/10 pt-4 flex justify-between items-center">
                <span className="text-xs font-bold text-white">{art.author}</span>
                <Link
                  to={`/artikel/${art.slug}`}
                  className="text-xs font-bold text-emerald-400 hover:underline flex items-center gap-1"
                >
                  Baca Selengkapnya &rarr;
                </Link>
              </div>
            </article>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
