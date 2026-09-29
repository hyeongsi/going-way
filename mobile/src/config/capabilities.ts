/** 구현 전에 확인할 네이티브 기능 경계입니다. 서비스 로직은 넣지 않았습니다. */
export const capabilities = {
  foregroundLocation: { package: 'expo-location', status: 'configured', note: '지금 주변·장소 검색' },
  notifications: { package: 'expo-notifications', status: 'configured', note: '시간대·근처 알림' },
  secureCredentials: { package: 'expo-secure-store', status: 'configured', note: '로그인 토큰' },
  springApi: { package: 'fetch', status: 'configured', note: 'EXPO_PUBLIC_API_URL 기반 Spring API 연결' },
  backgroundLocation: { package: 'expo-location', status: 'not-configured', note: '근처 도착 알림 구현·정책 검토 후 추가' },
} as const;
