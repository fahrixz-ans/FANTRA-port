import { useState } from 'react'
import SEO from '../components/SEO'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { extendedData } from '../data/extendedData'

export default function Showcase() {
  const [sliderPosition, setSliderPosition] = useState(50)

  const item = extendedData.showcaseItems[0]

  return (
    <div className="min-h-screen bg-galaxy-bg text-galaxy-text font-sans">
      <SEO 
        title="Interactive Showcase — FahriXz Before / After Editing Gallery"
        description="Galeri perbandingan Before & After retouching foto, color grading, dan desain logo vektor oleh FahriXz."
      />
      <Navbar />

      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-galaxy-primary/10 border border-galaxy-primary/30 text-galaxy-primary text-xs font-semibold mb-3">
            Interactive Visual Comparison
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-3">
            BEFORE & AFTER SHOWCASE
          </h1>
          <p className="text-galaxy-text-muted text-sm sm:text-base">
            Geser slider untuk melihat transformasi nyata proses retouching foto, penyesuaian warna (color grading), dan pengerjaan logo vektor.
          </p>
        </div>

        {/* Interactive Before/After Slider Component */}
        <div className="bg-galaxy-card border border-white/10 rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto mb-16 backdrop-blur-xl">
          <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
          <p className="text-xs text-galaxy-text-muted mb-6">{item.description}</p>

          <div className="relative aspect-video rounded-xl overflow-hidden select-none border border-white/20">
            {/* After Image (Base) */}
            <img
              src={item.afterImage}
              alt="After Editing"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <span className="absolute top-4 right-4 bg-galaxy-primary text-galaxy-bg px-3 py-1 rounded-md text-xs font-bold z-10 shadow-lg">
              AFTER (Graded / Edited)
            </span>

            {/* Before Image (Clipped) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src={item.beforeImage}
                alt="Before Editing"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover max-w-none"
                style={{ width: '100%' }}
              />
              <span className="absolute top-4 left-4 bg-black/80 text-white px-3 py-1 rounded-md text-xs font-bold z-10">
                BEFORE (Original)
              </span>
            </div>

            {/* Divider Line & Handle */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-galaxy-bg flex items-center justify-center font-bold text-xs shadow-xl">
                &#8596;
              </div>
            </div>
          </div>

          {/* Slider Control Input */}
          <div className="mt-6 flex items-center gap-4">
            <span className="text-xs font-bold text-galaxy-text-muted">BEFORE</span>
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPosition}
              onChange={(e) => setSliderPosition(Number(e.target.value))}
              className="w-full accent-galaxy-primary cursor-pointer"
            />
            <span className="text-xs font-bold text-galaxy-primary">AFTER</span>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
