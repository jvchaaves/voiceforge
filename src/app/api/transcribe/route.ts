import { NextResponse } from "next/server";

// Transcription is now handled client-side via Web Speech API
// This route is kept as a fallback placeholder
export async function POST() {
  return NextResponse.json(
    { error: "Transcrição é feita no navegador via Web Speech API" },
    { status: 410 }
  );
}
