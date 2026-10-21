import { render, screen } from '@testing-library/react'
import Skills from '../Skills'

describe('Skills', () => {
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
