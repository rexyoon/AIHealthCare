import { create } from 'zustand';

export type ThemeGroup = { main: string; subs: string[] };
export type ThemeCodes = { cat1: string | null; cat2: string[] };
type ExploreState = {
  address: string;
  theme: ThemeGroup | null;
  themeCodes: ThemeCodes;
  distanceKm: number | null;
  setAddress: (v: string) => void;
  setTheme: (v: ThemeGroup | null) => void;
  setThemeCodes: (v: ThemeCodes) => void;
  setDistanceKm: (v: number | null) => void;
  reset: () => void;
};

export const useAIExploreStore = create<ExploreState>((set) => ({
  address: '',
  theme: null,
  themeCodes: { cat1: null, cat2: [] },
  distanceKm: null,
  setAddress: (v) => set({ address: v }),
  setTheme: (v) => set({ theme: v }),
  setThemeCodes: (v) => set({ themeCodes: v }),
  setDistanceKm: (v) => set({ distanceKm: v }),
  reset: () => set({ address: '', theme: null, distanceKm: null }),
}));
