import { useState } from 'react'
import { data } from '../data/portfolioData'
import ScrollReveal from './ScrollReveal'
import Lightbox from './Lightbox'

export default function PKL() {
  const experiences = data.experiences || []
  const fahriXzStore = data.fahrixzStore
  const certificates = data.certificates || []
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const openLightbox = (index) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  return (
    <section id="pkl" className="py-20 md:py-28 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-galaxy-primary/10 border border-galaxy-primary/20 text-xs font-semibold text-galaxy-primary mb-3">
            PENGALAMAN KERJA, PKL & ENTREPRENEURSHIP
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-galaxy-text mb-3">
            Riwayat Pekerjaan & Pengalaman PKL
          </h2>
          <p className="text-galaxy-muted text-base max-w-2xl mb-12">
            Pengalaman nyata dalam menjalankan bisnis online mandiri, Praktik Kerja Lapangan (PKL) di dunia ritel, ekspedisi logistik, serta konsultan bisnis.
          </p>
        </ScrollReveal>

        {/* Highlight Section: FahriXz Store Online Business Case Study */}
        {fahriXzStore && (
          <ScrollReveal delay={0.1}>
            <div className="galaxy-card p-6 md:p-8 mb-12 border-galaxy-primary/30 bg-gradient-to-br from-galaxy-card via-galaxy-card-alt to-galaxy-card relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none text-8xl font-black">
                WA
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div>
                  <span className="px-3 py-1 bg-galaxy-primary/15 border border-galaxy-primary/30 text-galaxy-primary text-xs font-mono font-bold rounded-full inline-block mb-2">
                    {fahriXzStore.badge}
                  </span>
                  <h3 className="text-2xl font-extrabold text-galaxy-text">
                    {fahriXzStore.nama}
                  </h3>
                  <p className="text-xs font-mono text-galaxy-primary">
                    {fahriXzStore.subtitle}
                  </p>
                </div>

                <a
                  href={data.personal.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-xs py-2 px-4 font-bold flex items-center gap-2"
                >
                  <span>WhatsApp Online Business</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              </div>

              <p className="text-galaxy-muted text-sm sm:text-base leading-relaxed mb-6">
                {fahriXzStore.desc}
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {fahriXzStore.activities.map((act, i) => (
                  <div key={i} className="p-4 bg-galaxy-card-alt/80 rounded-xl border border-white/5">
                    <div className="text-galaxy-primary font-bold text-xs font-mono mb-1">
                      0{i + 1}. {act.title}
                    </div>
                    <p className="text-galaxy-muted text-xs leading-relaxed">
                      {act.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Experience Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {experiences.map((exp, idx) => (
            <ScrollReveal key={idx} delay={0.05 * idx}>
              <div className="galaxy-card p-6 border border-white/5 hover:border-galaxy-primary/30 transition-all h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-mono px-2.5 py-1 bg-galaxy-primary/10 border border-galaxy-primary/20 text-galaxy-primary font-bold rounded-full">
                      {exp.period}
                    </span>
                    <span className="text-[10px] text-galaxy-muted font-mono uppercase">
                      {exp.category}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-galaxy-text mb-1">
                    {exp.company}
                  </h4>
                  <p className="text-xs font-semibold text-galaxy-primary mb-3">
                    {exp.role}
                  </p>
                  <p className="text-xs text-galaxy-muted leading-relaxed mb-4">
                    {exp.desc}
                  </p>
                </div>

                {exp.activities && exp.activities.length > 0 && (
                  <div className="pt-3 border-t border-white/5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-galaxy-muted font-bold block mb-2">
                      Tugas & Aktivitas:
                    </span>
                    <ul className="space-y-1 text-[11px] text-galaxy-muted">
                      {exp.activities.slice(0, 4).map((act, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-galaxy-primary">▪</span>
                          <span className="line-clamp-1">{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Certificate Documentation Showcase */}
        {certificates.length > 0 && (
          <ScrollReveal delay={0.2}>
            <div className="galaxy-card p-6 md:p-8">
              <h3 className="text-lg font-bold text-galaxy-text mb-2">
                Dokumentasi Sertifikat & Pelatihan
              </h3>
              <p className="text-galaxy-muted text-xs sm:text-sm mb-6">
                Dokumen bukti keikutsertaan Praktik Kerja Lapangan dan sertifikasi keahlian.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {certificates.map((cert, i) => (
                  <div
                    key={i}
                    onClick={() => openLightbox(i)}
                    className="aspect-[4/3] rounded-xl overflow-hidden bg-black/40 border border-white/10 cursor-pointer relative group"
                  >
                    <img
                      src={cert}
                      alt={`Dokumentasi Sertifikat & Pelatihan PKL ${i + 1} - FahriXz (Fahri Andrian Saputra)`}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-[10px] font-bold text-white bg-galaxy-primary px-2 py-1 rounded">
                        Lihat Sertifikat
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        )}
      </div>

      {/* Lightbox */}
      <Lightbox
        images={certificates}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </section>
  )
}
