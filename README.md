# AboutMe

> Android Developer Portfolio Website

[![Deploy to GitHub Pages](https://github.com/ois0886/AboutMe/actions/workflows/deploy.yml/badge.svg)](https://github.com/ois0886/AboutMe/actions)

**Live:** https://ois0886.github.io/AboutMe/

---

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | React 19 |
| Language | TypeScript |
| Build Tool | Vite 7 |
| Styling | CSS Modules |
| Routing | React Router v7 (HashRouter) |
| Code Highlight | react-syntax-highlighter |
| Testing | Vitest + React Testing Library |
| Deploy | GitHub Pages (GitHub Actions) |

## Sections

| Section | Description |
|---------|-------------|
| About | Profile & introduction |
| Career | Work experience timeline |
| Skills | Tech stack overview |
| Education | Education history |
| Awards & Certificates | Awards & certifications (image toggle) |
| Activity | Studies, presentations, mentoring (photo toggle) |
| Blog | Tech blog posts & series |
| Projects | Project cards with detail pages |
| Open Source | Open source libraries (GitHub link) |
| Contact | Contact information |

## Content Sync Rule

이 저장소의 콘텐츠 기준은 웹 포트폴리오입니다.

- Parent: React 기반 웹 포트폴리오 (`src/`, `public/`)
- Children: 정적 포트폴리오 문서 (`portfolio.html`, `portfolio.pdf`)와 이력서 (`resume.html`, `resume.pdf`)
- Parent에 있는 내용이 Children에 없는 것은 허용합니다. 웹 포트폴리오가 더 넓은 원천 콘텐츠를 담을 수 있기 때문입니다.
- Children에 있는 내용이 Parent에 없는 것은 허용하지 않습니다. 이력서나 정적 포트폴리오에 새 내용이 들어가면 먼저 웹 포트폴리오에 반영해야 합니다.
- 이 규칙은 경력, 프로젝트, 스킬, 교육, 수상, 자격증, 활동 같은 콘텐츠 내용 기준입니다. 디자인, 레이아웃, 시각 표현 방식, 문서 길이 차이는 싱크 검사 대상에서 제외합니다.
- HTML 문서를 수정했다면 대응되는 PDF도 함께 재생성해 싱크를 유지합니다.

## Features

- Light / Dark mode toggle
- Scroll reveal animations (IntersectionObserver)
- Scroll position restore on back navigation
- Wave divider section transitions
- Project detail pages with problem-solving, code snippets, insights
- Mobile responsive hamburger menu
- Responsive design

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Production build
npm run build

# Run tests
npm run test

# Lint
npm run lint

# Preview build
npm run preview
```

## Project Structure

```
src/
├── components/       # Section components (.tsx + .module.css)
│   └── __tests__/    # Component tests
├── data/             # Shared data (projects.ts)
├── hooks/            # Custom hooks (useScrollReveal)
├── pages/            # Route pages (ProjectDetail)
│   └── __tests__/    # Page tests
├── styles/           # Global styles (global.css)
├── App.tsx           # Route configuration & scroll restore
└── main.tsx          # Entry point
public/
└── screenshot/       # Project screenshots & images
```

## Deploy

`main` branch에 push하면 GitHub Actions를 통해 자동으로 빌드 및 GitHub Pages에 배포됩니다.
