---
name: portfolio-card
description: 이 포트폴리오(index.html의 Featured Projects 슬라이더)에 새 프로젝트 카드를 넣기 전에 계획서와 before/after 화면 모형을 만들고, 사용자가 승인하면 projects 배열에 카드를 반영한다. 생산·제조 도메인의 에이전틱·자동화 직무에 맞춰 문구·썸네일·라이브 데모 링크를 고른다. 사용자가 "포트폴리오 카드 추가", "새 프로젝트 카드", "카드 before-after", "제조 도메인 카드 올려줘", "/portfolio-card <프로젝트>"라고 할 때 사용. 첫 사례는 evol(가이드롤 생산 모니터링)이고, 근거는 evol 저장소의 portfolio-case-card 스킬 산출물(evol-case-brief.md)을 받는다.
---

# portfolio-card — 카드 계획 → before/after → (승인 후) 반영

## 단계와 게이트
| # | 단계 | 산출물 | 코드 수정 |
|---|---|---|---|
| 1 | 입력 확인 | 아래 입력표 채움 | 없음 |
| 2 | 계획서 | `<id>-card-plan.md`: 위치·필터·문구·이미지·링크 | 없음 |
| 3 | before/after 모형 | `<id>-before-after.html` (`template.html` 채움, 이미지 base64) | 없음 |
| **게이트** | 사용자가 "반영해" 라고 할 때까지 멈춤 | — | — |
| 4 | 반영 | `assets/images/`에 썸네일, `index.html`의 `projects`에 항목 | 있음 |
| 5 | 확인 | 로컬 정적 서버 + 브라우저 캡처(카드·모달·모바일 폭) | 없음 |

1~3단계 산출물은 세션 스크래치패드에 두고 SendUserFile로 전달한다.

## 1. 입력 (없으면 한 번에 하나씩 묻는다)
1. 프로젝트 케이스 브리프 — evol이면 evol 저장소 `/portfolio-case-card`의 `evol-case-brief.md`
2. 화면 캡처 — evol은 이 폴더 `assets/`에 있음:
   - `before-portfolio-home.webp` (현재 첫 화면, before 기준)
   - `evol-daily.webp` · `evol-period-month.webp` · `evol-period-week.webp` · `evol-compare-tab.png` (after 썸네일)
3. 참고 가이드 사진 — evol `docs/유지보수-가이드.md`·`.html` 3절 캡처(`docs/assets/screen-daily-2026-09-04.png`, `screen-period-month-2026-09.png`, `screen-period-week-2026-w36.png`)와 번호 표. 모달 설명 문장은 이 번호 표의 화면 항목 이름을 그대로 쓴다.
4. 라이브 데모 주소 — evol: **https://job-reduces-initial-indices.trycloudflare.com** (사용자 지정)
   - Cloudflare 임시 터널이라 바뀔 수 있다. 2단계와 4단계에서 `curl -s -o /dev/null -w "%{http_code}" -m 15 <주소>`로 확인한다. 이 셸에서 `000`이면 "확인 못 함"으로 적고 사용자에게 브라우저 확인을 부탁한다.
   - 주소가 바뀌면 사용자에게 VPS에서 `docker logs evol-quick-tunnel 2>&1 | grep -o 'https://[a-z0-9-]*\.trycloudflare\.com' | tail -1` 결과를 받아 `links`만 고친다.
5. 지원 공고(있으면) — 공고 단어로 kicker·stack 순서·impact 문장을 맞춘다.

## 이 사이트의 카드 구조 (index.html)
- 데이터: `const projects = [ … ]` (PROJECTS DATA 주석 아래). 키: `id, title, category, kicker, tagline, description, image | images | video | iframe, stack, design, problem, role, impact, links`.
- 카드 앞면: 미디어 + `kicker` + `title` + `description` + **`stack` 앞 4개**만.
- `images`가 여러 장이면 카드에서 3초 간격으로 바뀌지만, **모달에는 `images[0]`만 보인다** → 첫 장이 가장 설명력 있는 화면(evol은 일간 관제)이어야 한다.
- `category`는 공백 구분, 필터 버튼 `data-filter`와 같은 단어. 기존: architecture · ai · web · learning. 새 단어(`manufacturing`)는 버튼을 추가할 때만 의미 있다 → 2단계 계획서에서 사용자에게 묻는다.
- 순서 = 배열 순서. 제조 직무 지원 기간에는 evol을 **맨 앞**에 두는 안을 기본으로 제안한다.
- `kicker`에 "🏆" 또는 "Awarded"가 있으면 배지가 붙는다 — 수상 이력이 아니면 쓰지 않는다.
- `iframe` 미디어도 되지만 임시 터널 페이지를 카드 안에 띄우면 느리고 주소가 바뀌면 빈 칸이 된다 → 라이브 데모는 `links`로, 미디어는 캡처 `images`로.

## 2. 계획서 내용
| 항목 | 정할 것 |
|---|---|
| 위치 | 배열 몇 번째 (기본 0번) |
| 필터 | 기존 단어만 / `Manufacturing` 버튼 추가 |
| 문구 | kicker · tagline · description(숫자 1개) · design/problem/role/impact 각 3~5줄 |
| 에이전틱 근거 | role·impact에 "직접 만든 AI 에이전트 작업 스킬로 원인 확인→승인→배포→보고 자동화" 1줄 이상 |
| 이미지 | 파일명 · 순서 · 용량(장당 200KB 이하 권장, 넘으면 webp로) |
| 링크 | 라이브 데모(임시 주소) · 유지보수 가이드 · GitHub(공개 여부 확인, 비공개면 링크 대신 가이드 사본) |

## 3. before/after 모형
- `template.html`의 `{{…}}`를 모두 채운다. 스크립트 없음, CSS만. 끝나면 `grep -c "{{" 파일` = 0.
- before: `before-portfolio-home.webp` + 지금 문제 3가지.
- after: evol 카드가 앞에 들어간 슬라이더, 모달(썸네일 4장·4탭 요약·라이브 데모 버튼).
- 직무 키워드 ↔ 근거 표, "10초 안에 읽을 3줄", 공개 전 점검표.

## 4. 반영 (게이트 통과 후)
1. 썸네일을 `assets/images/evol-*.{webp,png}`로 복사.
2. `projects` 배열에 항목 추가. 기존 항목 문구는 건드리지 않는다.
3. 필터 버튼을 추가하기로 했으면 `project-toolbar`에 `<button type="button" class="filter" data-filter="manufacturing">Manufacturing</button>`.
4. `sitemap.xml`·README는 바꿀 필요가 있을 때만.

## 5. 확인
- `python3 -m http.server 8080` → Playwright(Chromium 설치돼 있음)로 1280px·390px 캡처: 카드 보임, 클릭 시 모달, 링크 4개 동작, 콘솔 에러 0.
- 캡처를 사용자에게 보내고, 커밋·푸시는 사용자가 원할 때만.

## 공개 전 점검
- [ ] 캡처에 고객·공장 실명, 키, 내부 경로 없음(evol 캡처는 "예시포트폴리오 / 운영 데이터 NN" 표기)
- [ ] 모든 숫자에 출처(브리프·가이드·배포 기록)
- [ ] 라이브 데모 주소 상태 표시
- [ ] evol 외부 공개 승인 기록 상태(evol `docs/history/2026-10-02 예시포트폴리오 공개 배포 기록.md` "남은 일 1")
