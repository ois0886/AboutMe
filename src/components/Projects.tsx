import { Link } from 'react-router-dom'
import { useScrollReveal } from '../hooks/useScrollReveal'
import projects from '../data/projects'
import styles from './Projects.module.css'

function Projects() {
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section id="projects" className="section reveal" ref={ref}>
      <h2 className="section__title">Projects</h2>
      <div className={styles.grid}>
        {projects.map((project) => (
          <Link
            key={project.id}
            to={`/projects/${project.id}`}
            className={styles.card}
          >
            <div
              className={styles.thumbnail}
              style={project.thumbnail ? { backgroundImage: `url(${project.thumbnail})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
            />
            <div className={styles.info}>
              <h3 className={styles.title}>{project.title}</h3>
              <p className={styles.description}>{project.description}</p>
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
