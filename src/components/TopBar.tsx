"use client";

import { useCarouselStore } from "@/store/carouselStore";
import { useGenerateAll } from "@/hooks/useGenerate";
import { Key, Sparkles } from "lucide-react";

export default function TopBar() {
  const { apiKey, setApiKey } = useCarouselStore();
  const { generateAll } = useGenerateAll();

  return (
    <div className="flex items-center gap-4 px-6 py-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex-wrap transition-colors">
      <div className="flex items-center gap-3 flex-1 min-w-[300px]">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-400">
          <Key className="w-4 h-4" />
          API Key
        </div>
        <input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="sk-proj-..."
          autoComplete="off"
          className="flex-1 max-w-[400px] input text-sm"
        />
        <span className="text-xs text-slate-400 dark:text-slate-500 hidden md:block">
          Tersimpan di sesi browser
        </span>
      </div>
      <button
        onClick={generateAll}
        className="btn btn-primary flex items-center gap-2 shadow-soft hover:shadow-medium"
      >
        <Sparkles className="w-4 h-4" />
        Generate Semua
      </button>
    </div>
  );
}
