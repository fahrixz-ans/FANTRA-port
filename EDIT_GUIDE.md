# PANDUAN EDIT DATA PORTOFOLIO

File data utama: `src/data/portfolioData.js`

---

## A. MENAMBAH PROYEK BARU

1. Siapkan thumbnail proyek (aspect ratio 16:9, .jpg)
2. Simpan ke folder: `public/proyek-[nomor].jpg`
3. Buka `src/data/portfolioData.js`
4. Cari bagian `projects: [`
5. Tambahkan objek baru di AKHIR array (sebelum penutup `]`):

```javascript
{
  id: 5, // Nomor urut berikutnya
  nama: "Nama Proyek Baru",
  deskripsi: "Deskripsi singkat proyek.",
  tech: ["React", "Node.js"], // Array teknologi yang digunakan
  liveDemo: "https://link-demo.com", // Bisa "#" jika belum ada
  github: "https://github.com/fahri/repo",
  thumbnail: "/proyek-5.jpg", // Sesuaikan nomor gambar
  fitur: ["Fitur 1", "Fitur 2", "Fitur 3"],
},
```

6. Simpan file, website akan otomatis update (jika dev mode)
7. Rebuild dan redeploy

---

## B. MENGUBAH DATA PRIBADI

Buka `src/data/portfolioData.js` → cari bagian `personal:`

```javascript
personal: {
  namaLengkap: "Nama Baru",         // Nama lengkap
  namaPanggilan: "Panggilan",       // Nama panggilan (di navbar)
  tagline: "Web Developer",         // Tagline profesional
  email: "email@baru.com",          // Email kontak
  githubUrl: "https://github.com/…",
  linkedinUrl: "https://linkedin.com/in/…",
  instagramUrl: "https://instagram.com/…",
  lokasi: "Kota, Provinsi",         // Lokasi
  tahunUpdate: 2026,                // Tahun copyright
},
```

---

## C. MENAMBAH SERTIFIKAT BARU

1. Simpan gambar sertifikat ke: `public/sertifikat-[nomor].jpg`
2. Buka `src/data/portfolioData.js` → cari `certificates: [`
3. Tambahkan path gambar baru:

```javascript
certificates: [
  "/sertifikat-1.jpg",
  "/sertifikat-2.jpg",
  // ... tambahkan di sini
  "/sertifikat-7.jpg", // Yang baru
],
```

---

## D. MENAMBAH GALLERY / DOKUMENTASI BARU

1. Simpan gambar ke: `public/gallery-[nomor].jpg`
2. Buka `src/data/portfolioData.js` → cari `gallery: [`
3. Tambahkan path gambar baru di array

---

## E. MENGUBAH DATA PENDIDIKAN

Buka `src/data/portfolioData.js` → cari bagian `education:`

```javascript
education: {
  sd: { nama: "…", kota: "…", tahunLulus: 2018, logoPath: "/logo-sd.png" },
  smp: { nama: "…", kota: "…", tahunLulus: 2021, logoPath: "/logo-smp.png" },
  smk: {
    nama: "NAMA SEKOLAH",     // Ganti ini
    kota: "KOTA",
    jurusan: "Rekayasa Perangkat Lunak (RPL)",
    tahunLulus: 2024,
    logoPath: "/logo-smk.png" // Ganti jika punya logo
  },
},
```

---

## F. MENAMBAH SKILL BARU

Buka `src/data/portfolioData.js` → cari `skills: [`

Tambahkan objek baru:

```javascript
{
  icon: "Si[IconName]",   // Nama icon dari react-icons/si
  nama: "Nama Skill",
  level: 80,              // 0-100 (persentase)
  deskripsi: "Penjelasan 1-2 baris."
},
```

---

## G. MENGUBAH DATA PKL

Buka `src/data/portfolioData.js` → cari bagian `pkl:`

```javascript
pkl: {
  namaPerusahaan: "PT. …",
  lokasi: "Kota",
  periode: "Januari – Maret 2026",
  role: "Web Developer Intern",
  ringkasan: "Deskripsi pengalaman…",
  sertifikatLink: "#", // Ganti dengan link sertifikat
  foto: [
    { path: "/pkl-1.jpg", caption: "Keterangan foto" },
    // Tambahkan foto baru di sini
  ],
},
```

---

## H. SETUP SUPABASE (GUESTBOOK)

1. Daftar di https://supabase.com (gratis)
2. Buat project baru
3. Buka SQL Editor, jalankan:

```sql
CREATE TABLE guestbook (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

4. Buka Project Settings → API
5. Copy "URL" dan "anon public" key
6. Paste ke `src/data/portfolioData.js`:

```javascript
supabase: {
  url: "https://your-project.supabase.co",
  anonKey: "your-anon-key-here",
},
```

---

## I. DEPLOY UPDATE

Setelah mengubah data:

1. `npm run build`
2. Deploy folder `dist/` ke Netlify/Vercel
3. (atau push ke GitHub jika auto-deploy)
