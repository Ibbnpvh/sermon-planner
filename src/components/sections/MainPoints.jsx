import { useSermon } from '../../context/SermonContext'
import { SectionWrapper } from '../layout/SectionWrapper'
import { AddButton } from '../ui/AddButton'
import { MainPointItem } from './MainPointItem'
import { createMainPoint } from '../../constants/initialState'
import styles from './Section.module.css'

export function MainPoints() {
  const { state, dispatch } = useSermon()
  const { mainPoints } = state

  const addPoint = () => dispatch({ type: 'ADD_MAIN_POINT', point: createMainPoint() })

  return (
    <SectionWrapper id="main-points" title="Pontos Principais" icon="📌">
      {mainPoints.length === 0 && (
        <p className={styles.empty}>Nenhum ponto adicionado ainda. Clique em "+ Adicionar Ponto" para começar.</p>
      )}
      <div className={styles.pointList}>
        {mainPoints.map((pt, i) => (
          <MainPointItem key={pt.id} point={pt} index={i} />
        ))}
      </div>
      <AddButton label="Adicionar Ponto" onClick={addPoint} />
    </SectionWrapper>
  )
}
