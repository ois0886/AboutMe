import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
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

  it('강조 세그먼트와 코드 들여쓰기가 프로젝트 상세에 유지된다', () => {
    const { container } = renderProjectDetail('mo-re')

    expect(container.textContent).toContain('약 356ms에서 156ms로')
    expect(container.textContent).toContain('기능별 모듈과 Convention Plugin을 구성해 공통 Gradle 설정을 한곳에서 관리했습니다.')
    expect(
      Array.from(container.querySelectorAll('strong')).some(
        (element) => element.textContent?.includes('약 356ms에서 156ms로'),
      ),
    ).toBe(true)

    const codeBlocks = container.querySelectorAll('pre code')
    expect(codeBlocks[1].textContent).toContain(
      'val cpuDeferred = async {\n    runCatching {\n        getCpuMetricsUseCase(instanceId, targetDate)',
    )
    expect(codeBlocks[2].textContent).toMatch(/^val cpuMetrics = cpuDeferred\.await\(\)/)
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

  it('Dear My Diary는 팀장 역할과 확인된 문제 해결을 표시하고 빈 회고를 숨긴다', () => {
    renderProjectDetail('dear-my-diary')

    expect(screen.getByRole('heading', { level: 1, name: 'Dear My Diary - Android' }))
      .toBeInTheDocument()
    expect(screen.getByText('Android 팀장 / 앱 기능 개발 및 통합')).toBeInTheDocument()
    expect(screen.getByText(/일기 생성에 사용하는 GPT-2는 입력을 마지막 64토큰으로/))
      .toBeInTheDocument()
    expect(screen.getByText(/일기 저장 시 memo를 읽던 코드를 completion을 읽도록/))
      .toBeInTheDocument()
    expect(screen.getByText(/Qualcomm 재직자 멘토의 멘토링을 받으며/)).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: '링크' })).not.toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: '프로젝트 회고' })).not.toBeInTheDocument()
    expect(screen.getAllByRole('img')).toHaveLength(4)
  })
})
