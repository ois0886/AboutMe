import { useScrollReveal } from '../hooks/useScrollReveal'
import styles from './Education.module.css'

const educations = [
  {
    title: '삼성 청년 AI·SW 아카데미 13기',
    subtitle: 'Mobile Track',
    period: '2025.01 ~ 2025.12',
    details: [
      '삼성전자 주관 1년 과정 소프트웨어 개발자 양성 교육 프로그램',
      'Mobile Track 전공 심화 과정: Android 네이티브 앱 개발 전문화',
      '전현직 개발자 멘토링 및 프로젝트 프로세스 경험',
    ],
    gpa: '',
    courses: [] as { name: string; grade: string }[],
  },
  {
    title: '주식회사 코드프레소 웹 개발 기초완성',
    subtitle: '',
    period: '2023.10 ~ 2023.11',
    details: [
      'Java, SQL, Spring Boot, Git 등 기초적인 백엔드 비대면 교육 프로그램 이수',
    ],
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
