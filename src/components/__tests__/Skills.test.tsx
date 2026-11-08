import { render, screen, within } from '@testing-library/react'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import Skills from '../Skills'

describe('Skills', () => {
  it('Backend와 Frontend를 별도 카드로 나누고 기존 문구를 보존한다', () => {
    render(<Skills />)

    expect(screen.getAllByRole('heading', { level: 3 }).map((heading) => heading.textContent))
      .toEqual(['Android & Kotlin', 'Backend', 'Frontend', 'AI Agent', 'Communication'])
    const backend = screen.getByRole('heading', { name: 'Backend' }).parentElement!
    const frontend = screen.getByRole('heading', { name: 'Frontend' }).parentElement!
    expect(within(backend).getAllByRole('listitem').map((item) => item.textContent))
      .toEqual([
        'Spring Boot REST API 설계, 컨트롤러와 서비스, 데이터 접근 계층 분리',
        'MyBatis와 MySQL을 활용한 SQL 매핑, 조인, 페이지 조회와 검색 조건 처리',
        '함께 반영해야 하는 데이터 변경의 트랜잭션 처리, 입력 검증과 예외 처리 구현',
        '공통 응답 형식과 오류 응답, 페이지 조회 규칙 정의 및 클라이언트 연동',
      ])
    expect(within(frontend).getAllByRole('listitem').map((item) => item.textContent))
      .toEqual(['React, TypeScript, Vue 3와 Vite 화면 및 라우팅 구성, 상태 관리와 재사용 컴포넌트 분리'])
  })

  it('이력서는 기술 목록을 다섯 분류의 일반 텍스트로 표시하고 추가 기술은 웹에도 반영한다', () => {
    const resumeDocument = new DOMParser().parseFromString(
      readFileSync(resolve(process.cwd(), 'resume.html'), 'utf8'),
      'text/html',
    )
    const groups = Array.from(resumeDocument.querySelectorAll('.skill-group'))
    expect(groups.map((group) => group.querySelector('.skill-category')?.textContent))
      .toEqual(['Backend', 'Frontend', 'Android', 'AI Agent', 'Etc'])
    const technologies = (category: string) =>
      groups.find((group) => group.querySelector('.skill-category')?.textContent === category)!
        .querySelector('.skill-values')!.textContent!.split(', ')
    expect(technologies('Frontend')).toEqual(['React', 'TypeScript', 'Vue 3', 'Vite'])
    expect(technologies('AI Agent')).toEqual([
      'Codex', 'Claude Code / 작업 분리와 병렬화', '구현', '테스트', '리뷰', '문서화 자동화',
    ])
    expect(technologies('Etc')).toEqual(['GitHub', 'Jira', 'Figma', 'Slack'])
    expect(resumeDocument.querySelector('.skill-tag, .skill-tags')).toBeNull()

    const { container } = render(<Skills />)
    for (const technology of ['React', 'TypeScript', 'Codex', 'Claude Code', 'Jira', 'Figma', 'Slack']) {
      expect(container).toHaveTextContent(technology)
    }
  })

  it('프로젝트명과 전후 시간 없이 세 로딩 역량을 구분하고 개선율만 표시한다', () => {
    render(<Skills />)

    const items = screen.getAllByRole('listitem')
    const technologies = ['Coroutines', 'Room', 'Paging3']
    const matchedItems = technologies.map((technology) => {
      const matches = items.filter((item) => item.textContent?.includes(technology))
      expect(matches).toHaveLength(1)
      return matches[0]
    })

    expect(new Set(matchedItems).size).toBe(technologies.length)
    const parallelReduction = Math.round((356 - 156) / 356 * 100)
    const localReductionLowerBound = Math.floor((3 - 0.5) / 3 * 100)
    expect(matchedItems[0]).toHaveTextContent(`약 ${parallelReduction}% 단축`)
    expect(matchedItems[1]).toHaveTextContent(`${localReductionLowerBound}% 이상 단축`)
    expect(matchedItems[2]).not.toHaveTextContent(/%/)
    const androidSkills = screen.getByRole('heading', { name: 'Android & Kotlin' }).parentElement!
    expect(androidSkills).not.toHaveTextContent(/Mo-Re|Didimdol|POCS|356ms|156ms|3~5초|0\.5초/)
  })
})
