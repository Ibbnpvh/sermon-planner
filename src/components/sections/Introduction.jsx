import { useSermon } from '../../context/SermonContext'
import { SectionWrapper } from '../layout/SectionWrapper'
import { TextArea } from '../ui/TextArea'

export function Introduction() {
  const { state, dispatch } = useSermon()
  const { introduction } = state

  const set = (field, value) => dispatch({ type: 'SET_INTRODUCTION_FIELD', field, value })

  return (
    <SectionWrapper id="introduction" title="Introdução" icon="📖">
      <TextArea label="Gancho de Abertura" value={introduction.openingHook} onChange={v => set('openingHook', v)} rows={4} placeholder="Como você vai capturar a atenção da congregação? Uma história, pergunta ou estatística impactante..." />
      <TextArea label="Contexto e Apresentação" value={introduction.context} onChange={v => set('context', v)} rows={4} placeholder="Apresente o problema, necessidade ou contexto que o sermão vai abordar..." />
      <TextArea label="Transição para o Tema" value={introduction.transition} onChange={v => set('transition', v)} rows={3} placeholder="Como você vai conectar a introdução ao tema central do sermão?" />
    </SectionWrapper>
  )
}
