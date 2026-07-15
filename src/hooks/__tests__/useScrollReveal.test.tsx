import { render, screen } from '@testing-library/react'
import { useScrollReveal } from '../useScrollReveal'

function RevealProbe() {
  const ref = useScrollReveal<HTMLDivElement>()
  return <div ref={ref} className="reveal" data-testid="reveal-probe" />
}

describe('useScrollReveal', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('모션 감소 설정에서는 즉시 콘텐츠를 표시한다', () => {
    vi.stubGlobal('matchMedia', vi.fn(() => ({ matches: true })))

    render(<RevealProbe />)

    expect(screen.getByTestId('reveal-probe')).toHaveClass('revealed')
  })
})
