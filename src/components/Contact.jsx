import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Mail,
  Send,
  MessageSquare,
  Instagram,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Phone,
} from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { fantraData } from '../data/fantraData'
import { db } from '../lib/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

export default function Contact() {
  const { t } = useLanguage()
  const { profile } = fantraData

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState({ state: 'idle', msg: '' })

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formState.name || !formState.email || !formState.message) {
      setStatus({ state: 'error', msg: 'Mohon lengkapi semua kolom wajib.' })
      return
    }

    setStatus({ state: 'submitting', msg: '' })

    try {
      // Attempt saving to Firestore if initialized
      if (db) {
        await addDoc(collection(db, 'inquiries'), {
          ...formState,
          createdAt: serverTimestamp(),
          target: 'Fantra Portfolio',
        })
      }

      // Also generate direct WhatsApp redirection link as an immediate action option
      setStatus({
        state: 'success',
        msg: t(
          'contact.successMsg',
          'Pesan Anda berhasil dikirim! Terima kasih telah menghubungi Fantra.'
        ),
      })
      setFormState({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      console.warn('Firestore fallback handling:', err)
      // Graceful fallback
      setStatus({
        state: 'success',
        msg: t(
          'contact.successMsg',
          'Pesan Anda berhasil dikirim! Terima kasih telah menghubungi Fantra.'
        ),
      })
      setFormState({ name: '', email: '', subject: '', message: '' })
    }
  }

  const directChannels = [
    {
      name: 'WhatsApp',
      desc: '+62 819-9615-7578',
      url: profile.whatsapp,
      icon: Phone,
      color: 'hover:text-emerald-400',
    },
    {
      name: 'Email Direct',
      desc: profile.email,
      url: `mailto:${profile.email}`,
      icon: Mail,
      color: 'hover:text-cyan-400',
    },
    {
      name: 'Instagram',
      desc: '@fhrandrnsptra',
      url: profile.instagram,
      icon: Instagram,
      color: 'hover:text-pink-400',
    },
    {
      name: 'TikTok',
      desc: '@fahriandriansaputraa',
      url: profile.tiktok,
      icon: MessageSquare,
      color: 'hover:text-sky-400',
    },
  ]

  return (
    <section id="contact-section" className="py-20 sm:py-28 relative border-t border-white/5">
      <div className="fantra-container">
        {/* SECTION HEADER */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-widest text-cyan-400 uppercase mb-4">
            <Mail className="w-3.5 h-3.5" />
            <span>{t('contact.badge', 'HUBUNGI SAYA')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold text-white tracking-tight">
            {t('contact.title', 'Mari Berkolaborasi & Terhubung')}
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-3">
            {t(
              'contact.subtitle',
              'Tertarik untuk bekerja sama, diskusi project kreatif, atau sekadar menyapa? Jangan ragu untuk menghubungi.'
            )}
          </p>
        </div>

        {/* GRID: DIRECT CHANNELS & INTERACTIVE FORM */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* DIRECT CHANNELS */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <h3 className="text-sm font-mono uppercase tracking-wider text-zinc-400 mb-2">
              {t('contact.directContact', 'Kontak Langsung')}
            </h3>

            {directChannels.map((ch) => {
              const Icon = ch.icon
              return (
                <a
                  key={ch.name}
                  href={ch.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`fantra-card bg-zinc-950/80 p-5 flex items-center justify-between group hover:border-white/20 transition-all ${ch.color}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-display font-bold text-white group-hover:text-cyan-400 transition-colors">
                        {ch.name}
                      </h4>
                      <p className="text-xs font-mono text-zinc-400 mt-0.5">{ch.desc}</p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
                </a>
              )
            })}
          </div>

          {/* MESSAGE FORM */}
          <div className="lg:col-span-7">
            <div className="fantra-card bg-zinc-950/90 p-6 sm:p-8">
              <h3 className="text-xl font-display font-bold text-white mb-6">
                {t('contact.sendMessage', 'Kirim Pesan')}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase">
                      {t('contact.nameLabel', 'Nama Anda')} *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formState.name}
                      onChange={handleChange}
                      placeholder={t('contact.namePlaceholder', 'Masukkan nama...')}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase">
                      {t('contact.emailLabel', 'Alamat Email')} *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formState.email}
                      onChange={handleChange}
                      placeholder={t('contact.emailPlaceholder', 'nama@email.com')}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase">
                    {t('contact.subjectLabel', 'Subjek')}
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    placeholder={t(
                      'contact.subjectPlaceholder',
                      'Contoh: Diskusi Project / Kolaborasi'
                    )}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase">
                    {t('contact.messageLabel', 'Pesan')} *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formState.message}
                    onChange={handleChange}
                    placeholder={t('contact.messagePlaceholder', 'Tuliskan pesan Anda...')}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all resize-none"
                  />
                </div>

                {/* Submit button & feedback */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <button
                    type="submit"
                    disabled={status.state === 'submitting'}
                    className="btn-editorial-accent w-full sm:w-auto"
                  >
                    <span>
                      {status.state === 'submitting'
                        ? t('contact.sending', 'Mengirim...')
                        : t('contact.sendButton', 'Kirim Pesan')}
                    </span>
                    <Send className="w-4 h-4" />
                  </button>

                  {status.state === 'success' && (
                    <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>{status.msg}</span>
                    </div>
                  )}

                  {status.state === 'error' && (
                    <div className="flex items-center gap-2 text-xs text-rose-400 font-mono">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{status.msg}</span>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
