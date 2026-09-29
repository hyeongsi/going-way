# 가는김에 서버 API

`going-way-mobile`과 연결할 Spring Boot API의 최소 기반입니다. 업무 도메인 API, 데이터베이스, 인증은 아직 넣지 않았습니다. 학습하면서 기능 단위로 추가할 수 있도록 웹 서버·입력 검증·개발용 CORS·헬스 체크만 구성했습니다.

## 요구 사항

- Java 21
- 별도 Gradle 설치는 불필요합니다. 포함된 Gradle Wrapper를 사용합니다.

## 실행과 확인

```powershell
cd server
.\gradlew.bat bootRun
```

실행 뒤 브라우저 또는 PowerShell에서 아래 주소를 확인합니다.

```powershell
Invoke-RestMethod http://localhost:8080/actuator/health
```

`{"status":"UP"}`이면 서버 기반이 정상입니다. 애플리케이션 API는 앞으로 `/api/v1/...` 경로로 만드세요. 예를 들어 할 일 API를 만들 때 `@RequestMapping("/api/v1/tasks")`로 시작하면 됩니다.

## 모바일 앱 연결

모바일 프로젝트에서 환경 예시를 복사해 `.env.local`을 만들고, 실행 대상에 맞게 API 주소를 정합니다.

```powershell
cd ..\mobile
Copy-Item .env.example .env.local
```

| 실행 대상 | `EXPO_PUBLIC_API_URL` 예시 |
|---|---|
| Android 에뮬레이터 | `http://10.0.2.2:8080/api/v1` |
| Android 실기기 / Expo Go | `http://192.168.0.10:8080/api/v1` (개발 PC의 실제 LAN IP로 교체) |
| iOS 시뮬레이터 | `http://localhost:8080/api/v1` |
| Expo 웹 | `http://localhost:8080/api/v1` |

실기기와 개발 PC는 같은 Wi-Fi에 연결되어야 합니다. `localhost`는 휴대폰 자신을 뜻하므로 실기기에서는 PC의 LAN IP를 반드시 사용하세요. 개발용 HTTP 연결은 배포 전 HTTPS로 바꾸어야 합니다.

`EXPO_PUBLIC_` 환경 변수는 앱 번들에 포함되므로 비밀번호, API 비밀키, 토큰은 절대 넣지 마세요. 그런 값은 서버 환경 변수에만 둡니다.

## CORS

React Native 네이티브 앱에는 브라우저 CORS가 적용되지 않습니다. 다만 Expo 웹 개발을 위해 기본적으로 `http://localhost:8081`, `http://localhost:19006`만 `/api/**`에 허용했습니다. 다른 웹 개발 주소가 필요하면 서버 실행 환경에서 다음처럼 추가하세요.

```powershell
$env:APP_CORS_ALLOWED_ORIGINS = 'http://localhost:8081,http://localhost:19006'
.\gradlew.bat bootRun
```

배포 환경에서는 실제 웹 도메인만 명시하고, 쿠키 기반 인증을 도입할 때는 CORS의 `allowCredentials`와 허용 origin을 함께 재검토하세요.

## 다음 구현 순서

1. PostgreSQL 등 데이터베이스와 마이그레이션 도구를 선택해 연결
2. `Task`, `Place`, `SharedList`처럼 도메인별 패키지와 DTO 추가
3. 요청 DTO에 Bean Validation 적용
4. 인증 방식을 정한 뒤 SecureStore의 토큰 저장과 API 클라이언트 인증 헤더 연결

