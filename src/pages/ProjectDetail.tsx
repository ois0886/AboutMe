import { useEffect, useMemo, useState, type FocusEvent } from 'react'
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom'
import ImageViewer from '../components/ImageViewer'
import projects, { type Project } from '../data/projects'
import { plainText, renderRichText } from '../utils/richText'
import styles from './ProjectDetail.module.css'

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
  const hasOverview = project.details.length > 0 || Boolean(project.overviewUrl)
  const sections = useMemo(() => [
    { id: 'project-achievements', label: '성과 및 결과', visible: project.achievements.length > 0 },
    { id: 'project-overview', label: '프로젝트 개요', visible: hasOverview },
    { id: 'project-contributions', label: '담당 역할 및 기여', visible: project.contributions.length > 0 },
    { id: 'project-links', label: '링크', visible: project.links.length > 0 },
    { id: 'project-problems', label: '문제 해결', visible: project.problemSolvings.length > 0 },
    { id: 'project-requirements', label: '주요 요구사항', visible: project.features.length > 0 },
    { id: 'project-insights', label: 'Project Insights', visible: project.insights.length > 0 },
    { id: 'project-screenshots', label: project.imageSectionTitle ?? '스크린샷', visible: project.screenshots.length > 0 },
    { id: 'project-retrospective', label: '프로젝트 회고', visible: project.retrospective.length > 0 },
  ].filter((section) => section.visible), [project, hasOverview])
  const hasToc = sections.length > 1
  const [scrollSection, setScrollSection] = useState<{ locationKey: string; id: string }>()
  const [tocLocationKey, setTocLocationKey] = useState<string | null>(null)
  const isTocOpen = tocLocationKey === location.key
  const sectionFromHash = sections.find((section) => `#${section.id}` === location.hash)?.id
  const activeSection = scrollSection?.locationKey === location.key
    ? scrollSection.id
    : sectionFromHash ?? sections[0]?.id

  useEffect(() => {
    if (!hasToc) return

    let frame = 0
    const updateActiveSection = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        let current = sections[0]?.id
        for (const section of sections) {
          const element = document.getElementById(section.id)
          if (!element) continue
          const offset = parseFloat(getComputedStyle(element).scrollMarginTop) || 128
          if (element.getBoundingClientRect().top <= offset + 1) current = section.id
        }
        const focusedSection = document.activeElement?.closest('section[id^="project-"]')
        if (focusedSection) {
          const { top, bottom } = focusedSection.getBoundingClientRect()
          if (top >= 0 && top < window.innerHeight && bottom > top) current = focusedSection.id
        }
        if (current) setScrollSection((previous) =>
          previous?.locationKey === location.key && previous.id === current
            ? previous
            : { locationKey: location.key, id: current },
        )
      })
    }

    window.addEventListener('scroll', updateActiveSection, { passive: true })
    window.addEventListener('resize', updateActiveSection)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', updateActiveSection)
      window.removeEventListener('resize', updateActiveSection)
    }
  }, [hasToc, location.key, sections])

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

  const revealFocusedControl = (event: FocusEvent<HTMLElement>) => {
    const control = event.target
    if (!event.currentTarget.contains(control) || !control.matches('a:focus-visible, button:focus-visible')) return

    requestAnimationFrame(() => {
      if (document.activeElement !== control) return
      const offset = parseFloat(getComputedStyle(control).scrollMarginTop)
      if (offset > 0 && control.getBoundingClientRect().top < offset - 1) {
        control.scrollIntoView?.({ block: 'start', behavior: 'instant' })
      }
    })
  }

  return (
    <div className={styles.page}>
      <main id="main-content" className={styles.container} tabIndex={-1} onFocus={revealFocusedControl}>
        <header className={styles.hero}>
          <a href="#" onClick={handleBack} className={styles.backLink}>← 돌아가기</a>

          <h1 className={styles.title}>{project.title}</h1>
          <p className={styles.descriptionText}>{project.description}</p>

          <dl className={styles.meta}>
            <div className={styles.metaItem}>
              <dt className={styles.metaLabel}>역할</dt>
              <dd>{project.role}</dd>
            </div>
            <div className={styles.metaItem}>
              <dt className={styles.metaLabel}>기간</dt>
              <dd>{project.period}</dd>
            </div>
            {project.team && (
              <div className={styles.metaItem}>
                <dt className={styles.metaLabel}>팀 구성</dt>
                <dd>{project.team}</dd>
              </div>
            )}
          </dl>

          <div className={styles.techList}>
            {project.tech.map((t) => (
              <span key={t} className={styles.tag}>{t}</span>
            ))}
          </div>
        </header>

        <div className={hasToc ? styles.detailLayout : styles.detailWithoutToc}>
          {hasToc && (
            <aside
              className={styles.toc}
              onBlur={(event) => {
                if (isTocOpen && !event.currentTarget.contains(event.relatedTarget)) setTocLocationKey(null)
              }}
            >
              <nav aria-label="프로젝트 목차">
                <p className={styles.tocCaption}>목차</p>
                <button
                  type="button"
                  className={styles.tocToggle}
                  aria-expanded={isTocOpen}
                  aria-controls="project-toc-links"
                  onClick={() => setTocLocationKey(isTocOpen ? null : location.key)}
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
                      <Link
                        to={{ pathname: location.pathname, search: location.search, hash: `#${section.id}` }}
                        replace
                        state={location.state}
                        aria-current={activeSection === section.id ? 'location' : undefined}
                      >
                        {section.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>
          )}
          <div className={styles.content}>
          {project.achievements.length > 0 && (
          <section id="project-achievements" className={styles.section} tabIndex={-1}>
            <h2 className={styles.sectionTitle}>성과 및 결과</h2>
            <ul className={styles.list}>
              {project.achievements.map((item) => (
                <li key={plainText(item)} className={styles.listItem}>
                  {renderRichText(item, styles.emphasis)}
                </li>
              ))}
            </ul>
          </section>
        )}

        {hasOverview && (
          <section id="project-overview" className={styles.section} tabIndex={-1}>
            <h2 className={styles.sectionTitle}>프로젝트 개요</h2>
            <ul className={styles.list}>
              {project.details.map((detail) => (
                <li key={plainText(detail)} className={styles.listItem}>
                  {renderRichText(detail, styles.emphasis)}
                </li>
              ))}
              {project.overviewUrl && (
                <li className={styles.listItem}>
                  <a href={project.overviewUrl} target="_blank" rel="noopener noreferrer" className={styles.textLink}>
                    {project.overviewUrl}
                  </a>
                </li>
              )}
            </ul>
          </section>
        )}

        {project.contributions.length > 0 && (
          <section id="project-contributions" className={styles.section} tabIndex={-1}>
            <h2 className={styles.sectionTitle}>담당 역할 및 기여</h2>
            <ul className={styles.list}>
              {project.contributions.map((item) => (
                <li key={plainText(item)} className={styles.listItem}>
                  {renderRichText(item, styles.emphasis)}
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
                      <li key={plainText(item)} className={styles.listItem}>
                        {renderRichText(item, styles.emphasis)}
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

        {project.features.length > 0 && (
          <section id="project-requirements" className={styles.section} tabIndex={-1}>
            <h2 className={styles.sectionTitle}>주요 요구사항</h2>
            <ul className={styles.list}>
              {project.features.map((feature) => (
                <li key={plainText(feature)} className={styles.listItem}>
                  {renderRichText(feature, styles.emphasis)}
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
                    className={styles.textLink}
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
                <li key={plainText(item)} className={styles.listItem}>
                  {renderRichText(item, styles.emphasis)}
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
