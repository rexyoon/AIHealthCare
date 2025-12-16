import { useNavigate } from "react-router-dom";
import Card from "../../component/ui/Card";
import { useCheckInStore } from "../../stores/useCheckInStore";

export default function Dashboard() {
  const nav = useNavigate();
  const rec = useCheckInStore((s) => s.recommendation);

  return (
    <div className="space-y-4">
      <Card title="오늘 상태">
        <div className="text-2xl font-extrabold">Ready.</div>
        <div className="mt-1 text-sm text-zinc-400">
          체크인하고 오늘 루틴(또는 회복)을 추천받자.
        </div>

        <button
          onClick={() => nav("/checkin")}
          className="mt-4 w-full rounded-xl bg-lime-400 px-4 py-3 text-sm font-extrabold text-zinc-950 active:scale-[0.99]"
        >
          체크인 시작
        </button>
      </Card>
      <Card title="최근 추천">
        {rec ? (
          <div className="space-y-2">
            <div className="text-lg font-extrabold">{rec.title}</div>
            <div className="text-sm text-zinc-400">{rec.reason}</div>
            <button
              onClick={() => nav("/result")}
              className="mt-2 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm font-bold text-zinc-100">
              결과 보기
            </button>
          </div>
        ) : (
          <div className="text-sm text-zinc-400">아직 추천이 없습니다.</div>
        )}
      </Card>
    </div>
  );
}
