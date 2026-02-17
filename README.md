# Oh In-Seong Portfolio

> Android Developer 오인성의 개인 포트폴리오 웹사이트

[![Deploy to GitHub Pages](https://github.com/ois0886/Oh-In-Seong-Portfolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/ois0886/Oh-In-Seong-Portfolio/actions)

**Live:** https://ois0886.github.io/Oh-In-Seong-Portfolio/

---

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | React 19 |
| Language | TypeScript |
| Build Tool | Vite |
| Styling | CSS Modules |
| Routing | React Router (HashRouter) |
| Deploy | GitHub Pages (GitHub Actions) |

## Sections

| Section | Description |
|---------|-------------|
| Hero | 인트로 애니메이션 및 CTA |
| About | 프로필, 기본 정보, 자기소개 |
| Career | 경력 사항 |
| Skills | Android & Kotlin, React Native, Spring Boot, Communication |
| Education | 교육 이력, GPA, 주요 과목 성적 |
| Awards & Certificates | 수상 내역 및 자격증 (이미지 토글) |
| Activity | 스터디, 발표, 멘토링 등 활동 (사진 토글) |
| Blog | 기술 블로그 소개 및 시리즈 |
| Projects | 프로젝트 카드 (클릭 시 상세 페이지) |
| Contact | 연락처 |

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Production build
npm run build

# Preview build
npm run preview
```

## Project Structure

```
src/
  components/    # Section components (.tsx + .module.css)
  data/          # Shared data (projects)
  hooks/         # Custom hooks (useScrollReveal)
  pages/         # Route pages (ProjectDetail)
  styles/        # Global styles
  App.tsx        # Route configuration
  main.tsx       # Entry point
public/
  screenshot/    # Images (profile, awards, certificates, activities)
```

## Deploy

`main` 브랜치에 push하면 GitHub Actions를 통해 자동으로 빌드 및 배포됩니다.

---

Made by **Oh In-Seong**
