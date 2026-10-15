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
    title: 'Compose-Chart',
    period: '2026.02 ~ 2026.03 (Android 1인)',
    description:
      'Canvas API로 선, 막대, 도넛, 원형, 게이지, 레이더 차트를 구현한 Jetpack Compose 라이브러리입니다. Maven Central에 v1.3.2를 배포했습니다.',
    image: 'screenshot/chart.png',
    tech: ['Kotlin', 'Jetpack Compose', 'Canvas API'],
    github: 'https://github.com/ois0886/compose-chart',
  },
  {
    title: 'Compose-Git-Grass',
    period: '2026.02 (Android 1인)',
    description:
      'Compose 기본 요소로 GitHub 잔디 형태의 UI를 구현한 라이브러리입니다. Maven Central에 v1.2.0을 배포했습니다.',
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
      <p className={styles.subtitle}>라이브러리를 선택하면 GitHub 저장소로 이동합니다.</p>
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
