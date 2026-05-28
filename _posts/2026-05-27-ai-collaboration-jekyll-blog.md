---
title: "AI 협업으로 GitHub Pages 기술 블로그 구축하기"
description: "Jekyll과 GitHub Pages를 활용해 포트폴리오형 메인 페이지와 SEO 가능한 기술 블로그를 함께 구축하는 워크플로우를 정리합니다."
excerpt: "AI에게 단순 코드 생성을 맡기는 것이 아니라, 구조 설계와 검증 기준을 함께 전달하면 포트폴리오와 블로그를 빠르게 구축할 수 있습니다."
category: "AI Collaboration"
tags:
  - AI협업
  - Jekyll
  - GitHub-Pages
  - SEO
  - Portfolio
  - Blog
  - Prompting
  - Developer-Blog
  - Markdown
  - Search-Console
---

## Jekyll을 쓰는 이유

Jekyll은 마크다운 문서를 정적 HTML로 변환하는 정적 사이트 생성기입니다. GitHub Pages와 함께 쓰면 별도 서버 없이 블로그를 운영할 수 있고, 글은 Git으로 버전 관리할 수 있습니다.

포트폴리오 메인은 `index.html`로 직접 섬세하게 만들고, 기술 글은 `_posts`에 마크다운으로 쌓는 방식이 실용적입니다. 메인은 채용 담당자가 빠르게 훑는 화면이고, 블로그는 기술 판단의 근거를 남기는 공간입니다.

## AI에게 맡길 일과 직접 잡을 일

AI에게는 반복적인 HTML/CSS 구조화, SEO 메타 태그 초안, Jekyll 파일 구조 생성을 맡길 수 있습니다. 대신 프로젝트의 핵심 메시지, 역할, 기술 선택 이유, 과장되면 안 되는 지점은 사람이 직접 정해야 합니다.

좋은 프롬프트는 결과물의 형태보다 검증 기준을 더 명확히 말합니다. 예를 들어 “예쁜 페이지”보다 “프로젝트 카드 클릭 시 모달이 열리고, GitHub 링크와 역할, 기술 스택, 성과가 보이게 해줘”가 훨씬 낫습니다.

## 검색 노출 기본기

검색 노출을 위해서는 `jekyll-seo-tag`, `jekyll-sitemap`, `jekyll-feed`를 사용합니다. 각 글에는 160자 안팎의 `description`, 검색 의도를 반영한 `tags`, 공유 이미지에 해당하는 `image`를 넣습니다.

마지막으로 Google Search Console에 사이트와 sitemap을 등록하면, 블로그가 단순한 기록을 넘어 검색 가능한 기술 자산이 됩니다.
