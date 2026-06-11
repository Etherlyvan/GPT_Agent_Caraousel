"use client";

import { Konten } from "@/lib/types";
import { useCarouselStore } from "@/store/carouselStore";
import { Images, Download } from "lucide-react";

interface Props {
  konten: Konten;
}

export default function Gallery({ konten }: Props) {
  const { setLightbox } = useCarouselStore();
  const done = konten.slides.filter((s) => s.imgSrc);
  if (done.length === 0) return null;

  return (
    <div className="mt-8 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Images className="w-5 h-5 text-accent dark:text-accent-light" />
        <h3 className="font-display text-xl font-semibold text-slate-700 dark:text-slate-300">
          Hasil Generate
        </h3>
        <span className="text-sm text-slate-400 dark:text-slate-500">({done.length} gambar)</span>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-3">
        {konten.slides.map((s, i) =>
          s.imgSrc ? (
            <div
              key={s.id}
              className="group relative rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 cursor-pointer hover:border-accent dark:hover:border-accent hover:shadow-medium transition-all card-hover"
            >
              <div onClick={() => setLightbox(s.imgSrc)}>
                <img src={s.imgSrc} alt={s.label} className="w-full block" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <span className="text-white text-sm font-medium">Preview</span>
                </div>
              </div>
              <div className="flex justify-between items-center px-3 py-2 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
                <span className="text-xs text-slate-600 dark:text-slate-400 truncate flex-1">{s.label}</span>
                <a
                  href={s.imgSrc}
                  download={`raho-${i + 1}.png`}
                  onClick={(e) => e.stopPropagation()}
                  className="ml-2 p-1 text-accent dark:text-accent-light hover:bg-accent/10 rounded transition-all"
                  title="Download"
                >
                  <Download className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}
