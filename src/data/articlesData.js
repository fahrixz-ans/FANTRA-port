// Centralized Articles & Wawasan Data for Fahri Xz Portfolio

export const articles = [
  {
    id: "capcut-rhythm-sync",
    slug: "panduan-membuat-preset-capcut-viral-dengan-rhythm-audio-sync",
    title: "Panduan Membuat Preset & Template CapCut Viral dengan Rhythm Audio Sync",
    category: "Content Creation",
    excerpt: "Langkah praktis merancang preset video CapCut yang menarik ribuan pengguna dengan memanfaatkan transisi audio beat sync, color grading, dan motion animation.",
    date: "04 Agustus 2026",
    readTime: "5 min baca",
    author: "Fahri Xz",
    authorRole: "Digital Creator & Video Editor",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    featuredImage: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1200&auto=format&fit=crop",
    tags: ["CapCut", "Video Editing", "Content Creation", "Beat Sync", "Motion Animation"],
    content: `
# Pendahuluan

Di era konten serba cepat seperti TikTok, Instagram Reels, dan YouTube Shorts, daya tarik visual dalam 3 detik pertama sangat menentukan apakah sebuah video akan ditonton hingga selesai atau di-swipe. Salah satu metode yang terbukti meningkatkan keterlibatan penonton (*engagement*) hingga 300% adalah **Rhythm Audio Sync** — teknik menyelaraskan pergantian potret/video (*cut-point*) secara presisi dengan ketukan instrumen audio (*beat/rhythm*).

Sebagai seorang konten kreator dan pembuat preset CapCut, saya telah merancang puluhan template yang digunakan oleh ribuan pengguna di Indonesia. Dalam artikel ini, saya akan mengupas tuntas rahasia di balik pembuatan preset CapCut yang siap viral.

---

# Apa Itu Rhythm Audio Sync?

**Rhythm Audio Sync** adalah seni memadukan gelombang frekuensi suara (*waveform audio*) dengan transisi visual. Ketika mata penonton melihat perubahan gambar tepat saat telinga mereka mendengar pukulan *bass/snare*, otak meresponsnya sebagai pengalaman sensorik yang memuaskan (*visually satisfying*).

> "Video terbaik bukan sekadar memiliki gambar yang bagus, melainkan bagaimana ritme gambar dan lagu menyatu tanpa celah." — Fahri Xz

## Elemen Kunci Audio Beat Sync:
1. **Audio Waveform Analysis**: Memilih titik transisi berdasarkan puncak frekuensi (*transient peak*).
2. **Keyframe Velocity Ramp**: Efek percepatan (*speed ramp*) yang lambat kemudian melesat saat beat memuncak.
3. **Flash & Zoom Reaction**: Efek pencahayaan putih tipis (*light leak*) atau zoom membal (*bounce zoom*) di setiap ketukan nada.

---

# Cara Membuat Preset CapCut Step-by-Step

Berikut langkah-langkah praktis merancang template CapCut agar dapat digunakan dengan mudah oleh pengguna lain:

### Step 1: Penyiapan Musik & Beat Marker
- Buka aplikasi CapCut, impor audio pilihan.
- Klik track audio, pilih menu **Irama (Match Cut / Auto Beat)**.
- Tambahkan penanda (*yellow beats*) pada setiap hentakan instrumen utama.

### Step 2: Pengaturan Durasi Media & Cut Point
- Masukkan klip foto atau video pendukung.
- Potong setiap media tepat pada titik *yellow beats*.
- Untuk segmen *fast beat*, gunakan durasi antar-klip antara **0.2s hingga 0.5s**.

### Step 3: Penerapan Kurva Kecepatan (Speed Curve)
Gunakan kurva kecepatan kustom (*Custom Curve*) untuk menciptakan ritme *smooth*:
- Titik awal: **0.5x (Slow)**
- Titik puncak hentakan: **3.0x (Fast)**
- Titik akhir: **1.0x (Normal)**

\`\`\`css
/* Contoh Logika Kecepatan Motion (CSS Keyframes Analogy) */
@keyframes beatBounce {
  0% { transform: scale(1.0); filter: brightness(100%); }
  30% { transform: scale(1.15); filter: brightness(130%); }
  100% { transform: scale(1.0); filter: brightness(100%); }
}
\`\`\`

### Step 4: Color Grading & Filter Atmospheric
- Sesuaikan **Kontras (+10)**, **Saturasi (+5)**, dan **Pertajam (+15)**.
- Gunakan efek *Cinematic Teal & Orange* untuk memberikan kesan estetis yang konsisten.

---

# Tips Optimasi Agar Template Dipakai Banyak Orang

1. **Fleksibilitas Foto/Video**: Jangan membuat slot media terlalu banyak (ideal antara 3 hingga 8 media). Pengguna lebih menyukai template yang cepat dibuat.
2. **Gunakan Teks yang Disesuaikan**: Sediakan slot teks kustom seperti kata-kata motivasi atau judul tren.
3. **Gunakan Cover Thumbnail Menarik**: Pilih cuplikan video paling estetis sebagai gambar sampul template.

---

# Kesimpulan

Membuat preset CapCut yang viral bukanlah kebetulan semata, melainkan kombinasi riset audio tren, kepresisian waktu (*timing*), dan penyajian visual yang estetik. Dengan menerapkan teknik **Rhythm Audio Sync** di atas, template buatanmu akan terasa lebih hidup dan berkesan bagi para penonton.
`
  },
  {
    id: "mengelola-fahrizx-store",
    slug: "mengelola-fahrizx-store-pengalaman-bisnis-online-berbasis-whatsapp",
    title: "Mengelola FahriXz Store: Pengalaman Bisnis Online Berbasis WhatsApp",
    category: "Bisnis & Entrepreneurship",
    excerpt: "Bagaimana mengelola usaha mandiri jual beli akun game dan jasa desain logo secara profesional melayani pelanggan melalui WhatsApp.",
    date: "20 Juli 2026",
    readTime: "4 min baca",
    author: "Fahri Xz",
    authorRole: "Digital Entrepreneur",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    featuredImage: "https://images.unsplash.com/photo-1556742049-0a67d1633513?q=80&w=1200&auto=format&fit=crop",
    tags: ["Entrepreneurship", "WhatsApp Business", "FahriXz Store", "Digital Marketing", "Pelayanan Pelanggan"],
    content: `
# Pendahuluan

Memulai usaha mandiri di usia muda membutuhkan keberanian, ketekunan, dan adaptasi terhadap tren transaksi digital. Pada rentang tahun 2022 hingga 2024, saya mendirikan dan mengelola **FahriXz Store**, sebuah unit bisnis online berbasis platform komunikasi **WhatsApp**. 

Fokus bisnis ini melayani kebutuhan komunitas digital, khususnya dalam **jual beli akun game aman (Mobile Legends, Free Fire, dll)** serta **jasa desain logo & identitas visual kustom**.

---

# Mengapa Memilih WhatsApp Sebagai Platform Utama?

WhatsApp bukan sekadar aplikasi percakapan sehari-hari, melainkan saluran penjualan terbukti (*high conversion sales channel*) untuk konsumen Indonesia.

## Keunggulan WhatsApp Business:
- **Respon Waktu Nyata (Real-time Communication)**: Membangun kedekatan langsung dengan calon pembeli.
- **Fitur Katalog Produk**: Menampilkan daftar akun ready dan portofolio desain secara rapi.
- **Label Pesanan (Labels & Tagging)**: Memudahkan pemisahan antara transaksi *Proses*, *Selesai*, dan *After-Sales Support*.

---

# Pilar Utama Operasional FahriXz Store

Sektor jual beli akun game di internet sering kali diterpa isu ketidakpercayaan dan risiko penipuan. Untuk mengatasi tantangan tersebut, saya menerapkan 3 pilar operasional:

### 1. Transparansi & Verifikasi Data Akun
Setiap akun game yang terdaftar di katalog diaudit secara menyeluruh:
- Pemastian identitas pemilik asli (*first owner verification*).
- Pengecekan riwayat bind (Email, Moonton, Google, Facebook).
- Garansi keamanan data transaksi (*Middleman Safety Assurance*).

### 2. Standar Pelayanan Jasa Desain Visual
Untuk pengerjaan desain logo dan aset grafis:
1. **Briefing Awal**: Diskusi konsep, tema warna, dan referensi keinginan klien.
2. **Draft Sketsa**: Penyajian 2 opsi sketsa kasar sebelum finisalisasi.
3. **Revisi Responsif**: Pengerjaan revisi cepat dan pengiriman file final berformat HD (PNG/SVG/PSD).

> "Kepercayaan pelanggan adalah mata uang tertinggi dalam bisnis digital. Satu transaksi yang memuaskan akan mendatangkan sepuluh rujukan baru." — Fahri Xz

---

# Strategi Pemasaran Digital & CRM Sederhana

\`\`\`json
{
  "storeName": "FahriXz Store",
  "channel": "WhatsApp Business",
  "activePeriod": "2022 - 2024",
  "services": ["Account Trading", "Custom Logo Design"],
  "coreValues": ["Fast Response", "Trust Guarantee", "Transparent Pricing"]
}
\`\`\`

- **Sistem Flash Promo di Status WhatsApp**: Memanfaatkan fitur Story/Status untuk memposting stok akun *limited deal*.
- **Program Loyalitas**: Memberikan diskon khusus atau bonus desain bagi pelanggan yang melakukan *repeat order*.
- **Testimoni & Rekap Transaksi**: Mendokumentasikan *screenshot* kepuasan pembeli sebagai *social proof* terpercaya.

---

# Pembelajaran Berharga (Takeaways)

Mengelola FahriXz Store mengasah kemampuan praktis saya dalam:
- Komunikasi persuasif & negosiasi harga.
- Manajemen waktu antara tugas sekolah dan layanan transaksi.
- Manajemen keuangan bisnis, arus kas (*cash flow*), dan pencatatan modal.

Pengalaman riil ini menjadi fondasi kuat yang melengkapi ilmu pendidikan akademis saya di jurusan **Bisnis Digital SMKN 1 Kotaagung Timur**.
`
  },
  {
    id: "strategi-layanan-pelanggan",
    slug: "strategi-layanan-pelanggan-dan-operasional-ritel-modern",
    title: "Strategi Layanan Pelanggan & Operasional Ritel Modern",
    category: "Bisnis & Ritel",
    excerpt: "Pelajaran berharga dari pengalaman kerja ekspedisi, konsultan bisnis, dan praktik kerja di minimarket serta toko alat tulis.",
    date: "15 Mei 2026",
    readTime: "5 min baca",
    author: "Fahri Xz",
    authorRole: "Operational & Service Specialist",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    featuredImage: "https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=1200&auto=format&fit=crop",
    tags: ["Ritel", "Layanan Pelanggan", "Operasional", "Pengalaman Kerja", "Bisnis Digital"],
    content: `
# Pendahuluan

Dunia operasional ritel dan layanan pelanggan (*customer service*) merupakan tulang punggung ekonomi modern. Mulai dari penataan produk di rak minimarket, kecepatan pengantaran kurir ekspedisi, hingga komunikasi profesional seorang konsultan bisnis — semuanya menuntut disiplin tinggi dan empati terhadap pelanggan.

Dalam artikel ini, saya membagikan wawasan praktis yang dipetik dari pengalaman riil saya di **Top Mart Mekar Barokah**, **Larisso Stationery**, **Shopee Xpress Kotaagung Hub**, dan **PT BESTPROFIT FUTURES**.

---

# 1. Efisiensi Merchandising & Display Produk (PKL Top Mart & Larisso)

Saat melaksanakan Praktik Kerja Lapangan (PKL), tugas utama tidak sekadar menata barang, melainkan menciptakan **Visual Merchandising** yang menarik minat beli konsumen.

## Prinsip Penting Menata Rak Ritel:
- **First In, First Out (FIFO)**: Produk dengan tanggal kedaluwarsa lebih awal ditempatkan di barisan depan.
- **Eye-Level Is Buy-Level**: Produk unggulan dipajang pada ketinggian sejajar dengan mata orang dewasa (sekitar 120cm - 150cm).
- **Label Harga & Barcode Akurat**: Memastikan tidak ada perbedaan harga antara rak dan sistem kasir POS untuk menghindari kekecewaan konsumen.

---

# 2. Kecepatan & Akurasi Logistik (Kurir Shopee Xpress)

Bekerja di industri logistik ekspedisi mengajarkan pentingnya manajemen rute dan ketepatan waktu.

> "Paket yang sampai tepat waktu dengan kondisi mulus adalah bentuk penghormatan tertinggi kepada rasa percaya konsumen." — Fahri Xz

### Standar Kerja Ekspedisi Modern:
1. **Sortir & Scanning Presisi**: Memastikan paket sesuai dengan kode area alamat tujuan (*Hub Routing*).
2. **Manajemen Rute Pengantaran**: Menyusun urutan pengantaran berdasarkan kedekatan geografis untuk menghemat waktu dan bahan bakar.
3. **SOP Penyerahan Paket**: Melakukan verifikasi nama penerima, pengambilan bukti foto pengantaran (*Proof of Delivery*), dan menjaga keetikaan saat mengetuk pintu pelanggan.

---

# 3. Komunikasi Persuasif & Edukasi Nasabah (PT BESTPROFIT FUTURES)

Sebagai Staff Konsultan Bisnis di Bandar Lampung, tantangan utamanya adalah mengedukasi calon nasabah mengenai peluang investasi dan risiko secara jujur dan transparan.

### Kunci Sukses Komunikasi Konsultatif:
- **Active Listening**: Mendengarkan profil kebutuhan dan tingkat toleransi risiko calon nasabah sebelum menyodorkan solusi.
- **Penyampaian Edukatif**: Menggunakan bahasa yang sederhana tanpa istilah teknis yang membingungkan.
- **Follow-Up Konsisten & Etis**: Menjaga hubungan profesional jangka panjang tanpa terkesan memaksa.

---

# Kesimpulan

Pengalaman lintas sektor — dari ritel fisik, ekspedisi logistik, hingga konsultasi bisnis — membentuk pola pikir yang solutif dan adaptif. Nilai-nilai seperti **kejujuran, ketelitian, disiplin waktu, dan pelayanan sepenuh hati** adalah kunci utama sukses di dunia kerja profesional modern.
`
  },
  {
    id: "membangun-portfolio-react-tailwind",
    slug: "membangun-portfolio-developer-interaktif-dengan-react-dan-tailwind",
    title: "Membangun Portfolio Developer Interaktif dengan React dan Tailwind",
    category: "Web Dev",
    excerpt: "Panduan mendalam merancang website portofolio interaktif berkinerja tinggi lengkap dengan efek suara SFX, animasi galaksi, dan integrasi AI.",
    date: "12 Juni 2026",
    readTime: "6 min baca",
    author: "Fahri Xz",
    authorRole: "Web Developer",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    featuredImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop",
    tags: ["React", "Tailwind CSS", "Web Development", "UI/UX", "Interactive"],
    content: `
# Pendahuluan

Website portofolio pribadi adalah kartu nama digital terbaik bagi pengembang web. Di era web modern, portofolio yang statis dan membosankan mulai ditinggalkan. Penonton mengharapkan pengalaman pengguna (*User Experience*) yang imersif, responsif, berkinerja tinggi, dan memiliki karakter visual yang kuat.

Dalam artikel ini, saya membagikan arsitektur teknik di balik pembuatan **Website Portofolio Fahri Xz v3.0**, yang menggabungkan elemen visual tema galaksi, sintesis suara Web Audio API, serta fitur AI Gemini.

---

# Arsitektur & Tech Stack Utama

Untuk mencapai kecepatan muat halaman (*load time*) di bawah 1.2 detik dan animasi yang mulus di 60 FPS, pilihan alat pengembang menjadi sangat krusial:

1. **Vite + React 18**: Bundler super cepat dengan Hot Module Replacement (HMR) dan pohon komponen modular.
2. **Tailwind CSS v3/v4**: Utility-first CSS framework untuk styling presisi, skema warna galaksi kustom, dan responsivitas instan.
3. **Framer Motion**: Library animasi deklaratif untuk efek kemunculan *fade-in*, galaksi card floating, serta transisi modal.
4. **Web Audio API**: Sintesis efek suara UI SFX secara native tanpa mendownload file audio mp3 eksternal yang berat.

---

# Implementasi Web Audio API untuk Sound System Interactive

Salah satu fitur unik dalam portofolio ini adalah **UI Sound System**. Ketika pengguna menekan tombol, menyaring proyek, atau membuka preview browser, efek suara fusturistis dimainkan secara instan.

\`\`\`javascript
// Contoh sederhana Web Audio API Synthesizer Chime
function playSuccessChime(audioCtx) {
  const now = audioCtx.currentTime;
  const chord = [659.25, 830.61, 987.77]; // E5, G#5, B5
  
  chord.forEach((freq, idx) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now + idx * 0.04);
    
    gain.gain.setValueAtTime(0.08, now + idx * 0.04);
    gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.04 + 0.12);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.start(now + idx * 0.04);
    osc.stop(now + idx * 0.04 + 0.13);
  });
}
\`\`\`

---

# Desain Responsif & Komposisi Typography

\`\`\`html
<!-- Struktur Container Responsif Tailwind -->
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
  <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-galaxy-text">
    Desain Modern Berdaya Saing Tinggi
  </h1>
</div>
\`\`\`

- **Fluid Spacing**: Menggunakan skala spacing konsisten \`py-12 md:py-20\`.
- **Typographic Scale**: Hirarki teks jelas dari H1 hingga label caption terkecil \`text-[10px]\`.
- **Card Glassmorphism**: Pemakaian efek \`backdrop-blur-xl bg-galaxy-card/80 border border-white/10\`.

---

# Kesimpulan

Menggabungkan estetika visual yang matang, kecepatan performa, dan interaksi mendetail seperti efek suara UI akan melipatgandakan daya pikat portofolio milikmu di mata calon klien maupun perekrut kerja.
`
  },
  {
    id: "pemanfaatan-gemini-ai-workflow",
    slug: "pemanfaatan-gemini-ai-dan-tools-digital-dalam-workflow-kreatif",
    title: "Pemanfaatan Gemini AI dan Tools Digital Dalam Workflow Kreatif",
    category: "AI & Tech",
    excerpt: "Eksplorasi penggunaan kecerdasan buatan Gemini AI, Termux, dan MT Manager di perangkat mobile untuk mempercepat produktivitas coding dan pembuatan konten.",
    date: "28 April 2026",
    readTime: "4 min baca",
    author: "Fahri Xz",
    authorRole: "Tech Enthusiast",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    featuredImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
    tags: ["Gemini AI", "Artificial Intelligence", "Termux", "Mobile Coding", "Productivity"],
    content: `
# Pendahuluan

Perkembangan teknologi Kecerdasan Buatan (*Artificial Intelligence*) telah mengubah landskap produktivitas secara drastis. AI bukan lagi sekadar alat eksperimen, melainkan mitra kerja harian (*co-pilot*) yang mempercepat proses analisis kode, pencarian bug, riset ide, hingga penulisan artikel.

Uniknya, seluruh alur kerja kreatif saya lakukan dengan memanfaatkan smartphone **Infinix Smart 8 Pro** didukung lingkungan terminal **Termux** dan model **Gemini AI**.

---

# Alur Kerja Kreatif Berbasis AI & Mobile Setup

Membangun proyek perangkat lunak dari smartphone Android kini bukan lagi hal yang tidak mungkin.

## Tools & Ekosistem Utama:
1. **Gemini AI (Gemini 2.5 Flash)**: Mengidentifikasi bug syntax, memberikan rekomendasi refactoring kode, dan melakukan penulisan ringkasan teks otomatis.
2. **Termux (Linux Terminal CLI)**: Menjalankan skrip Node.js, Git version control, dan paket CLI langsung di ponsel.
3. **MT Manager**: Melakukan eksplorasi struktur direktori, pengeditan berkas cepat, dan verifikasi manifest.

> "Keterbatasan perangkat fisik bukanlah penghalang untuk berkarya. Pemahaman logika dan pemanfaatan AI yang tepat adalah kunci utamanya." — Fahri Xz

---

# Contoh Integrasi Gemini SDK di Node.js / Express

Berikut adalah gambaran bagaimana backend Express menggunakan paket \`@google/genai\` untuk memproses ringkasan konten secara dinamis:

\`\`\`typescript
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateArticleSummary(title: string, content: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: \`Buatkan ringkasan singkat maksimal 3 kalimat bahasa Indonesia untuk artikel berikut:\\nJudul: \${title}\\nKonten: \${content}\`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini AI Error:", error);
    return "Ringkasan otomatis tidak dapat dimuat saat ini.";
  }
}
\`\`\`

---

# Manfaat Nyata Dalam Produktivitas Harian

- **Debug Kode 5x Lebih Cepat**: Pesan kesalahan (*error log*) yang rumit dapat dijelaskan oleh AI secara ringkas beserta langkah solusinya.
- **Riset Konten Tren**: Mengeksplorasi kata kunci viral untuk pembuatan preset CapCut dan ide posting sosial media.
- **Otomatisasi Tugas Rutin**: Membuat draf struktur JSON, tipe TypeScript, dan dokumentasi otomatis.

---

# Kesimpulan

AI tidak hadir untuk menggantikan kreativitas manusia, melainkan untuk melipatgandakan potensi dan efisiensi kita. Dengan memadukan pemikiran kritis dan asistensi AI Gemini, seorang kreator dapat menghasilkan karya berkualitas tinggi dari mana saja dan kapan saja.
`
  }
];

export const getArticleBySlug = (slug) => {
  return articles.find((art) => art.slug === slug || art.id === slug) || null;
};

export const getRelatedArticles = (currentSlug, category, limit = 3) => {
  const otherArticles = articles.filter((a) => a.slug !== currentSlug && a.id !== currentSlug);
  const sameCategory = otherArticles.filter((a) => a.category === category);
  
  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }
  
  const remaining = otherArticles.filter((a) => a.category !== category);
  return [...sameCategory, ...remaining].slice(0, limit);
};
