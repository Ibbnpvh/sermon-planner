import { useSermon } from '../../context/SermonContext'
import { SectionWrapper } from '../layout/SectionWrapper'
import { TextInput } from '../ui/TextInput'
import { DateInput } from '../ui/DateInput'
import styles from './Section.module.css'

export function PreacherInfo() {
  const { state, dispatch } = useSermon()
  const { preacherInfo } = state

  const set = (field, value) => dispatch({ type: 'SET_PREACHER_FIELD', field, value })

  return (
    <SectionWrapper id="preacher-info" title="Informações do Pregador" icon="👤">
      <div className={styles.grid2}>
        <TextInput label="Nome do Pregador" value={preacherInfo.preacherName} onChange={v => set('preacherName', v)} placeholder="Ex: Rev. João da Silva" />
        <TextInput label="Igreja / Congregação" value={preacherInfo.church ?? ''} onChange={v => set('church', v)} placeholder="Ex: Igreja Batista Central" />
      </div>
      <div className={styles.grid2}>
        <DateInput label="Data do Culto" value={preacherInfo.date} onChange={v => set('date', v)} />
        <TextInput label="Ocasião / Evento" value={preacherInfo.occasion} onChange={v => set('occasion', v)} placeholder="Ex: Culto de Domingo, Conferência..." />
      </div>
      <div className={styles.grid2}>
        <TextInput label="Local / Endereço" value={preacherInfo.location} onChange={v => set('location', v)} placeholder="Ex: Rua das Palmeiras, 200" />
        <TextInput label="Série de Sermões" value={preacherInfo.series ?? ''} onChange={v => set('series', v)} placeholder="Ex: Série Fé e Obras — Parte 3" />
      </div>
    </SectionWrapper>
  )
}
