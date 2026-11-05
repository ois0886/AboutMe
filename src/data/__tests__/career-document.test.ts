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
      items: Array.from(section.querySelectorAll('li'), (item) => item.textContent),
    }))).toEqual(preserved.sections)
  })

  it('대제목 아래 본문은 소제목 없이 같은 단계의 점 목록으로 표시한다', () => {
    const document = readCareerDocument()
    expect(document.querySelectorAll('h1')).toHaveLength(1)
    expect(document.querySelectorAll('h2')).toHaveLength(4)
    expect(document.querySelector('h3, h4, h5, h6, li ul, li ol')).toBeNull()
    expect(document.querySelectorAll('.career-section > ul > li')).toHaveLength(19)
  })

  it('HTML과 PDF를 최상단에 두고 이전 Word 폴더를 제거한다', () => {
    expect(existsSync(resolve(process.cwd(), 'career.html'))).toBe(true)
    expect(existsSync(resolve(process.cwd(), 'career.pdf'))).toBe(true)
    expect(existsSync(resolve(process.cwd(), 'career-document'))).toBe(false)
  })
})
