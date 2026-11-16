(() => {
  const byId = (id) => document.getElementById(id);
  const start = Date.now();
  const minute = 60_000;
  const documents = [
    { folder: '07-Projects', title: '공개 체험판 · 주간 점검', updated: start - 20 * minute, summary: '방문자가 체험할 주요 화면과 점검 항목을 정리했습니다.' },
    { folder: 'docs', title: 'NBlog · 사진과 초안 연결', updated: start - 60 * minute, summary: '사진 선택에서 초안 확인까지의 흐름입니다.' },
    { folder: '05-Assets', title: '화면·코드 인수인계', updated: start - 120 * minute, summary: '일정과 초안이 각 서비스에서 처리되는 위치를 설명합니다.' },
  ];

  const dateFormat = new Intl.DateTimeFormat('ko-KR', { dateStyle: 'medium', timeStyle: 'short' });
  const timeFormat = new Intl.DateTimeFormat('ko-KR', { timeStyle: 'medium' });
  let renderedRevision;
  function renderDocuments() {
    const folder = byId('folder').value;
    const rows = documents.filter((item) => !folder || item.folder === folder).sort((a, b) => b.updated - a.updated);
    byId('documentStatus').textContent = `${rows.length}개 · 최근 목록 확인 ${timeFormat.format(Date.now())}`;
    const revision = rows.map((row) => `${row.folder}:${row.updated}`).join('|');
    if (renderedRevision === revision) return;
    renderedRevision = revision;
    const entries = rows.map(({ title, folder, updated, summary }) => {
      const item = document.createElement('li');
      const detail = document.createElement('details');
      const label = document.createElement('summary');
      const body = document.createElement('p');
      label.textContent = `${title} · ${folder} · ${dateFormat.format(updated)}`;
      body.textContent = summary;
      detail.append(label, body);
      item.append(detail);
      return item;
    });
    byId('documentsList').replaceChildren(...entries);
  }

  byId('folder').addEventListener('change', renderDocuments);
  byId('sampleChange').addEventListener('click', () => {
    const selected = byId('folder').value || '05-Assets';
    documents.find((item) => item.folder === selected).updated = Date.now();
    renderDocuments();
  });
  renderDocuments();
  window.setInterval(renderDocuments, 5 * minute);

  function wireDisclosure(triggerId, panelId) {
    const trigger = byId(triggerId);
    const panel = byId(panelId);
    trigger.addEventListener('click', () => {
      panel.hidden = !panel.hidden;
      trigger.setAttribute('aria-expanded', String(!panel.hidden));
    });
  }

  wireDisclosure('prepareCancel', 'cancelPanel');
  byId('confirmCancel').addEventListener('click', () => {
    byId('interviewStatus').textContent = '취소됨 · 예시 일정에만 반영했습니다.';
    byId('confirmCancel').disabled = true;
  });

  let generationTimer;
  function showDraft(note, photoLabel) {
    clearTimeout(generationTimer);
    byId('draftResult').hidden = true;
    byId('draftStatus').textContent = `${photoLabel} 확인 중 · 예시 초안을 작성합니다.`;
    generationTimer = setTimeout(() => {
      byId('draftNote').textContent = `오늘의 방문 기록\n\n${note}\n\n${photoLabel}과 함께 확인해 주세요.`;
      byId('draftResult').hidden = false;
      byId('draftStatus').textContent = '초안 준비 완료 · 예시 초안을 확인할 수 있습니다.';
    }, 500);
  }

  byId('sampleDraft').addEventListener('click', () => {
    showDraft('조용한 분위기와 창가 좌석이 좋았어요. 다음에는 점심 메뉴도 맛보고 싶어요.', '예시 사진 1장');
  });

  byId('draftForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const note = byId('visitNote').value.trim();
    const photos = [...byId('photo').files];
    if (!note || !photos.length || photos.some((file) => !file.type.startsWith('image/'))) {
      clearTimeout(generationTimer);
      byId('draftResult').hidden = true;
      byId('draftStatus').textContent = '사진 파일과 방문 메모를 확인해 주세요.';
      return;
    }
    showDraft(note, `사진 ${photos.length}장`);
  });

  wireDisclosure('prepareAccount', 'accountPanel');
  byId('accountPanel').addEventListener('submit', (event) => {
    event.preventDefault();
    byId('accountStatus').textContent = '예시 계정 연결 완료';
    event.submitter.disabled = true;
  });
})();
