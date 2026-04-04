import { useState } from 'react'
import { useLibrary } from '../../context/LibraryContext'
import { TemplatePickerModal } from './TemplatePickerModal'
import styles from './SermonLibraryPanel.module.css'

function formatDate(d) {
  if (!d) return null
  const [y, m, day] = d.split('-')
  return `${day}/${m}/${y}`
}

export function SermonLibraryPanel() {
  const { library, selectSermon, removeSermon, duplicateSermon, createSermon } = useLibrary()
  const [showTemplates, setShowTemplates] = useState(false)
  const [collapsed, setCollapsed] = useState(false)

  const { sermons, activeId } = library

  function handleNew() {
    setShowTemplates(true)
  }

  return (
    <div className={styles.panel}>
      <div className={styles.header} onClick={() => setCollapsed(c => !c)}>
        <span className={styles.headerLabel}>
          <span>📚</span> Meus Sermões
          <span className={styles.count}>{sermons.length}</span>
        </span>
        <button className={styles.toggleBtn} title={collapsed ? 'Expandir' : 'Recolher'}>
          {collapsed ? '▶' : '▼'}
        </button>
      </div>

      {!collapsed && (
        <>
          <button className={styles.newBtn} onClick={handleNew}>
            + Novo Sermão
          </button>

          <ul className={styles.list}>
            {sermons.map(s => (
              <li
                key={s.id}
                className={`${styles.item} ${s.id === activeId ? styles.active : ''}`}
              >
                <button
                  className={styles.itemBtn}
                  onClick={() => selectSermon(s.id)}
                  title={s.title}
                >
                  <span className={styles.itemTitle}>{s.title || 'Sem título'}</span>
                  {s.date && <span className={styles.itemDate}>{formatDate(s.date)}</span>}
                </button>
                <div className={styles.itemActions}>
                  <button
                    className={styles.actionBtn}
                    onClick={() => duplicateSermon(s.id)}
                    title="Duplicar"
                  >⧉</button>
                  <button
                    className={styles.actionBtn + ' ' + styles.danger}
                    onClick={() => removeSermon(s.id)}
                    title="Excluir"
                  >✕</button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}

      <TemplatePickerModal
        isOpen={showTemplates}
        onClose={() => setShowTemplates(false)}
        onCreate={(data, title) => {
          createSermon(data, title)
          setShowTemplates(false)
        }}
      />
    </div>
  )
}
