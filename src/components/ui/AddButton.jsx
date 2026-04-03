import styles from './Buttons.module.css'

export function AddButton({ label, onClick, small = false }) {
  return (
    <button
      type="button"
      className={`${styles.addBtn} ${small ? styles.small : ''}`}
      onClick={onClick}
    >
      <span className={styles.plus}>+</span>
      {label}
    </button>
  )
}
