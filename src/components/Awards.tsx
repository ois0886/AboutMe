import { useScrollReveal } from '../hooks/useScrollReveal'
import styles from './Awards.module.css'

const awards = [
  {
    title: 'SSAFY 자율 프로젝트 우수상',
    date: '2025.11.20',
    org: '삼성전자',
    id: '2025-23-050154',
  },
  {
    title: 'SSAFY 공통 프로젝트 우수상',
    date: '2025.08.18',
    org: '삼성전자',
    id: '2025-23-050065',
  },
  {
    title: '사회복무요원 표창장',
    date: '2021.07.28',
    org: '서울지방병무청장',
    id: '제2021-43호',
  },
]

const certificates = [
  {
    title: '정보처리기사',
    date: '2024.12.11',
    org: '한국산업인력공단',
    id: '24203011265G',
  },
  {
    title: 'ADsP',
    date: '2024.11.29',
    org: '한국데이터산업진흥원',
    id: 'ADsP-043007180',
  },
]

function Awards() {
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section id="awards" className="section reveal" ref={ref}>
      <h2 className="section__title">Awards & Certificates</h2>

      <h3 className={styles.groupTitle}>Awards</h3>
      <div className={styles.list}>
        {awards.map((award) => (
          <div key={award.id} className={styles.card}>
            <div className={styles.left}>
              <h3 className={styles.title}>{award.title}</h3>
              <p className={styles.org}>{award.org}</p>
            </div>
            <div className={styles.right}>
              <p className={styles.date}>{award.date}</p>
              <p className={styles.id}>{award.id}</p>
            </div>
          </div>
        ))}
      </div>

      <h3 className={`${styles.groupTitle} ${styles.groupTitleMargin}`}>Certificates</h3>
      <div className={styles.list}>
        {certificates.map((cert) => (
          <div key={cert.id} className={styles.card}>
            <div className={styles.left}>
              <h3 className={styles.title}>{cert.title}</h3>
              <p className={styles.org}>{cert.org}</p>
            </div>
            <div className={styles.right}>
              <p className={styles.date}>{cert.date}</p>
              <p className={styles.id}>{cert.id}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Awards
