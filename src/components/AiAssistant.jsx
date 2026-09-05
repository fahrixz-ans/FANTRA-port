import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, Sparkles, Send, X } from 'lucide-react'

export default function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: 'Halo! Saya Fahri AI Assistant. Ada yang bisa saya bantu terkait latar belakang, proyek, atau pengalaman magang Fahri?',
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const chatEndRef = useRef(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  // Global event listener to open floating AI chat window
  useEffect(() => {
    const handleOpenAi = (e) => {
      setIsOpen(true)
      if (e.detail?.prompt) {
        handleSend(e.detail.prompt)
      }
    }
    window.addEventListener('open-ai-chat', handleOpenAi)
    return () => window.removeEventListener('open-ai-chat', handleOpenAi)
  }, [])

  const quickPrompts = [
    'Siapa Fahri Andrian Saputra?',
    'Di mana domisili Fahri?',
    'Apa pengalaman magang PKL Fahri?',
    'Apa saja proyek utama Fahri?',
  ]

  const handleSend = async (textToSend) => {
    const query = textToSend || input
    if (!query.trim() || loading) return

    const userMsg = { role: 'user', text: query }
    setMessages((prev) => [...prev, userMsg])
    if (!textToSend) setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: messages.slice(-6),
        }),
      })

      const data = await res.json()
      if (data.response) {
        setMessages((prev) => [...prev, { role: 'assistant', text: data.response }])
      } else {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', text: 'Maaf, terjadi masalah koneksi. Silakan coba beberapa saat lagi.' },
        ])
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', text: 'Fahri AI sedang memuat offline fallback. Anda dapat menjelajahi portofolio secara langsung!' },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Trigger floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-gradient-to-tr from-galaxy-primary to-galaxy-secondary text-galaxy-bg font-bold shadow-xl shadow-galaxy-primary/20 hover:scale-105 transition-transform flex items-center gap-2 group cursor-pointer"
        aria-label="Tanya AI Assistant"
      >
        <Bot className="w-5 h-5 text-galaxy-bg" />
        <span className="hidden md:inline text-xs font-semibold tracking-wide pr-1">
          Tanya AI
        </span>
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-22 right-4 md:right-6 z-50 w-[calc(100vw-2rem)] md:w-96 bg-galaxy-card border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[500px]"
          >
            {/* Header */}
            <div className="p-4 bg-galaxy-card-alt border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-galaxy-primary/10 border border-galaxy-primary/30 text-galaxy-primary flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-galaxy-text">
                    Fahri AI Assistant
                  </h3>
                  <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                    Gemini 3.5 Flash Active
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-galaxy-muted hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-galaxy-bg/60 text-xs">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl leading-relaxed ${
                      m.role === 'user'
                        ? 'bg-galaxy-primary text-galaxy-bg font-medium rounded-tr-none'
                        : 'bg-galaxy-card-alt text-galaxy-text border border-white/5 rounded-tl-none'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-galaxy-card-alt text-galaxy-muted border border-white/5 p-3 rounded-2xl rounded-tl-none text-xs flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-galaxy-primary animate-pulse" />
                    <span>Fahri AI sedang berpikir...</span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Prompts */}
            {messages.length < 3 && (
              <div className="p-2 border-t border-white/5 bg-galaxy-card-alt flex gap-1.5 overflow-x-auto scrollbar-none">
                {quickPrompts.map((qp, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(qp)}
                    className="shrink-0 text-[10px] px-2.5 py-1 bg-white/5 hover:bg-galaxy-primary/10 hover:border-galaxy-primary/30 border border-white/5 rounded-full text-galaxy-muted hover:text-galaxy-primary transition-all whitespace-nowrap cursor-pointer"
                  >
                    {qp}
                  </button>
                ))}
              </div>
            )}

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSend()
              }}
              className="p-3 border-t border-white/10 bg-galaxy-card flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Tanyakan sesuatu tentang Fahri..."
                className="flex-1 bg-galaxy-card-alt border border-white/10 rounded-xl px-3 py-2 text-xs text-galaxy-text focus:outline-none focus:border-galaxy-primary transition-colors"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="p-2 rounded-xl bg-galaxy-primary text-galaxy-bg font-bold disabled:opacity-50 hover:scale-105 transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
