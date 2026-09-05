import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { createClient } from '@supabase/supabase-js'
import SEO from '../components/SEO'
import Navbar from '../components/Navbar'
import GuestbookForm from '../components/GuestbookForm'
import GuestbookList from '../components/GuestbookList'
import Footer from '../components/Footer'
import { supabaseConfig } from '../data/portfolioData'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || supabaseConfig.url
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || supabaseConfig.anonKey
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null

const initialFallbackComments = [
  {
    id: 'demo-1',
    name: 'Rizky Pratama',
    message: 'Portofolio yang sangat keren dan futuristik! Semoga makin sukses karya CapCut Creator dan Web Dev-nya mas Fahri Xz.',
    created_at: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
  {
    id: 'demo-2',
    name: 'Siti Aminah',
    message: 'Tampilan tema galaksinya memanjakan mata, fitur AI assistant-nya juga sangat responsif. Sukses terus!',
    created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
]

export default function Guestbook() {
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [visibleCount, setVisibleCount] = useState(10)
  const [toastVisible, setToastVisible] = useState(false)

  useEffect(() => {
    fetchComments()
  }, [])

  const getLocalComments = () => {
    try {
      const saved = localStorage.getItem('fahri_guestbook_comments')
      return saved ? JSON.parse(saved) : initialFallbackComments
    } catch {
      return initialFallbackComments
    }
  }

  const saveLocalComments = (newComments) => {
    try {
      localStorage.setItem('fahri_guestbook_comments', JSON.stringify(newComments))
    } catch {
      // ignore
    }
  }

  const fetchComments = async () => {
    setLoading(true)
    const localData = getLocalComments()

    if (!supabase) {
      setComments(localData)
      setLoading(false)
      return
    }

    try {
      const { data, error } = await supabase
        .from('guestbook')
        .select('*')
        .order('created_at', { ascending: false })

      if (error || !data) {
        setComments(localData)
      } else {
        // Merge remote and local comments if any
        setComments(data.length > 0 ? data : localData)
      }
    } catch {
      setComments(localData)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async ({ name, message }) => {
    const newCommentObj = {
      id: Date.now().toString(),
      name,
      message,
      created_at: new Date().toISOString(),
    }

    let inserted = false

    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('guestbook')
          .insert([{ name, message }])
          .select()

        if (!error && data && data.length > 0) {
          setComments((prev) => [data[0], ...prev])
          inserted = true
        }
      } catch {
        // Fall back to local
      }
    }

    if (!inserted) {
      setComments((prev) => {
        const updated = [newCommentObj, ...prev]
        saveLocalComments(updated)
        return updated
      })
    }

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#38bdf8', '#a855f7', '#ffffff'],
    })

    setToastVisible(true)
    setTimeout(() => setToastVisible(false), 3000)
  }

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 10)
  }

  const visibleComments = comments.slice(0, visibleCount)
  const hasMore = visibleCount < comments.length

  return (
    <>
      <SEO 
        title="Guestbook — Fahri Xz"
        description="Tinggalkan pesan dan komentar di guestbook Portofolio Fahri. Berikan masukan atau sekadar menyapa!"
        url="https://fahriandriansaputra-portofolio.vercel.app/guestbook"
        keywords="guestbook, komentar, portofolio, web developer, fahri xz, fahri andrian saputra"
      />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="min-h-screen bg-galaxy-bg text-galaxy-text relative"
      >
        <Navbar />

        <main className="pt-24 pb-12 relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="text-4xl font-bold text-center text-galaxy-text mb-4">Guestbook / Buku Tamu</h1>
              <p className="text-galaxy-muted text-center mb-12">Tinggalkan pesan, salam, atau masukan untuk Fahri Xz.</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <GuestbookForm onSubmit={handleSubmit} />
            </motion.div>

            <div className="my-12 h-px bg-gradient-to-r from-transparent via-galaxy-primary/50 to-transparent" />

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
              <GuestbookList
                comments={visibleComments}
                loading={loading}
                onLoadMore={handleLoadMore}
                hasMore={hasMore}
              />
            </motion.div>
          </div>

          {toastVisible && (
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-galaxy-card-alt border border-galaxy-primary/30 text-galaxy-primary px-6 py-3 rounded-lg text-sm z-50 shadow-lg">
              Pesan terkirim!
            </div>
          )}
        </main>

        <Footer />
      </motion.div>
    </>
  )
}

