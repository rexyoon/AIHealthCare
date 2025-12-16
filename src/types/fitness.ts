export type Condition = "GOOD" | "OK" | "BAD";
export type Goal = "HYPERTROPHY" | "MAINTAIN" | "RECOVERY";
export type WorkoutSplit ="NONE" | "PUSH" | "PULL" | "LEGS" | "FULL";

export interface CheckInData {
  condition: Condition;
  sleepHours: number;
  soreness: boolean;
  yesterdayWorkout: WorkoutSplit;
  goal: Goal;
}

export interface Recommendation {
  mode: "TRAIN" | "RECOVERY";
  title: string;
  reason: string;
  workout?: "PUSH" | "PULL" | "LEGS" | "FULL";
  exercises?: string[];
  tip?: string;
}