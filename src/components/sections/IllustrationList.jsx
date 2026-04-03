import { useSermon } from '../../context/SermonContext'
import { TextInput } from '../ui/TextInput'
import { TextArea } from '../ui/TextArea'
import { AddButton } from '../ui/AddButton'
import { RemoveButton } from '../ui/RemoveButton'
import { createInlineIllustration } from '../../constants/initialState'
import styles from './ListItems.module.css'

export function IllustrationList({ pointId }) {
  const { state, dispatch } = useSermon()
  const point = state.mainPoints.find(p => p.id === pointId)
  if (!point) return null

  const add = () => dispatch({ type: 'ADD_INLINE_ILLUSTRATION', pointId, illustration: createInlineIllustration() })
  const remove = (illustrationId) => dispatch({ type: 'REMOVE_INLINE_ILLUSTRATION', pointId, illustrationId })
  const update = (illustrationId, field, value) =>
    dispatch({ type: 'UPDATE_INLINE_ILLUSTRATION', pointId, illustrationId, field, value })

  return (
    <div className={styles.group}>
      <span className={styles.groupLabel}>💡 Ilustrações deste Ponto</span>
      {point.illustrations.map(ill => (
        <div key={ill.id} className={`${styles.card} ${styles.illustrationCard}`}>
          <div className={styles.cardHeader}>
            <TextInput value={ill.title} onChange={v => update(ill.id, 'title', v)} placeholder="Título da ilustração..." />
            <RemoveButton onClick={() => remove(ill.id)} />
          </div>
          <TextArea value={ill.body} onChange={v => update(ill.id, 'body', v)} rows={3} placeholder="Desenvolva a história, analogia ou exemplo..." />
        </div>
      ))}
      <AddButton label="Ilustração ao Ponto" onClick={add} small />
    </div>
  )
}
