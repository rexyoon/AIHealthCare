import api from '@/api/api';

export type SearchPlacesParams = {
  areaCode?: number | string;
  sigunguCode?: number | string;
  cat1?: string;
  cat2?: string;
  contentTypeId?: number;
  pageNo?: number;
  numOfRows?: number;
  arrange?: 'O' | 'Q' | 'R' | 'S';
  keyword?: string;
  _type?: string;
};

export type PlaceDto = {
  title: string;
  contentid: string;
  catName?: string;
  areaName?: string;
  firstimage?: string;
  dist?: string;
  likeCount?: number;
  cnctrRate?: string | number;
  quietnessLevel?: number;
};

function unwrap<T>(raw: any): T {
  return raw && typeof raw.success === 'boolean' && 'data' in raw ? raw.data : raw;
}
function toArray<T>(raw: any): T[] {
  if (Array.isArray(raw)) return raw;
  if (Array.isArray(raw?.content)) return raw.content;
  if (Array.isArray(raw?.items)) return raw.items;
  if (raw && typeof raw === 'object') return [raw as T];
  return [];
}

export async function searchPlaces(params: SearchPlacesParams): Promise<PlaceDto[]> {
  const res = await api.get('/places', { params });
  return toArray<PlaceDto>(unwrap(res.data));
}

export function mapToCard(p: PlaceDto) {
  const raw = p.firstimage || '';
  const imgUrl =
    typeof raw === 'string' && raw.startsWith('http://')
      ? raw.replace(/^http:\/\//, 'https://')
      : raw || undefined;

  return {
    id: p.contentid,
    title: p.title,
    theme: p.catName ?? '-',
    likeCount: p.likeCount ?? 0,
    imgUrl,
    quietLevel: typeof p.quietnessLevel === 'number',
  };
}
