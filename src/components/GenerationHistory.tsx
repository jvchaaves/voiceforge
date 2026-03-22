"use client";

import { Clock, ChevronRight } from "lucide-react";
import type { GenerationHistoryItem } from "@/lib/types";

interface GenerationHistoryProps {
  history: GenerationHistoryItem[];
  onSelect: (item: GenerationHistoryItem) => void;
}

function timeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return "agora";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}min`;
  return `${Math.floor(seconds / 3600)}h`;
}

export function GenerationHistory({ history, onSelect }: GenerationHistoryProps) {
  if (history.length === 0) return null;

  return (
    <div className="glass rounded-2xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <Clock className="w-3.5 h-3.5 text-zinc-600" />
        <h3 className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Histórico</h3>
        <span className="text-[10px] text-zinc-700 font-mono ml-auto">{history.length}</span>
      </div>

      <div className="space-y-1.5 max-h-40 overflow-y-auto">
        {history.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item)}
            className="w-full text-left rounded-xl px-3 py-2.5 bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] hover:border-white/[0.08] transition-all group"
          >
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs text-zinc-400 truncate flex-1">
                {item.transcript}
              </p>
              <div className="flex items-center gap-1 shrink-0">
                <span className="text-[10px] text-zinc-700 font-mono">{timeAgo(item.timestamp)}</span>
                <ChevronRight className="w-3 h-3 text-zinc-700 group-hover:text-zinc-400 transition-colors" />
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
