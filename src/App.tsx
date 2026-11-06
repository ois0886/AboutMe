import { useEffect, useLayoutEffect, useRef } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import Header from './components/Header'
import About from './components/About'
import Skills from './components/Skills'
import Career from './components/Career'
import Education from './components/Education'
import Awards from './components/Awards'
import Activity from './components/Activity'
import Blog from './components/Blog'
import Projects from './components/Projects'
import OpenSource from './components/OpenSource'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ProjectDetail from './pages/ProjectDetail'
import { isSectionId, scrollToSection } from './utils/sectionNavigation'

function Section({ alt, children }: { alt?: boolean; children: React.ReactNode }) {
  if (!alt) return <>{children}</>
  return (
    <div className="sectionAlt">
      {children}
    </div>
  )
}

function Home() {
  return (
    <>
      <main id="main-content" tabIndex={-1}>
        <About />
        <Section alt><Career /></Section>
        <Projects />
        <Section alt><OpenSource /></Section>
        <Skills />
        <Section alt><Education /></Section>
        <Awards />
        <Section alt><Activity /></Section>
        <Blog />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

function ScrollToTop() {
  const location = useLocation()
  const navigate = useNavigate()
  const consumedIntent = useRef<string | null>(null)
  const clearedIntent = useRef<string | null>(null)

  useEffect(() => {
    if (location.pathname !== '/' || clearedIntent.current === location.key) return
    const state = location.state as { sectionTarget?: unknown } | null
    if (!isSectionId(state?.sectionTarget) && !isSectionId(location.hash.slice(1))) return

    clearedIntent.current = location.key
    const nextState = state ? { ...state } : null
    if (nextState) delete nextState.sectionTarget
    navigate({ pathname: '/', search: location.search, hash: '' }, { replace: true, state: nextState })
  }, [location, navigate])

  useLayoutEffect(() => {
    const scrollWithoutAnimation = (scroll: () => void) => {
      const root = document.documentElement
      const previousScrollBehavior = root.style.scrollBehavior
      let restoreFrame = 0

      const cleanup = () => {
        root.style.scrollBehavior = previousScrollBehavior
        root.classList.remove('no-transition')
      }

      root.classList.add('no-transition')
      root.style.scrollBehavior = 'auto'
      scroll()

      const scrollFrame = requestAnimationFrame(() => {
        scroll()
        restoreFrame = requestAnimationFrame(cleanup)
      })

      return () => {
        cancelAnimationFrame(scrollFrame)
        cancelAnimationFrame(restoreFrame)
        cleanup()
      }
    }

    const isProjectDetail = location.pathname.startsWith('/projects/')
    if ('scrollRestoration' in window.history) {
      // The browser can otherwise restore an old detail scroll position after the section jump.
      window.history.scrollRestoration = isProjectDetail ? 'manual' : 'auto'
    }

    if (isProjectDetail) {
      const section = document.getElementById(location.hash.slice(1))
      if (section?.matches('#main-content section[id^="project-"]')) {
        section.focus({ preventScroll: true })
        return scrollWithoutAnimation(() => section.scrollIntoView?.({ behavior: 'instant', block: 'start' }))
      }

      document.getElementById('main-content')?.focus({ preventScroll: true })
      return scrollWithoutAnimation(() => window.scrollTo(0, 0))
    }

    if (location.pathname === '/') {
      const state = location.state as { sectionTarget?: unknown } | null
      const hashTarget = location.hash.slice(1)
      const target = isSectionId(state?.sectionTarget)
        ? state.sectionTarget
        : isSectionId(hashTarget) ? hashTarget : null

      if (target) {
        if (consumedIntent.current === location.key) return
        consumedIntent.current = location.key
        sessionStorage.removeItem('scrollY')
        document.querySelectorAll('.reveal').forEach((element) => element.classList.add('revealed'))
        scrollToSection(target)
        return
      }

      const saved = sessionStorage.getItem('scrollY')
      if (saved) {
        sessionStorage.removeItem('scrollY')
        document.querySelectorAll('.reveal').forEach((el) => el.classList.add('revealed'))
        const top = Number(saved)
        return scrollWithoutAnimation(() => window.scrollTo(0, Number.isFinite(top) && top >= 0 ? top : 0))
      }
    }
  }, [location])
  return null
}

function App() {
  return (
    <>
      <Header />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
      </Routes>
    </>
  )
}

export default App
