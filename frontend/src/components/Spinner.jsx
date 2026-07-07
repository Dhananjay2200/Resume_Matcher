/**
 * Spinner — shown while the backend is extracting text, calling the LLM,
 * and computing the match. Styled as a "scanning document" rather than a
 * generic spinner ring, to stay on-theme with the rest of the app.
 */
export default function Spinner({ label = "Scanning…" }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16" role="status" aria-live="polite">
      <div className="relative h-16 w-12 overflow-hidden rounded-sm border-2 border-ink bg-white shadow-panel">
        {/* Document lines */}
        <div className="absolute inset-0 flex flex-col justify-center gap-1.5 px-2">
          <div className="h-1 w-full rounded-full bg-ink/10" />
          <div className="h-1 w-4/5 rounded-full bg-ink/10" />
          <div className="h-1 w-full rounded-full bg-ink/10" />
          <div className="h-1 w-3/5 rounded-full bg-ink/10" />
        </div>
        {/* Moving scan line */}
        <div className="absolute inset-x-0 h-6 animate-scanline bg-gradient-to-b from-transparent via-teal/30 to-transparent" />
        <div className="absolute inset-x-0 top-1/2 h-px animate-scanline bg-teal" />
      </div>
      <p className="font-mono text-sm tracking-wide text-slate">{label}</p>
    </div>
  );
}
