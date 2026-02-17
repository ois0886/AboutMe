import { useScrollReveal } from '../hooks/useScrollReveal'
import styles from './OpenSource.module.css'

interface OpenSourceProject {
  title: string
  description: string
  tech: string[]
  links: { label: string; url: string }[]
}

const openSourceProjects: OpenSourceProject[] = [
  {
    title: 'Open Source UI Library',
    description:
      'Android Jetpack Compose 기반 재사용 가능한 UI 컴포넌트 라이브러리를 개발하고, Maven Central에 배포하여 누구나 의존성 추가로 사용 가능하도록 공개',
    tech: ['Kotlin', 'Jetpack Compose', 'Maven Central'],
    links: [],
  },
]

function OpenSource() {
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section id="opensource" className="section reveal" ref={ref}>
      <h2 className="section__title">Open Source</h2>
      <div className={styles.grid}>
        {openSourceProjects.map((project) => (
          <div key={project.title} className={styles.card}>
            <h3 className={styles.title}>{project.title}</h3>
            <p className={styles.description}>{project.description}</p>
            <ul className={styles.tech}>
              {project.tech.map((t) => (
                <li key={t} className={styles.tag}>{t}</li>
              ))}
            </ul>
            {project.links.length > 0 && (
              <div className={styles.links}>
                {project.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.linkBtn}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default OpenSource
