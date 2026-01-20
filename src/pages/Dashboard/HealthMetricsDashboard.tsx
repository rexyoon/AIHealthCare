import { useMemo, useState } from "react";

export type BloodMetrics = {
  // 호르몬
  testosteroneTotal: number; // ng/dL
  testosteroneFree: number; // ng/dL (기관에 따라 pg/mL일 수 있음)
  estradiolE2: number; // pg/mL
  prolactin: number; // ng/mL
  lh: number; // mIU/mL
  fsh: number; // mIU/mL
  shbg?: number; // nmol/L (기관에 따라)
  cortisol?: number; // ug/dL or nmol/L (기관에 따라)

  //갑상선
  tsh?: number; // uIU/mL (기관에 따라)
  t3?: number; // ng/dL or pg/mL (기관에 따라)
  t4?: number; // ug/dL or ng/dL (기관에 따라)

  // 장기 기능(간/신장)
  ast: number; // U/L
  alt: number; // U/L
  gammaGtp?: number; // U/L
  bun: number; // mg/dL
  creatinine: number; // mg/dL
  egfr: number; // mL/min/1.73m^2

  // 혈액 
  hemoglobin?: number; // g/dL
  hematocrit?: number; // %

  // 대사
  cholesterolTotal: number; // mg/dL
  hdl: number; // mg/dL
  ldl: number; // mg/dL
  triglycerides: number; // mg/dL

  // 전해질
  sodium: number; // mmol/L
  potassium: number; // mmol/L
  magnesium?: number; // mg/dL or mmol/L (기관에 따라)

  //랩틴
  leptin?: number; // ng/mL

  // 기타
  hba1c?: number; // %
  crp?: number; // mg/L or mg/dL (기관에 따라)

  // ✅ 엔티티에 아직 없지만(추가 예정) 화면 요구 때문에 optional로 둠
  cpk?: number | null; // U/L
};

type Range = {
  label: string;
  unit: string;
  min?: number;
  max?: number;
  higherIsBetter?: boolean;
};

type Tone = "good" | "warn" | "bad";

type MetricKey = keyof BloodMetrics;

// ⚠️ 참고치(레퍼런스)는 샘플 기본값.
// 실제 서비스에선 검사기관/성별/나이/상태(운동 직후 등)에 맞게 조정/서버에서 내려주는 게 베스트.
const RANGES: Record<MetricKey, Range> = {
  // Hormones
  testosteroneTotal: { label: "Testosterone Total", unit: "ng/dL", min: 300, max: 1000 },
  testosteroneFree: { label: "Testosterone Free", unit: "ng/dL", min: 5, max: 25 },
  estradiolE2: { label: "E2 (Estradiol)", unit: "pg/mL", min: 10, max: 40 },
  prolactin: { label: "Prolactin", unit: "ng/mL", min: 4, max: 15 },
  lh: { label: "LH", unit: "mIU/mL", min: 1.2, max: 8.6 },
  fsh: { label: "FSH", unit: "mIU/mL", min: 1.5, max: 12.4 },
  shbg: { label: "SHBG", unit: "nmol/L", min: 10, max: 57 },
  cortisol: { label: "Cortisol", unit: "ug/dL", min: 6, max: 23 },

  // Thyroid
  tsh: { label: "TSH", unit: "uIU/mL", min: 0.4, max: 4.0 },
  t3: { label: "T3", unit: "ng/dL", min: 80, max: 200 },
  t4: { label: "T4", unit: "ug/dL", min: 4.5, max: 11.5 },

  // Organ (Liver/Kidney)
  ast: { label: "AST", unit: "U/L", min: 0, max: 40 },
  alt: { label: "ALT", unit: "U/L", min: 0, max: 40 },
  gammaGtp: { label: "GGT(γ-GTP)", unit: "U/L", min: 0, max: 60 },
  bun: { label: "BUN", unit: "mg/dL", min: 7, max: 20 },
  creatinine: { label: "Creatinine", unit: "mg/dL", min: 0.7, max: 1.3 },
  egfr: { label: "eGFR", unit: "", min: 90, max: 130, higherIsBetter: true },

  // Blood count-like
  hemoglobin: { label: "Hemoglobin", unit: "g/dL", min: 13.0, max: 17.5 },
  hematocrit: { label: "Hematocrit", unit: "%", min: 40, max: 52 },

  // Metabolic
  cholesterolTotal: { label: "Cholesterol Total", unit: "mg/dL", min: 0, max: 200 },
  hdl: { label: "HDL", unit: "mg/dL", min: 40, max: 100, higherIsBetter: true },
  ldl: { label: "LDL", unit: "mg/dL", min: 0, max: 100 },
  triglycerides: { label: "Triglycerides", unit: "mg/dL", min: 0, max: 150 },

  // Electrolytes
  sodium: { label: "Sodium", unit: "mmol/L", min: 135, max: 145 },
  potassium: { label: "Potassium", unit: "mmol/L", min: 3.5, max: 5.1 },
  magnesium: { label: "Magnesium", unit: "mg/dL", min: 1.7, max: 2.2 },

  // Leptin
  leptin: { label: "Leptin", unit: "ng/mL", min: 0, max: 20 },

  // Others
  hba1c: { label: "HbA1c", unit: "%", min: 0, max: 5.7 },
  crp: { label: "CRP", unit: "mg/L", min: 0, max: 3 },

  // Extra
  cpk: { label: "CPK(CK)", unit: "U/L", min: 0, max: 200 },
};

const GROUPS: { title: string; keys: MetricKey[] }[] = [
  {
    title: "호르몬",
    keys: [
      "testosteroneTotal",
      "testosteroneFree",
      "estradiolE2",
      "prolactin",
      "lh",
      "fsh",
      "shbg",
      "cortisol",
      "tsh",
      "t3",
      "t4",
      "leptin",
    ],
  },
  {
    title: "간 / 신장",
    keys: ["ast", "alt", "gammaGtp", "bun", "creatinine", "egfr", "hemoglobin", "hematocrit", "crp"],
  },
  {
    title: "전해질",
    keys: ["sodium", "potassium", "magnesium", "cpk"],
  },
];

// 추후 백 연동 후 DB에서 가져올 예정
const SAMPLE: BloodMetrics = {
  testosteroneTotal: 720,
  testosteroneFree: 18,
  estradiolE2: 28,
  prolactin: 9,
  lh: 4.2,
  fsh: 5.1,
  shbg: 32,
  cortisol: 14,

  tsh: 1.8,
  t3: 120,
  t4: 7.8,

  ast: 29,
  alt: 33,
  gammaGtp: 18,
  bun: 14,
  creatinine: 1.05,
  egfr: 102,

  hemoglobin: 15.6,
  hematocrit: 46,

  cholesterolTotal: 178,
  hdl: 52,
  ldl: 92,
  triglycerides: 110,

  sodium: 140,
  potassium: 4.3,
  magnesium: 2.0,

  leptin: 5.6,
  hba1c: 5.2,
  crp: 0.6,

  cpk: null,
};

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function statusOf(value: number, r: Range) {
  const min = r.min ?? 0;
  const max = r.max ?? value;

  if (r.higherIsBetter) {
    if (value >= min) return { tag: "Good", tone: "good" as Tone };
    return { tag: "Low", tone: "warn" as Tone };
  }

  if (value < min) return { tag: "Low", tone: "warn" as Tone };
  if (value > max) return { tag: "High", tone: "bad" as Tone };
  return { tag: "Normal", tone: "good" as Tone };
}

function toneText(t: Tone) {
  if (t === "good") return "text-[#CCFF00]";
  if (t === "warn") return "text-amber-300";
  return "text-rose-400";
}

function toneBar(t: Tone) {
  if (t === "good") return "bg-[#CCFF00]";
  if (t === "warn") return "bg-amber-300";
  return "bg-rose-400";
}

type Row = {
  key: MetricKey;
  label: string;
  unit: string;
  value: number | "N/A";
  min: number;
  max: number;
  percent: number;
  status: { tag: string; tone: Tone };
};

function Section({ title, items }: { title: string; items: Row[] }) {
  return (
    <section className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-zinc-200">{title}</h2>
        <span className="text-[10px] text-zinc-500">ref-based</span>
      </div>

      <div className="flex flex-col gap-4">
        {items.map((it) => (
          <div key={String(it.key)} className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <div className="text-xs text-zinc-300">{it.label}</div>

              <div className="text-xs">
                <span className={"font-mono " + toneText(it.status.tone)}>
                  {it.value === "N/A" ? "N/A" : it.value}
                </span>
                {it.unit ? <span className="text-zinc-500 ml-1">{it.unit}</span> : null}
                <span className={"ml-2 text-[10px] " + toneText(it.status.tone)}>
                  {it.status.tag}
                </span>
              </div>
            </div>

            <div className="h-2.5 rounded-full bg-zinc-900 border border-zinc-800 overflow-hidden">
              <div className={"h-full " + toneBar(it.status.tone)} style={{ width: `${it.percent}%` }} />
            </div>

            <div className="flex justify-between text-[10px] text-zinc-500">
              <span>{it.min}</span>
              <span>{it.max}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function HealthMetricsDashboard() {
  // ✅ 실제 연결: 백엔드 응답을 여기 setMetrics로 넣으면 끝
  const [metrics] = useState<BloodMetrics>(SAMPLE);

  // 모든 Row 생성
  const rows: Row[] = useMemo(() => {
    return (Object.keys(RANGES) as MetricKey[]).map((k) => {
      const r = RANGES[k];
      const raw = metrics[k];

      const isNA = raw === undefined || raw === null || Number.isNaN(raw as any);
      const v = isNA ? 0 : (raw as number);

      const min = r.min ?? 0;
      const max = r.max ?? (min + 1);
      const percent = isNA ? 0 : ((clamp(v, min, max) - min) / (max - min)) * 100;

      const st = isNA ? { tag: "N/A", tone: "warn" as Tone } : statusOf(v, r);

      return {
        key: k,
        label: r.label,
        unit: r.unit,
        value: isNA ? "N/A" : v,
        min,
        max,
        percent,
        status: st,
      };
    });
  }, [metrics]);

  // 그룹별 필터링
  const grouped = useMemo(() => {
    const map = new Map<MetricKey, Row>();
    rows.forEach((r) => map.set(r.key, r));

    return GROUPS.map((g) => ({
      title: g.title,
      items: g.keys.map((k) => map.get(k)).filter(Boolean) as Row[],
    }));
  }, [rows]);

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <div className="mx-auto w-full max-w-md px-5 py-6 pb-24 flex flex-col gap-6">
        {/* Title */}
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-xl font-extrabold tracking-tight">Health Metrics</h1>
            <p className="text-xs text-zinc-400 mt-1">
              피검사 수치를 확인하세요
            </p>
          </div>
          <span className="text-[10px] px-2 py-1 rounded-full bg-zinc-900 text-zinc-400 border border-zinc-800">
            Latest
          </span>
        </div>

        {/* 섹션 3개 */}
        <Section title={grouped[0].title} items={grouped[0].items} />
        <Section title={grouped[1].title} items={grouped[1].items} />
        <Section title={grouped[2].title} items={grouped[2].items} />

        {/* 마지막: 종합(All) */}
        <section className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-zinc-200">종합 (All Metrics)</h2>
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
                    <td className={"px-3 py-2 text-right text-[10px] " + toneText(r.status.tone)}>
                      {r.status.tag}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-3 text-[11px] text-zinc-500 leading-relaxed">
            * 참고치(Range)는 샘플입니다. 실제 서비스에선 검사기관/성별/나이/운동 직후 여부에 따라 Range를 조정하세요.
            CPK(CK)는 백엔드 엔티티에 필드 추가 시 완전 연동됩니다.
          </p>
        </section>
      </div>
    </div>
  );
}
