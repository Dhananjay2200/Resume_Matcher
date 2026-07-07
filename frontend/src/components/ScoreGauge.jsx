/**
 * ScoreGauge — the signature visual of the results dashboard.
 * A radial "scan readout" rather than a plain gradient donut: tick marks
 * around the rim like a dial, a progress arc, and a monospace number in
 * the center, echoing the ATS/scanning theme of the whole app.
 */
export default function ScoreGauge({ score = 0, label = "MATCH INDEX" }) {
  const clamped = Math.max(0, Math.min(100, score));
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - clamped / 100);

  // Color coding is functional (signals score quality), not decorative.
  const tone =
    clamped >= 75 ? "#1F7A6C" : clamped >= 50 ? "#D9A441" : "#C4432B";

  // 40 tick marks around the rim, at radius 92 -> 98
  const ticks = Array.from({ length: 40 }, (_, i) => {
    const angle = (i / 40) * 2 * Math.PI - Math.PI / 2;
    const major = i % 5 === 0;
    const rOuter = 98;
    const rInner = major ? 90 : 94;
    const x1 = 100 + rInner * Math.cos(angle);
    const y1 = 100 + rInner * Math.sin(angle);
    const x2 = 100 + rOuter * Math.cos(angle);
    const y2 = 100 + rOuter * Math.sin(angle);
    return { x1, y1, x2, y2, major };
  });

  return (
    <div className="relative mx-auto h-56 w-56 sm:h-64 sm:w-64">
      <svg viewBox="0 0 200 200" className="h-full w-full -rotate-0">
        {/* Tick rim */}
        {ticks.map((t, i) => (
          <line
            key={i}
            x1={t.x1}
            y1={t.y1}
            x2={t.x2}
            y2={t.y2}
            stroke={t.major ? "#12171F" : "#12171F"}
            strokeOpacity={t.major ? 0.35 : 0.15}
            strokeWidth={t.major ? 2 : 1}
            strokeLinecap="round"
          />
        ))}

        {/* Track */}
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke="#12171F"
          strokeOpacity="0.08"
          strokeWidth="10"
        />

        {/* Progress arc */}
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke={tone}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 100 100)"
          style={{ transition: "stroke-dashoffset 1s ease-out" }}
        />
      </svg>

      {/* Center readout */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-mono text-4xl font-semibold text-ink sm:text-5xl">
          {Math.round(clamped)}
          <span className="text-lg text-slate sm:text-xl">%</span>
        </span>
        <span className="mt-1 font-mono text-[10px] font-medium tracking-[0.2em] text-slate sm:text-xs">
          {label}
        </span>
      </div>
    </div>
  );
}
