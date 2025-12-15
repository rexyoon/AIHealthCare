import api from '../api';
import type { ApiResponse } from '@/types/api-response';

export interface ThemeCat2 {
  cat2: string;
  cat2Name: string;
}
export interface ThemeGroup {
  cat1: string;
  cat1Name: string;
  cat2List: ThemeCat2[];
}

export async function getThemeGroups(): Promise<ThemeGroup[]> {
  const { data } = await api.get<ThemeGroup[] | ApiResponse<ThemeGroup[]>>('/places/themes');
  const payload = (data as any)?.data ?? data;
  return payload as ThemeGroup[];
}
