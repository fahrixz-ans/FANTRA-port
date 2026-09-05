import { Helmet } from 'react-helmet-async'

const defaultSEO = {
  title: 'FahriXz (Fahri Andrian Saputra) — Web Developer & Digital Creator',
  description: 'Website Resmi FahriXz (Fahri Andrian Saputra) — Web Developer, Student Developer & Digital Creator dari Lampung. Showcase proyek web modern, CapCut, Alight Motion, & AR.',
  image: 'https://fahriandriansaputra-portofolio.vercel.app/og-image.jpg',
  url: 'https://fahriandriansaputra-portofolio.vercel.app',
  type: 'website',
  keywords: 'FahriXz, Fahri Andrian Saputra, Fahri Xz, Fasa, web developer portfolio, digital creator, FahriXz project, CapCut creator, Alight Motion preset, student developer Indonesia'
}

export default function SEO({
  title = defaultSEO.title,
  description = defaultSEO.description,
  image = defaultSEO.image,
  url = defaultSEO.url,
  type = defaultSEO.type,
  keywords = defaultSEO.keywords,
  noindex = false
}) {
  const fullTitle = title === defaultSEO.title ? title : `${title} | FahriXz Official`

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Fahri Andrian Saputra',
    alternateName: ['FahriXz', 'Fahri Xz', 'Fasa', 'Fahri'],
    url: 'https://fahriandriansaputra-portofolio.vercel.app',
    image: 'https://fahriandriansaputra-portofolio.vercel.app/foto.jpg',
    jobTitle: 'Web Developer & Digital Creator',
    worksFor: {
      '@type': 'Organization',
      name: 'FahriXz'
    },
    almaMater: 'SMK Negeri 1 Kotaagung Timur',
    sameAs: [
      'https://www.tiktok.com/@fahriandriansaputraa',
      'https://www.capcut.com/@fahrians',
      'https://www.instagram.com/fhrandrnsptra',
      'https://github.com/fahrixz-ans'
    ]
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'FahriXz Official Website',
    url: 'https://fahriandriansaputra-portofolio.vercel.app',
    author: {
      '@type': 'Person',
      name: 'Fahri Andrian Saputra'
    }
  }

  return (
    <Helmet>
      {/* Basic */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Canonical */}
      <link rel="canonical" href={url} />

      {/* JSON-LD Schemas */}
      <script type="application/ld+json">
        {JSON.stringify(personSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
    </Helmet>
  )
}
