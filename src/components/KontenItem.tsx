"use client";

import { Konten } from "@/lib/types";
import { useCarouselStore } from "@/store/carouselStore";
import { Trash2, CheckCircle2, Loader2 } from "lucide-react";

interface Props {
  konten: Konten;
  index: number;
}

export default function KontenItem({ konten, index }: Props) {
  const { activeId, setActiveId, deleteKonten } = useCarouselStore();
  const isActive = konten.id === activeId;
  const done = konten.slides.filter((s) => s.status === "done").length;
  const generating = konten.slides.some((s) => s.status === "generating");

  return (
    <div
      onClick={() => setActiveId(konten.id)}
      className={`relative group border rounded-xl p-3 cursor-pointer transition-all card-hover ${
        isActive
          ? "border-accent bg-accent/5 dark:bg-accent/10 shadow-soft"
          : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-accent/30 dark:hover:border-accent/50 hover:shadow-soft"
      }`}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          if (confirm("Hapus konten ini?")) deleteKonten(konten.id);
        }}
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-slate-400 dark:text-slate-500 hover:text-error dark:hover:text-error hover:bg-error/10 rounded p-1 transition-all z-10"
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>

      <div className="flex items-center gap-2 mb-2">
        <span className="bg-gradient-primary text-white text-xs font-bold rounded-md px-2 py-0.5 shrink-0">
          {index + 1}
        </span>
        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 truncate flex-1">
          {konten.title}
        </span>
      </div>

      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2">
        <span>{konten.slides.length} slide{konten.slides.length > 1 ? "s" : ""}</span>
        {done > 0 && (
          <>
            <span>•</span>
            <div className="flex items-center gap-1 text-success">
              <CheckCircle2 className="w-3 h-3" />
              {done} selesai
            </div>
          </>
        )}
        {generating && (
          <>
            <span>•</span>
            <div className="flex items-center gap-1 text-accent">
              <Loader2 className="w-3 h-3 animate-spin" />
              Generating...
            </div>
          </>
        )}
      </div>

      <div className="flex flex-wrap gap-1">
        {konten.slides.map((s) => {
          let dotColor = "bg-slate-300 dark:bg-slate-600";
          if (s.status === "done") dotColor = "bg-success";
          if (s.status === "generating") dotColor = "bg-accent animate-pulse";
          if (s.status === "error") dotColor = "bg-error";
          
          return (
            <div
              key={s.id}
              className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-md bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
              title={s.label}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
              <span className="text-slate-600 dark:text-slate-400">
                {s.label.replace("Slide ", "").split(/[–—-]/)[0].trim().slice(0, 8)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
