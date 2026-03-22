"use client";

import { useState } from "react";
import { MessageSquare, Loader2, Send, Keyboard } from "lucide-react";

interface TranscriptDisplayProps {
  transcript: string;
  isTranscribing: boolean;
  isGenerating: boolean;
  speechSupported: boolean;
  onSubmitText: (text: string) => void;
}

export function TranscriptDisplay({
  transcript,
  isTranscribing,
  isGenerating,
  speechSupported,
  onSubmitText,
}: TranscriptDisplayProps) {
  const [textInput, setTextInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (textInput.trim()) {
      onSubmitText(textInput.trim());
      setTextInput("");
    }
  };

  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-3">
        <MessageSquare className="w-4 h-4 text-zinc-400" />
        <h3 className="text-sm font-medium text-zinc-400">
          {speechSupported ? "Transcrição" : "Descrição"}
        </h3>
        {isTranscribing && (
          <div className="flex items-center gap-1 ml-auto">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-green-400">ao vivo</span>
          </div>
        )}
      </div>

      {/* Text input fallback when speech is unavailable */}
      {!speechSupported && (
        <>
          <div className="flex items-center gap-2 mb-3 px-3 py-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
            <Keyboard className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
            <p className="text-xs text-yellow-400/80">
              Reconhecimento de voz indisponível. Use o campo abaixo para digitar.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Descreva o componente que quer criar..."
              disabled={isGenerating}
              className="flex-1 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-purple-500/50 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!textInput.trim() || isGenerating}
              className="px-3 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white disabled:opacity-50 transition-opacity hover:opacity-90"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </>
      )}

      {/* Transcription display */}
      {speechSupported && (
        <>
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
        </>
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
