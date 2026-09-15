import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import projects from '../projects'

const normalizeText = (text: string) => text.replace(/\s+/g, ' ').trim()

const richTextToText = (item: (typeof projects)[number]['achievements'][number]) =>
  typeof item === 'string'
    ? item
    : item.map((segment) => segment.text).join('')

describe('projects 데이터 무결성', () => {
  it('프로젝트가 1개 이상 존재한다', () => {
    expect(projects.length).toBeGreaterThan(0)
  })

  it('모든 프로젝트에 필수 필드가 존재한다', () => {
    projects.forEach((project) => {
      expect(project.id).toBeTruthy()
      expect(project.title).toBeTruthy()
      expect(project.description).toBeTruthy()
      expect(project.tech.length).toBeGreaterThan(0)
      expect(project.period).toBeTruthy()
      expect(project.team).toBeTruthy()
      expect(project.role).toBeTruthy()
    })
  })

  it('프로젝트 ID가 중복되지 않는다', () => {
    const ids = projects.map((p) => p.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it.each([
    ['naenun-kiosk', '2025.10.10 ~ 2025.11.20', '2025.10 ~ 2025.11'],
    ['mo-re', '2025.08.25 ~ 2025.09.29', '2025.08 ~ 2025.09'],
    ['glim', '2025.07.07 ~ 2025.08.18', '2025.07 ~ 2025.08'],
    ['pubburi', '2025.05.12 ~ 2025.05.28 / 2026.07.01 ~ 2026.07.15', '2025.05 ~ 2025.05 / 2026.07 ~ 2026.07'],
  ])('%s의 개발 기간은 이력서에서 월 단위, 포트폴리오에서 일 단위로 표시한다', (id, period, resumePeriod) => {
    const project = projects.find((item) => item.id === id)!
    expect(project.period).toBe(period)

    const resumeHtml = readFileSync(resolve(process.cwd(), 'resume.html'), 'utf8')
    const resumeDocument = new DOMParser().parseFromString(resumeHtml, 'text/html')
    const resumePeriodElement = resumeDocument.querySelector(
      `[data-project-id="${id}"] .right-meta`,
    )
    expect(normalizeText(resumePeriodElement?.textContent ?? '')).toBe(resumePeriod)
    expect(resumePeriodElement?.querySelector('br')).toBeNull()

    for (const filename of ['portfolio.html']) {
      const html = readFileSync(resolve(process.cwd(), filename), 'utf8')
      const document = new DOMParser().parseFromString(html, 'text/html')
      const title = project.title.split(' - ')[0]
      const heading = Array.from(document.querySelectorAll('h2')).find(
        (element) => element.textContent === title,
      )
      expect(heading?.nextElementSibling?.textContent, filename).toContain(`${period} · `)
    }
  })

  it('모든 프로젝트에 스크린샷이 1개 이상 있다', () => {
    projects.forEach((project) => {
      expect(project.screenshots.length).toBeGreaterThan(0)
    })
  })

  it('모든 프로젝트에 상세 설명이 있다', () => {
    projects.forEach((project) => {
      expect(project.details.length).toBeGreaterThan(0)
    })
  })

  it('problemSolvings 내부 구조가 올바르다', () => {
    projects.forEach((project) => {
      project.problemSolvings.forEach((ps) => {
        expect(ps.problem.length).toBeGreaterThan(0)
        expect(ps.solution.length).toBeGreaterThan(0)
        expect(ps.result.length).toBeGreaterThan(0)
        expect(Array.isArray(ps.implementation)).toBe(true)
        expect(Array.isArray(ps.alternatives)).toBe(true)
      })
    })
  })

  it('주점부리 문제 해결은 2개만 제공한다', () => {
    const pubburi = projects.find((project) => project.id === 'pubburi')

    expect(pubburi).toBeDefined()
    expect(pubburi?.problemSolvings).toHaveLength(2)
  })

  it('강조 세그먼트를 사용하는 항목은 텍스트를 유지한다', () => {
    const highlightedItems = projects.flatMap((project) => [
      ...project.details,
      ...project.features,
      ...project.contributions,
      ...project.achievements,
      ...project.retrospective,
      ...project.problemSolvings.flatMap((ps) => ps.result),
    ])

    highlightedItems.forEach((item) => {
      if (typeof item === 'string') return

      expect(item.length).toBeGreaterThan(0)
      item.forEach((segment) => {
        expect(segment.text).toBeTruthy()
      })
    })
  })

  it('웹 프로젝트 성과와 이력서 프로젝트 성과가 동일하다', () => {
    const resumeHtml = readFileSync(resolve(process.cwd(), 'resume.html'), 'utf8')
    const resumeDocument = new DOMParser().parseFromString(resumeHtml, 'text/html')

    projects.forEach((project) => {
      const resumeAchievements = Array.from(
        resumeDocument.querySelectorAll(`[data-project-id="${project.id}"] > ul > li`),
      ).map((item) => normalizeText(item.textContent ?? ''))
      const webAchievements = project.achievements
        .map(richTextToText)
        .map(normalizeText)

      expect(resumeAchievements, project.id).toEqual(webAchievements)
    })
  })
})
