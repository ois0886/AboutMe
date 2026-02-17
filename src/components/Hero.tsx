import styles from './Hero.module.css'

function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <p className={styles.greeting}>안녕하세요, 저는</p>
        <h1 className={styles.name}>오인성</h1>
        <p className={styles.role}>Frontend Developer</p>
        <p className={styles.description}>
          사용자 경험을 중심으로 생각하는 프론트엔드 개발자입니다.
        </p>
        <div className={styles.cta}>
          <a href="#projects" className={styles.btnPrimary}>
            프로젝트 보기
          </a>
          <a href="#contact" className={styles.btnSecondary}>
            연락하기
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero
