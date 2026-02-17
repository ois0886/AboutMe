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
    expect(screen.getByText(firstProject.title)).toBeInTheDocument()
  })

  it('유효한 프로젝트 ID로 접근하면 설명이 렌더링된다', () => {
    renderProjectDetail(firstProject.id)
    expect(screen.getByText(firstProject.description)).toBeInTheDocument()
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
})
