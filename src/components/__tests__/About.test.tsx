import { render, screen, within } from '@testing-library/react'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import About from '../About'

describe('About', () => {
  it('Introduction은 이력서의 문구와 항목 순서, 강조를 그대로 표시한다', () => {
    const resumeHtml = readFileSync(resolve(process.cwd(), 'resume.html'), 'utf8')
    const resumeDocument = new DOMParser().parseFromString(resumeHtml, 'text/html')
    const resumeSection = Array.from(resumeDocument.querySelectorAll('section'))
      .find((section) => section.querySelector('h2')?.textContent === 'Introduction')!
    const resumeItems = Array.from(resumeSection.querySelectorAll('li'))

    render(<About />)

    const introduction = screen.getByRole('heading', { name: 'Introduction' }).parentElement!
    const webItems = within(introduction).getAllByRole('listitem')

    expect(resumeItems.length).toBeGreaterThan(0)
    expect(webItems.map((item) => item.textContent))
      .toEqual(resumeItems.map((item) => item.textContent))
    webItems.forEach((item, index) => {
      expect(Array.from(item.querySelectorAll('strong'), (emphasis) => emphasis.textContent))
        .toEqual(Array.from(resumeItems[index].querySelectorAll('strong'), (emphasis) => emphasis.textContent))
    })
  })
})
