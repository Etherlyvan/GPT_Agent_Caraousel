"use client";

import { useCarouselStore } from "@/store/carouselStore";
import { useEffect } from "react";
import { X } from "lucide-react";

export default function Lightbox() {
  const { lightboxSrc, setLightbox } = useCarouselStore();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setLightbox(null); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [setLightbox]);

  if (!lightboxSrc) return null;

  return (
    <div
      onClick={() => setLightbox(null)}
      className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm flex items-center justify-center p-8 animate-fadeIn"
    >
      <button
        onClick={() => setLightbox(null)}
        className="absolute top-6 right-6 bg-white/10 hover:bg-white/20 dark:bg-slate-800/50 dark:hover:bg-slate-700/50 text-white rounded-full w-10 h-10 flex items-center justify-center transition-all hover:scale-110"
      >
        <X className="w-5 h-5" />
      </button>
      <img
        src={lightboxSrc}
        alt="Preview"
        onClick={(e) => e.stopPropagation()}
        className="max-w-[min(86vw,550px)] max-h-[90vh] rounded-xl shadow-large border-2 border-white/20 dark:border-slate-700/50"
      />
    </div>
  );
}
