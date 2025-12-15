export type Condition = "GOOD" | "OK" | "BAD";
export type Goal = "HYPERTROPHY" | "MAINTAIN" | "RECOVERY";

export interface CheckInData {
  condition: Condition;
  sleepHours: number;
  soreness: boolean;
  yesterdayWorkout: "NONE" | "PUSH" | "PULL" | "LEGS" | "FULL";
  goal: Goal;
}
