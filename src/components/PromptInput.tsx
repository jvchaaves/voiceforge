"use client";

import { useState } from "react";
import { Send, Mic, Square, Loader2 } from "lucide-react";
import { WaveformVisualizer } from "./WaveformVisualizer";
import type { RecorderStatus } from "@/lib/types";

interface PromptInputProps {
  // Text
  onSubmitText: (text: string) => void;
  isGenerating: boolean;
  // Voice
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
    <div className="glass rounded-2xl p-5 space-y-4">
      {/* Recording waveform (visible only while recording) */}
      {isRecording && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs text-red-400">Gravando</span>
            </div>
            <span className="text-xs text-zinc-500 font-mono">{formatDuration(duration)}</span>
          </div>
          <WaveformVisualizer analyserNode={analyserNode} isRecording={isRecording} />
        </div>
      )}

      {/* Live transcript while recording */}
      {isTranscribing && transcript && (
        <div className="px-3 py-2 rounded-xl bg-purple-500/5 border border-purple-500/10">
          <p className="text-sm text-zinc-300 italic">&ldquo;{transcript}&rdquo;</p>
        </div>
      )}

      {/* Text input (always visible) */}
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
          className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-purple-500/50 disabled:opacity-40 resize-none leading-relaxed"
        />

        <div className="flex flex-col gap-2">
          {/* Send button */}
          <button
            type="submit"
            disabled={!textInput.trim() || isGenerating || isRecording}
            className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white flex items-center justify-center disabled:opacity-30 transition-opacity hover:opacity-90"
          >
            {isGenerating ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>

          {/* Mic button */}
          {isRecording ? (
            <button
              type="button"
              onClick={onStopRecording}
              className="w-10 h-10 rounded-xl bg-red-500/20 border border-red-500/30 flex items-center justify-center hover:bg-red-500/30 transition-colors"
            >
              <Square className="w-4 h-4 text-red-400" />
            </button>
          ) : (
            <button
              type="button"
              onClick={onStartRecording}
              disabled={isGenerating}
              title={speechSupported ? "Gravar voz" : "Gravar voz (transcrição pode não funcionar neste navegador)"}
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors disabled:opacity-30"
            >
              <Mic className="w-4 h-4 text-zinc-400" />
            </button>
          )}
        </div>
      </form>

      <p className="text-xs text-zinc-600 text-center">
        {isGenerating && "Gerando componente com Llama 3.3..."}
        {isRecording && "Fale o que deseja criar — clique no quadrado para parar"}
        {recorderStatus === "idle" && !isGenerating && "Digite ou use o microfone para descrever o componente"}
      </p>
    </div>
  );
}
