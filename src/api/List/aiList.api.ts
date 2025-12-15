import api from '../api';

export type Arrange = 'O' | 'Q' | 'R' | 'S';

export interface AiPlace {
  title: string;
  contentid: string;
  cat1: string;
  cat2: string;
  catName: string;
  areaCode: number;
  sigunguCode: number;
  areaName: string;
  firstimage: string;
  dist: string;
  likeCount: number;
  cnctrRate: string;
  quietnessLevel: number;
}

export interface AiPlacesParams {
  mapX: number; //경도(lng)
  mapY: number; //위도(lat)
  radius: number; //반경
  cat1?: string; //테마 대분류
  cat2?: string; //테마 소분류
  pageNo?: number;
  numOfRows?: number;
  arrange?: Arrange;
  _type?: string;
}
export async function getAIPlaces(params: AiPlacesParams): Promise<AiPlace[]> {
  const { data } = await api.get<AiPlace[]>('/places/ai', { params });
  return Array.isArray(data) ? data : data ? [data] : [];
}
