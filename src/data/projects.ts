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
]

export default projects
