import { useState } from 'react'
import { Modal } from '../ui/Modal'
import { TEMPLATE_META, createTemplate } from '../../constants/templates'
import styles from './TemplatePickerModal.module.css'

export function TemplatePickerModal({ isOpen, onClose, onCreate }) {
  const [selected, setSelected] = useState('blank')

  function handleCreate() {
    const data = createTemplate(selected)
    const meta = TEMPLATE_META.find(t => t.id === selected)
    onCreate(data, meta?.label === 'Em branco' ? 'Novo Sermão' : `Sermão ${meta?.label}`)
    setSelected('blank')
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Escolher modelo de sermão">
      <div className={styles.grid}>
        {TEMPLATE_META.map(t => (
          <button
            key={t.id}
            className={`${styles.card} ${selected === t.id ? styles.selected : ''}`}
            onClick={() => setSelected(t.id)}
          >
            <span className={styles.icon}>{t.icon}</span>
            <span className={styles.label}>{t.label}</span>
            <span className={styles.desc}>{t.description}</span>
          </button>
        ))}
      </div>
      <div className={styles.footer}>
        <button className={styles.cancelBtn} onClick={onClose}>Cancelar</button>
        <button className={styles.createBtn} onClick={handleCreate}>
          Criar Sermão
        </button>
      </div>
    </Modal>
  )
}
