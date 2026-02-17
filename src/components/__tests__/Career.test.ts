import { getTotalCareer } from '../Career'

describe('getTotalCareer', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('경력 시작일 당일이면 "1개월 미만"을 반환한다', () => {
    vi.setSystemTime(new Date(2026, 1, 9)) // 2026.02.09 (시작 당일)
    expect(getTotalCareer()).toBe('1개월 미만')
  })

  it('같은 달이면 "1개월 미만"을 반환한다', () => {
    vi.setSystemTime(new Date(2026, 1, 15)) // 2026.02.15 (시작 후 6일)
    expect(getTotalCareer()).toBe('1개월 미만')
  })

  it('몇 개월 경과하면 "N개월"을 반환한다', () => {
    vi.setSystemTime(new Date(2026, 4, 15)) // 2026.05.15 → 3개월
    expect(getTotalCareer()).toBe('3개월')
  })

  it('정확히 1년이면 "1년"을 반환한다', () => {
    vi.setSystemTime(new Date(2027, 1, 10)) // 2027.02.10 → 1년
    expect(getTotalCareer()).toBe('1년')
  })

  it('1년 이상이면 "N년 M개월"을 반환한다', () => {
    vi.setSystemTime(new Date(2027, 7, 15)) // 2027.08.15 → 1년 6개월
    expect(getTotalCareer()).toBe('1년 6개월')
  })

  it('날짜가 시작일보다 이전이면 1개월 빼기가 적용된다', () => {
    vi.setSystemTime(new Date(2026, 2, 5)) // 2026.03.05, 9일 이전 → 0개월
    expect(getTotalCareer()).toBe('1개월 미만')
  })
})
