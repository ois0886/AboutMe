import styles from './Hero.module.css'

function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <p className={styles.greeting}>안녕하세요, 저는</p>
        <h1 className={styles.name}>오인성</h1>
        <p className={styles.role}>Android Developer</p>
        <p className={styles.description}>
          사용자 경험을 중심으로 생각하는 안드로이드 개발자입니다.
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
      <a href="#about" className={styles.scrollDown} aria-label="아래로 스크롤">
        <span className={styles.scrollIcon} />
      </a>
    </section>
  )
}

export default Hero
