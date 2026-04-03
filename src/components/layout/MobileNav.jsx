import styles from './MobileNav.module.css'

const SECTIONS = [
  { id: 'preacher-info',  label: 'Pregador',  icon: '👤' },
  { id: 'title-theme',    label: 'Título',    icon: '✝️'  },
  { id: 'introduction',   label: 'Intro',     icon: '📖' },
  { id: 'main-points',    label: 'Pontos',    icon: '📌' },
  { id: 'illustrations',  label: 'Ilustr.',   icon: '💡' },
  { id: 'conclusion',     label: 'Conclusão', icon: '🙏' },
  { id: 'references',     label: 'Refs',      icon: '📚' },
  { id: 'personal-notes', label: 'Notas',     icon: '📝' },
]

export function MobileNav() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav className={styles.nav}>
      {SECTIONS.map(s => (
        <button key={s.id} className={styles.btn} onClick={() => scrollTo(s.id)} type="button">
          <span className={styles.icon}>{s.icon}</span>
          <span className={styles.label}>{s.label}</span>
        </button>
      ))}
    </nav>
  )
}
