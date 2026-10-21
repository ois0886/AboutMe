# AboutMe

> Android Developer Portfolio Website

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
| Code Highlight | react-syntax-highlighter (PrismLight — kotlin / java / xml / sql) |
| Testing | Vitest + React Testing Library + jsdom |
| Deploy | GitHub Pages (GitHub Actions) |

## Routes

| Path | Page |
|------|------|
| `/#/` | Portfolio home |
| `/#/projects/:id` | Project detail |

## Sections

홈 섹션 순서: About → Career → Skills → Education → Awards → Activity → Blog → Projects → Open Source → Contact
(Career / Education / Activity / Projects / Contact 는 `sectionAlt` 교차 배경)

| Section | Description |
|---------|-------------|
| About | Profile & introduction (Email / GitHub / Blog / LinkedIn) |
| Career | Work experience timeline with auto-calculated total career |
| Skills | Android & Kotlin, Backend & Frontend, AI Agent, Communication |
| Education | Education history with GPA & course grades |
| Awards & Certificates | 2 awards, 5 certificates (image toggle) |
| Activity | Studies, presentations, mentoring (photo toggle) |
| Blog | Tech blog series (Android / Kotlin / CS) |
| Projects | Project cards with detail pages |
| Open Source | Compose-Chart, Compose-Git-Grass (GitHub link) |
| Contact | Contact information |

## Projects

프로젝트 데이터는 `src/data/projects.ts` 한 곳에서 목록 카드와 상세 페이지가 함께 사용합니다.
메인 카드는 `cardSummary`의 항목형 소개와 성과를 사용하고, 상세 페이지는 기존 `description`과 `achievements` 원문을 사용합니다.

| id | Title | Screenshots | Problem Solving | Insights |
|----|-------|-------------|-----------------|----------|
| `naenun-kiosk` | 내눈 키오스크 | 8 (2 cols) | 3 | - |
| `mo-re` | 모리, Mo-Re | 14 (3 cols) | 2 | 7 |
| `glim` | Glim | 8 (3 cols) | 3 | 6 |
| `pubburi` | 주점부리 (Backend & Frontend) | 3 (2 cols) | 2 | - |
| `quiz-cafe` | Quiz Cafe | 1 | 2 | 6 |
| `didimdol` | Didimdol | 2 | 2 | 5 |
| `bong` | Bong # | 8 (2 cols) | 2 | 8 |
| `pocs` | POCS (Play Store 배포) | 4 (3 cols) | 2 | 6 |

상세 페이지 구성: 헤더 → 성과 및 결과 → 링크 → 프로젝트 개요 → 주요 요구사항 → Project Insights → 담당 역할 및 기여 → 문제 해결 → 스크린샷 → 프로젝트 회고 (내용이 비어 있는 섹션은 렌더링하지 않음)

## Content Sync Rule

이 저장소의 콘텐츠 기준은 웹 포트폴리오입니다.

- Parent: React 기반 웹 포트폴리오 (`src/`, `public/`)
- Children: 정적 포트폴리오 문서 (`portfolio.html`/`portfolio.pdf`, `portfolio-kis.html`/`portfolio-kis.pdf`), 이력서 (`resume.html`/`resume.pdf`), 경력기술서 (`career-document/`)
- Parent에 있는 내용이 Children에 없는 것은 허용합니다. 웹 포트폴리오가 더 넓은 원천 콘텐츠를 담을 수 있기 때문입니다.
- Children에 있는 내용이 Parent에 없는 것은 허용하지 않습니다. 이력서나 정적 포트폴리오에 새 내용이 들어가면 먼저 웹 포트폴리오에 반영해야 합니다.
- 이 규칙은 경력, 프로젝트, 스킬, 교육, 수상, 자격증, 활동 같은 콘텐츠 내용 기준입니다. 디자인, 레이아웃, 시각 표현 방식, 문서 길이 차이는 싱크 검사 대상에서 제외합니다.
- HTML 문서를 수정했다면 대응되는 PDF도 함께 재생성해 싱크를 유지합니다.

## Features

- Light / Dark mode toggle, theme persisted in `localStorage` and applied before first paint (`main.tsx`)
- Active section navigation and accessible mobile drawer
- Scroll reveal animations with `prefers-reduced-motion` support
- Scroll position restore on back navigation (`sessionStorage` + `no-transition` to avoid flicker)
- Alternating section bands and responsive timeline / card layouts
- Project detail pages with problem-solving blocks, syntax-highlighted code, insights
- Rich text emphasis in project copy via `rich()` / `strong()` helpers
- Responsive media cards and screenshot galleries (2 / 3 column grids)
- Keyboard focus states and 44px mobile touch targets

## Design System

CSS 변수는 `src/styles/global.css`에 정의되어 있고, 다크 모드는 `[data-theme='dark']`로 토글합니다.

| Token | Light | Dark |
|-------|-------|------|
| `--color-primary` | `#46627f` | `#9cb3c9` |
| `--color-primary-strong` | `#172b40` | `#e4ebf2` |
| `--color-bg` | `#f6f7f9` | `#0b1220` |
| `--color-bg-secondary` | `#eef2f6` | `#111b2b` |
| `--color-bg-card` | `#ffffff` | `#162235` |
| `--color-text` | `#172033` | `#f1f5f9` |

- **Layout:** `--max-width: 1120px`, `--radius-card: 16px`, 데스크톱 그리드 / 모바일 단일 컬럼
- **Motion:** 절제된 스크롤 리빌과 hover 피드백, reduced motion 환경에서 자동 최소화

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

Vitest + React Testing Library 기반으로 7개 파일 / 44개 테스트가 있습니다.

- `src/components/__tests__/` — Career(총 경력 계산), Header(네비게이션과 테마), OpenSource, Projects
- `src/data/__tests__/` — projects 데이터 무결성 검증
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
