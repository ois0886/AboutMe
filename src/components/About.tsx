import { useScrollReveal } from '../hooks/useScrollReveal'
import styles from './About.module.css'

function About() {
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section id="about" className="section reveal" ref={ref}>
      <h2 className="section__title">About</h2>
      <div className={styles.wrapper}>
        <div className={styles.profileArea}>
          <div className={styles.profileImage}>
            <img src="screenshot/profile.jpg" alt="프로필 사진" />
          </div>
        </div>
        <div className={styles.infoArea}>
          <div className={styles.infoBlock}>
            <h3 className={styles.subtitle}>Info</h3>
            <ul className={styles.infoList}>
              <li><span className={styles.label}>Email.</span> <a href="mailto:superohinsung@naver.com">superohinsung@naver.com</a></li>
              <li><span className={styles.label}>GitHub.</span> <a href="https://github.com/ois0886" target="_blank" rel="noopener noreferrer">github.com/ois0886</a></li>
              <li><span className={styles.label}>Blog.</span> <a href="https://superohinsung.tistory.com" target="_blank" rel="noopener noreferrer">superohinsung.tistory.com</a></li>
              <li><span className={styles.label}>LinkedIn.</span> <a href="https://www.linkedin.com/in/%EC%9D%B8%EC%84%B1-%EC%98%A4" target="_blank" rel="noopener noreferrer">www.linkedin.com/in/인성-오</a></li>
            </ul>
          </div>
          <div className={styles.infoBlock}>
            <h3 className={styles.subtitle}>Introduction</h3>
            <ul className={styles.introList}>
              <li><strong className={styles.emphasis}>Android/Kotlin</strong>을 중심으로 사용자 경험과 유지보수성을 고민해 왔고, <strong className={styles.emphasis}>Backend</strong>까지 확장해 클라이언트-서버 흐름을 함께 이해하려는 개발자입니다.</li>
              <li>금융·증권 B2B 차트 SDK를 개발하며 <strong className={styles.emphasis}>데이터 정확성, 성능, 안정성</strong>이 사용자 신뢰와 직결되는 도메인 감각을 쌓고 있습니다.</li>
              <li>학습한 내용과 문제 해결 과정을 <strong className={styles.emphasis}>블로그</strong>에 기록하며, 부족했던 부분을 <strong className={styles.emphasis}>재현 가능한 지식</strong>으로 정리해 다음 프로젝트의 기준으로 발전시키고 있습니다.</li>
              <li>의견을 제시할 때는 <strong className={styles.emphasis}>감이 아닌 근거</strong>를 바탕으로 소통하며, 더 나은 방향을 함께 찾는 <strong className={styles.emphasis}>협업</strong>을 지향합니다.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
