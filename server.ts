import express from "express";
import path from "path";
import fs from "fs";
import { GoogleGenAI } from "@google/genai";

interface ChatHistoryItem {
  role: string;
  text: string;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check endpoint for Cloud Run and monitoring
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Gemini AI Assistant Proxy API
  app.post("/api/ai/chat", async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      const { message, history } = req.body;

      if (!apiKey) {
        return res.status(200).json({
          response: "Halo! Asisten AI saat ini beroperasi dalam mode tanggap cepat. Anda dapat menanyakan informasi seputar latar belakang Fahri Andrian Saputra, keahlian web development, preset CapCut, maupun riwayat kerja dan bisnis FahriXz Store!",
        });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const systemInstruction = `
Anda adalah Fahri AI Assistant, asisten virtual cerdas untuk website portofolio Fahri Andrian Saputra (Fahri Xz).
Profil Lengkap Fahri:
- Nama Lengkap: Fahri Andrian Saputra
- Nama Panggilan: Fahri / Fasa
- Nama Publik / Personal Brand: Fahri Xz
- Business Brand: FahriXz Store (Online Business berbasis WhatsApp 2022–2024: Jual beli akun game & jasa desain logo)
- Roles: Digital Creator • Web Developer • Editor • Tech Enthusiast
- Tagline: «Turning Ideas Into Digital Creations.»
- Domisili: Sukabanjar, Kecamatan Kotaagung Timur, Kabupaten Tanggamus, Lampung, Indonesia.
- Pendidikan Resmi:
  1. SD Negeri 1 Sukabanjar (2014–2020) Lulus
  2. SMP Negeri 1 Kotaagung Timur (2020–2023: Kelas 7G, 8D, 9D) Lulus
  3. SMK Negeri 1 Kotaagung Timur (2023–2026: Jurusan Bisnis Digital PBD) Lulus
- Keahlian Utama:
  * Creative: Content Creation, CapCut Creator & Template, Video Editing, Photo Editing, Motion Graphics, Logo Animation, Photography
  * Technology: Web Development (React, Vite, Tailwind CSS, JavaScript, Node.js), Phone & Tech Troubleshooting
  * Business: Digital Marketing, Customer Service, Business Communication, Sales & Follow-up, Online Business (FahriXz Store)
- Riwayat Pekerjaan & PKL:
  1. Owner & Pengelola FahriXz Store (2022–2024: Bisnis Online berbasis WhatsApp)
  2. Peserta PKL @ Top Mart Mekar Barokah Talang Padang (1 Feb 2025 – 1 Apr 2025: Packing, Restocking, Display, Customer Service, SOP)
  3. Peserta PKL @ Larisso Stationery (3 bulan: Operasional toko & pelayanan pelanggan)
  4. Kurir Ekspedisi @ Shopee Xpress Kotaagung Hub (April – Juni 2026)
  5. Staff Konsultan Bisnis @ PT BESTPROFIT FUTURES Bandar Lampung (Juli – Agustus 2026)
- Proyek Utama:
  1. Fahri Xz Portfolio Website (Web Development interaktif + Live Project Preview Browser)
  2. CapCut Templates & Presets Hub (Template & Preset CapCut viral)
  3. FahriXz Store Digital Showcase (Showcase layanan jual beli akun game & desain logo)
  4. Smartphone Tech & Troubleshooting Guide (Panduan perbaikan HP & teknologi)

Tugas Anda: Berikan jawaban yang ramah, sopan, singkat, profesional, dan informatif berdasarkan profil Fahri Xz di atas.
`;

      const contents = [
        ...((history as ChatHistoryItem[]) || []).map((h) => ({
          role: h.role === 'user' ? 'user' : 'model',
          parts: [{ text: h.text }],
        })),
        { role: 'user', parts: [{ text: message }] },
      ];

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents,
        config: {
          systemInstruction,
        },
      });

      return res.json({ response: response.text });
    } catch (err) {
      const error = err as Error;
      console.error("Gemini API error:", error);
      return res.status(200).json({
        response: "Halo! Saya Fahri AI Assistant. Fahri Andrian Saputra adalah seorang Digital Creator, Web Developer, dan Editor dari Tanggamus, Lampung. Memiliki keahlian di bidang React, Tailwind CSS, CapCut Editing, serta berpengalaman di bisnis digital dan layanan pelanggan.",
      });
    }
  });

  // AI Summary generator API
  app.post("/api/ai/summarize", async (req, res) => {
    const { content, title = "Topik" } = req.body || {};
    try {
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        return res.json({
          summary: `Ringkasan Singkat (${title}): Kumpulan poin utama dan insight esensial terkait topik ini untuk membantu Anda memahami gagasan dengan cepat.`,
        });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Buatkan ringkasan 2-3 kalimat yang padat dan menarik dalam Bahasa Indonesia untuk artikel/topik berjudul "${title}" berikut:\n\n${content}`,
      });

      return res.json({ summary: response.text });
    } catch {
      return res.json({
        summary: `Ringkasan otomatis untuk ${title}: Gagasan penting, panduan praktis, dan penerapan utama.`,
      });
    }
  });

  // Vite middleware for development vs static files for production
  const isProduction =
    process.env.NODE_ENV === "production" ||
    Boolean(process.env.K_SERVICE);

  if (!isProduction) {
    try {
      const { createServer: createViteServer } = await import("vite");
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: "spa",
      });
      app.use(vite.middlewares);
      console.log("Vite development middleware loaded successfully");
    } catch (err) {
      console.warn("Vite development middleware failed to load, falling back to static files:", err);
      serveStatic();
    }
  } else {
    serveStatic();
  }

  function serveStatic() {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*all", (_req, res) => {
      const indexPath = path.join(distPath, "index.html");
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        res.sendFile(path.join(process.cwd(), "index.html"));
      }
    });
    console.log("Serving static files from", distPath);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Graceful process error handling
process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection at server level:", reason);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception at server level:", err);
});

startServer();
