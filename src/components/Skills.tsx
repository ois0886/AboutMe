import { useScrollReveal } from '../hooks/useScrollReveal'
import styles from './Skills.module.css'

const skills = [
  {
    category: 'Android & Kotlin',
    items: [
      'Jetpack Compose로 화면을 개발하고, 시계열 차트와 GitHub 잔디 형태의 UI 컴포넌트를 직접 구현했습니다.',
      '멀티 모듈, Clean Architecture, MVVM, MVI를 적용해 화면과 상태 처리, 데이터 접근의 책임을 나눴습니다.',
      'Coroutines로 6개 API를 병렬 호출해 로딩 시간을 약 356ms에서 156ms로 줄였습니다. Room 캐싱으로 반복 조회 시간을 3~5초에서 0.5초 이하로 줄이고, Paging3로 목록을 나눠 불러왔습니다.',
      'JUnit5와 MockK를 사용해 ViewModel의 상태 변화와 비즈니스 로직을 단위 테스트로 검증했습니다.',
      'Flow와 StateFlow로 화면 상태를 전달하고, 사용자 입력에 따른 이벤트 흐름을 관리했습니다.',
      'Gradle Convention Plugin으로 공통 build-logic을 구성해 모듈마다 반복되던 빌드 설정을 한 곳에서 관리했습니다.',
      'Compose UI 라이브러리를 개발하고 Maven Central에 배포했습니다.',
    ],
  },
  {
    category: 'Backend & Frontend',
    items: [
      'Spring Boot로 REST API를 설계하고, 컨트롤러와 서비스, 데이터 접근 계층을 분리했습니다.',
      'MyBatis와 MySQL로 SQL 매핑, 조인, 페이지 조회와 검색 조건을 처리했습니다.',
      '함께 반영되어야 하는 데이터 변경을 트랜잭션으로 묶고, 입력 검증과 예외 처리를 구현했습니다.',
      '공통 응답 형식과 오류 응답, 페이지 조회 규칙을 정해 클라이언트와 연동했습니다.',
      'Vue 3와 Vite로 화면과 라우팅을 구성하고, 상태 관리와 재사용할 컴포넌트를 분리했습니다.',
    ],
  },
  {
    category: 'AI Agent',
    items: [
      '기능 구현, 리팩토링, 테스트 작성과 문서화에 AI Agent를 사용합니다.',
      '독립적인 작업은 여러 에이전트에 나눠 맡기고, 결과를 합친 뒤 코드 리뷰와 테스트로 확인합니다.',
      '계획, 구현, 검증 단계마다 필요한 자료와 완료 기준을 정합니다.',
      '코드 구조와 작성 규칙을 문서로 남겨 AI 도구에 작업 맥락을 전달합니다.',
      '코드 리뷰, 테스트 생성과 리팩토링 후보 탐색 같은 반복 작업을 자동화합니다.',
      '자동 테스트와 검토 결과를 다음 수정에 반영합니다.',
    ],
  },
  {
    category: 'Communication',
    items: [
      'JIRA와 GitHub로 이슈를 관리하고 개발 진행 상황을 공유합니다.',
      '코드 리뷰에서 설계 의도와 변경 이유를 설명하고, 팀의 작성 규칙을 맞춥니다.',
    ],
  },
]

function Skills() {
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section id="skills" className="section reveal" ref={ref}>
      <h2 className="section__title">Skills</h2>
      <div className={styles.grid}>
        {skills.map((group) => (
          <div key={group.category} className={styles.card}>
            <h3 className={styles.category}>{group.category}</h3>
            <ul className={styles.list}>
              {group.items.map((item) => (
                <li key={item} className={styles.item}>
                  {item}
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
