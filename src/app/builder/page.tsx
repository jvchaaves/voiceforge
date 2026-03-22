"use client";

import { useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, Waves, Copy, Download, RotateCcw, Check } from "lucide-react";
import { useState } from "react";
import { useVoiceRecorder } from "@/hooks/useVoiceRecorder";
import { useCodeGeneration } from "@/hooks/useCodeGeneration";
import { PromptInput } from "@/components/PromptInput";
import { CodePreview } from "@/components/CodePreview";
import { GenerationHistory } from "@/components/GenerationHistory";
import type { GenerationHistoryItem } from "@/lib/types";

export default function BuilderPage() {
  const recorder = useVoiceRecorder();
  const generation = useCodeGeneration();
  const [copied, setCopied] = useState(false);

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
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
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
    <div className="min-h-screen bg-[#050505] noise">
      {/* Background */}
      <div className="fixed inset-0 dot-grid pointer-events-none opacity-50" />
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[10%] w-[400px] h-[400px] rounded-full bg-violet-600/[0.04] blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[300px] h-[300px] rounded-full bg-fuchsia-600/[0.03] blur-[100px]" />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-5 py-3.5 border-b border-white/[0.04] bg-[#050505]/80 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-zinc-600 hover:text-white transition-colors p-1 -ml-1">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="w-px h-4 bg-white/[0.06]" />
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
              <Waves className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm font-medium tracking-tight text-zinc-300">VoiceForge</span>
            <span className="text-[10px] font-mono text-zinc-700 bg-white/[0.03] px-2 py-0.5 rounded-md border border-white/[0.04]">builder</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {generation.code && (
            <>
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] text-zinc-500 hover:text-white bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.08] hover:bg-white/[0.04] transition-all"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                {copied ? "Copiado" : "Copiar"}
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] text-zinc-500 hover:text-white bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.08] hover:bg-white/[0.04] transition-all"
              >
                <Download className="w-3 h-3" /> .jsx
              </button>
            </>
          )}
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] text-zinc-500 hover:text-white bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.08] hover:bg-white/[0.04] transition-all"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>
      </header>

      {/* Main content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-5 py-5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left sidebar */}
          <div className="lg:col-span-4 xl:col-span-3 space-y-4">
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

            {generation.error && (
              <div className="rounded-2xl px-4 py-3 bg-red-500/[0.04] border border-red-500/[0.08]">
                <p className="text-xs text-red-400">{generation.error}</p>
                <p className="text-[10px] text-zinc-600 mt-1">
                  Verifique se a GROQ_API_KEY está no .env
                </p>
              </div>
            )}

            {generation.code && !generation.isLoading && (
              <div className="rounded-2xl px-4 py-3 bg-white/[0.02] border border-white/[0.04]">
                <p className="text-[11px] text-zinc-600 leading-relaxed">
                  Envie outra mensagem para iterar sobre o código.
                  Ex: <span className="text-zinc-400">&ldquo;muda o botão pra vermelho&rdquo;</span>
                </p>
              </div>
            )}

            <GenerationHistory
              history={generation.history}
              onSelect={handleSelectHistory}
            />
          </div>

          {/* Right side - Preview */}
          <div className="lg:col-span-8 xl:col-span-9">
            <div className="sticky top-5">
              {/* Window bar */}
              <div className="flex items-center gap-2 mb-2 px-1">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]/80" />
                </div>
                <span className="text-[10px] text-zinc-700 font-mono ml-2">preview</span>
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
