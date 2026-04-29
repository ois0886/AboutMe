import { useLayoutEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
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
import WaveDivider from './components/WaveDivider'
import ProjectDetail from './pages/ProjectDetail'

function Section({ alt, children }: { alt?: boolean; children: React.ReactNode }) {
  if (!alt) return <>{children}</>
  return (
    <div className="sectionAlt">
      <WaveDivider fill="var(--color-bg)" />
      {children}
      <WaveDivider flip fill="var(--color-bg)" />
    </div>
  )
}

function Home() {
  return (
    <>
      <Header />
      <main>
<About />
        <Section alt><Career /></Section>
        <Skills />
        <Section alt><Education /></Section>
        <Awards />
        <Section alt><Activity /></Section>
        <Blog />
        <Section alt><Projects /></Section>
        <OpenSource />
        <Section alt><Contact /></Section>
      </main>
      <Footer />
    </>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useLayoutEffect(() => {
    const scrollWithoutAnimation = (top: number) => {
      const root = document.documentElement
      const previousScrollBehavior = root.style.scrollBehavior

      root.classList.add('no-transition')
      root.style.scrollBehavior = 'auto'
      window.scrollTo(0, top)

      requestAnimationFrame(() => {
        window.scrollTo(0, top)
        requestAnimationFrame(() => {
          root.style.scrollBehavior = previousScrollBehavior
          root.classList.remove('no-transition')
        })
      })
    }

    if (pathname.startsWith('/projects/')) {
      scrollWithoutAnimation(0)
    } else if (pathname === '/') {
      const saved = sessionStorage.getItem('scrollY')
      if (saved) {
        sessionStorage.removeItem('scrollY')
        document.querySelectorAll('.reveal').forEach((el) => el.classList.add('revealed'))
        scrollWithoutAnimation(Number(saved))
      }
    }
  }, [pathname])
  return null
}

function App() {
  return (
    <>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects/:id" element={<ProjectDetail />} />
    </Routes>
    </>
  )
}

export default App
