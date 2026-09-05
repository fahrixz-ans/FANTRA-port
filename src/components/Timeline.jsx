import ScrollReveal from './ScrollReveal'
import { usePortfolio } from '../context/PortfolioContext'

export default function Timeline() {
  const { developerJourney = [] } = usePortfolio()
  return (
    <section id="timeline" className="py-20 md:py-28 overflow-hidden relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-galaxy-primary/10 border border-galaxy-primary/20 text-xs font-semibold text-galaxy-primary mb-3">
            PERJALANAN KARIR
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-galaxy-text mb-3">
            Developer Journey Map
          </h2>
          <p className="text-galaxy-muted text-base max-w-2xl mb-12">
            Peta perjalanan pembelajaran, pendidikan formal, dan milestone penting dalam karier.
          </p>
        </ScrollReveal>

        <div className="relative border-l-2 border-galaxy-primary/30 ml-4 md:ml-32 space-y-10">
          {developerJourney.map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="relative pl-6 md:pl-8 group">
                {/* Node circle */}
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-galaxy-bg border-2 border-galaxy-primary group-hover:scale-125 group-hover:bg-galaxy-primary transition-all shadow-md shadow-galaxy-primary/50" />

                {/* Year Badge on desktop left offset */}
                <div className="hidden md:block absolute -left-32 top-0 text-right w-24">
                  <span className="font-mono text-xs font-bold text-galaxy-primary bg-galaxy-primary/10 border border-galaxy-primary/20 px-2.5 py-1 rounded-full">
                    {item.year}
                  </span>
                </div>

                <div className="galaxy-card p-5 sm:p-6 hover:border-galaxy-primary/30 transition-all">
                  <div className="md:hidden inline-block mb-2 font-mono text-xs font-bold text-galaxy-primary bg-galaxy-primary/10 px-2.5 py-0.5 rounded-full">
                    {item.year}
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <h3 className="text-base sm:text-lg font-bold text-galaxy-text">
                      {item.title}
                    </h3>
                    <span className="text-[10px] font-mono uppercase px-2.5 py-1 bg-galaxy-card-alt border border-white/5 rounded text-galaxy-muted">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-galaxy-muted text-xs sm:text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
