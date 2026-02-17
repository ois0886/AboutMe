import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Header from '../Header'

function renderHeader() {
  return render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>,
  )
}

describe('Header', () => {
  it('로고 텍스트가 렌더링된다', () => {
    renderHeader()
    expect(screen.getByText('Oh In Seong')).toBeInTheDocument()
  })

  it('모든 네비게이션 항목이 렌더링된다', () => {
    renderHeader()
    const navLabels = [
      'About', 'Career', 'Skills', 'Education', 'Awards',
      'Activity', 'Blog', 'Projects', 'Open Source', 'Contact',
    ]
    navLabels.forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument()
    })
  })

  it('테마 토글 버튼이 존재한다', () => {
    renderHeader()
    expect(screen.getByLabelText('테마 전환')).toBeInTheDocument()
  })

  it('테마 토글 클릭 시 data-theme 속성이 변경된다', () => {
    renderHeader()
    const button = screen.getByLabelText('테마 전환')

    fireEvent.click(button)
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')

    fireEvent.click(button)
    expect(document.documentElement.getAttribute('data-theme')).toBe('light')
  })
})
