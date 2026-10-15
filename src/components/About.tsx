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
              <li>Java와 Kotlin을 연동하는 금융 차트 앱을 개발하며, 화면 상태와 조회 및 실시간 데이터의 흐름을 관리합니다.</li>
              <li>Compose 화면을 역할별로 분리하고, 인증 예외와 화면 상태 변화를 단위 테스트로 검증합니다.</li>
              <li>학습한 내용과 문제 해결 과정을 블로그에 기록하고, 코드 리뷰에서 구현 근거를 공유합니다.</li>
              <li>AI 도구에 독립적인 작업을 나눠 맡기고, 코드 리뷰와 테스트로 결과를 확인합니다.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
