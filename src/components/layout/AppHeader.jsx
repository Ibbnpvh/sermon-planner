import { useState } from 'react'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { useSermon } from '../../context/SermonContext'
import { SermonDocument } from '../pdf/SermonDocument'
import { PDFPreviewModal } from '../pdf/PDFPreviewModal'
import { clearState } from '../../utils/localStorage'
import styles from './AppHeader.module.css'

export function AppHeader() {
  const { state, dispatch } = useSermon()
  const [previewOpen, setPreviewOpen] = useState(false)

  const hasTitle = Boolean(state.titleTheme?.sermonTitle?.trim())

  const sanitizeFilename = (str) =>
    (str || 'sermao').replace(/[^a-zA-ZÀ-ÿ0-9 ]/g, '').trim().replace(/\s+/g, '-').toLowerCase()

  const filename = `${sanitizeFilename(state.titleTheme?.sermonTitle)}-${state.preacherInfo?.date || 'sem-data'}.pdf`

  const handleReset = () => {
    if (window.confirm('Tem certeza que deseja limpar todo o formulário? Esta ação não pode ser desfeita.')) {
      clearState()
      dispatch({ type: 'RESET_STATE' })
    }
  }

  return (
    <>
      <header className={styles.header}>
        <div className={styles.brand}>
          <span className={styles.cross}>✝</span>
          <div>
            <span className={styles.title}>Planejador de Sermão</span>
            <span className={styles.subtitle}>Organize · Pregue · Inspire</span>
          </div>
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.btnSecondary}
            onClick={() => setPreviewOpen(true)}
            disabled={!hasTitle}
            title={!hasTitle ? 'Preencha o título do sermão para pré-visualizar' : ''}
          >
            <span>👁</span> Pré-visualizar PDF
          </button>

          {hasTitle ? (
            <PDFDownloadLink
              document={<SermonDocument state={state} />}
              fileName={filename}
              className={styles.btnPrimary}
            >
              {({ loading }) => (
                <>
                  <span>📄</span>
                  {loading ? 'Gerando...' : 'Exportar PDF'}
                </>
              )}
            </PDFDownloadLink>
          ) : (
            <button type="button" className={styles.btnPrimary} disabled>
              <span>📄</span> Exportar PDF
            </button>
          )}

          <button
            type="button"
            className={styles.btnDanger}
            onClick={handleReset}
            title="Limpar formulário"
          >
            🗑
          </button>
        </div>
      </header>

      <PDFPreviewModal
        isOpen={previewOpen}
        onClose={() => setPreviewOpen(false)}
        state={state}
        filename={filename}
      />
    </>
  )
}
