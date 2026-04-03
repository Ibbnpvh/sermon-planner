import styles from './Sidebar.module.css'

const SECTIONS = [
  { id: 'preacher-info',  label: 'Pregador',            icon: '👤' },
  { id: 'title-theme',    label: 'Título e Tema',        icon: '✝️'  },
  { id: 'introduction',   label: 'Introdução',           icon: '📖' },
  { id: 'main-points',    label: 'Pontos Principais',    icon: '📌' },
  { id: 'illustrations',  label: 'Ilustrações',          icon: '💡' },
  { id: 'conclusion',     label: 'Conclusão',            icon: '🙏' },
  { id: 'references',     label: 'Referências',          icon: '📚' },
  { id: 'personal-notes', label: 'Anotações Pessoais',   icon: '📝' },
]

export function Sidebar() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <span className={styles.logoIcon}>✝</span>
        <span className={styles.logoText}>Planejador</span>
      </div>
      <nav className={styles.nav}>
        {SECTIONS.map(s => (
          <button
            key={s.id}
            className={styles.navItem}
            onClick={() => scrollTo(s.id)}
            type="button"
          >
            <span className={styles.navIcon}>{s.icon}</span>
            <span className={styles.navLabel}>{s.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  )
}
