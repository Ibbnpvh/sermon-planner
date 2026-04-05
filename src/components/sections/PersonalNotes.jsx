import { NotebookPen, Lock } from 'lucide-react'
import { useSermon } from '../../context/SermonContext'
import { SectionWrapper } from '../layout/SectionWrapper'
import { TextArea } from '../ui/TextArea'
import styles from './Section.module.css'

export function PersonalNotes() {
  const { state, dispatch } = useSermon()

  return (
    <SectionWrapper id="personal-notes" title="Anotações Pessoais" icon={NotebookPen}>
      <div>
        <span className={styles.personalBadge}>
          <Lock size={11} />
          Não exportado para o PDF
        </span>
      </div>
      <TextArea
        value={state.personalNotes}
        onChange={v => dispatch({ type: 'SET_PERSONAL_NOTES', value: v })}
        rows={6}
        placeholder="Anotações pessoais, lembretes de oração, ideias para futuras pregações, pontos de melhoria... Estas notas são apenas para você e não aparecerão no PDF exportado."
      />
    </SectionWrapper>
  )
}
