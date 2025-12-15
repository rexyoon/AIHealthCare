import api from '@/api/api';
import type { ApiResponse } from '@/types/api-response';

export interface SavePlaceRequest {
  contentId: string;
  regionName: string;
  themeName: string;
  cnctrLevel: number;
  placeName: string;
}

export interface SaveToggleResponse {
  placeId: number;
  type: 'LIKE' | 'SAVE';
  enabled: boolean;
  changed: boolean;
  likeCount: number;
  message: string;
  createdAt: string;
  updatedAt: string;
}

export interface SaveStatusData {
  contentId: string;
  save: boolean;
}

export interface SavedPlaceItem {
  cnctrLevel: number;
  contentId: string;
  placeName: string;
  likeCount: number;
  themeName: string;
  regionName: string;
  savedAt: string;
}
export interface SavedPlacePage {
  content: SavedPlaceItem[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  hasNext: boolean;
  hasPrevious: boolean;
}

//저장 ON
export async function savePlace(payload: SavePlaceRequest): Promise<SaveToggleResponse> {
  const res = await api.put<SaveToggleResponse>('/my/places/save', payload);
  return res.data;
}

//저장 OFF
export async function unsavePlace(payload: {
  contentId: string;
  regionName: string;
  themeName?: string;
  cnctrLevel: number;
}) {
  const res = await api.delete<SaveToggleResponse>('/my/places/save', {
    data: payload,
    headers: { 'Content-Type': 'application/json' },
  });
  return res.data;
}

//저장 여부
export async function getSaveStatus(contentId: string): Promise<boolean> {
  const res = await api.get<ApiResponse<SaveStatusData>>('/my/places/save/status', {
    params: { contentId },
  });
  return !!res.data?.data?.save;
}

//내 저장 목록
export async function getSavedPlaces(
  params: { page?: number; size?: number; keyword?: string } = {},
): Promise<SavedPlacePage> {
  const { page = 0, size = 20, keyword } = params;
  const kw = (keyword ?? '').trim();

  const res = await api.get<ApiResponse<SavedPlacePage>>('/my/places', {
    params: { page, size, ...(kw ? { keyword: kw } : {}) },
  });
  return res.data.data;
}
