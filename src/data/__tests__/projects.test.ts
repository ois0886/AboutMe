import { readFileSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import projects from '../projects'

const normalizeText = (text: string) => text.replace(/\s+/g, ' ').trim()

const richTextToText = (item: (typeof projects)[number]['achievements'][number]) =>
  typeof item === 'string'
    ? item
    : item.map((segment) => segment.text).join('')

const preservedResumeSections = JSON.parse(
  readFileSync(resolve(process.cwd(), 'src/test/resume-preserved-sections.json'), 'utf8'),
) as Record<string, { text: string; emphasis: string[]; items: number; links: string[] }>

describe('projects 데이터 무결성', () => {
  it('프로젝트가 1개 이상 존재한다', () => {
    expect(projects.length).toBeGreaterThan(0)
  })

  it('모든 프로젝트에 필수 필드가 존재한다', () => {
    projects.forEach((project) => {
      expect(project.id).toBeTruthy()
      expect(project.title).toBeTruthy()
      expect(project.description).toBeTruthy()
      expect(project.tech.length).toBeGreaterThan(0)
      expect(project.period).toBeTruthy()
      expect(project.team).toBeTruthy()
      expect(project.role).toBeTruthy()
    })
  })

  it('프로젝트 ID가 중복되지 않는다', () => {
    const ids = projects.map((p) => p.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('카드 요약은 기존 표시 항목 수와 성과 수치를 유지한다', () => {
    projects.forEach((project) => {
      expect(project.cardSummary.description).toBeTruthy()
      expect(project.cardSummary.achievements).toHaveLength(Math.min(project.achievements.length, 3))
      project.achievements.slice(0, 3).forEach((item, index) => {
        const numbers = richTextToText(item).match(/\d+(?:\.\d+)?/g) ?? []
        const cardNumbers = richTextToText(project.cardSummary.achievements[index])
          .match(/\d+(?:\.\d+)?/g) ?? []
        expect(cardNumbers, project.id).toEqual(numbers)
      })
    })
  })

  it.each([
    ['naenun-kiosk', '2025.10.10 ~ 2025.11.20', '2025.10 ~ 2025.11'],
    ['mo-re', '2025.08.25 ~ 2025.09.29', '2025.08 ~ 2025.09'],
    ['glim', '2025.07.07 ~ 2025.08.18', '2025.07 ~ 2025.08'],
  ])('%s의 개발 기간은 웹에서 일 단위, 이력서에서 월 단위로 표시한다', (id, period, resumePeriod) => {
    const project = projects.find((item) => item.id === id)!
    expect(project.period).toBe(period)

    const resumeHtml = readFileSync(resolve(process.cwd(), 'resume.html'), 'utf8')
    const resumeDocument = new DOMParser().parseFromString(resumeHtml, 'text/html')
    const resumePeriodElement = resumeDocument.querySelector(
      `[data-project-id="${id}"] .right-meta`,
    )
    expect(normalizeText(resumePeriodElement?.textContent ?? '')).toBe(resumePeriod)
    expect(resumePeriodElement?.querySelector('br')).toBeNull()
  })

  it('주점부리의 웹 개발 기간은 일 단위로 표시한다', () => {
    expect(projects.find((project) => project.id === 'pubburi')?.period)
      .toBe('2025.05.12 ~ 2025.05.28 / 2026.07.01 ~ 2026.07.15')
  })

  it.each(['naenun-kiosk', 'mo-re', 'glim'])(
    '%s의 PDF 포트폴리오 개발 기간은 웹과 동일하다',
    (id) => {
      const project = projects.find((item) => item.id === id)!
      const html = readFileSync(resolve(process.cwd(), 'portfolio.html'), 'utf8')
      const document = new DOMParser().parseFromString(html, 'text/html')
      const title = project.title.split(' - ')[0]
      const heading = Array.from(document.querySelectorAll('h2')).find(
        (element) => element.textContent === title,
      )
      expect(heading?.nextElementSibling?.textContent).toContain(project.period)
    },
  )

  it('PDF 포트폴리오는 주점부리를 제외한 세 프로젝트를 19페이지로 구성한다', () => {
    const html = readFileSync(resolve(process.cwd(), 'portfolio.html'), 'utf8')
    const document = new DOMParser().parseFromString(html, 'text/html')

    expect(document.body.innerHTML).not.toMatch(/주점부리|pubburi/i)
    expect(Array.from(document.querySelectorAll('.toc-name'), (item) => item.textContent))
      .toEqual(['내눈 키오스크', '모리, Mo-Re', 'Glim'])

    const slides = Array.from(document.querySelectorAll('section.slide'))
    expect(slides).toHaveLength(19)
    slides.forEach((slide, index) => {
      const page = String(index + 1).padStart(2, '0')
      expect(slide.id).toBe(`slide-${page}`)
      expect(slide.querySelector('.slide-no')?.textContent).toBe(page)
    })
  })

  it('모든 프로젝트에 스크린샷이 1개 이상 있다', () => {
    projects.forEach((project) => {
      expect(project.screenshots.length).toBeGreaterThan(0)
    })
  })

  it('모든 프로젝트에 상세 설명이 있다', () => {
    projects.forEach((project) => {
      expect(project.details.length).toBeGreaterThan(0)
    })
  })

  it('problemSolvings 내부 구조가 올바르다', () => {
    projects.forEach((project) => {
      project.problemSolvings.forEach((ps) => {
        expect(ps.problem.length).toBeGreaterThan(0)
        expect(ps.solution.length).toBeGreaterThan(0)
        expect(ps.result.length).toBeGreaterThan(0)
        expect(Array.isArray(ps.implementation)).toBe(true)
        ps.implementation.forEach(({ code }) => {
          if (!code) return

          const lines = code.split('\n').filter((line) => line.trim())
          expect(lines.some((line) => /^\S/.test(line)), project.id).toBe(true)
          expect(code, project.id).not.toMatch(/\t/)
        })
        expect(Array.isArray(ps.alternatives)).toBe(true)
      })
    })
  })

  it('주점부리 문제 해결은 2개만 제공한다', () => {
    const pubburi = projects.find((project) => project.id === 'pubburi')

    expect(pubburi).toBeDefined()
    expect(pubburi?.problemSolvings).toHaveLength(2)
  })

  it('Dear My Diary는 멘토를 포함한 팀 구성을 표시하고 비공개 링크를 노출하지 않는다', () => {
    const diary = projects.find((project) => project.id === 'dear-my-diary')!

    expect(diary.role).toContain('Android 팀장')
    expect(diary.team).toBe('학생 20명 (Android 4명, Backend 4명, AI 4명, UI 5명, 기획 3명) / Qualcomm 재직자 멘토 1명, 지도교수 1명')
    expect(diary.period).toBe('2024.07 ~ 2024.08')
    expect(diary.links).toEqual([])
    for (const path of [diary.thumbnail!, ...diary.screenshots]) {
      expect(readFileSync(resolve(process.cwd(), 'public', path)).byteLength).toBeGreaterThan(0)
    }
  })

  it('강조 세그먼트를 사용하는 항목은 텍스트를 유지한다', () => {
    const highlightedItems = projects.flatMap((project) => [
      ...project.details,
      ...project.features,
      ...project.contributions,
      ...project.achievements,
      ...project.retrospective,
      ...project.problemSolvings.flatMap((ps) => ps.result),
    ])

    highlightedItems.forEach((item) => {
      if (typeof item === 'string') return

      expect(item.length).toBeGreaterThan(0)
      item.forEach((segment) => {
        expect(segment.text).toBeTruthy()
      })
    })
  })

  it('이력서는 세 프로젝트를 요약하고 핵심 수치와 기술은 웹에 근거한다', () => {
    const resumeHtml = readFileSync(resolve(process.cwd(), 'resume.html'), 'utf8')
    const resumeDocument = new DOMParser().parseFromString(resumeHtml, 'text/html')

    const resumeProjects = Array.from(resumeDocument.querySelectorAll('[data-project-id]'))
    expect(resumeProjects.map((item) => item.getAttribute('data-project-id')))
      .toEqual(['naenun-kiosk', 'mo-re', 'glim'])

    const projectFacts: Record<string, string[]> = {
      'naenun-kiosk': ['Compose', 'Route', 'Screen', 'Component', 'Activity', 'Listener'],
      'mo-re': ['6개', 'API', '356ms', '156ms', 'Convention Plugin'],
      glim: ['Orbit MVI', 'Channel', 'Navigator', '130', 'MockK'],
    }

    resumeProjects.forEach((item) => {
      const project = projects.find((project) => project.id === item.getAttribute('data-project-id'))!
      const resumeText = normalizeText(item.textContent ?? '')
      const webText = [
        ...project.details, ...project.contributions, ...project.achievements,
        ...project.problemSolvings.flatMap((problem) => [
          ...problem.problem, ...problem.solution, ...problem.result,
          ...problem.implementation.map((block) => block.description),
        ]),
      ].map(richTextToText).join(' ')

      expect(item.querySelector('.project-description')?.textContent).toBeTruthy()
      expect(item.querySelectorAll('ul > li')).toHaveLength(4)
      for (const text of item.querySelectorAll('.project-description, ul > li')) {
        expect(text.textContent).not.toMatch(/(?:습니다|합니다|입니다|됩니다)(?:[.!?]|\s|$)/u)
        expect(text.textContent).not.toMatch(/[.!?]$/u)
      }
      expect(item.querySelector('.project-context')?.textContent).toContain('Android')
      expect(item.querySelector('.project-context')?.textContent).toContain(project.team.match(/\d+명/)![0])
      expect(item.querySelector('.project-context')?.textContent)
        .not.toMatch(/Kotlin|Jetpack Compose|ViewModel|Coroutines|Flow|Hilt|Retrofit|DataStore|JUnit/)
      projectFacts[project.id].forEach((fact) => {
        expect(resumeText, project.id).toContain(fact)
        expect(webText, project.id).toContain(fact)
      })
    })
  })

  it('이력서는 병역사항을 제외하고 상단에 웹 포트폴리오 링크를 제공한다', () => {
    const resumeHtml = readFileSync(resolve(process.cwd(), 'resume.html'), 'utf8')
    const resumeDocument = new DOMParser().parseFromString(resumeHtml, 'text/html')

    expect(resumeDocument.body.textContent).not.toMatch(/병역사항|사회복무요원|금천고등학교/)
    expect(resumeDocument.querySelector('.contact-section a[href="https://ois0886.github.io/AboutMe/"]'))
      .not.toBeNull()
  })

  it('이력서는 첫쪽에 경력과 세 프로젝트를 모으고 둘째 쪽에 나머지 섹션을 배치한다', () => {
    const resumeHtml = readFileSync(resolve(process.cwd(), 'resume.html'), 'utf8')
    const resumeDocument = new DOMParser().parseFromString(resumeHtml, 'text/html')

    const pages = Array.from(resumeDocument.querySelectorAll('[data-resume-page]'))
    expect(pages.map((page) => page.getAttribute('data-resume-page'))).toEqual(['1', '2'])
    expect(pages.map((page) => Array.from(page.querySelectorAll('h2'), (heading) => heading.textContent)))
      .toEqual([
        ['Introduction', 'Career', 'Project'],
        ['Skills', 'Education', 'Blog', 'Awards', 'Certificates', 'Activity'],
      ])
    expect(pages.map((page) => Array.from(page.querySelectorAll('[data-project-id]'), (project) => project.getAttribute('data-project-id'))))
      .toEqual([['naenun-kiosk', 'mo-re', 'glim'], []])
    expect(pages[0].querySelector('[data-career-id="chartlab"]')).not.toBeNull()
    expect(Array.from(pages[1].children)).toEqual(Array.from(pages[1].querySelectorAll('section')))
    expect(resumeDocument.body.textContent).not.toMatch(/Compose-Chart|Compose-Git-Grass|Open Source/)
  })

  it('웹과 정적 문서의 텍스트 소스에는 중앙점을 사용하지 않는다', () => {
    const sourceRoot = resolve(process.cwd(), 'src')
    const sourceFiles = readdirSync(sourceRoot, { recursive: true, encoding: 'utf8' })
      .filter((file) => /\.(?:tsx?|json)$/.test(file))
      .map((file) => resolve(sourceRoot, file))

    for (const file of [...sourceFiles, resolve(process.cwd(), 'resume.html'), resolve(process.cwd(), 'portfolio.html')]) {
      expect(readFileSync(file, 'utf8'), file).not.toMatch(/[\u00b7\u318d\u2027\u30fb]/u)
    }
  })

  it('연락처는 전화번호와 생년월일을 제외하고 블로그 링크를 제공한다', () => {
    const resumeHtml = readFileSync(resolve(process.cwd(), 'resume.html'), 'utf8')
    const resumeDocument = new DOMParser().parseFromString(resumeHtml, 'text/html')
    const contacts = resumeDocument.querySelector('.contact-section')!

    expect(contacts.textContent).not.toMatch(/Phone|Birth|010-5905-9620|1996\.06/)
    expect(contacts.querySelector('a[href^="tel:"]')).toBeNull()
    expect(resumeDocument.querySelector('.contact-section a[href*="superohinsung.tistory.com"]'))
      .not.toBeNull()
    const links = Array.from(contacts.querySelectorAll('a'), (link) => link.getAttribute('href'))
    expect(new Set(links).size).toBe(links.length)
  })

  it.each(Object.entries(preservedResumeSections))(
    '이력서 %s의 기존 문구와 강조, 항목, 링크를 보존한다',
    (heading, expected) => {
      const resumeHtml = readFileSync(resolve(process.cwd(), 'resume.html'), 'utf8')
      const resumeDocument = new DOMParser().parseFromString(resumeHtml, 'text/html')
      const section = Array.from(resumeDocument.querySelectorAll('section'))
        .find((section) => section.querySelector('h2')?.textContent === heading)!

      expect(normalizeText(section.textContent ?? '')).toBe(expected.text)
      expect(Array.from(section.querySelectorAll('strong'), (item) => item.textContent))
        .toEqual(expected.emphasis)
      expect(section.querySelectorAll('li')).toHaveLength(expected.items)
      expect(Array.from(section.querySelectorAll('a'), (item) => item.getAttribute('href')))
        .toEqual(expected.links)
    },
  )

  it('이력서의 이름과 직무를 보존한다', () => {
    const resumeHtml = readFileSync(resolve(process.cwd(), 'resume.html'), 'utf8')
    const resumeDocument = new DOMParser().parseFromString(resumeHtml, 'text/html')

    expect(resumeDocument.querySelector('.resume-header h1')?.textContent).toBe('Oh InSeong(오인성)')
    expect(resumeDocument.querySelector('.resume-header .headline')?.textContent).toBe('Android Developer')
  })
})
