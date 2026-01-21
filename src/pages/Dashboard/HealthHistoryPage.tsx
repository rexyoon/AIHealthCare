import  { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../libs/axios";
import MetricsCard from "@/component/cards/MetricsCard";

type Item = {
  id: number;
  date: string;
  healthScore?: number;
  testosteroneTotal?: number;
  ast?: number;
  alt?: number;
};

export default function HealthHistoryPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [period, setPeriod] = useState<"Weekly" | "Monthly">("Weekly");
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const res = await api.get("/api/health-metrics/history", {
        params: { period: period.toLowerCase() },
      });
      setItems(res.data ?? []);
    })();
  }, [period]);

  const cards = useMemo(() => {
    return items.map((m) => {
      const score = m.healthScore ?? 70;
      const bars = [score - 20, score - 5, score + 10, score + 25].map((x) => Math.max(5, Math.min(100, x)));

      return {
        id: m.id,
        date: m.date,
        score,
        bars,
      };
    });
  }, [items]);

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">History</h1>
        <div className="flex gap-2">
          <button onClick={() => setPeriod("Weekly")} className="rounded-full bg-white/10 px-4 py-2 text-sm text-white">Weekly</button>
          <button onClick={() => setPeriod("Monthly")} className="rounded-full bg-white/5 px-4 py-2 text-sm text-white/70">Monthly</button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((c) => (
          <MetricsCard
            key={c.id}
            period={period}
            score={c.score}
            bars={c.bars}
            rows={[
              { label: "Testosterone", value: "High Normal", tone: "good" },
              { label: "Liver Function", value: "Stable", tone: "muted" },
            ]}
            onClick={() => navigate(`/health/dashboard/${c.date}`)}
          />
        ))}
      </div>
    </div>
  );
}
