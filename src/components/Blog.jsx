import { useState, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ScrollReveal from './ScrollReveal'
import { usePortfolio } from '../context/PortfolioContext'
import { soundManager } from '../lib/soundManager'

export default function Blog() {
  const navigate = useNavigate()
  const { articles = [] } = usePortfolio()
  const [summaries, setSummaries] = useState({})
  const [loadingId, setLoadingId] = useState(null)
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const categories = [
    'All',
    'Web Dev',
    'Marketing',
    'AI & Tech',
    'Content Creation',
    'Bisnis & Entrepreneurship',
    'Bisnis & Ritel',
  ]

  const handleSummarize = async (e, article) => {
    e.stopPropagation()
    e.preventDefault()

    if (summaries[article.id]) return
    soundManager.play('click')
    setLoadingId(article.id)

    try {
      const res = await fetch('/api/ai/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: article.content, title: article.title }),
      })
      if (!res.ok) throw new Error('AI Server error')
      const data = await res.json()
      setSummaries((prev) => ({ ...prev, [article.id]: data.summary }))
      soundManager.play('success')
    } catch (err) {
      soundManager.play('error')
      setSummaries((prev) => ({
        ...prev,
        [article.id]: 'Ringkasan AI: Poin-poin penting pengembangan, strategi, dan penerapan praktis.',
      }))
    } finally {
      setLoadingId(null)
    }
  }

  // Filter & Search Logic across Title, Category, Tags, Excerpt, and Content
  const filteredArticles = useMemo(() => {
    return articles.filter((art) => {
      const matchesCategory = activeCategory === 'All' || art.category === activeCategory

      if (!searchQuery.trim()) return matchesCategory

      const query = searchQuery.toLowerCase()
      const titleMatch = art.title.toLowerCase().includes(query)
      const categoryMatch = art.category.toLowerCase().includes(query)
      const excerptMatch = (art.excerpt || art.snippet || '').toLowerCase().includes(query)
      const contentMatch = (art.content || '').toLowerCase().includes(query)
      const tagMatch = art.tags ? art.tags.some((t) => t.toLowerCase().includes(query)) : false

      return matchesCategory && (titleMatch || categoryMatch || excerptMatch || contentMatch || tagMatch)
    })
  }, [activeCategory, searchQuery])

  const handleCardClick = (art) => {
    soundManager.play('project-open')
    navigate(`/artikel/${art.slug}`)
  }

  return (
    <section id="articles" className="py-20 md:py-28 overflow-hidden relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-galaxy-primary/10 border border-galaxy-primary/20 text-xs font-semibold text-galaxy-primary mb-3">
                ARTIKEL & WAWASAN
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-galaxy-text mb-3">
                Catatan & Artikel Terbaru
              </h2>
              <p className="text-galaxy-muted text-sm sm:text-base max-w-2xl">
                Opini, tutorial, dan catatan pengalaman seputar pengembangan web, video editing, strategi bisnis digital, dan teknologi AI.
              </p>
            </div>

            {/* Article Search Box */}
            <div className="w-full md:w-80 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  soundManager.play('search')
                  setSearchQuery(e.target.value)
                }}
                placeholder="Cari judul, tag, atau isi artikel..."
                className="w-full bg-galaxy-card border border-white/10 rounded-full py-2.5 pl-10 pr-4 text-xs text-galaxy-text placeholder:text-galaxy-muted focus:outline-none focus:border-galaxy-primary transition-colors shadow-inner"
              />
              <span className="absolute left-3.5 top-2.5 text-galaxy-muted text-sm">🔍</span>
              {searchQuery && (
                <button
                  onClick={() => {
                    soundManager.play('click')
                    setSearchQuery('')
                  }}
                  className="absolute right-3 top-2.5 text-xs text-galaxy-muted hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </ScrollReveal>

        {/* Category Filters */}
        <ScrollReveal delay={0.1}>
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  soundManager.play('filter')
                  setActiveCategory(cat)
                }}
                onMouseEnter={() => soundManager.play('hover-soft')}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  activeCategory === cat
                    ? 'bg-galaxy-primary text-galaxy-bg font-bold shadow-md shadow-galaxy-primary/20 scale-105'
                    : 'bg-galaxy-card border border-white/5 text-galaxy-muted hover:text-galaxy-text hover:border-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Articles Grid */}
        {filteredArticles.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-6">
            {filteredArticles.map((art, i) => (
              <ScrollReveal key={art.id} delay={0.08 + i * 0.06}>
                <div
                  onClick={() => handleCardClick(art)}
                  onMouseEnter={() => soundManager.play('hover-soft')}
                  className="galaxy-card p-6 flex flex-col justify-between h-full border border-white/5 hover:border-galaxy-primary/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-galaxy-primary/5 cursor-pointer group rounded-2xl relative overflow-hidden"
                >
                  <div>
                    {/* Category & Read Time */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="px-2.5 py-0.5 rounded-md bg-galaxy-primary/10 border border-galaxy-primary/20 text-galaxy-primary font-mono text-[10px] font-bold">
                        {art.category}
                      </span>
                      <span className="text-xs text-galaxy-muted font-mono">{art.readTime}</span>
                    </div>

                    {/* Article Title - Linkable */}
                    <h3 className="text-base sm:text-lg font-bold text-galaxy-text mb-2 group-hover:text-galaxy-primary transition-colors line-clamp-2 leading-snug">
                      <Link
                        to={`/artikel/${art.slug}`}
                        onClick={(e) => {
                          e.stopPropagation()
                          soundManager.play('project-open')
                        }}
                      >
                        {art.title}
                      </Link>
                    </h3>

                    {/* Excerpt */}
                    <p className="text-xs text-galaxy-muted leading-relaxed mb-4 line-clamp-3">
                      {art.excerpt || art.snippet}
                    </p>

                    {/* AI Summary Banner if generated */}
                    {summaries[art.id] && (
                      <div className="p-3 mb-4 rounded-xl bg-galaxy-primary/10 border border-galaxy-primary/30 text-galaxy-text text-xs animate-fade-in shadow-inner">
                        <span className="font-bold text-galaxy-primary block mb-1">
                          ✨ AI Ringkasan Otomatis:
                        </span>
                        {summaries[art.id]}
                      </div>
                    )}
                  </div>

                  {/* Footer Action Bar */}
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-4">
                    <span className="text-[11px] text-galaxy-muted font-mono">{art.date}</span>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={(e) => handleSummarize(e, art)}
                        disabled={loadingId === art.id}
                        className="text-[11px] text-galaxy-primary hover:underline font-semibold flex items-center gap-1"
                        title="Ringkas otomatis dengan AI"
                      >
                        {loadingId === art.id ? (
                          <span>Memuat AI...</span>
                        ) : summaries[art.id] ? (
                          <span>Tersimpan</span>
                        ) : (
                          <span>✨ Ringkas AI</span>
                        )}
                      </button>

                      <span className="text-xs font-bold text-galaxy-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        <span>Baca Artikel</span>
                        <span>→</span>
                      </span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-galaxy-card rounded-2xl border border-white/5">
            <p className="text-galaxy-muted text-sm mb-3">
              Tidak ada artikel yang cocok dengan pencarian "{searchQuery}".
            </p>
            <button
              onClick={() => {
                soundManager.play('click')
                setSearchQuery('')
                setActiveCategory('All')
              }}
              className="btn-outline text-xs py-1.5 px-4"
            >
              Reset Filter & Pencarian
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
