import { data } from '../data/portfolioData'
import ScrollReveal from './ScrollReveal'

import {
  SiReact, SiNextdotjs, SiTailwindcss, SiTypescript,
  SiGithub, SiVercel, SiNodedotjs, SiJavascript, SiPostgresql, SiGit,
} from 'react-icons/si'

const iconMap = {
  SiReact, SiNextdotjs, SiTailwindcss, SiTypescript,
  SiGithub, SiVercel, SiNodedotjs, SiJavascript, SiPostgresql, SiGit,
}

function TechItem({ tech, index }) {
  const IconComponent = iconMap[tech.icon]

  return (
    <ScrollReveal delay={index * 0.05}>
      <div className="galaxy-card p-4 flex items-center gap-3 hover:border-galaxy-primary/40 hover:-translate-y-0.5 transition-all duration-300 group">
        <div className="w-10 h-10 rounded-lg bg-galaxy-card-alt border border-white/5 flex items-center justify-center text-galaxy-primary group-hover:scale-110 transition-transform">
          {IconComponent ? (
            <IconComponent className="w-5 h-5" />
          ) : (
            <span className="font-bold text-xs">{tech.nama.substring(0, 2)}</span>
          )}
        </div>
        <div>
          <p className="font-semibold text-galaxy-text text-sm group-hover:text-galaxy-primary transition-colors">
            {tech.nama}
          </p>
          <span className="text-[11px] text-galaxy-muted">
            {tech.kategori || 'Teknologi'}
          </span>
        </div>
      </div>
    </ScrollReveal>
  )
}

export default function TechStack() {
  const techStack = data.techStack

  return (
    <section id="techstack" className="py-20 md:py-24 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-galaxy-primary/10 border border-galaxy-primary/20 text-xs font-semibold text-galaxy-primary mb-3">
              STACK EKOSISTEM
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-galaxy-text mb-3">
              Teknologi & Tools
            </h2>
            <p className="text-galaxy-muted text-sm sm:text-base">
              Perangkat lunak, kerangka kerja, dan bahasa pemrograman yang digunakan dalam membangun website dan solusi digital.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {techStack.map((tech, i) => (
            <TechItem key={tech.nama} tech={tech} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
