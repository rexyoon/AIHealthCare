import { ensureKakaoLoaded } from '@/libs/kakaoLoader';

export async function geocodeAddress(address: string): Promise<{ lat: number; lng: number }> {
  await ensureKakaoLoaded();

  if (!window.kakao?.maps?.services) {
    throw new Error('Kakao SDK not loaded');
  }

  const geocoder = new window.kakao.maps.services.Geocoder();

  const tryOnce = () =>
    new Promise<{ lat: number; lng: number }>((resolve, reject) => {
      geocoder.addressSearch(
        address,
        (result: any[], status: any) => {
          const S = window.kakao.maps.services.Status;
          if (status === S.OK && result?.[0]) {
            const { x, y } = result[0]; // x: lng, y: lat
            resolve({ lat: Number(y), lng: Number(x) });
          } else if (status === S.ZERO_RESULT) {
            reject(new Error('ZERO_RESULT'));
          } else {
            // ERROR, TIMEOUT 등 케이스
            reject(new Error(String(status || 'ERROR')));
          }
        },
        { page: 1, size: 10 },
      );
    });

  const delays = [200, 500, 1000]; // 지수 백오프
  for (let i = 0; i < delays.length; i++) {
    try {
      return await tryOnce();
    } catch (e: any) {
      if (e?.message === 'ZERO_RESULT') break; // 주소 자체 실패면 재시도 무의미
      if (i < delays.length - 1) {
        await new Promise((r) => setTimeout(r, delays[i]));
      }
    }
  }
  throw new Error('주소를 좌표로 변환하지 못했습니다.');
}
