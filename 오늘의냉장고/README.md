<div align="center">

# 🥬 오늘의 냉장고 (Today's Fridge)

### 개인화 추천과 AI 기술을 결합한 스마트 레시피 플랫폼

**[todayfridge.com](http://todayfridge.com)** &nbsp;·&nbsp; [백업 URL](https://today-fridge-frontend-deploy.vercel.app/)

<p>
  <img src="https://img.shields.io/badge/JDK-17-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white" />
  <img src="https://img.shields.io/badge/Spring_Boot-3.x-6DB33F?style=for-the-badge&logo=springboot&logoColor=white" />
  <img src="https://img.shields.io/badge/Next.js-16.2-111111?style=for-the-badge&logo=nextdotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/React-18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/FastAPI-Python_3.10-009688?style=for-the-badge&logo=fastapi&logoColor=white" />
  <img src="https://img.shields.io/badge/PostgreSQL-pgvector-336791?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/Redis-Cache_+_JWT-DC382D?style=for-the-badge&logo=redis&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
</p>

</div>

---

## 📖 목차

1. [프로젝트 소개](#-프로젝트-소개)
2. [주요 기능](#-주요-기능)
3. [시스템 아키텍처](#-시스템-아키텍처)
4. [AI / ML 기능 상세](#-ai--ml-기능-상세-model-폴더-분석)
5. [🎯 특별 테마 — 인증 & 쇼핑 연동 (BE × FE)](#-특별-테마--인증--쇼핑-연동-be--fe)
6. [역할 분담](#-역할-분담)
7. [로컬 설치 방법](#️-로컬-설치-방법)
8. [트러블슈팅](#-트러블슈팅)
9. [고도화 계획](#-고도화-계획)

---

## 🥗 프로젝트 소개

> **"오늘 냉장고에 뭐 있지?" 라는 질문에서 시작한 프로젝트.**

`오늘의 냉장고`는 사용자의 냉장고 식재료를 **AI 비전(YOLO·OCR)** 으로 인식하고,
남은 재료·영양 상태·알레르기·취향을 종합 분석해 **하이브리드 추천(키워드 + 임베딩) + LLM 설명**으로
오늘 만들 수 있는 최적의 레시피를 제안하는 종합 푸드테크 플랫폼입니다.

부족한 재료는 **쿠팡 / 네이버 / 11번가** 실시간 최저가 검색으로 바로 구매 동선까지 연결합니다.

### 한 줄 요약

| | |
|---|---|
| 🎯 핵심 가치 | "냉장고 → 식단 → 건강 → 장보기"의 **음식 라이프사이클** 통합 |
| 👤 타깃 사용자 | 1인 가구, 식비/식자재 관리에 관심 있는 사용자, 건강 식단 관심층 |
| 🧠 핵심 기술 | YOLO 비전 · PaddleOCR · MiniLM 임베딩 · Ollama/Gemini LLM · 하이브리드 추천 |
| 🏗️ 기술 구조 | **Spring Boot (메인 BE)** + **FastAPI (AI 서버)** + **Next.js 16 (FE)** + Redis + PostgreSQL+pgvector |

---

## ✨ 주요 기능

| 도메인 | 기능 | 설명 |
|---|---|---|
| 🧊 **냉장고** | 식재료 CRUD · 이미지 등록 | 카메라/갤러리에서 사진을 업로드하면 AI가 자동으로 식재료를 식별하고 카테고리·유통기한을 채워줌 |
| 🍳 **레시피** | 하이브리드 추천 · 상세 페이지 | 보유 재료 매칭률 + 의미 유사도 + 사용자 조건(알러지/취향)을 합산해 점수화 |
| 🥗 **식단/건강** | 식사 기록 · 영양 리포트 | 매끼 기록 → BMI/일일 영양소 분석 → LLM 기반 자연어 건강 리포트 생성 |
| 💬 **커뮤니티** | 게시글/좋아요/팔로우/신고 | 레시피 후기 공유, 신고 누적 자동 비공개, 팔로우 피드 |
| 🤖 **챗봇** | 의도 파싱 + 도메인 라우팅 | "내일 점심 추천해줘" → 의도 분류 → 적절한 도메인 서비스 호출 |
| 🛒 **쇼핑 연동** | 쿠팡·네이버·11번가 실시간 최저가 | 부족한 재료를 키워드로 일괄 검색, Redis 1시간 캐시 |
| 🔐 **인증** | JWT(Access/Refresh) + Redis · 카카오 OAuth · 이메일 인증 | 블랙리스트 로그아웃 / 토큰 로테이션 / 24h 이메일 토큰 |

---

## 🏗️ 시스템 아키텍처

```
┌──────────────────────────┐         ┌──────────────────────────────┐
│  Next.js 16 (App Router) │ ──API──▶│  Spring Boot 3 (메인 API)    │
│  React 18 + Tailwind v3  │         │  - 인증/세션/도메인 비즈니스  │
│  AuthContext / axios     │ ◀─쿠키─ │  - JWT + Redis Blacklist     │
└────────┬─────────────────┘         │  - 추천 점수 계산/하이브리드  │
         │                            │  - 쿠팡/네이버/11번가 클라이언트│
         │ (이미지 업로드 PHP 경유)   └───────┬──────────────────────┘
         ▼                                    │
   ┌──────────────┐               ┌───────────▼──────────┐    ┌────────────────┐
   │  PHP upload  │               │  Redis               │    │ PostgreSQL +   │
   │  (정적 호스팅)│               │  - JWT Refresh 세션  │    │ pgvector       │
   └──────────────┘               │  - Email Verify TTL  │    │ - 레시피/임베딩│
                                  │  - 가격 1h 캐시      │    │ - 사용자/식재료│
                                  └───────────┬──────────┘    └────────────────┘
                                              │
                                  ┌───────────▼──────────────┐
                                  │  FastAPI (AI/ML 서버)     │
                                  │  - YOLO 이미지 분류       │
                                  │  - PaddleOCR 포장 식품    │
                                  │  - SentenceTransformer    │
                                  │  - Ollama gemma2 (로컬)   │
                                  │  - Gemini 3.1 flash-lite  │
                                  └──────────────────────────┘
```

---

## 🧠 AI / ML 기능 상세 (`model/` 폴더 분석)

FastAPI 서버는 **비전 · NLP · LLM** 세 축의 AI 모델을 호스팅합니다.
Spring Boot는 도메인 로직을 처리하고, 무거운 AI 추론은 FastAPI로 위임하는 **마이크로서비스 분리** 구조입니다.

### 1️⃣ 이미지 라우팅 분류기 (YOLO-cls)

- **위치:** `model/app/models/img2class/ingredientRouteClassifier.py` (`best.pt` 사용)
- **모델:** Ultralytics YOLOv8 classification
- **역할:** 업로드 이미지가 **`raw_ingredient`(생재료) / `packaged_food`(포장식품) / `other`(기타)** 중 무엇인지 1차 분기
- **연동 기능:** 식재료 등록 — 카테고리에 따라 후속 파이프라인을 자동 선택
  - `raw_ingredient` → 생재료 분류기로 전달
  - `packaged_food` → OCR로 전달
  - `other` → 사용자 수동 입력 유도

### 2️⃣ 생재료 분류기 (Raw Ingredient Classifier)

- **위치:** `model/app/models/ingredient/rawIngredientClassifier.py` (`weights/raw_ingredient_best.pt`)
- **모델:** YOLO 기반 multi-class classifier (한국 공개 데이터셋 + Fruits360 + 자체 수집)
- **역할:** 사과, 양파, 대파 등 **생재료 구체 품목**까지 식별
- **데이터 자산:** `data/ingredient_normalized_vocab.json`, `model_label_to_master.json` — DB의 `ingredient_master` 테이블과 정규화 매핑
- **연동 기능:** 냉장고 식재료 자동 등록 — 인식 결과를 `ingredient_master_id`로 매핑

### 3️⃣ 광학 문자 인식 OCR (포장 식품)

- **위치:** `model/app/models/ocr/packagedFoodOcr.py`
- **모델:** PaddleOCR (한국어/영어)
- **역할:** 포장 식품 라벨에서 텍스트 추출 → 상품명 후보 추출
- **노이즈 필터링:** 영양정보(g, kcal, % 등), 인증 마크, 가격 문자열 등을 제거
- **연동 기능:** 라면/우유/소스 등 포장 제품 자동 등록

### 4️⃣ 텍스트 임베딩 / 시맨틱 검색

- **위치 (Py):** `model/app/services/embedding_service.py`
- **위치 (Java):** `server/.../embedding/service/RecipeEmbeddingSearchService.java`
- **모델:** `sentence-transformers/all-MiniLM-L6-v2` (384차원)
- **저장:** PostgreSQL **pgvector** 확장 (`recipe_embedding` 테이블)
- **역할:** "달콤한 한식 반찬", "매콤 국물" 같은 자연어 쿼리 → 의미 유사도 기반 레시피 검색
- **연동 기능:** 추천 시스템의 **하이브리드 랭킹** 핵심 — 매칭률 + 임베딩 + 태그 점수 합산

### 5️⃣ LLM 기반 추천 이유 설명

- **위치:** `model/app/services/recommendation_explanation_service.py`, `ollama_service.py`, `gemini_service.py`
- **모델 (1차):** 로컬 **Ollama `gemma2`** — 비용 0, 데이터 외부 유출 없음
- **모델 (Fallback):** **Google Gemini 3.1 flash-lite** — 로컬 실패/오버로드 시 자동 폴백
- **호출 지점:** Java `RecommendationService#attachLlmExplanationToTopN` — 상위 3개에만 호출 (비용 최적화)
- **역할:** "왜 이 레시피인가?"를 사용자 친화적인 한국어로 설명
  > 예) *"냉장고에 있는 두부와 양파를 활용할 수 있고, 저염 조건에도 부합해요."*

### 6️⃣ LLM 응용 — 추가 기능들

| 라우트 | 기능 | LLM 활용 |
|---|---|---|
| `routes/substitution_llm.py` | **대체재 추천** | "두부가 없으면 → 계란/순두부" + LLM이 자연어로 사유 설명 |
| `routes/shopping_explain.py` | **쇼핑 추천 사유** | "왜 이 상품인가" (가격/배송/리뷰) 자연어 코멘트 |
| `routes/meal_recommendation.py` | **식사 추천** | 영양 부족분 분석 후 다음 끼니 LLM 큐레이션 |
| `routes/health_report.py` | **건강 리포트** | 일/주/월 영양 패턴 → Gemini JSON 모드로 구조화된 리포트 생성 |
| `routes/recipe_tag.py` | **레시피 태그 자동 부여** | 양념/조리법/특징 태그를 LLM이 분류 |
| `Prompt/MealAnalysis.py` | 식사 분석 프롬프트 템플릿 | 영양·조리법·재료 패턴 분석 |

### 7️⃣ 알레르기 / 건강 조건 필터링 (Spring Boot 측)

- **위치:** `server/.../recommendation/service/AllergyFilterService.java`
- **역할:** 사용자 `UserCondition`(알러지/저염/고단백 등) ↔ `RecipeConditionMap` 매핑
- **동작:** 하드 필터 + 추천 점수 조정 — 위험 알러지는 결과에서 제외, 선호 조건은 +가산점

---

## 🎯 특별 테마 — 인증 & 쇼핑 연동 (BE × FE)

> 본 프로젝트의 **인증·쇼핑 연동 모듈**은 7가지 흐름(회원가입 / 이메일 인증 / 로그인 / 카카오 OAuth / 로그아웃 / 토큰 갱신 / 쇼핑 검색)을 **하나의 통합 보안 체계**로 설계했습니다.
> 모든 흐름이 **Redis 중앙 집중**으로 모이도록 통일된 점이 특징입니다.

### 🔑 설계 원칙

1. **HttpOnly 쿠키** 기반 JWT — XSS 토큰 탈취 방어
2. **Redis 단일 진실 공급원(Single Source of Truth)** — 세션, 블랙리스트, 이메일 토큰, 가격 캐시 모두 통합
3. **이중 저장(전환기)** — 기존 DB 토큰 + Redis 토큰 병행으로 무중단 마이그레이션
4. **이커머스 멀티 소싱** — 1곳이 실패해도 나머지로 폴백

### 1. 회원가입 — `POST /api/v1/auth/signup`

```
[Frontend]  signup/page.jsx → signupApi() → axios POST
              ↓
[Backend]   AuthController#signup
              ├─ UserService.signup()          // 중복 검사 + BCrypt 해싱 + 저장
              └─ RedisEmailVerifyService       // UUID 토큰 생성 + Redis SET (TTL 24h)
                   ↓
              EmailService.sendVerificationEmail()  // SMTP (Gmail)
```

- **검증 (Frontend):** loginId 정규식, password 강도 미터, 이메일 형식, 닉네임 길이, 실시간 아이디 중복 확인 (`checkLoginIdApi`)
- **검증 (Backend):** `@Valid SignupRequest` + 비즈니스 예외 (`DUPLICATE_LOGIN_ID`, `DUPLICATE_EMAIL`)
- **저장:** PostgreSQL `users` + Redis `email:verify:{token} → loginId` (TTL 24h)

### 2. 이메일 인증 — `GET /api/v1/auth/verify-email?token=...`

```
[메일링크 클릭]
   ↓
[Backend]  redisEmailVerifyService.verifyToken(token)
              ├─ Redis GET email:verify:{token}
              ├─ ✅ 존재 → user.verifyEmail() + Redis DEL (일회용)
              └─ ❌ 없음 → DB 토큰 fallback (전환기 호환)
   ↓
[Redirect]  frontendBaseUrl + "?emailVerified=true"
   ↓
[Frontend]  LoginButton: URL 파라미터 감지 → "이메일 인증 완료" 메시지 표시
```

- **TTL:** 24시간 (이후 자동 만료)
- **일회용:** 인증 성공 시 즉시 Redis 키 삭제 → 재사용 차단
- **재발송:** `POST /resend-verification` — 기존 토큰 invalidate 후 신규 발급

### 3. 일반 로그인 — `POST /api/v1/auth/login`

```
[Frontend]  LoginButton.handleLogin → loginApi(loginId, pw)
              ↓
[Backend]   AuthController#login
              ├─ AuthService.authenticate()   // BCrypt 검증
              ├─ user.emailVerified 검사      // 미인증이면 EMAIL_NOT_VERIFIED
              ├─ JwtProvider.createAccessToken (15분 ~ 1시간)
              ├─ JwtProvider.createRefreshToken (7일 ~ 14일)
              ├─ AuthService.createSession()  // Redis HASH: session:{loginId}
              └─ Set-Cookie (HttpOnly, Secure, SameSite=Lax, Path=/)
   ↓
[Frontend]  AuthContext.login() → getMeApi() → sessionStorage 캐시 → router.replace("/dashboard")
```

- **쿠키 속성:** `HttpOnly` + `Secure`(운영) + `SameSite=Lax` — 모두 `JwtProvider#createTokenCookie`에서 일괄 관리
- **자동 갱신:** axios 인터셉터 → 401 응답 시 `/refresh` 호출 → 실패 시 `auth:unauthorized` 이벤트 → AuthContext가 강제 로그아웃

### 4. 카카오 소셜 로그인 — `GET /api/v1/auth/kakao/login`

```
[Frontend]  "카카오로 로그인" 버튼 클릭
              ↓ window.location.href = `${apiBase}/v1/auth/kakao/login`
[Backend]   AuthController#kakaoLogin
              └─ 302 → https://kauth.kakao.com/oauth/authorize?client_id=...
                                                 ↓
                       사용자 카카오 동의화면
                                                 ↓ ?code=xxx 콜백
[Backend]   AuthController#kakaoCallback
              ├─ KakaoOAuthService.getKakaoAccessToken(code)
              ├─ getKakaoUserProfile() → KakaoUserProfile{ kakaoId, email, nickname, profileImageUrl }
              ├─ findOrCreateUser()
              │     ├─ loginId="kakao_{kakaoId}" 존재 → 기존 반환
              │     ├─ 동일 이메일 일반 계정 존재 → 계정 연동
              │     └─ 신규: User.createFromKakao(...) + 닉네임 중복 처리
              ├─ JWT 발급 + setTokenCookies
              └─ 302 → frontend/dashboard?kakaoLogin=success&loginId=...&nickname=...
   ↓
[Frontend]  AuthContext useEffect — URL 파라미터 감지 → login(loginId, "kakao", nickname)
```

- **계정 연동:** 동일 이메일의 일반 계정이 있으면 자동 연동
- **닉네임 충돌:** `_k` suffix → 그래도 충돌 시 `카카오_{kakaoId}` 폴백
- **에러 처리:** 사용자 동의 거부 / 토큰 발급 실패 → `/login?error=true`로 리다이렉트

### 5. 로그아웃 — `POST /api/v1/auth/logout`

```
[Frontend]  LogoutButton → logoutApi() → AuthContext.logout()
              ↓
[Backend]   AuthController#logout
              ├─ 쿠키에서 accessToken, refreshToken 추출
              ├─ getRemainingMs(accessToken)              // 남은 만료시간 계산
              ├─ AuthService.invalidateSession(...)
              │     ├─ Redis SET blacklist:{jwt} (남은 TTL만큼)  // 블랙리스트
              │     └─ Redis DEL session:{loginId}              // 세션 제거
              └─ Set-Cookie Max-Age=0 (쿠키 즉시 삭제)
   ↓
[Frontend]  sessionStorage 비우기 → window.location.href = "/"
```

- **블랙리스트:** Access Token이 만료되지 않았어도 `blacklist:{token}` 존재 시 인증 실패
- **TTL 최적화:** 블랙리스트 키 TTL = 토큰 잔여 시간 → Redis 메모리 자동 정리
- **모든 탭 동기화:** 401 인터셉터 + `auth:unauthorized` 커스텀 이벤트로 멀티 탭 강제 로그아웃

### 6. 쇼핑 연동 — `/api/v1/shopping/*`

쇼핑 모듈은 **인증과 동일한 Redis 중심 설계**를 가격 캐시에 적용한 것이 특징입니다.

```
[Frontend]                              [Backend]                       [External]
recipe/[id] 페이지                       ShoppingController              Naver Shopping
   │  - MissingIngredientsPrices.jsx        │                              Coupang Partners
   │  - 식재료/대체재 가격 카드             │                              11번가 Open API
   ↓                                        ↓                                ↑
shoppingApi.getMissingIngredientsPrices(id)                                  │
   ──────────────────────────────────▶  recipeService.getRecipe()            │
                                       sufficiency=MISSING|NOT_ENOUGH 필터  │
                                                ↓                            │
                                       ShoppingService3.searchByKeyword()    │
                                       ├─ Redis GET price:{keyword}          │
                                       ├─ MISS → 병렬 호출 ────────────────▶│
                                       │   Naver + Coupang + 11번가          │
                                       ├─ 최저가 1개 선정                    │
                                       └─ Redis SET price:{keyword} TTL=1h   │
                                                ↓
                                       IngredientPriceResponse
   ◀────────────────────────────────────  (상품명, 가격, 이미지, 링크)
```

- **인증 정책:**
  - 로그인 필요: `/fridge/prices`, `/recipes/{id}/missing-ingredients-prices` (개인 냉장고 의존)
  - 로그인 불필요: `/search?keyword=`, `/substitutes/prices` (랜딩/탐색)
- **외부 API 클라이언트:** `external/naver/NaverShoppingClient`, `external/coupang/CoupangShoppingClient`, `external/elevenst/ElevenStShoppingClient` — 어댑터 패턴으로 통일된 `ShoppingItemDto` 반환
- **LLM 코멘트:** `ShoppingExplainClient` → FastAPI `routes/shopping_explain.py` → "가성비 좋고 빠른 배송" 같은 자연어 추천 사유
- **Frontend 컴포넌트:** `components/recipe/MissingIngredientsPrices.jsx` — 부족 재료별 카드 + 외부 링크 새 탭으로 이동

### 📊 7개 흐름을 관통하는 공통 인프라

| 인프라 | 적용 흐름 |
|---|---|
| **Redis** | 회원가입(이메일 토큰) · 로그인/로그아웃(세션·블랙리스트) · 토큰 갱신(로테이션) · 쇼핑(1h 가격 캐시) |
| **JWT (HttpOnly Cookie)** | 일반 로그인 · 카카오 로그인 · 모든 보호 API 호출 |
| **글로벌 예외 처리** | `ErrorCode` enum + `GlobalExceptionHandler` — 모든 인증/쇼핑 에러를 일관된 `ApiResponse{success, code, message}`로 반환 |
| **axios 인터셉터** | 401 일괄 처리 + 자동 토큰 갱신 시도 + 실패 시 로그아웃 이벤트 발행 |

---

## 👥 역할 분담

| 성함 | 담당 기능 |
|---|---|
| **신재용** [PM] | OCR 텍스트 인식, 레시피 크롤링 및 수집, 1차 식재료 이미지 인식 |
| **한수정** | 추천 시스템 설계, 개인화 추천, 챗봇 |
| **김정호** | 레시피 상세 페이지, 영양 분석 리포트, 식단 관리 |
| **정경안** | 커뮤니티 기능, 좋아요 및 신고 |
| **장민재** | 식재료 CRUD, 2차 식재료 이미지 인식, 유통기한/카테고리 처리 |
| **임동주** | 마이페이지, 알림 기능, 홈화면 대시보드 |
| **민예린** | 쇼핑 링크 연동, JWT 로그인 및 인증, 소셜 로그인 |

---

## ⚙️ 로컬 설치 방법

### 1. 클론
```bash
git clone -b dev https://github.com/FoggyCaligo/project_final_frontend.git   # Frontend
git clone -b dev https://github.com/FoggyCaligo/project_final_backend_1.git  # Spring Boot
git clone -b dev https://github.com/FoggyCaligo/project_final_backend_2.git  # FastAPI
```

### 2. `.env` 작성 (Spring Boot)
```dotenv
SPRING_DATASOURCE_URL=
SPRING_DATASOURCE_USERNAME=
SPRING_DATASOURCE_PASSWORD=

SPRING_REDIS_HOST=
SPRING_REDIS_PORT=

MAIL_USERNAME=
MAIL_PASSWORD=
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_SMTP_AUTH=true
MAIL_SMTP_STARTTLS_ENABLE=true
MAIL_SMTP_STARTTLS_REQUIRED=true
MAIL_FROM=

KAKAO_REDIRECT_URI=
FRONTEND_BASE_URL=
NEXT_PUBLIC_API_BASE_URL=
```

### 3. 실행
```bash
# Frontend
npm install
npm run dev

# Spring Boot
./gradlew bootRun
# 또는 IDE에서 TodayFridgeApplication.java 실행

# FastAPI (AI 서버)
# macOS / Linux
python3.10 -m venv .venv && source .venv/bin/activate && pip install -r requirements.txt
# Windows (PowerShell)
py -3.10 -m venv .venv; .\.venv\Scripts\Activate.ps1; pip install -r requirements.txt

uvicorn app.main:app --reload
```

브라우저에서 `http://localhost:3000` 접속.

---

## 🔧 트러블슈팅

### 1. Next.js 프론트엔드 캐싱으로 인한 Redis 세션 불일치 및 강제 로그아웃 이슈
- **문제:** 리포트 데이터 캐싱 시, 세션 ID가 포함된 헤더가 오염되거나 세션 연장 요청이 차단되어 Redis 세션이 만료
- **해결:** 추가 테이블을 작성하여 캐싱되어 있던 정보를 PostgreSQL 데이터베이스로 이전

### 2. (예정) 외부 쇼핑 API 레이트 리밋 — Redis 1시간 캐시 + 키워드별 디바운스로 대응

### 3. (예정) Ollama gemma2 응답 지연 — Gemini Flash Lite 자동 폴백 + Top-N(3개)만 호출하여 비용/지연 최소화

---

## 🚀 고도화 계획

- [ ] **레시피 임베딩 자동 재인덱싱** — pgvector + 백오피스 배치
- [ ] **음성 입력 챗봇** — Whisper STT + 의도 파서 통합
- [ ] **냉장고 공유** — 1인 가구 외 가족 단위 다중 사용자
- [ ] **알림 푸시** — 유통기한 임박 / 추천 갱신 / 커뮤니티 활동
- [ ] **A/B 테스트** — 추천 가중치(매칭/임베딩/태그) 사용자 그룹별 학습

---

<div align="center">

Made with 🥕 by **Team 오늘의 냉장고**

</div>
