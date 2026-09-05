import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-galaxy-bg text-galaxy-text flex flex-col justify-between">
      <Navbar />

      <main className="max-w-2xl mx-auto px-4 py-32 text-center my-auto">
        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-galaxy-primary/10 border border-galaxy-primary/30 flex items-center justify-center text-3xl text-galaxy-primary font-bold font-mono">
          404
        </div>
        <h1 className="text-3xl font-bold mb-3">Halaman Tidak Ditemukan</h1>
        <p className="text-galaxy-muted text-sm mb-8 leading-relaxed">
          Maaf, halaman atau rute yang Anda cari tidak tersedia. Silakan kembali ke beranda untuk menjelajahi portofolio.
        </p>
        <Link to="/" className="btn-primary text-xs py-2.5 px-6 font-semibold inline-block">
          Kembali ke Beranda
        </Link>
      </main>

      <Footer />
    </div>
  )
}
