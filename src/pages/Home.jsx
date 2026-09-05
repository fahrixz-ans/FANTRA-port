import React, { useState } from 'react'
import Hero from '../components/Hero'
import About from '../components/About'
import Skills from '../components/Skills'
import Projects from '../components/Projects'
import AchievementPreview from '../components/AchievementPreview'
import GalleryPreview from '../components/GalleryPreview'
import Experience from '../components/Experience'
import Contact from '../components/Contact'
import Lightbox from '../components/Lightbox'

export default function Home() {
  const [lightboxData, setLightboxData] = useState({
    isOpen: false,
    src: '',
    title: '',
    items: [],
    initialIndex: 0,
  })

  const handleOpenImage = (itemsOrSrc, indexOrTitle, title) => {
    if (Array.isArray(itemsOrSrc)) {
      setLightboxData({
        isOpen: true,
        items: itemsOrSrc,
        initialIndex: typeof indexOrTitle === 'number' ? indexOrTitle : 0,
        src: '',
        title: '',
      })
    } else {
      setLightboxData({
        isOpen: true,
        src: itemsOrSrc,
        title: indexOrTitle || '',
        items: [],
        initialIndex: 0,
      })
    }
  }

  const handleCloseImage = () => {
    setLightboxData({
      isOpen: false,
      src: '',
      title: '',
      items: [],
      initialIndex: 0,
    })
  }

  return (
    <main className="min-h-screen bg-transparent text-white selection:bg-cyan-500 selection:text-black">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <AchievementPreview onOpenImage={handleOpenImage} />
      <GalleryPreview onOpenImage={handleOpenImage} />
      <Experience />
      <Contact />

      {lightboxData.isOpen && (
        <Lightbox
          src={lightboxData.src}
          title={lightboxData.title}
          items={lightboxData.items}
          initialIndex={lightboxData.initialIndex}
          onClose={handleCloseImage}
        />
      )}
    </main>
  )
}
