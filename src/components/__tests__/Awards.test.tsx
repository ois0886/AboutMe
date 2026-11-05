import { render, screen } from '@testing-library/react'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import Awards from '../Awards'

describe('Awards', () => {
  it('이력서의 Claude Code in Action 수료 정보는 웹과 일치한다', () => {
    render(<Awards />)
    const card = screen.getByRole('heading', { name: 'Claude Code in Action' }).parentElement!.parentElement!
    const resumeDocument = new DOMParser().parseFromString(
      readFileSync(resolve(process.cwd(), 'resume.html'), 'utf8'),
      'text/html',
    )
    const certificate = Array.from(resumeDocument.querySelectorAll('.row-title'))
      .find((row) => row.textContent?.includes('Claude Code in Action'))!

    expect(card).toHaveTextContent('Anthropic')
    expect(card).toHaveTextContent('po6dwyvk5zs7')
    expect(card).toHaveTextContent('2026.04.23')
    expect(certificate.querySelector('.one-line')?.textContent)
      .toBe('Claude Code in Action | Anthropic | po6dwyvk5zs7')
    expect(certificate.querySelector('.right-meta')?.textContent).toBe('2026.04')
  })

  it('자격증 목록 아래에 Language test 제목만 표시한다', () => {
    render(<Awards />)

    const headings = screen.getAllByRole('heading', { level: 3 })
    const languageTest = screen.getByRole('heading', { level: 3, name: 'Language test' })

    expect(screen.getByRole('heading', { level: 3, name: 'Certificates' })).toBeInTheDocument()
    expect(headings[headings.length - 1]).toBe(languageTest)
    expect(languageTest.nextElementSibling).toBeNull()
  })
})
