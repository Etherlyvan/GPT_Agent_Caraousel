"use client";

import { useCarouselStore } from "@/store/carouselStore";
import { useEffect, useRef } from "react";
import { Activity, Trash2, CheckCircle2, AlertCircle, Info } from "lucide-react";

export default function ActivityLog() {
  const { logs, clearLogs } = useCarouselStore();
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [logs]);

  const getIcon = (type: string) => {
    if (type === "ok") return <CheckCircle2 className="w-3.5 h-3.5 text-success flex-shrink-0" />;
    if (type === "err") return <AlertCircle className="w-3.5 h-3.5 text-error flex-shrink-0" />;
    return <Info className="w-3.5 h-3.5 text-accent dark:text-accent-light flex-shrink-0" />;
  };

  const getColor = (type: string) => {
    if (type === "ok") return "text-success";
    if (type === "err") return "text-error";
    return "text-slate-600 dark:text-slate-400";
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-soft transition-colors">
      <div className="flex items-center justify-between px-4 py-3 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
          <Activity className="w-4 h-4" />
          Activity Log
        </div>
        <button
          onClick={clearLogs}
          className="btn btn-ghost text-xs py-1 px-2 flex items-center gap-1.5"
        >
          <Trash2 className="w-3 h-3" />
          Clear
        </button>
      </div>
      <div
        ref={bodyRef}
        className="px-4 py-3 max-h-[120px] overflow-y-auto custom-scroll font-mono text-xs leading-relaxed space-y-1"
      >
        {logs.map((log, i) => (
          <div key={i} className={`flex items-start gap-2 ${getColor(log.type)}`}>
            {getIcon(log.type)}
            <span className="flex-1">{log.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
