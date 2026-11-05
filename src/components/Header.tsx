import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import useSectionNavigation from '../hooks/useSectionNavigation'
import { portfolioSections, type SectionId } from '../utils/sectionNavigation'
import styles from './Header.module.css'

const principalSections = portfolioSections.filter((section) =>
  ['career', 'projects', 'opensource', 'contact'].includes(section.target),
)

function Header() {
  const location = useLocation()
  const navigateToSection = useSectionNavigation()
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark')
  const [menuLocationKey, setMenuLocationKey] = useState<string | null>(null)
  const [activeSection, setActiveSection] = useState<SectionId>('about')
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const returnFocusOnClose = useRef(true)
  const menuOpen = menuLocationKey === location.key
  const currentSection = location.pathname.startsWith('/projects/') ? 'projects' : activeSection

  if (menuLocationKey !== null && menuLocationKey !== location.key) {
    setMenuLocationKey(null)
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  useEffect(() => {
    if (location.pathname !== '/') return

    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((first, second) => first.boundingClientRect.top - second.boundingClientRect.top)[0]

      const target = portfolioSections.find((section) => section.target === visible?.target.id)
      if (target) setActiveSection(target.target)
    }, { rootMargin: '-18% 0px -65% 0px' })

    portfolioSections.forEach((section) => {
      const element = document.getElementById(section.target)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [location.pathname])

  useEffect(() => {
    if (!menuOpen) return

    const menu = menuRef.current
    const trigger = menuButtonRef.current
    const previousOverflow = document.body.style.overflow
    const getFocusable = () => Array.from(menu?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex="0"]',
    ) ?? [])

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setMenuLocationKey(null)
      }

      if (event.key !== 'Tab') return
      const focusable = getFocusable()
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const activeElement = document.activeElement

      if (event.shiftKey && (activeElement === first || !menu?.contains(activeElement))) {
        event.preventDefault()
        last?.focus()
      } else if (!event.shiftKey && (activeElement === last || !menu?.contains(activeElement))) {
        event.preventDefault()
        first?.focus()
      }
    }

    const handleOutsideClick = (event: PointerEvent) => {
      if (event.target instanceof Node && !menu?.contains(event.target) && !trigger?.contains(event.target)) {
        setMenuLocationKey(null)
      }
    }

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeydown)
    document.addEventListener('pointerdown', handleOutsideClick)
    getFocusable()[0]?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeydown)
      document.removeEventListener('pointerdown', handleOutsideClick)
      if (returnFocusOnClose.current && trigger?.isConnected) trigger.focus()
    }
  }, [menuOpen])

  const handleSectionClick = (event: React.MouseEvent<HTMLAnchorElement>, target: SectionId) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    returnFocusOnClose.current = false
    setMenuLocationKey(null)
    setActiveSection(target)
    navigateToSection(target)
  }

  const sectionLink = (item: typeof portfolioSections[number], menu = false) => (
    <Link
      to={{ pathname: '/', hash: `#${item.target}` }}
      onClick={(event) => handleSectionClick(event, item.target)}
      className={menu ? styles.menuLink : styles.navLink}
      aria-current={currentSection === item.target ? 'location' : undefined}
    >
      {menu && <span className={styles.menuNumber} aria-hidden="true">{String(portfolioSections.indexOf(item) + 1).padStart(2, '0')}</span>}
      <span>{item.label}</span>
      {menu && <span className={styles.menuArrow} aria-hidden="true">↗</span>}
    </Link>
  )

  return (
    <header className={styles.header}>
      <a
        href="#main-content"
        className={styles.skipLink}
        onClick={(event) => {
          event.preventDefault()
          const main = document.getElementById('main-content')
          main?.focus({ preventScroll: true })
          main?.scrollIntoView({ behavior: 'instant', block: 'start' })
        }}
      >본문 바로가기</a>
      <div className={styles.inner}>
        <Link to="/" onClick={(event) => handleSectionClick(event, 'about')} className={styles.logo}>
          Oh In Seong<span className={styles.logoMark} aria-hidden="true" />
        </Link>
        <nav className={styles.principalNav} aria-label="주요 섹션">
          <ul>{principalSections.map((item) => <li key={item.target}>{sectionLink(item)}</li>)}</ul>
        </nav>
        <div className={styles.actions}>
          <button
            ref={menuButtonRef}
            className={styles.menuToggle}
            onClick={() => {
              returnFocusOnClose.current = true
              setMenuLocationKey(menuOpen ? null : location.key)
            }}
            aria-expanded={menuOpen}
            aria-controls="portfolio-menu"
            aria-haspopup="dialog"
          >
            <span className={styles.menuIcon} aria-hidden="true"><span /><span /></span>
            <span>전체 목차</span>
          </button>
          <button
            onClick={() => setDark((value) => !value)}
            className={styles.themeToggle}
            aria-label="테마 전환"
            aria-pressed={dark}
            title={dark ? '라이트 모드로 전환' : '다크 모드로 전환'}
          >
            {dark ? (
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.4 15.3A8.5 8.5 0 0 1 8.7 3.6 8.5 8.5 0 1 0 20.4 15.3Z" /></svg>
            )}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className={styles.menuBackdrop}>
          <div ref={menuRef} id="portfolio-menu" role="dialog" aria-modal="true" aria-labelledby="portfolio-menu-title" className={styles.menuPanel}>
            <div className={styles.menuHeading}>
              <h2 id="portfolio-menu-title">전체 목차</h2>
              <button className={styles.closeButton} onClick={() => setMenuLocationKey(null)} aria-label="목차 닫기">×</button>
            </div>
            <nav aria-label="포트폴리오 전체 섹션">
              <ul className={styles.menuList}>
                {portfolioSections.map((item) => <li key={item.target}>{sectionLink(item, true)}</li>)}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
