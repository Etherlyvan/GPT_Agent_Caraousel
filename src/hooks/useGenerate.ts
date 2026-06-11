import { useCarouselStore } from "@/store/carouselStore";
import { Konten, Slide } from "@/lib/types";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export function useGenerateSlide() {
  const store = useCarouselStore();

  const buildPrompt = (k: Konten, s: Slide, idx: number) => {
    return `${store.basePrompt}\n\n---\nKONTEN: ${k.title}\nSLIDE ${idx + 1} dari ${k.slides.length} — ${s.label}\n\n${s.content}`;
  };

  const generateSlide = async (kontenId: number, slideId: number) => {
    const state = useCarouselStore.getState();
    if (!state.apiKey) { alert("Masukkan OpenAI API Key terlebih dahulu."); return; }

    const k = state.kontenList.find((x) => x.id === kontenId);
    if (!k) return;
    const s = k.slides.find((x) => x.id === slideId);
    if (!s) return;
    const idx = k.slides.indexOf(s);

    store.updateSlideStatus(kontenId, slideId, "generating");
    store.addLog(`[${k.title} · Slide ${idx + 1}] Mengirim ke API…`, "info");

    try {
      const res = await fetch("https://api.openai.com/v1/images/generations", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${state.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-image-1",
          prompt: buildPrompt(k, s, idx),
          n: 1,
          size: "1024x1536",
          quality: "high",
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error?.message || `HTTP ${res.status}`);

      const imgData = data.data[0];
      const imgSrc = imgData.b64_json
        ? `data:image/png;base64,${imgData.b64_json}`
        : imgData.url;

      if (!imgSrc) throw new Error("Tidak ada data gambar dalam response.");

      store.updateSlideStatus(kontenId, slideId, "done", imgSrc);
      store.addLog(`[${k.title} · Slide ${idx + 1}] ✓ Berhasil!`, "ok");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      store.updateSlideStatus(kontenId, slideId, "error", null);
      store.addLog(`[${k.title} · Slide ${idx + 1}] ✗ ${message}`, "err");
    }
  };

  return { generateSlide };
}

export function useGenerateAll() {
  const { generateSlide } = useGenerateSlide();

  const generateAll = async () => {
    const state = useCarouselStore.getState();
    if (!state.apiKey) { alert("Masukkan OpenAI API Key."); return; }
    if (state.kontenList.length === 0) return;

    state.addLog(`▸ Generate SEMUA ${state.kontenList.length} konten…`, "info");

    for (const k of state.kontenList) {
      useCarouselStore.getState().setActiveId(k.id);
      await sleep(120);
      for (let si = 0; si < k.slides.length; si++) {
        await generateSlide(k.id, k.slides[si].id);
        if (si < k.slides.length - 1) await sleep(500);
      }
      await sleep(600);
    }
    state.addLog("▸ Semua konten selesai! 🎉", "ok");
  };

  return { generateAll };
}
