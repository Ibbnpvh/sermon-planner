import { useSermon } from '../../context/SermonContext'
import { useSermonProgress } from '../../hooks/useSermonProgress'
import { SermonLibraryPanel } from '../library/SermonLibraryPanel'
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

function ProgressBar({ percent, filled, total }) {
  const color = percent === 100 ? '#22a060' : percent >= 60 ? '#c9a84c' : '#9aabcc'
  return (
    <div className={styles.progressBox}>
      <div className={styles.progressHeader}>
        <span className={styles.progressLabel}>Completude do Sermão</span>
        <span className={styles.progressValue} style={{ color }}>{filled}/{total}</span>
      </div>
      <div className={styles.progressTrack}>
        <div
          className={styles.progressFill}
          style={{ width: `${percent}%`, background: color }}
        />
      </div>
    </div>
  )
}

export function Sidebar() {
  const { state } = useSermon()
  const progress = useSermonProgress(state)

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <aside className={styles.sidebar}>
      <SermonLibraryPanel />
      <ProgressBar percent={progress.percent} filled={progress.filled} total={progress.total} />
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
