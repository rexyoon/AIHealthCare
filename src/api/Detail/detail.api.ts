import api from '../api';
import type { ApiResponse } from '@/types/api-response';

export type IntegratedPlace = {
  placeName: string;
  placeImageUrl?: string | null;
  placeAddress?: string | null;
  region?: string | null;
  themeName?: string | null;
  tranquilityLevel?: number | null;
  likeCount?: number | null;
  introduction?: string | null;
  aiTipSummary?: string | null;
  nearbyParkingLots?: Array<{
    prkId: string;
    prkName: string;
    totalLots: number;
    availLots: number;
    distance: number;
  }>;
  longitude?: string | null;
  latitude?: string | null;
};

export async function getPlaceDetail(contentId: string) {
  const resp = await api.get<ApiResponse<IntegratedPlace>>(`/places/integrated/${contentId}`);
  return resp.data.data;
}
