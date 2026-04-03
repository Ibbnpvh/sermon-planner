import styles from './FormField.module.css'

export function DateInput({ label, value, onChange, id }) {
  const inputId = id || 'date-input'
  return (
    <div className={styles.field}>
      {label && <label className={styles.label} htmlFor={inputId}>{label}</label>}
      <input
        id={inputId}
        className={styles.input}
        type="date"
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  )
}
