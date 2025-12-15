import api from '../api';
import type { ApiResponse } from '@/types/api-response';

export type LoginResult = {
  grantType: string;
  accessToken: string;
  refreshToken: string;
  newUser?: boolean;
};

export async function loginWithKakaoAccessToken(kakaoAccessToken: string) {
  const body = { accessToken: kakaoAccessToken };

  const { data } = await api.post<ApiResponse<LoginResult>>('/auth/login/kakao', body);
  const payload = data.data;
  localStorage.setItem('accessToken', payload.accessToken);
  localStorage.setItem('refreshToken', payload.refreshToken);
  return payload;
}
