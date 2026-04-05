import { useState } from 'react'
import { GripVertical } from 'lucide-react'
import { useSermon } from '../../context/SermonContext'
import { TextInput } from '../ui/TextInput'
import { RemoveButton } from '../ui/RemoveButton'
import { SubTopicList } from './SubTopicList'
import { BibleRefList } from './BibleRefList'
import { IllustrationList } from './IllustrationList'
import styles from './MainPointItem.module.css'

export function MainPointItem({ point, index, isDragOver, onDragOver, onDrop, onDragLeave }) {
  const { dispatch } = useSermon()
  const [expanded, setExpanded] = useState(true)

  const handleRemove = () => {
    const hasContent = point.pointTitle || point.subTopics.length || point.biblicalRefs.length || point.illustrations.length
    if (hasContent && !window.confirm(`Remover o Ponto ${index + 1}? Todo o conteúdo será perdido.`)) return
    dispatch({ type: 'REMOVE_MAIN_POINT', id: point.id })
  }

  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', String(index))
    e.dataTransfer.effectAllowed = 'move'
  }

  return (
    <div
      className={`${styles.item} ${isDragOver ? styles.dragOver : ''}`}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onDragLeave={onDragLeave}
    >
      <div className={styles.itemHeader}>
        <span
          className={styles.dragHandle}
          draggable
          onDragStart={handleDragStart}
          title="Arrastar para reordenar"
        >
          <GripVertical size={15} strokeWidth={1.8} />
        </span>
        <span className={styles.number}>{index + 1}</span>
        <div className={styles.titleRow}>
          <TextInput
            value={point.pointTitle}
            onChange={v => dispatch({ type: 'UPDATE_MAIN_POINT_TITLE', id: point.id, value: v })}
            placeholder={`Título do Ponto ${index + 1}...`}
          />
        </div>
        <button
          type="button"
          className={styles.toggleBtn}
          onClick={() => setExpanded(e => !e)}
          aria-label={expanded ? 'Recolher' : 'Expandir'}
        >
          {expanded ? '▲' : '▼'}
        </button>
        <RemoveButton onClick={handleRemove} title={`Remover Ponto ${index + 1}`} />
      </div>

      {expanded && (
        <div className={styles.body}>
          <SubTopicList pointId={point.id} />
          <BibleRefList pointId={point.id} />
          <IllustrationList pointId={point.id} />
        </div>
      )}
    </div>
  )
}
