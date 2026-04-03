import styles from './SectionWrapper.module.css'

export function SectionWrapper({ id, title, icon, children }) {
  return (
    <section id={id} className={`${styles.wrapper} fade-in`}>
      <div className={styles.header}>
        {icon && <span className={styles.icon}>{icon}</span>}
        <h2 className={styles.title}>{title}</h2>
      </div>
      <div className={styles.body}>{children}</div>
    </section>
  )
}
