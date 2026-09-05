import { useState } from 'react'
import ScrollReveal from './ScrollReveal'
import { usePortfolio } from '../context/PortfolioContext'

export default function FAQ() {
  const { faq = [] } = usePortfolio()
  const [openIdx, setOpenIdx] = useState(0)

  return (
    <section id="faq" className="py-20 md:py-28 overflow-hidden relative border-t border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-galaxy-primary/10 border border-galaxy-primary/20 text-xs font-semibold text-galaxy-primary mb-3">
              PERTANYAAN UMUM
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-galaxy-text mb-3">
              Frequently Asked Questions (FAQ)
            </h2>
            <p className="text-galaxy-muted text-base">
              Jawaban atas pertanyaan yang sering diajukan mengenai keterampilan, ketersediaan, dan layanan.
            </p>
          </div>
        </ScrollReveal>

        <div className="space-y-4">
          {faq.map((item, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.05}>
              <div className="galaxy-card overflow-hidden border border-white/5">
                <button
                  onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-white/5 transition-colors"
                >
                  <span className="font-bold text-sm sm:text-base text-galaxy-text">
                    {item.q}
                  </span>
                  <span className="text-galaxy-primary text-lg font-bold shrink-0">
                    {openIdx === idx ? '−' : '+'}
                  </span>
                </button>
                {openIdx === idx && (
                  <div className="p-5 pt-0 text-xs sm:text-sm text-galaxy-muted leading-relaxed border-t border-white/5 bg-galaxy-card-alt/50">
                    {item.a}
                  </div>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
