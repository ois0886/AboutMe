import { useScrollReveal } from '../hooks/useScrollReveal'
import styles from './OpenSource.module.css'

interface OpenSourceProject {
  title: string
  period: string
  description: string
  image: string
  tech: string[]
  github: string
}

const openSourceProjects: OpenSourceProject[] = [
  {
    title: 'Compose-Git-Grass',
    period: '2026.02 (Android 1인)',
    description:
      'GitHub 잔디(contribution graph)를 Compose에서 바로 사용할 수 있는 오픈소스 UI 라이브러리',
    image: 'screenshot/Grass1.png',
    tech: ['Kotlin', 'Jetpack Compose'],
    github: 'https://github.com/ois0886/compose-git-grass',
  },
]

function OpenSource() {
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section id="opensource" className="section reveal" ref={ref}>
      <h2 className="section__title">Open Source</h2>
      <p className={styles.subtitle}>라이브러리를 클릭하면 Github로 이동합니다.</p>
      <div className={styles.grid}>
        {openSourceProjects.map((project) => {
          const content = (
            <>
              {project.image && (
                <div className={styles.imageWrap}>
                  <img src={project.image} alt={project.title} className={styles.image} />
                </div>
              )}
              <div className={styles.body}>
                <h3 className={styles.title}>{project.title}</h3>
                <span className={styles.period}>{project.period}</span>
                <p className={styles.description}>{project.description}</p>
                <ul className={styles.tech}>
                  {project.tech.map((t) => (
                    <li key={t} className={styles.tag}>{t}</li>
                  ))}
                </ul>
              </div>
            </>
          )

          return project.github ? (
            <a
              key={project.title}
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.cardLink}
            >
              {content}
            </a>
          ) : (
            <div key={project.title} className={styles.card}>
              {content}
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default OpenSource
