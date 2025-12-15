import { create } from "zustand";
import type { CheckInData } from "../types/fitness";

interface State {
  data: CheckInData | null;
  setData: (data: CheckInData) => void;
}

export const useCheckInStore = create<State>((set) => ({
  data: null,
  setData: (data) => set({ data }),
}));
