# 가는김에 (Going Way)

일상 속 할 일을 **현재 위치·저장한 장소·이동 시간대**와 연결해, 가는 길에 자연스럽게 처리하도록 돕는 모바일 앱입니다.

이 저장소는 React Native 모바일 앱과 Spring Boot 서버를 함께 관리하는 모노레포입니다. 아직 핵심 서비스 로직과 데이터베이스는 구현 전이며, 학습과 기능 개발을 위한 공통 기반을 우선 구성했습니다.

## 프로젝트 구조

```text
going-way/
├─ mobile/              # Expo + React Native 앱
├─ server/              # Spring Boot API 서버
└─ docs/ui-reference/   # 확정 UI 기준 시안 8종
```

## 기술 구성

| 영역 | 기술 | 현재 역할 |
|---|---|---|
| Mobile | Expo, React Native, TypeScript, Expo Router | 화면·탭·네이티브 기능 기반 |
| Client data | TanStack Query, Zustand, AsyncStorage, SecureStore | 이후 서버 데이터·로컬 상태·토큰 처리 기반 |
| API connection | Fetch, `EXPO_PUBLIC_API_URL` | 공통 HTTP 요청과 개발 환경별 서버 주소 설정 |
| Server | Java 21, Spring Boot, Gradle | REST API 개발 기반, CORS, 상태 확인 |
| Design | UI reference images | 구현·검토 시 사용할 디자인 기준 |

## 빠른 실행

### 1. 서버 실행

Java 21이 설치되어 있어야 합니다.

```powershell
cd server
.\gradlew.bat bootRun
```

서버 상태는 다음 주소에서 확인합니다.

```text
http://localhost:8080/actuator/health
```

### 2. 모바일 실행

별도 터미널에서 Node.js LTS와 npm을 준비한 뒤 실행합니다.

```powershell
cd mobile
npm install
Copy-Item .env.example .env.local
npm start
```

Android 에뮬레이터의 기본 API 주소는 `http://10.0.2.2:8080/api/v1`입니다. 실제 Android 기기에서는 `.env.local`의 `EXPO_PUBLIC_API_URL`을 개발 PC의 LAN IP로 변경해야 합니다.

## 현재 준비된 기반

- 홈·할 일 탭과 새 할 일, 내 장소, 공동 목록, 설정 화면 골격
- 공통 UI 컴포넌트와 디자인 토큰
- 위치·알림·SecureStore 패키지 및 Android 기본 권한
- 공통 HTTP 요청 함수와 네트워크/서버 오류 구분
- Spring CORS 설정 및 Actuator 헬스 체크

## 아직 구현하지 않은 핵심 기능

- 할 일 CRUD, 반복, 자동 이월
- 장소 검색·동선 추천·카카오맵 연동
- 위치 기반 알림과 백그라운드 위치 정책
- 로그인, 공동 목록, 초대, 데이터 동기화
- PostgreSQL 등 영속성 저장소와 인증

## 참고 문서

- [모바일 앱 안내](mobile/README.md)
- [서버 API 안내](server/README.md)
- [UI 기준 시안](docs/ui-reference/README.md)

## 보안 원칙

`.env.local`, 토큰, DB 비밀번호, 지도 API 비밀키는 Git에 올리지 않습니다. `EXPO_PUBLIC_` 값은 앱에 포함되므로 공개 가능한 서버 주소처럼 민감하지 않은 값에만 사용합니다.
