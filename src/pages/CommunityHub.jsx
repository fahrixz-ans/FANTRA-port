import { useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { extendedData } from '../data/extendedData'

export default function CommunityHub() {
  const [poll, setPoll] = useState(extendedData.communityVotes[0])
  const [userVoted, setUserVoted] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null)

  const handleVote = (optionId) => {
    if (userVoted) return
    setSelectedOption(optionId)
    setUserVoted(true)
    setPoll((prev) => ({
      ...prev,
      totalVotes: prev.totalVotes + 1,
      options: prev.options.map((opt) => 
        opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
      )
    }))
  }

  return (
    <div className="min-h-screen bg-galaxy-bg text-galaxy-text font-sans">
      <SEO 
        title="Community & YourFams — FahriXz Interactive Hub"
        description="Ruang komunitas YourFams, voting interaktif, guestbook, dan kirim masukan/bug report untuk FahriXz (Fahri Andrian Saputra)."
      />
      <Navbar />

      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-3">
            YourFams Community Space
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-3">
            COMMUNITY HUB
          </h1>
          <p className="text-galaxy-text-muted text-sm sm:text-base">
            Suarakan pendapatmu lewat Community Voting, kirim ucapan di Guestbook, atau berikan masukan di Feedback Form.
          </p>
        </div>

        {/* Voting Poll Card */}
        <div className="bg-galaxy-card border border-white/10 rounded-2xl p-6 sm:p-8 max-w-3xl mx-auto mb-16 backdrop-blur-xl">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/20">
              Community Poll
            </span>
            <span className="text-xs text-galaxy-text-muted font-mono">
              Total Suara: <strong className="text-white">{poll.totalVotes}</strong>
            </span>
          </div>

          <h3 className="text-xl font-bold text-white mb-6">{poll.question}</h3>

          <div className="space-y-4 mb-6">
            {poll.options.map((opt) => {
              const percentage = Math.round((opt.votes / poll.totalVotes) * 100) || 0
              const isSelected = selectedOption === opt.id

              return (
                <button
                  key={opt.id}
                  onClick={() => handleVote(opt.id)}
                  disabled={userVoted}
                  className={`w-full text-left p-4 rounded-xl border relative overflow-hidden transition-all cursor-pointer ${
                    isSelected
                      ? 'border-amber-400 bg-amber-500/10'
                      : 'border-white/10 bg-galaxy-card-alt hover:border-white/30'
                  }`}
                >
                  {/* Progress Fill Bar */}
                  <div
                    className="absolute top-0 bottom-0 left-0 bg-amber-500/20 transition-all duration-500 pointer-events-none"
                    style={{ width: `${percentage}%` }}
                  />

                  <div className="relative z-10 flex justify-between items-center text-xs sm:text-sm font-semibold">
                    <span className="text-white">{opt.text}</span>
                    <span className="font-mono font-bold text-amber-400">{percentage}%</span>
                  </div>
                </button>
              )
            })}
          </div>

          {userVoted && (
            <div className="text-center p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
              ✓ Terima kasih! Suaramu telah tercatat dalam Community Voting.
            </div>
          )}
        </div>

        {/* Community Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Link
            to="/guestbook"
            className="p-8 rounded-2xl bg-galaxy-card border border-white/10 hover:border-galaxy-primary/50 transition-all text-center block group"
          >
            <div className="w-12 h-12 rounded-full bg-galaxy-primary/20 text-galaxy-primary flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-galaxy-primary transition-colors">
              Buka Guestbook & Pesan
            </h3>
            <p className="text-xs text-galaxy-text-muted">
              Tinggalkan jejak, pesan, atau sapaan hangat untuk FahriXz dan sesama komunitas YourFams.
            </p>
          </Link>

          <Link
            to="/feedback"
            className="p-8 rounded-2xl bg-galaxy-card border border-white/10 hover:border-amber-500/50 transition-all text-center block group"
          >
            <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
              Formulir Feedback & Bug Report
            </h3>
            <p className="text-xs text-galaxy-text-muted">
              Kirimkan laporan bug, kritik, atau ide fitur baru secara langsung kepada tim FahriXz.
            </p>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}
