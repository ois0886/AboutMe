import { render, screen, within } from '@testing-library/react'
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

  it('카드 전용 소개와 성과를 표시하고 상세페이지 원문은 사용하지 않는다', () => {
    renderProjects()

    projects.forEach((project) => {
      const card = within(screen.getByText(project.title).closest('a')!)
      expect(card.getByText(project.cardSummary.description)).toBeInTheDocument()
      expect(card.queryByText(project.description)).not.toBeInTheDocument()

      const highlights = card.getAllByRole('list')[0]
      expect(Array.from(highlights.querySelectorAll('li'), (item) => item.textContent))
        .toEqual(project.cardSummary.achievements.slice(0, 3).map((item) =>
          typeof item === 'string' ? item : item.map((segment) => segment.text).join(''),
        ))
      const emphasizedText = project.cardSummary.achievements.slice(0, 3)
        .flatMap((item) => typeof item === 'string' ? [] : item.filter((segment) => segment.strong))
        .map((segment) => segment.text)
      expect(Array.from(highlights.querySelectorAll('strong'), (item) => item.textContent))
        .toEqual(emphasizedText)
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

  it('프로젝트 카드는 성과를 최대 3개만 표시한다', () => {
    renderProjects()

    projects.forEach((project) => {
      const card = screen.getByText(project.title).closest('a')
      const achievementList = card?.querySelector('ul')

      expect(achievementList?.querySelectorAll('li')).toHaveLength(
        Math.min(project.cardSummary.achievements.length, 3),
      )
    })
  })
})
