import { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import styles from './Education.module.css'

const educations = [
  {
    title: '삼성 청년 AI·SW 아카데미 13기',
    subtitle: 'Mobile Track',
    period: '2025.01.20 ~ 2025.12.11',
    details: [
      '삼성전자 주관 1년 과정 소프트웨어 개발자 양성 교육 프로그램',
      '1학기 학습 과정에서 Java, SpringBoot, Vue.js, Html, CSS, Javascript, Flutter, Kotlin, Android 강의 수강 및 학습',
      '2학기 프로젝트 과정에서 팀 프로젝트 기반 서비스 기획·개발·발표 경험',
      '전현직 개발자 멘토링 및 프로젝트 프로세스 경험',
      'CS·Android 스터디 주최 및 운영 (2025.02 ~ 2025.06)',
    ],
    links: [
      { label: 'GitHub', url: 'https://github.com/Kotlin-Android-Study-with-SSAFY' },
      { label: 'DeadLock(교착상태)', url: 'https://superohinsung.tistory.com/73' },
      { label: 'Jetpack Compose Recomposition', url: 'https://superohinsung.tistory.com/380' },
      { label: '인텐트 및 인텐트 필터', url: 'https://superohinsung.tistory.com/100' },
      { label: '고정 소수점 vs 부동 소수점', url: 'https://superohinsung.tistory.com/378' },
      { label: 'Gson vs Moshi vs kotlinx.serialization', url: 'https://superohinsung.tistory.com/399' },
    ],
    gpa: '',
    courses: [] as { name: string; grade: string }[],
  },
  {
    title: '주식회사 코드프레소 웹 개발 기초완성',
    subtitle: '',
    period: '2023.10 ~ 2023.11',
    certificateImage: 'screenshot/codepresso-certificate.png',
    details: [
      'Java, SQL, Spring Boot, Git 등 웹 개발 기초 비대면 교육 프로그램 이수',
    ],
    links: [],
    gpa: '',
    courses: [] as { name: string; grade: string }[],
  },
  {
    title: '한성대학교 컴퓨터공학과 졸업',
    subtitle: '',
    period: '2018.03 ~ 2024.02',
    details: [
      '모바일소프트웨어 트랙 / 빅데이터 트랙',
    ],
    links: [],
    gpa: '3.18 / 4.5',
    courses: [
      { name: '데이터 마이닝', grade: 'A+' },
      { name: '자료구조', grade: 'A' },
      { name: '알고리즘', grade: 'A' },
      { name: '설계패턴', grade: 'A' },
      { name: '웹프로그래밍 기초', grade: 'A' },
      { name: '데이터통신', grade: 'A' },
      { name: '컴퓨터 프로그래밍', grade: 'A' },
      { name: '객체지향언어2', grade: 'B+' },
      { name: '빅데이터 기초', grade: 'B+' },
      { name: '소프트웨어공학', grade: 'B+' },
    ],
  },
]

function Education() {
  const ref = useScrollReveal<HTMLElement>()
  const [openCertificate, setOpenCertificate] = useState<string | null>(null)

  return (
    <section id="education" className="section reveal" ref={ref}>
      <h2 className="section__title">Education</h2>
      <div className={styles.timeline}>
        {educations.map((edu) => (
          <div key={edu.title} className={styles.card}>
            <div className={styles.header}>
              <div>
                <h3 className={styles.title}>
                  {edu.title}
                  {edu.subtitle && <span className={styles.subtitle}> {edu.subtitle}</span>}
                </h3>
                <p className={styles.period}>{edu.period}</p>
              </div>
            </div>
            <ul className={styles.details}>
              {edu.details.map((detail) => (
                <li key={detail} className={styles.detail}>{detail}</li>
              ))}
            </ul>
            {edu.certificateImage && (
              <div className={styles.toggleArea}>
                <button
                  className={styles.imageToggle}
                  onClick={() => setOpenCertificate((current) => current === edu.title ? null : edu.title)}
                  aria-expanded={openCertificate === edu.title}
                >
                  {openCertificate === edu.title ? '수료증 접기' : '수료증 보기'}
                  <span
                    className={`${styles.arrow} ${openCertificate === edu.title ? styles.arrowUp : ''}`}
                    aria-hidden="true"
                  />
                </button>
                {openCertificate === edu.title && (
                  <div className={styles.imageWrap}>
                    <img
                      src={edu.certificateImage}
                      alt={`${edu.title} 수료증`}
                      className={styles.image}
                    />
                  </div>
                )}
              </div>
            )}
            {edu.links.length > 0 && (
              <div className={styles.links}>
                {edu.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
            {edu.gpa && (
              <div className={styles.gpa}>
                <span className={styles.gpaLabel}>GPA</span>
                <span className={styles.gpaValue}>{edu.gpa}</span>
              </div>
            )}
            {edu.courses.length > 0 && (
              <div className={styles.courses}>
                {edu.courses.map((course) => (
                  <div key={course.name} className={styles.courseItem}>
                    <span className={styles.courseName}>{course.name}</span>
                    <span className={`${styles.courseGrade} ${course.grade === 'A+' ? styles.gradeAPlus : course.grade === 'A' ? styles.gradeA : styles.gradeBPlus}`}>
                      {course.grade}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default Education
