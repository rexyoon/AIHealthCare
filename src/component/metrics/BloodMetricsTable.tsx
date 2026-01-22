import { useMemo } from "react";
import type { BloodMetrics, Row, MetricKey, Tone } from "./BloodMetrics.types";
import { RANGES, clamp, statusOf } from "./BloodMetrics.config";

type Props = {
  metrics: BloodMetrics;
};

export default function BloodMetricsTable({ metrics }: Props) {
  const rows: Row[] = useMemo(() => {
    return (Object.keys(RANGES) as MetricKey[]).map((k) => {
      const r = RANGES[k];
      const raw = metrics[k];

      const isNA = raw === null || raw === undefined || Number.isNaN(raw);
      const v = isNA ? 0 : raw;

      const min = r.min ?? 0;
      const max = r.max ?? min + 1;

      const percent = isNA
        ? 0
        : ((clamp(v, min, max) - min) / (max - min)) * 100;

      const status = isNA
        ? { tag: "N/A", tone: "warn" as Tone }
        : statusOf(v, r);

      return {
        key: k,
        label: r.label,
        unit: r.unit,
        value: isNA ? "N/A" : v,
        min,
        max,
        percent,
        status,
      };
    });
  }, [metrics]);

  return (
    <div className="space-y-3">
      {rows.map((row) => (
        <div key={row.key} className="p-3 border rounded">
          <div className="flex justify-between">
            <span>{row.label}</span>
            <span>
              {row.value} {row.unit}
            </span>
          </div>
          <div className="text-sm opacity-70">
            {row.status.tag}
          </div>
        </div>
      ))}
    </div>
  );
}
