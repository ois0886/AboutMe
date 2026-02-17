import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Hero from './components/Hero'
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

function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Career />
        <Skills />
        <Education />
        <Awards />
        <Activity />
        <Blog />
        <Projects />
        <OpenSource />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects/:id" element={<ProjectDetail />} />
    </Routes>
  )
}

export default App
