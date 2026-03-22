"use client";

import { useState } from "react";
import { Send, Mic, Square, Loader2, Sparkles } from "lucide-react";
import { WaveformVisualizer } from "./WaveformVisualizer";
import type { RecorderStatus } from "@/lib/types";

interface PromptInputProps {
  onSubmitText: (text: string) => void;
  isGenerating: boolean;
  recorderStatus: RecorderStatus;
  duration: number;
  analyserNode: AnalyserNode | null;
  isRecording: boolean;
  transcript: string;
  isTranscribing: boolean;
  speechSupported: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function PromptInput({
  onSubmitText,
  isGenerating,
  recorderStatus,
  duration,
  analyserNode,
  isRecording,
  transcript,
  isTranscribing,
  speechSupported,
  onStartRecording,
  onStopRecording,
}: PromptInputProps) {
  const [textInput, setTextInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (textInput.trim() && !isGenerating) {
      onSubmitText(textInput.trim());
      setTextInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="space-y-3">
      {/* Recording overlay */}
      {isRecording && (
        <div className="animated-border rounded-2xl">
          <div className="rounded-2xl bg-[#0a0a0a] p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-xs font-medium text-red-400">Gravando</span>
              </div>
              <span className="text-xs text-zinc-600 font-mono tabular-nums">{formatDuration(duration)}</span>
            </div>
            <WaveformVisualizer analyserNode={analyserNode} isRecording={isRecording} />
            {isTranscribing && transcript && (
              <div className="px-3 py-2 rounded-xl bg-violet-500/[0.04] border border-violet-500/10">
                <p className="text-xs text-zinc-400 italic">&ldquo;{transcript}&rdquo;</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Generating status */}
      {isGenerating && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-violet-500/[0.04] border border-violet-500/[0.08]">
          <div className="relative">
            <Sparkles className="w-4 h-4 text-violet-400" />
            <div className="absolute inset-0 w-4 h-4 text-violet-400 animate-ping opacity-20">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="flex-1">
            <p className="text-xs font-medium text-zinc-300">Gerando código...</p>
            <p className="text-[10px] text-zinc-600">Llama 3.3 70B via Groq</p>
          </div>
          <Loader2 className="w-3.5 h-3.5 text-violet-400/50 animate-spin" />
        </div>
      )}

      {/* Main input */}
      <div className="glass rounded-2xl p-3">
        <form onSubmit={handleSubmit} className="flex gap-2 items-end">
          <textarea
            value={isRecording ? "" : textInput}
            onChange={(e) => setTextInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              isRecording
                ? "Falando..."
                : "Descreva o componente que quer criar..."
            }
            disabled={isGenerating || isRecording}
            rows={2}
            className="flex-1 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-violet-500/30 focus:bg-white/[0.04] disabled:opacity-30 resize-none leading-relaxed transition-all"
          />

          <div className="flex flex-col gap-1.5">
            <button
              type="submit"
              disabled={!textInput.trim() || isGenerating || isRecording}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white flex items-center justify-center disabled:opacity-20 transition-all hover:shadow-lg hover:shadow-violet-500/20 hover:-translate-y-0.5 active:translate-y-0"
            >
              {isGenerating ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </button>

            {isRecording ? (
              <button
                type="button"
                onClick={onStopRecording}
                className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center hover:bg-red-500/20 transition-all"
              >
                <Square className="w-3.5 h-3.5 text-red-400" />
              </button>
            ) : (
              <button
                type="button"
                onClick={onStartRecording}
                disabled={isGenerating}
                title={speechSupported ? "Gravar voz" : "Gravar (transcrição pode não funcionar)"}
                className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center hover:bg-white/[0.06] hover:border-white/[0.1] transition-all disabled:opacity-20"
              >
                <Mic className="w-4 h-4 text-zinc-500" />
              </button>
            )}
          </div>
        </form>
      </div>

      <p className="text-[11px] text-zinc-700 text-center font-mono">
        {isRecording && "fale o que deseja criar..."}
        {isGenerating && "gerando componente com ia..."}
        {recorderStatus === "idle" && !isGenerating && "enter para enviar · mic para voz"}
      </p>
    </div>
  );
}
