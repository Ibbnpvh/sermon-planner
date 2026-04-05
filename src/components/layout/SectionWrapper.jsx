import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import styles from './SectionWrapper.module.css'

export function SectionWrapper({ id, title, icon: Icon, children, defaultCollapsed = false }) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed)

  return (
    <section id={id} className={`${styles.wrapper} fade-in`}>
      <div
        className={styles.header}
        onClick={() => setCollapsed(c => !c)}
        role="button"
        tabIndex={0}
        onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setCollapsed(c => !c)}
        aria-expanded={!collapsed}
      >
        {Icon && (
          <div className={styles.iconWrap}>
            <Icon size={16} strokeWidth={2} />
          </div>
        )}
        <h2 className={styles.title}>{title}</h2>
        <div className={`${styles.chevron} ${collapsed ? styles.chevronCollapsed : ''}`}>
          <ChevronDown size={16} strokeWidth={2} />
        </div>
      </div>
      <div className={`${styles.body} ${collapsed ? styles.bodyCollapsed : ''}`}>
        {children}
      </div>
    </section>
  )
}
