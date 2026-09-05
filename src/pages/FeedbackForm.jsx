import { useState } from 'react'
import SEO from '../components/SEO'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function FeedbackForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [type, setType] = useState('Feedback')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name || !message) return

    // Store in localStorage as fallback
    const newFeedback = { id: Date.now(), name, email, type, message, date: new Date().toLocaleDateString() }
    const existing = JSON.parse(localStorage.getItem('fahrixz_feedback') || '[]')
    localStorage.setItem('fahrixz_feedback', JSON.stringify([newFeedback, ...existing]))

    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-galaxy-bg text-galaxy-text font-sans">
      <SEO 
        title="Feedback & Bug Report — FahriXz Official"
        description="Kirim masukan, saran fitur, atau laporan bug untuk pengembangan website dan proyek FahriXz."
      />
      <Navbar />

      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
            FEEDBACK & BUG REPORT
          </h1>
          <p className="text-galaxy-text-muted text-sm">
            Masukan Anda sangat berharga untuk meningkatkan kualitas website dan ekosistem FahriXz.
          </p>
        </div>

        <div className="bg-galaxy-card border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-xl">
          {submitted ? (
            <div className="text-center py-10">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4 text-xl">
                ✓
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Feedback Berhasil Terkirim!</h3>
              <p className="text-xs text-galaxy-text-muted mb-6">
                Terima kasih telah meluangkan waktu memberikan masukan untuk FahriXz.
              </p>
              <button
                onClick={() => { setSubmitted(false); setMessage(''); }}
                className="px-4 py-2 rounded-xl bg-galaxy-primary text-galaxy-bg font-bold text-xs"
              >
                Kirim Masukan Lainnya
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-galaxy-text mb-1">Nama Lengkap / Username *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: YourFams Member"
                  className="w-full px-4 py-2.5 rounded-xl bg-galaxy-card-alt border border-white/10 text-white text-xs focus:outline-none focus:border-galaxy-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-galaxy-text mb-1">Email (Opsional)</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@domain.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-galaxy-card-alt border border-white/10 text-white text-xs focus:outline-none focus:border-galaxy-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-galaxy-text mb-1">Kategori Masukan</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-galaxy-card-alt border border-white/10 text-white text-xs focus:outline-none focus:border-galaxy-primary"
                >
                  <option value="Feedback">Masukan / Saran Umum</option>
                  <option value="Bug Report">Laporan Bug / Error</option>
                  <option value="Feature Request">Ide Fitur Baru</option>
                  <option value="Preset Request">Permintaan Preset CapCut/AM</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-galaxy-text mb-1">Detail Pesan / Masukan *</label>
                <textarea
                  required
                  rows="4"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tuliskan masukan atau deskripsi bug secara jelas..."
                  className="w-full px-4 py-2.5 rounded-xl bg-galaxy-card-alt border border-white/10 text-white text-xs focus:outline-none focus:border-galaxy-primary"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-galaxy-primary text-galaxy-bg font-bold text-xs hover:opacity-90 transition-opacity shadow-lg shadow-galaxy-primary/20"
              >
                Kirim Masukan Sekarang &rarr;
              </button>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
