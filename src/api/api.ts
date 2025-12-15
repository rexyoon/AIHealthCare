import type { ApiError, ApiResponse } from '@/types/api-response';
import axios from 'axios';
function buildApiBase() {
  const base = import.meta.env.VITE_API_URL as string | undefined;
  if (!base) throw new Error('Missing VITE_API_URL');
  // 뒤 슬래시 정리 후 /api 붙이기
  return `${base.replace(/\/+$/, '')}/api`;
}
const API_BASE = buildApiBase();
// 공통 인스턴스 (업무용)
const api = axios.create({
  baseURL: API_BASE,
  timeout: 7000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

//재발급 전용
const refreshClient = axios.create({
  baseURL: API_BASE,
  timeout: 7000,
  headers: { 'Content-Type': 'application/json' },
});

//auth 경로면 재발급 로직 스킵
function isAuthRequest(url?: string) {
  if (!url) return false;
  try {
    const u = url.startsWith('http') ? new URL(url) : new URL(url, API_BASE);
    const p = u.pathname;
    return p.startsWith('/api/auth/') || p.startsWith('/auth/');
  } catch {
    return url.includes('/api/auth/') || url.includes('/auth/');
  }
}

//요청 인터셉터
api.interceptors.request.use(
  (config) => {
    const m = (config.method || 'get').toUpperCase();
    if (m === 'GET' || m === 'DELETE') {
      if (config.headers) delete (config.headers as any)['Content-Type'];
    } else {
      config.headers = config.headers ?? {};
      (config.headers as any)['Content-Type'] ??= 'application/json';
    }
    const token = localStorage.getItem('accessToken');

    if (token && !isAuthRequest(config.url)) {
      config.headers = config.headers ?? {};
      (config.headers as any).Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

//응답 인터셉터
let refreshPromise: Promise<string | null> | null = null;

api.interceptors.response.use(
  (response) => {
    const res = response.data as ApiResponse<any> | undefined;

    if (res && typeof res.success === 'boolean' && !res.success) {
      const apiError: ApiError = {
        message: res.message || '알 수 없는 오류가 발생했습니다.',
        code: res.code,
        error: Array.isArray(res.error) ? res.error : null,
      };
      return Promise.reject(apiError);
    }

    return response;
  },
  async (error) => {
    const status = error.response?.status;
    const original: any = error.config;

    if (status === 401 && original && !original._retry && !isAuthRequest(original?.url)) {
      original._retry = true;

      const rt = localStorage.getItem('refreshToken');
      if (!rt) {
        const resData = error.response?.data as ApiResponse<any> | undefined;
        const apiError: ApiError = {
          message: resData?.message || '인증이 필요합니다.',
          code: resData?.code || 401,
          error: Array.isArray(resData?.error) ? resData?.error : null,
        };
        return Promise.reject(apiError);
      }

      //동시 요청 중복 방지
      if (!refreshPromise) {
        refreshPromise = refreshClient
          .post('/auth/reissue', { refreshToken: rt })
          .then(({ data }: any) => {
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
            return data.accessToken as string;
          })
          .catch(() => null)
          .finally(() => {
            refreshPromise = null;
          });
      }

      const newAccess = await refreshPromise;
      if (!newAccess) {
        const resData = error.response?.data as ApiResponse<any> | undefined;
        const apiError: ApiError = {
          message: resData?.message || '인증 갱신 실패',
          code: resData?.code || 401,
          error: Array.isArray(resData?.error) ? resData?.error : null,
        };
        return Promise.reject(apiError);
      }

      //요청 재시도
      original.headers = original.headers ?? {};
      original.headers.Authorization = `Bearer ${newAccess}`;
      return api(original);
    }

    //에러
    const resData = error.response?.data as ApiResponse<any> | undefined;
    const apiError: ApiError = {
      message: resData?.message || '네트워크 오류 또는 서버 에러가 발생했습니다.',
      code: resData?.code || status || 'UNKNOWN',
      error: Array.isArray(resData?.error) ? resData?.error : null,
    };
    return Promise.reject(apiError);
  },
);

export default api;
