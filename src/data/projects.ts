export interface Project {
  id: string
  title: string
  description: string
  thumbnail: string | null
  tech: string[]
  period: string
  team: string
  role: string
  details: string[]
  features: string[]
  links: { label: string; url: string }[]
  screenshots: string[]
}

const projects: Project[] = [
  {
    id: 'project-1',
    title: 'Project 1',
    description: '프로젝트 설명을 여기에 작성하세요.',
    thumbnail: null,
    tech: ['React', 'TypeScript'],
    period: '2025.00 ~ 2025.00',
    team: '0명',
    role: '역할을 작성하세요',
    details: [
      '프로젝트 상세 설명을 여기에 작성하세요.',
    ],
    features: [
      '주요 기능 1',
      '주요 기능 2',
    ],
    links: [],
    screenshots: [],
  },
  {
    id: 'project-2',
    title: 'Project 2',
    description: '프로젝트 설명을 여기에 작성하세요.',
    thumbnail: null,
    tech: ['React', 'Node.js'],
    period: '2025.00 ~ 2025.00',
    team: '0명',
    role: '역할을 작성하세요',
    details: [
      '프로젝트 상세 설명을 여기에 작성하세요.',
    ],
    features: [
      '주요 기능 1',
      '주요 기능 2',
    ],
    links: [],
    screenshots: [],
  },
  {
    id: 'opensource',
    title: 'Open Source UI Library',
    description: 'Android Jetpack Compose 기반 오픈소스 UI 라이브러리 개발 및 Maven Central 배포',
    thumbnail: null,
    tech: ['Kotlin', 'Jetpack Compose', 'Maven Central'],
    period: '',
    team: '개인',
    role: '기획 및 개발 전담',
    details: [
      'Jetpack Compose 기반 재사용 가능한 UI 컴포넌트 라이브러리 개발',
      'Maven Central에 배포하여 누구나 의존성 추가로 사용 가능하도록 공개',
    ],
    features: [
      '커스텀 UI 컴포넌트 제공',
      'Maven Central 배포',
    ],
    links: [],
    screenshots: [],
  },
]

export default projects
