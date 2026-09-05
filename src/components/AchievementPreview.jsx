import React from 'react'
import { Link } from 'react-router-dom'
import { Award, ArrowUpRight, Sparkles } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { getLocalizedData } from '../data/fantraData'

export default function AchievementPreview({ onOpenImage }) {
  const { t, lang } = useLanguage()
  const { achievements } = getLocalizedData(lang)

  return (
    <section className="py-20 relative border-t border-white/5 bg-black/40">
      <div className="fantra-container">
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-widest text-cyan-400 uppercase mb-4">
              <Award className="w-3.5 h-3.5" />
              <span>{t('achievement.badge', 'PENCAPAIAN')}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold text-white tracking-tight">
              {t('achievement.title', 'Apresiasi & Milestone')}
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 mt-3">
              {t(
                'achievement.subtitle',
                'Rekam jejak kompetensi, apresiasi akademik, dan pencapaian selama perjalanan kreatif.'
              )}
            </p>
          </div>

          {/* CTA: View All Achievement */}
          <Link
            to="/gallery?tab=achievement"
            className="btn-editorial-outline text-xs py-2.5 px-5 self-start md:self-auto"
          >
            <span>{t('achievement.viewAll', 'Lihat Semua Achievement')}</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* ACHIEVEMENTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievements.map((item, idx) => (
            <div
              key={item.id}
              className="fantra-card bg-zinc-950/80 p-6 flex flex-col sm:flex-row gap-6 items-start group hover:border-cyan-500/30 transition-all duration-300"
            >
              {/* Image Preview / Icon */}
              {item.image ? (
                <div
                  onClick={() => onOpenImage && onOpenImage(achievements, idx)}
                  className="w-full sm:w-36 aspect-video sm:aspect-square rounded-xl overflow-hidden bg-zinc-900 shrink-0 cursor-pointer relative group/img border border-white/10"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover/img:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center text-white text-[10px] font-mono uppercase tracking-wider">
                    Zoom
                  </div>
                </div>
              ) : (
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center shrink-0">
                  <Award className="w-7 h-7" />
                </div>
              )}

              {/* Text Info */}
              <div className="flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest px-2 py-0.5 rounded bg-cyan-950/40 border border-cyan-500/20">
                      {t('achievement.itemPrefix', 'Pencapaian')} 0{idx + 1}
                    </span>
                    <span className="text-xs font-mono text-zinc-400">{item.year}</span>
                  </div>

                  <h3 className="text-lg font-sans font-bold text-white mb-1.5 group-hover:text-cyan-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed mb-3">{item.desc}</p>
                </div>

                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                  <span>{item.organizer}</span>
                  <span className="text-cyan-400/80">{item.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
