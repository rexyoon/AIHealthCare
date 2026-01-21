import { useMemo } from "react";
type Props = {
  value: number;          // 0~100
  size?: number;          // px
  strokeWidth?: number;   // px
  labelTop?: string;      // "75%"
  labelBottom?: string;   // "HEALTHY"
};

export default function DonutGauge({
  value,
  size = 120,
  strokeWidth = 10,
  labelTop,
  labelBottom,
}: Props) {
  const v = Math.max(0, Math.min(100, value));
  const r = (size / 2) - strokeWidth - 4;
  const c = 2 * Math.PI * r;

  const dash = useMemo(() => {
    const filled = (v / 100) * c;
    const empty = c - filled;
    return `${filled} ${empty}`;
  }, [v, c]);

  const top = labelTop ?? `${v}%`;
  const bottom = labelBottom ?? (v >= 80 ? "HEALTHY" : v >= 60 ? "OK" : v >= 40 ? "WARNING" : "RISK");

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="rgb(190, 242, 100)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={dash}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ filter: "drop-shadow(0px 0px 8px rgba(190,242,100,0.35))" }}
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-2xl font-bold text-white">{top}</div>
        <div className="text-[11px] tracking-[0.25em] text-white/60">{bottom}</div>
      </div>
    </div>
  );
}
