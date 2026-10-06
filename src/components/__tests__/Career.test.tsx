import { fireEvent, render, screen, within } from '@testing-library/react'
import { existsSync, readFileSync } from 'node:fs'
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

  it('차트연구소 핵심 경력 5개 문구가 웹과 이력서에서 일치한다', () => {
    const resumeHtml = readFileSync(resolve(process.cwd(), 'resume.html'), 'utf8')
    const resumeDocument = new DOMParser().parseFromString(resumeHtml, 'text/html')
    const resumeTasks = Array.from(
      resumeDocument.querySelectorAll('[data-career-id="chartlab"] > ul > li'),
    ).map((item) => normalizeText(item.textContent ?? ''))

    expect(resumeTasks).toHaveLength(5)
    expect(careers[0].tasks.map(normalizeText)).toEqual(resumeTasks)
  })

  it('주요 개발 성과는 표시하고 세부 운영 업무와 삼성증권 PPT 업무는 제외한다', () => {
    render(<Career />)

    expect(screen.getByText(/EasyChart.*차트 화면·설정 기능/)).toBeInTheDocument()
    expect(screen.getByText(/시장·주기별 조회·실시간 데이터 연동/)).toBeInTheDocument()
    expect(screen.getByText(/Script API 지원 범위를 약 80% 확대/)).toBeInTheDocument()
    expect(screen.getByText(/PowerGraphics 감시목록과 차트별 지표 데이터/)).toBeInTheDocument()
    expect(screen.getByText(/React·Vite·SCSS 기반 자사 반응형 홈페이지/)).toBeInTheDocument()
    expect(screen.queryByText(/개발·샘플 매뉴얼|숫자 입력 저장·소수점 처리|운영 버전의 수정·검증 절차|배포·운영 가이드/)).not.toBeInTheDocument()
    expect(screen.queryByText(/삼성증권.*PPT/)).not.toBeInTheDocument()
    expect(readFileSync(resolve(process.cwd(), 'resume.html'), 'utf8')).not.toMatch(/삼성증권.*PPT/)
  })

  it('이력서는 기준일 표기 없이 총 경력만 표시하고 웹 계산과 일치한다', () => {
    const resumeHtml = readFileSync(resolve(process.cwd(), 'resume.html'), 'utf8')
    const resumeDocument = new DOMParser().parseFromString(resumeHtml, 'text/html')
    const careerSection = resumeDocument.querySelector('[data-career-id="chartlab"]')?.closest('section')
    vi.useFakeTimers()
    try {
      // 정적 이력서의 경력 갱신 시점으로 고정해 웹 자동 계산과 비교한다.
      vi.setSystemTime(new Date(2026, 9, 6, 12))
      render(<Career />)

      const totalCareer = `총 경력 ${getTotalCareer()}`
      expect(screen.getByText(totalCareer)).toBeInTheDocument()
      expect(careerSection?.querySelector('.section-heading .right-meta')?.textContent)
        .toBe(totalCareer)
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
  it('코드프레소 교육 카드에서만 수료증을 펼치고 접을 수 있다', () => {
    render(<Education />)

    const heading = screen.getByRole('heading', { name: '주식회사 코드프레소 웹 개발 기초완성' })
    const card = within(heading.closest('div')!.parentElement!.parentElement!)
    const imageName = '주식회사 코드프레소 웹 개발 기초완성 수료증'
    const button = card.getByRole('button', { name: '수료증 보기' })

    expect(screen.getAllByRole('button', { name: '수료증 보기' })).toHaveLength(1)
    expect(button).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByRole('img', { name: imageName })).not.toBeInTheDocument()

    fireEvent.click(button)

    const image = card.getByRole('img', { name: imageName })
    expect(card.getByRole('button', { name: '수료증 접기' })).toHaveAttribute('aria-expanded', 'true')
    expect(image).toHaveAttribute('src', 'screenshot/codepresso-certificate.png')
    expect(existsSync(resolve(process.cwd(), 'public', image.getAttribute('src')!))).toBe(true)

    fireEvent.click(card.getByRole('button', { name: '수료증 접기' }))

    expect(card.getByRole('button', { name: '수료증 보기' })).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByRole('img', { name: imageName })).not.toBeInTheDocument()
  })

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

  it.each([
    ['입사 전', new Date(2026, 1, 8)],
    ['입사 당일', new Date(2026, 1, 9)],
    ['한 달을 채우기 전', new Date(2026, 2, 8)],
  ])('%s에는 1개월 미만을 반환한다', (_, date) => {
    vi.setSystemTime(date)
    expect(getTotalCareer()).toBe('1개월 미만')
  })

  it('입사일로부터 한 달을 채우면 1개월을 반환한다', () => {
    vi.setSystemTime(new Date(2026, 2, 9))
    expect(getTotalCareer()).toBe('1개월')
  })

  it('완전히 경과한 개월 수만 반환하고 남은 일수는 올림하지 않는다', () => {
    vi.setSystemTime(new Date(2026, 4, 15)) // (주)차트연구소 3개월 6일
    expect(getTotalCareer()).toBe('3개월')
  })

  it('달이 바뀌어도 입사일에 도달하기 전에는 개월 수가 늘어나지 않는다', () => {
    vi.setSystemTime(new Date(2026, 6, 1)) // (주)차트연구소 4개월 22일
    expect(getTotalCareer()).toBe('4개월')
  })

  it.each([
    [8, '6개월'],
    [9, '7개월'],
    [18, '7개월'],
    [28, '7개월'],
  ])('2026년 9월 %i일 기준 경력은 %s이다', (day, expected) => {
    vi.setSystemTime(new Date(2026, 8, day))
    expect(getTotalCareer()).toBe(expected)
  })

  it.each([
    [6, '7개월'],
    [8, '7개월'],
    [9, '8개월'],
  ])('2026년 10월 %i일 기준 경력은 %s이다', (day, expected) => {
    vi.setSystemTime(new Date(2026, 9, day))
    expect(getTotalCareer()).toBe(expected)
  })

  it.each([
    [8, '11개월'],
    [9, '1년'],
  ])('2027년 2월 %i일 기준으로 12개월을 채웠을 때만 연 단위로 표시한다', (day, expected) => {
    vi.setSystemTime(new Date(2027, 1, day))
    expect(getTotalCareer()).toBe(expected)
  })

  it('1년 이상이면 "N년 M개월"을 반환한다', () => {
    vi.setSystemTime(new Date(2027, 7, 15)) // (주)차트연구소 1년 6개월 6일
    expect(getTotalCareer()).toBe('1년 6개월')
  })

  it('Career 데이터에 (주)차트연구소만 등록되어 있다', () => {
    expect(careers.map((career) => career.company)).toEqual(['(주)차트연구소'])
  })
})
