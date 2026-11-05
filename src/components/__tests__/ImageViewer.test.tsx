import { fireEvent, render, screen, within } from '@testing-library/react'
import ImageViewer from '../ImageViewer'

const originalShowModal = HTMLDialogElement.prototype.showModal
const originalClose = HTMLDialogElement.prototype.close

beforeAll(() => {
  HTMLDialogElement.prototype.showModal = function () {
    this.setAttribute('open', '')
  }
  HTMLDialogElement.prototype.close = function () {
    this.removeAttribute('open')
    this.dispatchEvent(new Event('close'))
  }
})

afterAll(() => {
  HTMLDialogElement.prototype.showModal = originalShowModal
  HTMLDialogElement.prototype.close = originalClose
})

function renderViewer() {
  return render(
    <ImageViewer
      src="screenshot/more-parallel-api-visual.png"
      alt="6개 API 병렬 호출 흐름"
      width={1672}
      height={941}
      loading="lazy"
    />,
  )
}

describe('ImageViewer', () => {
  it('기존 이미지의 경로와 대체 텍스트를 보존하고 키보드로 접근 가능한 확대 버튼을 제공한다', () => {
    renderViewer()
    const trigger = screen.getByRole('button', { name: '6개 API 병렬 호출 흐름 확대 보기' })
    expect(trigger).toHaveAttribute('type', 'button')
    expect(trigger).toHaveAttribute('aria-haspopup', 'dialog')
    expect(within(trigger).getByRole('img')).toHaveAttribute('src', 'screenshot/more-parallel-api-visual.png')
    expect(within(trigger).getByRole('img')).toHaveAttribute('alt', '6개 API 병렬 호출 흐름')
    expect(within(trigger).getByRole('img')).toHaveAttribute('loading', 'lazy')
    trigger.focus()
    expect(trigger).toHaveFocus()
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('확대 창은 같은 이미지를 열고 닫기 버튼에 포커스를 두며 배경 스크롤을 잠근다', () => {
    document.body.style.overflow = 'auto'
    renderViewer()
    const trigger = screen.getByRole('button', { name: /확대 보기/ })
    fireEvent.click(trigger)

    const dialog = screen.getByRole('dialog', { name: '6개 API 병렬 호출 흐름' })
    expect(within(dialog).getByRole('img')).toHaveAttribute('src', 'screenshot/more-parallel-api-visual.png')
    expect(within(dialog).getByRole('button', { name: '닫기' })).toHaveFocus()
    expect(document.body.style.overflow).toBe('hidden')

    fireEvent.click(within(dialog).getByRole('button', { name: '닫기' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(document.body.style.overflow).toBe('auto')
    expect(trigger).toHaveFocus()
    document.body.style.overflow = ''
  })

  it('원본 크기와 화면 맞춤을 전환하고 다시 열면 화면 맞춤으로 시작한다', () => {
    renderViewer()
    const trigger = screen.getByRole('button', { name: /확대 보기/ })
    fireEvent.click(trigger)
    expect(screen.getByRole('button', { name: '원본 크기' })).toHaveAttribute('aria-pressed', 'false')
    fireEvent.click(screen.getByRole('button', { name: '원본 크기' }))
    expect(screen.getByRole('button', { name: '화면에 맞추기' })).toHaveAttribute('aria-pressed', 'true')
    fireEvent.click(screen.getByRole('button', { name: '화면에 맞추기' }))
    expect(screen.getByRole('button', { name: '원본 크기' })).toHaveAttribute('aria-pressed', 'false')
    fireEvent.click(screen.getByRole('button', { name: '원본 크기' }))
    fireEvent.click(screen.getByRole('button', { name: '닫기' }))
    fireEvent.click(trigger)
    expect(screen.getByRole('button', { name: '원본 크기' })).toHaveAttribute('aria-pressed', 'false')
  })

  it('Escape의 네이티브 cancel 이벤트로 닫고 포커스와 스크롤을 복원한다', () => {
    renderViewer()
    const trigger = screen.getByRole('button', { name: /확대 보기/ })
    fireEvent.click(trigger)
    fireEvent(screen.getByRole('dialog'), new Event('cancel', { cancelable: true }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(trigger).toHaveFocus()
    expect(document.body.style.overflow).toBe('')
  })

  it('Tab과 Shift+Tab이 확대 창의 조작 버튼 사이를 순환한다', () => {
    renderViewer()
    fireEvent.click(screen.getByRole('button', { name: /확대 보기/ }))
    const close = screen.getByRole('button', { name: '닫기' })
    const zoom = screen.getByRole('button', { name: '원본 크기' })
    expect(close).toHaveFocus()
    fireEvent.keyDown(close, { key: 'Tab' })
    expect(zoom).toHaveFocus()
    fireEvent.keyDown(zoom, { key: 'Tab', shiftKey: true })
    expect(close).toHaveFocus()
    const viewport = screen.getByRole('region', { name: '확대 이미지' })
    viewport.focus()
    fireEvent.keyDown(viewport, { key: 'Tab' })
    expect(zoom).toHaveFocus()
  })

  it('원본 크기에서는 키보드로 이미지 이동 영역에 접근하고 모달 안에서 순환한다', () => {
    renderViewer()
    fireEvent.click(screen.getByRole('button', { name: /확대 보기/ }))
    const viewport = screen.getByRole('region', { name: '확대 이미지' })
    expect(viewport).toHaveAttribute('tabindex', '-1')
    fireEvent.click(screen.getByRole('button', { name: '원본 크기' }))
    expect(viewport).toHaveAttribute('tabindex', '0')
    const zoom = screen.getByRole('button', { name: '화면에 맞추기' })
    zoom.focus()
    fireEvent.keyDown(zoom, { key: 'Tab', shiftKey: true })
    expect(viewport).toHaveFocus()
    fireEvent.keyDown(viewport, { key: 'Tab' })
    expect(zoom).toHaveFocus()
  })

  it('이미지나 창 내부 클릭은 유지하고 바깥 배경 클릭으로 닫는다', () => {
    renderViewer()
    fireEvent.click(screen.getByRole('button', { name: /확대 보기/ }))
    const dialog = screen.getByRole('dialog')
    vi.spyOn(dialog, 'getBoundingClientRect').mockReturnValue({
      left: 100, right: 900, top: 100, bottom: 700,
    } as DOMRect)
    fireEvent.click(within(dialog).getByRole('img'))
    expect(dialog).toHaveAttribute('open')
    fireEvent.click(dialog, { clientX: 200, clientY: 200 })
    expect(dialog).toHaveAttribute('open')
    fireEvent.click(dialog, { clientX: 20, clientY: 20 })
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('프로젝트 이동으로 제거될 때에도 배경 스크롤 잠금을 해제한다', () => {
    const { unmount } = renderViewer()
    fireEvent.click(screen.getByRole('button', { name: /확대 보기/ }))
    expect(document.body.style.overflow).toBe('hidden')
    unmount()
    expect(document.body.style.overflow).toBe('')
  })
})
