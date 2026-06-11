"use client";

import { Konten, Slide } from "@/lib/types";
import { useCarouselStore } from "@/store/carouselStore";
import { useGenerateSlide } from "@/hooks/useGenerate";
import { Play, Trash2, Loader2, Download, Eye, CheckCircle2, AlertCircle } from "lucide-react";

interface Props {
  konten: Konten;
  slide: Slide;
  index: number;
}

export default function SlideCard({ konten, slide, index }: Props) {
  const { updateSlideLabel, updateSlideContent, deleteSlide, setLightbox } = useCarouselStore();
  const { generateSlide } = useGenerateSlide();
  const isGenerating = slide.status === "generating";

  return (
    <div
      className={`bg-white dark:bg-slate-900 border rounded-xl overflow-hidden transition-all shadow-soft ${
        isGenerating
          ? "border-accent animate-pulseBorder"
          : "border-slate-200 dark:border-slate-700 hover:border-accent/30 dark:hover:border-accent/50 hover:shadow-medium"
      }`}
    >
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 transition-colors">
        <span className="bg-gradient-primary text-white text-xs font-bold rounded-md px-2 py-1 shrink-0">
          #{index + 1}
        </span>
        <input
          value={slide.label}
          onChange={(e) => updateSlideLabel(slide.id, e.target.value)}
          placeholder="Label slide..."
          className="flex-1 input text-sm py-1.5 min-w-0"
        />
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => generateSlide(konten.id, slide.id)}
            className="btn btn-primary py-1.5 px-3 text-xs flex items-center gap-1.5 shrink-0"
            disabled={isGenerating}
          >
            {isGenerating ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Play className="w-3.5 h-3.5" />
            )}
            <span className="hidden sm:inline">Gen</span>
          </button>
          {konten.slides.length > 1 && (
            <button
              onClick={() => deleteSlide(konten.id, slide.id)}
              className="p-1.5 rounded text-slate-400 dark:text-slate-500 hover:text-error dark:hover:text-error hover:bg-error/10 transition-all shrink-0"
              title="Hapus slide"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Content Editor */}
      <div className="p-4">
        <textarea
          rows={5}
          value={slide.content}
          onChange={(e) => updateSlideContent(slide.id, e.target.value)}
          placeholder={`Konten untuk slide ${index + 1}:\n• Headline utama\n• Poin-poin penting\n• Visual direction\n• Call to action`}
          className="w-full input text-sm leading-relaxed resize-y min-h-[100px]"
        />
      </div>

      {/* Result Preview */}
      <div className="px-4 pb-4 border-t border-slate-100 dark:border-slate-800">
        {slide.status === "generating" && (
          <div className="mt-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-accent/10 dark:bg-accent/20 border border-accent/20 dark:border-accent/30 text-accent dark:text-accent-light mb-3">
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              Generating slide {index + 1}...
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg p-6 text-center text-slate-400 dark:text-slate-500 text-sm">
              Menghubungi OpenAI API...
            </div>
          </div>
        )}

        {slide.status === "done" && slide.imgSrc && (
          <div className="mt-3 animate-fadeIn">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-success/10 dark:bg-success/20 border border-success/20 dark:border-success/30 text-success mb-3">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Slide {index + 1} berhasil
            </div>
            <div className="group relative rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 cursor-pointer hover:border-accent transition-all">
              <img
                src={slide.imgSrc}
                alt={slide.label}
                onClick={() => setLightbox(slide.imgSrc)}
                className="w-full block"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                <Eye className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => setLightbox(slide.imgSrc)}
                className="btn btn-ghost text-xs flex items-center gap-1.5 flex-1"
              >
                <Eye className="w-3.5 h-3.5" />
                Preview
              </button>
              <a
                href={slide.imgSrc}
                download={`raho-slide-${index + 1}.png`}
                className="btn btn-secondary text-xs flex items-center gap-1.5 flex-1"
              >
                <Download className="w-3.5 h-3.5" />
                Download
              </a>
            </div>
          </div>
        )}

        {slide.status === "error" && (
          <div className="mt-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-error/10 dark:bg-error/20 border border-error/20 dark:border-error/30 text-error mb-3">
              <AlertCircle className="w-3.5 h-3.5" />
              Generate gagal
            </div>
            <button
              onClick={() => generateSlide(konten.id, slide.id)}
              className="btn btn-secondary text-xs w-full"
            >
              Coba Lagi
            </button>
          </div>
        )}

        {slide.status === "idle" && (
          <div className="mt-3 bg-slate-50 dark:bg-slate-800 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg p-6 text-center text-slate-400 dark:text-slate-500 text-sm">
            Gambar akan muncul di sini setelah generate
          </div>
        )}
      </div>
    </div>
  );
}
