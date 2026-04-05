import { BookMarked } from 'lucide-react'
import { useSermon } from '../../context/SermonContext'
import { SectionWrapper } from '../layout/SectionWrapper'
import { TextInput } from '../ui/TextInput'
import { AddButton } from '../ui/AddButton'
import { RemoveButton } from '../ui/RemoveButton'
import { createReference } from '../../constants/initialState'
import styles from './Section.module.css'
import listStyles from './ListItems.module.css'

export function References() {
  const { state, dispatch } = useSermon()
  const { references } = state

  const add = () => dispatch({ type: 'ADD_REFERENCE', reference: createReference() })
  const remove = (id) => dispatch({ type: 'REMOVE_REFERENCE', id })
  const update = (id, value) => dispatch({ type: 'UPDATE_REFERENCE', id, value })

  return (
    <SectionWrapper id="references" title="Referências Bibliográficas" icon={BookMarked}>
      {references.length === 0 && (
        <p className={styles.empty}>Nenhuma referência adicionada. Liste os livros, artigos e fontes que embasam este sermão.</p>
      )}
      <div className={styles.pointList}>
        {references.map((ref) => (
          <div key={ref.id} className={listStyles.row}>
            <TextInput
              value={ref.citation}
              onChange={v => update(ref.id, v)}
              placeholder="Ex: STOTT, John R.W. A Pregação entre dois mundos. ABU, 2014."
            />
            <RemoveButton onClick={() => remove(ref.id)} small />
          </div>
        ))}
      </div>
      <AddButton label="Adicionar Referência" onClick={add} />
    </SectionWrapper>
  )
}
