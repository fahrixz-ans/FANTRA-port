import { useState } from 'react'
import { usePortfolio } from '../context/PortfolioContext'
import ScrollReveal from './ScrollReveal'
import Lightbox from './Lightbox'

export default function Certificates() {
  const { certificates = [] } = usePortfolio()
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  // Extract array of image paths
  const images = certificates.map((c) => (typeof c === 'string' ? c : c.path))

  const openLightbox = (index) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  return (
    <section id="certificates" className="py-20 md:py-28 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-galaxy-primary/10 border border-galaxy-primary/20 text-xs font-semibold text-galaxy-primary mb-3">
            PENGHARGAAN & LISENSI
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-galaxy-text mb-3">
            Sertifikat & Lisensi
          </h2>
          <p className="text-galaxy-muted text-base max-w-2xl mb-12">
            Kumpulan sertifikat pelatihan, kompetensi keahlian, dan penghargaan yang diperoleh.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, i) => {
            const path = typeof cert === 'string' ? cert : cert.path
            const title = typeof cert === 'string' ? `Sertifikat ${i + 1}` : cert.title
            const issuer = typeof cert === 'string' ? 'Sertifikat Resmi' : cert.issuer

            return (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div
                  className="galaxy-card overflow-hidden group cursor-pointer border border-white/5 hover:border-galaxy-primary/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-galaxy-primary/5"
                  onClick={() => openLightbox(i)}
                >
                  <div className="aspect-[4/3] relative overflow-hidden bg-galaxy-card-alt">
                    <img
                      src={path}
                      alt={`Sertifikat Keahlian ${title} - FahriXz (Fahri Andrian Saputra)`}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-galaxy-bg/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                      <span className="btn-primary text-xs py-2 px-4 shadow-lg">
                        Pratinjau Sertifikat
                      </span>
                    </div>
                  </div>

                  <div className="p-4 border-t border-white/5">
                    <h3 className="text-galaxy-text font-bold text-sm line-clamp-1 group-hover:text-galaxy-primary transition-colors">
                      {title}
                    </h3>
                    <p className="text-galaxy-muted text-xs mt-1">
                      {issuer}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox
        images={images}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </section>
  )
}
