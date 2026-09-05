export const extendedData = {
  articles: [
    {
      id: 1,
      title: "Panduan Membuat Preset & Template CapCut Viral dengan Rhythm Audio Sync",
      date: "04 Agustus 2026",
      readTime: "5 min baca",
      category: "Content Creation",
      snippet: "Langkah praktis merancang preset video CapCut yang menarik ribuan pengguna dengan memanfaatkan transisi audio beat sync, color grading, dan motion animation.",
      content: `Mengembangkan template CapCut yang populer memerlukan pemahaman tentang tren visual, pemilihan musik yang tepat, serta kerapian potongan transisi.`
    },
    {
      id: 2,
      title: "Mengelola FahriXz Store: Pengalaman Bisnis Online Berbasis WhatsApp",
      date: "20 Juli 2026",
      readTime: "4 min baca",
      category: "Bisnis & Entrepreneurship",
      snippet: "Bagaimana mengelola usaha mandiri jual beli akun game dan jasa desain logo secara profesional melayani pelanggan melalui WhatsApp."
    },
    {
      id: 3,
      title: "Strategi Layanan Pelanggan & Operasional Ritel Modern",
      date: "15 Mei 2026",
      readTime: "5 min baca",
      category: "Bisnis & Ritel",
      snippet: "Pelajaran berharga dari pengalaman kerja ekspedisi, konsultan bisnis, dan praktik kerja di minimarket serta toko alat tulis."
    }
  ],

  universe: [
    {
      id: "projects",
      label: "PROJECTS",
      color: "from-blue-500 to-indigo-600",
      description: "Ekosistem aplikasi web, bot, dan sistem digital FahriXz.",
      link: "/projects",
      children: [
        { name: "Fahri Xz Portfolio", type: "Web Dev", status: "Active", link: "/projects/fahrixz-portfolio" },
        { name: "FahriXz Store Showcase", type: "Design & Store", status: "Active", link: "/projects/fahrixz-store" },
        { name: "CapCut Templates Hub", type: "Video & Editing", status: "Active", link: "/projects/capcut-hub" },
        { name: "Smartphone Tech Guide", type: "Tech Knowledge", status: "Active", link: "/projects/phone-tech" }
      ]
    },
    {
      id: "creator",
      label: "CREATOR",
      color: "from-purple-500 to-pink-600",
      description: "Karya kreatif video editing, CapCut templates, Alight Motion presets, dan AR.",
      link: "/creator",
      children: [
        { name: "CapCut Templates", type: "CapCut", status: "Viral", link: "/creator/presets" },
        { name: "Alight Motion Presets", type: "Alight Motion", status: "Active", link: "/creator/presets" },
        { name: "AR & Motion Graphics", type: "AR", status: "Experiment", link: "/creator" },
        { name: "Before / After Showcase", type: "Editing", status: "Showcase", link: "/showcase" }
      ]
    },
    {
      id: "blog",
      label: "BLOG & GARDEN",
      color: "from-emerald-500 to-teal-600",
      description: "Wawasan, tutorial, catatan belajar, dan dokumentasi teknologi.",
      link: "/blog",
      children: [
        { name: "Tutorial & Wawasan", type: "Articles", status: "Published", link: "/blog" },
        { name: "Digital Garden Notes", type: "Notes", status: "Growing", link: "/garden" },
        { name: "Release Notes", type: "Changelog", status: "Updated", link: "/versions" }
      ]
    },
    {
      id: "community",
      label: "COMMUNITY & YOURFAMS",
      color: "from-amber-500 to-orange-600",
      description: "Ruang interaksi YourFams, guestbook, voting, dan feedback.",
      link: "/community",
      children: [
        { name: "Guestbook", type: "Interactive", status: "Live", link: "/guestbook" },
        { name: "Community Voting", type: "Poll", status: "Active", link: "/community" },
        { name: "Feedback & Bug Report", type: "Support", status: "Open", link: "/feedback" },
        { name: "Activity Feed", type: "Logs", status: "Live", link: "/activity" }
      ]
    }
  ],

  detailedProjects: [
    {
      id: "fahrixz-portfolio",
      slug: "fahrixz-portfolio",
      name: "Fahri Xz Official Portfolio Website",
      category: "Web Development",
      technologies: ["React 18", "Vite", "Tailwind CSS", "Framer Motion", "Gemini AI", "Web Audio API", "Firestore"],
      status: "PUBLIC",
      health: {
        development: "ACTIVE",
        documentation: "ACTIVE",
        demo: "ACTIVE",
        repository: "ACTIVE",
        maintenance: "ACTIVE"
      },
      year: "2026",
      version: "v4.0.0",
      description: "Website resmi portofolio interaktif Fahri Xz bertema galaksi futuristik dengan fitur Live Project Preview Browser, AI Assistant Gemini, Command Palette, dan Guestbook.",
      story: {
        idea: "Merancang identitas digital resmi FahriXz yang tidak hanya menarik secara visual tetapi juga memiliki fungsionalitas interaktif tinggi.",
        research: "Mengeksplorasi tren galaksi futuristik, integrasi Web Audio API untuk UI sound, serta optimasi Core Web Vitals pada perangkat mobile.",
        experiment: "Mencoba integrasi Gemini AI model 2.5 Flash untuk memberikan jawaban otomatis seputar profil dan karya FahriXz.",
        development: "Membangun dengan React 18, Vite, Tailwind CSS, dan Framer Motion dengan komponen terpisah dan arsitektur modular.",
        problem: "Menyesuaikan performa dan efek visual agar tetap responsif dan halus di berbagai ponsel Android maupun desktop.",
        solution: "Menggunakan lazy loading gambar WebP, code splitting, serta sintesis efek suara audio native Web Audio API.",
        release: "Official Release v4.0.0 dipublikasikan secara publik."
      },
      changelog: [
        { version: "v4.0.0", date: "10 Agustus 2026", new: ["FahriXz Universe Map", "Project Comparison Tool", "Preset Library & Creator Hub", "System Status & Activity Feed"], improved: ["Core Web Vitals & Image Lazy Loading", "Command Palette Indexing"], fixed: ["Visual padding & contrast in dark mode"] },
        { version: "v3.0.0", date: "08 Agustus 2026", new: ["Live Project Preview Browser", "AI Assistant Gemini 2.5 Integration", "Interactive Sound Controls"], improved: ["Mobile Responsive UI"], fixed: ["Guestbook Rate Limiting"] }
      ],
      roadmap: [
        { title: "Universal Search Indexing", status: "Completed", category: "Core" },
        { title: "FahriXz Universe Node Visualizer", status: "Completed", category: "Feature" },
        { title: "PWA Offline Support Engine", status: "In Progress", category: "PWA" },
        { title: "AI Speech Interaction Mode", status: "Planned", category: "AI" }
      ],
      contributors: [
        { name: "Fahri Andrian Saputra (FahriXz)", role: "Lead Developer & Designer", avatar: "/foto.jpg", github: "https://github.com/fahrixz-ans" },
        { name: "YourFams Community", role: "Beta Testers & Feedback", avatar: "/logo-smk.png" }
      ],
      demoUrl: "https://fahriandriansaputra-portofolio.vercel.app",
      repositoryUrl: "https://github.com/fahrixz-ans/fahrixz-portfolio",
      thumbnail: "/proyek-2.jpg",
      featured: true
    },
    {
      id: "capcut-hub",
      slug: "capcut-hub",
      name: "CapCut Templates & Presets Hub",
      category: "CapCut & Creator",
      technologies: ["CapCut", "Audio Beat Sync", "Motion FX", "Color Grading", "Keyframe Animation"],
      status: "PUBLIC",
      health: {
        development: "ACTIVE",
        documentation: "ACTIVE",
        demo: "ACTIVE",
        repository: "N/A",
        maintenance: "ACTIVE"
      },
      year: "2026",
      version: "v2.5.0",
      description: "Kumpulan preset video dan template CapCut viral yang dirancang khusus dengan sinkronisasi beat audio, motion graphics, dan efek visual kekinian.",
      story: {
        idea: "Membantu para kreator pemula membuat konten video berkualitas tinggi dalam hitungan detik tanpa perlu proses editing yang rumit.",
        research: "Menganalisis audio tren di TikTok & CapCut yang memiliki ketukan musik jelas untuk penyelarasan transisi.",
        development: "Menyusun kurva kecepatan (speed ramp) dan efek bouncing di titik-titik ketukan instrumen utama.",
        release: "Dipublikasikan di akun resmi CapCut @fahrians dan telah digunakan oleh jutaan pengguna."
      },
      changelog: [
        { version: "v2.5.0", date: "01 Agustus 2026", new: ["Preset Velocity Slowmo", "Shake & Transition Pack"], improved: ["Audio Beat Precision"], fixed: ["Lag saat ekspor video HD"] }
      ],
      roadmap: [
        { title: "CapCut Jedag Jedug Old Pack", status: "Completed", category: "Presets" },
        { title: "Alight Motion AM XML Presets", status: "Completed", category: "Presets" },
        { title: "3D Motion Text Overlay Pack", status: "In Progress", category: "Assets" }
      ],
      contributors: [
        { name: "Fahri Andrian Saputra (FahriXz)", role: "Preset Creator & Editor", avatar: "/foto.jpg", capcut: "https://www.capcut.com/@fahrians" }
      ],
      demoUrl: "https://www.capcut.com/@fahrians",
      repositoryUrl: "",
      thumbnail: "/proyek-3.jpg",
      featured: true
    },
    {
      id: "fahrixz-store",
      slug: "fahrixz-store",
      name: "FahriXz Store Digital Showcase",
      category: "Design & Store",
      technologies: ["Logo Design", "Vector Graphics", "WhatsApp Business", "Digital Marketing", "Social Media"],
      status: "PUBLIC",
      health: {
        development: "COMPLETED",
        documentation: "ACTIVE",
        demo: "ACTIVE",
        repository: "N/A",
        maintenance: "MAINTENANCE"
      },
      year: "2024",
      version: "v1.2.0",
      description: "Katalog dan showcase digital layanan bisnis online FahriXz Store melayani jual beli akun game, desain logo e-sports, dan branding sosial media.",
      story: {
        idea: "Mendirikan bisnis online independen berbasis WhatsApp untuk memenuhi kebutuhan aset digital gamer dan kreator.",
        development: "Mengelola katalog produk, sistem penanganan transaksi terstruktur, dan desain logo vektor profesional.",
        release: "Sukses melayani transaksi digital aman selama rentang 2022–2024."
      },
      changelog: [
        { version: "v1.2.0", date: "15 Desember 2024", new: ["Katalog Logo Vector E-Sports", "Integrasi Order WhatsApp"], improved: ["Pelayanan Pelanggan"], fixed: ["Sistem Pencatatan Transaksi"] }
      ],
      roadmap: [
        { title: "Showcase Logo Vector", status: "Completed", category: "Branding" },
        { title: "Dokumentasi Transaksi Safe Trade", status: "Completed", category: "History" }
      ],
      contributors: [
        { name: "Fahri Andrian Saputra (FahriXz)", role: "Owner & Lead Designer", avatar: "/foto.jpg" }
      ],
      demoUrl: "https://wa.me/6281996157578",
      repositoryUrl: "",
      thumbnail: "/proyek-1.jpg",
      featured: true
    },
    {
      id: "phone-tech",
      slug: "phone-tech",
      name: "Smartphone Tech & Troubleshooting Guide",
      category: "Technology",
      technologies: ["Phone Hardware", "Firmware Flashing", "System Diagnostics", "Troubleshooting", "Android OS"],
      status: "PUBLIC",
      health: {
        development: "ACTIVE",
        documentation: "ACTIVE",
        demo: "ACTIVE",
        repository: "N/A",
        maintenance: "ACTIVE"
      },
      year: "2025",
      version: "v1.0.0",
      description: "Panduan teknis dan dokumentasi troubleshooting hardware maupun software smartphone, flashing ROM, serta pemeliharaan sistem perangkat seluler.",
      story: {
        idea: "Mendokumentasikan pengalaman praktis perbaikan perangkat seluler dan pemecahan masalah teknis.",
        development: "Menyusun artikel dan video tutorial diagnostik kerusakan hardware/software.",
        release: "Dibagikan di media sosial dan platform dokumentasi teknis."
      },
      changelog: [
        { version: "v1.0.0", date: "10 November 2025", new: ["Panduan Bootloop Fix", "Hardware Diagnostic Checklist"], improved: ["Langkah Flashing Firmware"], fixed: ["Instruksi Driver Fastboot"] }
      ],
      roadmap: [
        { title: "Modul Diagnostik Baterai & Daya", status: "Completed", category: "Hardware" },
        { title: "Panduan Pemeliharaan Kernel Android", status: "Planned", category: "Software" }
      ],
      contributors: [
        { name: "Fahri Andrian Saputra (FahriXz)", role: "Tech Specialist", avatar: "/foto.jpg" }
      ],
      demoUrl: "https://www.tiktok.com/@fahriandriansaputraa",
      repositoryUrl: "",
      thumbnail: "/gallery-5.jpg",
      featured: false
    }
  ],

  creatorPresets: [
    {
      id: "preset-1",
      title: "Preset CapCut JJ Old Sound Beat Sync",
      category: "CapCut",
      type: "Jedag Jedug Old",
      platform: "CapCut",
      duration: "00:18",
      views: "125K+",
      downloads: "45K+",
      link: "https://www.capcut.com/@fahrians",
      image: "/proyek-3.jpg",
      description: "Preset CapCut gaya Jedag Jedug Old dengan efek bounce zoom, flash lighting tipis, dan transisi ketukan nada presisi."
    },
    {
      id: "preset-2",
      title: "Preset Alight Motion Velocity Smooth 60FPS",
      category: "Alight Motion",
      type: "Velocity",
      platform: "Alight Motion",
      duration: "00:15",
      views: "89K+",
      downloads: "32K+",
      link: "https://www.tiktok.com/@fahriandriansaputraa",
      image: "/gallery-1.jpg",
      description: "Preset Alight Motion kurva kecepatan velocity halus dengan efek motion blur dan warna cinematic teal & orange."
    },
    {
      id: "preset-3",
      title: "Preset CapCut Shake & Transition Aesthetic",
      category: "CapCut",
      type: "Shake & Transition",
      platform: "CapCut",
      duration: "00:22",
      views: "95K+",
      downloads: "38K+",
      link: "https://www.capcut.com/@fahrians",
      image: "/gallery-7.jpg",
      description: "Preset transisi lembut dengan efek guncangan estetik untuk kompilasi foto dan video kegiatan harian."
    },
    {
      id: "preset-4",
      title: "AR Filter & Visual Effect Showcase",
      category: "AR",
      type: "Augmented Reality",
      platform: "TikTok / Instagram",
      duration: "Interactive",
      views: "50K+",
      downloads: "18K+",
      link: "https://www.instagram.com/fhrandrnsptra",
      image: "/gallery-2.jpg",
      description: "Eksperimen filter Augmented Reality (AR) visual galaksi dan efek tata warna estetis."
    }
  ],

  showcaseItems: [
    {
      id: "sc-1",
      title: "Color Grading & Photo Retouching",
      category: "Editing",
      beforeImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=800&auto=format&fit=crop",
      description: "Transformasi warna lanskap pantai dari tampilan netral menjadi efek warna cinematic sunset warm tone."
    },
    {
      id: "sc-2",
      title: "Vector Logo E-Sports Branding",
      category: "Design",
      beforeImage: "/proyek-1.jpg",
      afterImage: "/gallery-8.jpg",
      description: "Proses transformasi sketsa kasar menjadi logo vektor e-sports definisi tinggi untuk identitas FahriXz Store."
    }
  ],

  labExperiments: [
    {
      id: "lab-1",
      title: "Gemini 2.5 Flash AI Conversational Core",
      category: "AI Experiments",
      status: "BETA",
      tech: ["Gemini AI", "JavaScript", "Express"],
      desc: "Asisten AI cerdas untuk menjawab pertanyaan interaktif pengunjung mengenai profil dan karya FahriXz."
    },
    {
      id: "lab-2",
      title: "Web Audio Synthesizer SFX Engine",
      category: "UI Experiments",
      status: "PROTOTYPE",
      tech: ["Web Audio API", "Web Audio Ctx"],
      desc: "Sintesis efek suara UI native tanpa mendownload audio mp3 eksternal berat."
    },
    {
      id: "lab-3",
      title: "Interactive Galaxy Particle Field",
      category: "Animation",
      status: "EXPERIMENT",
      tech: ["HTML5 Canvas", "WebGL / 2D Context"],
      desc: "Latar belakang partikel galaksi interaktif yang merespons pergerakan kursor dan sentuhan layar."
    }
  ],

  communityVotes: [
    {
      id: "poll-1",
      question: "Proyek atau Konten Kreatif Apa Yang Harus Dibuat FahriXz Berikutnya?",
      status: "ACTIVE",
      totalVotes: 342,
      options: [
        { id: "opt-1", text: "Proyek Web App / AI Interactive Tool Baru", votes: 145 },
        { id: "opt-2", text: "Preset CapCut & Alight Motion Pack Terbaru", votes: 112 },
        { id: "opt-3", text: "Tutorial Editing Video & Web Development", votes: 65 },
        { id: "opt-4", text: "Aplikasi Mobile & Game Prototype", votes: 20 }
      ]
    }
  ],

  buildInPublic: [
    {
      projectName: "Fahri Xz Portfolio v4.0",
      progress: 95,
      tasks: [
        { name: "UI Design & Galaxy Theme", done: true },
        { name: "Live Project Preview Browser", done: true },
        { name: "FahriXz Universe Map Visualizer", done: true },
        { name: "Project Spec Comparison Tool", done: true },
        { name: "PWA Offline Caching Engine", done: false }
      ]
    },
    {
      projectName: "CapCut & Alight Motion Preset Vault",
      progress: 88,
      tasks: [
        { name: "Jedag Jedug Old Pack", done: true },
        { name: "Smooth Velocity 60FPS Curve", done: true },
        { name: "3D Text Overlay Assets", done: false }
      ]
    }
  ],

  digitalGarden: [
    {
      id: "note-1",
      title: "Catatan Pembelajaran: Optimasi Core Web Vitals pada React & Vite",
      date: "09 Agustus 2026",
      category: "Web Dev",
      tags: ["React", "Performance", "LCP", "FID", "CLS"],
      excerpt: "Memahami pentingnya penundaan dekode gambar (decoding='async'), lazy loading gambar WebP, dan menghindari layout shift saat komponen dimuat."
    },
    {
      id: "note-2",
      title: "Daftar Perangkat & Setup Coding Utama",
      date: "05 Agustus 2026",
      category: "Setup",
      tags: ["Termux", "MT Manager", "Infinix", "Gemini AI"],
      excerpt: "Dokumentasi setup pengkodan mobile menggunakan Infinix Smart 8 Pro, Termux CLI, dan bantuan debugging AI Gemini."
    }
  ],

  activityFeed: [
    { id: "act-1", title: "FahriXz merilis Website Official v4.0", date: "10 Agustus 2026", category: "Release", badge: "NEW" },
    { id: "act-2", title: "Pembaruan Preset CapCut JJ Old Sound di CapCut", date: "05 Agustus 2026", category: "Creator", badge: "UPDATE" },
    { id: "act-3", title: "Artikel 'Panduan Preset CapCut' telah dipublikasikan", date: "04 Agustus 2026", category: "Blog", badge: "ARTICLE" },
    { id: "act-4", title: "Pengalaman Kerja Konsultan Bisnis di PT BESTPROFIT FUTURES", date: "Juli 2026", category: "Career", badge: "MILESTONE" }
  ],

  systemStatus: [
    { service: "Website Portfolio Official", status: "OPERATIONAL", uptime: "99.98%", responseTime: "120ms" },
    { service: "AI Assistant Gemini API Service", status: "OPERATIONAL", uptime: "99.95%", responseTime: "340ms" },
    { service: "CapCut & Social Media Links", status: "OPERATIONAL", uptime: "100%", responseTime: "80ms" },
    { service: "FahriXz Store WhatsApp Order Channel", status: "MAINTENANCE", uptime: "98.50%", responseTime: "Active Inquiry" }
  ],

  brandKit: {
    brandName: "FahriXz",
    fullName: "Fahri Andrian Saputra",
    tagline: "«Turning Ideas Into Digital Creations.»",
    colors: [
      { name: "Galaxy Primary (Violet)", hex: "#8b5cf6", usage: "Main Action Buttons, Highlights, Borders" },
      { name: "Galaxy Cyan Accent", hex: "#06b6d4", usage: "Tech Badges, Neon Accents, Status Indicators" },
      { name: "Galaxy Background Dark", hex: "#0a0a16", usage: "Primary Deep Canvas Background" },
      { name: "Galaxy Card Alt", hex: "#13132b", usage: "Card Containers, Modals, Elevate Layers" }
    ],
    typography: [
      { name: "Display / Headings", font: "Plus Jakarta Sans / Playfair Display", usage: "Page Headers, Titles, Brand Markers" },
      { name: "Body Text", font: "Inter / Plus Jakarta Sans", usage: "Paragraphs, Descriptions, Lists" }
    ],
    downloads: [
      { name: "FahriXz Logo Assets Pack (PNG / SVG)", size: "2.4 MB", format: "ZIP", url: "/logo-smk.png" },
      { name: "FahriXz Official Press Bio (PDF)", size: "1.1 MB", format: "PDF", url: "/cv.pdf" }
    ]
  },

  pressKit: {
    shortBio: "FahriXz (Fahri Andrian Saputra) adalah seorang Web Developer, Student Developer, dan Digital Creator asal Tanggamus, Lampung. Aktif membuat proyek web modern, preset CapCut viral, serta konten edukasi teknologi.",
    longBio: "Fahri Andrian Saputra, yang dikenal secara publik sebagai FahriXz / Fahri Xz / Fasa, lahir dan berdomisili di Sukabanjar, Kotaagung Timur, Kabupaten Tanggamus, Lampung. Lulusan SMKN 1 Kotaagung Timur jurusan Bisnis Digital ini memiliki ketertarikan mendalam pada pengembangan web (React, Vite, Tailwind), editing video (CapCut, Alight Motion), pemecahan masalah teknologi (troubleshooting smartphone), serta wirausaha digital melalui FahriXz Store.",
    contacts: {
      email: "fahriandriansaputra@gmail.com",
      whatsapp: "+62 819-9615-7578",
      location: "Sukabanjar, Kotaagung Timur, Tanggamus, Lampung, Indonesia",
      socials: [
        { platform: "TikTok", handle: "@fahriandriansaputraa", url: "https://www.tiktok.com/@fahriandriansaputraa" },
        { platform: "CapCut", handle: "@fahrians", url: "https://www.capcut.com/@fahrians" },
        { platform: "Instagram", handle: "@fhrandrnsptra", url: "https://www.instagram.com/fhrandrnsptra" },
        { platform: "GitHub", handle: "fahrixz-ans", url: "https://github.com/fahrixz-ans" }
      ]
    }
  },

  versionHistory: [
    { version: "v4.0.0", date: "10 Agustus 2026", title: "FahriXz Ecosystem Release", highlights: ["FahriXz Universe Interactive Graph", "Project Comparison Engine", "Preset Library & Creator Hub", "System Status & Activity Feed", "Technical SEO & Schema.org Expansion"] },
    { version: "v3.0.0", date: "08 Agustus 2026", title: "Official Portfolio Release", highlights: ["Live Project Preview Browser", "AI Assistant Gemini Integration", "Authentic Educational & PKL History", "FahriXz Store Showcase"] },
    { version: "v2.0.0", date: "15 Januari 2026", title: "Galaxy Theme & Interactive UI", highlights: ["Galaxy Glassmorphism Design", "Web Audio SFX Synthesizer", "Command Palette (Ctrl+K)"] },
    { version: "v1.0.0", date: "2025", title: "Initial Release", highlights: ["Basic Portfolio Layout", "Profile & Project Listing"] }
  ],

  timeline: [
    { year: "2026", title: "Staff Konsultan Bisnis @ PT BESTPROFIT FUTURES", category: "Pengalaman Kerja", description: "Bertugas di Bandar Lampung mengelola calon nasabah, melakukan follow-up profesional, dan sosialisasi peluang usaha." },
    { year: "2026", title: "Kurir Ekspedisi @ Shopee Xpress Kotaagung Hub", category: "Pengalaman Kerja", description: "Bertanggung jawab dalam pengantaran, penanganan paket ekspedisi, dan pelayanan konsumen di area Kotaagung." },
    { year: "2025", title: "Peserta PKL @ Top Mart Mekar Barokah & Larisso Stationery", category: "PKL", description: "Praktik Kerja Lapangan 3 bulan fokus pada packing, restocking, display merchandising, kebersihan toko, dan pelayanan kasir." },
    { year: "2022 - 2024", title: "Owner & Pengelola FahriXz Store", category: "Entrepreneurship", description: "Mendirikan bisnis online berbasis WhatsApp untuk transaksi jual beli akun game dan pembuatan desain logo." },
    { year: "2023 - 2026", title: "Pendidikan SMK Negeri 1 Kotaagung Timur (Bisnis Digital)", category: "Pendidikan", description: "Menyelesaikan pendidikan kejuruan Bisnis Digital (PBD) dengan konsentrasi pemasaran digital dan pengembangan web." },
    { year: "2020 - 2023", title: "SMP Negeri 1 Kotaagung Timur", category: "Pendidikan", description: "Pendidikan menengah pertama (Kelas 7G, 8D, 9D) dan lulus dengan predikat memuaskan." },
    { year: "2014 - 2020", title: "SD Negeri 1 Sukabanjar", category: "Pendidikan", description: "Pendidikan sekolah dasar di Sukabanjar, Kotaagung Timur." }
  ],

  usesStackGear: {
    hardware: [
      { name: "Infinix Smart 8 Pro", spec: "RAM 8+8 GB | ROM 128 GB | Helio G36 | Android 13", desc: "Smartphone utama (Model Infinix X6525B) yang digunakan sehari-hari untuk coding, editor code, video editing, manajemen repositori, serta pengujian aplikasi." },
      { name: "Service & Maintenance Kit", spec: "Phone Hardware & Repair Tools", desc: "Peralatan fisik pendukung troubleshooting smartphone, perbaikan hardware/software, dan flashing firmware." }
    ],
    software: [
      { name: "MT Manager", category: "Code Editing & File Manager", desc: "Aplikasi pengeditan kode, kompilasi, dan manajemen file sistem langsung di perangkat Android." },
      { name: "Gemini AI (Gemini 2.5 Flash)", category: "AI Assistant & Debugging", desc: "Assistant AI utama model Gemini 2.5 Flash untuk membantu perbaikan bug, error fixing, dan pemecahan masalah coding." },
      { name: "ChatGPT", category: "AI Prompting & Ideation", desc: "Alat bantu AI untuk menyusun prompt, merancang ide ide konten kreatif, dan konseptualisasi proyek." },
      { name: "CapCut & Alight Motion", category: "Video Editing Suite", desc: "Aplikasi video editor pilihan untuk pembuatan preset/template CapCut viral, animasi motion graphics, dan efek visual." },
      { name: "Termux", category: "Android Terminal CLI", desc: "Lingkungan terminal Linux di smartphone untuk menjalankan Node.js, Git CLI, skrip otomatisasi, dan utilitas development." },
      { name: "GitHub", category: "Version Control & Repositories", desc: "Platform hosting repositori kode, pengelolaan versi proyek, dan kolaborasi pengembang." },
      { name: "Vercel", category: "Cloud Deployment", desc: "Platform hosting dan deployment cloud otomatis untuk mempublikasikan website React & Vite ke internet." }
    ]
  },

  nowStatus: {
    currentFocus: "Membangun ekosistem official 'FahriXz', merancang karya digital kreatif, dan mengeksplorasi teknologi web terkini.",
    location: "Sukabanjar, Kotaagung Timur, Tanggamus, Lampung",
    learningGoal: "Web Development, Motion Graphics & Content Strategy",
    uptime: "99.98%",
    version: "v4.0.0 (FahriXz Ecosystem)",
    lastUpdated: "10 Agustus 2026",
    statusText: "Tersedia untuk Kolaborasi Creator, Project Web Development & Peluang Kerja",
    changelog: [
      { version: "v4.0.0", date: "10 Aug 2026", notes: "FahriXz Ecosystem Release: Universe visual graph, project comparison, creator presets, community hub, system status, & full SEO optimization." },
      { version: "v3.0.0", date: "08 Aug 2026", notes: "Official Release: Data autentik Fahri Xz, Riwayat Pendidikan lengkap, FahriXz Store Online Business, & Fitur Live Project Preview Browser." }
    ]
  },

  faq: [
    { q: "Siapa Fahri Andrian Saputra (FahriXz / Fahri Xz)?", a: "Fahri Andrian Saputra (FahriXz / Fahri Xz) adalah seorang Web Developer, Student Developer, Digital Creator, dan Tech Enthusiast asal Tanggamus, Lampung, lulusan SMK Negeri 1 Kotaagung Timur jurusan Bisnis Digital." },
    { q: "Apa itu FahriXz Store?", a: "FahriXz Store adalah bisnis online berbasis WhatsApp yang pernah dijalankan Fahri pada tahun 2022–2024, berfokus pada jual beli akun game dan jasa pembuatan desain logo." },
    { q: "Layanan apa saja yang disediakan oleh FahriXz?", a: "Layanan meliputi Web Development, Video Editing, Photo Editing, Pembuatan Template CapCut, Logo Animation, Creative Digital Services, dan Basic Technology Troubleshooting." },
    { q: "Bagaimana cara menghubungi FahriXz?", a: "Anda dapat menghubungi melalui formulir kontak di website ini, email ke fahriandriansaputra@gmail.com, WhatsApp (+62 819-9615-7578), atau via TikTok (@fahriandriansaputraa), CapCut (@fahrians), Instagram (@fhrandrnsptra), dan GitHub (fahrixz-ans)." }
  ],

  stats: {
    totalProjects: 5,
    totalArticles: 4,
    totalCertificates: 5,
    totalTechStack: 11,
    totalVisitors: "3,120+",
    pageViews: "8,450+",
    cvDownloads: "680+",
    uptimeScore: "99.98%"
  }
};
