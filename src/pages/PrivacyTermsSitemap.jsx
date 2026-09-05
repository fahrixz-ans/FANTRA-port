import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function PrivacyTermsSitemap() {
  const [activeTab, setActiveTab] = useState('privacy')

  return (
    <div className="min-h-screen bg-galaxy-bg text-galaxy-text flex flex-col justify-between relative">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-28 flex-1 w-full">
        <div className="flex gap-2 mb-8 border-b border-white/10 pb-3">
          <button
            onClick={() => setActiveTab('privacy')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'privacy'
                ? 'bg-galaxy-primary text-galaxy-bg'
                : 'bg-galaxy-card text-galaxy-muted'
            }`}
          >
            Kebijakan Privasi
          </button>
          <button
            onClick={() => setActiveTab('terms')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'terms'
                ? 'bg-galaxy-primary text-galaxy-bg'
                : 'bg-galaxy-card text-galaxy-muted'
            }`}
          >
            Syarat & Ketentuan
          </button>
          <button
            onClick={() => setActiveTab('sitemap')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'sitemap'
                ? 'bg-galaxy-primary text-galaxy-bg'
                : 'bg-galaxy-card text-galaxy-muted'
            }`}
          >
            Peta Situs (Sitemap)
          </button>
        </div>

        <div className="galaxy-card p-6 sm:p-8 border border-white/10 text-sm leading-relaxed">
          {activeTab === 'privacy' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-galaxy-text">Kebijakan Privasi (Privacy Policy)</h2>
              <p className="text-galaxy-muted">
                Privasi pengunjung sangat penting bagi kami. Kebijakan ini menjelaskan bagaimana informasi Anda dikelola di website portofolio Fahri Andrian Saputra.
              </p>
              <h3 className="font-bold text-galaxy-text">1. Informasi yang Dikumpulkan</h3>
              <p className="text-galaxy-muted">
                Website ini hanya mengumpulkan informasi yang Anda kirimkan secara sukarela melalui formulir Kontak dan Buku Tamu (Guestbook), seperti Nama dan Pesan.
              </p>
              <h3 className="font-bold text-galaxy-text">2. Penggunaan Informasi</h3>
              <p className="text-galaxy-muted">
                Informasi yang dikirimkan hanya digunakan untuk keperluan komunikasi profesional dan menampilkan pesan di halaman Guestbook publik.
              </p>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-galaxy-text">Syarat & Ketentuan (Terms of Service)</h2>
              <p className="text-galaxy-muted">
                Dengan mengakses website portofolio ini, Anda menyetujui syarat dan ketentuan penggunaan di bawah ini.
              </p>
              <h3 className="font-bold text-galaxy-text">1. Hak Cipta</h3>
              <p className="text-galaxy-muted">
                Seluruh konten, desain, dan kode sumber portofolio ini dilindungi oleh hak cipta Fahri Andrian Saputra.
              </p>
              <h3 className="font-bold text-galaxy-text">2. Penggunaan Konten</h3>
              <p className="text-galaxy-muted">
                Anda diperbolehkan membagikan link portofolio ini untuk keperluan referensi non-komersial.
              </p>
            </div>
          )}

          {activeTab === 'sitemap' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-galaxy-text">Peta Situs (Sitemap Overview)</h2>
              <ul className="grid sm:grid-cols-2 gap-3 text-xs">
                <li className="p-3 bg-galaxy-card-alt rounded-lg border border-white/5">
                  <Link to="/" className="text-galaxy-primary font-bold hover:underline block mb-1">
                    🏠 Home (Beranda Utama)
                  </Link>
                  <span className="text-galaxy-muted">Hero, Profil, Proyek, Skills, & Kontak</span>
                </li>
                <li className="p-3 bg-galaxy-card-alt rounded-lg border border-white/5">
                  <Link to="/guestbook" className="text-galaxy-primary font-bold hover:underline block mb-1">
                    📖 Guestbook (Buku Tamu)
                  </Link>
                  <span className="text-galaxy-muted">Komentar & Pesan Pengunjung Realtime</span>
                </li>
                <li className="p-3 bg-galaxy-card-alt rounded-lg border border-white/5">
                  <a href="/#projects" className="text-galaxy-primary font-bold hover:underline block mb-1">
                    📁 Portofolio Proyek
                  </a>
                  <span className="text-galaxy-muted">Katalog Aplikasi & Fitur Interaktif</span>
                </li>
                <li className="p-3 bg-galaxy-card-alt rounded-lg border border-white/5">
                  <a href="/#articles" className="text-galaxy-primary font-bold hover:underline block mb-1">
                    📝 Artikel & Catatan
                  </a>
                  <span className="text-galaxy-muted">Blog & Ringkasan Otomatis AI</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
