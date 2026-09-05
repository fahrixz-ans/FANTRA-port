import { useState, useEffect, useRef, useMemo } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import ReactMarkdown from 'react-markdown'
import { motion, AnimatePresence } from 'framer-motion'
import { getArticleBySlug, getRelatedArticles, articles } from '../data/articlesData'
import { soundManager } from '../lib/soundManager'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

// Utility to create slug/id from heading text
function slugify(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
}

export default function ArticleDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()

  const [article, setArticle] = useState(null)
  const [readingProgress, setReadingProgress] = useState(0)
  const [tocOpen, setTocOpen] = useState(true)
  const [copiedLink, setCopiedLink] = useState(false)
  const [aiSummary, setAiSummary] = useState(null)
  const [loadingAi, setLoadingAi] = useState(false)
  const [aiError, setAiError] = useState(null)
  const [copiedCodeIndex, setCopiedCodeIndex] = useState(null)

  const articleContentRef = useRef(null)

  // Fetch article when slug changes
  useEffect(() => {
    const found = getArticleBySlug(slug)
    if (found) {
      setArticle(found)
      setAiSummary(null)
      setAiError(null)
      window.scrollTo({ top: 0, behavior: 'instant' })
      soundManager.play('project-open')
    } else {
      setArticle(null)
    }
  }, [slug])

  // Scroll Reading Progress Bar calculation
  useEffect(() => {
    const handleScroll = () => {
      if (!articleContentRef.current) return
      const element = articleContentRef.current
      const totalHeight = element.clientHeight - window.innerHeight + element.offsetTop
      const scrollPosition = window.scrollY

      if (totalHeight <= 0) {
        setReadingProgress(100)
        return
      }

      const currentProgress = Math.min(
        100,
        Math.max(0, Math.round((scrollPosition / totalHeight) * 100))
      )
      setReadingProgress(currentProgress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [article])

  // Extract headings from markdown content for Table of Contents
  const tableOfContents = useMemo(() => {
    if (!article || !article.content) return []
    const headingLines = article.content.split('\n').filter((line) => line.startsWith('#'))
    return headingLines.map((line) => {
      const level = line.startsWith('###') ? 3 : line.startsWith('##') ? 2 : 1
      const text = line.replace(/^#+\s*/, '').trim()
      const id = slugify(text)
      return { level, text, id }
    })
  }, [article])

  // Prev & Next article logic
  const { prevArticle, nextArticle } = useMemo(() => {
    if (!article) return { prevArticle: null, nextArticle: null }
    const currentIndex = articles.findIndex((a) => a.id === article.id || a.slug === article.slug)
    return {
      prevArticle: currentIndex > 0 ? articles[currentIndex - 1] : null,
      nextArticle: currentIndex >= 0 && currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null,
    }
  }, [article])

  // Related articles logic
  const relatedArticles = useMemo(() => {
    if (!article) return []
    return getRelatedArticles(article.slug, article.category, 3)
  }, [article])

  // Copy Link to Clipboard
  const handleCopyLink = () => {
    soundManager.play('success')
    const currentUrl = window.location.href
    navigator.clipboard.writeText(currentUrl)
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2500)
  }

  // Native or WhatsApp Share
  const handleShare = () => {
    soundManager.play('click')
    const currentUrl = window.location.href
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: currentUrl,
      }).catch(() => {})
    } else {
      const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${article.title}\n\n${currentUrl}`)}`
      window.open(waUrl, '_blank', 'noopener,noreferrer')
    }
  }

  // AI Summarize handler
  const handleSummarizeAI = async () => {
    if (aiSummary) return
    soundManager.play('click')
    setLoadingAi(true)
    setAiError(null)

    try {
      const res = await fetch('/api/ai/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: article.content, title: article.title }),
      })

      if (!res.ok) throw new Error('Gagal menghubungi AI service.')
      const data = await res.json()
      if (data.summary) {
        setAiSummary(data.summary)
        soundManager.play('success')
      } else {
        throw new Error('Ringkasan AI kosong.')
      }
    } catch (err) {
      soundManager.play('error')
      setAiError('Sistem AI sedang sibuk atau belum tersedia. Silakan baca artikel lengkap di bawah.')
    } finally {
      setLoadingAi(false)
    }
  }

  // Smooth Scroll to TOC Heading
  const scrollToHeading = (id) => {
    soundManager.play('nav-click')
    const element = document.getElementById(id)
    if (element) {
      const yOffset = -100
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  // Copy code block helper
  const handleCopyCode = (codeText, idx) => {
    soundManager.play('success')
    navigator.clipboard.writeText(codeText)
    setCopiedCodeIndex(idx)
    setTimeout(() => setCopiedCodeIndex(null), 2000)
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-galaxy-bg text-galaxy-text flex flex-col justify-between">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-32 text-center">
          <div className="inline-flex p-4 rounded-full bg-galaxy-primary/10 border border-galaxy-primary/20 text-galaxy-primary mb-4 text-3xl">
            📖
          </div>
          <h1 className="text-3xl font-bold mb-3">Artikel Tidak Ditemukan</h1>
          <p className="text-galaxy-muted mb-6">
            Artikel yang Anda cari tidak tersedia atau telah dipindahkan.
          </p>
          <button
            onClick={() => {
              soundManager.play('close')
              navigate('/#articles')
            }}
            className="btn-primary"
          >
            ← Kembali ke Daftar Artikel
          </button>
        </div>
        <Footer />
      </div>
    )
  }

  const currentUrl = typeof window !== 'undefined' ? window.location.href : ''

  return (
    <div className="min-h-screen bg-galaxy-bg text-galaxy-text selection:bg-galaxy-primary/30 selection:text-white relative">
      {/* SEO Metadata */}
      <Helmet>
        <title>{`${article.title} - Fahri Xz`}</title>
        <meta name="description" content={article.excerpt} />
        <link rel="canonical" href={currentUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.excerpt} />
        <meta property="og:image" content={article.featuredImage} />
        <meta property="og:url" content={currentUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.excerpt} />
        <meta name="twitter:image" content={article.featuredImage} />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: article.title,
            description: article.excerpt,
            image: article.featuredImage,
            author: {
              '@type': 'Person',
              name: article.author || 'Fahri Xz',
            },
            datePublished: article.date,
            mainEntityOfPage: currentUrl,
          })}
        </script>
      </Helmet>

      {/* TOP READING PROGRESS BAR (0% -> 100%) */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-white/5 z-50 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-galaxy-primary via-cyan-400 to-galaxy-primary shadow-[0_0_12px_rgba(34,211,238,0.8)]"
          style={{ width: `${readingProgress}%` }}
          transition={{ duration: 0.1, ease: 'easeOut' }}
        />
      </div>

      <Navbar />

      <main className="pt-28 pb-20 relative overflow-hidden" ref={articleContentRef}>
        {/* Background Ambient Lights */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-galaxy-primary/5 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* BREADCRUMB */}
          <nav className="flex items-center flex-wrap gap-2 text-xs text-galaxy-muted mb-8 font-mono">
            <Link
              to="/"
              onClick={() => soundManager.play('nav-click')}
              className="hover:text-galaxy-primary transition-colors flex items-center gap-1"
            >
              <span>Beranda</span>
            </Link>
            <span>/</span>
            <button
              onClick={() => {
                soundManager.play('nav-click')
                navigate('/#articles')
              }}
              className="hover:text-galaxy-primary transition-colors"
            >
              Artikel
            </button>
            <span>/</span>
            <span className="text-galaxy-primary font-semibold">{article.category}</span>
          </nav>

          {/* BACK BUTTON */}
          <div className="mb-6">
            <button
              onClick={() => {
                soundManager.play('close')
                navigate('/#articles')
              }}
              onMouseEnter={() => soundManager.play('hover-soft')}
              className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-galaxy-primary/40 hover:text-galaxy-primary transition-all group"
            >
              <span className="group-hover:-translate-x-1 transition-transform">←</span>
              <span>Kembali ke Artikel</span>
            </button>
          </div>

          {/* ARTICLE HEADER */}
          <header className="mb-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-galaxy-primary/10 border border-galaxy-primary/30 text-galaxy-primary font-mono text-xs font-bold">
                {article.category}
              </span>
              <span className="text-xs text-galaxy-muted font-mono flex items-center gap-1.5">
                <span>⏱️</span>
                <span>{article.readTime}</span>
              </span>
              <span className="text-xs text-galaxy-muted font-mono">
                📅 {article.date}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-galaxy-text leading-tight mb-6">
              {article.title}
            </h1>

            {/* AUTHOR BOX */}
            <div className="flex items-center justify-between flex-wrap gap-4 p-4 rounded-2xl bg-galaxy-card border border-white/10 mb-6">
              <div className="flex items-center gap-3">
                <img
                  src={article.authorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'}
                  alt={article.author || 'Fahri Xz'}
                  className="w-11 h-11 rounded-full object-cover border-2 border-galaxy-primary/40 shadow-md"
                />
                <div>
                  <h4 className="text-sm font-bold text-galaxy-text flex items-center gap-1.5">
                    {article.author || 'Fahri Xz'}
                    <span className="inline-block w-2 h-2 rounded-full bg-galaxy-primary animate-pulse" title="Verified Creator" />
                  </h4>
                  <p className="text-xs text-galaxy-muted">
                    {article.authorRole || 'Digital Creator & Web Developer'}
                  </p>
                </div>
              </div>

              {/* Action Buttons: AI Summary & Share */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSummarizeAI}
                  disabled={loadingAi}
                  onMouseEnter={() => soundManager.play('hover-soft')}
                  className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-galaxy-primary/15 border border-galaxy-primary/40 text-galaxy-primary hover:bg-galaxy-primary hover:text-galaxy-bg transition-all flex items-center gap-1.5 shadow-sm"
                >
                  {loadingAi ? 'Memuat AI...' : '✨ Ringkas AI'}
                </button>

                <button
                  onClick={handleShare}
                  onMouseEnter={() => soundManager.play('hover-soft')}
                  className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/5 border border-white/10 hover:border-galaxy-primary/30 text-galaxy-text transition-all flex items-center gap-1"
                  title="Bagikan Artikel"
                >
                  <span>↗️ Share</span>
                </button>

                <button
                  onClick={handleCopyLink}
                  onMouseEnter={() => soundManager.play('hover-soft')}
                  className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/5 border border-white/10 hover:border-galaxy-primary/30 text-galaxy-text transition-all flex items-center gap-1"
                >
                  {copiedLink ? (
                    <span className="text-emerald-400 font-bold">✓ Tersalin</span>
                  ) : (
                    <span>🔗 Copy Link</span>
                  )}
                </button>
              </div>
            </div>

            {/* EXCERPT CALLOUT BOX */}
            {article.excerpt && (
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-galaxy-primary/10 via-galaxy-card to-galaxy-card border-l-4 border-galaxy-primary text-galaxy-text text-sm sm:text-base leading-relaxed mb-6 font-medium">
                <span className="text-galaxy-primary font-bold block text-xs uppercase tracking-wider mb-1">
                  Ringkasan Eksekutif
                </span>
                {article.excerpt}
              </div>
            )}

            {/* AI SUMMARY DISPLAY BOX */}
            <AnimatePresence>
              {(aiSummary || aiError) && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-6 p-5 rounded-2xl bg-galaxy-card border border-galaxy-primary/30 shadow-xl shadow-galaxy-primary/5"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-galaxy-primary flex items-center gap-1.5">
                      <span>✨</span>
                      <span>Ringkasan AI (Gemini 2.5)</span>
                    </span>
                    <button
                      onClick={() => {
                        soundManager.play('close')
                        setAiSummary(null)
                        setAiError(null)
                      }}
                      className="text-xs text-galaxy-muted hover:text-white"
                    >
                      ✕
                    </button>
                  </div>
                  {aiSummary && (
                    <p className="text-xs sm:text-sm text-galaxy-text leading-relaxed">
                      {aiSummary}
                    </p>
                  )}
                  {aiError && (
                    <p className="text-xs text-rose-400">{aiError}</p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* FEATURED IMAGE */}
            {article.featuredImage && (
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl mb-8 group">
                <img
                  src={article.featuredImage}
                  alt={article.title}
                  className="w-full max-h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-4 right-4 text-[11px] text-white/70 font-mono italic">
                  Foto Ilustrasi Artikel: {article.title}
                </div>
              </div>
            )}

            {/* TAGS */}
            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-galaxy-muted text-xs font-mono"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* TABLE OF CONTENTS (TOC) - COLLAPSIBLE ON MOBILE */}
          {tableOfContents.length > 0 && (
            <div className="mb-10 rounded-2xl bg-galaxy-card border border-white/10 overflow-hidden shadow-lg">
              <div
                onClick={() => {
                  soundManager.play('click')
                  setTocOpen(!tocOpen)
                }}
                className="p-4 bg-white/5 flex items-center justify-between cursor-pointer select-none hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="text-galaxy-primary font-bold text-sm">📋 DAFTAR ISI</span>
                  <span className="text-xs text-galaxy-muted font-mono">
                    ({tableOfContents.length} bagian)
                  </span>
                </div>
                <span className="text-xs font-mono text-galaxy-primary font-bold">
                  {tocOpen ? '▲ Sembunyikan' : '▼ Tampilkan'}
                </span>
              </div>

              <AnimatePresence>
                {tocOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="p-4 sm:p-5 border-t border-white/5 space-y-2 text-xs sm:text-sm font-sans"
                  >
                    {tableOfContents.map((item, idx) => (
                      <button
                        key={item.id + idx}
                        onClick={() => scrollToHeading(item.id)}
                        className={`block text-left w-full py-1.5 px-3 rounded-lg hover:bg-galaxy-primary/10 hover:text-galaxy-primary transition-colors ${
                          item.level === 3 ? 'pl-6 text-galaxy-muted' : 'font-semibold text-galaxy-text'
                        }`}
                      >
                        <span className="font-mono text-galaxy-primary text-xs mr-2">
                          {String(idx + 1).padStart(2, '0')}.
                        </span>
                        <span>{item.text}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* ARTICLE CONTENT - RICH MARKDOWN STYLING */}
          <article className="prose prose-invert max-w-none space-y-6 text-galaxy-text text-base leading-relaxed font-sans">
            <ReactMarkdown
              components={{
                h1: ({ children }) => {
                  const id = slugify(String(children))
                  return (
                    <h1 id={id} className="text-2xl sm:text-3xl font-bold text-galaxy-text pt-6 pb-2 border-b border-white/10 mt-8 mb-4">
                      {children}
                    </h1>
                  )
                },
                h2: ({ children }) => {
                  const id = slugify(String(children))
                  return (
                    <h2 id={id} className="text-xl sm:text-2xl font-bold text-galaxy-primary pt-6 pb-2 border-b border-white/5 mt-8 mb-3">
                      {children}
                    </h2>
                  )
                },
                h3: ({ children }) => {
                  const id = slugify(String(children))
                  return (
                    <h3 id={id} className="text-lg font-bold text-galaxy-text pt-4 mt-6 mb-2">
                      {children}
                    </h3>
                  )
                },
                p: ({ children }) => (
                  <p className="text-galaxy-text/90 text-sm sm:text-base leading-relaxed mb-4">
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside space-y-2 my-4 pl-2 text-galaxy-text/90 text-sm sm:text-base">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside space-y-2 my-4 pl-2 text-galaxy-text/90 text-sm sm:text-base">
                    {children}
                  </ol>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-galaxy-primary bg-galaxy-card/80 p-4 sm:p-5 rounded-r-2xl italic text-galaxy-text text-sm sm:text-base my-6 shadow-inner">
                    {children}
                  </blockquote>
                ),
                pre: ({ children }) => <>{children}</>,
                code: ({ node, inline, className, children, ...props }) => {
                  const match = /language-(\w+)/.exec(className || '')
                  const codeText = String(children).replace(/\n$/, '')
                  const isInline = inline || (!match && !String(children).includes('\n'))

                  if (isInline) {
                    return (
                      <code className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-xs text-galaxy-primary border border-white/10" {...props}>
                        {children}
                      </code>
                    )
                  }

                  const blockIndex = String(children).length
                  return (
                    <div className="relative my-6 rounded-xl overflow-hidden bg-black/80 border border-white/10 font-mono text-xs sm:text-sm">
                      <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10 text-galaxy-muted text-xs">
                        <span className="uppercase tracking-wider text-[10px] font-bold text-galaxy-primary">
                          {match ? match[1] : 'Code Block'}
                        </span>
                        <button
                          onClick={() => handleCopyCode(codeText, blockIndex)}
                          className="hover:text-galaxy-primary text-[11px] font-bold px-2 py-0.5 rounded bg-white/5 border border-white/10 hover:border-galaxy-primary transition-all"
                        >
                          {copiedCodeIndex === blockIndex ? '✓ Tersalin' : 'Copy Code'}
                        </button>
                      </div>
                      <div className="p-4 overflow-x-auto text-emerald-400 font-mono">
                        <code>{children}</code>
                      </div>
                    </div>
                  )
                },
                hr: () => <hr className="border-white/10 my-8" />,
                a: ({ href, children }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-galaxy-primary hover:underline font-semibold"
                  >
                    {children}
                  </a>
                ),
              }}
            >
              {article.content}
            </ReactMarkdown>
          </article>

          {/* SHARE & ACTION BAR BOTTOM */}
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 bg-galaxy-card/40 p-6 rounded-2xl border">
            <div>
              <h4 className="text-sm font-bold text-galaxy-text mb-1">
                Suka dengan artikel ini?
              </h4>
              <p className="text-xs text-galaxy-muted">
                Bagikan artikel ini ke media sosial atau teman sejawatmu!
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleShare}
                className="btn-primary py-2 px-4 text-xs shadow-md"
              >
                ↗️ Bagikan Artikel
              </button>
              <button
                onClick={handleCopyLink}
                className="btn-outline py-2 px-4 text-xs"
              >
                {copiedLink ? '✓ Tersalin' : '🔗 Copy Link'}
              </button>
            </div>
          </div>

          {/* PREV & NEXT ARTICLE NAVIGATION */}
          <nav className="mt-10 grid sm:grid-cols-2 gap-4">
            {prevArticle ? (
              <Link
                to={`/artikel/${prevArticle.slug}`}
                onClick={() => soundManager.play('nav-click')}
                className="p-4 rounded-2xl bg-galaxy-card border border-white/10 hover:border-galaxy-primary/40 transition-all flex flex-col justify-between group"
              >
                <span className="text-[11px] font-mono text-galaxy-muted mb-1 flex items-center gap-1 group-hover:-translate-x-1 transition-transform">
                  ← Artikel Sebelumnya
                </span>
                <span className="text-sm font-bold text-galaxy-text group-hover:text-galaxy-primary transition-colors line-clamp-2">
                  {prevArticle.title}
                </span>
              </Link>
            ) : <div />}

            {nextArticle ? (
              <Link
                to={`/artikel/${nextArticle.slug}`}
                onClick={() => soundManager.play('nav-click')}
                className="p-4 rounded-2xl bg-galaxy-card border border-white/10 hover:border-galaxy-primary/40 transition-all flex flex-col justify-between group text-right sm:text-right"
              >
                <span className="text-[11px] font-mono text-galaxy-muted mb-1 flex items-center justify-end gap-1 group-hover:translate-x-1 transition-transform">
                  Artikel Berikutnya →
                </span>
                <span className="text-sm font-bold text-galaxy-text group-hover:text-galaxy-primary transition-colors line-clamp-2">
                  {nextArticle.title}
                </span>
              </Link>
            ) : <div />}
          </nav>

          {/* RELATED ARTICLES ("ARTIKEL TERKAIT") */}
          {relatedArticles.length > 0 && (
            <section className="mt-16 pt-10 border-t border-white/10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-xs font-mono font-bold text-galaxy-primary uppercase tracking-wider block mb-1">
                    Rekomendasi Wawasan
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-galaxy-text">
                    Artikel Terkait
                  </h3>
                </div>
                <button
                  onClick={() => {
                    soundManager.play('nav-click')
                    navigate('/#articles')
                  }}
                  className="text-xs text-galaxy-primary hover:underline font-semibold"
                >
                  Lihat Semua →
                </button>
              </div>

              <div className="grid sm:grid-cols-3 gap-5">
                {relatedArticles.map((rel) => (
                  <Link
                    key={rel.id}
                    to={`/artikel/${rel.slug}`}
                    onClick={() => soundManager.play('project-open')}
                    onMouseEnter={() => soundManager.play('hover-soft')}
                    className="galaxy-card p-4 rounded-2xl border border-white/5 hover:border-galaxy-primary/40 transition-all flex flex-col justify-between h-full group"
                  >
                    <div>
                      <div className="flex items-center justify-between text-[10px] font-mono mb-2">
                        <span className="px-2 py-0.5 rounded bg-galaxy-primary/10 border border-galaxy-primary/20 text-galaxy-primary font-bold">
                          {rel.category}
                        </span>
                        <span className="text-galaxy-muted">{rel.readTime}</span>
                      </div>
                      <h4 className="text-sm font-bold text-galaxy-text group-hover:text-galaxy-primary transition-colors line-clamp-2 mb-2">
                        {rel.title}
                      </h4>
                      <p className="text-xs text-galaxy-muted line-clamp-2 leading-relaxed">
                        {rel.excerpt}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-galaxy-muted mt-3">
                      <span>{rel.date}</span>
                      <span className="text-galaxy-primary font-bold group-hover:translate-x-1 transition-transform">
                        Baca →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
