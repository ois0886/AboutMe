import { render, screen } from '@testing-library/react'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import projects from '../../data/projects'
import homeContent from '../../test/home-preserved-content.json'
import Skills from '../Skills'

describe('Skills', () => {
  it('승인된 분류와 기술 문구를 순서대로 표시하고 지정한 구간만 강조한다', () => {
    render(<Skills />)

    const expected = homeContent.sections.find((section) => section.id === 'skills')!
    const section = screen.getByRole('heading', { name: 'Skills' }).closest('section')!
    expect(Array.from(section.querySelectorAll('h2, h3, li'), (item) => item.textContent))
      .toEqual(expected.textSegments)
    expect(Array.from(section.querySelectorAll('strong'), (item) => item.textContent))
      .toEqual(expected.emphasis)
  })

  it('이력서는 기술 목록을 다섯 분류의 일반 텍스트로 표시하고 추가 기술은 웹에도 반영한다', () => {
    const resumeDocument = new DOMParser().parseFromString(
      readFileSync(resolve(process.cwd(), 'resume.html'), 'utf8'),
      'text/html',
    )
    const groups = Array.from(resumeDocument.querySelectorAll('.skill-group'))
    expect(groups.map((group) => group.querySelector('.skill-category')?.textContent))
      .toEqual(['Backend', 'Frontend', 'Android', 'AI Agent', 'Etc'])
    const technologies = (category: string) =>
      groups.find((group) => group.querySelector('.skill-category')?.textContent === category)!
        .querySelector('.skill-values')!.textContent!.split(', ')
    expect(technologies('Frontend')).toEqual(['React', 'TypeScript', 'Vue 3', 'Vite'])
    expect(technologies('AI Agent')).toEqual([
      'Codex', 'Claude Code / 작업 분리와 병렬화', '구현', '테스트', '리뷰', '문서화',
    ])
    expect(technologies('Etc')).toEqual(['GitHub', 'Jira', 'Figma'])
    expect(resumeDocument.querySelector('.skill-tag, .skill-tags')).toBeNull()

    const { container } = render(<Skills />)
    for (const technology of ['React', 'TypeScript', 'Codex', 'Claude Code', 'GitHub', 'Jira']) {
      expect(container).toHaveTextContent(technology)
    }
    expect(projects.some((project) => project.links.some((link) => link.label === 'Figma'))).toBe(true)
  })

  it('조회와 렌더링 역량을 구분하고 측정값에 근거한 개선율을 표시한다', () => {
    render(<Skills />)

    const items = screen.getAllByRole('listitem')
    const technologies = ['Coroutines', 'Room', 'Paging 3', '첫 프레임']
    const matchedItems = technologies.map((technology) => {
      const matches = items.filter((item) => item.textContent?.includes(technology))
      expect(matches).toHaveLength(1)
      return matches[0]
    })

    expect(new Set(matchedItems).size).toBe(technologies.length)
    const parallelReduction = Math.round((356 - 156) / 356 * 100)
    const localReductionLowerBound = Math.floor((3 - 0.5) / 3 * 100)
    expect(matchedItems[0]).toHaveTextContent(`약 ${parallelReduction}% 단축`)
    expect(matchedItems[1]).toHaveTextContent(`${localReductionLowerBound}% 이상 단축`)
    expect(matchedItems[2]).not.toHaveTextContent(/%/)
    const renderReduction = ((255.74 - 166.78) / 255.74 * 100).toFixed(1)
    expect(matchedItems[3]).toHaveTextContent(`${renderReduction}% 단축`)
    const androidSkills = screen.getByRole('heading', { name: 'Android' }).parentElement!
    expect(androidSkills).not.toHaveTextContent(/Mo-Re|Didimdol|POCS|356ms|156ms|3~5초|0\.5초/)
  })
})
