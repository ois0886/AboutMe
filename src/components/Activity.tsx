import { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import styles from './Activity.module.css'

const activities = [
  {
    title: 'SSAFY 13기 CS, Android 스터디 주최 및 운영',
    scope: '교외',
    tag: '스터디',
    period: '2025.02 ~ 2025.06',
    image: null,
    details: [
      'SSAFY 내에서 CS, Android 스터디를 주최하고 운영',
    ],
    links: [
      { label: 'GitHub', url: 'https://github.com/Kotlin-Android-Study-with-SSAFY' },
      { label: 'DeadLock(교착상태)', url: 'https://superohinsung.tistory.com/73' },
      { label: 'Jetpack Compose Recomposition', url: 'https://superohinsung.tistory.com/380' },
      { label: '인텐트 및 인텐트 필터', url: 'https://superohinsung.tistory.com/100' },
      { label: '고정 소수점 vs 부동 소수점', url: 'https://superohinsung.tistory.com/378' },
      { label: 'Gson vs Moshi vs kotlinx.serialization', url: 'https://superohinsung.tistory.com/399' },
    ],
  },
  {
    title: '한성대학교 LBT 지식 나눔 프로젝트 — "알고리즘을 공부하는 방법" 발표',
    scope: '교내',
    tag: '발표',
    period: '2023.07',
    image: 'screenshot/lbt.png',
    details: [
      '재학생이 일일 강사가 되어 온오프라인으로 자신이 선정한 주제로 90분간 강의하는 프로그램',
      '후배들이 알고리즘 공부를 시작하는 데 어려움을 겪고 있다는 니즈를 파악하여 도전',
      '"내가 어떤 식으로 공부하였는가"에 대한 설명과 코딩테스트 난이도 및 유형을 분석하여 자주 나오는 유형을 소개',
    ],
    links: [],
  },
  {
    title: '한성대학교 교내 전공 동아리 알고리즘 스터디 주최',
    scope: '교내',
    tag: '스터디',
    period: '2023.06 ~ 2023.12',
    image: null,
    details: [
      '6개월간 알고리즘 스터디 개최 및 활동',
    ],
    links: [
      { label: '동적 계획법(DP)', url: 'https://superohinsung.tistory.com/198' },
      { label: '재귀(Recursion)', url: 'https://superohinsung.tistory.com/186' },
      { label: '0-1 BFS', url: 'https://superohinsung.tistory.com/162' },
      { label: 'LIS, LDS', url: 'https://superohinsung.tistory.com/145' },
    ],
  },
  {
    title: '한성대학교 새싹 SW교육 캠프 조교',
    scope: '교내',
    tag: '조교',
    period: '2023.01 ~ 2023.02',
    image: null,
    details: [
      '고등학생들이 실습과 팀프로젝트를 하며 성장하는 SW 프로그램',
      '한성대학교 주최 프로그램에 조교로 선발되어 고등학생들의 파이썬 코딩 보조로 활동',
    ],
    links: [],
  },
  {
    title: '한성대학교 전공 소모임 안드로이드 멘토',
    scope: '교내',
    tag: '멘토',
    period: '2022.09 ~ 2023.09',
    image: null,
    details: [
      '교내 전공 소모임에서 안드로이드 멘토로 1년간 활동',
      'MVVM, MVI 등 설계적인 측면부터 Activity, Fragment 등에 대한 설명과 블로그 기록',
    ],
    links: [
      { label: 'MVI 패턴 정리', url: 'https://superohinsung.tistory.com/148' },
      { label: 'CustomView(커스텀 뷰)', url: 'https://superohinsung.tistory.com/36' },
      { label: 'View, ViewGroup, XML Layout', url: 'https://superohinsung.tistory.com/228' },
      { label: '클린 아키텍처 셋팅', url: 'https://superohinsung.tistory.com/101' },
      { label: '안드로이드 4대 컴포넌트', url: 'https://superohinsung.tistory.com/54' },
    ],
  },
  {
    title: '한성대학교 컴퓨터공학부 2020년 동계 프로그래밍 캠프',
    scope: '교내',
    tag: '캠프',
    period: '2020.01',
    image: null,
    details: [],
    links: [],
  },
  {
    title: '한성대학교 교내 PIG 사진동아리 부회장 활동',
    scope: '교내',
    tag: '동아리',
    period: '2019.03 ~ 2019.12',
    image: 'screenshot/pig.png',
    details: [
      'P.I.G는 Photograph Image Group이라는 뜻으로, 매년 전시회를 열고 매주 떠나는 야외 촬영',
      '부회장에 역임하여 1년간 동아리를 이끈 경험',
    ],
    links: [],
  },
  {
    title: '한성대학교 컴퓨터공학부 2019년 동계 프로그래밍 캠프',
    scope: '교내',
    tag: '캠프',
    period: '2019.01',
    image: null,
    details: [],
    links: [],
  },
]

function ActivityCard({ activity }: { activity: typeof activities[number] }) {
  const [imageOpen, setImageOpen] = useState(false)

  return (
    <div className={styles.card}>
      <div className={styles.cardBody}>
        <div className={styles.cardHeader}>
          <div className={styles.tags}>
            <span className={`${styles.scopeBadge} ${activity.scope === '교외' ? styles.external : styles.internal}`}>
              {activity.scope}
            </span>
            <span className={styles.tagBadge}>{activity.tag}</span>
          </div>
          <span className={styles.period}>{activity.period}</span>
        </div>
        <h3 className={styles.cardTitle}>{activity.title}</h3>
        {activity.details.length > 0 && (
          <ul className={styles.details}>
            {activity.details.map((detail) => (
              <li key={detail} className={styles.detail}>{detail}</li>
            ))}
          </ul>
        )}
        {activity.image && (
          <button
            className={styles.imageToggle}
            onClick={() => setImageOpen(!imageOpen)}
          >
            {imageOpen ? '사진 접기' : '사진 보기'}
            <span className={`${styles.arrow} ${imageOpen ? styles.arrowUp : ''}`} />
          </button>
        )}
        {activity.image && imageOpen && (
          <div className={styles.imageWrap}>
            <img src={activity.image} alt={activity.title} className={styles.image} />
          </div>
        )}
        {activity.links.length > 0 && (
          <div className={styles.links}>
            {activity.links.map((link) => (
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
      </div>
    </div>
  )
}

function Activity() {
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section id="activity" className="section reveal" ref={ref}>
      <h2 className="section__title">Activity</h2>
      <div className={styles.list}>
        {activities.map((activity) => (
          <ActivityCard key={activity.title} activity={activity} />
        ))}
      </div>
    </section>
  )
}

export default Activity
