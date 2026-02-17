import projects from '../projects'

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
        expect(Array.isArray(ps.alternatives)).toBe(true)
      })
    })
  })
})
