"use client";

import { useState, useCallback, useRef } from "react";
import type { GenerationStatus, GenerationHistoryItem } from "@/lib/types";

export function useCodeGeneration() {
  const [status, setStatus] = useState<GenerationStatus>("idle");
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<GenerationHistoryItem[]>([]);
  const abortRef = useRef<AbortController | null>(null);

  const generate = useCallback(
    async (transcript: string, existingCode?: string) => {
      if (!transcript.trim()) {
        setError("Nenhuma transcrição detectada. Tente falar mais alto.");
        setStatus("error");
        return;
      }

      try {
        setError(null);
        setStatus("generating");

        // Abort previous request if any
        if (abortRef.current) {
          abortRef.current.abort();
        }
        abortRef.current = new AbortController();

        const generateRes = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            prompt: transcript,
            existingCode: existingCode || undefined,
          }),
          signal: abortRef.current.signal,
        });

        if (!generateRes.ok) {
          throw new Error("Falha na geração de código");
        }

        // Read the stream
        const reader = generateRes.body?.getReader();
        if (!reader) throw new Error("No response stream");

        const decoder = new TextDecoder();
        let fullCode = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          fullCode += chunk;
          const cleaned = cleanCodeOutput(fullCode);
          setCode(cleaned);
        }

        const finalCode = cleanCodeOutput(fullCode);
        setCode(finalCode);
        setStatus("done");

        // Save to history
        const historyItem: GenerationHistoryItem = {
          id: crypto.randomUUID(),
          transcript,
          code: finalCode,
          timestamp: Date.now(),
        };
        setHistory((prev) => [historyItem, ...prev]);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return;
        setError(err instanceof Error ? err.message : "Erro desconhecido");
        setStatus("error");
      }
    },
    []
  );

  const reset = useCallback(() => {
    setStatus("idle");
    setCode("");
    setError(null);
    if (abortRef.current) {
      abortRef.current.abort();
    }
  }, []);

  return {
    status,
    code,
    error,
    history,
    generate,
    reset,
    setCode,
    isLoading: status === "generating",
  };
}

function cleanCodeOutput(raw: string): string {
  let cleaned = raw.trim();
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```[\w]*\n?/, "").replace(/\n?```$/, "");
  }
  return cleaned.trim();
}
