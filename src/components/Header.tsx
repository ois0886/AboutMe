import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import styles from './Header.module.css'

const navItems = [
  { label: 'About', target: 'about' },
  { label: 'Career', target: 'career' },
  { label: 'Skills', target: 'skills' },
  { label: 'Education', target: 'education' },
  { label: 'Awards', target: 'awards' },
  { label: 'Activity', target: 'activity' },
  { label: 'Blog', target: 'blog' },
  { label: 'Projects', target: 'projects' },
  { label: 'Open Source', target: 'opensource' },
  { label: 'Contact', target: 'contact' },
]

function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  const [dark, setDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark'
  })
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('about')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  useEffect(() => {
    if (location.pathname !== '/') return

    const sections = navItems
      .map((item) => document.getElementById(item.target))
      .filter((section): section is HTMLElement => section !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting)
        if (visible) setActiveSection(visible.target.id)
      },
      { rootMargin: '-22% 0px -68% 0px' },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [location.pathname])

  useEffect(() => {
    if (!menuOpen) return

    const previousOverflow = document.body.style.overflow
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleEscape)
    }
  }, [menuOpen])

  const handleClick = (e: React.MouseEvent, target: string) => {
    e.preventDefault()
    setMenuOpen(false)
    setActiveSection(target)
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => {
        document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else {
      document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (location.pathname !== '/') {
      navigate('/')
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a href="#" onClick={handleLogoClick} className={styles.logo}>
          Oh In Seong
        </a>
        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
          aria-expanded={menuOpen}
          aria-controls="portfolio-navigation"
        >
          <span className={`${styles.hamburgerLine} ${menuOpen ? styles.hamburgerOpen : ''}`} />
        </button>
        <nav
          id="portfolio-navigation"
          className={`${styles.navWrapper} ${menuOpen ? styles.navOpen : ''}`}
          aria-label="포트폴리오 섹션"
          onClick={(event) => {
            if (event.target === event.currentTarget) setMenuOpen(false)
          }}
        >
          <ul className={styles.nav}>
            {navItems.map((item) => (
              <li key={item.target}>
                <a
                  href={`#${item.target}`}
                  onClick={(e) => handleClick(e, item.target)}
                  className={`${styles.navLink} ${activeSection === item.target ? styles.navLinkActive : ''}`}
                  aria-current={activeSection === item.target ? 'location' : undefined}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <button
                onClick={() => setDark((d) => !d)}
                className={styles.themeToggle}
                aria-label="테마 전환"
                title={dark ? '라이트 모드로 전환' : '다크 모드로 전환'}
              >
                {dark ? (
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.4 15.3A8.5 8.5 0 0 1 8.7 3.6 8.5 8.5 0 1 0 20.4 15.3Z" />
                  </svg>
                )}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
