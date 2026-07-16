import { render, screen } from '@testing-library/react'
import OpenSource from '../OpenSource'

describe('OpenSource', () => {
  it('최신 Maven Central 버전과 GitHub 링크를 표시한다', () => {
    render(<OpenSource />)

    expect(screen.getByText(/v1\.3\.2/)).toBeInTheDocument()
    expect(screen.getByText(/v1\.2\.0/)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Compose-Chart/ })).toHaveAttribute(
      'href',
      'https://github.com/ois0886/compose-chart',
    )
    expect(screen.getByRole('link', { name: /Compose-Git-Grass/ })).toHaveAttribute(
      'href',
      'https://github.com/ois0886/compose-git-grass',
    )
  })
})
