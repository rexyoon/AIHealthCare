import api from '../api';
import type { ApiResponse } from '@/types/api-response';

interface LikePlaceRequest {
  contentId: string;
  regionName: string;
  themeName: string;
  cnctrLevel: number;
}

interface LikePlaceResponse {
  placeId: number;
  type: 'LIKE';
  enabled: boolean;
  changed: boolean;
  likeCount: number;
  message: string;
  createdAt: string;
  updatedAt: string;
}

export interface LikeStatusResponse {
  contentId: string;
  like: boolean;
}

export const likePlace = (body: LikePlaceRequest) =>
  api.post<ApiResponse<LikePlaceResponse>>('/places/like', body);

export const unlikePlace = (contentId: string) =>
  api.delete<ApiResponse<LikePlaceResponse>>('/places/like', {
    params: { contentId },
  });

export const getLikeStatus = (contentId: string) =>
  api.get<ApiResponse<LikeStatusResponse>>('places/like/status', {
    params: { contentId },
  });
