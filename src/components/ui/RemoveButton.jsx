import styles from './Buttons.module.css'

export function RemoveButton({ onClick, title = 'Remover', small = false }) {
  return (
    <button
      type="button"
      className={`${styles.removeBtn} ${small ? styles.small : ''}`}
      onClick={onClick}
      title={title}
      aria-label={title}
    >
      ×
    </button>
  )
}
