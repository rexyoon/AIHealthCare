import Card from "../../component/ui/Card";
import { useCheckInStore } from "../../stores/useCheckInStore";

export default function Result() {
  const rec = useCheckInStore((s) => s.recommendation);
  if (!rec) {
    return (
      <div className="space-y-4">
        <Card title="결과">
          <div className="text-sm text-zinc-400">아직 추천이 없습니다. 체크인을 먼저 진행하세요.</div>
        </Card>
      </div>
    );
  }
  return (
    <div className="space-y-4">
      <Card
        title="오늘의 추천"
        right={
          <span className="rounded-full bg-lime-400/15 px-3 py-1 text-xs font-bold text-lime-300">
            {rec.mode}
          </span>
        }
      >
        <div className="text-2xl font-extrabold">{rec.title}</div>
        <div className="mt-1 text-sm text-zinc-400">{rec.reason}</div>
        {rec.mode === "TRAIN" && (
          <>
            <div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-sm text-zinc-200">
              추천 분할: <span className="font-extrabold">{rec.workout ?? "PUSH"}</span>
            </div>

            <div className="mt-3 space-y-2">
              {(rec.exercises ?? []).map((x) => (
                <div
                  key={x}
                  className="rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-3 text-sm text-zinc-200"
                >
                  {x}
                </div>
              ))}
            </div>
          </>
        )}
        {rec.tip && (
          <div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-xs text-zinc-400">
            팁: {rec.tip}
          </div>
        )}
      </Card>
    </div>
  );
}
