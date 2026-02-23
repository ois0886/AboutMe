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

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  const handleClick = (e: React.MouseEvent, target: string) => {
    e.preventDefault()
    setMenuOpen(false)
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
          aria-label="메뉴 열기"
        >
          <span className={`${styles.hamburgerLine} ${menuOpen ? styles.hamburgerOpen : ''}`} />
        </button>
        <nav className={`${styles.navWrapper} ${menuOpen ? styles.navOpen : ''}`}>
          <ul className={styles.nav}>
            {navItems.map((item) => (
              <li key={item.target}>
                <a
                  href={`#${item.target}`}
                  onClick={(e) => handleClick(e, item.target)}
                  className={styles.navLink}
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
              >
                {dark ? '\u2600\uFE0F' : '\uD83C\uDF19'}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
