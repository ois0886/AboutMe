import { useParams, Link } from 'react-router-dom'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import kotlin from 'react-syntax-highlighter/dist/esm/languages/prism/kotlin'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

SyntaxHighlighter.registerLanguage('kotlin', kotlin)
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

  const topScreenshots = project.screenshots.slice(0, -1)
  const bottomScreenshot = project.screenshots.length > 1
    ? project.screenshots[project.screenshots.length - 1]
    : null

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Link to="/#projects" className={styles.backLink}>← 돌아가기</Link>

        <h1 className={styles.title}>{project.title}</h1>
        <p className={styles.descriptionText}>{project.description}</p>

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

        {topScreenshots.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>스크린샷</h2>
            {topScreenshots[0] && (
              <div className={styles.screenshotFull}>
                <div className={styles.screenshotWrap}>
                  <img src={topScreenshots[0]} alt={project.title} className={styles.screenshot} />
                </div>
              </div>
            )}
            {topScreenshots.length > 1 && (
              <div className={styles.screenshotRows}>
                {Array.from({ length: Math.ceil((topScreenshots.length - 1) / 2) }, (_, i) => {
                  const idx = 1 + i * 2
                  return (
                    <div key={idx} className={styles.screenshotRow}>
                      <div className={styles.screenshotWrap}>
                        <img src={topScreenshots[idx]} alt={project.title} className={styles.screenshot} />
                      </div>
                      {topScreenshots[idx + 1] && (
                        <div className={styles.screenshotWrap}>
                          <img src={topScreenshots[idx + 1]} alt={project.title} className={styles.screenshot} />
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </section>
        )}

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>프로젝트 개요</h2>
          <ul className={styles.list}>
            {project.details.map((detail) => (
              <li key={detail} className={styles.listItem}>{detail}</li>
            ))}
          </ul>
        </section>

        {project.features.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>주요 요구사항</h2>
            <ul className={styles.list}>
              {project.features.map((feature) => (
                <li key={feature} className={styles.listItem}>{feature}</li>
              ))}
            </ul>
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

        {project.contributions.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>담당 역할 및 기여</h2>
            <ul className={styles.list}>
              {project.contributions.map((item) => (
                <li key={item} className={styles.listItem}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        {project.problemSolving && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>문제 해결</h2>
            <div className={styles.psBlock}>
              <h3 className={styles.psLabel}>문제</h3>
              <ul className={styles.list}>
                {project.problemSolving.problem.map((item) => (
                  <li key={item} className={styles.listItem}>{item}</li>
                ))}
              </ul>
            </div>
            <div className={styles.psBlock}>
              <h3 className={styles.psLabel}>해결 방법</h3>
              <ul className={styles.list}>
                {project.problemSolving.solution.map((item) => (
                  <li key={item} className={styles.listItem}>{item}</li>
                ))}
              </ul>
            </div>
            <div className={styles.psBlock}>
              <h3 className={styles.psLabel}>결과</h3>
              <ul className={styles.list}>
                {project.problemSolving.result.map((item) => (
                  <li key={item} className={styles.listItem}>{item}</li>
                ))}
              </ul>
            </div>
            {project.implementation.length > 0 && (
              <div className={styles.psBlock}>
                <h3 className={styles.psLabel}>구체적인 구현 설명</h3>
                {project.implementation.map((block, idx) => (
                  <div key={idx} className={styles.implBlock}>
                    <blockquote className={styles.implDescription}>
                      {block.description}
                    </blockquote>
                    {block.code && (
                      <SyntaxHighlighter
                        language="kotlin"
                        style={oneDark}
                        customStyle={{ borderRadius: '8px', fontSize: '0.85rem', margin: 0 }}
                      >
                        {block.code}
                      </SyntaxHighlighter>
                    )}
                  </div>
                ))}
              </div>
            )}
            {project.alternatives.length > 0 && (
              <div className={styles.psBlock}>
                <h3 className={styles.psLabel}>대체안</h3>
                <ul className={styles.list}>
                  {project.alternatives.map((item) => (
                    <li key={item} className={styles.listItem}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        )}

        {project.achievements.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>성과 및 결과</h2>
            <ul className={styles.list}>
              {project.achievements.map((item) => (
                <li key={item} className={styles.listItem}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        {project.retrospective.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>프로젝트 회고</h2>
            <ul className={styles.list}>
              {project.retrospective.map((item) => (
                <li key={item} className={styles.listItem}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        {bottomScreenshot && (
          <section className={styles.section}>
            <div className={styles.screenshots}>
              <div className={styles.screenshotWrap}>
                <img src={bottomScreenshot} alt={project.title} className={styles.screenshot} />
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

export default ProjectDetail
