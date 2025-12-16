import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../component/ui/Card";
import { useCheckInStore } from "../../stores/useCheckInStore";
import type { CheckInData, Condition, Goal, WorkoutSplit } from "../../types/fitness";
import { ruleBasedDecision } from "../../utils/recommendRule";
import { getAiRecommendation } from "../../services/aiService";

export default function CheckIn() {
  const nav = useNavigate();
  const setCheckIn = useCheckInStore((s) => s.setCheckIn);
  const setRecommendation = useCheckInStore((s) => s.setRecommendation);

  const [condition, setCondition] = useState<Condition>("OK");
  const [sleepHours, setSleepHours] = useState<number>(7);
  const [soreness, setSoreness] = useState<boolean>(false);
  const [yesterdayWorkout, setYesterdayWorkout] = useState<WorkoutSplit>("NONE");
  const [goal, setGoal] = useState<Goal>("HYPERTROPHY");

  const submit = async () => {
    const data: CheckInData = { condition, sleepHours, soreness, yesterdayWorkout, goal };
    setCheckIn(data);

    // 규칙 기반으로 먼저 판단
    const rule = ruleBasedDecision(data);
    if (rule.mode === "RECOVERY") {
      setRecommendation(rule);
      nav("/result");
      return;
    }

    // 운동 가능이면 mock AI 추천
    const ai = await getAiRecommendation(data);
    setRecommendation(ai);
    nav("/result");
  };

  return (
    <div className="space-y-4">
      <Card title="컨디션 체크인">
        <div className="space-y-4">
          <div>
            <div className="mb-2 text-xs font-semibold text-zinc-400">컨디션</div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { k: "GOOD" as const, label: "좋음" },
                { k: "OK" as const, label: "보통" },
                { k: "BAD" as const, label: "나쁨" },
              ].map((x) => (
                <button
                  key={x.k}
                  onClick={() => setCondition(x.k)}
                  className={[
                    "rounded-xl border px-3 py-3 text-sm font-bold",
                    condition === x.k
                      ? "border-lime-400 bg-lime-400/15 text-lime-300"
                      : "border-zinc-800 bg-zinc-900/30 text-zinc-300",
                  ].join(" ")}
                >
                  {x.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="mb-2 text-xs font-semibold text-zinc-400">수면(시간)</div>
              <input
                type="number"
                min={0}
                max={12}
                value={sleepHours}
                onChange={(e) => setSleepHours(Number(e.target.value))}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-3 text-sm text-zinc-100 outline-none focus:border-lime-400"
              />
            </div>
            <div>
              <div className="mb-2 text-xs font-semibold text-zinc-400">근육통</div>
              <button
                onClick={() => setSoreness((v) => !v)}
                className={[
                  "w-full rounded-xl border px-3 py-3 text-sm font-bold",
                  soreness
                    ? "border-amber-400 bg-amber-400/15 text-amber-300"
                    : "border-zinc-800 bg-zinc-900/30 text-zinc-300",
                ].join(" ")}
              >
                {soreness ? "있음" : "없음"}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="mb-2 text-xs font-semibold text-zinc-400">어제 운동</div>
              <select
                value={yesterdayWorkout}
                onChange={(e) => setYesterdayWorkout(e.target.value as WorkoutSplit)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-3 text-sm text-zinc-100 outline-none focus:border-lime-400"
              >
                <option value="NONE">안함</option>
                <option value="PUSH">가슴/어깨/삼두</option>
                <option value="PULL">등/이두</option>
                <option value="LEGS">하체</option>
                <option value="FULL">전신</option>
              </select>
            </div>
            <div>
              <div className="mb-2 text-xs font-semibold text-zinc-400">목표</div>
              <select
                value={goal}
                onChange={(e) => setGoal(e.target.value as Goal)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-3 text-sm text-zinc-100 outline-none focus:border-lime-400"
              >
                <option value="HYPERTROPHY">근비대</option>
                <option value="MAINTAIN">유지</option>
                <option value="RECOVERY">회복</option>
              </select>
            </div>
          </div>

          <button
            onClick={submit}
            className="w-full rounded-xl bg-lime-400 px-4 py-3 text-sm font-extrabold text-zinc-950 active:scale-[0.99]"
          >
            추천 생성
          </button>

          <div className="text-xs text-zinc-500">
            *수면/근육통은 규칙 기반으로 “회복”을 먼저 판단하고, 운동 가능할 때만 mock AI 추천을 사용합니다.
          </div>
        </div>
      </Card>
    </div>
  );
}
