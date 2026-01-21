import DonutGauge from "../charts/DonutGauge";
import MiniBarChart from "../charts/MiniBarChart";
import MetricRow from "../metrics/MetricRow";
import type { Tone } from "../metrics/MetricRow";


type Row = { label: string; value: string; tone?: Tone };

type Props = {
  title?: string;
  period?: string;
  score: number;
  bars: number[];
  rows: Row[];
  onClick?: () => void;
};

export default function MetricsCard({
  title = "Recent Analysis",
  period = "Weekly",
  score,
  bars,
  rows,
  onClick,
}: Props) {
  const clickable = !!onClick;

  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "w-full text-left rounded-3xl p-5",
        "border border-white/10",
        "bg-gradient-to-b from-[#151515] to-[#0f0f0f]",
        "shadow-[0_10px_30px_rgba(0,0,0,0.45)] transition",
        clickable ? "hover:border-white/20 hover:bg-white/5 active:scale-[0.99]" : "",
      ].join(" ")}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="text-xl font-semibold text-white">{title}</div>
        <div className="rounded-full bg-white/10 px-4 py-2 text-sm text-white/80">
          {period}
        </div>
      </div>

      {/* Body */}
      <div className="mt-5 flex items-center justify-between gap-4">
        <DonutGauge value={score} />
        <MiniBarChart values={bars} />
      </div>

      {/* Rows */}
      <div className="mt-5">
        {rows.map((r, idx) => (
          <MetricRow
            key={`${r.label}-${idx}`}
            label={r.label}
            value={r.value}
            tone={r.tone}
            divider={idx === 0}
          />
        ))}
      </div>
    </button>
  );
}
