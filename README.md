# 🎨 Carousel Agent - Instagram Carousel Generator

[![Next.js](https://img.shields.io/badge/Next.js-15.1.9-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)](https://tailwindcss.com/)

Modern, clean, dan simple AI-powered Instagram carousel generator untuk Raho Premier. Generate multiple carousel posts dengan OpenAI API dalam satu interface yang intuitif.

## ✨ Features

- 🎯 **Multi-Content Management** - Kelola banyak konten sekaligus
- 🖼️ **Multi-Slide Support** - Setiap konten bisa punya banyak slide
- 🤖 **AI-Powered Generation** - Menggunakan OpenAI Image Generation API
- 🎨 **Modern UI** - Clean, simple, dan profesional
- 📊 **Real-time Status** - Track progress setiap slide
- 🔄 **Batch Generation** - Generate semua konten sekaligus
- 📜 **Activity Log** - Monitor semua aktivitas
- 🖼️ **Gallery & Lightbox** - Preview dan download hasil
- 💾 **Download Support** - Download individual slides
- 🎭 **Custom Prompts** - Base prompt + per-slide content

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm/yarn/pnpm/bun
- OpenAI API Key

### Installation

```bash
# Clone repository
git clone <repository-url>
cd raho-carousel-agent

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) dengan browser Anda.

### Environment Variables

Tidak perlu file `.env` - API key diinput langsung di UI untuk kemudahan penggunaan.

## 📖 How to Use

1. **Setup API Key**
   - Masukkan OpenAI API Key di top bar
   - Key tersimpan di session browser (tidak persistent)

2. **Buat Konten**
   - Klik "Tambah" di sidebar
   - Edit nama konten
   - Tambah slide sesuai kebutuhan

3. **Edit Prompts**
   - Edit base prompt (global untuk semua)
   - Edit content per slide
   - Preview prompt sebelum generate

4. **Generate Images**
   - Generate per slide (tombol "Gen")
   - Generate semua slide dalam 1 konten
   - Generate semua konten sekaligus (batch)

5. **Download Results**
   - Preview di lightbox
   - Download individual slides
   - Gallery view untuk semua hasil

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI Library**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **AI Service**: OpenAI API (gpt-image-1)
- **Icons**: Lucide React
- **Fonts**: Inter, Cormorant Garamond

## 📁 Project Structure

```
raho-carousel-agent/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── page.tsx         # Main page
│   │   ├── layout.tsx       # Root layout
│   │   └── globals.css      # Global styles
│   ├── components/          # React components
│   │   ├── Header.tsx
│   │   ├── TopBar.tsx
│   │   ├── Sidebar.tsx
│   │   ├── EditorPanel.tsx
│   │   ├── KontenItem.tsx
│   │   ├── SlideCard.tsx
│   │   ├── Gallery.tsx
│   │   ├── ActivityLog.tsx
│   │   └── Lightbox.tsx
│   ├── store/               # Zustand store
│   │   └── carouselStore.ts
│   ├── hooks/               # Custom hooks
│   │   └── useGenerate.ts
│   └── lib/                 # Types & utilities
│       └── types.ts
├── public/                  # Static assets
├── FLOW.md                  # Application flow documentation
├── UI-IMPROVEMENTS.md       # UI design documentation
└── README.md
```

## 🎨 Design System

### Color Palette
- **Primary**: Purple to Blue gradient (#8b5cf6 → #6366f1 → #3b82f6)
- **Accent**: Vibrant Purple (#8b5cf6)
- **Background**: Light Slate (#f8fafc)
- **Success**: Green (#10b981)
- **Error**: Red (#ef4444)

### Typography
- **Headings**: Cormorant Garamond (serif)
- **Body**: Inter (sans-serif)

### Components
- Modern card design dengan shadows
- Icon-based actions (Lucide React)
- Smooth transitions & animations
- Responsive grid layouts

## 📚 Documentation

- **[FLOW.md](./FLOW.md)** - Complete application flow & architecture
- **[UI-IMPROVEMENTS.md](./UI-IMPROVEMENTS.md)** - UI design changes & system

## 🔧 Available Scripts

```bash
# Development
npm run dev      # Start dev server

# Production
npm run build    # Build for production
npm run start    # Start production server
```

## 🐳 Docker Support

```bash
# Build and run with Docker
docker-compose up --build

# Stop containers
docker-compose down
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is private and proprietary to Raho Premier.

## 🙏 Credits

- **Design**: Modern clean UI inspired by contemporary design trends
- **Icons**: [Lucide React](https://lucide.dev/)
- **Fonts**: Google Fonts (Inter, Cormorant Garamond)
- **AI**: OpenAI Image Generation API

## 📞 Support

Untuk pertanyaan atau support, hubungi tim Raho Premier:
- WhatsApp: +62 851-3622-2772
- Instagram: @rahopremier
- TikTok: @rahopremier

---

Made with ❤️ by Raho Premier AI Studio
