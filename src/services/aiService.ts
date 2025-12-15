import type { CheckInData } from "../types/fitness";

export async function getAiRecommendation(data: CheckInData) {
  // 지금은 mock
  return Promise.resolve({
    workout: "PUSH",
    exercises: [
      "Bench Press 4x6-8",
      "Incline DB Press 3x8-10",
      "Lateral Raise 4x12-15",
    ],
    tip: "스트레칭 5분 필수",
  });
}
