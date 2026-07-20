import { render, screen } from '@testing-library/react'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import Activity from '../Activity'
import Career from '../Career'
import { careers, getTotalCareer } from '../careerUtils'

const normalizeText = (text: string) => text.replace(/\s+/g, ' ').trim()

describe('Career', () => {
  it('(주)차트연구소 경력이 렌더링된다', () => {
    render(<Career />)

    expect(screen.getByRole('heading', { level: 3, name: '(주)차트연구소' })).toBeInTheDocument()
  })

  it('(주)PickNumber 경력은 렌더링되지 않는다', () => {
    render(<Career />)

    expect(screen.queryByRole('heading', { level: 3, name: '(주)PickNumber' })).not.toBeInTheDocument()
  })

  it('웹과 이력서의 차트연구소 경력 문구가 동일하다', () => {
    const resumeHtml = readFileSync(resolve(process.cwd(), 'resume.html'), 'utf8')
    const resumeDocument = new DOMParser().parseFromString(resumeHtml, 'text/html')
    const resumeTasks = Array.from(
      resumeDocument.querySelectorAll('[data-career-id="chartlab"] > ul > li'),
    ).map((item) => normalizeText(item.textContent ?? ''))

    expect(resumeTasks).toEqual(careers[0].tasks.map(normalizeText))
    expect(resumeDocument.querySelector('[data-career-id="chartlab"]')?.closest('section')?.textContent)
      .toContain('총 경력 6개월')
  })

  it('경력 문구에 설명 없이 사용되는 내부 용어가 없다', () => {
    const careerText = careers.flatMap((career) => career.tasks).join(' ')

    expect(careerText).not.toMatch(/\b(?:AAR|TR|Enum|CMS|SDK)\b/)
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

  it('한성대학교 산학 협력 프로젝트가 Activity에 렌더링된다', () => {
    render(<Activity />)

    expect(
      screen.getByRole('heading', {
        level: 3,
        name: '한성대학교 산학 협력 프로젝트',
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByText('(주)PickNumber와 한성대학교 DC&M 동아리 산학 협력 프로젝트 - 전국 업체 예약 및 위치 서비스 제공 앱'),
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

  it('재직 시작일이면 1개월을 반환한다', () => {
    vi.setSystemTime(new Date(2026, 1, 9))
    expect(getTotalCareer()).toBe('1개월')
  })

  it('재직 개월 수가 늘어나면 첫 달을 포함한 개월 수를 반환한다', () => {
    vi.setSystemTime(new Date(2026, 4, 15)) // (주)차트연구소 4개월
    expect(getTotalCareer()).toBe('4개월')
  })

  it('월 시작일이 재직 시작일보다 빨라도 첫 달을 포함한 개월 수를 반환한다', () => {
    vi.setSystemTime(new Date(2026, 6, 1)) // (주)차트연구소 5개월
    expect(getTotalCareer()).toBe('5개월')
  })

  it('누적 경력이 1년 이상이면 "N년 M개월"을 반환한다', () => {
    vi.setSystemTime(new Date(2027, 1, 9)) // (주)차트연구소 1년 1개월
    expect(getTotalCareer()).toBe('1년 1개월')
  })

  it('1년 이상이면 "N년 M개월"을 반환한다', () => {
    vi.setSystemTime(new Date(2027, 7, 15)) // (주)차트연구소 1년 7개월
    expect(getTotalCareer()).toBe('1년 7개월')
  })

  it('Career 데이터에 (주)차트연구소만 등록되어 있다', () => {
    expect(careers.map((career) => career.company)).toEqual(['(주)차트연구소'])
  })
})
