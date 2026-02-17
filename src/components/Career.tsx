import { useScrollReveal } from '../hooks/useScrollReveal'
import styles from './Career.module.css'

const CAREER_START = new Date(2026, 1, 9) // 2026.02.09

function getTotalCareer() {
  const now = new Date()
  let years = now.getFullYear() - CAREER_START.getFullYear()
  let months = now.getMonth() - CAREER_START.getMonth()
  if (now.getDate() < CAREER_START.getDate()) months--
  if (months < 0) {
    years--
    months += 12
  }
  if (years > 0 && months > 0) return `${years}년 ${months}개월`
  if (years > 0) return `${years}년`
  if (months > 0) return `${months}개월`
  return '1개월 미만'
}

function Career() {
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section id="career" className="section reveal" ref={ref} style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
      <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto' }}>
        <h2 className="section__title">Career</h2>
        <p className={styles.totalCareer}>총 경력 {getTotalCareer()}</p>
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
