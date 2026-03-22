"use client";

import { useEffect, useRef } from "react";

interface WaveformVisualizerProps {
  analyserNode: AnalyserNode | null;
  isRecording: boolean;
}

export function WaveformVisualizer({ analyserNode, isRecording }: WaveformVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    if (!analyserNode || !canvasRef.current || !isRecording) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const bufferLength = analyserNode.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);
      analyserNode.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const barCount = 48;
      const barWidth = canvas.width / barCount - 2;
      const centerY = canvas.height / 2;

      for (let i = 0; i < barCount; i++) {
        const dataIndex = Math.floor((i / barCount) * bufferLength);
        const value = dataArray[dataIndex] / 255;
        const barHeight = Math.max(2, value * centerY * 0.9);

        const gradient = ctx.createLinearGradient(0, centerY - barHeight, 0, centerY + barHeight);
        gradient.addColorStop(0, "rgba(168, 85, 247, 0.8)");
        gradient.addColorStop(0.5, "rgba(236, 72, 153, 0.9)");
        gradient.addColorStop(1, "rgba(168, 85, 247, 0.8)");

        ctx.fillStyle = gradient;
        ctx.roundRect(
          i * (barWidth + 2),
          centerY - barHeight,
          barWidth,
          barHeight * 2,
          2
        );
        ctx.fill();
      }
    };

    draw();

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [analyserNode, isRecording]);

  if (!isRecording) {
    return (
      <div className="flex items-center justify-center gap-1 h-16">
        {Array.from({ length: 48 }).map((_, i) => (
          <div
            key={i}
            className="w-1 rounded-full bg-zinc-800"
            style={{ height: `${4 + Math.sin(i * 0.5) * 3}px` }}
          />
        ))}
      </div>
    );
  }

  return (
    <canvas
      ref={canvasRef}
      width={480}
      height={64}
      className="w-full h-16"
    />
  );
}
