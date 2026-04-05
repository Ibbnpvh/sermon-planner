import { useState } from 'react'
import { Library, Plus, Copy, Trash2, Search, ChevronDown, ChevronRight } from 'lucide-react'
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
  const [search, setSearch] = useState('')

  const { sermons, activeId } = library

  const filtered = search.trim()
    ? sermons.filter(s => s.title?.toLowerCase().includes(search.toLowerCase()))
    : sermons

  return (
    <div className={styles.panel}>
      <div className={styles.header} onClick={() => setCollapsed(c => !c)}>
        <span className={styles.headerLabel}>
          <Library size={13} />
          Meus Sermões
          <span className={styles.count}>{sermons.length}</span>
        </span>
        <button className={styles.toggleBtn} title={collapsed ? 'Expandir' : 'Recolher'}>
          {collapsed ? <ChevronRight size={13} /> : <ChevronDown size={13} />}
        </button>
      </div>

      {!collapsed && (
        <>
          <div className={styles.searchRow}>
            <Search size={12} style={{ position: 'absolute', left: 20, color: 'var(--gray-light)', pointerEvents: 'none' }} />
            <input
              className={styles.searchInput}
              style={{ paddingLeft: '26px' }}
              type="text"
              placeholder="Buscar sermão..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              onClick={e => e.stopPropagation()}
            />
            {search && (
              <button className={styles.clearSearch} onClick={() => setSearch('')} title="Limpar busca">×</button>
            )}
          </div>

          <button className={styles.newBtn} onClick={() => setShowTemplates(true)}>
            <Plus size={13} />
            Novo Sermão
          </button>

          <ul className={styles.list}>
            {filtered.length === 0 && (
              <li className={styles.empty}>
                {search ? 'Nenhum resultado.' : 'Nenhum sermão ainda.'}
              </li>
            )}
            {filtered.map(s => (
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
                  ><Copy size={11} /></button>
                  <button
                    className={`${styles.actionBtn} ${styles.danger}`}
                    onClick={() => removeSermon(s.id)}
                    title="Excluir"
                  ><Trash2 size={11} /></button>
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
