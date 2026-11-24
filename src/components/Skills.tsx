import { useScrollReveal } from '../hooks/useScrollReveal'
import { plainText, renderRichText, rich, strong } from '../utils/richText'
import styles from './Skills.module.css'

const skills = [
  {
    category: 'Android',
    items: [
      rich(strong('Kotlin, Jetpack Compose'), ' 기반 UI 개발, 기존 XML 화면의 ', strong('70% 이상을 Compose로 전환'), '하고 여러 화면에서 반복되는 UI를 공통 컴포넌트로 분리'),
      rich('Canvas API를 활용한 데이터 시각화 컴포넌트 구현, 재사용 가능한 ', strong('Compose UI 라이브러리 2종을 Maven Central에 배포')),
      rich('Coroutines로 독립적인 API 요청을 병렬 처리해 ', strong('화면 로딩 시간 약 56% 단축'), ', 일부 요청이 실패해도 정상 응답 데이터 표시'),
      rich('Room에 서버 데이터를 동기화하고 로컬에서 검색해 ', strong('목록 검색 응답 시간 83% 이상 단축')),
      'Paging 3로 스크롤 위치에 따라 필요한 페이지를 불러와 초기 화면에서 전체 목록을 내려받는 문제 해결',
      rich('렌더링에 필요한 계산을 백그라운드로 옮기고 초기화와 병렬 처리해 ', strong('첫 프레임 표시까지 걸리는 시간 34.8% 단축')),
      '멀티 모듈과 Clean Architecture로 화면, 도메인 로직, 데이터 접근의 책임 분리, Gradle Convention Plugin으로 공통 빌드 설정 관리',
      'MVVM과 MVI 기반 화면 상태 관리, 탭 전환과 목록 갱신 시 편집값을 보존하고 화면 이동과 안내 메시지는 일회성 이벤트로 처리',
      rich('JUnit과 MockK로 ', strong('ViewModel 단위 테스트 130여 개 작성'), ', 사용자 입력과 API 응답에 따른 상태 변화 및 예외 처리 검증'),
      rich('GitHub Actions로 빌드, UI 테스트, 내부 테스트 배포를 자동화하고 ', strong('Play Store 정식 배포 및 유지보수'), ' 경험'),
    ],
  },
  {
    category: 'Backend',
    items: [
      rich(strong('Java, Spring Boot 기반 REST API'), ' 설계 및 구현, 컨트롤러와 서비스, 데이터 접근 계층의 책임 분리'),
      'MyBatis와 MySQL을 활용한 조인, 조건 검색, 페이지 조회 구현 및 연관 데이터 변경의 트랜잭션 처리',
      '입력값 검증과 예외 처리, 클라이언트가 일관되게 사용할 수 있도록 공통 응답 형식과 페이지 조회 규칙 정의',
    ],
  },
  {
    category: 'Frontend',
    items: [
      rich(strong('React, TypeScript, Vue 3'), ' 기반 화면 개발, 라우팅과 상태 관리, 공통 레이아웃과 재사용 컴포넌트 구성'),
      'Vite와 SCSS를 활용한 반응형 웹 개발, 외부 API와 연동한 콘텐츠 조회, 검색, 파일 업로드 구현',
    ],
  },
  {
    category: 'AI Agent',
    items: [
      rich(strong('Codex와 Claude Code'), '를 기능 구현, 리팩터링, 테스트 작성과 문서화에 활용'),
      '코드 구조와 작업별 완료 기준을 문서화하고, 독립적인 작업을 여러 에이전트에 나누어 병렬 진행',
      'PR과 CI 결과 확인을 자동화하고, 코드 리뷰에서 발견한 문제를 수정한 뒤 관련 테스트로 검증',
    ],
  },
  {
    category: 'Communication',
    items: [
      rich(strong('Android 팀 리드'), '로 기획, 디자인, 백엔드, AI 담당자와 요구사항 및 기능 연동 방식 조율'),
      rich('Jira와 GitHub로 이슈와 진행 상황을 공유하고, ', strong('코드 리뷰'), '에서 설계 의도와 변경 이유를 설명해 팀의 구현 방향 조율'),
      rich('API 호출 방법과 사용 예제를 개발 문서로 작성하고, ', strong('Android 멘토링 1년과 기술 블로그 글 220개 이상'), '을 통해 개발 지식 공유'),
    ],
  },
]

function Skills() {
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section id="skills" className="section reveal" ref={ref}>
      <h2 className="section__title" aria-label="Skills">Skills</h2>
      <div className={styles.grid}>
        {skills.map((group) => (
          <div key={group.category} className={styles.card}>
            <h3 className={styles.category}>{group.category}</h3>
            <ul className={styles.list}>
              {group.items.map((item) => (
                <li key={plainText(item)} className={styles.item}>
                  {renderRichText(item)}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Skills
