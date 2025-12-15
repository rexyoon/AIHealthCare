export type ThemeKey = `${string}>${string}`; // 예: "자연>자연관광지"

export type ThemeCodes = {
  cat1: string;   
  cat2?: string;    
  cat3?: string;    
};
export type ThemeCatMap = Record<ThemeKey, ThemeCodes>;
export type RegionCodes = {
  areaCode: number | string;
  sigunguCode?: number | string;
};
export type RegionMap = Record<
  string, 
  {
    areaCode: number | string;
    sigungu?: Record<string, number | string>; // "종로구": 23
  }
>;
export type AiTravelBody = {
  cat1: string;
  cat2?: string;
  cat3?: string;
};
export type GeneralTravelBody = {
  areaCode: number | string;
  sigunguCode?: number | string;
  cat1?: string;
  cat2?: string;
  cat3?: string;
};
