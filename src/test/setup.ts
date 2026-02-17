import '@testing-library/jest-dom/vitest'

// jsdom에 IntersectionObserver가 없으므로 모킹
class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
globalThis.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver
