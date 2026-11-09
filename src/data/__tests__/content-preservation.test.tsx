import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import App from '../../App'
import ProjectDetail from '../../pages/ProjectDetail'
import projects, { type Project } from '../projects'
import { plainText } from '../../utils/richText'

type HomeSectionContent = {
  id: string
  textSegments: string[]
  emphasis: string[]
  links: Array<{ text: string; href: string }>
  images: Array<{ src: string; alt: string }>
}

const readBaseline = <T,>(filename: string): T => JSON.parse(
  readFileSync(resolve(process.cwd(), 'src/test', filename), 'utf8'),
)

const projectBaseline = readBaseline<Project[]>('projects-preserved-content.json')
const homeBaseline = readBaseline<{ date: string; sections: HomeSectionContent[] }>(
  'home-preserved-content.json',
)

const compact = (text: string) => text.replace(/\s+/g, '')
const visibleText = (element: Element) => {
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT)
  const segments: string[] = []
  while (walker.nextNode()) {
    const node = walker.currentNode
    if (!node.parentElement?.closest('[aria-hidden="true"]')) {
      segments.push(node.textContent ?? '')
    }
  }
  return compact(segments.join(''))
}

describe('리디자인 콘텐츠 보존', () => {
  it('프로젝트 데이터는 승인된 세 문장 삭제 외의 모든 원문과 이미지, 링크를 보존한다', () => {
    const expected = structuredClone(projectBaseline)
    const disclosure = '코드 반출이 허용되지 않아 공개 가능한 구현 구조와 문제 해결 과정을 정리했습니다.'
    for (const id of ['naenun-kiosk', 'mo-re']) {
      const project = expected.find((item) => item.id === id)!
      expect(project.details.filter((item) => item === disclosure)).toHaveLength(1)
      project.details = project.details.filter((item) => item !== disclosure)
    }
    const implementation = expected.find((item) => item.id === 'naenun-kiosk')!
      .problemSolvings[1].implementation[0]
    const prefix = '실제 코드를 공개할 수 없어 패키지 구조로 설명합니다. '
    expect(implementation.description.startsWith(prefix)).toBe(true)
    implementation.description = implementation.description.slice(prefix.length)

    expect(projects).toEqual(expected)
  })

  it.each(projects)('$id 상세에서 모든 원문 항목과 이미지, 링크를 빠짐없이 표시한다', (project) => {
    const { container } = render(
      <MemoryRouter initialEntries={['/projects/' + project.id]}>
        <Routes><Route path="/projects/:id" element={<ProjectDetail />} /></Routes>
      </MemoryRouter>,
    )
    const text = visibleText(container)
    const content = [
      project.title, project.description, project.period, project.team, project.role,
      ...project.tech, ...project.achievements, ...project.details, ...project.features,
      ...project.contributions, ...project.retrospective,
      ...project.insights.map((insight) => insight.title),
      ...project.problemSolvings.flatMap((ps) => [
        ...ps.problem, ...ps.solution, ...ps.result, ...ps.alternatives,
        ...ps.implementation.map((block) => block.description),
      ]),
    ].filter((item) => item !== undefined)
    for (const item of content) {
      expect(text, project.id + ': ' + plainText(item)).toContain(compact(plainText(item)))
    }
    const emphasis = content.flatMap((item) => typeof item === 'string'
      ? []
      : item.filter((segment) => segment.strong).map((segment) => segment.text),
    )
    expect(Array.from(container.querySelectorAll('strong'), (item) => item.textContent).sort())
      .toEqual(emphasis.sort())
    const images = Array.from(container.querySelectorAll('img'))
    expect(images.map((image) => image.getAttribute('src') + '\n' + image.getAttribute('alt')).sort()).toEqual([
      ...project.screenshots.map((src) => src + '\n' + (project.screenshotDescriptions?.[src]?.alt ?? project.title)),
      ...(project.insightImages ?? []).map((src) => src + '\nInsight'),
      ...project.problemSolvings.map((ps) => ps.visual.src + '\n' + ps.visual.alt),
    ].sort())
    for (const link of [...project.links, ...project.insights]) {
      expect(Array.from(container.querySelectorAll('a')).some((item) => item.getAttribute('href') === link.url))
        .toBe(true)
    }
    expect(container.querySelector('pre, code')).toBeNull()
  })

  it('홈은 기준 문구, 핵심 강조, 링크와 펼친 이미지를 표시한다', () => {
    vi.useFakeTimers({ toFake: ['Date'] })
    vi.setSystemTime(new Date(homeBaseline.date))
    sessionStorage.clear()
    try {
      const { container } = render(<MemoryRouter><App /></MemoryRouter>)
      screen.getAllByRole('button').filter((button) =>
        button.getAttribute('aria-expanded') === 'false' && button.textContent?.includes('보기'))
        .forEach((button) => fireEvent.click(button))

      const sections = Array.from(container.querySelectorAll('main section[id]'))
      expect(sections.map((section) => section.id)).toEqual([
        'about', 'career', 'projects', 'opensource', 'skills', 'education',
        'awards', 'activity', 'blog', 'contact',
      ])
      for (const original of homeBaseline.sections) {
        const section = sections.find((item) => item.id === original.id)!
        if (original.id === 'projects') {
          expect(Array.from(section.querySelectorAll('a'), (link) => link.getAttribute('href')))
            .toEqual(original.links.map((link) => link.href))
        }
        let remaining = visibleText(section)
        const segments = original.textSegments.map(compact).sort((a, b) => b.length - a.length)
        for (const segment of segments) {
          expect(remaining, original.id + ': ' + segment).toContain(segment)
          remaining = remaining.replace(segment, '')
        }
        const functionalLabels: Record<string, string[]> = {
          about: ['Oh In Seong', 'Career', '프로젝트 보기', '연락하기'],
          projects: ['자세히 보기'],
        }
        for (const label of functionalLabels[original.id] ?? []) {
          remaining = remaining.replaceAll(compact(label), '')
        }
        expect(remaining, original.id + ': 승인하지 않은 새 문구').toBe('')

        const emphasis = Array.from(section.querySelectorAll('strong'), (item) => compact(item.textContent ?? ''))
        expect(emphasis, original.id + ': 강조').toEqual(original.emphasis.map(compact))
        for (const link of original.links) {
          const anchor = Array.from(section.querySelectorAll('a')).find((item) =>
            item.getAttribute('href') === link.href
            && visibleText(original.id === 'projects' ? item.closest('article') ?? item : item) === compact(link.text),
          )
          expect(anchor, original.id + ': ' + link.href).toBeDefined()
        }
        for (const image of original.images) {
          expect(Array.from(section.querySelectorAll('img')).some((item) =>
            item.getAttribute('src') === image.src && item.getAttribute('alt') === image.alt),
          original.id + ': ' + image.src).toBe(true)
        }
      }
    } finally {
      vi.useRealTimers()
    }
  })
})
