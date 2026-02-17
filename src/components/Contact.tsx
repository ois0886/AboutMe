import { useScrollReveal } from '../hooks/useScrollReveal'
import styles from './Contact.module.css'

function Contact() {
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section id="contact" className="section reveal" ref={ref} style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
      <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto' }}>
        <h2 className="section__title">Contact</h2>
        <p className={styles.description}>
          함께 일하고 싶으시다면 언제든지 연락해 주세요!
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
      </div>
    </section>
  )
}

export default Contact
