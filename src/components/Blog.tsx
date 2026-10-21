import { useScrollReveal } from '../hooks/useScrollReveal'
import styles from './Blog.module.css'

const series = [
  {
    name: 'Android 시리즈',
    description: 'Compose UI, 인텐트와 4대 컴포넌트, 멀티 모듈 등 Android 개발 내용 정리',
  },
  {
    name: 'Kotlin 시리즈',
    description: '코루틴과 컬렉션, 람다 등 Kotlin 문법과 라이브러리 사용법 정리',
  },
  {
    name: 'CS 시리즈',
    description: '교착상태와 동기화, 페이징 등 운영체제 개념과 자료구조, 동적 계획법, 그래프 탐색 정리',
  },
]

function Blog() {
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section id="blog" className="section reveal" ref={ref}>
      <h2 className="section__title">Blog</h2>
      <div className={styles.intro}>
        <a
          href="https://superohinsung.tistory.com"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.blogLink}
        >
          superohinsung.tistory.com
        </a>
        <p className={styles.blogName}>인성의 개발 공부 노트</p>
        <p className={styles.blogDesc}>
          2021년부터 Kotlin, Android, CS와 알고리즘을 공부하며 <strong className={styles.emphasis}>220개 이상의 글</strong> 작성
        </p>
        <p className={styles.blogDesc}>
          Compose 렌더링과 리컴포지션, MVVM과 MVI, 네트워크 및 직렬화 라이브러리의 학습과 비교 내용 기록
        </p>
      </div>
      <div className={styles.seriesGrid}>
        {series.map((s) => (
          <div key={s.name} className={styles.seriesCard}>
            <h3 className={styles.seriesName}>{s.name}</h3>
            <p className={styles.seriesDesc}>{s.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Blog
