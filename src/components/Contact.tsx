import { useScrollReveal } from '../hooks/useScrollReveal'
import styles from './Contact.module.css'

function Contact() {
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section id="contact" className="section reveal" ref={ref}>
      <div className={styles.panel}>
        <h2 className="section__title" aria-label="Contact">Contact</h2>
        <p className={styles.description}>
          포트폴리오를 방문해 주셔서 감사합니다.
        </p>
        <div className={styles.links}>
          <a href="mailto:superohinsung@naver.com" className={styles.link}>
            Email <span aria-hidden="true">↗</span>
          </a>
          <a
            href="https://github.com/ois0886"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            GitHub <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  )
}

export default Contact
