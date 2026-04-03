import { useSermon } from '../../context/SermonContext'
import { SectionWrapper } from '../layout/SectionWrapper'
import { TextArea } from '../ui/TextArea'

export function Conclusion() {
  const { state, dispatch } = useSermon()
  const { conclusion } = state

  const set = (field, value) => dispatch({ type: 'SET_CONCLUSION_FIELD', field, value })

  return (
    <SectionWrapper id="conclusion" title="Conclusão e Aplicação" icon="🙏">
      <TextArea label="Encerramento" value={conclusion.closingText} onChange={v => set('closingText', v)} rows={4} placeholder="Como você vai encerrar o sermão? Recapitule os pontos principais e reforce a mensagem central..." />
      <TextArea label="Chamado à Ação" value={conclusion.callToAction} onChange={v => set('callToAction', v)} rows={3} placeholder="O que você desafia a congregação a fazer ou mudar após ouvir esse sermão?" />
      <TextArea label="Oração Final" value={conclusion.finalPrayer} onChange={v => set('finalPrayer', v)} rows={3} placeholder="Esboce a oração de encerramento ou convite à resposta..." />
    </SectionWrapper>
  )
}
