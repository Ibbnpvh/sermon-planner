import { useSermon } from '../../context/SermonContext'
import { TextInput } from '../ui/TextInput'
import { AddButton } from '../ui/AddButton'
import { RemoveButton } from '../ui/RemoveButton'
import { createSubTopic } from '../../constants/initialState'
import styles from './ListItems.module.css'

export function SubTopicList({ pointId }) {
  const { state, dispatch } = useSermon()
  const point = state.mainPoints.find(p => p.id === pointId)
  if (!point) return null

  const add = () => dispatch({ type: 'ADD_SUBTOPIC', pointId, subTopic: createSubTopic() })
  const remove = (subTopicId) => dispatch({ type: 'REMOVE_SUBTOPIC', pointId, subTopicId })
  const update = (subTopicId, value) => dispatch({ type: 'UPDATE_SUBTOPIC', pointId, subTopicId, value })

  return (
    <div className={styles.group}>
      <span className={styles.groupLabel}>▸ Sub-tópicos</span>
      {point.subTopics.map(st => (
        <div key={st.id} className={styles.row}>
          <TextInput
            value={st.text}
            onChange={v => update(st.id, v)}
            placeholder="Sub-tópico ou ponto de desenvolvimento..."
          />
          <RemoveButton onClick={() => remove(st.id)} small />
        </div>
      ))}
      <AddButton label="Sub-tópico" onClick={add} small />
    </div>
  )
}
