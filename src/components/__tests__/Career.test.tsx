import { render, screen } from '@testing-library/react'
import Activity from '../Activity'
import Career from '../Career'
import { careers, getTotalCareer } from '../careerUtils'

describe('Career', () => {
  it('ChartLab과 PickNumber 경력이 모두 렌더링된다', () => {
    render(<Career />)

    expect(screen.getByRole('heading', { level: 3, name: 'ChartLab' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: 'PickNumber' })).toBeInTheDocument()
  })

  it('PickNumber GitHub 링크가 올바른 URL을 가진다', () => {
    render(<Career />)

    const githubLink = screen.getByRole('link', { name: 'GitHub' })
    expect(githubLink).toHaveAttribute('href', 'https://github.com/HSU-Didimdol/Android_PickNumber')
  })
})

describe('Activity', () => {
  it('PickNumber 활동 항목이 더 이상 렌더링되지 않는다', () => {
    render(<Activity />)

    expect(screen.queryByText('(주)픽넘버 산학협력 프로젝트')).not.toBeInTheDocument()
  })
})

describe('getTotalCareer', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('종료된 경력과 재직중 경력을 합산해 개월 수를 반환한다', () => {
    vi.setSystemTime(new Date(2026, 1, 9)) // PickNumber 5개월 + ChartLab 1개월 미만
    expect(getTotalCareer()).toBe('5개월')
  })

  it('재직중 경력 개월 수가 늘어나면 누적 개월 수가 증가한다', () => {
    vi.setSystemTime(new Date(2026, 4, 15)) // PickNumber 5개월 + ChartLab 3개월
    expect(getTotalCareer()).toBe('8개월')
  })

  it('누적 경력이 정확히 1년이면 "1년"을 반환한다', () => {
    vi.setSystemTime(new Date(2026, 8, 10)) // PickNumber 5개월 + ChartLab 7개월
    expect(getTotalCareer()).toBe('1년')
  })

  it('1년 이상이면 "N년 M개월"을 반환한다', () => {
    vi.setSystemTime(new Date(2027, 7, 15)) // PickNumber 5개월 + ChartLab 18개월
    expect(getTotalCareer()).toBe('1년 11개월')
  })

  it('Career 데이터에 최신 경력부터 정렬되어 있다', () => {
    expect(careers.map((career) => career.company)).toEqual(['ChartLab', 'PickNumber'])
  })
})
