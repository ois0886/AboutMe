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
              <li><span className={styles.label}>TEL.</span> 010-5905-9620</li>
              <li><span className={styles.label}>E-MAIL.</span> <a href="mailto:superohinsung@naver.com">superohinsung@naver.com</a></li>
              <li><span className={styles.label}>GitHub.</span> <a href="https://github.com/ois0886" target="_blank" rel="noopener noreferrer">github.com/ois0886</a></li>
              <li><span className={styles.label}>Birth.</span> 1996.06.21</li>
              <li><span className={styles.label}>Address.</span> 서울시 금천구</li>
            </ul>
          </div>
          <div className={styles.infoBlock}>
            <h3 className={styles.subtitle}>Introduction</h3>
            <ul className={styles.introList}>
              <li>팀 성장에 기여하기 위해 코드 리뷰를 적극적으로 활용하고, 테스트 가능한 코드 작성에 노력합니다.</li>
              <li>제 미숙한 부분을 블로그 기록을 통해서 보완하고 강점으로 발전시키는 데 힘쓰고 있습니다.</li>
              <li>의견을 제시할 때 근거를 들어 말하도록 노력합니다.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
