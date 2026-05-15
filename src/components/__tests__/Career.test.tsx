import { render, screen } from '@testing-library/react'
import Activity from '../Activity'
import Career from '../Career'
import { careers, getTotalCareer } from '../careerUtils'

describe('Career', () => {
  it('(주)차트연구소 경력이 렌더링된다', () => {
    render(<Career />)

    expect(screen.getByRole('heading', { level: 3, name: '(주)차트연구소' })).toBeInTheDocument()
  })

  it('PickNumber는 Career에 렌더링되지 않는다', () => {
    render(<Career />)

    expect(screen.queryByRole('heading', { level: 3, name: 'PickNumber' })).not.toBeInTheDocument()
  })
})

describe('Activity', () => {
  it('한성대학교 산학 협력 프로젝트가 Activity에 렌더링된다', () => {
    render(<Activity />)

    expect(
      screen.getByRole('heading', { level: 3, name: '한성대학교 산학 협력 프로젝트' }),
    ).toBeInTheDocument()
  })

  it('PickNumber GitHub 링크가 Activity에 올바른 URL로 표시된다', () => {
    render(<Activity />)

    const githubLinks = screen.getAllByRole('link', { name: 'GitHub' })
    const pickNumberLink = githubLinks.find(
      (link) => link.getAttribute('href') === 'https://github.com/HSU-Didimdol/Android_PickNumber',
    )
    expect(pickNumberLink).toBeDefined()
  })
})

describe('getTotalCareer', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('재직 시작일이면 1개월을 반환한다', () => {
    vi.setSystemTime(new Date(2026, 1, 9))
    expect(getTotalCareer()).toBe('1개월')
  })

  it('재직 개월 수가 늘어나면 누적 개월 수가 증가한다', () => {
    vi.setSystemTime(new Date(2026, 4, 15)) // (주)차트연구소 4개월
    expect(getTotalCareer()).toBe('4개월')
  })

  it('누적 경력이 정확히 1년이면 "1년"을 반환한다', () => {
    vi.setSystemTime(new Date(2027, 0, 9)) // (주)차트연구소 12개월
    expect(getTotalCareer()).toBe('1년')
  })

  it('1년 이상이면 "N년 M개월"을 반환한다', () => {
    vi.setSystemTime(new Date(2027, 7, 15)) // (주)차트연구소 1년 7개월
    expect(getTotalCareer()).toBe('1년 7개월')
  })

  it('Career 데이터에 (주)차트연구소만 등록되어 있다', () => {
    expect(careers.map((career) => career.company)).toEqual(['(주)차트연구소'])
  })
})
