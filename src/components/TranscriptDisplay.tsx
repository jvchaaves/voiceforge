"use client";

import { MessageSquare, Loader2 } from "lucide-react";

interface TranscriptDisplayProps {
  transcript: string;
  isTranscribing: boolean;
  isGenerating: boolean;
}

export function TranscriptDisplay({ transcript, isTranscribing, isGenerating }: TranscriptDisplayProps) {
  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-3">
        <MessageSquare className="w-4 h-4 text-zinc-400" />
        <h3 className="text-sm font-medium text-zinc-400">Transcrição</h3>
        {isTranscribing && (
          <div className="flex items-center gap-1 ml-auto">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-green-400">ao vivo</span>
          </div>
        )}
      </div>

      {isTranscribing && !transcript ? (
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: "0ms" }} />
            <div className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: "150ms" }} />
            <div className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
          <span className="text-sm text-zinc-500">Ouvindo...</span>
        </div>
      ) : transcript ? (
        <p className="text-sm text-zinc-300 leading-relaxed italic">
          &ldquo;{transcript}&rdquo;
        </p>
      ) : (
        <p className="text-sm text-zinc-600">
          A transcrição da sua fala aparecerá aqui em tempo real...
        </p>
      )}

      {isGenerating && (
        <div className="mt-3 flex items-center gap-2">
          <Loader2 className="w-3 h-3 animate-spin text-purple-400" />
          <span className="text-xs text-purple-400">Gerando código com Llama 3.3...</span>
        </div>
      )}
    </div>
  );
}
