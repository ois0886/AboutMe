import { fireEvent, render, screen, within } from '@testing-library/react'
import { Link, MemoryRouter, Route, Routes } from 'react-router-dom'
import ProjectDetail from '../ProjectDetail'
import projects from '../../data/projects'

function renderProjectDetail(id: string) {
  return render(
    <MemoryRouter initialEntries={[`/projects/${id}`]}>
      <Routes>
        <Route path="/projects/:id" element={<ProjectDetail />} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('ProjectDetail', () => {
  const firstProject = projects[0]

  it('한길졸업은 상단 기본 정보와 프로젝트 개요만 표시한다', () => {
    const { container } = renderProjectDetail('hangil')
    const project = projects.find((item) => item.id === 'hangil')!
    expect(screen.getByText('2026.10.26 ~ 진행 중')).toBeInTheDocument()
    expect(screen.getByText('1명 (개인 프로젝트)')).toBeInTheDocument()
    expect(screen.getByText('Android 앱 설계, 구현 및 검증')).toBeInTheDocument()
    expect(screen.getAllByRole('heading', { level: 2 }).map((heading) => heading.textContent))
      .toEqual(['프로젝트 개요'])
    const overview = screen.getByRole('heading', { name: '프로젝트 개요' }).closest('section')!
    expect(within(overview).getAllByRole('listitem').map((item) => item.textContent))
      .toEqual(project.details)
    expect(screen.queryByRole('link', { name: 'GitHub' })).not.toBeInTheDocument()
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
    expect(container.querySelector('pre, code')).toBeNull()
  })

  it.each(projects.filter((project) => project.id !== 'hangil'))(
    '$id는 코드 없이 문제 해결 이미지와 기존 구현 설명을 표시한다',
    (project) => {
      const { container } = renderProjectDetail(project.id)
      expect(container.querySelector('pre, code')).toBeNull()
      expect(screen.queryByRole('heading', { name: '구체적인 구현 설명' })).not.toBeInTheDocument()
      expect(screen.getAllByRole('heading', { name: '이미지' })).toHaveLength(project.problemSolvings.length)
      project.problemSolvings.forEach((ps) => {
        expect(screen.getByRole('img', { name: ps.visual.alt }))
          .toHaveAttribute('src', ps.visual.src)
        ps.implementation.forEach((block) => {
          expect(screen.getByText(block.description)).toBeInTheDocument()
        })
      })
      expect(screen.getAllByRole('img').map((image) => image.getAttribute('src'))).toEqual([
        ...(project.insights.length > 0 ? project.insightImages ?? [] : []),
        ...project.problemSolvings.map((ps) => ps.visual.src),
        ...project.screenshots,
      ])
      expect(container.querySelectorAll('[class*="implDescription"]')).toHaveLength(
        project.problemSolvings.reduce((count, ps) => count + ps.implementation.length, 0),
      )
      expect(container.querySelector('blockquote')).toBeNull()
    },
  )

  it('캡션을 추가하지 않은 기존 프로젝트의 스크린샷 구성과 대체 텍스트를 유지한다', () => {
    const project = projects.find((item) => item.id === 'naenun-kiosk')!
    const { container } = renderProjectDetail(project.id)
    const gallery = within(screen.getByRole('heading', { name: '스크린샷' }).closest('section')!)
    const images = gallery.getAllByRole('img')
    expect(images).toHaveLength(project.screenshots.length)
    expect(images.map((image) => image.getAttribute('src'))).toEqual(project.screenshots)
    expect(images.map((image) => image.getAttribute('alt')))
      .toEqual(project.screenshots.map(() => project.title))
    expect(container.querySelectorAll('[class*="screenshotCaption"]')).toHaveLength(0)
    const rows = container.querySelectorAll('[class*="screenshotRows"] > div')
    expect(rows).toHaveLength(3)
    rows.forEach((row) => {
      expect(row.children).toHaveLength(2)
    })
  })

  it('유효한 프로젝트 ID로 접근하면 제목이 렌더링된다', () => {
    renderProjectDetail(firstProject.id)
    expect(
      screen.getByRole('heading', { level: 1, name: firstProject.title }),
    ).toBeInTheDocument()
  })

  it('유효한 프로젝트 ID로 접근하면 설명이 렌더링된다', () => {
    renderProjectDetail(firstProject.id)
    expect(screen.getByText(firstProject.description)).toBeInTheDocument()
    expect(screen.queryByText(firstProject.cardSummary.description)).not.toBeInTheDocument()
  })

  it('유효한 프로젝트 ID로 접근하면 기간, 팀 구성, 역할이 렌더링된다', () => {
    renderProjectDetail(firstProject.id)
    expect(screen.getByText(firstProject.period)).toBeInTheDocument()
    expect(screen.getByText(firstProject.team)).toBeInTheDocument()
    expect(screen.getByText(firstProject.role)).toBeInTheDocument()
  })

  it('유효한 프로젝트 ID로 접근하면 기술 태그가 렌더링된다', () => {
    renderProjectDetail(firstProject.id)
    firstProject.tech.forEach((t) => {
      expect(screen.getByText(t)).toBeInTheDocument()
    })
  })

  it('잘못된 ID로 접근하면 "프로젝트를 찾을 수 없습니다" 메시지가 표시된다', () => {
    renderProjectDetail('non-existent-id')
    expect(screen.getByText('프로젝트를 찾을 수 없습니다.')).toBeInTheDocument()
  })

  it('잘못된 ID로 접근하면 홈으로 돌아가기 링크가 표시된다', () => {
    renderProjectDetail('non-existent-id')
    expect(screen.getByText('홈으로 돌아가기')).toBeInTheDocument()
  })

  it('돌아가기 링크가 존재한다', () => {
    renderProjectDetail(firstProject.id)
    expect(screen.getByText('← 돌아가기')).toBeInTheDocument()
  })

  it('목차는 표시된 섹션만 기존 순서와 제목으로 연결한다', () => {
    renderProjectDetail('glim')
    const toc = within(screen.getByRole('navigation', { name: '프로젝트 목차' }))
    const headings = screen.getAllByRole('heading', { level: 2 })
    expect(toc.getAllByRole('link').map((link) => link.textContent))
      .toEqual(headings.map((heading) => heading.textContent))
    toc.getAllByRole('link').forEach((link, index) => {
      const section = headings[index].closest('section')!
      expect(link).toHaveAttribute('href', `#/projects/glim#${section.id}`)
      expect(section).toHaveAttribute('tabindex', '-1')
    })
    expect(toc.getAllByRole('link')[0]).toHaveAttribute('aria-current', 'location')
    expect(screen.getByRole('main')).toHaveAttribute('id', 'main-content')
    expect(screen.getByRole('main')).toContainElement(screen.getByRole('heading', { level: 1 }))
    expect(screen.getByRole('heading', { level: 1 }).closest('header')?.closest('main'))
      .toBe(screen.getByRole('main'))
  })

  it('접을 수 있는 목차에서 선택한 섹션으로 포커스를 옮기고 현재 위치를 표시한다', () => {
    renderProjectDetail('glim')
    const toc = within(screen.getByRole('navigation', { name: '프로젝트 목차' }))
    const toggle = toc.getByRole('button', { name: '목차' })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    fireEvent.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    fireEvent.click(toc.getByRole('link', { name: '문제 해결' }))
    expect(document.getElementById('project-problems')).toHaveFocus()
    expect(toc.getByRole('link', { name: '문제 해결' })).toHaveAttribute('aria-current', 'location')
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })

  it('다른 프로젝트로 직접 이동하면 목차의 펼침 상태와 현재 위치가 초기화된다', () => {
    render(
      <MemoryRouter initialEntries={['/projects/glim']}>
        <Link to="/projects/hangil">한길졸업으로 이동</Link>
        <Routes>
          <Route path="/projects/:id" element={<ProjectDetail />} />
        </Routes>
      </MemoryRouter>,
    )
    fireEvent.click(screen.getByRole('button', { name: '목차' }))
    fireEvent.click(screen.getByRole('link', { name: '한길졸업으로 이동' }))
    expect(screen.getByRole('button', { name: '목차' })).toHaveAttribute('aria-expanded', 'false')
    const toc = within(screen.getByRole('navigation', { name: '프로젝트 목차' }))
    expect(toc.getAllByRole('link')).toHaveLength(1)
    expect(toc.getByRole('link', { name: '프로젝트 개요' })).toHaveAttribute('aria-current', 'location')
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })

  it('스크롤에 따라 목차의 현재 섹션을 갱신한다', () => {
    renderProjectDetail('glim')
    const headings = screen.getAllByRole('heading', { level: 2 })
    headings.forEach((heading) => {
      const section = heading.closest('section')!
      vi.spyOn(section, 'getBoundingClientRect').mockReturnValue({
        top: section.id === 'project-problems' ? 100 : 500,
      } as DOMRect)
    })
    const requestFrame = vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
      callback(0)
      return 1
    })
    fireEvent.scroll(window)
    const toc = within(screen.getByRole('navigation', { name: '프로젝트 목차' }))
    expect(toc.getByRole('link', { name: '문제 해결' })).toHaveAttribute('aria-current', 'location')
    requestFrame.mockRestore()
  })

  it('강조 세그먼트와 성과, 구현 설명이 프로젝트 상세에 유지된다', () => {
    const { container } = renderProjectDetail('mo-re')

    expect(container.textContent).toContain('약 356ms에서 156ms로')
    expect(container.textContent).toContain('기능별 모듈과 Convention Plugin을 구성해 공통 Gradle 설정을 한곳에서 관리했습니다.')
    expect(
      Array.from(container.querySelectorAll('strong')).some(
        (element) => element.textContent?.includes('약 356ms에서 156ms로'),
      ),
    ).toBe(true)

    expect(screen.getByText(/supervisorScope 안에서 6개 API를 async로 호출하고/))
      .toBeInTheDocument()
    expect(screen.getByRole('img', { name: /6개 API/ }))
      .toHaveAttribute('src', 'screenshot/more-parallel-api-visual.png')
  })

  it('주점부리 프로젝트 상세가 정상 렌더링된다', () => {
    const { container } = renderProjectDetail('pubburi')

    expect(
      screen.getByRole('heading', { level: 1, name: '주점부리 - Backend & Frontend' }),
    ).toBeInTheDocument()
    expect(
      screen.getByText('2025.05.12 ~ 2025.05.28 / 2026.07.01 ~ 2026.07.15'),
    ).toBeInTheDocument()
    expect(screen.getByText('Backend & Frontend 개발')).toBeInTheDocument()
    expect(container.textContent).toContain('상세 조회 쿼리 수가 95% 감소했습니다')
    expect(screen.getAllByText('20회에서 1회로 줄였습니다')).toHaveLength(2)
    expect(screen.getByText(/주문 생성 중 한 단계라도 실패하면 전체 변경을 되돌려/)).toBeInTheDocument()
  })

  it('Dear My Diary는 모델 통합과 입력 구성, 감정 후처리를 설명하고 비공개 링크를 숨긴다', () => {
    renderProjectDetail('dear-my-diary')

    expect(screen.getByRole('heading', { level: 1, name: 'Dear My Diary - Android' }))
      .toBeInTheDocument()
    expect(screen.getByText('Android 팀장 / 온디바이스 AI 기능 개발 및 앱 통합')).toBeInTheDocument()
    expect(screen.getByText(/초기 feature 모듈에 있던 QA 코드는/))
      .toBeInTheDocument()
    expect(screen.getByText(/감정 후보를 찾지 못한 분기에서도 로딩 상태를 종료하도록/))
      .toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: '3' })).toBeInTheDocument()
    expect(screen.getByText(/Qualcomm 재직자 멘토의 멘토링을 받으며/)).toBeInTheDocument()
    expect(screen.getByText(/모델과 사전을 준비한 뒤 tokenizer와 Interpreter를 초기화합니다/))
      .toBeInTheDocument()
    expect(screen.getByText(/미리 정의한 감정 단어를 생성 결과에서 찾습니다/))
      .toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: '링크' })).not.toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: '프로젝트 회고' })).not.toBeInTheDocument()
    const gallery = within(screen.getByRole('heading', { name: '스크린샷' }).closest('section')!)
    expect(gallery.getAllByRole('img')).toHaveLength(4)
  })
})
