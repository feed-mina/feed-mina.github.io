---
name: portfolio-card
description: 이 포트폴리오(index.html)의 Featured Projects 카드 3장·"전체 프로젝트 더 보기" 목록·제조 × AI 띠·manufacturing-ai 사례 페이지에 새 프로젝트를 넣기 전에 계획서와 before/after 화면 모형을 만들고, 사용자가 "반영해" 라고 하면 index.html(과 필요 시 manufacturing-ai/index.html)에 반영한다. 생산·제조 도메인의 에이전틱·자동화 직무에 맞춰 문구·썸네일·라이브 데모 링크를 고른다. 사용자가 "포트폴리오 카드 추가", "새 프로젝트 카드", "카드 before-after", "제조 도메인 카드 올려줘", "카드 올려줘", "/portfolio-card <프로젝트>"라고 할 때 사용. 사례 2건 — evol(가이드롤 생산 모니터링, 2026-10-05)과 Factory AI Copilot(제조 Agentic AI 샘플, 2026-10-06).
---

# portfolio-card — 카드 계획 → before/after → (승인 후) 반영

## 단계와 게이트
| # | 단계 | 산출물 | 코드 수정 |
|---|---|---|---|
| 1 | 입력 확인 | 아래 입력표 채움 | 없음 |
| 2 | 계획서 | `<id>-card-plan.md`: 위치·문구·이미지·링크·범위 밖 | 없음 |
| 3 | before/after 모형 | `<id>-before-after.html` (`template.html` 채움, 이미지 base64) | 없음 |
| **게이트** | 사용자가 "반영해" 라고 할 때까지 멈춤. 자리 결정(교체/추가)이 필요하면 선택지 2개 + 권장안으로 묻는다 | — | — |
| 4 | 반영 | `assets/images/` 썸네일, `index.html` Featured 카드·`projects`·`FEATURED`·"더 보기 N개", (합의했으면) 띠·사례 페이지 | 있음 |
| 5 | 확인 | 로컬 정적 서버 + Chromium 1280px·390px 캡처, 콘솔 에러 0 | 없음 |
| 6 | 커밋·PR | `claude/…` 브랜치에 커밋 → 푸시 → 초안 PR → 구독. 머지는 사용자 | — |

1~3단계 산출물은 세션 스크래치패드(`scratchpad/card/`)에 두고 SendUserFile 로 전달한다. 한 조각은 20분 안쪽으로 끊는다 — 띠·사례 페이지가 같이 필요하면 **별도 조각**으로 제안만 하고 다음 PR 로 돌린다.

## 1. 입력 (없으면 결과가 달라지는 것만 한 번에 하나씩 묻는다)
1. **근거 문서** — 숫자의 출처가 되는 README·설계 문서·테스트 결과. evol 은 evol 저장소 `/portfolio-case-card` 의 `evol-case-brief.md`, Factory AI Copilot 은 `jarvis-factory-copilot-portfolio/samples/factory-copilot/README.md` + 테스트 출력.
2. **화면 캡처** — 없으면 로컬에서 띄워 Playwright 로 찍는다(`executablePath: /opt/pw-browsers/chromium`). 1280px 대표 화면 1장 + 첫 화면 1장 + 모바일 1장이면 충분. webp 로 장당 100KB 안쪽.
   - evol 캡처는 이 폴더 `assets/` 에 있음: `before-portfolio-home.webp` · `evol-daily.webp` · `evol-period-month.webp` · `evol-period-week.webp` · `evol-compare-tab.png`
3. **라이브 데모 주소** — 이 셸은 `workers.dev`·`trycloudflare.com` 접속이 막혀 `curl` 이 `000` 을 돌려준다. 계획서에 "사용자 확인에 근거" 라고 적고 브라우저 확인을 부탁한다. 사용자가 "배포 됐어" 라고 하면 그것이 근거다.
   - evol 은 Cloudflare 임시 터널이라 바뀔 수 있다. 바뀌면 사용자에게 VPS 에서 `docker logs evol-quick-tunnel 2>&1 | grep -o 'https://[a-z0-9-]*\.trycloudflare\.com' | tail -1` 결과를 받아 링크만 고친다.
4. **GitHub 공개 여부** — 비공개면 링크 대신 공개 사본·가이드 사본. 사본에 회사 식별자(회사명·실명·배포 주소·DB ID·이메일)가 없는지 먼저 확인.
5. 지원 공고(있으면) — 공고 단어로 kicker·stack 순서·impact 문장을 맞춘다.

## 이 사이트의 실제 구조 (index.html · 2026-10-06 기준)

**필터 버튼·슬라이더·모달은 없다.** 다음 네 곳이 전부다.

| 곳 | 위치 | 무엇이 보이나 |
|---|---|---|
| **Featured 카드 3장** | `#projects` 안 `<div class="cases">` 의 손으로 쓴 `.case` 블록 3개 | 이미지(링크) · `tag`(`01 · 제조 센서 데이터`) · `h3` 한 줄 결론 · `문제` · `결과` · `m`(숫자 1줄, 민트색 모노) · `ln`(버튼 2개 + 상태 `st`) |
| **"전체 프로젝트 N개 더 보기"** | `<details class="more">` + `renderMoreProjects()` | `projects` 배열 중 `FEATURED` 집합에 **없는** 항목을 **`title` + `links[0]`** 만 한 줄씩 |
| **제조 × AI 띠** | `#manufacturing` 의 `.mfg-band` `<ol>` | `n`(번호) · 한 줄 · `s`(상태: 해결/현장 확인/데모/구현/라이브). 소개 문구에 "다섯 가지" 처럼 개수가 박혀 있다 |
| **사례 페이지** | `manufacturing-ai/index.html` `#case-N` 섹션 | `case-k` + `status` · `h2` · `body` · `flow`(5단계, `gate` 로 멈춤 지점) · `two`(`box ok` 지킨 것 / `box` 정확히 말하면) · `actions` |

`projects` 배열(`const projects = [`)의 키는 `id, title, category, kicker, tagline, description, image|images, stack, design, problem, role, impact, links` 지만 **홈에서 읽는 것은 `id`·`title`·`links[0]` 뿐**이다. 나머지는 기록용이라 채우되, 문구의 "정답" 은 Featured 카드와 사례 페이지에 둔다.

- `.cases` 는 3열 격자. **4장째를 더하면 한 장이 혼자 다음 줄로 떨어진다** → 기본안은 **라이브가 없는 카드 1장을 교체**하고 교체된 것은 `projects` 배열에 그대로 남겨 "더 보기" 로 내리는 것. 4장 추가는 격자 CSS 까지 손대는 별도 결정.
- 교체하면 `FEATURED` 집합(`new Set([...])`)과 `<summary>전체 프로젝트 N개 더 보기</summary>` 의 N 을 같이 고친다.
- Featured 블러브 "직접 만들고 고친 것 **세 가지**", 띠 "사례 **다섯 가지**", 사례 페이지 lede·meta description·"**다섯** 사례에서 반복한 일하는 방식" — 개수 단어가 세 곳에 박혀 있으니 더할 때 같이 바꾼다.
- 상태 라벨(`st`·`s`)은 사실만: `라이브`(사용자 배포 확인) · `코드 공개` · `데모` · `구현` · `현장 확인`.
- `kicker` 에 "🏆"·"Awarded" 는 수상 이력일 때만.
- 상세 페이지가 있으면 `.case` 의 두 번째 버튼을 `상세 →`/`케이스 →` 로(예: `evol-case-study.html`, `planning-harness.html`).
- 상단 nav 의 `href` 가 `#` 로 시작하지 않는 링크(`manufacturing-ai/`)는 `setupNavSpy()` 가 건너뛴다(2026-10-06 수정). nav 에 항목을 더할 때 이 규칙을 지킨다.

## 2. 계획서 내용 (`<id>-card-plan.md`)
| 항목 | 정할 것 |
|---|---|
| 위치 | 교체할 Featured 번호(기본: 라이브 없는 카드) / 4장 추가 / 더 보기만. 교체 근거 한 줄 |
| Featured 문구 | `tag`(NN · 분야) · `h3`(한 줄 결론, 12자 안팎) · 문제 2문장 · 결과 2문장 · `m`(숫자 3개 이하) · 버튼 2개 라벨 · 상태 |
| `projects` 항목 | id · title · kicker · tagline · description · stack · design/problem/role/impact 각 3~4줄 · links(첫 번째가 "더 보기" 에 보임) |
| 에이전틱 근거 | role·impact 에 "직접 만든 AI 에이전트 작업 스킬(fix-guide·easy-guide 등)로 가이드 → 승인 → 구현 → 검증 순서" 1줄 이상 |
| 이미지 | 파일명(`assets/images/<id>-*.webp`) · 순서(첫 장이 Featured 에 보임) · 용량 |
| 링크 | 라이브 데모(primary) · GitHub(공개 폴더 경로까지) · 상세/가이드 |
| 범위 밖 | 띠 N행 · 사례 페이지 Case NN · nav — 같이 할지 다음 조각으로 돌릴지 |
| 공개 전 점검 | 캡처에 실명·키·내부 경로 없음 / 숫자 출처 / 라이브 상태 / 공개 승인 기록 |

## 3. before/after 모형 (`<id>-before-after.html`)
- `template.html` 을 복사해 `{{…}}` 를 전부 채운다. 스크립트 없음, CSS 만. 끝나면 `grep -c "{{" 파일` = 0. 이미지는 base64 data URI (파일 1개로 전달).
- **before**: 현재 `#projects` 캡처(Playwright 로 `#projects` 요소만) + 지금 문제 3가지.
- **after**: Featured 3장 축약(새 카드는 `pcard new` 로 강조) + "더 보기" 항목 전체 문구(tagline · 썸네일 3장 · 설계/Problem/Role/Impact 1줄씩 · 버튼 2개).
- 직무 키워드 ↔ 근거 표, "10초 안에 읽을 3줄", 공개 전 점검표.
- 모형과 계획서를 SendUserFile 로 보내고 **멈춘다**. 자리 결정이 남아 있으면 선택지 2개 + 권장안.

## 4. 반영 (게이트 통과 후)
1. 썸네일을 `assets/images/<id>-*.webp` 로 복사.
2. `index.html`: Featured `.case` 블록 교체(또는 추가) → `projects` 배열 0번째에 항목 추가 → `FEATURED` 갱신 → "더 보기 N개" 갱신. **기존 항목 문구는 건드리지 않는다.**
3. (합의했을 때만) 띠 `<ol>` 에 `<li>` 1줄 + "N 가지", `manufacturing-ai/index.html` 에 `#case-N` 섹션 + 목차 + 개수 단어 + "일하는 방식" 출처 + 숫자 출처 1줄.
4. `sitemap.xml`·README 는 새 페이지를 만들었을 때만.

## 5. 확인
```sh
cd feed-mina.github.io && python3 -m http.server 8089 &
node verify.cjs   # Playwright: executablePath /opt/pw-browsers/chromium, 모듈은 /home/user/work-cycle/node_modules/playwright
```
- 1280px·390px 에서 `#projects` 캡처: 카드 3장 `tag` 순서, 새 카드 이미지 `naturalWidth > 0`, 링크 href, `[data-more-projects] li` 개수, `scrollWidth` = 뷰포트 폭, 콘솔 에러 0.
- 띠·사례 페이지를 바꿨으면 `.mfg-band ol li` 개수, `#case-N` 앵커, `.toc a` 목록도 같이.
- 캡처를 SendUserFile 로 보낸다. `pkill -f http.server` 는 **별도 명령**으로 — 같은 명령 줄에 두면 셸이 144 로 끊겨 뒤의 커밋이 안 돈다.

## 6. 커밋·PR
- 브랜치는 세션 지정 `claude/…`. `git fetch origin main && git checkout -B <branch> origin/main` 로 시작(이전 PR 이 머지된 뒤 같은 브랜치를 쓸 때 필수).
- 커밋 1개(이미지 + index.html), 초안 PR, `subscribe_pr_activity`, 50분 뒤 `send_later` 점검 1회. 머지되면 구독·점검 해제.
- PR 본문: 바뀐 것 / 링크 / 확인(캡처 조건) / 범위 밖(제안).

## 공개 전 점검
- [ ] 캡처에 고객·공장 실명, 키, 내부 경로 없음 (evol 은 "예시포트폴리오 / 운영 데이터 NN" 표기 · Factory AI Copilot 은 허구 데이터 30건)
- [ ] 모든 숫자에 출처 (브리프·README·테스트 출력·배포 기록)
- [ ] 라이브 데모 상태 표시 (셸 확인 불가 → 사용자 확인 근거를 적는다)
- [ ] 외부 공개 승인 기록 (evol `docs/history/2026-10-02 예시포트폴리오 공개 배포 기록.md` / 자비스 사본 2026-10-06 사용자 결정)

## 사례 기록
| 날짜 | 프로젝트 | 자리 | 결과 |
|---|---|---|---|
| 2026-10-05 | evol 가이드롤 생산 모니터링 | Featured 01 | `evol-case-study.html` 상세 페이지 + 임시 터널 데모 |
| 2026-10-06 | Factory AI Copilot (제조 Agentic AI 샘플) | Featured 03 교체(AI 기획 루프 → 더 보기) · 띠 05행 · Case 05 | PR #27 · #28, 썸네일 3장 163KB, 테스트 30개 근거 |
