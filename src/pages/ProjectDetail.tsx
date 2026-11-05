import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom'
import ImageViewer from '../components/ImageViewer'
import projects, { type Project, type RichText } from '../data/projects'
import styles from './ProjectDetail.module.css'

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

function ProjectDetail() {
  const { id } = useParams<{ id: string }>()
  const project = projects.find((p) => p.id === id)

  if (!project) {
    return (
      <main id="main-content" className={styles.notFound} tabIndex={-1}>
        <h2>프로젝트를 찾을 수 없습니다.</h2>
        <Link to="/" className={styles.backLink}>홈으로 돌아가기</Link>
      </main>
    )
  }

  return <ProjectCaseStudy key={project.id} project={project} />
}

function ProjectCaseStudy({ project }: { project: Project }) {
  const navigate = useNavigate()
  const location = useLocation()
  const sections = useMemo(() => [
    { id: 'project-achievements', label: '성과 및 결과', visible: project.achievements.length > 0 },
    { id: 'project-links', label: '링크', visible: project.links.length > 0 },
    { id: 'project-overview', label: '프로젝트 개요', visible: project.details.length > 0 },
    { id: 'project-requirements', label: '주요 요구사항', visible: project.features.length > 0 },
    { id: 'project-insights', label: 'Project Insights', visible: project.insights.length > 0 },
    { id: 'project-contributions', label: '담당 역할 및 기여', visible: project.contributions.length > 0 },
    { id: 'project-problems', label: '문제 해결', visible: project.problemSolvings.length > 0 },
    { id: 'project-screenshots', label: project.imageSectionTitle ?? '스크린샷', visible: project.screenshots.length > 0 },
    { id: 'project-retrospective', label: '프로젝트 회고', visible: project.retrospective.length > 0 },
  ].filter((section) => section.visible), [project])
  const [activeSection, setActiveSection] = useState(sections[0]?.id)
  const [isTocOpen, setIsTocOpen] = useState(false)

  useEffect(() => {
    let frame = 0
    const updateActiveSection = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const headerHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 80
        const sectionOffset = headerHeight + (window.innerWidth <= 1000 ? 96 : 48)
        let current = sections[0]?.id
        for (const section of sections) {
          const element = document.getElementById(section.id)
          if (element && element.getBoundingClientRect().top <= sectionOffset) current = section.id
        }
        setActiveSection(current)
      })
    }

    window.addEventListener('scroll', updateActiveSection, { passive: true })
    window.addEventListener('resize', updateActiveSection)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', updateActiveSection)
      window.removeEventListener('resize', updateActiveSection)
    }
  }, [sections])

  const navigateToSection = (event: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    event.preventDefault()
    const section = document.getElementById(sectionId)
    if (!section) return

    section.focus({ preventScroll: true })
    section.scrollIntoView?.({
      block: 'start',
      behavior: window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    })
    setActiveSection(sectionId)
    setIsTocOpen(false)
  }

  const cols = project.screenshotColumns || 2
  const showBottom = project.hasBottomScreenshot !== false && project.screenshots.length > 1
  const topScreenshots = showBottom ? project.screenshots.slice(0, -1) : project.screenshots
  const bottomScreenshot = showBottom
    ? project.screenshots[project.screenshots.length - 1]
    : null
  const fromPortfolio = (location.state as { fromPortfolio?: boolean } | null)?.fromPortfolio

  const renderScreenshot = (src: string) => {
    const description = project.screenshotDescriptions?.[src]
    return (
      <>
        <ImageViewer
          key={src}
          src={src}
          alt={description?.alt ?? project.title}
          className={styles.screenshot}
          loading="lazy"
          decoding="async"
        />
        {description && <p className={styles.screenshotCaption}>{description.caption}</p>}
      </>
    )
  }

  const handleBack = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    if (fromPortfolio) {
      navigate(-1)
      return
    }
    if (window.history.length > 1) {
      navigate(-1)
      return
    }
    navigate('/')
  }

  return (
    <div className={styles.page}>
      <main id="main-content" className={styles.container} tabIndex={-1}>
        <header className={styles.hero}>
          <a href="#" onClick={handleBack} className={styles.backLink}>← 돌아가기</a>

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
        </header>

        <div className={styles.detailLayout}>
          <aside className={styles.toc}>
            <nav aria-label="프로젝트 목차">
              <p className={styles.tocCaption}>목차</p>
              <button
                type="button"
                className={styles.tocToggle}
                aria-expanded={isTocOpen}
                aria-controls="project-toc-links"
                onClick={() => setIsTocOpen((value) => !value)}
              >
                <span>목차</span>
                <span aria-hidden="true">{isTocOpen ? '−' : '+'}</span>
              </button>
              <ul
                id="project-toc-links"
                className={`${styles.tocList} ${!isTocOpen ? styles.tocListCollapsed : ''}`}
              >
                {sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${location.pathname}#${section.id}`}
                      aria-current={activeSection === section.id ? 'location' : undefined}
                      onClick={(event) => navigateToSection(event, section.id)}
                    >
                      {section.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
          <div className={styles.content}>
          {project.achievements.length > 0 && (
          <section id="project-achievements" className={styles.section} tabIndex={-1}>
            <h2 className={styles.sectionTitle}>성과 및 결과</h2>
            <ul className={styles.list}>
              {project.achievements.map((item) => (
                <li key={typeof item === 'string' ? item : item.map((segment) => segment.text).join('')} className={styles.listItem}>
                  {renderRichText(item)}
                </li>
              ))}
            </ul>
          </section>
        )}

        {project.links.length > 0 && (
          <section id="project-links" className={styles.section} tabIndex={-1}>
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

        <section id="project-overview" className={styles.section} tabIndex={-1}>
          <h2 className={styles.sectionTitle}>프로젝트 개요</h2>
          <ul className={styles.list}>
            {project.details.map((detail) => (
              <li key={typeof detail === 'string' ? detail : detail.map((segment) => segment.text).join('')} className={styles.listItem}>
                {renderRichText(detail)}
              </li>
            ))}
          </ul>
        </section>

        {project.features.length > 0 && (
          <section id="project-requirements" className={styles.section} tabIndex={-1}>
            <h2 className={styles.sectionTitle}>주요 요구사항</h2>
            <ul className={styles.list}>
              {project.features.map((feature) => (
                <li key={typeof feature === 'string' ? feature : feature.map((segment) => segment.text).join('')} className={styles.listItem}>
                  {renderRichText(feature)}
                </li>
              ))}
            </ul>
          </section>
        )}

        {project.insights.length > 0 && (
          <section id="project-insights" className={styles.section} tabIndex={-1}>
            <h2 className={styles.sectionTitle}>Project Insights</h2>
            <ul className={styles.list}>
              {project.insights.map((insight) => (
                <li key={insight.url} className={styles.listItem}>
                  <a
                    href={insight.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.insightLink}
                  >
                    {insight.title}
                  </a>
                </li>
              ))}
            </ul>
            {project.insightImages && project.insightImages.length > 0 && (
              <div style={{ marginTop: '24px' }}>
                {project.insightImages.map((img) => (
                  <div key={img} className={styles.screenshotFull} style={{ marginBottom: '16px' }}>
                    <div className={styles.screenshotWrap}>
                      <ImageViewer src={img} alt="Insight" className={styles.screenshot} loading="lazy" decoding="async" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {project.contributions.length > 0 && (
          <section id="project-contributions" className={styles.section} tabIndex={-1}>
            <h2 className={styles.sectionTitle}>담당 역할 및 기여</h2>
            <ul className={styles.list}>
              {project.contributions.map((item) => (
                <li key={typeof item === 'string' ? item : item.map((segment) => segment.text).join('')} className={styles.listItem}>
                  {renderRichText(item)}
                </li>
              ))}
            </ul>
          </section>
        )}

        {project.problemSolvings.length > 0 && (
          <section id="project-problems" className={styles.section} tabIndex={-1}>
            <h2 className={styles.sectionTitle}>문제 해결</h2>
            {project.problemSolvings.map((ps, psIdx) => (
              <div key={psIdx} className={styles.psGroup}>
                {project.problemSolvings.length > 1 && (
                  <h3 className={styles.psNumber}>{psIdx + 1}</h3>
                )}
                <div className={styles.psBlock}>
                  <h3 className={styles.psLabel}>문제</h3>
                  <ul className={styles.list}>
                    {ps.problem.map((item) => (
                      <li key={item} className={styles.listItem}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className={styles.psBlock}>
                  <h3 className={styles.psLabel}>해결 방법</h3>
                  <ul className={styles.list}>
                    {ps.solution.map((item) => (
                      <li key={item} className={styles.listItem}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className={styles.psBlock}>
                  <h3 className={styles.psLabel}>결과</h3>
                  <ul className={styles.list}>
                    {ps.result.map((item) => (
                      <li key={typeof item === 'string' ? item : item.map((segment) => segment.text).join('')} className={styles.listItem}>
                        {renderRichText(item)}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={styles.psBlock}>
                  <h3 className={styles.psLabel}>이미지</h3>
                  <figure className={styles.implementationVisual}>
                    <ImageViewer
                      key={ps.visual.src}
                      src={ps.visual.src}
                      alt={ps.visual.alt}
                      width={1672}
                      height={941}
                      loading="lazy"
                      decoding="async"
                    />
                  </figure>
                  {ps.implementation.map((block, idx) => (
                    <div key={idx} className={styles.implBlock}>
                      <p className={styles.implDescription}>
                        {block.description}
                      </p>
                    </div>
                  ))}
                </div>
                {ps.alternatives.length > 0 && (
                  <div className={styles.psBlock}>
                    <h3 className={styles.psLabel}>대체안</h3>
                    <ul className={styles.list}>
                      {ps.alternatives.map((item) => (
                        <li key={item} className={styles.listItem}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </section>
        )}

        {topScreenshots.length > 0 && (
          <section id="project-screenshots" className={styles.section} tabIndex={-1}>
            <h2 className={styles.sectionTitle}>{project.imageSectionTitle ?? '스크린샷'}</h2>
            {topScreenshots[0] && (
              <div className={styles.screenshotFull}>
                <div className={styles.screenshotWrap}>
                  {renderScreenshot(topScreenshots[0])}
                </div>
              </div>
            )}
            {topScreenshots.length > 1 && (
              <div className={styles.screenshotRows}>
                {Array.from({ length: Math.ceil((topScreenshots.length - 1) / cols) }, (_, i) => {
                  const startIdx = 1 + i * cols
                  return (
                    <div
                      key={startIdx}
                      className={styles.screenshotRow}
                      style={cols !== 2 ? { gridTemplateColumns: `repeat(${cols}, 1fr)` } : undefined}
                    >
                      {Array.from({ length: cols }, (_, j) => {
                        const img = topScreenshots[startIdx + j]
                        return img ? (
                          <div key={j} className={styles.screenshotWrap}>
                            {renderScreenshot(img)}
                          </div>
                        ) : null
                      })}
                    </div>
                  )
                })}
              </div>
            )}
            {bottomScreenshot && (
              <div className={styles.screenshots}>
                <div className={styles.screenshotWrap}>
                  {renderScreenshot(bottomScreenshot)}
                </div>
              </div>
            )}
          </section>
        )}

          {project.retrospective.length > 0 && (
          <section id="project-retrospective" className={styles.section} tabIndex={-1}>
            <h2 className={styles.sectionTitle}>프로젝트 회고</h2>
            <ul className={styles.list}>
              {project.retrospective.map((item) => (
                <li key={typeof item === 'string' ? item : item.map((segment) => segment.text).join('')} className={styles.listItem}>
                  {renderRichText(item)}
                </li>
              ))}
            </ul>
          </section>
          )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default ProjectDetail
