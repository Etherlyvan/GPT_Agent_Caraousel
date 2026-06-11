import { create } from "zustand";
import { Konten, Slide, LogEntry } from "@/lib/types";

interface CarouselState {
  kontenList: Konten[];
  activeId: number | null;
  kCtr: number;
  sCtr: number;
  apiKey: string;
  basePrompt: string;
  logs: LogEntry[];
  lightboxSrc: string | null;

  // Actions
  setApiKey: (key: string) => void;
  setBasePrompt: (prompt: string) => void;
  addKonten: () => void;
  deleteKonten: (id: number) => void;
  setActiveId: (id: number | null) => void;
  updateKontenTitle: (id: number, title: string) => void;
  addSlide: (kontenId: number) => void;
  deleteSlide: (kontenId: number, slideId: number) => void;
  updateSlideLabel: (slideId: number, label: string) => void;
  updateSlideContent: (slideId: number, content: string) => void;
  updateSlideStatus: (
    kontenId: number,
    slideId: number,
    status: Slide["status"],
    imgSrc?: string | null
  ) => void;
  addLog: (message: string, type: LogEntry["type"]) => void;
  clearLogs: () => void;
  setLightbox: (src: string | null) => void;
}

const DEFAULT_BASE_PROMPT = `Create a premium modern scientific Instagram carousel slide for Raho Premier with elegant gold and white color palette, luxury biotechnology aesthetic, clean editorial composition, soft gold glow accents, premium healthcare branding, minimalist scientific design.

FORMAT: Aspect Ratio 4:5 Vertical. High Resolution. Instagram Carousel. Premium Scientific Editorial Layout. Spacious Composition. High Readability.

IMPORTANT: Place "RAHO PREMIER" text at TOP CENTER in elegant gold serif typography — small, clean spacing.

COLOR PALETTE: White (#FFFFFF), Gold (#D4AF37), Light Gold (#F5D76E), Soft Champagne Gradient.

BOTTOM FOOTER: 📱 WhatsApp: +62 851-3622-2772 | 📸 @rahopremier | 🎵 @rahopremier — gold icons, elegant separator, white rounded bar.`;

export const useCarouselStore = create<CarouselState>((set, get) => ({
  kontenList: [],
  activeId: null,
  kCtr: 0,
  sCtr: 0,
  apiKey: "",
  basePrompt: DEFAULT_BASE_PROMPT,
  logs: [{ message: "▸ Siap digunakan.", type: "info" }],
  lightboxSrc: null,

  setApiKey: (key) => set({ apiKey: key }),
  setBasePrompt: (prompt) => set({ basePrompt: prompt }),

  addKonten: () =>
    set((state) => {
      const kCtr = state.kCtr + 1;
      const sCtr = state.sCtr + 1;
      const newKonten: Konten = {
        id: kCtr,
        title: `Konten ${kCtr}`,
        slides: [{ id: sCtr, label: "Slide 1", content: "", imgSrc: null, status: "idle" }],
      };
      return {
        kontenList: [...state.kontenList, newKonten],
        activeId: kCtr,
        kCtr,
        sCtr,
        logs: [...state.logs, { message: `Konten ${kCtr} ditambahkan.`, type: "info" }],
      };
    }),

  deleteKonten: (id) =>
    set((state) => ({
      kontenList: state.kontenList.filter((k) => k.id !== id),
      activeId: state.activeId === id ? null : state.activeId,
    })),

  setActiveId: (id) => set({ activeId: id }),

  updateKontenTitle: (id, title) =>
    set((state) => ({
      kontenList: state.kontenList.map((k) => (k.id === id ? { ...k, title } : k)),
    })),

  addSlide: (kontenId) =>
    set((state) => {
      const sCtr = state.sCtr + 1;
      return {
        sCtr,
        kontenList: state.kontenList.map((k) => {
          if (k.id !== kontenId) return k;
          const num = k.slides.length + 1;
          return {
            ...k,
            slides: [...k.slides, { id: sCtr, label: `Slide ${num}`, content: "", imgSrc: null, status: "idle" }],
          };
        }),
      };
    }),

  deleteSlide: (kontenId, slideId) =>
    set((state) => ({
      kontenList: state.kontenList.map((k) => {
        if (k.id !== kontenId || k.slides.length <= 1) return k;
        return { ...k, slides: k.slides.filter((s) => s.id !== slideId) };
      }),
    })),

  updateSlideLabel: (slideId, label) =>
    set((state) => ({
      kontenList: state.kontenList.map((k) => ({
        ...k,
        slides: k.slides.map((s) => (s.id === slideId ? { ...s, label } : s)),
      })),
    })),

  updateSlideContent: (slideId, content) =>
    set((state) => ({
      kontenList: state.kontenList.map((k) => ({
        ...k,
        slides: k.slides.map((s) => (s.id === slideId ? { ...s, content } : s)),
      })),
    })),

  updateSlideStatus: (kontenId, slideId, status, imgSrc) =>
    set((state) => ({
      kontenList: state.kontenList.map((k) => {
        if (k.id !== kontenId) return k;
        return {
          ...k,
          slides: k.slides.map((s) =>
            s.id === slideId ? { ...s, status, imgSrc: imgSrc !== undefined ? imgSrc : s.imgSrc } : s
          ),
        };
      }),
    })),

  addLog: (message, type) =>
    set((state) => ({ logs: [...state.logs, { message, type }] })),

  clearLogs: () => set({ logs: [{ message: "▸ Log dibersihkan.", type: "info" }] }),

  setLightbox: (src) => set({ lightboxSrc: src }),
}));