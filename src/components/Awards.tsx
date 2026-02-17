import { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import styles from './Awards.module.css'

const awards = [
  {
    title: 'SSAFY 자율 프로젝트 우수상',
    date: '2025.11.20',
    org: '삼성전자',
    id: '2025-23-050154',
    image: null as string | null,
  },
  {
    title: 'SSAFY 공통 프로젝트 우수상',
    date: '2025.08.18',
    org: '삼성전자',
    id: '2025-23-050065',
    image: null as string | null,
  },
  {
    title: '사회복무요원 표창장',
    date: '2021.07.28',
    org: '서울지방병무청장',
    id: '제2021-43호',
    image: null as string | null,
  },
]

const certificates = [
  {
    title: '정보처리기사',
    date: '2024.12.11',
    org: '한국산업인력공단',
    id: '24203011265G',
    image: null as string | null,
  },
  {
    title: 'ADsP',
    date: '2024.11.29',
    org: '한국데이터산업진흥원',
    id: 'ADsP-043007180',
    image: null as string | null,
  },
]

function AwardCard({ item, toggleLabel }: { item: typeof awards[number]; toggleLabel: [string, string] }) {
  const [imageOpen, setImageOpen] = useState(false)

  return (
    <div className={styles.card}>
      <div className={styles.cardInner}>
        <div className={styles.left}>
          <h3 className={styles.title}>{item.title}</h3>
          <p className={styles.org}>{item.org}</p>
        </div>
        <div className={styles.right}>
          <p className={styles.date}>{item.date}</p>
          <p className={styles.id}>{item.id}</p>
        </div>
      </div>
      {item.image && (
        <div className={styles.toggleArea}>
          <button
            className={styles.imageToggle}
            onClick={() => setImageOpen(!imageOpen)}
          >
            {imageOpen ? toggleLabel[1] : toggleLabel[0]}
            <span className={`${styles.arrow} ${imageOpen ? styles.arrowUp : ''}`} />
          </button>
          {imageOpen && (
            <div className={styles.imageWrap}>
              <img src={item.image} alt={item.title} className={styles.image} />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function Awards() {
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section id="awards" className="section reveal" ref={ref}>
      <h2 className="section__title">Awards & Certificates</h2>

      <h3 className={styles.groupTitle}>Awards</h3>
      <div className={styles.list}>
        {awards.map((award) => (
          <AwardCard key={award.id} item={award} toggleLabel={['수상증보기', '수상증접기']} />
        ))}
      </div>

      <h3 className={`${styles.groupTitle} ${styles.groupTitleMargin}`}>Certificates</h3>
      <div className={styles.list}>
        {certificates.map((cert) => (
          <AwardCard key={cert.id} item={cert} toggleLabel={['자격증보기', '자격증접기']} />
        ))}
      </div>
    </section>
  )
}

export default Awards
