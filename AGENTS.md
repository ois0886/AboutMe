# AGENTS.md

이 파일은 Codex가 이 프로젝트를 다룰 때 참고하는 가이드입니다.
이 문서는 프로젝트의 AI 작업 지침을 정의하는 단일 기준 문서입니다.

## 작업 원칙

- 요청 범위 안에서 최소한의 변경만 수행하고, 기존 사용자 변경 사항은 보존합니다.
- 관련 소스와 테스트를 먼저 확인한 뒤 구현하며, 데이터·컴포넌트 변경 시 관련 테스트도 함께 갱신합니다.
- 파일 수정은 적용 가능한 작은 패치로 수행하고, 변경 후 `npm run test`, `npm run build`, `npm run lint`를 상황에 맞게 실행합니다.
- 콘텐츠를 수정할 때는 웹 포트폴리오(`src/`, `public/`)를 기준으로 정적 문서와의 싱크 규칙을 지킵니다.

## 프로젝트 개요

오인성(Android Developer)의 개인 포트폴리오 웹사이트

## 기술 스택

- React 19
- TypeScript 5.9
- Vite 7
- CSS Modules
- React Router v7 (HashRouter — GitHub Pages 호환)
- react-syntax-highlighter (PrismLight — kotlin / java / xml(markup) / sql)
- Vitest + React Testing Library + jsdom

## 프로젝트 구조

```
src/
  components/       # 페이지 섹션 컴포넌트 (각 컴포넌트별 .tsx + .module.css)
    Header          # 고정 헤더 (섹션 네비게이션 + 모바일 드로어 + 다크모드 토글)
    About           # 프로필 사진 + 기본 정보(Email/GitHub/Blog/LinkedIn) + 자기소개
    Career          # 경력 (차트연구소) + 총 경력 자동 계산
    Skills          # 기술 스택 (Android & Kotlin, Backend & Frontend, AI Agent, Communication)
    Education       # 교육 이력 (SSAFY, 코드프레소, 한성대) + GPA + 주요 과목 성적
    Awards          # 수상 2건 + 자격증 5건 (이미지 토글)
    Activity        # 활동 이력 (스터디, 발표, 멘토링 등 — 사진 토글)
    Blog            # 블로그 소개 및 시리즈 (Android / Kotlin / CS)
    Projects        # 프로젝트 카드 (클릭 시 상세 페이지 이동 + 스크롤 위치 저장)
    OpenSource      # 오픈소스 프로젝트 (Projects와 별도 섹션)
    Contact         # 연락처
    Footer          # 푸터
    careerUtils.ts  # 경력 데이터(careers) + 총 경력 계산(getTotalCareer)
    __tests__/      # Career, Header, OpenSource, Projects 테스트
  data/
    projects.ts     # 프로젝트 데이터 (목록 + 상세 페이지 공유)
    __tests__/      # projects 데이터 검증 테스트
  hooks/
    useScrollReveal # 스크롤 시 reveal 애니메이션 훅
    __tests__/
  pages/
    ProjectDetail   # 프로젝트 상세 페이지 (구문 강조 포함)
    __tests__/
  styles/
    global.css      # CSS 변수, 글로벌 스타일, 다크모드 변수, 섹션 교차 스타일
  test/
    setup.ts        # Vitest 셋업 (jest-dom)
  App.tsx           # 라우팅 + 섹션 교차 배경(Section 래퍼) + 스크롤 복원(ScrollToTop)
  main.tsx          # 엔트리 포인트 (HashRouter)
public/
  screenshot/       # 이미지 파일 (프로필, 수상증, 자격증, 활동 사진, 프로젝트 스크린샷)
```

## 라우팅

- `/#/` — 홈 (포트폴리오 메인)
- `/#/projects/:id` — 프로젝트 상세 페이지

스크롤 동작(`App.tsx`의 `ScrollToTop`)
- 상세 페이지 진입 시 애니메이션 없이 최상단으로 이동
- 홈 복귀 시 `sessionStorage.scrollY`로 이전 스크롤 위치 복원하며, reveal 요소는 즉시 `revealed` 처리
- 상세 페이지의 뒤로가기는 `location.state.fromPortfolio` → `history.length` → `/` 순으로 판단

## 섹션 순서 (홈)

Header → About → Career(alt) → Skills → Education(alt) → Awards → Activity(alt) → Blog → Projects(alt) → OpenSource → Contact(alt) → Footer

(alt) = `sectionAlt` 교차 배경 적용 섹션

## 테마

- **라이트 모드**: 스틸 블루 계열 (`--color-primary: #46627f`), 배경 `#f6f7f9`, 보조배경 `#eef2f6`, 카드 `#ffffff`
- **다크 모드**: 밝은 블루그레이 (`--color-primary: #9cb3c9`), 배경 `#0b1220`, 보조배경 `#111b2b`, 카드 `#162235`
- CSS 변수 기반 (`[data-theme='dark']`) — localStorage에 테마 저장
- 헤더에 다크모드 토글 버튼
- 섹션 교차 배경 (`sectionAlt` 클래스)
- `prefers-reduced-motion: reduce` 대응, 스크롤 복원 시 `no-transition` 클래스로 깜빡임 방지

## 프로젝트 데이터 구조 (projects.ts)

- `Project`: id, title, description, thumbnail, tech, period, team, role, details, features, contributions, problemSolvings[], insights[], insightImages?[], achievements, retrospective, links, screenshots, screenshotColumns?, hasBottomScreenshot?
- `ProblemSolving`: problem[], solution[], result[], implementation[], alternatives[] — 각 문제해결 블록이 독립적
- `ImplementationBlock`: description, code (문자열 또는 null), language?(`kotlin` | `java` | `xml` | `sql` | `text`, 기본 kotlin)
- `RichText = string | TextSegment[]` — 문장 일부를 강조하려면 `rich('앞부분 ', strong('강조'), ' 뒷부분')` 헬퍼 사용
- 문제해결 블록이 2개 이상이면 상세 페이지에 번호 표시
- `screenshotColumns`: 스크린샷 그리드 열 수 (기본 2, 3열도 지원)
- `hasBottomScreenshot`: 기본 true — 스크린샷이 2장 이상이면 마지막 1장을 하단에 단독 배치, `false`면 전부 상단 그리드에 포함
- `insights`: 프로젝트 관련 블로그 포스트 링크 목록
- `insightImages`: Insights 섹션 아래에 표시할 추가 이미지 배열 (선택)

## 프로젝트 상세 페이지 구조

헤더(제목·설명·기간/인원/역할·기술 태그) → 성과 및 결과 → 링크 → 프로젝트 개요 → 주요 요구사항 → Project Insights(+ insightImages) → 담당 역할 및 기여 → 문제 해결(문제/해결 방법/결과/구체적인 구현 설명/대체안, 복수 블록 시 번호 구분) → 스크린샷(첫 장 전체 폭 + 나머지 그리드 + 마지막 1장 단독) → 프로젝트 회고

내용이 비어 있는 섹션은 렌더링하지 않습니다.

## 등록된 프로젝트

| id | 이름 | 스크린샷 | 문제해결 | Insights | 비고 |
|----|------|----------|----------|----------|------|
| `naenun-kiosk` | 내눈 키오스크 | 8장(2열) | 3 | - | Figma |
| `mo-re` | 모리, Mo-Re | 14장(3열) | 2 | 7 | Figma |
| `glim` | Glim | 8장(3열) | 3 | 6 | GitHub, Figma |
| `pubburi` | 주점부리 | 3장(2열) | 2 | - | Backend & Frontend 프로젝트, GitHub |
| `quiz-cafe` | Quiz Cafe | 1장 | 2 | 6 | GitHub, Figma |
| `didimdol` | Didimdol | 2장 | 2 | 5 | Android |
| `bong` | Bong # | 8장(2열) | 2 | 8 | insightImages 1장 |
| `pocs` | POCS | 4장(3열) | 2 | 6 | insightImages 2장, Play Store 배포 |

## 등록된 오픈소스

- **Compose-Chart**: Canvas API 기반 6종 차트(Line·Bar·Donut·Pie·Gauge·Radar) Compose 라이브러리 · Maven Central 배포
- **Compose-Git-Grass**: GitHub 잔디(contribution graph) Compose UI 라이브러리 · Maven Central 배포

두 카드 모두 클릭 시 GitHub 저장소로 이동합니다.

## 개발 명령어

- `npm run dev` — 개발 서버 실행
- `npm run build` — 프로덕션 빌드 (tsc -b + vite build)
- `npm run test` — Vitest 1회 실행
- `npm run test:watch` — Vitest 워치 모드
- `npm run lint` — ESLint 실행
- `npm run preview` — 빌드 결과 미리보기

## 배포

- GitHub Pages로 배포 (GitHub Actions 자동 배포, `.github/workflows/deploy.yml`)
- URL: https://ois0886.github.io/AboutMe/
- `main` 브랜치에 push하면 `npm ci` → `npm run test` → `npm run build` 후 자동 배포 (테스트 실패 시 배포 중단)
- `vite.config.ts`의 `base: '/AboutMe/'` 설정 필수

## 콘텐츠 싱크 규칙

- 콘텐츠 기준(Parent)은 웹 포트폴리오(`src/`, `public/`)입니다.
- 정적 문서(`portfolio.html`/`portfolio.pdf`, `resume.html`/`resume.pdf`, `career-document/`)는 Child이며, Parent에 없는 내용을 담을 수 없습니다.
- HTML 문서를 수정하면 대응 PDF도 함께 재생성합니다.
- 자세한 내용은 `README.md`의 Content Sync Rule 참고.

## 코딩 컨벤션

- 컴포넌트: 함수형 컴포넌트 + default export
- 스타일: CSS Modules (*.module.css), 색상·간격은 `global.css`의 CSS 변수 사용
- 언어: 한국어 콘텐츠, 영어 코드
- 경력·프로젝트 성과는 단순한 기능·항목 개수보다 개선율(%)을 우선해 표현합니다. 개선 전·후 값이나 측정 자료로 확인 가능한 수치만 사용하며, 실측 근거가 없는 개선율은 만들지 않고 담당 업무로 설명합니다.
- 들여쓰기: 2 spaces, 세미콜론 없음, 작은따옴표
- 카드 스타일: border + `--radius-card` + `--shadow-card` + hover 효과 통일
- 이미지 토글: useState + 토글 버튼 패턴 (Activity, Awards에서 공통 사용)
- 섹션 컴포넌트는 `useScrollReveal` 훅 + `section reveal` 클래스 사용
- 번들 최적화: react-syntax-highlighter를 manualChunks로 분리
- 데이터/컴포넌트를 변경하면 `src/**/__tests__`의 관련 테스트도 함께 갱신
