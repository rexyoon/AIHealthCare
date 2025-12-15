// src/utils/ktoMapping.ts
import { themeCatMap } from "@/constants/themeCatMap";
import { regionMap, normalizeRegionName } from "@/constants/regionMap";
import type { ThemeCodes, RegionCodes } from "@/types/kto";

function joinKey(main: string, sub: string) {
  return `${main.trim()}>${sub.trim()}` as const;
}

export function getThemeCodes(main: string, sub: string): ThemeCodes {
  const key = joinKey(main, sub);
  const codes = themeCatMap[key];
  if (!codes) {
    throw new Error(`[ThemeMapping] 매핑 누락: ${key} (themeCatMap.ts에 추가 필요)`);
  }
  return codes;
}

export function getRegionCodes(region: string, sigungu?: string): RegionCodes {
  const name = normalizeRegionName(region);
  const area = regionMap[name];
  if (!area) {
    throw new Error(`[RegionMapping] 지역 매핑 누락: ${region} (regionMap.ts에 추가 필요)`);
  }
  if (!sigungu || !sigungu.trim()) {
    return { areaCode: area.areaCode };
  }

  const sigunguMap = area.sigungu ?? {};
  const code = sigunguMap[sigungu.trim()];
  if (code == null) {
    const candidates = Object.keys(sigunguMap).slice(0, 5).join(", ");
    throw new Error(
      `[RegionMapping] 시군구 매핑 누락: ${region} > ${sigungu} (예: ${candidates} ...)`
    );
  }
  return { areaCode: area.areaCode, sigunguCode: code };
}

export function safe<T>(fn: () => T): { ok: true; value: T } | { ok: false; message: string } {
  try {
    return { ok: true, value: fn() };
  } catch (e: any) {
    return { ok: false, message: e?.message ?? String(e) };
  }
}
