type Tone = "good" | "warn" | "bad" | "muted";
type Row = {
  label: string;
  value: string;
  tone?: Tone;
};

type Props = {
  title?: string;
  period?: string; // "Weekly"
  score: number; // 0~100
  bars?: number[]; // 0~100
  rows: Row[];
  onClick?: () => void;
};

function toneClass(tone: Tone | undefined) {
  switch (tone) {
    case "good":
      return "text-lime-300";
    case "warn":
      return "text-yellow-300";
    case "bad":
      return "text-red-300";
    default:
      return "text-white/70";
  }
}

function scoreLabel(score: number) {
  if (score >= 80) return "HEALTHY";
  if (score >= 60) return "OK";
  if (score >= 40) return "WARNING";
  return "RISK";
}

export default function HistoryMetricsCard({
  title = "Recent Analysis",
  period = "Weekly",
  score,
  bars = [25, 40, 55, 80],
  rows,
  onClick,
}: Props) {
  const clamped = Math.max(0, Math.min(100, score));
  const pct = `${clamped}%`;

  // Donut (SVG) 계산
  const r = 46;
  const c = 2 * Math.PI * r;
  const dash = useMemo(() => {
    const filled = (clamped / 100) * c;
    const empty = c - filled;
    return `${filled} ${empty}`;
  }, [clamped, c]);

  const isClickable = typeof onClick === "function";

  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "w-full text-left",
        "rounded-3xl border border-white/10",
        "bg-gradient-to-b from-[#151515] to-[#0f0f0f]",
        "p-5 shadow-[0_10px_30px_rgba(0,0,0,0.45)]",
        "transition",
        isClickable ? "hover:bg-white/5 hover:border-white/20 active:scale-[0.99]" : "",
      ].join(" ")}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="text-xl font-semibold text-white">{title}</div>
        <div className="rounded-full bg-white/10 px-4 py-2 text-sm text-white/80">
          {period}
        </div>
      </div>

      {/* Main content */}
      <div className="mt-5 flex items-center justify-between gap-4">
        {/* Donut */}
        <div className="relative h-[120px] w-[120px] shrink-0">
          <svg viewBox="0 0 120 120" className="h-full w-full">
            {/* track */}
            <circle
              cx="60"
              cy="60"
              r={r}
              fill="none"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="10"
            />
            {/* progress */}
            <circle
              cx="60"
              cy="60"
              r={r}
              fill="none"
              stroke="rgb(190, 242, 100)" // lime-300 느낌
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={dash}
              transform="rotate(-90 60 60)"
              style={{
                filter: "drop-shadow(0px 0px 8px rgba(190,242,100,0.35))",
              }}
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-2xl font-bold text-white">{pct}</div>
            <div className="text-[11px] tracking-[0.25em] text-white/60">
              {scoreLabel(clamped)}
            </div>
          </div>
        </div>

        {/* Bars */}
        <div className="flex h-[110px] flex-1 items-end justify-end gap-3 pr-1">
          {bars.slice(0, 4).map((v, i) => {
            const h = Math.max(12, Math.min(100, v));
            const isLast = i === Math.min(3, bars.length - 1);
            return (
              <div
                key={i}
                className={[
                  "w-3 rounded-full",
                  isLast ? "bg-lime-300" : "bg-white/18",
                ].join(" ")}
                style={{
                  height: `${h}px`,
                  boxShadow: isLast ? "0 0 14px rgba(190,242,100,0.35)" : "none",
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Rows */}
      <div className="mt-5">
        {rows.map((r, idx) => (
          <div
            key={idx}
            className={[
              "flex items-center justify-between py-3",
              idx === 0 ? "border-b border-white/10" : "",
            ].join(" ")}
          >
            <div className="text-white/70">{r.label}</div>

            <div className="flex items-center gap-3">
              <div className={["font-semibold", toneClass(r.tone)].join(" ")}>
                {r.value}
              </div>
              <div
                className={[
                  "h-3 w-3 rounded-full",
                  r.tone === "good"
                    ? "bg-lime-300"
                    : r.tone === "warn"
                    ? "bg-yellow-300"
                    : r.tone === "bad"
                    ? "bg-red-300"
                    : "bg-white/25",
                ].join(" ")}
                style={{
                  boxShadow:
                    r.tone === "good"
                      ? "0 0 10px rgba(190,242,100,0.45)"
                      : "none",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </button>
  );
}
