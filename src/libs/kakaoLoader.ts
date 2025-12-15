declare global {
  interface Window {
    kakao: any;
  }
}

let kakaoReady: Promise<void> | null = null;

export function ensureKakaoLoaded(): Promise<void> {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('Window is not available'));
  }
  const { kakao } = window as any;
  if (!kakao?.maps) {
    return Promise.reject(new Error('Kakao SDK script not found'));
  }
  if (!kakaoReady) {
    kakaoReady = new Promise<void>((resolve) => {
      // autoload=false 환경에서 반드시 load 호출
      kakao.maps.load(() => resolve());
    });
  }
  return kakaoReady;
}
