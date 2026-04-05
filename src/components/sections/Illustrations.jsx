import { Lightbulb } from 'lucide-react'
import { useSermon } from '../../context/SermonContext'
import { SectionWrapper } from '../layout/SectionWrapper'
import { AddButton } from '../ui/AddButton'
import { IllustrationItem } from './IllustrationItem'
import { createStandaloneIllustration } from '../../constants/initialState'
import styles from './Section.module.css'

export function Illustrations() {
  const { state, dispatch } = useSermon()
  const { illustrations } = state

  const add = () => dispatch({ type: 'ADD_STANDALONE_ILLUSTRATION', illustration: createStandaloneIllustration() })

  return (
    <SectionWrapper id="illustrations" title="Ilustrações e Histórias" icon={Lightbulb}>
      {illustrations.length === 0 && (
        <p className={styles.empty}>Nenhuma ilustração ainda. Adicione histórias, analogias ou exemplos que enriquecem o sermão.</p>
      )}
      <div className={styles.pointList}>
        {illustrations.map(ill => (
          <IllustrationItem key={ill.id} illustration={ill} />
        ))}
      </div>
      <AddButton label="Adicionar Ilustração" onClick={add} />
    </SectionWrapper>
  )
}
