import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../libs/axios";
import HistoryMetricsCard from "@/component/HistoryMetricsCard";

type HistoryMetricsSummary = {
  id: number;
  date: string; // "YYYY-MM-DD"
  // 요약용 지표 (카드에 표시할 값들)
  testosteroneTotal?: number;
  estradiolE2?: number;
  ast?: number;
  alt?: number;
  // 서버가 이미 score를 내려주면 그거 쓰면 됨 (0~100)
  healthScore?: number;
};

function computeHealthScoreFallback(m: HistoryMetricsSummary): number {
  // 서버에 score 없을 때 “대충” 계산해서 0~100으로 만들기
  // (너의 로직이 생기면 교체하면 됨)
  const t = m.testosteroneTotal ?? 0;
  const ast = m.ast ?? 0;
  const alt = m.alt ?? 0;

  // 예시: T가 높을수록 +, 간수치 높을수록 -
  let score = 70;

  if (t > 800) score += 10;
  else if (t > 500) score += 5;
  else if (t < 300) score -= 10;

  if (ast > 45) score -= 10;
  if (alt > 55) score -= 10;

  // 0~100 clamp
  score = Math.max(0, Math.min(100, score));
  return Math.round(score);
}

function testosteroneLabel(t?: number) {
  if (t == null) return { text: "Unknown", tone: "muted" as const };
  if (t >= 800) return { text: "High Normal", tone: "good" as const };
  if (t >= 400) return { text: "Normal", tone: "good" as const };
  if (t >= 250) return { text: "Low", tone: "warn" as const };
  return { text: "Very Low", tone: "bad" as const };
}

function liverLabel(ast?: number, alt?: number) {
  if (ast == null || alt == null) return { text: "Unknown", tone: "muted" as const };
  const high = ast > 45 || alt > 55;
  const mild = (ast > 35 && ast <= 45) || (alt > 45 && alt <= 55);

  if (high) return { text: "Needs Attention", tone: "bad" as const };
  if (mild) return { text: "Watch", tone: "warn" as const };
  return { text: "Stable", tone: "good" as const };
}

export default function HealthHistoryPage() {
  const [items, setItems] = useState<HistoryMetricsSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<"Weekly" | "Monthly">("Weekly"); // UI용
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        // ✅ 너 백엔드에 맞게 수정
        // 예) GET /api/health-metrics/history?period=weekly
        const res = await api.get("/api/health-metrics/history", {
          params: { period: period.toLowerCase() },
        });
        setItems(Array.isArray(res.data) ? res.data : []);
      } catch (e) {
        // 서버 아직 없으면 빈 배열로 두고 UI만 확인 가능
        setItems([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [period]);

  const cards = useMemo(() => {
    return items.map((m) => {
      const score = m.healthScore ?? computeHealthScoreFallback(m);
      const tLabel = testosteroneLabel(m.testosteroneTotal);
      const lLabel = liverLabel(m.ast, m.alt);

      // bar chart 예시 값: (원하면 너 지표로 바꾸면 됨)
      const bars = [
        Math.max(10, Math.min(100, score - 20)),
        Math.max(10, Math.min(100, score - 5)),
        Math.max(10, Math.min(100, score + 10)),
        Math.max(10, Math.min(100, score + 25)),
      ];

      return {
        key: m.id,
        date: m.date,
        score,
        bars,
        testosteroneText: tLabel.text,
        testosteroneTone: tLabel.tone,
        liverText: lLabel.text,
        liverTone: lLabel.tone,
      };
    });
  }, [items]);

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">History</h1>

        <div className="flex gap-2">
          <button
            onClick={() => setPeriod("Weekly")}
            className={[
              "rounded-full px-4 py-2 text-sm transition",
              period === "Weekly"
                ? "bg-white/15 text-white"
                : "bg-white/5 text-white/70 hover:bg-white/10",
            ].join(" ")}
          >
            Weekly
          </button>
          <button
            onClick={() => setPeriod("Monthly")}
            className={[
              "rounded-full px-4 py-2 text-sm transition",
              period === "Monthly"
                ? "bg-white/15 text-white"
                : "bg-white/5 text-white/70 hover:bg-white/10",
            ].join(" ")}
          >
            Monthly
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-white/70">로딩중...</div>
      ) : cards.length === 0 ? (
        <div className="text-white/70">
          데이터가 없습니다. (백엔드 연결 전이면 정상)
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {cards.map((c) => (
            <HistoryMetricsCard
              key={c.key}
              title="Recent Analysis"
              period={period}
              score={c.score}
              bars={c.bars}
              rows={[
                { label: "Testosterone", value: c.testosteroneText, tone: c.testosteroneTone },
                { label: "Liver Function", value: c.liverText, tone: c.liverTone },
              ]}
              onClick={() => navigate(`/health/dashboard/${c.date}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
