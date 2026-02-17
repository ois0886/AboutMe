import { useParams, Link } from 'react-router-dom'
import projects from '../data/projects'
import styles from './ProjectDetail.module.css'

function ProjectDetail() {
  const { id } = useParams<{ id: string }>()
  const project = projects.find((p) => p.id === id)

  if (!project) {
    return (
      <div className={styles.notFound}>
        <h2>프로젝트를 찾을 수 없습니다.</h2>
        <Link to="/" className={styles.backLink}>홈으로 돌아가기</Link>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Link to="/#projects" className={styles.backLink}>← 돌아가기</Link>

        <h1 className={styles.title}>{project.title}</h1>

        <div className={styles.meta}>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>기간</span>
            <span>{project.period}</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>팀 구성</span>
            <span>{project.team}</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>역할</span>
            <span>{project.role}</span>
          </div>
        </div>

        <div className={styles.techList}>
          {project.tech.map((t) => (
            <span key={t} className={styles.tag}>{t}</span>
          ))}
        </div>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>프로젝트 소개</h2>
          <ul className={styles.list}>
            {project.details.map((detail) => (
              <li key={detail} className={styles.listItem}>{detail}</li>
            ))}
          </ul>
        </section>

        {project.features.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>주요 기능</h2>
            <ul className={styles.list}>
              {project.features.map((feature) => (
                <li key={feature} className={styles.listItem}>{feature}</li>
              ))}
            </ul>
          </section>
        )}

        {project.screenshots.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>스크린샷</h2>
            <div className={styles.screenshots}>
              {project.screenshots.map((src) => (
                <div key={src} className={styles.screenshotWrap}>
                  <img src={src} alt={project.title} className={styles.screenshot} />
                </div>
              ))}
            </div>
          </section>
        )}

        {project.links.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>링크</h2>
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
          </section>
        )}
      </div>
    </div>
  )
}

export default ProjectDetail
