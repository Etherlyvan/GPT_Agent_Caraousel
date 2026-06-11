# 🔄 Flow Aplikasi Raho Carousel Agent

## 📋 Ringkasan
Aplikasi ini adalah generator carousel Instagram berbasis AI menggunakan OpenAI API. User dapat membuat banyak konten, dan setiap konten bisa punya banyak slide yang akan digenerate menjadi gambar oleh AI.

---

## 🏗️ Arsitektur Aplikasi

### Tech Stack
- **Framework**: Next.js 15 (App Router)
- **UI**: React 19 + TailwindCSS
- **State Management**: Zustand
- **AI Service**: OpenAI Image Generation API (gpt-image-1)
- **Icons**: Lucide React
- **Notifications**: Sonner

### Struktur Folder
```
src/
├── app/               # Next.js App Router
│   ├── page.tsx       # Halaman utama
│   ├── layout.tsx     # Root layout
│   └── globals.css    # Global styles
├── components/        # React Components
│   ├── Header.tsx     # Header aplikasi
│   ├── TopBar.tsx     # Top bar (API key input, dll)
│   ├── Sidebar.tsx    # List konten
│   ├── EditorPanel.tsx # Panel editor utama
│   ├── KontenItem.tsx # Item konten di sidebar
│   ├── SlideCard.tsx  # Card untuk edit slide
│   ├── Gallery.tsx    # Gallery hasil generate
│   ├── ActivityLog.tsx # Log aktivitas
│   └── Lightbox.tsx   # Preview gambar full screen
├── store/
│   └── carouselStore.ts # Zustand store (state management)
├── hooks/
│   └── useGenerate.ts  # Custom hooks untuk generate gambar
└── lib/
    └── types.ts        # TypeScript types
```

---

## 🔄 Flow Aplikasi (Detail)

### 1️⃣ **Inisialisasi Aplikasi**

```
User membuka aplikasi
       ↓
┌──────────────────────────────┐
│   page.tsx (Main Layout)     │
├──────────────────────────────┤
│ ├─ Header                    │
│ ├─ TopBar (API Key Input)    │
│ ├─ Sidebar (List Konten)     │
│ ├─ EditorPanel (Main Editor) │
│ └─ Lightbox (Image Preview)  │
└──────────────────────────────┘
       ↓
Zustand Store diinisialisasi
- kontenList: []
- activeId: null
- apiKey: ""
- basePrompt: [default prompt]
- logs: ["▸ Siap digunakan."]
```

---

### 2️⃣ **Setup API Key**

```
User klik input API Key di TopBar
       ↓
Masukkan OpenAI API Key
       ↓
Store.setApiKey(key)
       ↓
API Key tersimpan di state
(digunakan untuk semua request ke OpenAI)
```

---

### 3️⃣ **Membuat Konten Baru**

```
User klik "＋ Tambah" di Sidebar
       ↓
Store.addKonten()
       ↓
┌─────────────────────────────┐
│ Konten Baru Dibuat:         │
│ - id: counter++             │
│ - title: "Konten N"         │
│ - slides: [                 │
│     {                       │
│       id: counter++,        │
│       label: "Slide 1",     │
│       content: "",          │
│       imgSrc: null,         │
│       status: "idle"        │
│     }                       │
│   ]                         │
└─────────────────────────────┘
       ↓
activeId diset ke konten baru
       ↓
EditorPanel menampilkan konten aktif
```

---

### 4️⃣ **Mengedit Konten & Slide**

```
User memilih konten dari Sidebar
       ↓
Store.setActiveId(id)
       ↓
EditorPanel menampilkan:
┌─────────────────────────────────┐
│ 🎨 Base Prompt (Global)         │
│ [textarea untuk edit prompt]    │
├─────────────────────────────────┤
│ 📝 Nama Konten: [input field]  │
│ [＋ Slide] [⚡ Generate] [👁 Preview] │
├─────────────────────────────────┤
│ Grid Slide Cards:               │
│ ┌──────┐ ┌──────┐ ┌──────┐     │
│ │Slide1│ │Slide2│ │Slide3│     │
│ └──────┘ └──────┘ └──────┘     │
└─────────────────────────────────┘

User bisa:
1. Edit Base Prompt → Store.setBasePrompt(prompt)
2. Edit Nama Konten → Store.updateKontenTitle(id, title)
3. Tambah Slide → Store.addSlide(kontenId)
4. Edit Label Slide → Store.updateSlideLabel(slideId, label)
5. Edit Content Slide → Store.updateSlideContent(slideId, content)
6. Hapus Slide → Store.deleteSlide(kontenId, slideId)
```

---

### 5️⃣ **Generate Gambar (Single Slide)**

```
User klik tombol "Generate" di SlideCard
       ↓
useGenerate.generateSlide(kontenId, slideId)
       ↓
┌──────────────────────────────────────┐
│ 1. Update status → "generating"      │
│    (tampilkan loading spinner)       │
├──────────────────────────────────────┤
│ 2. Build Prompt:                     │
│    basePrompt +                      │
│    "KONTEN: {title}" +               │
│    "SLIDE {n} dari {total}" +        │
│    slide.content                     │
├──────────────────────────────────────┤
│ 3. POST ke OpenAI API:               │
│    https://api.openai.com/v1/        │
│           images/generations         │
│    Body:                             │
│    {                                 │
│      model: "gpt-image-1",           │
│      prompt: [built prompt],         │
│      n: 1,                           │
│      size: "1024x1536",              │
│      quality: "high"                 │
│    }                                 │
├──────────────────────────────────────┤
│ 4. Response Handling:                │
│    ✓ Berhasil:                       │
│      - Ambil imgSrc (URL/base64)    │
│      - Store.updateSlideStatus(      │
│          kontenId, slideId,          │
│          "done", imgSrc)             │
│      - Store.addLog("✓ Berhasil")   │
│                                      │
│    ✗ Error:                          │
│      - Store.updateSlideStatus(      │
│          kontenId, slideId,          │
│          "error", null)              │
│      - Store.addLog("✗ Error msg")  │
└──────────────────────────────────────┘
       ↓
SlideCard menampilkan hasil:
- Status "done" → tampilkan gambar + tombol download/preview
- Status "error" → tampilkan error + tombol retry
```

---

### 6️⃣ **Generate Semua Slide (Dalam 1 Konten)**

```
User klik "⚡ Generate Konten Ini" di EditorPanel
       ↓
EditorPanel.generateActive()
       ↓
┌─────────────────────────────────┐
│ Loop untuk setiap slide:        │
│   1. generateSlide(kontenId, s) │
│   2. Update progress bar        │
│   3. Delay 500ms                │
│   4. Next slide...              │
└─────────────────────────────────┘
       ↓
Progress bar menampilkan progres (0-100%)
       ↓
Setelah selesai:
- Reset progress bar (3 detik delay)
- Log: "✓ {title} selesai semua! 🎉"
```

---

### 7️⃣ **Generate Semua Konten (Batch)**

```
User klik "⚡ Generate Semua" di TopBar
       ↓
useGenerate.generateAll()
       ↓
┌─────────────────────────────────────┐
│ Loop untuk setiap konten:           │
│   1. setActiveId(konten.id)         │
│   2. Delay 120ms                    │
│   3. Loop untuk setiap slide:       │
│      - generateSlide(k.id, s.id)    │
│      - Delay 500ms antar slide      │
│   4. Delay 600ms antar konten       │
└─────────────────────────────────────┘
       ↓
Log: "▸ Semua konten selesai! 🎉"
```

---

### 8️⃣ **Preview Prompt**

```
User klik "👁 Preview" di EditorPanel
       ↓
EditorPanel.previewPrompts()
       ↓
Build preview text:
┌──────────────────────────────────┐
│ === PREVIEW PROMPTS: {title} === │
│                                  │
│ ──── SLIDE 1: {label} ────       │
│ {basePrompt}                     │
│ KONTEN: {title}                  │
│ SLIDE 1 dari {total}             │
│ {slide.content}                  │
│                                  │
│ ──── SLIDE 2: {label} ────       │
│ ...                              │
└──────────────────────────────────┘
       ↓
Buka window baru dengan preview
(formatted as HTML with monospace font)
```

---

### 9️⃣ **Gallery & Lightbox**

```
User klik gambar hasil generate di SlideCard
       ↓
Store.setLightbox(imgSrc)
       ↓
Lightbox component menampilkan:
┌──────────────────────────────────┐
│   [Overlay gelap full screen]    │
│                                  │
│     ┌─────────────────┐          │
│     │                 │          │
│     │  [Gambar Besar] │          │
│     │                 │          │
│     └─────────────────┘          │
│                                  │
│  [Close button atau klik bg]    │
└──────────────────────────────────┘
       ↓
Klik close → Store.setLightbox(null)

Gallery component:
- Menampilkan semua slide yang status="done"
- Grid layout dengan preview thumbnail
- Klik thumbnail → buka Lightbox
```

---

### 🔟 **Activity Log**

```
Setiap aksi penting mencatat log:
       ↓
Store.addLog(message, type)
       ↓
┌─────────────────────────────────┐
│ 📜 Activity Log                 │
├─────────────────────────────────┤
│ ▸ Siap digunakan.         [info]│
│ Konten 1 ditambahkan.     [info]│
│ [K1·S1] Mengirim ke API…  [info]│
│ [K1·S1] ✓ Berhasil!       [ok]  │
│ [K1·S2] ✗ Error: ...      [err] │
└─────────────────────────────────┘

Types:
- "info" → warna putih/abu
- "ok"   → warna hijau
- "err"  → warna merah

User bisa:
- Clear log → Store.clearLogs()
```

---

## 📊 State Management (Zustand Store)

### State Structure
```typescript
{
  // Data
  kontenList: Konten[]        // Array semua konten
  activeId: number | null     // ID konten yang sedang aktif
  kCtr: number                // Counter untuk ID konten
  sCtr: number                // Counter untuk ID slide
  
  // Config
  apiKey: string              // OpenAI API Key
  basePrompt: string          // Global prompt template
  
  // UI
  logs: LogEntry[]            // Array log aktivitas
  lightboxSrc: string | null  // Image source untuk lightbox
  
  // Actions (semua function untuk update state)
  setApiKey, setBasePrompt, addKonten, deleteKonten,
  setActiveId, updateKontenTitle, addSlide, deleteSlide,
  updateSlideLabel, updateSlideContent, updateSlideStatus,
  addLog, clearLogs, setLightbox
}
```

### Data Types
```typescript
type SlideStatus = "idle" | "generating" | "done" | "error"

interface Slide {
  id: number
  label: string           // Judul slide
  content: string         // Konten prompt untuk slide ini
  imgSrc: string | null   // URL/base64 hasil generate
  status: SlideStatus     // Status generate
}

interface Konten {
  id: number
  title: string           // Nama konten
  slides: Slide[]         // Array slide dalam konten ini
}

interface LogEntry {
  message: string
  type: "info" | "ok" | "err"
}
```

---

## 🎯 User Journey (End-to-End)

### Scenario: Membuat Carousel Instagram 3 Slide

```
1. User buka aplikasi
   └─ Tampilan: Header, TopBar, Sidebar kosong, "No content" message

2. User masukkan OpenAI API Key di TopBar
   └─ API Key tersimpan di state

3. User klik "＋ Tambah" di Sidebar
   └─ Konten 1 dibuat dengan 1 slide default
   └─ EditorPanel menampilkan konten aktif

4. User edit:
   - Nama konten: "Promosi Skincare"
   - Tambah 2 slide lagi (＋ Slide) → total 3 slide
   - Edit label & content tiap slide:
     * Slide 1: "Cover" + [deskripsi produk]
     * Slide 2: "Benefit" + [manfaat produk]
     * Slide 3: "CTA" + [call to action]

5. User klik "👁 Preview" → lihat preview prompt
   └─ Check apakah prompt sudah sesuai

6. User klik "⚡ Generate Konten Ini"
   └─ Progress bar muncul
   └─ 3 slide digenerate satu per satu
   └─ Status tiap slide berubah: idle → generating → done
   └─ Log mencatat progres

7. Hasil muncul di SlideCard
   └─ Gambar preview + tombol Download/Preview

8. User klik gambar → Lightbox preview full screen

9. User klik download di SlideCard
   └─ Gambar terdownload ke device

10. User buat konten lain (ulangi step 3-9)

11. User klik "⚡ Generate Semua" di TopBar
    └─ Semua konten & slide digenerate batch
```

---

## 🔌 API Integration

### OpenAI Image Generation API

**Endpoint**: `https://api.openai.com/v1/images/generations`

**Request**:
```json
POST /v1/images/generations
Headers:
  Authorization: Bearer {apiKey}
  Content-Type: application/json

Body:
{
  "model": "gpt-image-1",
  "prompt": "{basePrompt} + {konten info} + {slide content}",
  "n": 1,
  "size": "1024x1536",
  "quality": "high"
}
```

**Response** (Success):
```json
{
  "data": [
    {
      "url": "https://...",
      "b64_json": "base64_string..."
    }
  ]
}
```

**Response** (Error):
```json
{
  "error": {
    "message": "Error description",
    "type": "invalid_request_error",
    "code": "..."
  }
}
```

---

## ⚡ Performance & Best Practices

### Rate Limiting
- Delay 500ms antar slide dalam 1 konten
- Delay 600ms antar konten saat batch generate
- Delay 120ms sebelum switch konten aktif

### Error Handling
- Try-catch pada setiap API call
- Update status slide ke "error" jika gagal
- Log error message untuk debugging
- Tidak block proses lain jika 1 slide error

### UX Optimization
- Status visual real-time (idle/generating/done/error)
- Progress bar untuk tracking batch generate
- Activity log untuk transparency
- Lightbox untuk preview gambar full screen
- Auto-scroll sidebar saat ada konten banyak

---

## 🎨 UI/UX Flow

```
┌─────────────────────────────────────────────────────┐
│ Header: Raho Premier AI Studio                     │
├─────────────────────────────────────────────────────┤
│ TopBar: [API Key Input] [⚡ Generate Semua]        │
├──────────────┬──────────────────────────────────────┤
│ Sidebar      │ EditorPanel                          │
│              │                                      │
│ 📚 Daftar    │ 🎨 Base Prompt (global)             │
│ [＋ Tambah]  │ [textarea...]                        │
│              │                                      │
│ ┌─────────┐ │ 📝 [Nama Konten]                     │
│ │Konten 1 │◄├── [＋ Slide] [⚡ Generate] [👁]       │
│ │ 3 slides│ │                                      │
│ │ 2 done  │ │ Slide Grid:                          │
│ └─────────┘ │ ┌────────┐ ┌────────┐ ┌────────┐   │
│             │ │ Slide 1│ │ Slide 2│ │ Slide 3│   │
│ ┌─────────┐ │ │[Label] │ │[Label] │ │[Label] │   │
│ │Konten 2 │ │ │[text]  │ │[text]  │ │[text]  │   │
│ │ 5 slides│ │ │[IMG]   │ │loading │ │ ⚠️     │   │
│ │ 0 done  │ │ │[⚡📥]  │ │        │ │ retry  │   │
│ └─────────┘ │ └────────┘ └────────┘ └────────┘   │
│             │                                      │
│             │ 🖼️ Gallery (hasil done)              │
│             │ [thumbnails grid...]                 │
│             │                                      │
│             │ 📜 Activity Log                      │
│             │ [log entries...] [Clear]            │
└──────────────┴──────────────────────────────────────┘
```

---

## 🚀 Deployment Flow

### Development
```bash
npm run dev
# → http://localhost:3000
```

### Production
```bash
npm run build
npm run start
```

### Docker
```bash
docker-compose up --build
# → Menggunakan Dockerfile & docker-compose.yml
```

---

## 🔐 Environment Variables

File `.env.local`:
```env
# Tidak perlu env var untuk OpenAI API key
# User input langsung di UI (TopBar)
```

---

## 📝 Notes

### Default Base Prompt
Aplikasi sudah include default prompt yang dioptimasi untuk style Raho Premier:
- Premium modern scientific aesthetic
- Gold & white color palette
- 4:5 vertical aspect ratio (Instagram carousel)
- Brand footer dengan contact info

### Image Format
- Size: 1024x1536 (4:5 ratio)
- Quality: High
- Format: PNG (base64 atau URL)

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires JavaScript enabled
- LocalStorage untuk persist API key (future enhancement)

---

## 🎯 Key Features Summary

✅ Multi-konten management  
✅ Multi-slide per konten  
✅ Global base prompt + per-slide content  
✅ Real-time status tracking  
✅ Batch generate (per konten atau semua)  
✅ Activity logging  
✅ Lightbox preview  
✅ Download hasil generate  
✅ Prompt preview sebelum generate  
✅ Responsive UI dengan custom scrollbar  
✅ Premium gold theme matching brand

---

Dokumentasi ini menjelaskan complete flow dari user interaction hingga technical implementation. 🎉
