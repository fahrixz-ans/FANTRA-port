# PANDUAN DEPLOY

## Deploy ke Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login dan deploy:
```bash
vercel login
vercel --prod
```

Atau gunakan GitHub Integration:
- Push ke GitHub repository
- Connect repository di dashboard Vercel
- Auto-deploy setiap push

## Deploy ke Netlify

1. Build project:
```bash
npm run build
```

2. Deploy folder `dist/`:
- Drag & drop folder `dist/` ke Netlify dashboard
- Atau gunakan Netlify CLI

```bash
npm i -g netlify-cli
netlify deploy --prod --dir=dist
```

## Konfigurasi SPA Redirect

File `vercel.json` dan `netlify.toml` sudah dikonfigurasi untuk SPA redirect.
Semua route akan diarahkan ke `index.html`.

## Environment Variables (jika menggunakan Supabase)

Jika ingin menggunakan environment variables untuk Supabase:

```bash
# .env file
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Ubah `portfolioData.js` untuk membaca dari environment variables.

## Setelah Deploy

- Verifikasi semua gambar loading dengan benar
- Test navigasi dan smooth scroll
- Test guestbook submission
- Test responsive di mobile
- Verifikasi meta tags dengan https://metatags.io
