import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Globe,
  Rocket,
  Palette,
  BookOpen,
  Users,
  Compass,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Layers,
  Orbit
} from 'lucide-react'
import SEO from '../components/SEO'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { extendedData } from '../data/extendedData'
import { soundManager } from '../lib/soundManager'

const NODE_ICONS = {
  projects: Rocket,
  creator: Palette,
  blog: BookOpen,
  community: Users
}

export default function Universe() {
  const [activeNode, setActiveNode] = useState(extendedData.universe[0])
  const [viewMode, setViewMode] = useState('orbit') // 'orbit' | 'grid'

  return (
    <div className="min-h-screen bg-galaxy-bg text-galaxy-text selection:bg-galaxy-primary/30 font-sans">
      <SEO 
        title="FahriXz Universe — Map Ekosistem Digital"
        description="Peta interaktif seluruh ekosistem FahriXz (Fahri Andrian Saputra): Projects, Creator, Blog, Community, dan Digital Assets."
      />
      <Navbar />

      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-galaxy-primary/10 border border-galaxy-primary/30 text-galaxy-primary text-xs font-semibold mb-4 shadow-sm"
          >
            <Orbit className="w-4 h-4 animate-spin-slow text-galaxy-primary" />
            <span>Interactive Solar System & Ecosystem Map</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-galaxy-text to-galaxy-primary mb-4"
          >
            FAHRIXZ UNIVERSE
          </motion.h1>
          <p className="text-galaxy-text-muted text-sm sm:text-base">
            Jelajahi hubungan antar-cabang ekosistem digital FahriXz mulai dari proyek pengembangan web, karya creator CapCut/Alight Motion, artikel blog, hingga komunitas YourFams.
          </p>

          {/* View Mode Switcher */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                soundManager.play('click')
                setViewMode('orbit')
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                viewMode === 'orbit'
                  ? 'bg-galaxy-primary text-galaxy-bg shadow-lg shadow-galaxy-primary/30'
                  : 'bg-galaxy-card border border-white/10 text-galaxy-text-muted hover:text-white'
              }`}
            >
              <Orbit className="w-4 h-4" />
              <span>Solar Orbit View</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                soundManager.play('click')
                setViewMode('grid')
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-galaxy-primary text-galaxy-bg shadow-lg shadow-galaxy-primary/30'
                  : 'bg-galaxy-card border border-white/10 text-galaxy-text-muted hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Grid Matrix View</span>
            </motion.button>
          </div>
        </div>

        {/* Central Solar Orbit / Grid View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          {/* Main Visualizer Panel (Left 7 Cols) */}
          <div className="lg:col-span-7 bg-galaxy-card/80 border border-white/10 backdrop-blur-xl rounded-2xl p-6 sm:p-8 relative overflow-hidden min-h-[460px] flex flex-col justify-between">
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-galaxy-primary/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6 z-10">
              <span className="text-xs font-bold uppercase tracking-wider text-galaxy-primary flex items-center gap-1.5">
                <Globe className="w-4 h-4" />
                <span>Ecosystem Core Node</span>
              </span>
              <span className="text-xs text-galaxy-text-muted font-mono">
                Fahri Andrian Saputra (FahriXz)
              </span>
            </div>

            {/* View Mode 1: Interactive Solar System Rotation Orbit */}
            {viewMode === 'orbit' ? (
              <div className="relative my-auto py-12 flex items-center justify-center min-h-[320px]">
                {/* Central Sun Core */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-400 via-galaxy-primary to-purple-500 flex flex-col items-center justify-center z-20 shadow-[0_0_50px_rgba(56,189,248,0.5)] border-2 border-white/40 cursor-pointer"
                  onClick={() => soundManager.play('pop')}
                >
                  <span className="font-extrabold text-white text-base tracking-wider">FAHRIXZ</span>
                  <span className="text-[9px] text-white/80 uppercase font-mono">CORE</span>
                </motion.div>

                {/* Rotating Planet Orbit Ring */}
                <div className="absolute w-[300px] h-[300px] sm:w-[340px] sm:h-[340px] rounded-full border border-galaxy-primary/30 animate-[spin_50s_linear_infinite] pointer-events-none" />

                {/* Orbit Nodes Floating Around Core */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
                  {extendedData.universe.map((node, index) => {
                    const IconComponent = NODE_ICONS[node.id] || Compass
                    const isSelected = activeNode.id === node.id
                    // Calculate angle for planetary positions
                    const angle = (index * (360 / extendedData.universe.length)) * (Math.PI / 180)
                    const radius = 150 // Orbit radius in pixels
                    const x = Math.cos(angle) * radius
                    const y = Math.sin(angle) * radius

                    return (
                      <motion.button
                        key={node.id}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.15, zIndex: 30 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                          soundManager.play('click')
                          setActiveNode(node)
                        }}
                        onMouseEnter={() => soundManager.play('hover')}
                        style={{
                          transform: `translate(${x}px, ${y}px)`
                        }}
                        className={`absolute w-16 h-16 rounded-2xl flex flex-col items-center justify-center p-2 border transition-all duration-300 shadow-xl cursor-pointer ${
                          isSelected
                            ? 'bg-galaxy-primary text-galaxy-bg border-white shadow-[0_0_25px_rgba(56,189,248,0.6)] scale-110 z-30'
                            : 'bg-galaxy-card-alt text-galaxy-text border-white/10 hover:border-galaxy-primary/50 hover:text-galaxy-primary z-20'
                        }`}
                      >
                        <IconComponent className="w-5 h-5 mb-1" />
                        <span className="text-[9px] font-bold uppercase tracking-wider">{node.id}</span>
                      </motion.button>
                    )
                  })}
                </div>
              </div>
            ) : (
              /* View Mode 2: Grid Matrix View */
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-auto relative z-10">
                {extendedData.universe.map((node) => {
                  const IconComp = NODE_ICONS[node.id] || Compass
                  const isSelected = activeNode.id === node.id
                  return (
                    <motion.button
                      key={node.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        soundManager.play('click')
                        setActiveNode(node)
                      }}
                      onMouseEnter={() => soundManager.play('hover')}
                      className={`p-5 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden cursor-pointer ${
                        isSelected
                          ? 'border-galaxy-primary bg-galaxy-card-alt shadow-lg shadow-galaxy-primary/20'
                          : 'border-white/10 bg-galaxy-card/50 hover:border-white/30 hover:bg-galaxy-card-alt/80'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg flex items-center gap-1.5 ${
                          isSelected ? 'bg-galaxy-primary text-galaxy-bg' : 'bg-white/10 text-galaxy-text-muted'
                        }`}>
                          <IconComp className="w-3.5 h-3.5" />
                          <span>{node.id}</span>
                        </span>
                        {isSelected && <span className="w-2 h-2 rounded-full bg-galaxy-primary animate-ping" />}
                      </div>
                      <h3 className="text-lg font-bold text-white mb-1">{node.label}</h3>
                      <p className="text-xs text-galaxy-text-muted line-clamp-2">{node.description}</p>
                    </motion.button>
                  )
                })}
              </div>
            )}

            <div className="pt-6 border-t border-white/10 mt-6 flex items-center justify-between text-xs text-galaxy-text-muted z-10">
              <span>Klik planet / node untuk info spesifik</span>
              <Link
                to="/projects"
                onClick={() => soundManager.play('nav-click')}
                className="text-galaxy-primary hover:underline font-bold flex items-center gap-1.5"
              >
                <span>Proyek Explorer</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Node Details Branch Panel (Right 5 Cols) */}
          <div className="lg:col-span-5 bg-galaxy-card-alt border border-galaxy-primary/30 rounded-2xl p-6 sm:p-8 relative flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeNode.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.2 }}
                className="h-full flex flex-col justify-between"
              >
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-galaxy-primary mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Branch Node: {activeNode.id}</span>
                  </div>
                  <h2 className="text-2xl font-extrabold text-white mb-2">{activeNode.label}</h2>
                  <p className="text-xs sm:text-sm text-galaxy-text-muted mb-6">{activeNode.description}</p>

                  <h4 className="text-xs font-bold uppercase tracking-wider text-white/70 mb-3 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-galaxy-primary" />
                    <span>Sub-Branches & Assets:</span>
                  </h4>

                  <div className="space-y-2.5 mb-8">
                    {activeNode.children.map((child, idx) => (
                      <Link
                        key={idx}
                        to={child.link}
                        onClick={() => soundManager.play('nav-click')}
                        onMouseEnter={() => soundManager.play('hover')}
                        className="block p-3.5 rounded-xl bg-galaxy-card/80 border border-white/10 hover:border-galaxy-primary/50 hover:bg-galaxy-card transition-all duration-200 group"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-bold text-white group-hover:text-galaxy-primary transition-colors flex items-center gap-1.5">
                            <span>{child.name}</span>
                            <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-galaxy-primary" />
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-galaxy-primary/20 text-galaxy-primary font-mono font-bold">
                            {child.status}
                          </span>
                        </div>
                        <span className="text-xs text-galaxy-text-muted">{child.type}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                <Link
                  to={activeNode.link}
                  onClick={() => soundManager.play('nav-click')}
                  className="w-full py-3.5 px-4 rounded-xl bg-galaxy-primary text-galaxy-bg font-extrabold text-sm text-center block hover:opacity-90 transition-opacity shadow-lg shadow-galaxy-primary/20 flex items-center justify-center gap-2"
                >
                  <span>Jelajahi Cabang {activeNode.label}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

