"use strict";
(() => {
  const $ = (id) => document.getElementById(id);

  const ALL_SCENES = [
    { name: "안개 초원을 걸어옴", en: "walks slowly toward camera through a misty morning meadow", move: "천천히 다가오는 달리 인", trans: "페이드 인", colors: ["#c9d6e8", "#8fb3a1"], caption: "안개 낀 아침, 하루를 여는 시간" },
    { name: "머리카락 넘기기", en: "tucks her hair behind her ear, soft morning light on her face", move: "얼굴 클로즈업, 살짝 패닝", trans: "크로스페이드", colors: ["#f2d8c9", "#c79f8b"], caption: "바람에 흩날린 머리를 넘기고" },
    { name: "손끝이 볼을 스침", en: "fingertips gently touch her cheek, checking skin texture", move: "피부 질감 매크로", trans: "크로스페이드", colors: ["#f6e2d6", "#e3b6a4"], caption: "손끝으로 피부 결을 느껴요" },
    { name: "물로 세수", en: "splashes clear water on her face, droplets catching the light", move: "고속 촬영 느낌의 슬로모션", trans: "크로스페이드", colors: ["#cfe8f3", "#7fb7d1"], caption: "맑은 물로 가볍게 세수하고" },
    { name: "크림 쓸어 펴기", en: "spreads a light moisturizing cream across her cheek", move: "손 따라가는 트래킹", trans: "크로스페이드", colors: ["#f7efe6", "#e1cdb7"], caption: "수분 크림을 부드럽게 펴 발라요" },
    { name: "입술 스치기", en: "lightly touches her lips, calm satisfied expression", move: "얼굴 익스트림 클로즈업", trans: "크로스페이드", colors: ["#f3d3d6", "#cf8f98"], caption: "촉촉함이 그대로 남아요" },
    { name: "걸어가다 뒤돌아봄", en: "walks away then turns back with a soft smile", move: "뒤에서 따라가다 정지", trans: "크로스페이드", colors: ["#d7dcc2", "#9aa77d"], caption: "가볍게 돌아보는 미소" },
    { name: "안개 초원 엔딩", en: "stands in the misty meadow as the sun breaks through", move: "크레인 업 와이드", trans: "첫 장면으로 연결", colors: ["#e6e0f0", "#a99cc7"], caption: "촉촉함이 오래가는 아침" },
  ];
  const PICK = { 4: [0, 2, 4, 7], 6: [0, 1, 3, 4, 6, 7], 8: [0, 1, 2, 3, 4, 5, 6, 7] };
  const PRESETS = {
    beauty: { camera: "extreme close-up, micro detail, shallow depth of field", lighting: "soft diffused beauty light, even fill, no harsh shadows", mood: "sensory, luxurious, tactile" },
    social: { camera: "dynamic handheld, quick reframe, vertical 9:16", lighting: "natural bright light, high vibrancy, sun-kissed tones", mood: "energetic, authentic, relatable" },
    cinema: { camera: "slow 180-degree orbit, smooth dolly", lighting: "dramatic side light, deep shadows, cinematic contrast", mood: "epic, grand, reverent" },
  };
  const CHARACTER = "Ainy, a fictional woman in her mid-20s, shoulder-length dark brown hair, clear skin, ivory knit sweater";
  const RULES = "same character sheet in every shot, no on-screen text or logos, natural hands and face";
  const TOTAL = 24;

  let scenes = [];
  let selected = -1;

  const grad = (c) => `linear-gradient(160deg, ${c[0]}, ${c[1]})`;
  const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, "0")}`;
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  function unlock(n) {
    const sec = $("s" + n);
    if (sec) sec.removeAttribute("data-locked");
    document.querySelectorAll(`.steps a[data-step="${n - 1}"]`).forEach((a) => a.classList.add("done"));
  }

  // 1단계 — 장면으로 나누기
  $("split").addEventListener("click", async () => {
    const btn = $("split");
    btn.disabled = true;
    const items = [...$("splitProgress").children];
    $("splitProgress").hidden = false;
    items.forEach((li) => (li.className = ""));
    for (const li of items) {
      li.className = "on";
      await wait(650);
      li.className = "ok";
    }
    const count = Number($("count").value);
    const len = TOTAL / count;
    scenes = PICK[count].map((i, k) => ({ ...ALL_SCENES[i], start: k * len, len, approved: false }));
    selected = -1;
    renderScenes();
    renderPrompt();
    $("costSec").textContent = `${TOTAL}초 (장면 ${count}개)`;
    $("jobs").innerHTML = "";
    unlock(2);
    btn.disabled = false;
    btn.textContent = "다시 나누기";
    $("s2").scrollIntoView({ behavior: "smooth" });
  });

  // 2단계 — 장면 목록과 프롬프트
  function renderScenes() {
    const ul = $("scenes");
    ul.innerHTML = "";
    scenes.forEach((s, i) => {
      const li = document.createElement("li");
      li.tabIndex = 0;
      li.setAttribute("aria-current", String(i === selected));
      li.innerHTML = `<div class="thumb"></div>
        <div><div class="t">장면 ${i + 1} · ${fmt(s.start)}–${fmt(s.start + s.len)}</div><div class="n"></div>
        <span class="pill ${s.approved ? "ok" : "warn"}">${s.approved ? "승인됨" : "검토 필요"}</span></div>`;
      li.querySelector(".n").textContent = s.name;
      li.querySelector(".thumb").style.background = grad(s.colors);
      const b = document.createElement("button");
      b.textContent = s.approved ? "승인 취소" : "승인";
      b.addEventListener("click", (e) => { e.stopPropagation(); s.approved = !s.approved; renderScenes(); });
      li.appendChild(b);
      const choose = () => { selected = i; renderScenes(); renderPrompt(); };
      li.addEventListener("click", choose);
      li.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); choose(); } });
      ul.appendChild(li);
    });
    const ok = scenes.filter((s) => s.approved).length;
    $("readyText").textContent = `${ok} / ${scenes.length}`;
    $("readyBar").style.width = scenes.length ? `${(ok / scenes.length) * 100}%` : "0";
    if (scenes.length && ok === scenes.length) { unlock(3); unlock(4); }
  }

  function renderPrompt() {
    const box = $("prompt");
    if (selected < 0) { box.innerHTML = '<p class="muted">왼쪽에서 장면을 고르세요.</p>'; return; }
    const s = scenes[selected];
    const p = PRESETS[$("preset").value];
    const ratio = $("ratio").value;
    const end = selected === scenes.length - 1 ? "end frame matches the opening frame for a seamless loop" : "hold the final pose for a clean cut";
    const prompt = `${CHARACTER} ${s.en}. Camera: ${p.camera}. Lighting: ${p.lighting}. Mood: ${p.mood}. ` +
      `Aspect ratio ${ratio}, ${s.len.toFixed(0)} seconds. ${end}. Rules: ${RULES}.`;
    box.innerHTML = `<dl><dt>이 장면에서 무슨 일이 일어나나요?</dt><dd></dd><dt>움직임 · 전환</dt><dd></dd></dl>
      <p class="ptitle">영어 프롬프트 (자동 조립)</p><code></code>`;
    const dds = box.querySelectorAll("dd");
    dds[0].textContent = s.name;
    dds[1].textContent = `${s.move} · ${s.trans}`;
    box.querySelector("code").textContent = prompt;
  }
  ["preset", "ratio"].forEach((id) => $(id).addEventListener("change", renderPrompt));

  $("approveAll").addEventListener("click", () => { scenes.forEach((s) => (s.approved = true)); renderScenes(); });

  // 4단계 — 예시 생성
  $("simulate").addEventListener("click", async () => {
    const btn = $("simulate");
    btn.disabled = true;
    const ul = $("jobs");
    ul.innerHTML = "";
    const lis = scenes.map((s, i) => {
      const li = document.createElement("li");
      li.innerHTML = `<div class="thumb"></div><b>장면 ${i + 1}</b> <span class="st">대기</span><div class="bar"><i></i></div>`;
      li.querySelector(".thumb").style.background = grad(s.colors);
      ul.appendChild(li);
      return li;
    });
    const retryAt = Math.min(2, scenes.length - 1);
    for (let i = 0; i < lis.length; i++) {
      const li = lis[i];
      const bar = li.querySelector(".bar i");
      const st = li.querySelector(".st");
      st.textContent = "생성 중";
      for (let p = 0; p <= 100; p += 20) { bar.style.width = p + "%"; await wait(90); }
      if (i === retryAt) {
        li.classList.add("retry");
        st.textContent = "손 왜곡 → 이 장면만 재시도";
        await wait(700);
        li.classList.remove("retry");
        for (let p = 0; p <= 100; p += 25) { bar.style.width = p + "%"; await wait(90); }
      }
      li.classList.add("ok");
      st.textContent = "완료";
    }
    btn.disabled = false;
    btn.textContent = "다시 채워 보기";
    unlock(5);
    renderTimeline(-1);
  });

  // 5단계 — 미리보기
  const WORDS = () => scenes.map((s) => s.caption.split(" "));
  function renderTimeline(on) {
    const ol = $("timeline");
    ol.innerHTML = "";
    scenes.forEach((s, i) => {
      const li = document.createElement("li");
      li.textContent = `${fmt(s.start)} ${s.name} · ${s.trans}`;
      if (i === on) li.className = "on";
      ol.appendChild(li);
    });
  }
  function setRatio() {
    const r = $("ratio").value.split(":").map(Number);
    $("player").style.aspectRatio = `${r[0]} / ${r[1]}`;
  }

  let playing = false;
  $("play").addEventListener("click", async () => {
    if (playing || !scenes.length) return;
    playing = true;
    setRatio();
    $("play").disabled = true;
    const frame = $("frame");
    const cap = $("caption");
    const words = WORDS();
    const sceneMs = 1600; // 체험판은 실제 길이보다 빠르게 재생
    for (let i = 0; i < scenes.length; i++) {
      renderTimeline(i);
      frame.style.opacity = "0";
      await wait(250);
      frame.classList.remove("zoom");
      void frame.offsetWidth;
      frame.style.background = grad(scenes[i].colors);
      frame.classList.add("zoom");
      frame.style.opacity = "1";
      const w = words[i];
      for (let k = 0; k < w.length; k++) {
        cap.innerHTML = w.map((x, j) => `<span class="${j === k ? "hl" : ""}">${x.replace(/[<>&]/g, "")}</span>`).join(" ");
        $("tlBar").style.width = `${((i + (k + 1) / w.length) / scenes.length) * 100}%`;
        await wait(sceneMs / w.length);
      }
    }
    cap.textContent = "";
    renderTimeline(-1);
    $("play").disabled = false;
    $("play").textContent = "▶ 다시 재생";
    playing = false;
    unlock(6);
    renderKit();
  });

  // 6단계 — 업로드 키트
  let tab = "yt";
  function kitText() {
    const tags = ["수분크림", "아침루틴", "스킨케어", "뷰티숏폼", "Continy"];
    const flow = scenes.map((s) => s.caption).join(" → ");
    if (tab === "yt") {
      return { title: "촉촉함이 오래가는 아침 | 에이니의 수분 크림 루틴 #Shorts", body: `안개 낀 아침 초원에서 시작하는 24초 스킨케어 루틴.\n\n${flow}\n\n${tags.slice(0, 3).map((t) => "#" + t).join(" ")} #Shorts`, extra: `태그: ${tags.join(", ")}` };
    }
    return { title: "커버 문구: 촉촉함이 오래가는 아침", body: `아침 루틴 24초 🌿\n${flow}\n\n${tags.map((t) => "#" + t).join(" ")}`, extra: "대체 텍스트: 안개 낀 초원에서 여성이 수분 크림을 바르는 세로 영상" };
  }
  function renderKit() {
    const k = kitText();
    const box = $("kit");
    box.innerHTML = "<b>제목</b><span></span><b>설명</b><span></span><b>추가 정보</b><span></span>";
    const sp = box.querySelectorAll("span");
    sp[0].textContent = k.title; sp[1].textContent = k.body; sp[2].textContent = k.extra;
  }
  document.querySelectorAll(".tabs button").forEach((b) => b.addEventListener("click", () => {
    tab = b.dataset.tab;
    document.querySelectorAll(".tabs button").forEach((x) => x.setAttribute("aria-selected", String(x === b)));
    renderKit();
  }));
  $("copyKit").addEventListener("click", async () => {
    const k = kitText();
    try {
      await navigator.clipboard.writeText(`${k.title}\n\n${k.body}\n\n${k.extra}`);
      $("copied").textContent = "복사했어요.";
    } catch {
      $("copied").textContent = "이 브라우저에서는 복사가 막혀 있어요. 위 문구를 직접 선택해 주세요.";
    }
  });
})();
