import { useScrollReveal } from '../hooks/useScrollReveal'
import styles from './Contact.module.css'

function Contact() {
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section id="contact" className="section reveal" ref={ref}>
      <h2 className="section__title">Contact</h2>
      <p className={styles.description}>
        방문해주셔서 감사합니다.
      </p>
      <div className={styles.links}>
        <a href="mailto:superohinsung@naver.com" className={styles.link}>
          Email
        </a>
        <a
          href="https://github.com/ois0886"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          GitHub
        </a>
      </div>
    </section>
  )
}

export default Contact
