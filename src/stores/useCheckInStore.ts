import { create } from "zustand";
import type { CheckInData, Recommendation } from "../types/fitness";

interface State {
  checkIn: CheckInData | null;
  recommendation: Recommendation | null;
  setCheckIn: (data: CheckInData) => void;
  setRecommendation: (rec: Recommendation) => void;
  reset: () => void;
}

export const useCheckInStore = create<State>((set) => ({
  checkIn: null,
  recommendation: null,
  setCheckIn: (data) => set({ checkIn: data }),
  setRecommendation: (rec) => set({ recommendation: rec }),
  reset: () => set({ checkIn: null, recommendation: null }),
}));