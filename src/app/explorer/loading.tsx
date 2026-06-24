"use client";

import { useUI } from "@/context/UIContext";

export default function ExplorerLoading() {
  const { t } = useUI();
  return (
    <div className="w-full h-[calc(100vh-80px)] bg-slate-50 dark:bg-slate-950 flex items-center justify-center transition-colors">
      <div className="flex flex-col items-center gap-4 text-center p-6">
        <div className="w-12 h-12 border-4 border-primary-blue/15 border-t-primary-blue rounded-full animate-spin shadow-sm" />
        <div>
          <span className="text-xs font-black text-primary-blue dark:text-cyan-400 tracking-[0.2em] uppercase block mb-1 underline decoration-2 underline-offset-4">INITIALIZING ENGINE</span>
          <p className="text-[10px] text-gray-400 dark:text-slate-500 font-bold uppercase tracking-wider">Synchronizing spatial geometry...</p>
        </div>
      </div>
    </div>
  );
}
