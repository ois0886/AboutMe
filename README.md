# AboutMe

> Software Engineer Portfolio Website

[![Deploy to GitHub Pages](https://github.com/ois0886/AboutMe/actions/workflows/deploy.yml/badge.svg)](https://github.com/ois0886/AboutMe/actions)

**Live:** https://ois0886.github.io/AboutMe/

---

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | React 19 |
| Language | TypeScript 5.9 |
| Build Tool | Vite 7 |
| Styling | CSS Modules |
| Routing | React Router v7 (HashRouter) |
| Testing | Vitest + React Testing Library + jsdom |
| Deploy | GitHub Pages (GitHub Actions) |

## Routes

| Path | Page |
|------|------|
| `/#/` | Portfolio home |
| `/#/projects/:id` | Project detail |

## Sections

홈 섹션 순서: About → Career → Projects → Open Source → Skills → Education → Awards → Activity → Blog → Contact
경력과 프로젝트, 공개 배포물을 먼저 배치하고 헤더의 주요 링크와 전체 목차로 이동합니다.

| Section | Description |
|---------|-------------|
| About | Profile & introduction (Email / GitHub / Blog / LinkedIn) |
| Career | Work experience timeline with auto-calculated total career |
| Skills | Android, Backend, Frontend, AI Agent, Communication |
| Education | Education history with GPA & course grades |
| Awards & Certificates | 2 awards, 5 certificates (image toggle) |
| Activity | Studies, presentations, mentoring (photo toggle) |
| Blog | Tech blog series (Android / Kotlin / CS) |
| Projects | Project cards with detail pages |
| Open Source | Compose-Chart, Compose-Git-Grass (GitHub link) |
| Contact | Contact information |

## Projects

프로젝트 데이터는 `src/data/projects.ts` 한 곳에서 목록 카드와 상세 페이지가 함께 사용합니다.
홈의 프로젝트 카드는 시작일이 최신인 순서대로 표시합니다.
메인 카드는 `cardSummary`의 항목형 소개와 성과를 사용하고, 상세 페이지는 `description`과 `achievements`를 사용합니다.
한길졸업은 [Android 저장소](https://github.com/HanGilLab/Android)를 바탕으로 Pleos 차량용 앱의 구현과 측정 결과를 소개합니다. 상세에는 시연 영상과 에뮬레이터 화면 6장을 제공합니다.
주점부리는 기본 정보와 프로젝트 개요 두 문장, Pubburi GitHub 조직 링크를 제공합니다.
각 문제 해결은 `visual: { src, alt }` 생성형 이미지와 `implementation`의 `description` 설명으로 구성합니다. 구현은 문장으로 설명합니다.
새 이미지의 생성 프롬프트와 검수 수정 기록은 [이미지 생성 기록](docs/project-visual-prompts.md)에 정리했습니다.

| id | Title | Screenshots | Problem Solving | Insights |
|----|-------|-------------|-----------------|----------|
| `hangil` | 한길졸업 | 6 (2 cols) | 3 | - |
| `naenun-kiosk` | 내눈 키오스크 | 8 (2 cols) | 3 | - |
| `mo-re` | 모리, Mo-Re | 14 (3 cols) | 2 | 7 |
| `glim` | Glim | 8 (3 cols) | 3 | 6 |
| `pubburi` | 주점부리 (Backend & Frontend & Recommendation) | - | - | - |
| `quiz-cafe` | Quiz Cafe | 1 | 2 | 6 |
| `dear-my-diary` | Dear My Diary (Android 팀장) | 4 (2 cols) | 3 | - |
| `didimdol` | Didimdol | 2 | 2 | 5 |
| `bong` | Bong # | 8 (2 cols) | 2 | 8 |
| `pocs` | POCS (Play Store 배포) | 4 (3 cols) | 2 | 6 |

상세 페이지는 헤더 → 성과 및 결과 → 프로젝트 개요 → 담당 역할 및 기여 → 링크 → 문제 해결 → 주요 요구사항 → Project Insights → 스크린샷 → 프로젝트 회고 순서로 구성합니다. 내용이 있는 섹션을 표시합니다.
본문 섹션이 둘 이상이면 데스크톱에서 고정 목차를, 모바일에서 접을 수 있는 목차를 제공합니다. 목차 주소를 직접 열면 해당 섹션으로 이동합니다. 설명 이미지와 스크린샷은 확대 보기에서 화면에 맞추거나 원본 크기로 확인할 수 있습니다.

## Content Sync Rule

이 저장소의 콘텐츠 기준은 웹 포트폴리오입니다.

- Parent: React 기반 웹 포트폴리오 (`src/`, `public/`)
- Children: 이력서 (`resume.html`/`resume.pdf`), 경력기술서 (`career.html`/`career.pdf`)
- Parent에 있는 내용이 Children에 없는 것은 허용합니다. 웹 포트폴리오가 더 넓은 원천 콘텐츠를 담을 수 있기 때문입니다.
- Children에 있는 내용이 Parent에 없는 것은 허용하지 않습니다. 이력서나 경력기술서에 새 내용이 들어가면 먼저 웹 포트폴리오에 반영해야 합니다.
- 이 규칙은 경력, 프로젝트, 스킬, 교육, 수상, 자격증, 활동 같은 콘텐츠 내용 기준입니다. 디자인, 레이아웃, 시각 표현 방식, 문서 길이 차이는 싱크 검사 대상에서 제외합니다.
- HTML 문서를 수정했다면 대응되는 PDF도 함께 재생성해 싱크를 유지합니다.

## Features

- Light / Dark mode toggle, theme persisted in `localStorage` and applied before first paint (`main.tsx`)
- Shared header with primary section links, a full contents menu, and a keyboard skip link
- Scroll reveal animations with `prefers-reduced-motion` support
- Scroll position restore on back navigation (`sessionStorage` + `no-transition` to avoid flicker)
- Alternating section bands and responsive timeline / card layouts
- Project detail pages with problem-solving visuals, implementation explanations, insights
- Sticky desktop / collapsible mobile project contents and an accessible image viewer
- Rich text emphasis via shared `rich()` / `strong()` helpers
- Responsive project rows and screenshot galleries (2 / 3 column grids)
- Keyboard focus states and 44px mobile touch targets

## Design System

CSS 변수는 `src/styles/global.css`에 정의되어 있고, 다크 모드는 `[data-theme='dark']`로 토글합니다.
Pretendard Variable v1.3.9를 `public/fonts/`에서 직접 제공하며, 원본 SIL Open Font License를 함께 보관합니다. 글꼴 원본은 [Pretendard 공식 저장소](https://github.com/orioncactus/pretendard/tree/v1.3.9)에서 확인할 수 있습니다.

| Token | Light | Dark |
|-------|-------|------|
| `--color-primary` | `#24615b` | `#a7d7cc` |
| `--color-primary-strong` | `#182d31` | `#f2f3ee` |
| `--color-bg` | `#f7f5ef` | `#101c20` |
| `--color-bg-secondary` | `#eef0e9` | `#142328` |
| `--color-bg-card` | `#fffefa` | `#192a2f` |
| `--color-text` | `#182d31` | `#f2f3ee` |

- **Layout:** 최대 폭 1240px, 상세 본문 읽기 폭 720px, 헤더 높이 데스크톱 72px / 모바일 64px
- **Typography:** 기본 본문 18px / 줄 높이 1.8, Pretendard Variable
- **Motion:** 절제된 스크롤 리빌과 hover 피드백, reduced motion 환경에서 자동 최소화

디자인 판단에 참고한 자료와 적용 방향입니다.

| Reference | Application |
|-----------|-------------|
| [스타벅스 코리아 공식 사이트](https://www.starbucks.co.kr/index.do/), [토스 공식 사이트](https://toss.im/) | 브랜드 색과 여백, 정보 위계의 시각 참고 |
| [Tuch 외, 시각적 복잡성과 첫인상](https://research.google/pubs/the-role-of-visual-complexity-and-prototypicality-regarding-first-impression-of-websites-working-towards-understanding-aesthetic-judgments/) | 장식 밀도를 줄이고 일관된 구획과 여백으로 첫 화면 구성 |
| [NN/g, Layer-Cake Scanning](https://www.nngroup.com/articles/layer-cake-pattern-scanning/) | 제목과 구획을 분명히 하고 경력, 프로젝트, 공개 배포물 우선 배치 |
| [Don Norman, The Design of Everyday Things](https://www.hachettebookgroup.com/titles/don-norman/the-design-of-everyday-things/9780465050659/) | 조작 가능성을 드러내고 이동과 확대 보기의 상태를 분명히 표시 |
| [W3C, WCAG 2.2](https://www.w3.org/TR/WCAG22/) | 키보드 탐색, 포커스 표시, 명도 대비와 조작 영역 확인 |

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Production build
npm run build

# Run tests (once)
npm run test

# Run tests (watch)
npm run test:watch

# Lint
npm run lint

# Preview build
npm run preview
```

## Testing

Vitest + React Testing Library 기반으로 컴포넌트와 데이터, 라우팅 동작을 검증합니다.

- `src/components/__tests__/` — Career(총 경력 계산), Header(네비게이션과 테마), OpenSource, Projects
- `src/data/__tests__/` — projects 데이터 무결성, 문제 해결 이미지와 정적 문서 검증
- `src/test/*-preserved-content.json` — 리디자인 전 홈과 프로젝트 원문 기준값, 승인된 세 문장 삭제 외의 내용 보존 검증
- `src/hooks/__tests__/` — useScrollReveal
- `src/pages/__tests__/` — ProjectDetail 렌더링

`npm run test`는 배포 파이프라인에서도 실행되며, 실패하면 배포가 중단됩니다.

## Project Structure

```
src/
├── components/       # Section components (.tsx + .module.css)
│   ├── careerUtils.ts  # Career data & total career calculation
│   └── __tests__/      # Component tests
├── data/
│   ├── projects.ts     # Project data (list + detail page)
│   └── __tests__/
├── hooks/
│   ├── useScrollReveal.ts
│   └── __tests__/
├── pages/
│   ├── ProjectDetail.tsx
│   └── __tests__/
├── styles/           # Global styles (global.css)
├── test/             # Vitest setup
├── App.tsx           # Route configuration & scroll restore
└── main.tsx          # Entry point (HashRouter)
public/
└── screenshot/       # Project screenshots & images
```

## Deploy

`main` branch에 push하면 GitHub Actions(`.github/workflows/deploy.yml`)가 `npm ci` → `npm run test` → `npm run build` 순으로 실행한 뒤 GitHub Pages에 배포합니다.
`vite.config.ts`의 `base: '/AboutMe/'` 설정이 GitHub Pages 경로에 필요합니다.
