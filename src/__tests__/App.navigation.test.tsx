import { act, cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { MemoryRouter, useLocation, useNavigate, type InitialEntry } from 'react-router-dom'
import App from '../App'

const scrollTo = vi.fn()
const sectionScrolls: Array<{ id: string; options: ScrollIntoViewOptions }> = []
const scrolledElements: HTMLElement[] = []
const originalScrollIntoView = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'scrollIntoView')
const frames = new Map<number, FrameRequestCallback>()
let nextFrame = 0

function RoutingControls() {
  const navigate = useNavigate()
  const location = useLocation()
  return (
    <>
      <button onClick={() => navigate('/projects/mo-re', { state: { fromPortfolio: true } })}>Open test detail</button>
      <button onClick={() => navigate(-1)}>Test history back</button>
      <button onClick={() => navigate(1)}>Test history forward</button>
      <output data-testid="route-location">{JSON.stringify({ pathname: location.pathname, hash: location.hash, state: location.state })}</output>
    </>
  )
}

function renderApp(initialEntries: InitialEntry[] = ['/']) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <App />
      <RoutingControls />
    </MemoryRouter>,
  )
}

function flushFrames() {
  act(() => {
    while (frames.size) {
      const pending = [...frames.values()]
      frames.clear()
      pending.forEach((callback) => callback(0))
    }
  })
}

beforeEach(() => {
  vi.clearAllMocks()
  sectionScrolls.length = 0
  scrolledElements.length = 0
  frames.clear()
  sessionStorage.clear()
  vi.mocked(localStorage.getItem).mockReturnValue(null)
  vi.stubGlobal('scrollTo', scrollTo)
  vi.stubGlobal('matchMedia', vi.fn(() => ({ matches: false })))
  vi.stubGlobal('requestAnimationFrame', vi.fn((callback: FrameRequestCallback) => {
    const id = ++nextFrame
    frames.set(id, callback)
    return id
  }))
  vi.stubGlobal('cancelAnimationFrame', vi.fn((id: number) => frames.delete(id)))
  Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', {
    configurable: true,
    value: function (this: HTMLElement, options: ScrollIntoViewOptions) {
      sectionScrolls.push({ id: this.closest('section')?.id ?? this.id, options })
      scrolledElements.push(this)
    },
  })
})

afterEach(() => {
  cleanup()
  vi.unstubAllGlobals()
  sessionStorage.clear()
  document.documentElement.classList.remove('no-transition')
  document.documentElement.style.scrollBehavior = ''
  if (originalScrollIntoView) Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', originalScrollIntoView)
  else Reflect.deleteProperty(HTMLElement.prototype, 'scrollIntoView')
})

describe('포트폴리오 라우팅과 스크롤', () => {
  it('홈의 새 섹션 순서를 적용하고 상세 진입 후에도 같은 헤더와 테마를 유지한다', () => {
    const { container } = renderApp()
    expect([...container.querySelectorAll('main > section, main > .sectionAlt > section')].map((element) => element.id)).toEqual([
      'about', 'career', 'projects', 'opensource', 'skills', 'education', 'awards', 'activity', 'blog', 'contact',
    ])
    fireEvent.click(screen.getByRole('button', { name: '테마 전환' }))
    fireEvent.click(screen.getByRole('button', { name: 'Open test detail' }))
    const logo = screen.getAllByRole('link', { name: 'Oh In Seong' })
    expect(logo).toHaveLength(1)
    expect(screen.getByRole('main')).not.toContainElement(logo[0].closest('header'))
    expect(screen.getByRole('button', { name: '테마 전환' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute('aria-current', 'location')
    expect(scrollTo).toHaveBeenCalledWith(0, 0)
    flushFrames()
    expect(document.documentElement).not.toHaveClass('no-transition')
  })

  it('상세 진입은 즉시 최상단으로 이동하고 홈 복귀 시 저장 위치와 reveal 상태를 복원한다', () => {
    sessionStorage.setItem('scrollY', '843')
    document.documentElement.style.scrollBehavior = 'smooth'
    const { container } = renderApp(['/', '/projects/mo-re'])
    expect(scrollTo).toHaveBeenLastCalledWith(0, 0)
    expect(document.documentElement.style.scrollBehavior).toBe('auto')
    fireEvent.click(screen.getByRole('button', { name: 'Test history back' }))
    expect(scrollTo).toHaveBeenLastCalledWith(0, 843)
    expect(sessionStorage.getItem('scrollY')).toBeNull()
    expect([...container.querySelectorAll('.reveal')].every((element) => element.classList.contains('revealed'))).toBe(true)
    flushFrames()
    expect(document.documentElement.style.scrollBehavior).toBe('smooth')
    expect(document.documentElement).not.toHaveClass('no-transition')
  })

  it('상세 헤더의 명시적인 섹션 이동이 저장 위치보다 우선하며 이동 의도를 소비한다', () => {
    sessionStorage.setItem('scrollY', '843')
    renderApp(['/projects/mo-re'])
    fireEvent.click(screen.getByRole('link', { name: 'Career' }))
    expect(sectionScrolls).toEqual([{ id: 'career', options: { behavior: 'smooth', block: 'start' } }])
    expect(scrolledElements[0]).toBe(document.querySelector('#career .section__title'))
    expect(document.getElementById('career')).toHaveFocus()
    expect(sessionStorage.getItem('scrollY')).toBeNull()
    expect(scrollTo).not.toHaveBeenCalledWith(0, 843)
    const location = JSON.parse(screen.getByTestId('route-location').textContent!)
    expect(location.pathname).toBe('/')
    expect(location.state).not.toHaveProperty('sectionTarget')
  })

  it('소비된 홈 이동 의도는 다음 프로젝트에서 돌아올 때 다시 실행되지 않는다', () => {
    renderApp([{ pathname: '/', state: { sectionTarget: 'projects', preserved: 'yes' } }])
    expect(sectionScrolls.map((scroll) => scroll.id)).toEqual(['projects'])
    expect(JSON.parse(screen.getByTestId('route-location').textContent!).state).toEqual({ preserved: 'yes' })
    sectionScrolls.length = 0
    sessionStorage.setItem('scrollY', '1012')
    fireEvent.click(screen.getByRole('button', { name: 'Open test detail' }))
    fireEvent.click(screen.getByRole('button', { name: 'Test history back' }))
    expect(sectionScrolls).toEqual([])
    expect(scrollTo).toHaveBeenLastCalledWith(0, 1012)
  })

  it('감소된 모션 설정에서는 섹션 이동에 부드러운 스크롤을 강제하지 않는다', () => {
    vi.stubGlobal('matchMedia', vi.fn(() => ({ matches: true })))
    renderApp(['/projects/mo-re'])
    fireEvent.click(screen.getByRole('link', { name: 'Projects' }))
    expect(sectionScrolls).toEqual([{ id: 'projects', options: { behavior: 'instant', block: 'start' } }])
  })

  it('홈의 프로젝트 버튼은 섹션 제목으로 이동하고 로고는 소개에 포커스를 두며 최상단으로 돌아간다', () => {
    renderApp()
    fireEvent.click(screen.getByRole('button', { name: '프로젝트 보기' }))
    expect(scrolledElements[0]).toBe(document.querySelector('#projects .section__title'))
    expect(document.getElementById('projects')).toHaveFocus()
    fireEvent.click(screen.getByRole('link', { name: 'Oh In Seong' }))
    expect(scrollTo).toHaveBeenLastCalledWith({ top: 0, behavior: 'smooth' })
    expect(document.getElementById('about')).toHaveFocus()
    vi.stubGlobal('matchMedia', vi.fn(() => ({ matches: true })))
    fireEvent.click(screen.getByRole('link', { name: 'Oh In Seong' }))
    expect(scrollTo).toHaveBeenLastCalledWith({ top: 0, behavior: 'instant' })
  })

  it('홈 섹션 해시로 직접 진입하면 해당 위치로 이동한 뒤 해시를 제거한다', () => {
    renderApp(['/#contact'])
    expect(sectionScrolls.map((scroll) => scroll.id)).toEqual(['contact'])
    expect(JSON.parse(screen.getByTestId('route-location').textContent!).hash).toBe('')
  })

  it('경로 변경으로 목차를 닫고 이후 브라우저 이동에서도 다시 열지 않는다', () => {
    renderApp()
    fireEvent.click(screen.getByRole('button', { name: '전체 목차' }))
    expect(within(screen.getByRole('dialog')).getAllByRole('link')).toHaveLength(10)
    fireEvent.click(screen.getByRole('button', { name: 'Open test detail' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(document.body.style.overflow).toBe('')
    fireEvent.click(screen.getByRole('button', { name: 'Test history back' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})
