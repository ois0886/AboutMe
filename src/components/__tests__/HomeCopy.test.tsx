import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from '../../App'

describe('메인 페이지 문체', () => {
  it('자기소개를 제외한 설명을 마침표 없는 항목형으로 표시한다', () => {
    const { container } = render(<MemoryRouter><App /></MemoryRouter>)

    const descriptions = container.querySelectorAll('main p, main li')
    expect(descriptions.length).toBeGreaterThan(0)
    for (const element of descriptions) {
      if (element.closest('#about')) continue
      const text = element.textContent?.trim() ?? ''
      expect(text).not.toMatch(/(?:습니다|합니다|입니다|됩니다)(?:[.!?]|\s|$)/u)
      expect(text).not.toMatch(/[.!?]$/u)
    }
  })
})
