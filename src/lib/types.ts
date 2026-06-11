export type SlideStatus = "idle" | "generating" | "done" | "error";

export interface Slide {
  id: number;
  label: string;
  content: string;
  imgSrc: string | null;
  status: SlideStatus;
}

export interface Konten {
  id: number;
  title: string;
  slides: Slide[];
}

export interface LogEntry {
  message: string;
  type: "info" | "ok" | "err";
}