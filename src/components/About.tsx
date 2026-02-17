import styles from './About.module.css'

function About() {
  return (
    <section id="about" className="section">
      <h2 className="section__title">About</h2>
      <div className={styles.content}>
        <p>
          안녕하세요! 프론트엔드 개발자 오인성입니다.
          <br />
          깔끔한 코드와 직관적인 UI를 만드는 것을 좋아합니다.
        </p>
      </div>
    </section>
  )
}

export default About
