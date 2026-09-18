import { render, screen, within } from '@testing-library/react'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import Activity from '../Activity'
import Career from '../Career'
import Education from '../Education'
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
  })

  it('이력서 기준일의 총 경력이 웹 자동 계산 결과와 동일하다', () => {
    const resumeHtml = readFileSync(resolve(process.cwd(), 'resume.html'), 'utf8')
    const resumeDocument = new DOMParser().parseFromString(resumeHtml, 'text/html')
    const careerSection = resumeDocument.querySelector('[data-career-id="chartlab"]')?.closest('section')
    const snapshotDate = careerSection?.querySelector('time')?.getAttribute('datetime')

    expect(snapshotDate).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    vi.useFakeTimers()
    try {
      vi.setSystemTime(new Date(`${snapshotDate}T12:00:00`))
      render(<Career />)

      const totalCareer = `총 경력 ${getTotalCareer()}`
      expect(screen.getByText(totalCareer)).toBeInTheDocument()
      expect(careerSection?.querySelector('.section-heading .right-meta')?.textContent)
        .toBe(`${totalCareer} · ${snapshotDate?.replaceAll('-', '.')} 기준`)
    } finally {
      vi.useRealTimers()
    }
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

  it('알고리즘 스터디와 산학 협력 프로젝트가 DC&M 활동 안에 표시된다', () => {
    render(<Activity />)

    const heading = screen.getByRole('heading', {
      level: 3,
      name: '한성대학교 교내 전공동아리 DC&M',
    })
    const card = within(heading.parentElement!)

    expect(card.getByText('알고리즘 스터디 주최 및 활동 (2023.06 ~ 2023.12)')).toBeInTheDocument()
    expect(card.getByText('(주)PickNumber 산학 협력 프로젝트 참여 — 전국 업체 예약 및 위치 서비스 앱 개발 (2023.01 ~ 2023.06)')).toBeInTheDocument()
    expect(card.getAllByRole('link').map((link) => link.getAttribute('href'))).toEqual([
      'https://superohinsung.tistory.com/198',
      'https://superohinsung.tistory.com/186',
      'https://superohinsung.tistory.com/162',
      'https://superohinsung.tistory.com/145',
    ])
    expect(screen.queryByRole('heading', { name: '한성대학교 산학 협력 프로젝트' })).not.toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: '한성대학교 교내 전공 동아리 알고리즘 스터디 주최' })).not.toBeInTheDocument()
  })

  it('동계 프로그래밍 캠프 두 항목을 웹과 이력서에서 제거한다', () => {
    render(<Activity />)

    expect(screen.queryByText(/동계 프로그래밍 캠프/)).not.toBeInTheDocument()
    expect(readFileSync(resolve(process.cwd(), 'resume.html'), 'utf8')).not.toContain('동계 프로그래밍 캠프')
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(6)
  })
})

describe('Education', () => {
  it('SSAFY 스터디 내용과 링크를 교육 이력으로 옮기고 독립 활동 카드를 제거한다', () => {
    render(<><Education /><Activity /></>)

    const study = screen.getByText('CS·Android 스터디 주최 및 운영 (2025.02 ~ 2025.06)')
    const education = within(study.closest('section')!)

    expect(study.closest('section')).toHaveAttribute('id', 'education')
    expect(education.getByRole('heading', { level: 3, name: /삼성 청년 AI·SW 아카데미 13기/ })).toBeInTheDocument()
    expect(education.getAllByRole('link').map((link) => link.getAttribute('href'))).toEqual([
      'https://github.com/Kotlin-Android-Study-with-SSAFY',
      'https://superohinsung.tistory.com/73',
      'https://superohinsung.tistory.com/380',
      'https://superohinsung.tistory.com/100',
      'https://superohinsung.tistory.com/378',
      'https://superohinsung.tistory.com/399',
    ])
    expect(screen.queryByRole('heading', { name: 'SSAFY 13기 CS, Android 스터디 주최 및 운영' })).not.toBeInTheDocument()
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

  it.each([
    [8, '7개월'],
    [9, '8개월'],
    [18, '8개월'],
  ])('2026년 9월 %i일 기준 경력은 %s이다', (day, expected) => {
    vi.setSystemTime(new Date(2026, 8, day))
    expect(getTotalCareer()).toBe(expected)
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
