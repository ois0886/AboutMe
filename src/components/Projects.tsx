import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useScrollReveal } from '../hooks/useScrollReveal'
import projects, { type RichText } from '../data/projects'
import styles from './Projects.module.css'

function renderRichText(content: RichText): ReactNode {
  if (typeof content === 'string') return content

  return content.map((segment, index) =>
    segment.strong ? (
      <strong key={`${segment.text}-${index}`} className={styles.emphasis}>
        {segment.text}
      </strong>
    ) : (
      <span key={`${segment.text}-${index}`}>{segment.text}</span>
    ),
  )
}

function Projects() {
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section id="projects" className="section reveal" ref={ref}>
      <h2 className="section__title">Projects</h2>
      <p className={styles.subtitle}>프로젝트를 클릭하면 상세페이지로 이동합니다.</p>
      <div className={styles.grid}>
        {projects.map((project) => (
          <Link
            key={project.id}
            to={`/projects/${project.id}`}
            state={{ fromPortfolio: true }}
            onClick={() => sessionStorage.setItem('scrollY', String(window.scrollY))}
            className={styles.card}
          >
            <div
              className={styles.thumbnail}
              style={project.thumbnail ? { backgroundImage: `url(${project.thumbnail})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
            />
            <div className={styles.info}>
              <h3 className={styles.title}>{project.title}</h3>
              <p className={styles.period}>{project.period}</p>
              <p className={styles.description}>{project.description}</p>
              {project.achievements.length > 0 && (
                <ul className={styles.highlights}>
                  {project.achievements.slice(0, 3).map((item) => (
                    <li
                      key={typeof item === 'string' ? item : item.map((segment) => segment.text).join('')}
                      className={styles.highlight}
                    >
                      {renderRichText(item)}
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
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default Projects
