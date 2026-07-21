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

  it('요소 일부가 화면에 들어오면 노출되도록 관찰한다', () => {
    let observerOptions: IntersectionObserverInit | undefined
    const observer = vi.fn((_callback, options) => {
      observerOptions = options
      return {
        observe: vi.fn(),
        unobserve: vi.fn(),
        disconnect: vi.fn(),
      }
    })

    vi.stubGlobal('matchMedia', vi.fn(() => ({ matches: false })))
    vi.stubGlobal('IntersectionObserver', observer)

    render(<RevealProbe />)

    expect(observerOptions).toEqual({ threshold: 0 })
  })
})
