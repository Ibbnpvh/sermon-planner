import { useState } from 'react'
import { useSermon } from '../../context/SermonContext'
import { SectionWrapper } from '../layout/SectionWrapper'
import { AddButton } from '../ui/AddButton'
import { MainPointItem } from './MainPointItem'
import { createMainPoint } from '../../constants/initialState'
import styles from './Section.module.css'

export function MainPoints() {
  const { state, dispatch } = useSermon()
  const { mainPoints } = state
  const [dragOverIndex, setDragOverIndex] = useState(null)

  const addPoint = () => dispatch({ type: 'ADD_MAIN_POINT', point: createMainPoint() })

  const handleDragOver = (e, index) => {
    e.preventDefault()
    setDragOverIndex(index)
  }

  const handleDrop = (e, toIndex) => {
    e.preventDefault()
    const fromIndex = parseInt(e.dataTransfer.getData('text/plain'), 10)
    if (!isNaN(fromIndex) && fromIndex !== toIndex) {
      dispatch({ type: 'MOVE_MAIN_POINT', from: fromIndex, to: toIndex })
    }
    setDragOverIndex(null)
  }

  const handleDragLeave = () => setDragOverIndex(null)

  return (
    <SectionWrapper id="main-points" title="Pontos Principais" icon="📌">
      {mainPoints.length === 0 && (
        <p className={styles.empty}>Nenhum ponto adicionado ainda. Clique em "+ Adicionar Ponto" para começar.</p>
      )}
      <div className={styles.pointList}>
        {mainPoints.map((pt, i) => (
          <MainPointItem
            key={pt.id}
            point={pt}
            index={i}
            isDragOver={dragOverIndex === i}
            onDragOver={(e) => handleDragOver(e, i)}
            onDrop={(e) => handleDrop(e, i)}
            onDragLeave={handleDragLeave}
          />
        ))}
      </div>
      <AddButton label="Adicionar Ponto" onClick={addPoint} />
    </SectionWrapper>
  )
}
