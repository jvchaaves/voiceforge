"use client";

import { Mic, Square, Loader2 } from "lucide-react";
import { WaveformVisualizer } from "./WaveformVisualizer";
import type { RecorderStatus } from "@/lib/types";

interface VoiceRecorderProps {
  status: RecorderStatus;
  duration: number;
  analyserNode: AnalyserNode | null;
  isRecording: boolean;
  isGenerating: boolean;
  onStart: () => void;
  onStop: () => void;
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function VoiceRecorder({
  status,
  duration,
  analyserNode,
  isRecording,
  isGenerating,
  onStart,
  onStop,
}: VoiceRecorderProps) {
  return (
    <div className="glass rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-zinc-400">Gravação de Voz</h3>
        {isRecording && (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-sm text-red-400 font-mono">{formatDuration(duration)}</span>
          </div>
        )}
        {isGenerating && (
          <div className="flex items-center gap-2 text-sm text-zinc-400">
            <Loader2 className="w-3 h-3 animate-spin" />
            Gerando...
          </div>
        )}
      </div>

      <WaveformVisualizer analyserNode={analyserNode} isRecording={isRecording} />

      <div className="flex justify-center">
        {isRecording ? (
          <button
            onClick={onStop}
            className="w-14 h-14 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center hover:bg-red-500/30 transition-colors"
          >
            <Square className="w-5 h-5 text-red-400" />
          </button>
        ) : (
          <button
            onClick={onStart}
            disabled={isGenerating}
            className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-50 glow-purple"
          >
            {isGenerating ? (
              <Loader2 className="w-5 h-5 text-white animate-spin" />
            ) : (
              <Mic className="w-5 h-5 text-white" />
            )}
          </button>
        )}
      </div>

      <p className="text-xs text-zinc-600 text-center">
        {status === "idle" && !isGenerating && "Clique para gravar sua descrição"}
        {status === "recording" && "Fale o que você quer criar... (transcrição em tempo real)"}
        {status === "processing" && "Finalizando gravação..."}
        {isGenerating && "Gerando componente com IA..."}
      </p>
    </div>
  );
}
