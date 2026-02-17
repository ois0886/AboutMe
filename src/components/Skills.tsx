import styles from './Skills.module.css'

const skills = [
  {
    category: 'Frontend',
    items: ['React', 'TypeScript', 'HTML/CSS', 'JavaScript'],
  },
  {
    category: 'Tools',
    items: ['Git', 'VS Code', 'Figma'],
  },
]

function Skills() {
  return (
    <section id="skills" className="section" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
      <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto' }}>
        <h2 className="section__title">Skills</h2>
        <div className={styles.grid}>
          {skills.map((group) => (
            <div key={group.category} className={styles.card}>
              <h3 className={styles.category}>{group.category}</h3>
              <ul className={styles.list}>
                {group.items.map((item) => (
                  <li key={item} className={styles.item}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
