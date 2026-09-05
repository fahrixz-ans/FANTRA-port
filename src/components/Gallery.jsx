import { useState } from 'react'
import { usePortfolio } from '../context/PortfolioContext'
import ScrollReveal from './ScrollReveal'
import Lightbox from './Lightbox'

export default function Gallery() {
  const { gallery = [] } = usePortfolio()
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  // Extract array of image paths
  const images = gallery.map((g) => (typeof g === 'string' ? g : g.path))

  const openLightbox = (index) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  return (
    <section id="gallery" className="py-20 md:py-28 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-galaxy-primary/10 border border-galaxy-primary/20 text-xs font-semibold text-galaxy-primary mb-3">
            GALERI FOTO & AKTIVITAS
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-galaxy-text mb-3">
            Dokumentasi Kegiatan
          </h2>
          <p className="text-galaxy-muted text-base max-w-2xl mb-12">
            Catatan visual momen pembelajaran, proyek, dan kolaborasi kegiatan.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {gallery.map((item, i) => {
            const path = typeof item === 'string' ? item : item.path
            const caption = typeof item === 'string' ? `Dokumentasi ${i + 1}` : item.caption
            const category = typeof item === 'string' ? 'Aktivitas' : item.category

            return (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div
                  className="galaxy-card overflow-hidden group cursor-pointer aspect-square relative border border-white/5 hover:border-galaxy-primary/40 transition-all duration-300"
                  onClick={() => openLightbox(i)}
                >
                  <img
                    src={path}
                    alt={`${caption} - Galeri Karya & Dokumentasi FahriXz (Fahri Andrian Saputra)`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-galaxy-bg/90 via-galaxy-bg/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-galaxy-primary mb-1">
                      {category}
                    </span>
                    <p className="text-white text-xs font-medium line-clamp-2">
                      {caption}
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
