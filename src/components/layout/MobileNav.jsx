import {
  User, BookOpen, List, Pin, Lightbulb,
  HeartHandshake, BookMarked, NotebookPen,
} from 'lucide-react'
import styles from './MobileNav.module.css'

const SECTIONS = [
  { id: 'preacher-info',  label: 'Pregador',  icon: User },
  { id: 'title-theme',    label: 'Título',    icon: BookOpen },
  { id: 'introduction',   label: 'Intro',     icon: List },
  { id: 'main-points',    label: 'Pontos',    icon: Pin },
  { id: 'illustrations',  label: 'Ilustr.',   icon: Lightbulb },
  { id: 'conclusion',     label: 'Conclusão', icon: HeartHandshake },
  { id: 'references',     label: 'Refs',      icon: BookMarked },
  { id: 'personal-notes', label: 'Notas',     icon: NotebookPen },
]

export function MobileNav() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav className={styles.nav}>
      {SECTIONS.map(({ id, label, icon: Icon }) => (
        <button key={id} className={styles.btn} onClick={() => scrollTo(id)} type="button">
          <Icon size={17} strokeWidth={1.8} className={styles.icon} />
          <span className={styles.label}>{label}</span>
        </button>
      ))}
    </nav>
  )
}
