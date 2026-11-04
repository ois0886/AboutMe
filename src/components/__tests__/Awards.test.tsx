import { render, screen } from '@testing-library/react'
import Awards from '../Awards'

describe('Awards', () => {
  it('자격증 목록 아래에 Language test 제목만 표시한다', () => {
    render(<Awards />)

    const headings = screen.getAllByRole('heading', { level: 3 })
    const languageTest = screen.getByRole('heading', { level: 3, name: 'Language test' })

    expect(screen.getByRole('heading', { level: 3, name: 'Certificates' })).toBeInTheDocument()
    expect(headings[headings.length - 1]).toBe(languageTest)
    expect(languageTest.nextElementSibling).toBeNull()
  })
})
