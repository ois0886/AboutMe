import { render, screen } from '@testing-library/react'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import Skills from '../Skills'

describe('Skills', () => {
  it('이력서는 기술 목록을 다섯 분류의 일반 텍스트로 표시하고 추가 기술은 웹에도 반영한다', () => {
    const resumeDocument = new DOMParser().parseFromString(
      readFileSync(resolve(process.cwd(), 'resume.html'), 'utf8'),
      'text/html',
    )
    const groups = Array.from(resumeDocument.querySelectorAll('.skill-group'))
    expect(groups.map((group) => group.querySelector('.skill-category')?.textContent))
      .toEqual(['Backend', 'Frontend', 'Android', 'AI agent', 'ETC'])
    const technologies = (category: string) =>
      groups.find((group) => group.querySelector('.skill-category')?.textContent === category)!
        .querySelector('.skill-values')!.textContent!.split(', ')
    expect(technologies('Frontend')).toEqual(['React', 'TypeScript', 'Vue 3', 'Vite'])
    expect(technologies('AI agent')).toEqual([
      'Codex', 'Claude Code / 작업 분리와 병렬화', '구현', '테스트', '리뷰', '문서화 자동화',
    ])
    expect(technologies('ETC')).toEqual(['GitHub', 'Jira', 'Figma', 'Slack'])
    expect(resumeDocument.querySelector('.skill-tag, .skill-tags')).toBeNull()

    const { container } = render(<Skills />)
    for (const technology of ['React', 'TypeScript', 'Codex', 'Claude Code', 'Jira', 'Figma', 'Slack']) {
      expect(container).toHaveTextContent(technology)
    }
  })

  it('프로젝트명과 전후 시간 없이 세 로딩 역량을 구분하고 개선율만 표시한다', () => {
    render(<Skills />)

    const items = screen.getAllByRole('listitem')
    const technologies = ['Coroutines', 'Room', 'Paging3']
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
    const androidSkills = screen.getByRole('heading', { name: 'Android & Kotlin' }).parentElement!
    expect(androidSkills).not.toHaveTextContent(/Mo-Re|Didimdol|POCS|356ms|156ms|3~5초|0\.5초/)
  })
})
