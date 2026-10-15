import { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import styles from './Activity.module.css'

const activities = [
  {
    title: '한성대학교 LBT 지식 나눔 프로젝트 — "알고리즘을 공부하는 방법" 발표',
    scope: '교내',
    tag: '발표',
    period: '2023.07',
    image: 'screenshot/lbt.png',
    details: [
      '재학생이 직접 고른 주제로 온오프라인에서 90분간 강의하는 프로그램에 참여했습니다.',
      '알고리즘 공부를 시작하기 어려워하는 후배들을 위해 학습 방법을 발표했습니다.',
      '직접 공부한 방법을 설명하고, 코딩 테스트의 난이도와 자주 나오는 문제 유형을 소개했습니다.',
    ],
    links: [],
  },
  {
    title: '한성대학교 새싹 SW교육 캠프 조교',
    scope: '교내',
    tag: '조교',
    period: '2023.01 ~ 2023.02',
    image: null,
    details: [
      '고등학생을 대상으로 실습과 팀 프로젝트를 진행하는 SW 교육 프로그램입니다.',
      '한성대학교 주최 캠프의 조교로 선발되어 고등학생들의 Python 실습을 도왔습니다.',
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
      '교내 전공 소모임에서 Android 멘토로 1년간 활동했습니다.',
      'MVVM과 MVI, Activity와 Fragment 등을 설명하고 관련 내용을 블로그에 기록했습니다.',
    ],
    links: [
      { label: 'MVI 패턴 정리', url: 'https://superohinsung.tistory.com/148' },
      { label: '커스텀 뷰', url: 'https://superohinsung.tistory.com/36' },
      { label: 'View, ViewGroup, XML Layout', url: 'https://superohinsung.tistory.com/228' },
      { label: '클린 아키텍처 설정', url: 'https://superohinsung.tistory.com/101' },
      { label: '안드로이드 4대 컴포넌트', url: 'https://superohinsung.tistory.com/54' },
    ],
  },
  {
    title: '한성대학교 교내 전공동아리 DC&M',
    scope: '교내',
    tag: '동아리',
    period: '2022.06 ~ 2023.12',
    image: null,
    details: [
      '컴퓨터공학부 전공 동아리 DC&M에서 활동했습니다.',
      '알고리즘 스터디를 주최하고 참여했습니다. (2023.06 ~ 2023.12)',
      '(주)PickNumber 산학 협력 프로젝트에서 전국 업체의 예약 및 위치 서비스 앱을 개발했습니다. (2023.01 ~ 2023.06)',
    ],
    links: [
      { label: '동적 계획법', url: 'https://superohinsung.tistory.com/198' },
      { label: '재귀', url: 'https://superohinsung.tistory.com/186' },
      { label: '0-1 BFS', url: 'https://superohinsung.tistory.com/162' },
      { label: 'LIS, LDS', url: 'https://superohinsung.tistory.com/145' },
    ],
  },
  {
    title: '한성대학교 교내 전공 소모임 POCS',
    scope: '교내',
    tag: '소모임',
    period: '2022.06 ~ 2023.12',
    image: null,
    details: [
      '전공 소모임에서 스터디와 프로젝트에 참여했습니다.',
    ],
    links: [],
  },
  {
    title: '한성대학교 교내 PIG 사진동아리 부회장 활동',
    scope: '교내',
    tag: '동아리',
    period: '2019.03 ~ 2019.12',
    image: 'screenshot/pig.png',
    details: [
      '매년 전시회를 열고 매주 야외 촬영을 진행하는 사진동아리입니다.',
      '부회장으로 1년간 동아리를 운영했습니다.',
    ],
    links: [],
  },
]

function ActivityCard({ activity }: { activity: typeof activities[number] }) {
  const [imageOpen, setImageOpen] = useState(false)

  return (
    <div className={`${styles.card} ${imageOpen ? styles.expanded : ''}`}>
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
        <h3 className={styles.cardTitle}><strong className={styles.emphasis}>{activity.title}</strong></h3>
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
            aria-expanded={imageOpen}
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
