import { BookOpen } from 'lucide-react'
import { useSermon } from '../../context/SermonContext'
import { SectionWrapper } from '../layout/SectionWrapper'
import { TextInput } from '../ui/TextInput'
import { TextArea } from '../ui/TextArea'
import styles from './Section.module.css'

export function TitleTheme() {
  const { state, dispatch } = useSermon()
  const { titleTheme } = state

  const set = (field, value) => dispatch({ type: 'SET_TITLE_THEME_FIELD', field, value })

  return (
    <SectionWrapper id="title-theme" title="Título e Tema" icon={BookOpen}>
      <TextInput label="Título do Sermão" value={titleTheme.sermonTitle} onChange={v => set('sermonTitle', v)} placeholder="Ex: A Graça que Transforma" />
      <TextInput label="Tema Central" value={titleTheme.centralTheme} onChange={v => set('centralTheme', v)} placeholder="Ex: A graça de Deus como agente de transformação pessoal" />
      <div className={styles.grid2}>
        <TextArea label="Versículo-Chave" value={titleTheme.keyVerse} onChange={v => set('keyVerse', v)} rows={3} placeholder="Digite o texto completo do versículo..." />
        <TextInput label="Referência (ex: João 3:16)" value={titleTheme.keyVerseReference} onChange={v => set('keyVerseReference', v)} placeholder="Livro capítulo:versículo" id="key-verse-ref" />
      </div>
    </SectionWrapper>
  )
}
