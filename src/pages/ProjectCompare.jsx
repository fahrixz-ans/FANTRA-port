import { useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import SEO from '../components/SEO'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { extendedData } from '../data/extendedData'

export default function ProjectCompare() {
  const [searchParams] = useSearchParams()
  const initialP1 = searchParams.get('p1') || extendedData.detailedProjects[0]?.slug
  const initialP2 = searchParams.get('p2') || extendedData.detailedProjects[1]?.slug

  const [project1Slug, setProject1Slug] = useState(initialP1)
  const [project2Slug, setProject2Slug] = useState(initialP2)

  const p1 = extendedData.detailedProjects.find((p) => p.slug === project1Slug || p.id === project1Slug) || extendedData.detailedProjects[0]
  const p2 = extendedData.detailedProjects.find((p) => p.slug === project2Slug || p.id === project2Slug) || extendedData.detailedProjects[1]

  return (
    <div className="min-h-screen bg-galaxy-bg text-galaxy-text font-sans">
      <SEO 
        title="Compare Projects — FahriXz Specification Comparison"
        description="Bandingkan spesifikasi, teknologi, status, dan fitur antar proyek buatan FahriXz (Fahri Andrian Saputra)."
      />
      <Navbar />

      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-galaxy-primary/10 border border-galaxy-primary/30 text-galaxy-primary text-xs font-semibold mb-3">
            FahriXz Project Comparison Tool
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-2">
            COMPARE PROJECTS
          </h1>
          <p className="text-galaxy-text-muted text-sm">
            Pilih dua proyek untuk membandingkan teknologi, status kesehatan, versi, dan fitur secara berdampingan.
          </p>
        </div>

        {/* Project Selector Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-galaxy-card p-4 rounded-xl border border-white/10">
            <label className="block text-xs font-bold text-galaxy-primary mb-2">PROYEK PERTAMA:</label>
            <select
              value={project1Slug}
              onChange={(e) => setProject1Slug(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-galaxy-card-alt border border-white/20 text-white text-xs font-semibold focus:outline-none focus:border-galaxy-primary"
            >
              {extendedData.detailedProjects.map((p) => (
                <option key={p.id} value={p.slug}>{p.name} ({p.category})</option>
              ))}
            </select>
          </div>

          <div className="bg-galaxy-card p-4 rounded-xl border border-white/10">
            <label className="block text-xs font-bold text-galaxy-primary mb-2">PROYEK KEDUA:</label>
            <select
              value={project2Slug}
              onChange={(e) => setProject2Slug(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-galaxy-card-alt border border-white/20 text-white text-xs font-semibold focus:outline-none focus:border-galaxy-primary"
            >
              {extendedData.detailedProjects.map((p) => (
                <option key={p.id} value={p.slug}>{p.name} ({p.category})</option>
              ))}
            </select>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-galaxy-card border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl">
          <div className="grid grid-cols-3 bg-galaxy-card-alt border-b border-white/10 p-4 font-bold text-xs sm:text-sm text-white">
            <div>Atribut Specs</div>
            <div className="text-galaxy-primary">{p1.name}</div>
            <div className="text-galaxy-primary">{p2.name}</div>
          </div>

          <div className="divide-y divide-white/10 text-xs text-galaxy-text">
            {/* Category */}
            <div className="grid grid-cols-3 p-4 items-center">
              <div className="font-semibold text-galaxy-text-muted">Kategori</div>
              <div className="font-bold text-white">{p1.category}</div>
              <div className="font-bold text-white">{p2.category}</div>
            </div>

            {/* Version & Year */}
            <div className="grid grid-cols-3 p-4 items-center">
              <div className="font-semibold text-galaxy-text-muted">Versi / Tahun</div>
              <div>{p1.version} ({p1.year})</div>
              <div>{p2.version} ({p2.year})</div>
            </div>

            {/* Status */}
            <div className="grid grid-cols-3 p-4 items-center">
              <div className="font-semibold text-galaxy-text-muted">Status Visibilitas</div>
              <div>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">
                  {p1.status}
                </span>
              </div>
              <div>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">
                  {p2.status}
                </span>
              </div>
            </div>

            {/* Technologies */}
            <div className="grid grid-cols-3 p-4 items-start">
              <div className="font-semibold text-galaxy-text-muted">Teknologi / Stack</div>
              <div className="flex flex-wrap gap-1">
                {p1.technologies.map((t, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono">{t}</span>
                ))}
              </div>
              <div className="flex flex-wrap gap-1">
                {p2.technologies.map((t, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono">{t}</span>
                ))}
              </div>
            </div>

            {/* Health */}
            <div className="grid grid-cols-3 p-4 items-center">
              <div className="font-semibold text-galaxy-text-muted">Development Status</div>
              <div>{p1.health?.development || 'ACTIVE'}</div>
              <div>{p2.health?.development || 'ACTIVE'}</div>
            </div>

            {/* Demo & Repo */}
            <div className="grid grid-cols-3 p-4 items-center">
              <div className="font-semibold text-galaxy-text-muted">Akses Tautan</div>
              <div>
                {p1.demoUrl ? (
                  <a href={p1.demoUrl} target="_blank" rel="noreferrer" className="text-galaxy-primary hover:underline font-bold">
                    Buka Link Demo &rarr;
                  </a>
                ) : '-'}
              </div>
              <div>
                {p2.demoUrl ? (
                  <a href={p2.demoUrl} target="_blank" rel="noreferrer" className="text-galaxy-primary hover:underline font-bold">
                    Buka Link Demo &rarr;
                  </a>
                ) : '-'}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
