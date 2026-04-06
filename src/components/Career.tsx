import { useScrollReveal } from '../hooks/useScrollReveal'
import { getTotalCareer } from './careerUtils'
import styles from './Career.module.css'

function Career() {
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section id="career" className="section reveal" ref={ref}>
      <div>
        <h2 className="section__title">Career</h2>
        <p className={styles.totalCareer}>총 경력 {getTotalCareer()}</p>
        <div className={styles.card}>
          <div className={styles.header}>
            <div>
              <h3 className={styles.company}>ChartLab</h3>
              <p className={styles.role}>Software Engineer · 연구원 정규직으로 근무</p>
              <p className={styles.location}>서울시 강서구</p>
            </div>
            <span className={styles.period}>2026.02.09 ~ 재직중</span>
          </div>
          <ul className={styles.tasks}>
            <li className={styles.task}><strong className={styles.emphasis}>MTS 차트 시스템</strong>의 인터페이스, UI, 데이터 컨트롤러 개발 및 유지보수</li>
            <li className={styles.task}><strong className={styles.emphasis}>PowerChart 3.0 LS증권 제품</strong> 유지보수 및 <strong className={styles.emphasis}>간편 차트 개발</strong></li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Career
