import { useState, useEffect, useRef } from 'react'
import {
  FolderGit2,
  Award,
  Zap,
  Users,
  BarChart3,
  Download,
  TrendingUp,
  RotateCw,
  Clock,
  Activity,
  CheckCircle2,
  Globe,
  Smartphone
} from 'lucide-react'
import ScrollReveal from './ScrollReveal'
import { extendedData } from '../data/extendedData'
import { getRealtimeAnalyticsData, trackGAEvent } from '../lib/analyticsTracker'
import { soundManager } from '../lib/soundManager'

// Animated Count-Up component
function AnimatedNumber({ value }) {
  const [displayValue, setDisplayValue] = useState(0)
  const numericVal = typeof value === 'number' ? value : parseInt(String(value).replace(/\D/g, ''), 10) || 0

  useEffect(() => {
    let start = 0
    const end = numericVal
    const duration = 1500
    const frameRate = 1000 / 60
    const totalFrames = Math.round(duration / frameRate)
    let frame = 0

    const counter = setInterval(() => {
      frame++
      const progress = frame / totalFrames
      const current = Math.floor(end * (1 - Math.pow(1 - progress, 3)))

      if (frame >= totalFrames) {
        setDisplayValue(end)
        clearInterval(counter)
      } else {
        setDisplayValue(current)
      }
    }, frameRate)

    return () => clearInterval(counter)
  }, [numericVal])

  return (
    <span>
      {typeof value === 'string' && value.includes('+')
        ? `${displayValue.toLocaleString('id-ID')}+`
        : displayValue.toLocaleString('id-ID')}
    </span>
  )
}

export default function Stats() {
  const { stats } = extendedData
  const [analyticsData, setAnalyticsData] = useState(getRealtimeAnalyticsData())
  const [pulseActive, setPulseActive] = useState(false)
  const [testSent, setTestSent] = useState(false)
  const [countdown, setCountdown] = useState(60)
  const [autoRefreshEnabled, setAutoRefreshEnabled] = useState(true)

  // 60-second auto-refresh timer countdown
  useEffect(() => {
    if (!autoRefreshEnabled) return

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setAnalyticsData(getRealtimeAnalyticsData())
          setPulseActive(true)
          setTimeout(() => setPulseActive(false), 1200)
          return 60
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [autoRefreshEnabled])

  // Manual refresh trigger
  const handleManualRefresh = () => {
    soundManager.play('click')
    setAnalyticsData(getRealtimeAnalyticsData())
    setPulseActive(true)
    setCountdown(60)
    setTimeout(() => setPulseActive(false), 1200)
  }

  const handleTriggerGA4Test = () => {
    soundManager.play('success')
    trackGAEvent('manual_test_event', {
      category: 'User Interaction',
      action: 'Click GA Test Button',
      label: 'Pengujian Google Analytics 4',
    })
    setAnalyticsData(getRealtimeAnalyticsData())
    setTestSent(true)
    setCountdown(60)
    setTimeout(() => setTestSent(false), 3000)
  }

  const statList = [
    { label: 'Proyek Selesai', value: stats.totalProjects, icon: FolderGit2, color: 'text-sky-400' },
    { label: 'Sertifikat & Lisensi', value: stats.totalCertificates, icon: Award, color: 'text-cyan-400' },
    { label: 'Teknologi Dikuasai', value: stats.totalTechStack, icon: Zap, color: 'text-cyan-300' },
    { label: 'Pengunjung Unik', value: analyticsData.uniqueVisitors, icon: Users, color: 'text-cyan-400' },
    { label: 'Total Pageviews', value: analyticsData.pageViews, icon: BarChart3, color: 'text-cyan-400' },
    { label: 'Dokumen Unduhan', value: stats.cvDownloads, icon: Download, color: 'text-sky-400' },
  ]

  return (
    <section id="stats" className="py-16 md:py-24 overflow-hidden relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-galaxy-primary/10 border border-galaxy-primary/20 text-xs font-semibold text-galaxy-primary mb-3">
              <span className={`w-2 h-2 rounded-full bg-cyan-400 ${pulseActive ? 'animate-ping' : ''}`} />
              <span>GOOGLE ANALYTICS 4 REALTIME</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-galaxy-text mb-3">
              Statistik & Analitik Realtime
            </h2>
            <p className="text-galaxy-text-muted text-sm sm:text-base">
              Rangkuman performa situs, jumlah tayangan halaman, serta lalu lintas pengunjung terintegrasi langsung dengan Google Analytics 4.
            </p>
          </div>
        </ScrollReveal>

        {/* GA4 Active Status Banner */}
        <ScrollReveal delay={0.1}>
          <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-galaxy-card/80 border border-white/10 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-galaxy-text uppercase tracking-wider">
                    Google Analytics GA4
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    ID: {analyticsData.measurementId}
                  </span>
                </div>
                <p className="text-xs text-galaxy-text-muted mt-0.5">
                  Pelacakan otomatis aktif untuk mengukur lalu lintas web dan interaksi pengunjung.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-start md:justify-end">
              {/* Active Users Badge */}
              <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
                </span>
                <span className="text-xs font-mono font-bold text-cyan-400">
                  {analyticsData.activeUsers} Aktif Sekarang
                </span>
              </div>

              {/* 60s Auto Refresh Badge & Timer */}
              <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
                <button
                  onClick={handleManualRefresh}
                  title="Segarkan data statistik sekarang"
                  className="hover:text-galaxy-primary transition-colors flex items-center gap-1.5 text-xs font-mono text-galaxy-text-muted cursor-pointer"
                >
                  <RotateCw className={`w-3.5 h-3.5 ${pulseActive ? 'animate-spin' : ''}`} />
                  <span className="text-galaxy-text font-bold">{countdown}s</span>
                </button>
                <div className="w-12 h-1 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-galaxy-primary transition-all duration-1000 ease-linear"
                    style={{ width: `${(countdown / 60) * 100}%` }}
                  />
                </div>
                <button
                  onClick={() => setAutoRefreshEnabled(!autoRefreshEnabled)}
                  className={`text-[10px] font-mono px-1.5 py-0.5 rounded cursor-pointer ${
                    autoRefreshEnabled
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                      : 'bg-white/10 text-gray-300 border border-white/20'
                  }`}
                >
                  {autoRefreshEnabled ? 'Auto 60s' : 'Jeda'}
                </button>
              </div>

              {/* GA4 Test Event Button */}
              <button
                onClick={handleTriggerGA4Test}
                onMouseEnter={() => soundManager.play('hover')}
                className="px-3.5 py-1.5 rounded-xl bg-galaxy-primary/10 hover:bg-galaxy-primary/20 border border-galaxy-primary/30 text-galaxy-primary text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
              >
                {testSent ? <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> : <Zap className="w-3.5 h-3.5" />}
                <span>{testSent ? 'Event Terkirim' : 'Tes Event GA4'}</span>
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Core Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {statList.map((st, i) => {
            const IconComponent = st.icon
            return (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="p-4 rounded-2xl bg-galaxy-card/80 border border-white/5 hover:border-galaxy-primary/30 transition-all text-center group">
                  <div className={`w-8 h-8 mx-auto mb-2 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center ${st.color} group-hover:scale-110 transition-transform`}>
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <span className="text-xl sm:text-2xl font-extrabold text-galaxy-text font-mono block mb-1">
                    <AnimatedNumber value={st.value} />
                  </span>
                  <span className="text-[11px] text-galaxy-text-muted font-medium line-clamp-1">
                    {st.label}
                  </span>
                </div>
              </ScrollReveal>
            )
          })}
        </div>

        {/* Realtime Stream & Demographics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Live Activity Stream */}
          <ScrollReveal delay={0.2}>
            <div className="p-5 rounded-2xl bg-galaxy-card/80 border border-white/10 backdrop-blur-xl">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-cyan-400" />
                  <h3 className="text-xs font-bold text-galaxy-text uppercase tracking-wider font-mono">
                    Aktivitas Pengunjung Realtime
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-galaxy-text-muted">
                  Live Feed
                </span>
              </div>

              <div className="space-y-2.5">
                {analyticsData.recentLogs.map((log) => (
                  <div
                    key={log.id}
                    className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-galaxy-primary flex-shrink-0" />
                      <span className="text-galaxy-text font-medium truncate">
                        {log.detail}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-galaxy-text-muted flex-shrink-0 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-galaxy-primary" />
                      <span>{log.time}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Demographics & Device Distribution */}
          <ScrollReveal delay={0.3}>
            <div className="p-5 rounded-2xl bg-galaxy-card/80 border border-white/10 backdrop-blur-xl shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-cyan-400" />
                  <h3 className="text-xs font-bold text-galaxy-text uppercase tracking-wider font-mono">
                    SEBARAN PERANGKAT & LOKASI
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-galaxy-text-muted">
                  Perangkat Anda: {analyticsData.userDevice}
                </span>
              </div>

              {/* Location Bar Progress */}
              <div className="space-y-3.5 mb-5">
                {analyticsData.topLocations && analyticsData.topLocations.length > 0 ? (
                  analyticsData.topLocations.map((loc, idx) => (
                    <div key={idx} className="space-y-1.5 transition-all">
                      <div className="flex justify-between items-center text-xs font-mono">
                        <span className="text-galaxy-text font-medium">{loc.label}</span>
                        <span className="text-cyan-400 font-bold">{loc.percentage}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                        <div
                          className="h-full bg-gradient-to-r from-galaxy-primary via-cyan-400 to-sky-400 rounded-full transition-all duration-700 ease-out"
                          style={{ width: `${loc.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-6 text-center text-xs font-mono text-galaxy-text-muted">
                    Belum ada data lokasi pengunjung.
                  </div>
                )}
              </div>

              {/* Device Pill Breakdown */}
              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/10 text-center">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex flex-col items-center justify-center">
                  <Smartphone className="w-3.5 h-3.5 text-galaxy-primary mb-1" />
                  <span className="text-[10px] text-galaxy-text-muted block font-mono">Mobile</span>
                  <span className="text-xs font-bold font-mono text-galaxy-text">
                    {analyticsData.deviceBreakdown?.mobile ?? 68}%
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex flex-col items-center justify-center">
                  <Globe className="w-3.5 h-3.5 text-cyan-400 mb-1" />
                  <span className="text-[10px] text-galaxy-text-muted block font-mono">Desktop</span>
                  <span className="text-xs font-bold font-mono text-galaxy-text">
                    {analyticsData.deviceBreakdown?.desktop ?? 28}%
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex flex-col items-center justify-center">
                  <BarChart3 className="w-3.5 h-3.5 text-cyan-400 mb-1" />
                  <span className="text-[10px] text-galaxy-text-muted block font-mono">Tablet</span>
                  <span className="text-xs font-bold font-mono text-galaxy-text">
                    {analyticsData.deviceBreakdown?.tablet ?? 4}%
                  </span>
                </div>
              </div>

            </div>
          </ScrollReveal>

        </div>

      </div>
    </section>
  )
}
