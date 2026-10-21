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

  it('웹과 이력서의 LS 문제 해결, EasyChart, MarketMap, 홈페이지 기여가 일치한다', () => {
    const resumeHtml = readFileSync(resolve(process.cwd(), 'resume.html'), 'utf8')
    const resumeDocument = new DOMParser().parseFromString(resumeHtml, 'text/html')
    const resumeTasks = Array.from(
      resumeDocument.querySelectorAll('[data-career-id="chartlab"] > ul > li'),
    ).map((item) => normalizeText(item.textContent ?? ''))

    const facts = [
      ['LS증권', '연속 편집', '키패드 종료', '결과 전달', '소수점', '음수', '숫자 파싱'],
      ['LS', '이동평균선 체크 상태', 'Signal 기간', '테마', '매뉴얼'],
      ['EasyChart', 'ViewModel', 'LiveData'],
      ['MarketMap', '깊이', '카테고리', '편집값', '엔진 속성'],
      ['React', 'Vite', 'SCSS', '홈페이지', 'Sanity', '검색', '첨부파일'],
    ]
    expect(resumeTasks).toHaveLength(facts.length)
    expect(careers[0].tasks).toHaveLength(facts.length)
    facts.forEach((keywords, index) => {
      keywords.forEach((keyword) => {
        expect(careers[0].tasks[index]).toContain(keyword)
        expect(resumeTasks[index]).toContain(keyword)
      })
    })

    for (const tasks of [careers[0].tasks, resumeTasks]) {
      expect(tasks.join(' ')).not.toMatch(/조회 61종|실시간 21종|Script API|그리드|Grid Alert|PowerAlert|3분할 API 구현|차트 엔진 개발/)
    }
  })

  it('검증된 기여를 표시하고 미완성 그리드와 제공받은 API 구현은 제외한다', () => {
    render(<Career />)

    expect(screen.getByText(/LS증권.*연속 편집값 누락/)).toBeInTheDocument()
    expect(screen.getByText(/EasyChart.*차트 화면과 지표 설정 기능/)).toBeInTheDocument()
    expect(screen.getByText(/MarketMap 설정 화면.*깊이 전환 시 편집값 보존/)).toBeInTheDocument()
    expect(screen.queryByText(/그리드|Grid Alert|PowerAlert|3분할 API 구현/)).not.toBeInTheDocument()
    expect(screen.getByText(/React 기반 자사 반응형 홈페이지/)).toBeInTheDocument()
    expect(screen.queryByText(/삼성증권.*PPT/)).not.toBeInTheDocument()
    expect(readFileSync(resolve(process.cwd(), 'resume.html'), 'utf8')).not.toMatch(/삼성증권.*PPT/)
  })

  it('웹에는 핵심 기여 네 항목만 표시하고 문서용 상세 설명은 노출하지 않는다', () => {
    render(<Career />)

    const section = screen.getByRole('heading', { name: 'Career' }).closest('section')!
    expect(within(section).getAllByRole('listitem')).toHaveLength(4)
    for (const task of careers[0].tasks) {
      expect(screen.queryByText(task)).not.toBeInTheDocument()
    }
    for (const problemSolving of careers[0].problemSolvings ?? []) {
      expect(screen.queryByText(problemSolving.title)).not.toBeInTheDocument()
    }
    expect(section.querySelector('details')).toBeNull()
  })

  it('이력서는 기준일 표기 없이 총 경력만 표시하고 웹 계산과 일치한다', () => {
    const resumeHtml = readFileSync(resolve(process.cwd(), 'resume.html'), 'utf8')
    const resumeDocument = new DOMParser().parseFromString(resumeHtml, 'text/html')
    const careerSection = resumeDocument.querySelector('[data-career-id="chartlab"]')?.closest('section')
    vi.useFakeTimers()
    try {
      // 정적 이력서의 경력 갱신 시점으로 고정해 웹 자동 계산과 비교한다.
      vi.setSystemTime(new Date(2026, 9, 9, 12))
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

    expect(card.getByText('알고리즘 스터디 주최 및 참여 (2023.06 ~ 2023.12)')).toBeInTheDocument()
    expect(card.getByText('(주)PickNumber 산학 협력 프로젝트에서 전국 업체 예약 및 위치 서비스 앱 개발 (2023.01 ~ 2023.06)')).toBeInTheDocument()
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

    const study = screen.getByText('CS와 Android 스터디 주최 및 운영 (2025.02 ~ 2025.06)')
    const education = within(study.closest('section')!)

    expect(study.closest('section')).toHaveAttribute('id', 'education')
    expect(education.getByRole('heading', { level: 3, name: /삼성 청년 AI SW 아카데미 13기/ })).toBeInTheDocument()
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
