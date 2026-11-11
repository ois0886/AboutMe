import { render, screen, within } from '@testing-library/react'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import Activity from '../Activity'
import Career from '../Career'
import Education from '../Education'
import { careers, getTotalCareer } from '../careerUtils'

const normalizeText = (text: string) => text.replace(/\s+/g, ' ').trim()

describe('Career', () => {
  it('회사명을 중소기업으로 표시한다', () => {
    render(<Career />)

    expect(screen.getByRole('heading', { level: 3, name: '중소기업' })).toBeInTheDocument()
    expect(screen.queryByText('(주)차트연구소')).not.toBeInTheDocument()
  })

  it('(주)픽넘버를 경력에 표시하지 않는다', () => {
    render(<Career />)

    expect(screen.queryByRole('article', { name: '(주)픽넘버' })).not.toBeInTheDocument()
  })

  it('이력서에 기존 부서, 주요업무와 경력 요약을 유지한다', () => {
    const resumeHtml = readFileSync(resolve(process.cwd(), 'resume.html'), 'utf8')
    const resumeDocument = new DOMParser().parseFromString(resumeHtml, 'text/html')
    const resumeTasks = Array.from(
      resumeDocument.querySelectorAll('[data-career-id="chartlab"] > ul > li'),
    ).map((item) => normalizeText(item.textContent ?? ''))

    const facts = [
      ['LS증권', '키패드 결과 전달', '숫자 파싱', '연속 편집값 누락', '소수점/음수', '이동평균선', '분석도구'],
      ['EasyChart', '기존 차트 엔진', 'ViewModel', 'LiveData', '편집 상태', '초기화', '재진입'],
      ['MarketMap', '설정 화면', '깊이 전환', '편집값', '로딩 이벤트', '사용자 변경', '엔진 속성'],
      ['React', 'Vite', 'SCSS', '홈페이지', 'Sanity', '공지 조회와 검색', 'Google Apps Script', '첨부파일 문의 접수'],
    ]
    expect(resumeTasks).toHaveLength(4)
    facts.forEach((keywords, index) => {
      keywords.forEach((keyword) => {
        expect(resumeTasks[index]).toContain(keyword)
      })
      expect(resumeTasks[index]).not.toMatch(/[.!?]$/u)
    })
    const role = `${careers[0].role} | ${careers[0].location}`
    expect(resumeDocument.querySelector('[data-career-id="chartlab"] > .meta')?.textContent).toBe(role)
    expect(role).toBe('Android Developer | 모바일개발부서 | 연구원/정규직 | 서울시 강서구')
    expect(resumeDocument.querySelector('[data-career-id="chartlab"] > .subhead')?.textContent)
      .toBe('주요업무 : MTS Android UI 개발 및 고객사 유지보수 지원')

    for (const tasks of [careers[0].tasks, resumeTasks]) {
      expect(tasks.join(' ')).not.toMatch(/조회 61종|실시간 21종|Script API 구현|Script API 개발|3분할 API 구현|차트 엔진 개발|Java 변환|함수 호환 작업/)
    }
  })

  it('문서용 상세 기여에는 Alert UI와 제공된 Script API의 사용 문서를 구분해 보관한다', () => {
    const alert = careers[0].tasks.find((task) => task.startsWith('Alert의'))!
    const documentation = careers[0].tasks.find((task) => task.startsWith('제공된 Script API'))!

    for (const fact of ['감시설정 화면', '그리드 UI', '롱클릭', '툴팁', '셀 재구성', '테마']) {
      expect(alert).toContain(fact)
    }
    for (const fact of ['인자와 반환값', '호출 순서', '개발 매뉴얼', '샘플 매뉴얼', '3분할']) {
      expect(documentation).toContain(fact)
    }
    expect(alert).not.toMatch(/데이터 연동|실시간 수신|데이터 가공|열 설정/)
    expect(documentation).not.toMatch(/Script API 구현|Script API 개발|Java 변환|함수 호환 작업|샘플 앱 개발/)
  })

  it('웹과 이력서 요약에서 Alert UI를 제외하고 제공받은 API의 구현으로 서술하지 않는다', () => {
    render(<Career />)

    expect(screen.queryByText(/Alert.*감시설정 화면.*그리드 UI.*롱클릭.*오류/)).not.toBeInTheDocument()
    expect(readFileSync(resolve(process.cwd(), 'resume.html'), 'utf8')).not.toMatch(/Alert.*감시설정 화면/)
    expect(screen.queryByText(/Script API 구현|API 개발|3분할 API 구현|차트 엔진 개발/)).not.toBeInTheDocument()
    expect(screen.queryByText(/삼성증권.*PPT/)).not.toBeInTheDocument()
    expect(readFileSync(resolve(process.cwd(), 'resume.html'), 'utf8')).not.toMatch(/삼성증권.*PPT/)
  })

  it('웹 경력에는 직무 정보와 요약 두 항목을 표시한다', () => {
    render(<Career />)

    const article = screen.getByRole('article', { name: '중소기업' })
    const entry = within(article)
    expect(entry.getByText('Android Developer | 모바일개발부서 | 연구원/정규직 | 서울시 강서구')).toBeInTheDocument()
    expect(entry.getAllByRole('listitem').map((item) => item.textContent)).toEqual([
      'MTS Android UI 개발 및 고객사 유지보수 지원',
      '회사 홈페이지 React, Vite, SCSS로 반응형 웹페이지 리팩토링',
    ])
    expect(entry.queryByText(/주요업무/)).not.toBeInTheDocument()
    for (const task of careers[0].tasks) {
      expect(screen.queryByText(task)).not.toBeInTheDocument()
    }
    for (const problemSolving of careers[0].problemSolvings ?? []) {
      expect(screen.queryByText(problemSolving.title)).not.toBeInTheDocument()
    }
    expect(article.querySelector('details')).toBeNull()
  })

  it('이력서의 총 경력은 이력서에 수록된 차트연구소의 기간과 일치한다', () => {
    const resumeHtml = readFileSync(resolve(process.cwd(), 'resume.html'), 'utf8')
    const resumeDocument = new DOMParser().parseFromString(resumeHtml, 'text/html')
    const careerSection = resumeDocument.querySelector('[data-career-id="chartlab"]')?.closest('section')
    const totalCareerElement = careerSection?.querySelector('.section-heading .right-meta')
    const asOf = totalCareerElement?.getAttribute('data-career-as-of')
    expect(asOf).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    vi.useFakeTimers()
    try {
      // 정적 이력서의 경력 갱신 시점으로 고정해 웹 자동 계산과 비교한다.
      vi.setSystemTime(new Date(`${asOf}T12:00:00+09:00`))
      expect(totalCareerElement?.textContent)
        .toBe(`총 경력 ${getTotalCareer([careers[0]])}`)
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
  it('웹과 이력서에서 코드프레소 교육과 수료증을 제거하고 나머지 교육을 유지한다', () => {
    const { container } = render(<Education />)
    const resumeDocument = new DOMParser().parseFromString(
      readFileSync(resolve(process.cwd(), 'resume.html'), 'utf8'),
      'text/html',
    )
    const resumeEducation = Array.from(resumeDocument.querySelectorAll('section'))
      .find((section) => section.querySelector('h2')?.textContent === 'Education')!
    const expectedHeadings = [
      '삼성 청년 AI SW 아카데미 13기 Mobile Track',
      '한성대학교 컴퓨터공학과 졸업',
    ]

    expect(screen.getAllByRole('heading', { level: 3 }).map((heading) => normalizeText(heading.textContent ?? '')))
      .toEqual(expectedHeadings)
    expect(Array.from(resumeEducation.querySelectorAll('h3'), (heading) => normalizeText(heading.textContent ?? '')))
      .toEqual(expectedHeadings)
    for (const education of [container, resumeEducation]) {
      expect(education.textContent).not.toMatch(/코드프레소|웹 개발 기초완성|웹 개발 기초 비대면 교육/)
      expect(education.querySelector('img[src*="codepresso"], img[alt*="코드프레소"]')).toBeNull()
    }
    expect(screen.queryByRole('button', { name: /수료증/ })).not.toBeInTheDocument()
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
  ])('차트연구소만 계산하면 %s에 1개월 미만을 반환한다', (_, date) => {
    vi.setSystemTime(date)
    expect(getTotalCareer([careers[0]])).toBe('1개월 미만')
  })

  it('차트연구소 입사일로부터 한 달을 채우면 1개월을 반환한다', () => {
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

  it('차트연구소 입사 전에는 1개월 미만을 반환한다', () => {
    vi.setSystemTime(new Date(2026, 1, 8))
    expect(getTotalCareer()).toBe('1개월 미만')
  })

  it('총 경력 계산 대상에는 차트연구소만 포함한다', () => {
    expect(careers.map((career) => career.company)).toEqual(['(주)차트연구소'])
  })
})
