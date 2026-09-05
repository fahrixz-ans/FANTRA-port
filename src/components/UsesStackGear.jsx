import { useState } from 'react'
import ScrollReveal from './ScrollReveal'
import { extendedData } from '../data/extendedData'

export default function UsesStackGear() {
  const [activeTab, setActiveTab] = useState('hardware')

  return (
    <section id="uses" className="py-20 md:py-28 overflow-hidden relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-galaxy-primary/10 border border-galaxy-primary/20 text-xs font-semibold text-galaxy-primary mb-3">
            PERANGKAT & SETUP
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-galaxy-text mb-3">
            Uses, Stack & Tech Radar
          </h2>
          <p className="text-galaxy-muted text-base max-w-2xl mb-8">
            Daftar perangkat keras, aplikasi, editor, dan alat bantu produktivitas yang digunakan sehari-hari.
          </p>
        </ScrollReveal>

        {/* Tabs */}
        <ScrollReveal delay={0.1}>
          <div className="flex gap-3 mb-8 border-b border-white/10 pb-3">
            <button
              onClick={() => setActiveTab('hardware')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'hardware'
                  ? 'bg-galaxy-primary text-galaxy-bg shadow-md'
                  : 'bg-galaxy-card text-galaxy-muted hover:text-white'
              }`}
            >
              💻 Perangkat Keras (Hardware)
            </button>
            <button
              onClick={() => setActiveTab('software')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'software'
                  ? 'bg-galaxy-primary text-galaxy-bg shadow-md'
                  : 'bg-galaxy-card text-galaxy-muted hover:text-white'
              }`}
            >
              ⚡ Perangkat Lunak (Software & Tools)
            </button>
          </div>
        </ScrollReveal>

        {/* Tab Content */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {extendedData.usesStackGear[activeTab].map((item, i) => (
            <ScrollReveal key={i} delay={0.05 * i}>
              <div className="galaxy-card p-6 border border-white/5 hover:border-galaxy-primary/30 transition-all h-full">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="text-base font-bold text-galaxy-text">{item.name}</h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-galaxy-primary/10 text-galaxy-primary font-semibold">
                    {item.category || item.spec}
                  </span>
                </div>
                <p className="text-xs text-galaxy-muted leading-relaxed mt-2">{item.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
