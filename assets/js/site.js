const projects = [
  {
    id: "sdui",
    title: "SDUI Metadata Engine",
    category: "architecture",
    kicker: "Architecture · 2026",
    description: "DB 한 줄로 화면을 바꾸는 Server-Driven UI 엔진. 프론트 배포 대기를 줄이고 권한별 UI를 서버 메타데이터로 제어했습니다.",
    image: "https://raw.githubusercontent.com/feed-mina/SDUI/main/assets/docs/demo-role-switch.gif",
    stack: ["Next.js", "React 19", "Spring Boot", "PostgreSQL", "Redis", "JWT", "OpenAI"],
    problem: [
      "단순 문구와 버튼 변경에도 코드 수정, PR, 빌드, 배포가 반복되는 구조였습니다.",
      "화면별·권한별 UI 차이가 커질수록 프론트엔드의 조건 분기와 유지보수 비용이 커졌습니다."
    ],
    role: [
      "ui_metadata 기반 렌더링 구조를 설계하고, DynamicEngine과 서버 API의 책임 경계를 잡았습니다.",
      "flat DB rows를 트리 구조로 변환하고 Redis 캐시 계층을 두어 조회 비용을 줄였습니다."
    ],
    impact: [
      "DB row 수정만으로 화면 변경을 반영하는 구조를 구현했습니다.",
      "컴포넌트 재사용률을 높이고, 권한별 UI 전환과 AI 기능을 같은 엔진 위에 얹었습니다."
    ],
    links: [
      { label: "GitHub", url: "https://github.com/feed-mina/SDUI", primary: true },
      { label: "Live Demo", url: "https://sdui-delta.vercel.app/view/MAIN_PAGE" }
    ]
  },
  {
    id: "today-fridge",
    title: "오늘의 냉장고",
    category: "web ai",
    kicker: "AI Recipe Platform",
    description: "개인화 추천과 AI 기술을 결합한 스마트 레시피 플랫폼. 식재료, 영양 상태, 쇼핑 링크를 하나의 사용자 여정으로 연결했습니다.",
    image: "https://raw.githubusercontent.com/feed-mina/today_fridge_teamwork/main/img/image.png",
    stack: ["Next.js", "React", "TailwindCSS", "Ant Design", "JWT", "Social Login", "Vitest"],
    problem: [
      "사용자의 냉장고 식재료와 식단 기록이 실제 구매 행동과 분리되어 있었습니다.",
      "개인화 추천, 영양 리포트, 외부 쇼핑 검색을 자연스럽게 연결해야 했습니다."
    ],
    role: [
      "쇼핑 링크 연동, JWT 로그인 및 인증, 소셜 로그인 기능을 담당했습니다.",
      "프론트엔드와 Java/Python 백엔드가 맞물리는 API 흐름을 팀 구조 안에서 조율했습니다."
    ],
    impact: [
      "레시피 추천에서 부족한 재료 구매까지 이어지는 서비스 흐름을 만들었습니다.",
      "테스트와 반응형 UI를 함께 고려해 서비스 안정성을 높였습니다."
    ],
    links: [
      { label: "GitHub", url: "https://github.com/feed-mina/today_fridge_teamwork", primary: true },
      { label: "Service", url: "https://today-fridge-frontend-deploy.vercel.app/" }
    ]
  },
  {
    id: "mimo",
    title: "MIMO Virtual Makeup",
    category: "ai web",
    kicker: "Computer Vision · 2022",
    description: "웹캠으로 촬영한 얼굴에 립 컬러를 적용하는 가상 메이크업 시뮬레이션. 첫 팀 프로젝트에서 UI/UX와 프론트엔드를 구현했습니다.",
    image: "https://raw.githubusercontent.com/feed-mina/MIMO/main/assets/mimo-ui-main.png",
    stack: ["React", "JavaScript", "Spring Boot", "Firebase", "TensorFlow", "OpenCV", "U-Net"],
    problem: [
      "온라인 화장품 구매에서 실제 발색을 확인하기 어렵다는 사용자의 불편이 있었습니다.",
      "얼굴 영역 분리와 자연스러운 컬러 적용을 웹 서비스 흐름으로 녹여야 했습니다."
    ],
    role: [
      "UX/UI 설계와 프론트엔드 구현을 주도하고, OAuth와 API 호출 흐름을 익혔습니다.",
      "U-Net 기반 Face Segmentation 모델의 적용 흐름과 결과를 README로 정리했습니다."
    ],
    impact: [
      "기획, UI, API 통신, AI 모델 적용을 한 프로젝트 안에서 경험했습니다.",
      "초기 HTML/CSS 레이아웃을 React 컴포넌트로 전환하며 협업 가능한 구조를 만들었습니다."
    ],
    links: [
      { label: "GitHub", url: "https://github.com/feed-mina/MIMO", primary: true },
      { label: "Presentation PDF", url: "https://github.com/feed-mina/MIMO/raw/update-readme/2022_MIMO_PPT_final.pdf" }
    ]
  },
  {
    id: "imagenet",
    title: "TABA ImageNet Classification",
    category: "ai learning",
    kicker: "Awarded AI Project",
    description: "ImageNet 기반 분류 정확도 예측 프로젝트. ResNet, EfficientNet 등 모델을 비교하고 최우수상을 수상했습니다.",
    image: "https://raw.githubusercontent.com/feed-mina/TABA1-_CCCR_-/main/result/imagenet2_testresult.png",
    stack: ["Python", "Flask", "PyTorch", "TensorFlow", "Jupyter", "AWS", "Azure"],
    problem: [
      "다양한 CNN 모델의 성능 차이를 데이터와 실험으로 설명해야 했습니다.",
      "ImageNet 50,000장, 1,000개 클래스의 구조를 이해하고 실험 가능한 형태로 다뤄야 했습니다."
    ],
    role: [
      "전처리, 데이터 증강, 모델 학습 결과 비교, 발표 자료 정리를 수행했습니다.",
      "ResNet, EfficientNet, GoogLeNet, AlexNet, MobileNet, VGGNet의 관점을 비교했습니다."
    ],
    impact: [
      "발표 평가에서 분석력과 결과 도출 능력을 인정받아 최우수상을 수상했습니다.",
      "모델 학습 흐름, 시각화, 발표까지 이어지는 AI 프로젝트 사이클을 경험했습니다."
    ],
    links: [
      { label: "GitHub", url: "https://github.com/feed-mina/TABA1-_CCCR_-", primary: true },
      { label: "Presentation PDF", url: "https://github.com/feed-mina/TABA1-_CCCR_-/raw/master/TABA_Presentation.pdf" }
    ]
  },
  {
    id: "k-movement",
    title: "KMovement",
    category: "web",
    kicker: "Repository · Mobility",
    description: "KMovement 저장소를 포트폴리오에 연결할 수 있도록 카드와 모달 구조를 준비했습니다. 상세 README 보강 후 프로젝트 설명을 더 정교하게 확장할 수 있습니다.",
    image: "",
    stack: ["GitHub", "Portfolio", "Web Service"],
    problem: [
      "저장소 규모는 확인되지만 현재 루트 README 상세 내용은 확인되지 않았습니다.",
      "포트폴리오에서는 링크 접근성과 추후 상세 확장 가능성을 먼저 확보하는 편이 안전합니다."
    ],
    role: [
      "레포 링크를 대표 프로젝트 흐름 안에 배치하고, 추후 README 기반 상세 설명으로 교체 가능한 구조를 만들었습니다.",
      "서비스명, 대표 이미지, 핵심 역할이 정리되면 같은 카드 구조로 바로 확장할 수 있습니다."
    ],
    impact: [
      "현재는 탐색 가능한 프로젝트 링크로 제공하고, 상세 설명은 검증된 자료가 생기면 보강합니다.",
      "포트폴리오의 확장 슬롯으로 유지해 전체 구조를 해치지 않게 했습니다."
    ],
    links: [
      { label: "GitHub", url: "https://github.com/feed-mina/KMovement", primary: true }
    ]
  },
  {
    id: "til",
    title: "TABA TIL & Learning Archive",
    category: "learning",
    kicker: "Learning Record",
    description: "TABA 1기 수업 내용과 클라우드/AI 학습 기록을 정리한 저장소. 성장의 연속성과 학습 습관을 보여주는 보조 프로젝트입니다.",
    image: "",
    stack: ["TIL", "Cloud", "AI", "Documentation", "GitHub"],
    problem: [
      "프로젝트 결과만으로는 학습 과정과 지속성을 보여주기 어렵습니다.",
      "교육 과정에서 배운 개념을 기록 가능한 지식 자산으로 남겨야 했습니다."
    ],
    role: [
      "수업 내용과 실습 흐름을 GitHub 저장소에 정리했습니다.",
      "프로젝트 중심 포트폴리오를 보완하는 학습 아카이브로 연결했습니다."
    ],
    impact: [
      "기술 전환 과정과 꾸준한 기록 습관을 보여주는 근거가 됩니다.",
      "블로그 글의 원천 자료로 재활용할 수 있습니다."
    ],
    links: [
      { label: "GitHub", url: "https://github.com/feed-mina/TABA_1-_TIL_yerin-main", primary: true }
    ]
  }
];

const slider = document.querySelector("[data-project-slider]");
const dots = document.querySelector("[data-slider-dots]");
const modal = document.querySelector("[data-modal]");
let activeProject = projects[0];
let activeTab = "problem";

function createProjectCard(project) {
  const card = document.createElement("article");
  card.className = "project-card";
  card.dataset.category = project.category;
  card.tabIndex = 0;
  card.setAttribute("role", "button");
  card.setAttribute("aria-label", `${project.title} 상세 보기`);

  const media = document.createElement("div");
  media.className = "project-media";
  if (project.image) {
    const img = document.createElement("img");
    img.src = project.image;
    img.alt = `${project.title} 대표 이미지`;
    img.loading = "lazy";
    media.appendChild(img);
  }

  const body = document.createElement("div");
  body.className = "project-body";
  body.innerHTML = `
    <p class="kicker">${project.kicker}</p>
    <h3>${project.title}</h3>
    <p>${project.description}</p>
    <div class="project-card-footer">
      ${project.stack.slice(0, 4).map(item => `<span class="chip">${item}</span>`).join("")}
    </div>
  `;

  card.append(media, body);
  card.addEventListener("click", () => openModal(project));
  card.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openModal(project);
    }
  });
  return card;
}

function renderProjects() {
  if (!slider) return;
  slider.innerHTML = "";
  projects.forEach(project => slider.appendChild(createProjectCard(project)));
  renderDots();
}

function renderDots() {
  if (!dots) return;
  dots.innerHTML = "";
  const cards = [...slider.querySelectorAll(".project-card:not([hidden])")];
  cards.forEach((card, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    const title = card.querySelector("h3")?.textContent || "프로젝트";
    dot.setAttribute("aria-label", `${title}로 이동`);
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
      card?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
    });
    dots.appendChild(dot);
  });
}

function updateDots() {
  if (!slider || !dots) return;
  const cards = [...slider.querySelectorAll(".project-card:not([hidden])")];
  const firstVisible = cards.reduce((closest, card, index) => {
    const distance = Math.abs(card.getBoundingClientRect().left - slider.getBoundingClientRect().left);
    return distance < closest.distance ? { index, distance } : closest;
  }, { index: 0, distance: Infinity });

  [...dots.children].forEach((dot, index) => {
    dot.classList.toggle("active", index === firstVisible.index);
  });
}

function openModal(project) {
  activeProject = project;
  activeTab = "problem";

  modal.querySelector("[data-modal-kicker]").textContent = project.kicker;
  modal.querySelector("[data-modal-title]").textContent = project.title;
  modal.querySelector("[data-modal-description]").textContent = project.description;
  modal.querySelector("[data-modal-stack]").innerHTML = project.stack.map(item => `<span>${item}</span>`).join("");
  modal.querySelector("[data-modal-actions]").innerHTML = project.links.map(link => `
    <a class="button ${link.primary ? "primary" : "ghost"}" href="${link.url}" target="_blank" rel="noopener">${link.label}</a>
  `).join("");

  const media = modal.querySelector("[data-modal-media]");
  media.innerHTML = project.image ? `<img src="${project.image}" alt="${project.title} 대표 이미지">` : "";

  modal.querySelectorAll("[data-tab]").forEach(tab => {
    tab.classList.toggle("active", tab.dataset.tab === activeTab);
  });
  renderModalPanel();
  modal.hidden = false;
  document.body.classList.add("modal-open");
}

function renderModalPanel() {
  const panel = modal.querySelector("[data-modal-panel]");
  const rows = activeProject[activeTab] || [];
  panel.innerHTML = `<ul>${rows.map(item => `<li>${item}</li>`).join("")}</ul>`;
}

function closeModal() {
  modal.hidden = true;
  document.body.classList.remove("modal-open");
}

function setupFilters() {
  document.querySelectorAll("[data-filter]").forEach(button => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      document.querySelectorAll("[data-filter]").forEach(item => item.classList.remove("active"));
      button.classList.add("active");

      slider.querySelectorAll(".project-card").forEach(card => {
        const show = filter === "all" || card.dataset.category.includes(filter);
        card.hidden = !show;
      });
      slider.scrollTo({ left: 0, behavior: "smooth" });
      renderDots();
      updateDots();
    });
  });
}

function setupSliderControls() {
  document.querySelector("[data-slider-prev]")?.addEventListener("click", () => {
    slider.scrollBy({ left: -360, behavior: "smooth" });
  });
  document.querySelector("[data-slider-next]")?.addEventListener("click", () => {
    slider.scrollBy({ left: 360, behavior: "smooth" });
  });
  slider?.addEventListener("scroll", () => requestAnimationFrame(updateDots));
}

function setupModal() {
  if (!modal) return;
  document.querySelectorAll("[data-modal-close]").forEach(item => item.addEventListener("click", closeModal));
  modal.querySelectorAll("[data-tab]").forEach(tab => {
    tab.addEventListener("click", () => {
      activeTab = tab.dataset.tab;
      modal.querySelectorAll("[data-tab]").forEach(item => item.classList.toggle("active", item === tab));
      renderModalPanel();
    });
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !modal.hidden) closeModal();
  });
}

function setupTheme() {
  const toggle = document.querySelector("[data-theme-toggle]");
  const saved = localStorage.getItem("theme");
  if (saved) document.documentElement.dataset.theme = saved;
  const sync = () => {
    toggle.querySelector("span").textContent = document.documentElement.dataset.theme === "dark" ? "Dark" : "Light";
  };
  sync();
  toggle?.addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("theme", next);
    sync();
  });
}

function setupReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });
  document.querySelectorAll(".reveal").forEach(item => observer.observe(item));
}

function setupScrollMeter() {
  const meter = document.querySelector(".scroll-meter span");
  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const progress = max > 0 ? (window.scrollY / max) * 100 : 0;
    meter.style.width = `${progress}%`;
  };
  update();
  window.addEventListener("scroll", update, { passive: true });
}

function setupNavSpy() {
  const navLinks = [...document.querySelectorAll(".site-nav a")];
  const sections = navLinks.map(link => document.querySelector(link.getAttribute("href"))).filter(Boolean);
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
    });
  }, { rootMargin: "-42% 0px -52% 0px" });
  sections.forEach(section => observer.observe(section));
}

function setupBlogSearch() {
  const input = document.querySelector("[data-blog-search]");
  const cards = [...document.querySelectorAll("[data-post-card]")];
  if (!input || !cards.length) return;
  input.addEventListener("input", () => {
    const query = input.value.trim().toLowerCase();
    cards.forEach(card => {
      card.hidden = !card.dataset.search.includes(query);
    });
  });
}

renderProjects();
setupSliderControls();
setupFilters();
setupModal();
setupTheme();
setupReveal();
setupScrollMeter();
setupNavSpy();
setupBlogSearch();
