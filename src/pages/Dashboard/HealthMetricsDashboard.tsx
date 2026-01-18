import React, { useMemo, useState } from "react";

type Metrics = {
  testosterone: number; // ng/dL
  freeTestosterone: number; // ng/dL
  estradiol: number; // pg/mL
  prolactin: number; // ng/mL
  lh: number; // mIU/mL
  fsh: number; // mIU/mL

  ast: number; // IU/L
  alt: number; // IU/L
  creatinine: number; // mg/dL
  egfr: number; // (unitless)
  bun: number; // mg/dL

  cholesterol: number; // mg/dL
  ldl: number; // mg/dL
  hdl: number; // mg/dL
  triglycerides: number; // mg/dL

  sodium: number; // mmol/L
  potassium: number; // mmol/L
  cpk?: number | null; // optional
};

type Range = {
  label: string;
  unit: string;
  min?: number;
  max?: number;
  // “높을수록 좋은” 같은 특수 케이스 표시용
  higherIsBetter?: boolean;
};

// ⚠️ 기준치는 “일반 성인 참고치”의 대표값으로 잡아둔 샘플이다.
// 앱 목적(보디빌딩/퍼포먼스)이나 검사기관 레퍼런스에 따라 반드시 조정해라.
const RANGES: Record<keyof Metrics, Range> = {
  testosterone: { label: "Testosterone Total", unit: "ng/dL", min: 300, max: 1000 },
  freeTestosterone: { label: "Testosterone Free", unit: "ng/dL", min: 5, max: 25 },
  estradiol: { label: "E2 (Estradiol)", unit: "pg/mL", min: 10, max: 40 },
  prolactin: { label: "Prolactin", unit: "ng/mL", min: 4, max: 15 },
  lh: { label: "LH", unit: "mIU/mL", min: 1.2, max: 8.6 },
  fsh: { label: "FSH", unit: "mIU/mL", min: 1.5, max: 12.4 },

  ast: { label: "AST", unit: "IU/L", min: 0, max: 40 },
  alt: { label: "ALT", unit: "IU/L", min: 0, max: 40 },
  creatinine: { label: "Creatinine", unit: "mg/dL", min: 0.7, max: 1.3 },
  egfr: { label: "eGFR", unit: "", min: 90, max: 130, higherIsBetter: true },
  bun: { label: "BUN", unit: "mg/dL", min: 7, max: 20 },

  cholesterol: { label: "Cholesterol Total", unit: "mg/dL", min: 0, max: 200 },
  ldl: { label: "LDL", unit: "mg/dL", min: 0, max: 100 },
  hdl: { label: "HDL", unit: "mg/dL", min: 40, max: 100, higherIsBetter: true },
  triglycerides: { label: "Triglycerides", unit: "mg/dL", min: 0, max: 150 },

  sodium: { label: "Sodium", unit: "mmol/L", min: 135, max: 145 },
  potassium: { label: "Potassium", unit: "mmol/L", min: 3.5, max: 5.1 },
  cpk: { label: "CPK(CK)", unit: "U/L", min: 0, max: 200 },
};

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function statusOf(value: number, r: Range) {
  const min = r.min ?? 0;
  const max = r.max ?? value;

  if (r.higherIsBetter) {
    if (value >= min) return { tag: "Good", tone: "good" as const };
    return { tag: "Low", tone: "warn" as const };
  }

  if (value < min) return { tag: "Low", tone: "warn" as const };
  if (value > max) return { tag: "High", tone: "bad" as const };
  return { tag: "Normal", tone: "good" as const };
}

function toneClass(tone: "good" | "warn" | "bad") {
  if (tone === "good") return "text-[#CCFF00]";
  if (tone === "warn") return "text-amber-300";
  return "text-rose-400";
}

function barToneClass(tone: "good" | "warn" | "bad") {
  if (tone === "good") return "bg-[#CCFF00]";
  if (tone === "warn") return "bg-amber-300";
  return "bg-rose-400";
}

type MetricKey = keyof Metrics;

const GROUPS: { title: string; keys: MetricKey[] }[] = [
  { title: "Hormones", keys: ["testosterone", "freeTestosterone", "estradiol", "prolactin", "lh", "fsh"] },
  { title: "Liver / Kidney", keys: ["ast", "alt", "creatinine", "egfr", "bun"] },
  { title: "Lipids", keys: ["cholesterol", "ldl", "hdl", "triglycerides"] },
  { title: "Electrolytes / Muscle", keys: ["sodium", "potassium", "cpk"] },
];

const SAMPLE: Metrics = {
  testosterone: 720,
  freeTestosterone: 18,
  estradiol: 28,
  prolactin: 9,
  lh: 4.2,
  fsh: 5.1,
  ast: 29,
  alt: 33,
  creatinine: 1.05,
  egfr: 102,
  bun: 14,
  cholesterol: 178,
  ldl: 92,
  hdl: 52,
  triglycerides: 110,
  sodium: 140,
  potassium: 4.3,
  cpk: 240, // 샘플: 운동 후 높을 수 있음
};

export default function HealthMetricsDashboard() {
  // ✅ 실제 앱에선: 입력 폼/백엔드 응답을 여기 setMetrics로 넣으면 됨
  const [metrics] = useState<Metrics>(SAMPLE);

  const rows = useMemo(() => {
    return (Object.keys(RANGES) as MetricKey[]).map((k) => {
      const r = RANGES[k];
      const vRaw = metrics[k];

      // cpk가 undefined/null이면 표시만 N/A
      const isNA = vRaw === undefined || vRaw === null || Number.isNaN(vRaw as any);
      const v = isNA ? 0 : (vRaw as number);

      const min = r.min ?? 0;
      const max = r.max ?? (min + 1);
      const pos = isNA ? 0 : ((clamp(v, min, max) - min) / (max - min)) * 100;

      const st = isNA ? { tag: "N/A", tone: "warn" as const } : statusOf(v, r);

      return {
        key: k,
        label: r.label,
        unit: r.unit,
        value: isNA ? "N/A" : v,
        min,
        max,
        percent: pos,
        status: st,
      };
    });
  }, [metrics]);

  const grouped = useMemo(() => {
    const map = new Map<MetricKey, (typeof rows)[number]>();
    rows.forEach((r) => map.set(r.key, r));

    return GROUPS.map((g) => ({
      title: g.title,
      items: g.keys.map((k) => map.get(k)!).filter(Boolean),
    }));
  }, [rows]);

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <div className="mx-auto w-full max-w-md px-5 py-6 pb-24 flex flex-col gap-6">
        {/* Title */}
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-xl font-extrabold tracking-tight">Health Metrics</h1>
            <p className="text-xs text-zinc-400 mt-1">Your latest lab inputs visualized</p>
          </div>
          <span className="text-[10px] px-2 py-1 rounded-full bg-zinc-900 text-zinc-400 border border-zinc-800">
            Updated
          </span>
        </div>

        {/* Summary Cards */}
        <section className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
            <div className="text-[10px] text-zinc-400">Testosterone</div>
            <div className="mt-2 text-lg font-bold">
              {metrics.testosterone} <span className="text-xs text-zinc-400">ng/dL</span>
            </div>
            <div className="mt-1 text-xs text-zinc-400">
              Free: <span className="text-white">{metrics.freeTestosterone}</span>
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
            <div className="text-[10px] text-zinc-400">Liver</div>
            <div className="mt-2 text-lg font-bold">
              AST {metrics.ast} / ALT {metrics.alt}
            </div>
            <div className="mt-1 text-xs text-zinc-400">IU/L</div>
          </div>
        </section>

        {/* Group Charts */}
        {grouped.map((g) => (
          <section key={g.title} className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-zinc-200">{g.title}</h2>
              <span className="text-[10px] text-zinc-500">ref-based</span>
            </div>

            <div className="flex flex-col gap-4">
              {g.items.map((it) => (
                <div key={String(it.key)} className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-zinc-300">{it.label}</div>
                    <div className="text-xs">
                      <span className={"font-mono " + toneClass(it.status.tone)}>
                        {it.value === "N/A" ? "N/A" : it.value}
                      </span>
                      {it.unit ? <span className="text-zinc-500 ml-1">{it.unit}</span> : null}
                      <span className={"ml-2 text-[10px] " + toneClass(it.status.tone)}>
                        {it.status.tag}
                      </span>
                    </div>
                  </div>

                  {/* bar */}
                  <div className="h-2.5 rounded-full bg-zinc-900 border border-zinc-800 overflow-hidden">
                    <div
                      className={"h-full " + barToneClass(it.status.tone)}
                      style={{ width: `${it.percent}%` }}
                    />
                  </div>

                  {/* range hint */}
                  <div className="flex justify-between text-[10px] text-zinc-500">
                    <span>{it.min}</span>
                    <span>{it.max}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* Table */}
        <section className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-zinc-200">All Metrics (Table)</h2>
            <span className="text-[10px] text-zinc-500">value / ref</span>
          </div>

          <div className="overflow-hidden rounded-2xl border border-zinc-800">
            <table className="w-full text-xs">
              <thead className="bg-zinc-900/60 text-zinc-400">
                <tr>
                  <th className="text-left px-3 py-2 font-medium">Metric</th>
                  <th className="text-right px-3 py-2 font-medium">Value</th>
                  <th className="text-right px-3 py-2 font-medium">Ref</th>
                  <th className="text-right px-3 py-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={String(r.key)} className="border-t border-zinc-800">
                    <td className="px-3 py-2 text-zinc-200">{r.label}</td>
                    <td className="px-3 py-2 text-right font-mono">
                      {r.value === "N/A" ? "N/A" : r.value}{" "}
                      <span className="text-zinc-500">{r.unit}</span>
                    </td>
                    <td className="px-3 py-2 text-right text-zinc-500 font-mono">
                      {r.min}–{r.max}
                    </td>
                    <td className={"px-3 py-2 text-right text-[10px] " + toneClass(r.status.tone)}>
                      {r.status.tag}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-3 text-[11px] text-zinc-500 leading-relaxed">
            * Reference ranges are sample defaults. In production, set ranges per lab/sex/age and surface
            context (training, fasted state, meds, etc.).
          </p>
        </section>
      </div>
    </div>
  );
}
