"use client";

import { useCarouselStore } from "@/store/carouselStore";
import { useGenerateSlide } from "@/hooks/useGenerate";
import SlideCard from "./SlideCard";
import Gallery from "./Gallery";
import ActivityLog from "./ActivityLog";
import { useState } from "react";
import { Plus, Sparkles, Eye, FileText } from "lucide-react";

export default function EditorPanel() {
  const {
    kontenList, activeId, basePrompt, setBasePrompt,
    updateKontenTitle, addSlide,
  } = useCarouselStore();
  const { generateSlide } = useGenerateSlide();
  const [progress, setProgress] = useState(0);
  const [generating, setGenerating] = useState(false);

  const activeKonten = kontenList.find((k) => k.id === activeId) ?? null;

  const generateActive = async () => {
    if (!activeKonten) return;
    const state = useCarouselStore.getState();
    if (!state.apiKey) { alert("Masukkan OpenAI API Key."); return; }

    setGenerating(true);
    setProgress(0);
    state.addLog(`▸ Generate "${activeKonten.title}" (${activeKonten.slides.length} slide)…`, "info");

    for (let i = 0; i < activeKonten.slides.length; i++) {
      await generateSlide(activeKonten.id, activeKonten.slides[i].id);
      setProgress(((i + 1) / activeKonten.slides.length) * 100);
      if (i < activeKonten.slides.length - 1) await new Promise((r) => setTimeout(r, 500));
    }

    state.addLog(`▸ "${activeKonten.title}" selesai semua! 🎉`, "ok");
    setTimeout(() => { setGenerating(false); setProgress(0); }, 3000);
  };

  const previewPrompts = () => {
    if (!activeKonten) return;
    let text = `=== PREVIEW PROMPTS: ${activeKonten.title} ===\n\n`;
    activeKonten.slides.forEach((s, i) => {
      text += `──── SLIDE ${i + 1}: ${s.label} ────\n${basePrompt}\n\nKONTEN: ${activeKonten.title}\nSLIDE ${i + 1} dari ${activeKonten.slides.length} — ${s.label}\n\n${s.content}\n\n`;
    });
    const win = window.open("", "_blank", "width=750,height=560,scrollbars=yes");
    win?.document.write(`<html><head><title>Preview</title><style>body{font-family:monospace;font-size:12px;padding:18px;background:#f8fafc;color:#334155;white-space:pre-wrap;line-height:1.65}</style></head><body>${text.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}</body></html>`);
    win?.document.close();
  };

  const doneCount = activeKonten?.slides.filter((s) => s.status === "done").length ?? 0;

  if (!activeKonten) {
    return (
      <main className="flex-1 overflow-y-auto p-6 custom-scroll flex items-center justify-center bg-slate-50 dark:bg-slate-950 transition-colors">
        <div className="flex flex-col items-center gap-4 text-slate-400 dark:text-slate-500 text-center">
          <FileText className="w-16 h-16 opacity-20" />
          <div>
            <p className="text-base font-medium mb-1">Belum ada konten dipilih</p>
            <p className="text-sm">
              Klik konten di sidebar atau buat konten baru untuk mulai
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 overflow-y-auto p-6 custom-scroll bg-slate-50 dark:bg-slate-950 transition-colors">
      {/* Base Prompt */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 mb-6 shadow-soft transition-colors">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide mb-3">
          <div className="w-1 h-4 bg-gradient-primary rounded-full" />
          Base Prompt
          <span className="text-slate-400 dark:text-slate-500 font-normal normal-case tracking-normal ml-1">
            — digunakan di semua slide & konten
          </span>
        </div>
        <textarea
          value={basePrompt}
          onChange={(e) => setBasePrompt(e.target.value)}
          rows={5}
          className="w-full input text-sm leading-relaxed resize-y font-mono"
          placeholder="Masukkan base prompt untuk AI..."
        />
      </div>

      {/* Editor Header */}
      <div className="flex items-center gap-3 mb-5 flex-wrap">
        <input
          value={activeKonten.title}
          onChange={(e) => updateKontenTitle(activeKonten.id, e.target.value)}
          placeholder="Nama Konten…"
          className="flex-1 min-w-[200px] input text-lg font-semibold"
        />
        <div className="flex gap-2 flex-wrap">
          <button 
            onClick={() => addSlide(activeKonten.id)} 
            className="btn btn-secondary flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Slide
          </button>
          <button 
            onClick={generateActive} 
            className="btn btn-primary flex items-center gap-2 shadow-soft"
          >
            <Sparkles className="w-4 h-4" />
            Generate Konten Ini
          </button>
          <button 
            onClick={previewPrompts} 
            className="btn btn-ghost flex items-center gap-2"
          >
            <Eye className="w-4 h-4" />
            Preview
          </button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-gradient-soft border border-primary-200 dark:border-slate-700 rounded-xl px-5 py-3 flex items-center justify-between gap-3 mb-5 flex-wrap transition-colors">
        <div className="text-sm text-slate-600 dark:text-slate-400">
          <strong className="text-accent dark:text-accent-light font-semibold">{activeKonten.slides.length} slide{activeKonten.slides.length > 1 ? "s" : ""}</strong>
          {doneCount > 0 && <span className="text-success ml-3">• {doneCount} selesai</span>}
        </div>
        {generating && (
          <span className="text-xs text-accent dark:text-accent-light font-medium animate-pulse">
            Generating...
          </span>
        )}
      </div>

      {/* Progress Bar */}
      {generating && (
        <div className="h-1 bg-slate-200 dark:bg-slate-800 rounded-full mb-5 overflow-hidden">
          <div
            className="h-full bg-gradient-primary rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Slides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 mb-6">
        {activeKonten.slides.map((s, idx) => (
          <SlideCard key={s.id} konten={activeKonten} slide={s} index={idx} />
        ))}
      </div>

      <Gallery konten={activeKonten} />
      <ActivityLog />
    </main>
  );
}
