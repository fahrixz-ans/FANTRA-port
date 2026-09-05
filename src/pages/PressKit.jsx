import SEO from '../components/SEO'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { extendedData } from '../data/extendedData'

export default function PressKit() {
  const { pressKit } = extendedData

  return (
    <div className="min-h-screen bg-galaxy-bg text-galaxy-text font-sans">
      <SEO 
        title="Press Kit & Media Bio — FahriXz Official"
        description="Informasi pers resmi, biografi singkat dan lengkap, kontak media, dan aset foto FahriXz (Fahri Andrian Saputra)."
      />
      <Navbar />

      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-galaxy-primary/10 border border-galaxy-primary/30 text-galaxy-primary text-xs font-semibold mb-3">
            Official Media & Press Suite
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-3">
            PRESS KIT & MEDIA BIO
          </h1>
          <p className="text-galaxy-text-muted text-sm sm:text-base">
            Biografi resmi, foto resolusi tinggi, dan informasi kontak pers untuk keperluan peliputan atau kolaborasi.
          </p>
        </div>

        {/* Short Bio */}
        <div className="bg-galaxy-card border border-white/10 rounded-2xl p-6 sm:p-8 mb-8 backdrop-blur-xl">
          <h2 className="text-lg font-bold text-white mb-3 flex items-center justify-between">
            <span>Biografi Ringkas (Short Bio)</span>
            <button
              onClick={() => navigator.clipboard.writeText(pressKit.shortBio)}
              className="text-xs text-galaxy-primary hover:underline cursor-pointer"
            >
              Copy Text
            </button>
          </h2>
          <p className="text-xs sm:text-sm text-galaxy-text leading-relaxed bg-galaxy-card-alt p-4 rounded-xl border border-white/5">
            "{pressKit.shortBio}"
          </p>
        </div>

        {/* Long Bio */}
        <div className="bg-galaxy-card border border-white/10 rounded-2xl p-6 sm:p-8 mb-8 backdrop-blur-xl">
          <h2 className="text-lg font-bold text-white mb-3 flex items-center justify-between">
            <span>Biografi Lengkap (Full Bio)</span>
            <button
              onClick={() => navigator.clipboard.writeText(pressKit.longBio)}
              className="text-xs text-galaxy-primary hover:underline cursor-pointer"
            >
              Copy Text
            </button>
          </h2>
          <p className="text-xs sm:text-sm text-galaxy-text leading-relaxed bg-galaxy-card-alt p-4 rounded-xl border border-white/5">
            "{pressKit.longBio}"
          </p>
        </div>

        {/* Official Contacts */}
        <div className="bg-galaxy-card border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-xl">
          <h2 className="text-lg font-bold text-white mb-4">Kontak Resmi & Media Sosial</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-3.5 rounded-xl bg-galaxy-card-alt border border-white/5">
              <span className="text-galaxy-text-muted block text-[10px]">EMAIL KORESPONDENSI</span>
              <a href={`mailto:${pressKit.contacts.email}`} className="text-white font-bold hover:text-galaxy-primary">{pressKit.contacts.email}</a>
            </div>
            <div className="p-3.5 rounded-xl bg-galaxy-card-alt border border-white/5">
              <span className="text-galaxy-text-muted block text-[10px]">WHATSAPP OFFICAL</span>
              <span className="text-white font-bold">{pressKit.contacts.whatsapp}</span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
