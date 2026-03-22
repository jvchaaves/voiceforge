"use client";

import { useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, Waves, Copy, Download, RotateCcw, Sparkles } from "lucide-react";
import { useVoiceRecorder } from "@/hooks/useVoiceRecorder";
import { useCodeGeneration } from "@/hooks/useCodeGeneration";
import { PromptInput } from "@/components/PromptInput";
import { CodePreview } from "@/components/CodePreview";
import { GenerationHistory } from "@/components/GenerationHistory";
import type { GenerationHistoryItem } from "@/lib/types";

export default function BuilderPage() {
  const recorder = useVoiceRecorder();
  const generation = useCodeGeneration();

  const handleStartRecording = useCallback(() => {
    recorder.reset();
    recorder.startRecording();
  }, [recorder]);

  const handleStopAndGenerate = useCallback(() => {
    recorder.stopRecording();
    setTimeout(() => {
      const finalText = recorder.getFinalTranscript();
      if (finalText) {
        generation.generate(finalText, generation.code || undefined);
      }
    }, 500);
  }, [recorder, generation]);

  const handleTextSubmit = useCallback((text: string) => {
    recorder.setManualTranscript(text);
    generation.generate(text, generation.code || undefined);
  }, [recorder, generation]);

  const handleCopyCode = useCallback(() => {
    if (generation.code) {
      navigator.clipboard.writeText(generation.code);
    }
  }, [generation.code]);

  const handleDownload = useCallback(() => {
    if (generation.code) {
      const blob = new Blob([generation.code], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Component.jsx";
      a.click();
      URL.revokeObjectURL(url);
    }
  }, [generation.code]);

  const handleSelectHistory = useCallback(
    (item: GenerationHistoryItem) => {
      generation.setCode(item.code);
    },
    [generation]
  );

  const handleReset = useCallback(() => {
    recorder.reset();
    generation.reset();
  }, [recorder, generation]);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Background orbs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-purple-600/5 blur-[128px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-cyan-600/5 blur-[128px]" />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-white/5">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-zinc-500 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Waves className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-semibold tracking-tight">VoiceForge</span>
            <span className="text-xs text-zinc-600 ml-1">Builder</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {generation.code && (
            <>
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-zinc-400 hover:text-white glass glass-hover transition-all"
              >
                <Copy className="w-3 h-3" /> Copiar
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-zinc-400 hover:text-white glass glass-hover transition-all"
              >
                <Download className="w-3 h-3" /> Baixar
              </button>
            </>
          )}
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-zinc-400 hover:text-white glass glass-hover transition-all"
          >
            <RotateCcw className="w-3 h-3" /> Reset
          </button>
        </div>
      </header>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left sidebar */}
          <div className="lg:col-span-4 space-y-4">
            <PromptInput
              onSubmitText={handleTextSubmit}
              isGenerating={generation.isLoading}
              recorderStatus={recorder.status}
              duration={recorder.duration}
              analyserNode={recorder.analyserNode}
              isRecording={recorder.isRecording}
              transcript={recorder.transcript}
              isTranscribing={recorder.isTranscribing}
              speechSupported={recorder.speechSupported}
              onStartRecording={handleStartRecording}
              onStopRecording={handleStopAndGenerate}
            />

            {/* Status */}
            {generation.status === "generating" && (
              <div className="glass rounded-2xl p-4 flex items-center gap-3">
                <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
                <div>
                  <p className="text-sm text-zinc-300">Gerando código...</p>
                  <p className="text-xs text-zinc-600">Llama 3.3 70B via Groq (open source)</p>
                </div>
              </div>
            )}

            {generation.error && (
              <div className="glass rounded-2xl p-4 border-red-500/20">
                <p className="text-sm text-red-400">{generation.error}</p>
                <p className="text-xs text-zinc-600 mt-1">
                  Verifique se a GROQ_API_KEY está configurada no .env
                </p>
              </div>
            )}

            {generation.code && !generation.isLoading && (
              <div className="glass rounded-2xl p-4">
                <p className="text-xs text-zinc-500">
                  Digite ou grave novamente para iterar sobre o código atual.
                  Ex: &ldquo;muda o botão pra vermelho&rdquo;
                </p>
              </div>
            )}

            <GenerationHistory
              history={generation.history}
              onSelect={handleSelectHistory}
            />
          </div>

          {/* Right side - Preview */}
          <div className="lg:col-span-8">
            <div className="sticky top-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="text-xs text-zinc-600 ml-2 font-mono">preview</span>
              </div>
              <CodePreview
                code={generation.code}
                onCodeChange={generation.setCode}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
