"use client";

import { useCarouselStore } from "@/store/carouselStore";
import KontenItem from "./KontenItem";
import { Plus, FolderOpen } from "lucide-react";

export default function Sidebar() {
  const { kontenList, addKonten } = useCarouselStore();

  return (
    <aside className="w-[280px] min-w-[280px] bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden transition-colors">
      <div className="flex items-center justify-between px-4 py-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
          <FolderOpen className="w-4 h-4" />
          Daftar Konten
        </div>
        <button
          onClick={addKonten}
          className="btn btn-secondary text-sm flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          Tambah
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-3 custom-scroll space-y-2">
        {kontenList.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-400 dark:text-slate-500 text-center px-4">
            <FolderOpen className="w-12 h-12 mb-3 opacity-30" />
            <p className="text-sm">Belum ada konten</p>
            <p className="text-xs mt-1">Klik "Tambah" untuk memulai</p>
          </div>
        ) : (
          kontenList.map((k, idx) => (
            <KontenItem key={k.id} konten={k} index={idx} />
          ))
        )}
      </div>
    </aside>
  );
}
