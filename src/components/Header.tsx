import { useNavigate, useLocation } from 'react-router-dom'
import styles from './Header.module.css'

const navItems = [
  { label: 'About', target: 'about' },
  { label: 'Career', target: 'career' },
  { label: 'Skills', target: 'skills' },
  { label: 'Projects', target: 'projects' },
  { label: 'Contact', target: 'contact' },
]

function Header() {
  const navigate = useNavigate()
  const location = useLocation()

  const handleClick = (e: React.MouseEvent, target: string) => {
    e.preventDefault()
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
          Portfolio
        </a>
        <nav>
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
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
