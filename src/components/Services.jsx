import { usePortfolio } from '../context/PortfolioContext'
import ScrollReveal from './ScrollReveal'

export default function Services() {
  const { services = [] } = usePortfolio()

  return (
    <section id="services" className="py-20 md:py-28 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-galaxy-primary/10 border border-galaxy-primary/20 text-xs font-semibold text-galaxy-primary mb-3">
            SERVICES & LAYANAN KREATIF
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-galaxy-text mb-3">
            Layanan & Solusi Digital
          </h2>
          <p className="text-galaxy-muted text-base max-w-2xl mb-12">
            Pilihan layanan profesional yang dapat disesuaikan untuk kebutuhan personal branding, pembuatan konten, hingga pengembangan bisnis digital.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <ScrollReveal key={service.title} delay={i * 0.08}>
              <div className="galaxy-card p-6 border border-white/5 hover:border-galaxy-primary/40 transition-all duration-300 h-full flex flex-col justify-between group hover:-translate-y-1">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-galaxy-card-alt border border-white/10 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                    {service.icon}
                  </div>
                  <h3 className="text-lg font-bold text-galaxy-text mb-2 group-hover:text-galaxy-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-galaxy-muted text-xs sm:text-sm leading-relaxed">
                    {service.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between">
                  <a
                    href="#contact"
                    className="text-xs font-semibold text-galaxy-primary hover:underline flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-galaxy-primary/70 rounded px-1"
                  >
                    <span>Pesan Layanan</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </a>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
