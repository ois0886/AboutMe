import { useScrollReveal } from '../hooks/useScrollReveal'
import styles from './Career.module.css'

function Career() {
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section id="career" className="section reveal" ref={ref} style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
      <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto' }}>
        <h2 className="section__title">Career</h2>
        <div className={styles.card}>
          <div className={styles.header}>
            <div>
              <h3 className={styles.company}>차트연구소</h3>
              <p className={styles.role}>Android Developer · 연구원 정규직</p>
              <p className={styles.location}>서울시 강서구</p>
            </div>
            <span className={styles.period}>2026.02.09 ~ 재직중</span>
          </div>
          <ul className={styles.tasks}>
            <li className={styles.task}>MTS 차트 시스템 인터페이스, UI, 데이터 컨트롤러 개발 및 유지보수</li>
            <li className={styles.task}>고객사 업무소통 및 기타 회사 관련 업무</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Career
