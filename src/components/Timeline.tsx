import { useScrollReveal } from '../hooks/useScrollReveal'
import styles from './Timeline.module.css'

const events = [
  {
    year: '2018',
    title: '한성대학교 입학',
    description: '컴퓨터공학과',
    type: 'education' as const,
  },
  {
    year: '2021',
    title: '개발 블로그 시작',
    description: '현재 370+개 포스팅',
    type: 'blog' as const,
  },
  {
    year: '2024',
    title: '한성대 졸업 · 자격증 취득',
    description: '정보처리기사 / ADsP',
    type: 'education' as const,
  },
  {
    year: '2025',
    title: 'SSAFY 13기 수료',
    description: '프로젝트 우수상 2회',
    type: 'award' as const,
  },
  {
    year: '2026',
    title: '차트연구소 입사',
    description: 'Android Developer',
    type: 'career' as const,
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
        <div className={styles.scrollArea}>
          <div className={styles.timeline}>
            <div className={styles.line} />
            {events.map((event, index) => (
              <div key={index} className={styles.item}>
                <div className={styles.dotWrap}>
                  <span className={`${styles.dot} ${styles[event.type]}`} />
                </div>
                <div className={styles.content}>
                  <span className={`${styles.badge} ${styles[event.type]}`}>{typeLabel[event.type]}</span>
                  <h3 className={styles.title}>{event.title}</h3>
                  <p className={styles.description}>{event.description}</p>
                </div>
                <span className={styles.year}>{event.year}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Timeline
