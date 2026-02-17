import { useScrollReveal } from '../hooks/useScrollReveal'
import styles from './Skills.module.css'

const skills = [
  {
    category: 'Android & Kotlin',
    items: [
      'Jetpack Compose 기반 선언형 UI 개발 및 시계열 차트, GitHub 잔디밭 등 복잡한 컴포넌트 직접 구현',
      '멀티 모듈 아키텍처, Clean Architecture, MVVM, MVI 패턴을 활용한 확장 가능한 앱 구조를 설계 경험',
      'async/await 비동기 처리(56% 개선), Room 캐싱(85% 개선), Paging3 도입을 통한 성능 개선 경험',
      'JUnit5·MockK 기반 단위 테스트로 ViewModel 비즈니스 로직 검증 경험',
      'Kotlin을 기반으로 안드로이드 앱 다수 개발 경험',
      'Coroutines, Flow, StateFlow를 활용한 비동기 처리 및 반응형 상태 관리',
      'Extension Functions, Sealed Interface, Generic 활용으로 코드 재사용',
    ],
  },
  {
    category: 'React Native & TypeScript',
    items: [
      'TypeScript 기반 크로스 플랫폼 모바일 앱 개발 가능',
      'Interface와 Type을 활용한 타입 안전성 확보 및 코드 가독성 개선',
      'React Hooks를 활용한 상태 관리 및 컴포넌트 설계',
    ],
  },
  {
    category: 'Communication',
    items: [
      'JIRA와 GitHub를 활용하여 이슈 관리 및 개발 진행 현황 공유',
      '코드 리뷰를 통한 아키텍처 일관성 유지 및 팀 이해도 동기화',
      'Ktlint를 도입하여 코드리뷰에서 발생할 수 있는 불필요한 비용 제거',
    ],
  },
]

function Skills() {
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section id="skills" className="section reveal" ref={ref} style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
      <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto' }}>
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
      </div>
    </section>
  )
}

export default Skills
