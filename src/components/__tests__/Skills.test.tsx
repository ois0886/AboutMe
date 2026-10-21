import { render, screen } from '@testing-library/react'
import Skills from '../Skills'

describe('Skills', () => {
  it('프로젝트명 없이 세 로딩 역량을 구분하고 수치를 해당 역량에만 표시한다', () => {
    render(<Skills />)

    const items = screen.getAllByRole('listitem')
    const technologies = ['Coroutines', 'Room', 'Paging3']
    const matchedItems = technologies.map((technology) => {
      const matches = items.filter((item) => item.textContent?.includes(technology))
      expect(matches).toHaveLength(1)
      return matches[0]
    })

    expect(new Set(matchedItems).size).toBe(technologies.length)
    expect(matchedItems[0]).toHaveTextContent(/356ms.*156ms/)
    expect(matchedItems[0]).not.toHaveTextContent(/3~5초|0\.5초/)
    expect(matchedItems[1]).toHaveTextContent(/3~5초.*0\.5초/)
    expect(matchedItems[1]).not.toHaveTextContent(/356ms|156ms/)
    const androidSkills = screen.getByRole('heading', { name: 'Android & Kotlin' }).parentElement!
    expect(androidSkills).not.toHaveTextContent(/Mo-Re|Didimdol|POCS/)
  })
})
