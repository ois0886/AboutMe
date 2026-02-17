import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import styles from './Hero.module.css'

const typingTexts = [
  'Android Developer',
  'Jetpack Compose',
  'Kotlin Lover',
]

function Hero() {
  const [textIndex, setTextIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const current = typingTexts[textIndex]
    const speed = isDeleting ? 40 : 80

    if (!isDeleting && charIndex === current.length) {
      const timeout = setTimeout(() => setIsDeleting(true), 2000)
      return () => clearTimeout(timeout)
    }

    if (isDeleting && charIndex === 0) {
      setIsDeleting(false)
      setTextIndex((prev) => (prev + 1) % typingTexts.length)
      return
    }

    const timeout = setTimeout(() => {
      setCharIndex((prev) => prev + (isDeleting ? -1 : 1))
    }, speed)

    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, textIndex])

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

  return (
    <section className={styles.hero}>
      <div className={styles.bgOrb1} />
      <div className={styles.bgOrb2} />
      <div className={styles.inner}>
        <p className={styles.greeting}>안녕하세요, 저는</p>
        <h1 className={styles.name}>오인성</h1>
        <p className={styles.role}>
          <span className={styles.typingText}>
            {typingTexts[textIndex].slice(0, charIndex)}
          </span>
          <span className={styles.cursor}>|</span>
        </p>
        <p className={styles.description}>
          사용자 경험을 중심으로 생각하는 안드로이드 개발자입니다.
        </p>
        <div className={styles.cta}>
          <a href="#projects" className={styles.btnPrimary} onClick={(e) => handleClick(e, 'projects')}>
            프로젝트 보기
          </a>
          <a href="#contact" className={styles.btnSecondary} onClick={(e) => handleClick(e, 'contact')}>
            연락하기
          </a>
        </div>
      </div>
      <a href="#about" className={styles.scrollDown} aria-label="아래로 스크롤" onClick={(e) => handleClick(e, 'about')}>
        <span className={styles.scrollIcon} />
      </a>
    </section>
  )
}

export default Hero
