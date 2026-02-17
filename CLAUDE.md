# CLAUDE.md

이 파일은 Claude Code가 이 프로젝트를 다룰 때 참고하는 가이드입니다.

## 프로젝트 개요

오인성(Android Developer)의 개인 포트폴리오 웹사이트

## 기술 스택

- React 19
- TypeScript
- Vite
- CSS Modules
- React Router (HashRouter — GitHub Pages 호환)
- react-syntax-highlighter (Kotlin 코드 하이라이팅)

## 프로젝트 구조

```
src/
  components/       # 페이지 섹션 컴포넌트 (각 컴포넌트별 .tsx + .module.css)
    Header          # 고정 헤더 (10개 섹션 네비게이션 + 다크모드 토글)
    Hero            # 타이핑 애니메이션 + 그라데이션 텍스트 + 배경 오브
    About           # 프로필 사진 + 기본 정보 + 자기소개
    Career          # 경력 (차트연구소) + 총 경력 자동 계산
    Skills          # 기술 스택 (Android & Kotlin, React Native, Spring Boot, Communication)
    Education       # 교육 이력 (SSAFY, 코드프레소, 한성대) + GPA + 주요 과목 성적
    Awards          # 수상 및 자격증 (이미지 토글)
    Activity        # 활동 이력 (스터디, 발표, 멘토링 등 — 사진 토글)
    Blog            # 블로그 소개 및 시리즈
    Projects        # 프로젝트 카드 (클릭 시 상세 페이지 이동)
    OpenSource      # 오픈소스 프로젝트 (Projects와 별도 섹션)
    Contact         # 연락처
    Footer          # 푸터
    WaveDivider     # 섹션 간 웨이브 구분선 SVG 컴포넌트
  data/
    projects.ts     # 프로젝트 데이터 (목록 + 상세 페이지 공유)
  hooks/
    useScrollReveal # 스크롤 시 reveal 애니메이션 훅
  pages/
    ProjectDetail   # 프로젝트 상세 페이지 (Kotlin 구문 강조 포함)
  styles/
    global.css      # CSS 변수, 글로벌 스타일, 다크모드 변수, 웨이브/섹션 교차 스타일
  App.tsx           # 라우팅 설정 + 섹션 교차 배경 (Section 래퍼)
  main.tsx          # 엔트리 포인트 (HashRouter)
public/
  screenshot/       # 이미지 파일 (프로필, 수상증, 자격증, 활동 사진, 프로젝트 스크린샷)
```

## 라우팅

- `/#/` — 홈 (포트폴리오 메인)
- `/#/projects/:id` — 프로젝트 상세 페이지 (진입 시 스크롤 최상단 이동)

## 섹션 순서 (홈)

Header → Hero → About → Career(alt) → Skills → Education(alt) → Awards → Activity(alt) → Blog → Projects(alt) → OpenSource → Contact(alt) → Footer

(alt) = 교차 배경 + 웨이브 구분선 적용 섹션

## 테마

- **라이트 모드**: Slate/Gray 계열 (#475569), 배경 #f9fafb, 보조배경 #f1f5f9
- **다크 모드**: Slate 밝은 톤 (#94a3b8), 배경 #0f172a
- CSS 변수 기반 (`[data-theme='dark']`) — localStorage에 테마 저장
- 헤더에 다크모드 토글 버튼 (해/달 이모지)
- 섹션 교차 배경 (`sectionAlt` 클래스) + WaveDivider SVG

## 차별화 요소

- **타이핑 애니메이션**: Hero에서 "Android Developer", "Jetpack Compose", "Kotlin Lover" 순환
- **배경 오브**: 부유하는 그라데이션 원형 배경 (orbFloat 애니메이션)
- **웨이브 구분선**: 섹션 간 물결 모양 SVG 전환
- **Kotlin 구문 강조**: 프로젝트 상세의 구현 설명에 PrismLight 코드 하이라이팅

## 프로젝트 데이터 구조 (projects.ts)

- `Project` 인터페이스: id, title, description, thumbnail, tech, period, team, role, details, features, contributions, problemSolvings[], insights[], achievements, retrospective, links, screenshots, screenshotColumns?
- `ProblemSolving` 인터페이스: problem[], solution[], result[], implementation[], alternatives[] — 각 문제해결 블록이 독립적
- `ImplementationBlock` 인터페이스: description, code (Kotlin 코드 또는 null)
- 여러 개의 문제해결 블록 지원 (2개 이상일 경우 번호 표시)
- `screenshotColumns`: 스크린샷 그리드 열 수 (기본 2, 3열도 지원)
- `insights`: 프로젝트 관련 블로그 포스트 링크 목록

## 프로젝트 상세 페이지 구조

스크린샷(앞 N-1장) → 프로젝트 개요 → 주요 요구사항 → 링크 → Project Insights → 담당 역할 및 기여 → 문제 해결(문제/해결/결과/구현 설명/대체안, 복수 블록 시 번호 구분) → 성과 및 결과 → 프로젝트 회고 → 스크린샷(마지막 1장)

## 등록된 프로젝트

- **내눈 키오스크** (naenun-kiosk): 스크린샷 8장(2열), 문제해결 1개
- **모리, Mo-Re** (mo-re): 스크린샷 14장(3열), 문제해결 2개, Insights 7개

## 개발 명령어

- `npm run dev` — 개발 서버 실행
- `npm run build` — 프로덕션 빌드 (tsc + vite build)
- `npm run lint` — ESLint 실행
- `npm run preview` — 빌드 결과 미리보기

## 배포

- GitHub Pages로 배포 (GitHub Actions 자동 배포)
- URL: https://ois0886.github.io/AboutMe/
- `main` 브랜치에 push하면 자동으로 빌드 및 배포

## 코딩 컨벤션

- 컴포넌트: 함수형 컴포넌트 + default export
- 스타일: CSS Modules (*.module.css) 사용
- 언어: 한국어 콘텐츠, 영어 코드
- 들여쓰기: 2 spaces
- 카드 스타일: border + border-radius: 12px + box-shadow + hover 효과 통일
- 이미지 토글: useState + 토글 버튼 패턴 (Activity, Awards에서 공통 사용)
- 번들 최적화: react-syntax-highlighter를 manualChunks로 분리
