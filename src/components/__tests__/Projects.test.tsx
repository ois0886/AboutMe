import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Projects from '../Projects'
import projects from '../../data/projects'

function renderProjects() {
  return render(
    <MemoryRouter>
      <Projects />
    </MemoryRouter>,
  )
}

describe('Projects', () => {
  it('섹션 타이틀이 렌더링된다', () => {
    renderProjects()
    expect(screen.getByText('Projects')).toBeInTheDocument()
  })

  it('모든 프로젝트 카드가 렌더링된다', () => {
    renderProjects()
    projects.forEach((project) => {
      expect(screen.getByText(project.title)).toBeInTheDocument()
    })
  })

  it('프로젝트 카드 링크가 올바른 경로를 가진다', () => {
    renderProjects()
    projects.forEach((project) => {
      const link = screen.getByText(project.title).closest('a')
      expect(link).toHaveAttribute('href', `/projects/${project.id}`)
    })
  })

  it('프로젝트 기술 태그가 렌더링된다', () => {
    renderProjects()
    projects.forEach((project) => {
      project.tech.forEach((t) => {
        expect(screen.getAllByText(t).length).toBeGreaterThan(0)
      })
    })
  })
})
