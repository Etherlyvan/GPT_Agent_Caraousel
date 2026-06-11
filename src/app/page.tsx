"use client";

import Header from "@/components/Header";
import TopBar from "@/components/TopBar";
import Sidebar from "@/components/Sidebar";
import EditorPanel from "@/components/EditorPanel";
import Lightbox from "@/components/Lightbox";

export default function Home() {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors">
      <Header />
      <TopBar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <EditorPanel />
      </div>
      <Lightbox />
    </div>
  );
}