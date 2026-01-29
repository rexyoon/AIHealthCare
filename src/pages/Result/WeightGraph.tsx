import { useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type WeightEntry = {
  date: string; // "1/25" 같은 표시용
  iso: string; // "2026-01-25" 정렬/중복 체크용
  weight: number;
};

function formatKoreanMD(d: Date) {
  const m = d.getMonth() + 1;
  const day = d.getDate();
  return `${m}/${day}`;
}

function formatISO(d: Date) {
  // local date -> YYYY-MM-DD
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function round1(n: number) {
  return Math.round(n * 10) / 10;
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function WeightGraph() {
  // ✅ 더미 데이터 (스크린샷 흐름 비슷하게)
  const [entries, setEntries] = useState<WeightEntry[]>([
    { iso: "2026-01-25", date: "1/25", weight: 70.0 },
    { iso: "2026-01-26", date: "1/26", weight: 69.5 },
    { iso: "2026-01-27", date: "1/27", weight: 69.8 },
    { iso: "2026-01-28", date: "1/28", weight: 69.1 },
    { iso: "2026-01-29", date: "1/29", weight: 68.9 },
  ]);

  const [input, setInput] = useState<string>("");

  const sorted = useMemo(() => {
    return [...entries].sort((a, b) => a.iso.localeCompare(b.iso));
  }, [entries]);

  const stats = useMemo(() => {
    if (sorted.length === 0) {
      return { latest: null as number | null, max: null as number | null, min: null as number | null };
    }
    const latest = sorted[sorted.length - 1].weight;
    let max = sorted[0].weight;
    let min = sorted[0].weight;
    for (const e of sorted) {
      if (e.weight > max) max = e.weight;
      if (e.weight < min) min = e.weight;
    }
    return { latest, max, min };
  }, [sorted]);

  const yDomain = useMemo(() => {
    if (sorted.length === 0) return [0, 1] as [number, number];
    const ys = sorted.map((e) => e.weight);
    const min = Math.min(...ys);
    const max = Math.max(...ys);
    // 보기 좋게 약간 여유
    const pad = Math.max(0.6, (max - min) * 0.35);
    const lo = round1(min - pad);
    const hi = round1(max + pad);
    // 값이 거의 동일할 때도 그래프가 납작하게 안 보이게
    if (hi - lo < 1.5) return [lo - 0.8, hi + 0.8];
    return [lo, hi];
  }, [sorted]);

  const onAdd = () => {
    const raw = input.trim().replace(",", ".");
    const value = Number(raw);

    // 입력 검증
    if (!raw || Number.isNaN(value)) return;
    const weight = round1(clamp(value, 20, 300));

    const now = new Date();
    const iso = formatISO(now);
    const date = formatKoreanMD(now);

    // 같은 날짜가 이미 있으면 "덮어쓰기" (실사용에서도 이게 편함)
    setEntries((prev) => {
      const existsIdx = prev.findIndex((p) => p.iso === iso);
      if (existsIdx >= 0) {
        const next = [...prev];
        next[existsIdx] = { ...next[existsIdx], weight, date };
        return next;
      }
      return [...prev, { iso, date, weight }];
    });

    setInput("");
  };

  return (
    <div className="min-h-dvh bg-black text-zinc-100">
      {/* 상단 타이틀 */}
      <div className="mx-auto w-full max-w-[980px] px-4 pt-10">
        <h1 className="text-center text-3xl font-extrabold tracking-wide text-[#39FF14] drop-shadow-[0_0_18px_rgba(57,255,20,0.45)]">
          체중 기록
        </h1>

        {/* 입력 영역 */}
        <div className="mt-6 flex items-center justify-center gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            inputMode="decimal"
            placeholder="몸무게 (kg)"
            className="h-12 w-[220px] rounded-xl border border-[#39FF14]/70 bg-black px-4 text-sm text-zinc-100 outline-none placeholder:text-zinc-400 shadow-[0_0_16px_rgba(57,255,20,0.16)] focus:border-[#39FF14] focus:shadow-[0_0_22px_rgba(57,255,20,0.28)]"
          />

          <button
            type="button"
            onClick={onAdd}
            className="h-12 rounded-xl bg-[#39FF14] px-5 font-bold text-black shadow-[0_10px_30px_rgba(57,255,20,0.25)] active:translate-y-[1px]"
          >
            + 추가
          </button>
        </div>

        {/* 메인 카드(네온 프레임) */}
        <section className="mt-8 rounded-2xl border border-[#39FF14]/70 bg-black p-6 shadow-[0_0_40px_rgba(57,255,20,0.25)]">
          <div className="mb-4 text-lg font-bold text-[#39FF14] drop-shadow-[0_0_16px_rgba(57,255,20,0.35)]">
            몸무게 변화 추이
          </div>

          {/* 차트 영역 */}
          <div className="h-[320px] w-full rounded-xl border border-[#39FF14]/30 bg-black/60 p-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sorted} margin={{ top: 10, right: 18, bottom: 10, left: 6 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(57,255,20,0.12)" />
                <XAxis
                  dataKey="date"
                  tick={{ fill: "rgba(57,255,20,0.9)", fontSize: 12 }}
                  axisLine={{ stroke: "rgba(57,255,20,0.35)" }}
                  tickLine={{ stroke: "rgba(57,255,20,0.35)" }}
                />
                <YAxis
                  domain={yDomain as any}
                  tick={{ fill: "rgba(57,255,20,0.9)", fontSize: 12 }}
                  axisLine={{ stroke: "rgba(57,255,20,0.35)" }}
                  tickLine={{ stroke: "rgba(57,255,20,0.35)" }}
                  width={42}
                />
                <Tooltip
                  contentStyle={{
                    background: "rgba(0,0,0,0.85)",
                    border: "1px solid rgba(57,255,20,0.6)",
                    borderRadius: 12,
                    boxShadow: "0 0 20px rgba(57,255,20,0.18)",
                    color: "rgba(57,255,20,0.95)",
                  }}
                  labelStyle={{ color: "rgba(57,255,20,0.95)" }}
                  formatter={(v: any) => [`${v} kg`, "체중"]}
                />

                {/* ✅ 네온 라인 */}
                <Line
                  type="monotone"
                  dataKey="weight"
                  stroke="#39FF14"
                  strokeWidth={3}
                  dot={{ r: 5, stroke: "#39FF14", strokeWidth: 2, fill: "#39FF14" }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* 통계 카드 */}
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <StatCard title="최근 체중" value={stats.latest} />
            <StatCard title="최고 체중" value={stats.max} />
            <StatCard title="최저 체중" value={stats.min} />
          </div>
        </section>
      </div>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: number | null }) {
  return (
    <div className="rounded-xl border border-[#39FF14]/35 bg-black px-5 py-4 shadow-[0_0_22px_rgba(57,255,20,0.12)]">
      <div className="text-center text-sm text-[#39FF14]/90">{title}</div>
      <div className="mt-1 text-center text-2xl font-extrabold text-[#39FF14] drop-shadow-[0_0_16px_rgba(57,255,20,0.35)]">
        {value == null ? "-" : `${value} kg`}
      </div>
    </div>
  );
}
