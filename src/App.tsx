import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Career from './components/Career'
import Education from './components/Education'
import Awards from './components/Awards'
import Blog from './components/Blog'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
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
        <Blog />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
