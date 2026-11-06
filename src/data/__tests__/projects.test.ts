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
    ['naenun-kiosk', '2025.10.10 ~ 2025.11.20'],
    ['mo-re', '2025.08.25 ~ 2025.09.29'],
    ['glim', '2025.07.07 ~ 2025.08.18'],
  ])('%s의 개발 기간은 웹에서 일 단위로 표시한다', (id, period) => {
    const project = projects.find((item) => item.id === id)!
    expect(project.period).toBe(period)
  })

  it('주점부리는 현재 조직 기준의 기본 정보, 개요와 GitHub 링크를 보관한다', () => {
    const project = projects.find((item) => item.id === 'pubburi')!

    expect(project.period).toBe('2026.10.31 ~ 진행 중')
    expect(project.team).toBeUndefined()
    expect(project.thumbnail).toBe('screenshot/pubburi-logo.webp')
    expect(project.details).toHaveLength(2)
    expect(project.links).toEqual([{ label: 'GitHub', url: 'https://github.com/Pubburi' }])
    for (const items of [project.cardSummary.achievements, project.features, project.contributions,
      project.problemSolvings, project.insights, project.achievements, project.retrospective,
      project.screenshots]) {
      expect(items).toEqual([])
    }
  })

  it('한길졸업은 기본 정보와 소개 두 문장만 보관한다', () => {
    const project = projects.find((item) => item.id === 'hangil')!
    expect(project.period).toBe('2026.10.26 ~ 진행 중')
    expect(projects[0].id).toBe('hangil')
    expect(project.team).toBe('1명 (개인 프로젝트)')
    expect(project.role).toBe('Android 앱 설계, 구현 및 검증')
    expect(project.thumbnail).toBe('screenshot/hangil-guide.svg')
    expect(project.details).toEqual([
      '초보 운전자가 목표와 시연 코스를 준비하고 주차 화면에서 연습을 시작하거나 종료할 수 있도록 개발했습니다.',
      '현대자동차그룹 차량용 앱 개발 공모전 출품 준비를 위한 1인 개인 프로젝트로, Kotlin과 Compose로 차량 상태, 지도, 연습 기록을 연결하고 Pleos 환경에서 화면 동작을 검증했습니다.',
    ])
    for (const items of [project.cardSummary.achievements, project.features, project.contributions,
      project.problemSolvings, project.insights, project.achievements, project.retrospective,
      project.links, project.screenshots]) {
      expect(items).toEqual([])
    }
    expect(project.insightImages).toBeUndefined()
    expect(project.screenshotDescriptions).toBeUndefined()
    expect(project.imageSectionTitle).toBeUndefined()
  })

  it('한길졸업과 주점부리를 제외한 프로젝트에는 스크린샷이 있다', () => {
    projects.filter((project) => !['hangil', 'pubburi'].includes(project.id)).forEach((project) => {
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
        ps.implementation.forEach((block) => {
          expect(block.description.trim(), project.id).toBeTruthy()
          expect(block).not.toHaveProperty('code')
          expect(block).not.toHaveProperty('language')
        })
        expect(Array.isArray(ps.alternatives)).toBe(true)
      })
    })
  })

  it('19개 문제 해결에 실제 PNG 이미지와 대체 텍스트를 제공한다', () => {
    const visuals = projects.flatMap((project) => project.problemSolvings.map((ps) => ps.visual))

    expect(visuals).toHaveLength(19)
    expect(new Set(visuals.map((visual) => visual.src)).size).toBe(19)
    visuals.forEach((visual) => {
      expect(visual.alt.trim(), visual.src).toBeTruthy()
      expect(visual.src).toMatch(/^screenshot\/.+\.png$/)
      expect(readFileSync(resolve(process.cwd(), 'public', visual.src)).subarray(0, 8))
        .toEqual(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))
    })
  })

  it.each([
    ['naenun-kiosk', ['naenun-state-hoisting-visual.png', 'naenun-package-refactor-visual.png', 'naenun-memory-leak-visual.png']],
    ['mo-re', ['more-parallel-api-visual.png', 'more-build-logic-visual.png']],
    ['glim', ['glim-auth-flow-visual.png', 'glim-mvi-test-visual.png', 'glim-navigator-channel-visual.png']],
  ])('%s는 기존 생성형 이미지를 해당 문제 해결에 재사용한다', (id, filenames) => {
    const project = projects.find((item) => item.id === id)!
    expect(project.problemSolvings.map((ps) => ps.visual.src))
      .toEqual((filenames as string[]).map((filename) => `screenshot/${filename}`))
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

  it('이력서는 프로젝트 섹션과 개별 프로젝트 소개를 제외한다', () => {
    const resumeHtml = readFileSync(resolve(process.cwd(), 'resume.html'), 'utf8')
    const resumeDocument = new DOMParser().parseFromString(resumeHtml, 'text/html')

    expect(resumeDocument.querySelector('.project-section, [data-project-id]')).toBeNull()
    expect(resumeDocument.body.textContent).not.toMatch(/한길졸업|내눈 키오스크|모리, Mo-Re|Glim/)
    expect(resumeDocument.querySelector('a[href*="HanGilLab/Android"], a[href$="/Glim"]')).toBeNull()
  })

  it('이력서는 병역사항을 제외하고 상단에 웹 포트폴리오 링크를 제공한다', () => {
    const resumeHtml = readFileSync(resolve(process.cwd(), 'resume.html'), 'utf8')
    const resumeDocument = new DOMParser().parseFromString(resumeHtml, 'text/html')

    expect(resumeDocument.body.textContent).not.toMatch(/병역사항|사회복무요원|금천고등학교/)
    expect(resumeDocument.querySelector('.contact-section a[href="https://ois0886.github.io/AboutMe/"]'))
      .not.toBeNull()
  })

  it('이력서는 자기소개와 프로젝트를 제외하고 경력부터 연속해서 배치한다', () => {
    const resumeHtml = readFileSync(resolve(process.cwd(), 'resume.html'), 'utf8')
    const resumeDocument = new DOMParser().parseFromString(resumeHtml, 'text/html')

    const pages = Array.from(resumeDocument.querySelectorAll('[data-resume-page]'))
    expect(pages.map((page) => page.getAttribute('data-resume-page'))).toEqual(['1'])
    expect(pages.map((page) => Array.from(page.querySelectorAll('h2'), (heading) => heading.textContent)))
      .toEqual([
        ['Career', 'Skills', 'Education', 'Awards', 'Certificates', 'Activity'],
      ])
    expect(pages[0].querySelector('[data-career-id="chartlab"]')).not.toBeNull()
    expect(resumeDocument.body.textContent).not.toMatch(/Introduction|개발자를 지향합니다|재현 가능한 지식|Compose-Chart|Compose-Git-Grass|Open Source/)
  })

  it('이력서의 SSAFY 교육은 프로그램 소개만 표시한다', () => {
    const resumeHtml = readFileSync(resolve(process.cwd(), 'resume.html'), 'utf8')
    const resumeDocument = new DOMParser().parseFromString(resumeHtml, 'text/html')
    const education = Array.from(resumeDocument.querySelectorAll('.education-item'))
      .find((item) => item.querySelector('h3')?.textContent?.includes('삼성 청년 AI SW 아카데미'))!

    expect(education.querySelector('.right-meta')?.textContent).toBe('2025.01 ~ 2025.12')
    expect(Array.from(education.querySelectorAll('li'), (item) => item.textContent))
      .toEqual(['삼성전자 주관 1년 과정 소프트웨어 개발자 양성 교육 프로그램'])
  })

  it('웹과 정적 문서의 텍스트 소스에는 중앙점을 사용하지 않는다', () => {
    const sourceRoot = resolve(process.cwd(), 'src')
    const sourceFiles = readdirSync(sourceRoot, { recursive: true, encoding: 'utf8' })
      .filter((file) => /\.(?:tsx?|json)$/.test(file))
      .map((file) => resolve(sourceRoot, file))

    for (const file of [...sourceFiles, resolve(process.cwd(), 'resume.html'), resolve(process.cwd(), 'career.html')]) {
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
    expect(resumeDocument.querySelector('.blog-section')).toBeNull()
    expect(Array.from(resumeDocument.querySelectorAll('h2'), (heading) => heading.textContent))
      .not.toContain('Blog')
    expect(resumeDocument.querySelectorAll('a[href*="superohinsung.tistory.com"]')).toHaveLength(1)
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

  it('이력서의 이름을 보존하고 직무를 Software Engineer로 표시한다', () => {
    const resumeHtml = readFileSync(resolve(process.cwd(), 'resume.html'), 'utf8')
    const resumeDocument = new DOMParser().parseFromString(resumeHtml, 'text/html')

    expect(resumeDocument.querySelector('.resume-header h1')?.textContent).toBe('Oh InSeong(오인성)')
    expect(resumeDocument.querySelector('.resume-header .headline')?.textContent).toBe('Software Engineer')
  })
})
