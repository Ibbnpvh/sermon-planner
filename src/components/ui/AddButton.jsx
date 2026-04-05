import { Plus } from 'lucide-react'
import styles from './Buttons.module.css'

export function AddButton({ label, onClick, small = false }) {
  return (
    <button
      type="button"
      className={`${styles.addBtn} ${small ? styles.small : ''}`}
      onClick={onClick}
    >
      <Plus size={small ? 13 : 15} strokeWidth={2.5} />
      {label}
    </button>
  )
}
