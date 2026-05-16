import { useScrollReveal } from '../hooks/useScrollReveal'
import { careers, getTotalCareer } from './careerUtils'
import styles from './Career.module.css'

function Career() {
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section id="career" className="section reveal" ref={ref}>
      <div>
        <h2 className="section__title">Career</h2>
        <p className={styles.totalCareer}>총 경력 {getTotalCareer()}</p>
        <div className={styles.list}>
          {careers.map((career) => (
            <div key={career.company} className={styles.card}>
              <div className={styles.header}>
                <div>
                  <h3 className={styles.company}>{career.company}</h3>
                  <p className={styles.role}>
                    {career.role}
                    {career.location && ` | ${career.location}`}
                  </p>
                </div>
                <span className={styles.period}>{career.periodLabel}</span>
              </div>
              <ul className={styles.tasks}>
                {career.tasks.map((task) => (
                  <li key={task} className={styles.task}>{task}</li>
                ))}
              </ul>
              {career.links && career.links.length > 0 && (
                <div className={styles.links}>
                  {career.links.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.link}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Career
