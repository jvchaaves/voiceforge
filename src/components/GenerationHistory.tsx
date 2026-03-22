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
  if (seconds < 3600) return `${Math.floor(seconds / 60)}min atrás`;
  return `${Math.floor(seconds / 3600)}h atrás`;
}

export function GenerationHistory({ history, onSelect }: GenerationHistoryProps) {
  if (history.length === 0) return null;

  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-4 h-4 text-zinc-400" />
        <h3 className="text-sm font-medium text-zinc-400">Histórico</h3>
        <span className="text-xs text-zinc-600 ml-auto">{history.length} gerações</span>
      </div>

      <div className="space-y-2 max-h-48 overflow-y-auto">
        {history.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item)}
            className="w-full text-left glass glass-hover rounded-xl p-3 transition-all group"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-zinc-300 truncate flex-1 mr-2">
                &ldquo;{item.transcript}&rdquo;
              </p>
              <div className="flex items-center gap-1 shrink-0">
                <span className="text-xs text-zinc-600">{timeAgo(item.timestamp)}</span>
                <ChevronRight className="w-3 h-3 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
