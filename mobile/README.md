# 가는김에 모바일 앱

React Native 학습용 Expo 프로젝트입니다. 핵심 서비스 로직은 의도적으로 비워 두고, 화면 이동·공통 UI·테마·네이티브 패키지 설정과 Spring API 연결 기반만 준비했습니다.

## 시작하기

```powershell
cd mobile
npm start
```

Android 휴대폰에는 Expo Go를 설치한 뒤 같은 Wi-Fi에서 QR 코드를 스캔해 실행합니다. Android Studio 에뮬레이터가 있다면 터미널에서 `a`를 누르세요.

## Spring API 연결

서버는 상위 폴더의 [`server`](../server/README.md)에 있습니다. 먼저 서버를 실행한 뒤, 이 프로젝트에서 환경 예시를 복사합니다.

```powershell
Copy-Item .env.example .env.local
```

`EXPO_PUBLIC_API_URL`에는 실행 환경에 맞는 서버 주소를 넣습니다. Android 에뮬레이터는 `http://10.0.2.2:8080/api/v1`, 실기기/Expo Go는 개발 PC의 LAN IP(예: `http://192.168.0.10:8080/api/v1`)를 사용합니다. `.env.local`을 바꾼 뒤 Expo 개발 서버를 다시 시작하세요.

공통 요청 함수는 `src/lib/api-client.ts`에 있습니다. 아직 실제 API를 호출하지 않으며, 기능을 만들 때 `apiRequest<T>('tasks')`처럼 사용하면 됩니다. `EXPO_PUBLIC_` 값은 앱에 공개되므로 비밀번호나 토큰을 넣으면 안 됩니다.

## 준비된 공통 기반

- Expo + React Native + TypeScript + Expo Router
- 홈/할 일 하단 탭 및 주요 화면의 빈 골격
- 공통 화면·버튼·안내 카드와 디자인 토큰
- React Query Provider와 공통 query key
- Zustand(전역 UI 상태용), AsyncStorage(비민감 설정용), SecureStore(민감 정보용)
- Location·Notifications 패키지 및 기본 Android 권한
- Spring Boot API 주소 설정과 타입 안전 공통 HTTP 클라이언트

## 직접 구현할 핵심 서비스 로직

- 할 일 생성·수정·완료·반복·자동 이월
- 자연어·음성 입력 처리
- 장소 검색·자동 추천·동선 계산
- 위치·지오펜스 기반 알림
- 로그인·공동 목록·초대·동기화
- 서버 도메인 API·데이터베이스·카카오맵 연동

백그라운드 위치 권한은 실제 근처 도착 알림을 만들 때만 추가하세요. 사용자에게 이유를 설명하고 Android 정책도 함께 검토해야 합니다.

## 화면 경로

| 파일 | 역할 |
|---|---|
| `src/app/(tabs)/index.tsx` | 홈 |
| `src/app/(tabs)/tasks.tsx` | 할 일 |
| `src/app/add-task.tsx` | 3단계 새 할 일 흐름 시작점 |
| `src/app/places.tsx` | 내 장소 |
| `src/app/shared.tsx` | 공동 목록 |
| `src/app/settings.tsx` | 설정 |

확정한 UI 시안은 상위 폴더의 [`docs/ui-reference/README.md`](../docs/ui-reference/README.md)에 있습니다.
