import type { CheckInData, Recommendation } from "../types/fitness";

export async function getAiRecommendation(data: CheckInData): Promise<Recommendation> {
  //지금은 mock 추천 (실제 AI/백엔드 붙이기 전 MVP)
  //나중에: axios로 backend /api/recommend 호출로 교체


  const goalLine =
    data.goal === "HYPERTROPHY"
      ? "근비대 기준으로 볼륨을 구성합니다."
      : data.goal === "MAINTAIN"
      ? "유지 기준으로 적정 볼륨으로 구성합니다."
      : "회복에 집중합니다.";

  return Promise.resolve({
    mode: "TRAIN",
    title: "오늘의 추천 루틴",
    reason: goalLine,
    workout: "PUSH",
    exercises: [
      "Bench Press 4x6-8",
      "Incline DB Press 3x8-10",
      "Lateral Raise 4x12-15",
      "Cable Pushdown 3x10-12",
    ],
    tip: "마무리 스트레칭 5분 + 수분/나트륨 챙기기",
  });
}
