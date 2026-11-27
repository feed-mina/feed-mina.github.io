// 공개용 프로젝트 현황 수집기
// GitHub API에서 레포별 열린 PR, main 최신 커밋, Actions 결과를 읽어 projects-status/status.json 을 만든다.
// 토큰은 환경변수 STATUS_TOKEN(없으면 GITHUB_TOKEN)으로만 받고, 결과 파일에는 쓰지 않는다.
// 실행: STATUS_TOKEN=... node .github/scripts/collect-projects-status.mjs
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..', '..');
const configPath = path.join(here, 'projects-status.config.json');
const outPath = path.join(root, 'projects-status', 'status.json');
const token = process.env.STATUS_TOKEN || process.env.GITHUB_TOKEN || '';
const now = new Date(process.env.STATUS_NOW || Date.now());
const DAY = 86400000;

async function gh(p) {
  const res = await fetch('https://api.github.com' + p, {
    headers: {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'projects-status-collector',
      ...(token ? { Authorization: 'Bearer ' + token } : {}),
    },
  });
  if (!res.ok) throw Object.assign(new Error(`${res.status} ${p}`), { status: res.status });
  return res.json();
}

// Actions 결과를 화면 상태로 바꾼다. state: ok | fail | run | warn | none | unknown
function runState(run) {
  if (!run) return { state: 'none', text: '실행 기록 없음', date: null };
  if (run.status !== 'completed') return { state: 'run', text: '실행 중', date: run.updated_at };
  const map = { success: ['ok', '성공'], failure: ['fail', '실패'], timed_out: ['fail', '시간 초과'],
    cancelled: ['warn', '취소됨'], skipped: ['none', '건너뜀'], action_required: ['warn', '확인 필요'] };
  const [state, text] = map[run.conclusion] || ['warn', run.conclusion || '알 수 없음'];
  return { state, text, date: run.updated_at };
}

const isNoise = (r) => !r.path || r.path.startsWith('dynamic/');
// 워크플로 파일별 main 실행 기록 (경로 조건 때문에 전체 실행 목록에서 밀려난 배포도 잡기 위해 따로 조회)
const workflowRuns = (owner, name, file, branch) =>
  gh(`/repos/${owner}/${name}/actions/workflows/${encodeURIComponent(file)}/runs?branch=${encodeURIComponent(branch)}&per_page=10`)
    .then((r) => r.workflow_runs || []).catch(() => []);

async function collectRepo(owner, cfg) {
  const masked = cfg.visibility === 'masked';
  const base = { name: cfg.name, label: cfg.label, target: cfg.target, masked,
    url: masked ? null : `https://github.com/${owner}/${cfg.name}`, live: cfg.live || null };
  try {
    const repo = await gh(`/repos/${owner}/${cfg.name}`);
    const branch = repo.default_branch;
    const [pulls, commit, runsRes] = await Promise.all([
      gh(`/repos/${owner}/${cfg.name}/pulls?state=open&per_page=100`),
      gh(`/repos/${owner}/${cfg.name}/commits/${encodeURIComponent(branch)}`),
      gh(`/repos/${owner}/${cfg.name}/actions/runs?branch=${encodeURIComponent(branch)}&per_page=50`),
    ]);
    const runs = runsRes.workflow_runs || [];
    const drafts = pulls.filter((p) => p.draft).length;
    const stale = pulls.filter((p) => p.draft && now - new Date(p.created_at) > 30 * DAY).length;
    const mainDate = commit.commit?.committer?.date || commit.commit?.author?.date || null;
    const headline = (commit.commit?.message || '').split('\n')[0];

    let build;
    if (!cfg.build) build = { state: 'none', text: '검사 없음', date: null };
    else {
      const run = cfg.build === '*' ? runs.find((r) => !isNoise(r)) : (await workflowRuns(owner, cfg.name, cfg.build, branch))[0];
      build = runState(run);
      // 마지막 실행이 최신 커밋보다 오래됐으면 지금 상태로 보지 않는다 (예: 몇 달 전 실패).
      if (run && run.head_sha !== commit.sha && mainDate && new Date(run.created_at) < new Date(mainDate)) {
        build = { state: build.state === 'ok' ? 'ok' : 'warn', text: build.state === 'ok' ? '성공 (이전 커밋)' : `최근 실행 없음 · 마지막 ${build.text}`, date: build.date };
      }
      if (build.state === 'none' && /\[skip ci\]/i.test(headline)) build.text = '건너뜀 (skip ci)';
    }

    let deploy;
    const d = cfg.deploy || { kind: 'none' };
    if (d.kind === 'workflow') {
      const pushRuns = (await workflowRuns(owner, cfg.name, d.workflow, branch)).filter((r) => r.event !== 'pull_request');
      deploy = runState(pushRuns[0]);
      if (deploy.state === 'none') deploy = { state: 'warn', text: 'main 배포 기록 없음', date: null };
    } else if (d.kind === 'pages') {
      deploy = runState(runs.find((r) => r.path?.startsWith('dynamic/pages/')));
    } else if (d.kind === 'manual') deploy = { state: 'none', text: d.text || '수동 배포', date: null };
    else if (d.kind === 'unknown') deploy = { state: 'warn', text: '확인 필요', date: null };
    else deploy = { state: 'none', text: '없음', date: null };

    return { ...base, ok: true,
      prs: { open: pulls.length, draft: drafts, stale },
      main: { date: mainDate, message: masked ? null : headline },
      build: { ...build, url: masked || !build.date ? null : (cfg.build === '*' ? `${base.url}/actions` : `${base.url}/actions/workflows/${cfg.build}`) },
      deploy };
  } catch (err) {
    // 비공개 레포에 접근 권한이 없거나 GitHub 오류: 상태만 '확인 불가'로 남긴다.
    const why = err.status === 404 || err.status === 403 ? '권한 없음' : '조회 실패';
    console.warn(`[skip] ${cfg.name}: ${err.message}`);
    const unknown = { state: 'unknown', text: why, date: null };
    return { ...base, ok: false, prs: null, main: null, build: unknown, deploy: unknown };
  }
}

function summarize(repos) {
  const ok = repos.filter((r) => r.ok);
  return {
    fail: ok.filter((r) => r.build.state === 'fail' || r.deploy.state === 'fail').length,
    recent7: ok.filter((r) => r.main?.date && now - new Date(r.main.date) <= 7 * DAY).length,
    openPr: ok.reduce((n, r) => n + r.prs.open, 0),
    draftPr: ok.reduce((n, r) => n + r.prs.draft, 0),
    manual: ok.filter((r) => ['none', 'warn'].includes(r.deploy.state)).length,
  };
}

const config = JSON.parse(await readFile(configPath, 'utf8'));
const repos = [];
for (const cfg of config.repos) repos.push(await collectRepo(config.owner, cfg));
const next = { repos, summary: summarize(repos) };

// 내용이 같으면 파일을 다시 쓰지 않는다 (불필요한 커밋 방지).
let prev = null;
try { prev = JSON.parse(await readFile(outPath, 'utf8')); } catch {}
if (prev && JSON.stringify({ repos: prev.repos, summary: prev.summary }) === JSON.stringify(next)) {
  console.log('변경 없음');
} else {
  await writeFile(outPath, JSON.stringify({ generatedAt: now.toISOString(), ...next }, null, 2) + '\n');
  console.log(`status.json 갱신: ${repos.length}개, 실패 ${next.summary.fail}, 열린 PR ${next.summary.openPr}`);
}
