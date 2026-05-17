import { render, screen } from '@testing-library/react'
import Activity from '../Activity'
import Career from '../Career'
import { careers, getTotalCareer } from '../careerUtils'

describe('Career', () => {
  it('(주)차트연구소 경력이 렌더링된다', () => {
    render(<Career />)

    expect(screen.getByRole('heading', { level: 3, name: '(주)차트연구소' })).toBeInTheDocument()
  })

  it('(주)PickNumber 경력이 렌더링된다', () => {
    render(<Career />)

    expect(screen.getByRole('heading', { level: 3, name: '(주)PickNumber' })).toBeInTheDocument()
  })
})

describe('Activity', () => {
  it('한성대학교 LBT 지식 나눔 프로젝트가 Activity에 렌더링된다', () => {
    render(<Activity />)

    expect(
      screen.getByRole('heading', {
        level: 3,
        name: '한성대학교 LBT 지식 나눔 프로젝트 — "알고리즘을 공부하는 방법" 발표',
      }),
    ).toBeInTheDocument()
  })

})

describe('getTotalCareer', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('재직 시작일이면 이전 산학협력 경력을 포함해 7개월을 반환한다', () => {
    vi.setSystemTime(new Date(2026, 1, 9))
    expect(getTotalCareer()).toBe('7개월')
  })

  it('재직 개월 수가 늘어나면 누적 개월 수가 증가한다', () => {
    vi.setSystemTime(new Date(2026, 4, 15)) // (주)차트연구소 4개월 + (주)PickNumber 6개월
    expect(getTotalCareer()).toBe('10개월')
  })

  it('누적 경력이 1년 이상이면 "N년 M개월"을 반환한다', () => {
    vi.setSystemTime(new Date(2027, 0, 9)) // (주)차트연구소 12개월 + (주)PickNumber 6개월
    expect(getTotalCareer()).toBe('1년 6개월')
  })

  it('2년 이상이면 "N년 M개월"을 반환한다', () => {
    vi.setSystemTime(new Date(2027, 7, 15)) // (주)차트연구소 1년 7개월 + (주)PickNumber 6개월
    expect(getTotalCareer()).toBe('2년 1개월')
  })

  it('Career 데이터에 (주)차트연구소와 (주)PickNumber가 등록되어 있다', () => {
    expect(careers.map((career) => career.company)).toEqual(['(주)차트연구소', '(주)PickNumber'])
  })
})
