import { motion, AnimatePresence } from 'framer-motion'
import { data } from '../data/portfolioData'
import { soundManager } from '../lib/soundManager'

export default function DownloadCVModal({ isOpen, onClose }) {
  if (!isOpen) return null

  const handleClose = () => {
    soundManager.play('close')
    onClose()
  }

  const handleDownload = () => {
    soundManager.play('download')
  }

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
        onClick={handleClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="bg-galaxy-card border border-white/10 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-5 border-b border-white/10 flex items-center justify-between bg-galaxy-card-alt">
            <div>
              <span className="text-[10px] font-mono text-galaxy-primary font-bold uppercase">
                DOKUMEN RESMI
              </span>
              <h3 className="text-lg font-bold text-galaxy-text">
                Unduh Kurikulum Vitae & Portofolio
              </h3>
            </div>
            <button
              onClick={handleClose}
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-galaxy-muted hover:text-white"
            >
              ✕
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            <p className="text-xs text-galaxy-muted leading-relaxed">
              Pilih format dokumen resmi yang ingin Anda unduh untuk informasi kualifikasi lengkap Fahri Andrian Saputra:
            </p>

            <div className="space-y-3">
              <a
                href={data.about.ctaLink}
                download="CV_Fahri_Andrian_Saputra.pdf"
                onClick={handleDownload}
                className="p-4 rounded-xl bg-galaxy-card-alt border border-white/10 hover:border-galaxy-primary/40 flex items-center justify-between group transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-galaxy-primary/10 text-galaxy-primary flex items-center justify-center font-bold text-lg">
                    📄
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-galaxy-text group-hover:text-galaxy-primary transition-colors">
                      Curriculum Vitae (CV) PDF
                    </h4>
                    <p className="text-[11px] text-galaxy-muted">
                      Riwayat hidup lengkap, pendidikan, PKL, dan sertifikasi.
                    </p>
                  </div>
                </div>
                <span className="btn-primary text-xs py-1.5 px-3">Unduh</span>
              </a>

              <a
                href={data.about.ctaLink}
                download="Portfolio_Summary_Fahri.pdf"
                onClick={handleDownload}
                className="p-4 rounded-xl bg-galaxy-card-alt border border-white/10 hover:border-galaxy-primary/40 flex items-center justify-between group transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-galaxy-secondary/10 text-galaxy-secondary flex items-center justify-center font-bold text-lg">
                    📁
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-galaxy-text group-hover:text-galaxy-primary transition-colors">
                      Ringkasan Portofolio Proyek
                    </h4>
                    <p className="text-[11px] text-galaxy-muted">
                      Daftar proyek web interaktif dan screenshot aplikasi.
                    </p>
                  </div>
                </div>
                <span className="btn-outline text-xs py-1.5 px-3">Unduh</span>
              </a>
            </div>
          </div>

          <div className="p-4 border-t border-white/10 bg-galaxy-card-alt text-right">
            <button onClick={handleClose} className="btn-outline text-xs py-1.5 px-4">
              Tutup
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
