# AGENTS.md

이 파일은 Codex가 이 프로젝트를 다룰 때 참고하는 가이드입니다.
이 문서는 프로젝트의 AI 작업 지침을 정의하는 단일 기준 문서입니다.

## 작업 원칙

- 요청 범위 안에서 최소한의 변경만 수행하고, 기존 사용자 변경 사항은 보존합니다.
- 관련 소스와 테스트를 먼저 확인한 뒤 구현하며, 데이터와 컴포넌트 변경 시 관련 테스트도 함께 갱신합니다.
- 파일 수정은 적용 가능한 작은 패치로 수행하고, 변경 후 `npm run test`, `npm run build`, `npm run lint`를 상황에 맞게 실행합니다.
- 콘텐츠를 수정할 때는 웹 포트폴리오(`src/`, `public/`)를 기준으로 정적 문서와의 싱크 규칙을 지킵니다.

## 프로젝트 개요

오인성(Software Engineer)의 개인 포트폴리오 웹사이트

## 기술 스택

- React 19
- TypeScript 5.9
- Vite 7
- CSS Modules
- React Router v7 (HashRouter — GitHub Pages 호환)
- Vitest + React Testing Library + jsdom

## 프로젝트 구조

```
src/
  components/       # 페이지 섹션 컴포넌트 (각 컴포넌트별 .tsx + .module.css)
    Header          # 홈과 상세 공용 고정 헤더 (주요 섹션 링크 + 전체 목차 + 테마 토글)
    ImageViewer     # 상세 이미지 확대, 화면 맞춤과 원본 크기 보기
    About           # 프로필 사진 + 기본 정보(Email/GitHub/Blog/LinkedIn) + 자기소개
    Career          # 경력 (차트연구소) + 총 경력 자동 계산
    Skills          # 기술 스택 (Android, Backend, Frontend, AI Agent, Communication)
    Education       # 교육 이력 (SSAFY, 한성대) + GPA + 주요 과목 성적
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
    ProjectDetail   # 프로젝트 상세 페이지 (문제 해결 이미지와 구현 설명 포함)
    __tests__/
  styles/
    global.css      # CSS 변수, 글로벌 스타일, 다크모드 변수, 섹션 교차 스타일
  test/
    setup.ts        # Vitest 셋업 (jest-dom)
    *-preserved-content.json # 리디자인 전 홈과 프로젝트 콘텐츠 기준값
  App.tsx           # 라우팅 + 섹션 교차 배경(Section 래퍼) + 스크롤 복원(ScrollToTop)
  main.tsx          # 엔트리 포인트 (HashRouter)
public/
  screenshot/       # 이미지 파일 (프로필, 수상증, 자격증, 활동 사진, 프로젝트 스크린샷)
  fonts/            # Pretendard Variable v1.3.9와 SIL Open Font License
```

## 라우팅

- `/#/` — 홈 (포트폴리오 메인)
- `/#/projects/:id` — 프로젝트 상세 페이지
- `/#/projects/:id#project-…` — 프로젝트 상세의 개별 섹션

스크롤 동작(`App.tsx`의 `ScrollToTop`)
- 상세 페이지 진입 시 유효한 섹션 주소가 있으면 해당 섹션으로 이동하고 포커스를 둡니다. 그 외에는 애니메이션 없이 최상단으로 이동합니다.
- 홈 복귀 시 `sessionStorage.scrollY`로 이전 스크롤 위치 복원하며, reveal 요소는 즉시 `revealed` 처리
- 상세 페이지의 뒤로가기는 `location.state.fromPortfolio` → `history.length` → `/` 순으로 판단

## 섹션 순서 (홈)

Header → About → Career(alt) → Projects → OpenSource(alt) → Skills → Education(alt) → Awards → Activity(alt) → Blog → Contact → Footer

`(alt)`는 `sectionAlt` 교차 배경을 적용한 섹션입니다. 헤더의 주요 링크와 전체 목차는 이 순서를 따릅니다.

## 테마

- **라이트 모드**: 딥 틸 계열 (`--color-primary: #24615b`), 배경 `#f7f5ef`, 보조배경 `#eef0e9`, 카드 `#fffefa`
- **다크 모드**: 민트 계열 (`--color-primary: #a7d7cc`), 배경 `#101c20`, 보조배경 `#142328`, 카드 `#192a2f`
- CSS 변수 기반 (`[data-theme='dark']`) — localStorage에 테마 저장
- 헤더에 다크모드 토글 버튼
- Pretendard Variable v1.3.9를 `public/fonts/`에서 제공하며 원본 OFL 라이선스 보관
- 최대 레이아웃 폭 1240px, 상세 본문 읽기 폭 720px, 고정 헤더 높이 데스크톱 72px / 모바일 64px
- 기본 본문 글자 크기 18px, 줄 높이 1.8, 카드 반경 20px
- 섹션 교차 배경 (`sectionAlt` 클래스)
- `prefers-reduced-motion: reduce` 대응, 스크롤 복원 시 `no-transition` 클래스로 깜빡임 방지

## 프로젝트 데이터 구조 (projects.ts)

- `Project`: id, title, description, cardSummary(description, achievements[]), thumbnail, tech, period, team?, role, details, features, contributions, problemSolvings[], insights[], insightImages?[], achievements, retrospective, links, screenshots, screenshotColumns?, hasBottomScreenshot?
- `ProblemSolving`: problem[], solution[], result[], visual, implementation[], alternatives[] — 각 문제해결 블록이 독립적
- `visual`: src, alt — 각 문제 해결을 설명하는 생성형 이미지와 대체 텍스트
- `ImplementationBlock`: description — 기존 구현 설명을 유지하며 코드와 언어 필드는 사용하지 않음
- `RichText = string | TextSegment[]` — 문장 일부를 강조하려면 `rich('앞부분 ', strong('강조'), ' 뒷부분')` 헬퍼 사용
- 문제해결 블록이 2개 이상이면 상세 페이지에 번호 표시
- `screenshotColumns`: 스크린샷 그리드 열 수 (기본 2, 3열도 지원)
- `hasBottomScreenshot`: 기본 true — 스크린샷이 2장 이상이면 마지막 1장을 하단에 단독 배치, `false`면 전부 상단 그리드에 포함
- `insights`: 프로젝트 관련 블로그 포스트 링크 목록
- `insightImages`: Insights 섹션 아래에 표시할 추가 이미지 배열 (선택)

## 프로젝트 상세 페이지 구조

헤더(제목, 설명, 역할/기간/인원, 기술 태그) → 성과 및 결과 → 프로젝트 개요 → 담당 역할 및 기여 → 링크 → 문제 해결(문제/해결 방법/결과/생성형 이미지/구체적인 구현 설명/대체안, 복수 블록 시 번호 구분) → 주요 요구사항 → Project Insights(+ insightImages) → 스크린샷(첫 장 전체 폭 + 나머지 그리드 + 마지막 1장 단독) → 프로젝트 회고

내용이 비어 있는 섹션은 렌더링하지 않습니다.
한길졸업은 1인 Pleos 차량용 앱의 주요 기능과 기여, 에뮬레이터에서 측정한 문제 해결 3건, 시연 영상과 화면 6장을 제공합니다.
주점부리는 상단 기본 정보와 프로젝트 개요 두 문장, Pubburi GitHub 조직 링크를 유지합니다.
본문 섹션이 둘 이상이면 데스크톱 고정 목차와 모바일 접이식 목차를 제공합니다. 상세 이미지는 ImageViewer에서 화면 맞춤과 원본 크기 보기, 닫기와 키보드 탐색을 제공합니다.
리디자인 이후의 콘텐츠 기준은 `src/test/home-preserved-content.json`과 `src/test/projects-preserved-content.json`입니다. 승인된 콘텐츠 변경을 해당 프로젝트의 기준에 반영하고, 나머지 원문, 강조, 링크, 이미지와 섹션 내 항목 순서를 유지합니다.

## 등록된 프로젝트

| id | 이름 | 스크린샷 | 문제해결 | Insights | 비고 |
|----|------|----------|----------|----------|------|
| `hangil` | 한길졸업 | 6장(2열) | 3 | - | GitHub, Pleos 에뮬레이터 시연 |
| `naenun-kiosk` | 내눈 키오스크 | 8장(2열) | 3 | - | Figma |
| `mo-re` | 모리, Mo-Re | 14장(3열) | 2 | 7 | Figma |
| `glim` | Glim | 8장(3열) | 3 | 6 | GitHub, Figma |
| `pubburi` | 주점부리 | - | - | - | 기본 정보, 프로젝트 개요와 GitHub 조직 링크 제공 |
| `quiz-cafe` | Quiz Cafe | 1장 | 2 | 6 | GitHub, Figma |
| `dear-my-diary` | Dear My Diary | 4장(2열) | 3 | - | Qualcomm 산학협력, Android 팀장, 온디바이스 AI 통합 |
| `didimdol` | Didimdol | 2장 | 2 | 5 | Android |
| `bong` | Bong # | 8장(2열) | 2 | 8 | insightImages 1장 |
| `pocs` | POCS | 4장(3열) | 2 | 6 | insightImages 2장, Play Store 배포 |

## 등록된 오픈소스

- **Compose-Chart**: Canvas API 기반 6종 차트(Line, Bar, Donut, Pie, Gauge, Radar) Compose 라이브러리 / Maven Central 배포
- **Compose-Git-Grass**: GitHub 잔디(contribution graph) Compose UI 라이브러리 / Maven Central 배포

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
- 정적 문서(`resume.html`/`resume.pdf`, `career.html`/`career.pdf`)는 Child이며, Parent에 없는 내용을 담을 수 없습니다.
- HTML 문서를 수정하면 대응 PDF도 함께 재생성합니다.
- 자세한 내용은 `README.md`의 Content Sync Rule 참고.

## 코딩 컨벤션

- 컴포넌트: 함수형 컴포넌트 + default export
- 스타일: CSS Modules (*.module.css), 색상과 간격은 `global.css`의 CSS 변수 사용
- 언어: 한국어 콘텐츠, 영어 코드
- 웹, 이력서, 포트폴리오, 경력기술서와 작업 문서에서 중앙점을 사용하지 않습니다. 나열은 쉼표나 슬래시로 구분하거나 자연스러운 연결어로 풀어 씁니다.
- 경력과 프로젝트 내용은 지원 직무에서 의미 있는 기여인지, 해결한 문제와 결과가 설득력 있게 드러나는지 판단해 선별합니다. 중요도가 낮은 세부 업무와 중복 설명은 줄입니다.
- 코드 라인, 모듈, API, 데이터 유형 등의 규모 수치는 업무의 복잡도나 책임 범위를 설명할 때 사용해도 됩니다. 단순한 개수 증가를 품질이나 성능 개선으로 표현하지 않으며, 개선율(%)은 개선 전후 값이나 측정 자료로 확인 가능한 경우에만 사용합니다.
- 들여쓰기: 2 spaces, 세미콜론 없음, 작은따옴표
- 프로젝트와 오픈소스 카드: border + `--radius-card` + 절제된 shadow와 hover 효과 통일. 경력, 교육, 활동과 기술 목록은 선과 여백으로 구분
- 이미지 토글: useState + 토글 버튼 패턴 (Activity, Awards에서 공통 사용)
- 섹션 컴포넌트는 `useScrollReveal` 훅 + `section reveal` 클래스 사용
- 데이터/컴포넌트를 변경하면 `src/**/__tests__`의 관련 테스트도 함께 갱신
