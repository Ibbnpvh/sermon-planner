import { useState } from 'react'
import styles from './SectionWrapper.module.css'

export function SectionWrapper({ id, title, icon, children, defaultCollapsed = false }) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed)

  return (
    <section id={id} className={`${styles.wrapper} fade-in`}>
      <div className={styles.header} onClick={() => setCollapsed(c => !c)} role="button" tabIndex={0}
        onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setCollapsed(c => !c)}
        aria-expanded={!collapsed}
      >
        {icon && <span className={styles.icon}>{icon}</span>}
        <h2 className={styles.title}>{title}</h2>
        <button
          className={styles.collapseBtn}
          type="button"
          onClick={e => { e.stopPropagation(); setCollapsed(c => !c) }}
          aria-label={collapsed ? 'Expandir seção' : 'Recolher seção'}
          title={collapsed ? 'Expandir' : 'Recolher'}
        >
          <span className={`${styles.collapseIcon} ${collapsed ? styles.collapsedIcon : ''}`}>▼</span>
        </button>
      </div>
      <div className={`${styles.body} ${collapsed ? styles.bodyCollapsed : ''}`}>
        {children}
      </div>
    </section>
  )
}
