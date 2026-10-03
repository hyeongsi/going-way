const defaultApiUrl = 'http://10.0.2.2:8080/api/v1';

/**
 * Expo는 EXPO_PUBLIC_ 변수를 앱에 포함합니다. 공개 가능한 서버 주소만 사용하세요.
 * Android 에뮬레이터 기본값이며, 실기기·iOS·웹에서는 .env.local에서 변경합니다.
 */
export const apiBaseUrl = (
  process.env.EXPO_PUBLIC_API_URL ?? defaultApiUrl
).replace(/\/+$/, '');
