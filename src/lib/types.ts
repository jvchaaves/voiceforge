export type RecorderStatus = "idle" | "recording" | "processing";

export type GenerationStatus =
  | "idle"
  | "transcribing"
  | "generating"
  | "done"
  | "error";

export interface TranscriptionResult {
  text: string;
  duration: number;
}

export interface GenerationResult {
  code: string;
  prompt: string;
  timestamp: number;
}

export interface GenerationHistoryItem {
  id: string;
  transcript: string;
  code: string;
  timestamp: number;
}

export interface VoiceRecorderState {
  status: RecorderStatus;
  audioBlob: Blob | null;
  audioUrl: string | null;
  duration: number;
  analyserNode: AnalyserNode | null;
}
