import { useState } from 'react'
import { data } from '../data/portfolioData'

export default function GuestbookForm({ onSubmit }) {
  const guestbook = data.guestbook
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState({})

  const validate = () => {
    const newErrors = {}
    if (!name || name.trim().length < 2) {
      newErrors.name = 'Nama minimal 2 karakter'
    }
    if (!message || message.trim().length < 5) {
      newErrors.message = 'Pesan minimal 5 karakter'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      onSubmit({ name: name.trim(), message: message.trim() })
      setName('')
      setMessage('')
      setErrors({})
    }
  }

  return (
    <div className="galaxy-card max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-galaxy-text mb-2">
            {guestbook.formNamaLabel}
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full bg-galaxy-bg border ${
              errors.name ? 'border-red-500' : 'border-white/10'
            } rounded-lg p-3 text-galaxy-text focus:outline-none focus:border-galaxy-primary transition-colors`}
            placeholder="Nama Anda"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm text-galaxy-text mb-2">
            {guestbook.formPesanLabel}
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className={`w-full bg-galaxy-bg border ${
              errors.message ? 'border-red-500' : 'border-white/10'
            } rounded-lg p-3 text-galaxy-text focus:outline-none focus:border-galaxy-primary transition-colors resize-none`}
            placeholder="Tulis pesan Anda..."
          />
          {errors.message && (
            <p className="text-red-500 text-xs mt-1">{errors.message}</p>
          )}
        </div>

        <button type="submit" className="btn-primary w-full">
          {guestbook.formSubmit}
        </button>
      </form>
    </div>
  )
}
