import SEO from '../components/SEO'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { extendedData } from '../data/extendedData'

export default function TimelinePage() {
  return (
    <div className="min-h-screen bg-galaxy-bg text-galaxy-text font-sans">
      <SEO 
        title="Career & Education Timeline — FahriXz Journey"
        description="Garis waktu perjalanan karier, pengalaman kerja, PKL, pendidikan, dan bisnis online FahriXz (Fahri Andrian Saputra)."
      />
      <Navbar />

      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-2">
            CAREER & EDUCATION TIMELINE
          </h1>
          <p className="text-galaxy-text-muted text-sm">
            Perjalanan pendidikan kejuruan, pengalaman kerja di Bandar Lampung dan Kotaagung, serta pengelolaan bisnis online.
          </p>
        </div>

        <div className="space-y-6 border-l-2 border-galaxy-primary/30 pl-6 relative">
          {extendedData.timeline.map((item, index) => (
            <div key={index} className="relative">
              <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-galaxy-primary border-2 border-galaxy-bg" />
              <div className="bg-galaxy-card border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-mono text-xs font-bold text-galaxy-primary px-2.5 py-0.5 rounded bg-galaxy-primary/10 border border-galaxy-primary/20">
                    {item.year}
                  </span>
                  <span className="text-[10px] text-galaxy-text-muted uppercase tracking-wider bg-white/5 px-2 py-0.5 rounded">
                    {item.category}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-xs sm:text-sm text-galaxy-text-muted leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
