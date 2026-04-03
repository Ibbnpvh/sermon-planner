import { useSermon } from '../../context/SermonContext'
import { TextInput } from '../ui/TextInput'
import { AddButton } from '../ui/AddButton'
import { RemoveButton } from '../ui/RemoveButton'
import { createBibleRef } from '../../constants/initialState'
import styles from './ListItems.module.css'

export function BibleRefList({ pointId }) {
  const { state, dispatch } = useSermon()
  const point = state.mainPoints.find(p => p.id === pointId)
  if (!point) return null

  const add = () => dispatch({ type: 'ADD_BIBLICAL_REF', pointId, ref: createBibleRef() })
  const remove = (refId) => dispatch({ type: 'REMOVE_BIBLICAL_REF', pointId, refId })
  const update = (refId, value) => dispatch({ type: 'UPDATE_BIBLICAL_REF', pointId, refId, value })

  return (
    <div className={styles.group}>
      <span className={styles.groupLabel}>📖 Referências Bíblicas</span>
      {point.biblicalRefs.map(ref => (
        <div key={ref.id} className={styles.row}>
          <TextInput
            value={ref.text}
            onChange={v => update(ref.id, v)}
            placeholder="Ex: Rm 8:28 — E sabemos que todas as coisas contribuem..."
          />
          <RemoveButton onClick={() => remove(ref.id)} small />
        </div>
      ))}
      <AddButton label="Referência Bíblica" onClick={add} small />
    </div>
  )
}
