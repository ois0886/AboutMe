import { act, cleanup, render, screen, fireEvent, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Header from '../Header'

const sectionLabels = ['About', 'Career', 'Projects', 'Open Source', 'Skills', 'Education', 'Awards', 'Activity', 'Blog', 'Contact']
const scrollIntoView = vi.fn()
const originalScrollIntoView = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'scrollIntoView')
let observerCallback: IntersectionObserverCallback

function renderHeader(path = '/') {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <section id="about" />
        <section id="career" />
        <section id="projects" />
      </main>
    </MemoryRouter>,
  )
}

beforeEach(() => {
  vi.clearAllMocks()
  vi.mocked(localStorage.getItem).mockReturnValue(null)
  Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', { configurable: true, value: scrollIntoView })
  vi.stubGlobal('matchMedia', vi.fn(() => ({ matches: false })))
  vi.stubGlobal('IntersectionObserver', class {
    constructor(callback: IntersectionObserverCallback) { observerCallback = callback }
    observe() {}
    disconnect() {}
  })
})

afterEach(() => {
  cleanup()
  document.body.style.overflow = ''
  vi.unstubAllGlobals()
  if (originalScrollIntoView) Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', originalScrollIntoView)
  else Reflect.deleteProperty(HTMLElement.prototype, 'scrollIntoView')
})

describe('Header', () => {
  it('로고, 주요 섹션 네 개와 항상 보이는 테마 버튼을 제공한다', () => {
    renderHeader()
    expect(screen.getByRole('link', { name: 'Oh In Seong' })).toBeInTheDocument()
    const navigation = screen.getByRole('navigation', { name: '주요 섹션' })
    expect(within(navigation).getAllByRole('link').map((link) => link.textContent)).toEqual(['Career', 'Projects', 'Open Source', 'Contact'])
    expect(screen.getByRole('button', { name: '테마 전환' })).toBeInTheDocument()
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'About' })).not.toBeInTheDocument()
  })

  it('전체 목차는 홈 순서대로 열리고 닫으면 내부 링크가 DOM에서 제거된다', () => {
    renderHeader()
    const trigger = screen.getByRole('button', { name: '전체 목차' })
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    fireEvent.click(trigger)
    const dialog = screen.getByRole('dialog', { name: '전체 목차' })
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    expect(dialog).toHaveAttribute('aria-modal', 'true')
    expect(within(dialog).getAllByRole('link').map((link) => link.querySelectorAll('span')[1].textContent)).toEqual(sectionLabels)
    fireEvent.click(within(dialog).getByRole('button', { name: '목차 닫기' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'About' })).not.toBeInTheDocument()
  })

  it('목차의 키보드 포커스를 가두고 Escape로 닫으면 트리거와 스크롤 상태를 복원한다', () => {
    document.body.style.overflow = 'clip'
    renderHeader()
    const trigger = screen.getByRole('button', { name: '전체 목차' })
    trigger.focus()
    fireEvent.click(trigger)
    const dialog = screen.getByRole('dialog')
    const close = within(dialog).getByRole('button', { name: '목차 닫기' })
    const last = within(dialog).getByRole('link', { name: 'Contact' })
    expect(close).toHaveFocus()
    expect(document.body.style.overflow).toBe('hidden')
    fireEvent.keyDown(document, { key: 'Tab', shiftKey: true })
    expect(last).toHaveFocus()
    fireEvent.keyDown(document, { key: 'Tab' })
    expect(close).toHaveFocus()
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(trigger).toHaveFocus()
    expect(document.body.style.overflow).toBe('clip')
  })

  it('외부 클릭과 컴포넌트 해제 시 목차의 스크롤 잠금을 해제한다', () => {
    const view = renderHeader()
    fireEvent.click(screen.getByRole('button', { name: '전체 목차' }))
    fireEvent.pointerDown(document.body)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(document.body.style.overflow).toBe('')
    fireEvent.click(screen.getByRole('button', { name: '전체 목차' }))
    view.unmount()
    expect(document.body.style.overflow).toBe('')
  })

  it('목차의 섹션 선택은 메뉴를 닫고 해당 섹션으로 이동한다', () => {
    renderHeader()
    fireEvent.click(screen.getByRole('button', { name: '전체 목차' }))
    fireEvent.click(within(screen.getByRole('dialog')).getByRole('link', { name: 'Projects' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' })
    expect(document.getElementById('projects')).toHaveFocus()
    expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute('aria-current', 'location')
  })

  it('교차 관찰 결과와 프로젝트 상세 경로를 현재 섹션으로 표시한다', () => {
    const view = renderHeader()
    act(() => observerCallback([
      { isIntersecting: true, target: document.getElementById('career')!, boundingClientRect: { top: 160 } } as unknown as IntersectionObserverEntry,
    ], {} as IntersectionObserver))
    expect(screen.getByRole('link', { name: 'Career' })).toHaveAttribute('aria-current', 'location')
    view.unmount()
    renderHeader('/projects/mo-re')
    expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute('aria-current', 'location')
  })

  it('저장된 테마로 시작하고 전환 결과를 문서와 저장소에 반영한다', () => {
    vi.mocked(localStorage.getItem).mockReturnValue('dark')
    renderHeader()
    const toggle = screen.getByRole('button', { name: '테마 전환' })
    expect(toggle).toHaveAttribute('aria-pressed', 'true')
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark')
    fireEvent.click(toggle)
    expect(toggle).toHaveAttribute('aria-pressed', 'false')
    expect(document.documentElement).toHaveAttribute('data-theme', 'light')
    expect(localStorage.setItem).toHaveBeenLastCalledWith('theme', 'light')
  })

  it('본문 바로가기는 HashRouter 경로 변경 없이 main에 포커스를 보낸다', () => {
    renderHeader()
    fireEvent.click(screen.getByRole('link', { name: '본문 바로가기' }))
    expect(screen.getByRole('main')).toHaveFocus()
    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'instant', block: 'start' })
  })
})
