import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const preserved = JSON.parse(
  readFileSync(resolve(process.cwd(), 'src/test/career-preserved-sections.json'), 'utf8'),
) as {
  header: string[]
  sections: Array<{ title: string; role: string; items: string[] }>
}

function readCareerDocument() {
  return new DOMParser().parseFromString(
    readFileSync(resolve(process.cwd(), 'career.html'), 'utf8'),
    'text/html',
  )
}

describe('경력기술서', () => {
  it('기존 회사 정보와 기간, 역할 및 본문을 보존한다', () => {
    const document = readCareerDocument()
    expect(Array.from(document.querySelectorAll('[data-source-header]'), (item) => item.textContent))
      .toEqual(preserved.header)
    const sections = Array.from(document.querySelectorAll('.career-section'))
    expect(sections.map((section) => ({
      title: section.querySelector('h2')?.textContent,
      role: section.querySelector('.role')?.textContent,
      items: Array.from(section.querySelectorAll('li')).flatMap((item) =>
        item.matches('.problem-solving')
          ? Array.from(item.querySelectorAll('[data-preserved-item]'), (paragraph) => paragraph.textContent)
          : [item.textContent],
      ),
    }))).toEqual(preserved.sections)
  })

  it('대제목 아래 본문은 소제목 없이 같은 단계의 점 목록으로 표시한다', () => {
    const document = readCareerDocument()
    expect(document.querySelectorAll('h1')).toHaveLength(1)
    expect(document.querySelectorAll('h2')).toHaveLength(4)
    expect(document.querySelector('h3, h4, h5, h6, li ul, li ol')).toBeNull()
    expect(document.querySelectorAll('.career-section > ul > li')).toHaveLength(17)
  })

  it('LS증권 키패드 오류의 문제와 해결, 결과는 한 목록 항목으로 묶는다', () => {
    const document = readCareerDocument()
    const group = document.querySelector('.career-section:first-of-type > ul > li.problem-solving')!
    expect(document.querySelectorAll('.problem-solving')).toHaveLength(1)
    expect(Array.from(group.querySelectorAll('p'), (paragraph) => paragraph.textContent))
      .toEqual(preserved.sections[0].items.slice(0, 3))
    expect(Array.from(group.querySelectorAll('strong'), (label) => label.textContent))
      .toEqual(['문제:', '해결:', '결과:'])
    expect(group.nextElementSibling?.textContent).toBe(preserved.sections[0].items[3])
  })

  it('HTML과 PDF를 최상단에 두고 이전 Word 폴더를 제거한다', () => {
    expect(existsSync(resolve(process.cwd(), 'career.html'))).toBe(true)
    expect(existsSync(resolve(process.cwd(), 'career.pdf'))).toBe(true)
    expect(existsSync(resolve(process.cwd(), 'career-document'))).toBe(false)
  })
})
