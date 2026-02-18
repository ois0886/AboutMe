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
| Hero | Typing animation intro |
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

## Features

- Light / Dark mode toggle
- Scroll reveal animations (IntersectionObserver)
- Scroll position restore on back navigation
- Wave divider section transitions
- Project detail pages with problem-solving, code snippets, insights
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
