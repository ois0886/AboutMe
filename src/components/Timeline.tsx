import { useScrollReveal } from '../hooks/useScrollReveal'
import styles from './Timeline.module.css'

const events = [
  {
    year: '2026',
    title: '차트연구소 입사',
    description: 'Android Developer · 연구원 정규직',
    type: 'career' as const,
  },
  {
    year: '2025',
    title: 'SSAFY 자율 프로젝트 우수상',
    description: '삼성전자 주관',
    type: 'award' as const,
  },
  {
    year: '2025',
    title: 'SSAFY 공통 프로젝트 우수상',
    description: '삼성전자 주관',
    type: 'award' as const,
  },
  {
    year: '2025',
    title: '삼성 청년 AI·SW 아카데미 13기',
    description: 'Mobile Track 수료',
    type: 'education' as const,
  },
  {
    year: '2024',
    title: '정보처리기사 / ADsP 취득',
    description: '한국산업인력공단 · 한국데이터산업진흥원',
    type: 'award' as const,
  },
  {
    year: '2024',
    title: '한성대학교 컴퓨터공학과 졸업',
    description: '모바일소프트웨어 · 빅데이터 트랙',
    type: 'education' as const,
  },
  {
    year: '2021',
    title: '개발 블로그 시작',
    description: '현재 370+개 포스팅 작성',
    type: 'blog' as const,
  },
  {
    year: '2018',
    title: '한성대학교 입학',
    description: '컴퓨터공학과',
    type: 'education' as const,
  },
]

const typeLabel: Record<string, string> = {
  career: 'Career',
  award: 'Award',
  education: 'Education',
  blog: 'Blog',
}

function Timeline() {
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section id="timeline" className="section reveal" ref={ref} style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
      <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto' }}>
        <h2 className="section__title">Timeline</h2>
        <div className={styles.timeline}>
          {events.map((event, index) => (
            <div key={index} className={styles.item}>
              <div className={styles.line}>
                <span className={`${styles.dot} ${styles[event.type]}`} />
              </div>
              <div className={styles.content}>
                <span className={styles.year}>{event.year}</span>
                <span className={`${styles.badge} ${styles[event.type]}`}>{typeLabel[event.type]}</span>
                <h3 className={styles.title}>{event.title}</h3>
                <p className={styles.description}>{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Timeline
