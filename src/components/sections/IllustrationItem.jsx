import { useSermon } from '../../context/SermonContext'
import { TextInput } from '../ui/TextInput'
import { TextArea } from '../ui/TextArea'
import { RemoveButton } from '../ui/RemoveButton'
import styles from './ListItems.module.css'
import itemStyles from './IllustrationItem.module.css'

export function IllustrationItem({ illustration }) {
  const { state, dispatch } = useSermon()

  const update = (field, value) =>
    dispatch({ type: 'UPDATE_STANDALONE_ILLUSTRATION', id: illustration.id, field, value })

  const remove = () =>
    dispatch({ type: 'REMOVE_STANDALONE_ILLUSTRATION', id: illustration.id })

  return (
    <div className={`${styles.card} ${styles.illustrationCard} ${itemStyles.item}`}>
      <div className={styles.cardHeader}>
        <TextInput value={illustration.title} onChange={v => update('title', v)} placeholder="Título da ilustração / história..." />
        <RemoveButton onClick={remove} />
      </div>
      <TextArea value={illustration.body} onChange={v => update('body', v)} rows={4} placeholder="Desenvolva a ilustração, história, analogia ou exemplo..." />
      <div className={itemStyles.linkRow}>
        <label className={itemStyles.linkLabel}>Vincular a um Ponto:</label>
        <select
          className={itemStyles.linkSelect}
          value={illustration.linkedPointId || ''}
          onChange={e => update('linkedPointId', e.target.value || null)}
        >
          <option value="">— Nenhum (ilustração standalone) —</option>
          {state.mainPoints.map((pt, i) => (
            <option key={pt.id} value={pt.id}>
              Ponto {i + 1}{pt.pointTitle ? ` — ${pt.pointTitle}` : ''}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
