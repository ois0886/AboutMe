import { useScrollReveal } from '../hooks/useScrollReveal'
import styles from './Projects.module.css'

const projects = [
  {
    title: 'Project 1',
    description: '프로젝트 설명을 여기에 작성하세요.',
    tech: ['React', 'TypeScript'],
    link: '#',
  },
  {
    title: 'Project 2',
    description: '프로젝트 설명을 여기에 작성하세요.',
    tech: ['React', 'Node.js'],
    link: '#',
  },
]

function Projects() {
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section id="projects" className="section reveal" ref={ref}>
      <h2 className="section__title">Projects</h2>
      <div className={styles.grid}>
        {projects.map((project) => (
          <a
            key={project.title}
            href={project.link}
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className={styles.thumbnail} />
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
          </a>
        ))}
      </div>
    </section>
  )
}

export default Projects
