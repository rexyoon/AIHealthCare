import api from '@/api/api';

export interface SigunguDto {
  sigunguCode: string;
  sigunguName: string;
}
export interface AreaDto {
  areaCode: string;
  areaName: string;
  sigunguList: SigunguDto[];
}

function unwrap<T>(raw: any): T {
  return raw && typeof raw.success === 'boolean' && 'data' in raw ? raw.data : raw;
}

export async function fetchRegions(): Promise<AreaDto[]> {
  const res = await api.get('/places/regions');
  const data = unwrap<AreaDto[]>(res.data);
  if (!Array.isArray(data)) throw new Error('Unexpected response for /places/regions');
  return data;
}
