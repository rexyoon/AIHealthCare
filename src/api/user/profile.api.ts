import api from '../api';
import type { ApiResponse } from '@/types/api-response';

export type profile = {
  userId: number;
  email: string;
  nickname: string;
};

export async function withdrawAccount() {
  const { data } = await api.patch<ApiResponse<null>>('/my/profile/withdraw');
  return data;
}
