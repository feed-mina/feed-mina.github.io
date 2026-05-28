---
title: "SDUI 아키텍처: DB 한 줄로 화면을 바꾸는 구조"
description: "Server-Driven UI를 도입해 프론트엔드 배포 없이 화면을 바꾸는 메타데이터 렌더링 구조와 Redis 캐싱 전략을 정리합니다."
excerpt: "SDUI는 UI 구조를 코드가 아니라 메타데이터로 다루는 방식입니다. 이 글은 DynamicEngine, 서버 트리 변환, Redis 캐시 계층을 중심으로 정리합니다."
category: "Architecture"
tags:
  - SDUI
  - Server-Driven-UI
  - Spring-Boot
  - Next.js
  - Redis
  - Metadata
  - Backend
  - Architecture
  - React
  - Portfolio
---

## 문제

기획에서 버튼 문구나 화면 배치를 조금만 바꿔도 코드 수정, PR, 빌드, 배포가 이어지는 구조는 운영 비용이 큽니다. 특히 권한별로 서로 다른 화면을 보여줘야 하는 서비스에서는 프론트엔드 조건 분기가 빠르게 복잡해집니다.

SDUI의 목표는 화면 구조를 코드 바깥으로 꺼내는 것입니다. 화면을 구성하는 컴포넌트 타입, 레이아웃, 액션, 권한 정보를 `ui_metadata`로 관리하고, 서버가 이를 렌더링 가능한 트리로 내려줍니다.

## 구조

Next.js의 공통 페이지는 URL을 기준으로 screen id를 결정하고, Spring Boot API에서 해당 화면의 메타데이터 트리를 가져옵니다. 서버는 PostgreSQL의 flat rows를 부모-자식 트리로 변환하고, Redis에 TTL 기반 캐시를 저장합니다.

프론트엔드는 `componentMap`으로 `component_type`과 React 컴포넌트를 매핑합니다. 이 구조 덕분에 새 화면을 만들 때마다 페이지 파일을 늘리는 대신, 공통 엔진이 메타데이터를 해석합니다.

## 배운 점

SDUI는 단순히 “프론트를 서버가 그린다”는 아이디어가 아닙니다. 화면의 변경 가능성과 서버의 책임 범위를 어디까지 둘 것인지 결정하는 아키텍처 문제입니다. 그래서 캐싱, 권한, 액션 라우팅, 장애 시 fallback 정책까지 함께 설계해야 합니다.
