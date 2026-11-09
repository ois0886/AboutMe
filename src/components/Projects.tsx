import { Link } from 'react-router-dom'
import { useScrollReveal } from '../hooks/useScrollReveal'
import projects from '../data/projects'
import { plainText, renderRichText } from '../utils/richText'
import styles from './Projects.module.css'

const projectsByStartDate = [...projects].sort((left, right) => {
  const [leftStart] = left.period.split(' ~ ')
  const [rightStart] = right.period.split(' ~ ')
  return rightStart.localeCompare(leftStart)
})

function Projects() {
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section id="projects" className="section reveal" ref={ref}>
      <h2 className="section__title" aria-label="Projects">Projects</h2>
      <p className={styles.subtitle}>프로젝트 선택 시 상세페이지로 이동</p>
      <div className={styles.grid}>
        {projectsByStartDate.map((project, index) => (
          <article key={project.id} className={styles.card}>
            <div className={styles.info}>
              <span className={styles.index} aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              <h3 className={styles.title}>
                <Link
                  to={`/projects/${project.id}`}
                  state={{ fromPortfolio: true }}
                  onClick={() => sessionStorage.setItem('scrollY', String(window.scrollY))}
                  className={styles.titleLink}
                >
                  {project.title}
                </Link>
              </h3>
              <p className={styles.period}>{project.period}</p>
              <p className={styles.description}>{project.cardSummary.description}</p>
              {project.cardSummary.achievements.length > 0 && (
                <ul className={styles.highlights}>
                  {project.cardSummary.achievements.slice(0, 3).map((item) => (
                    <li
                      key={plainText(item)}
                      className={styles.highlight}
                    >
                      {renderRichText(item, styles.emphasis)}
                    </li>
                  ))}
                </ul>
              )}
              <ul className={styles.tech}>
                {project.tech.map((t) => (
                  <li key={t} className={styles.tag}>
                    {t}
                  </li>
                ))}
              </ul>
              <span className={styles.readMore} aria-hidden="true">자세히 보기 <span>↗</span></span>
            </div>
            <div
              className={styles.thumbnail}
              style={project.thumbnail ? { backgroundImage: `url(${project.thumbnail})` } : undefined}
            />
          </article>
        ))}
      </div>
    </section>
  )
}

export default Projects
