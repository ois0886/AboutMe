import { render, screen, within } from '@testing-library/react'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { MemoryRouter } from 'react-router-dom'
import About from '../About'

function renderAbout() {
  return render(<MemoryRouter><About /></MemoryRouter>)
}

describe('About', () => {
  it('프로필과 검색 및 공유 메타데이터에 Software Engineer를 표시한다', () => {
    renderAbout()
    expect(screen.getByText('Software Engineer')).toBeInTheDocument()

    const document = new DOMParser().parseFromString(
      readFileSync(resolve(process.cwd(), 'index.html'), 'utf8'),
      'text/html',
    )
    expect(document.title).toBe('Oh In Seong | Software Engineer')
    for (const selector of [
      'meta[name="description"]', 'meta[property="og:title"]', 'meta[property="og:description"]',
      'meta[name="twitter:title"]', 'meta[name="twitter:description"]',
    ]) {
      expect(document.querySelector(selector)?.getAttribute('content')).toContain('Software Engineer')
    }
  })

  it('웹 Introduction은 기존 문구와 순서를 보존하고 핵심 구절만 강조한다', () => {
    renderAbout()

    const introduction = screen.getByRole('heading', { name: 'Introduction' }).parentElement!
    const webItems = within(introduction).getAllByRole('listitem')

    expect(webItems.map((item) => item.textContent))
      .toEqual([
        '사용자 경험과 유지보수성을 고민하며, 구현을 넘어 고객 문제를 안정적인 제품 흐름으로 풀어내는 개발자를 지향합니다.',
        '다양한 조회와 실시간 데이터의 연동을 검증하며 서비스 간 데이터 흐름과 안정성에 대한 이해를 넓혀가고 있습니다.',
        '팀의 성장에 기여하기 위해 코드 리뷰와 AI 기반 개발 흐름 개선을 적극적으로 활용하고, 테스트 가능한 구조와 읽기 쉬운 코드를 작성하려 노력합니다.',
        '학습한 내용과 문제 해결 과정을 블로그에 기록하며, 부족했던 부분을 재현 가능한 지식으로 정리해 다음 프로젝트의 기준으로 발전시키고 있습니다.',
        '의견을 제시할 때는 감이 아닌 근거를 바탕으로 소통하며, 더 나은 방향을 함께 찾는 협업을 지향합니다.',
      ])
    expect(webItems.map((item) => Array.from(item.querySelectorAll('strong'), (emphasis) => emphasis.textContent)))
      .toEqual([
        ['안정적인 제품 흐름'],
        ['데이터 흐름과 안정성'],
        ['테스트 가능한 구조'],
        ['재현 가능한 지식'],
        [],
      ])
  })

  it('이름을 첫 제목으로 표시하고 소개, 연락처 정보 순서와 이동 버튼을 제공한다', () => {
    renderAbout()

    expect(screen.getAllByRole('heading').map((heading) => [heading.tagName, heading.textContent]))
      .toEqual([['H1', 'Oh In Seong'], ['H2', 'Introduction'], ['H2', 'Info']])
    expect(screen.getByRole('region', { name: 'About' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Career' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '프로젝트 보기' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '연락하기' })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: '프로필 사진' }))
      .toHaveAttribute('src', 'screenshot/profile.jpg')
  })
})
