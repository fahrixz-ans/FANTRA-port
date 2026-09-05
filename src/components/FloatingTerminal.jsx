import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal, X, Minus, Maximize2, Minimize2, CornerDownLeft, Sparkles, Trash2 } from 'lucide-react'
import { data } from '../data/portfolioData'

const COMMAND_LIST = [
  { cmd: 'help', desc: 'Menampilkan daftar perintah terminal yang tersedia' },
  { cmd: 'about', desc: 'Informasi ringkas profil Fahri Xz' },
  { cmd: 'skills', desc: 'Daftar keahlian & teknologi yang dikuasai' },
  { cmd: 'projects', desc: 'Daftar proyek & karya utama' },
  { cmd: 'contact', desc: 'Kontak & link media sosial resmi' },
  { cmd: 'clear', desc: 'Membersihkan layar terminal' },
  { cmd: 'whoami', desc: 'Status identitas pengunjung saat ini' },
  { cmd: 'quote', desc: 'Motto & kutipan inspirasi' },
  { cmd: 'date', desc: 'Menampilkan tanggal dan waktu lokal saat ini' },
]

export default function FloatingTerminal() {
  const [isOpen, setIsOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [inputVal, setInputVal] = useState('')
  const [history, setHistory] = useState([
    { type: 'system', text: '⚡ Terminal Portfolio Fahri Xz v2.5.0' },
    { type: 'system', text: 'Ketik "help" untuk melihat daftar perintah yang dapat digunakan.' }
  ])
  const [cmdHistory, setCmdHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)

  const terminalEndRef = useRef(null)
  const inputRef = useRef(null)

  // Auto scroll to bottom
  useEffect(() => {
    if (isOpen) {
      terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' })
      inputRef.current?.focus()
    }
  }, [history, isOpen])

  // Global shortcut to toggle terminal (Ctrl + ` or Cmd + K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === '`' || e.key === 'k')) {
        e.preventDefault()
        setIsOpen((prev) => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleCommandSubmit = (e) => {
    e.preventDefault()
    const trimmed = inputVal.trim()
    if (!trimmed) return

    const lowerCmd = trimmed.toLowerCase()
    
    // Add command to output history
    const newHistory = [...history, { type: 'user', text: `$ ${trimmed}` }]

    // Save command in arrow up/down history
    setCmdHistory((prev) => [...prev, trimmed])
    setHistoryIndex(-1)
    setInputVal('')

    // Process commands
    switch (lowerCmd) {
      case 'help':
        newHistory.push({
          type: 'output',
          text: (
            <div className="space-y-1 text-slate-300">
              <p className="text-cyan-400 font-semibold mb-2">📌 Perintah yang tersedia:</p>
              {COMMAND_LIST.map((item) => (
                <div key={item.cmd} className="flex flex-col sm:flex-row sm:gap-4 text-xs">
                  <span className="text-emerald-400 font-mono w-24 font-bold">{item.cmd}</span>
                  <span className="text-slate-400">{item.desc}</span>
                </div>
              ))}
              <p className="text-xs text-slate-500 mt-2 italic">Petunjuk: Gunakan tombol panah ⬆ ⬇ untuk menelusuri riwayat perintah.</p>
            </div>
          )
        })
        break

      case 'about':
        newHistory.push({
          type: 'output',
          text: (
            <div className="space-y-1 text-xs text-slate-300">
              <p className="text-cyan-400 font-bold">{data.personal.namaLengkap} ({data.personal.namaPublik})</p>
              <p className="text-slate-400">{data.personal.roleShort}</p>
              <p className="mt-2 text-slate-300 leading-relaxed">{data.about.paragraf.split('\n')[0]}</p>
              <p className="text-emerald-400 mt-1">📍 Domisili: {data.personal.domisili}</p>
            </div>
          )
        })
        break

      case 'skills':
        newHistory.push({
          type: 'output',
          text: (
            <div className="space-y-1 text-xs text-slate-300">
              <p className="text-cyan-400 font-bold">🚀 Keahlian Utama & Tech Stack:</p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {['React.js', 'Tailwind CSS', 'TypeScript', 'JavaScript', 'CapCut Video Editing', 'Motion Graphics', 'Content Creation', 'Digital Business', 'Hardware Repair'].map((skill) => (
                  <span key={skill} className="px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800/50 font-mono">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )
        })
        break

      case 'projects':
        newHistory.push({
          type: 'output',
          text: (
            <div className="space-y-2 text-xs text-slate-300">
              <p className="text-cyan-400 font-bold">💼 Proyek & Portofolio Utama:</p>
              <ul className="list-disc list-inside space-y-1 text-slate-300">
                <li><strong className="text-emerald-300">FahriXz Store</strong> — Platform Bisnis Digital berbasis WhatsApp</li>
                <li><strong className="text-emerald-300">Interactive Web Portfolio</strong> — Aplikasi Portofolio React + Vite</li>
                <li><strong className="text-emerald-300">CapCut Template Creator</strong> — Konten Kreatif Video & Editing</li>
              </ul>
            </div>
          )
        })
        break

      case 'contact':
        newHistory.push({
          type: 'output',
          text: (
            <div className="space-y-1.5 text-xs text-slate-300">
              <p className="text-cyan-400 font-bold">📬 Informasi Kontak Resmi:</p>
              <p>📧 Email: <a href={`mailto:${data.personal.email}`} className="text-cyan-300 underline">{data.personal.email}</a></p>
              <p>💬 WhatsApp: <a href={data.personal.whatsappUrl} target="_blank" rel="noreferrer" className="text-emerald-300 underline">Chat di WhatsApp</a></p>
              <p>🐙 GitHub: <a href={data.personal.githubUrl} target="_blank" rel="noreferrer" className="text-cyan-300 underline">{data.personal.githubUrl}</a></p>
              <p>📸 Instagram: <a href={data.personal.instagramUrl} target="_blank" rel="noreferrer" className="text-pink-400 underline">{data.personal.instagramUrl}</a></p>
            </div>
          )
        })
        break

      case 'clear':
        setHistory([
          { type: 'system', text: 'Layar dibersihkan. Ketik "help" untuk panduan perintah.' }
        ])
        return

      case 'whoami':
        newHistory.push({
          type: 'output',
          text: (
            <div className="text-xs text-slate-300">
              <p>👤 Role: <span className="text-cyan-400 font-bold font-mono">Guest / Portfolio Visitor</span></p>
              <p>🌐 User Agent: <span className="text-slate-400">{navigator.userAgent.slice(0, 50)}...</span></p>
            </div>
          )
        })
        break

      case 'quote':
        newHistory.push({
          type: 'output',
          text: (
            <div className="text-xs text-cyan-400 italic">
              {data.personal.motto}
            </div>
          )
        })
        break

      case 'date':
        newHistory.push({
          type: 'output',
          text: (
            <div className="text-xs text-slate-300 font-mono">
              🕒 {new Date().toLocaleString('id-ID', { dateStyle: 'full', timeStyle: 'medium' })}
            </div>
          )
        })
        break

      case 'exit':
      case 'close':
        setIsOpen(false)
        return

      default:
        newHistory.push({
          type: 'output',
          text: (
            <div className="text-xs text-red-400">
              Perintah tidak dikenali: &quot;{trimmed}&quot;. Ketik <span className="text-cyan-300 font-mono font-bold">help</span> untuk daftar perintah.
            </div>
          )
        })
        break
    }

    setHistory(newHistory)
  }

  // Handle Arrow Up and Arrow Down for Command History
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (cmdHistory.length === 0) return
      const nextIndex = historyIndex < cmdHistory.length - 1 ? historyIndex + 1 : historyIndex
      setHistoryIndex(nextIndex)
      setInputVal(cmdHistory[cmdHistory.length - 1 - nextIndex] || '')
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1
        setHistoryIndex(nextIndex)
        setInputVal(cmdHistory[cmdHistory.length - 1 - nextIndex] || '')
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setInputVal('')
      }
    }
  }

  return (
    <>
      {/* Floating Toggle Button in Bottom Corner */}
      <motion.button
        onClick={() => setIsOpen((prev) => !prev)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-full bg-slate-900/90 text-cyan-400 border border-cyan-500/40 shadow-[0_0_25px_rgba(6,182,212,0.3)] backdrop-blur-md transition-all hover:border-cyan-400 hover:shadow-[0_0_35px_rgba(6,182,212,0.5)] group"
        title="Buka Terminal Interactive (Ctrl + `)"
        aria-label="Toggle Interactive Terminal"
      >
        <Terminal className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform" />
        <span className="text-xs font-mono font-semibold hidden sm:inline text-slate-200">
          Terminal <span className="text-cyan-400 font-bold">v2.5</span>
        </span>
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
        </span>
      </motion.button>

      {/* Floating Terminal Dialog Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`fixed z-50 bg-slate-950/95 border border-cyan-500/30 rounded-xl shadow-2xl backdrop-blur-xl flex flex-col overflow-hidden text-slate-200 font-mono transition-all duration-300 ${
              isExpanded
                ? 'inset-4 sm:inset-10'
                : 'bottom-20 right-4 left-4 sm:left-auto sm:right-6 sm:w-[480px] h-[380px]'
            }`}
          >
            {/* Terminal Header Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-slate-900/80 border-b border-slate-800 select-none">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-3 h-3 rounded-full bg-slate-600 hover:bg-red-500/80 transition-colors"
                    title="Tutup Terminal"
                  />
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-3 h-3 rounded-full bg-slate-700 hover:bg-yellow-500/80 transition-colors"
                    title="Minimize"
                  />
                  <button
                    onClick={() => setIsExpanded((prev) => !prev)}
                    className="w-3 h-3 rounded-full bg-slate-800 hover:bg-green-500/80 transition-colors"
                    title="Maximize"
                  />
                </div>
                <span className="text-xs font-mono text-slate-400 ml-2 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" /> fahrixz@portfolio:~
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setHistory([{ type: 'system', text: 'Layar dibersihkan.' }])}
                  className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-slate-200 transition-colors"
                  title="Bersihkan Layar"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsExpanded((prev) => !prev)}
                  className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-slate-200 transition-colors"
                  title={isExpanded ? 'Kecilkan' : 'Perbesar'}
                >
                  {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-slate-200 transition-colors"
                  title="Tutup"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Terminal Body Output Window */}
            <div
              className="flex-1 p-4 overflow-y-auto space-y-3 text-xs leading-relaxed custom-scrollbar"
              onClick={() => inputRef.current?.focus()}
            >
              {history.map((item, idx) => (
                <div key={idx}>
                  {item.type === 'system' && (
                    <div className="text-cyan-400/90 font-medium flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-cyan-400 shrink-0" />
                      <span>{item.text}</span>
                    </div>
                  )}
                  {item.type === 'user' && (
                    <div className="text-cyan-400 font-bold font-mono">
                      {item.text}
                    </div>
                  )}
                  {item.type === 'output' && (
                    <div className="pl-2 border-l border-slate-800 mt-1">
                      {item.text}
                    </div>
                  )}
                </div>
              ))}
              <div ref={terminalEndRef} />
            </div>

            {/* Quick Command Suggestions Chips */}
            <div className="px-3 py-1.5 bg-slate-900/50 border-t border-slate-800/80 flex flex-wrap gap-1.5 text-[11px] overflow-x-auto no-scrollbar">
              <span className="text-slate-500 self-center mr-1">Saran:</span>
              {['help', 'about', 'skills', 'projects', 'contact', 'clear'].map((cmd) => (
                <button
                  key={cmd}
                  onClick={() => {
                    setInputVal(cmd)
                    inputRef.current?.focus()
                  }}
                  className="px-2 py-0.5 rounded bg-slate-800/80 hover:bg-cyan-950 hover:text-cyan-300 text-slate-400 border border-slate-700/50 transition-colors"
                >
                  {cmd}
                </button>
              ))}
            </div>

            {/* Terminal Input Prompt */}
            <form
              onSubmit={handleCommandSubmit}
              className="px-4 py-2.5 bg-slate-900/90 border-t border-slate-800 flex items-center gap-2"
            >
              <span className="text-cyan-400 font-bold text-xs select-none">fahrixz@portfolio:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ketik perintah..."
                className="flex-1 bg-transparent border-none outline-none text-xs text-slate-100 font-mono placeholder:text-slate-600"
                autoFocus
              />
              <button
                type="submit"
                className="p-1 text-cyan-400 hover:text-cyan-300 transition-colors"
                title="Kirim Perintah"
              >
                <CornerDownLeft className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
