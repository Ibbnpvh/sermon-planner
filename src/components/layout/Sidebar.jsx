import {
  User, BookOpen, List, Pin, Lightbulb,
  HeartHandshake, BookMarked, NotebookPen, ChevronRight,
} from 'lucide-react'
import { useSermon } from '../../context/SermonContext'
import { useSermonProgress } from '../../hooks/useSermonProgress'
import { SermonLibraryPanel } from '../library/SermonLibraryPanel'
import styles from './Sidebar.module.css'

const SECTIONS = [
  { id: 'preacher-info',  label: 'Pregador',          icon: User },
  { id: 'title-theme',    label: 'Título e Tema',      icon: BookOpen },
  { id: 'introduction',   label: 'Introdução',         icon: List },
  { id: 'main-points',    label: 'Pontos Principais',  icon: Pin },
  { id: 'illustrations',  label: 'Ilustrações',        icon: Lightbulb },
  { id: 'conclusion',     label: 'Conclusão',          icon: HeartHandshake },
  { id: 'references',     label: 'Referências',        icon: BookMarked },
  { id: 'personal-notes', label: 'Anotações',          icon: NotebookPen },
]

function ProgressBar({ percent, filled, total }) {
  const color =
    percent === 100 ? '#22a060' :
    percent >= 60   ? '#c9a84c' :
                      '#8fa0c0'
  const label =
    percent === 100 ? 'Sermão completo!' :
    percent >= 75   ? 'Quase pronto' :
    percent >= 40   ? 'Em progresso' :
                      'Iniciando…'

  return (
    <div className={styles.progressBox}>
      <div className={styles.progressHeader}>
        <span className={styles.progressLabel}>{label}</span>
        <span className={styles.progressValue} style={{ color }}>
          {filled}<span className={styles.progressTotal}>/{total}</span>
        </span>
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
        <p className={styles.navHeading}>Seções</p>
        {SECTIONS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            className={styles.navItem}
            onClick={() => scrollTo(id)}
            type="button"
          >
            <span className={styles.navIconWrap}>
              <Icon size={15} strokeWidth={1.8} />
            </span>
            <span className={styles.navLabel}>{label}</span>
            <ChevronRight size={12} className={styles.navArrow} />
          </button>
        ))}
      </nav>
    </aside>
  )
}
