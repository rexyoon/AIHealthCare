import type { MetricKey, Tone } from "./BloodMetrics.types";

type RangeSpec = {
  label: string;
  unit?: string;
  min?: number;
  max?: number;
};

export const RANGES: Record<MetricKey, RangeSpec> = {
  testosteroneTotal: {
    label: "Total Testosterone",
    unit: "ng/dL",
    min: 300,
    max: 1000,
  },
  estradiol: {
    label: "Estradiol (E2)",
    unit: "pg/mL",
    min: 10,
    max: 40,
  },
  ast: {
    label: "AST",
    unit: "U/L",
    min: 0,
    max: 40,
  },
  alt: {
    label: "ALT",
    unit: "U/L",
    min: 0,
    max: 40,
  },
};

export function clamp(v: number, min: number, max: number) {
  return Math.min(Math.max(v, min), max);
}

export function statusOf(v: number, r: RangeSpec) {
  if (v < (r.min ?? -Infinity) || v > (r.max ?? Infinity)) {
    return { tag: "Out", tone: "bad" as Tone };
  }
  return { tag: "OK", tone: "good" as Tone };
}
