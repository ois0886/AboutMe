import { useScrollReveal } from '../hooks/useScrollReveal'
import styles from './Blog.module.css'

const series = [
  {
    name: 'Android 시리즈',
    description: 'ComposeUI, 인텐트·4대 컴포넌트, 멀티모듈 등 안드로이드 전반을 정리',
  },
  {
    name: 'Kotlin 시리즈',
    description: '코루틴, 컬렉션/람다 등 언어·라이브러리 특성을 정리',
  },
  {
    name: 'CS 시리즈',
    description: '운영체제(Deadlock, 뮤텍스/세마포어, 페이징), 자료구조·알고리즘(DP, 재귀, 0-1 BFS, LIS 등) 개념을 정리',
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
          2021년부터 5년동안 Kotlin, Android, CS, Algorithm 등 현재 370+개의 포스팅을 작성
        </p>
        <p className={styles.blogDesc}>
          Jetpack Compose 렌더링/Recomposition, 안드로이드 아키텍처(MVVM, MVI), 네트워크/직렬화 라이브러리 비교 학습 내용을 정리
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
