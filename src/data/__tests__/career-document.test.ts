import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { careers } from '../../components/careerUtils'

const preserved = JSON.parse(
  readFileSync(resolve(process.cwd(), 'src/test/career-preserved-sections.json'), 'utf8'),
) as {
  header: string[]
  sections: Array<{ title: string; items: string[] }>
}

function readCareerDocument() {
  return new DOMParser().parseFromString(
    readFileSync(resolve(process.cwd(), 'career.html'), 'utf8'),
    'text/html',
  )
}

describe('경력기술서', () => {
  it('확인한 기여와 회사 정보, 기간 및 역할을 반영한다', () => {
    const document = readCareerDocument()
    const header = Array.from(document.querySelectorAll('[data-source-header]'), (item) => item.textContent)
    expect(header).toEqual(preserved.header)
    const { company, role, location, primaryDuty } = careers[0]
    expect(header).toContain([company, ...role.split(' | '), location].join(' / '))
    expect(header).toContain(primaryDuty)
    const sections = Array.from(document.querySelectorAll('.career-section'))
    expect(sections.map((section) => ({
      title: section.querySelector('h2')?.textContent,
      items: Array.from(section.querySelectorAll('li'), (item) => item.textContent),
    }))).toEqual(preserved.sections)
  })

  it('대제목 아래 본문은 소제목 없이 같은 단계의 점 목록으로 표시한다', () => {
    const document = readCareerDocument()
    expect(document.querySelectorAll('h1')).toHaveLength(1)
    expect(document.querySelectorAll('h2')).toHaveLength(6)
    expect(document.querySelector('h3, h4, h5, h6, li ul, li ol, li p, li strong')).toBeNull()
    expect(document.querySelectorAll('.career-section > ul > li')).toHaveLength(17)
    const pages = Array.from(document.querySelectorAll('[data-document-page]'))
    expect(pages).toHaveLength(1)
    expect(pages.map((page) => Array.from(page.querySelectorAll('h2'), (heading) => heading.textContent)))
      .toEqual([
        ['LS증권 Android 차트 라이브러리', 'EasyChart 화면과 설정', 'MarketMap 설정 화면', 'Alert 감시설정과 그리드 UI', '자사 반응형 홈페이지 개발', '차트 API 사용 문서와 샘플'],
      ])
  })

  it('Alert UI와 API 사용 문서는 원천 데이터에 근거하며 제공받은 기능의 구현으로 표현하지 않는다', () => {
    const document = readCareerDocument()
    const alert = document.querySelector('[data-career-section="alert"]')!.textContent!
    const documentation = document.querySelector('[data-career-section="api-docs"]')!.textContent!
    const source = careers[0].tasks.join(' ')

    for (const fact of ['감시설정', '그리드', '롱클릭', '툴팁', '셀 재구성']) {
      expect(alert).toContain(fact)
      expect(source).toContain(fact)
    }
    for (const fact of ['인자와 반환값', '호출 순서', '폼차트', '폼그래프', '3분할', '개발 매뉴얼', '샘플 매뉴얼']) {
      expect(documentation).toContain(fact)
      expect(source).toContain(fact)
    }
    expect(alert).not.toMatch(/데이터 연동|실시간 수신|데이터 가공|열 설정/)
    expect(documentation).not.toMatch(/Script API 구현|API 개발|Java 변환|함수 호환 작업|샘플 앱 개발|3분할 API 구현/)
    expect(document.querySelector('[data-career-section="ls-chart"]')!.textContent)
      .not.toContain('매뉴얼')
  })

  it('경력기술서에는 중앙점을 사용하지 않는다', () => {
    expect(readFileSync(resolve(process.cwd(), 'career.html'), 'utf8'))
      .not.toMatch(/[\u00b7\u318d\u2027\u30fb]/u)
  })

  it('키패드 수정도 별도 문제와 해결, 결과 구분 없이 일반 목록의 한 문장으로 작성한다', () => {
    const document = readCareerDocument()
    const item = document.querySelector('[data-career-section="ls-chart"] > ul > li')!
    expect(item.className).toBe('')
    expect(item.children).toHaveLength(0)
    expect(item.textContent).toBe(preserved.sections[0].items[0])
    expect(item.textContent!.match(/했습니다\./g)).toHaveLength(1)
    expect(document.body.textContent).not.toMatch(/문제:|해결:|결과:/)
    expect(document.querySelector('.problem-solving')).toBeNull()
  })

  it('LS의 저장 누락과 편집 상태 오류는 남기고 세부 UI 수정은 제외한다', () => {
    const document = readCareerDocument()
    const ls = document.querySelector('[data-career-section="ls-chart"]')!.textContent!
    const source = careers[0].tasks.join(' ')

    for (const fact of ['키패드', '연속 편집', '이동평균선', '체크 상태', '편집값', 'Signal', '추세선', '심볼', '소수점과 음수']) {
      expect(ls).toContain(fact)
      expect(source).toContain(fact)
    }
    expect(ls).not.toMatch(/999|검색어 삭제|6으로 되돌아가던|수치조회창|테마|Double/)
  })

  it('HTML과 PDF를 최상단에 두고 이전 Word 폴더를 제거한다', () => {
    expect(existsSync(resolve(process.cwd(), 'career.html'))).toBe(true)
    expect(existsSync(resolve(process.cwd(), 'career.pdf'))).toBe(true)
    expect(existsSync(resolve(process.cwd(), 'career-document'))).toBe(false)
  })
})
