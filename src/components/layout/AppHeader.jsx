import { useState } from 'react'
import { PDFDownloadLink } from '@react-pdf/renderer'
import {
  Eye, FileDown, Presentation, FileText,
  Save, Trash2, Timer, Cross,
} from 'lucide-react'
import { useSermon } from '../../context/SermonContext'
import { SermonDocument } from '../pdf/SermonDocument'
import { PDFPreviewModal } from '../pdf/PDFPreviewModal'
import { SermonOutline } from '../outline/SermonOutline'
import { PresentationMode } from '../presentation/PresentationMode'
import { useSermonStats } from '../../hooks/useSermonStats'
import { exportSermonJSON } from '../../utils/exportImport'
import styles from './AppHeader.module.css'

export function AppHeader() {
  const { state, dispatch, saveStatus } = useSermon()
  const [previewOpen, setPreviewOpen] = useState(false)
  const [outlineOpen, setOutlineOpen] = useState(false)
  const [presentMode, setPresentMode] = useState(false)

  const hasTitle = Boolean(state.titleTheme?.sermonTitle?.trim())
  const stats = useSermonStats(state)

  const sanitizeFilename = (str) =>
    (str || 'sermao').replace(/[^a-zA-ZÀ-ÿ0-9 ]/g, '').trim().replace(/\s+/g, '-').toLowerCase()

  const filename = `${sanitizeFilename(state.titleTheme?.sermonTitle)}-${state.preacherInfo?.date || 'sem-data'}.pdf`

  const handleReset = () => {
    if (window.confirm('Tem certeza que deseja limpar todo o formulário? Esta ação não pode ser desfeita.')) {
      dispatch({ type: 'RESET_STATE' })
    }
  }

  return (
    <>
      <header className={styles.header}>
        {/* Brand */}
        <div className={styles.brand}>
          <div className={styles.brandIcon}>
            <Cross size={20} strokeWidth={2.5} />
          </div>
          <div className={styles.brandText}>
            <span className={styles.title}>Planejador de Sermão</span>
            <span className={styles.subtitle}>Organize · Pregue · Inspire</span>
          </div>
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          {/* Save status */}
          {saveStatus === 'saving' && (
            <span className={styles.saveStatus} data-status="saving">
              <span className={styles.saveDot} />
              Salvando…
            </span>
          )}
          {saveStatus === 'saved' && (
            <span className={styles.saveStatus} data-status="saved">
              <Save size={11} />
              Salvo
            </span>
          )}

          {/* Stats badge */}
          {stats.words > 0 && (
            <span className={styles.statsBadge} title={`${stats.words.toLocaleString('pt-BR')} palavras`}>
              <Timer size={13} />
              {stats.duration}
              <span className={styles.statsDiv}>·</span>
              <span className={styles.statsWords}>{stats.words.toLocaleString('pt-BR')} palavras</span>
            </span>
          )}

          {/* Apresentar */}
          <button
            type="button"
            className={styles.btnPresent}
            onClick={() => setPresentMode(true)}
            disabled={!hasTitle}
            title={!hasTitle ? 'Preencha o título do sermão para apresentar' : 'Modo Apresentação — tela cheia (Ctrl+P)'}
          >
            <Presentation size={15} />
            <span>Apresentar</span>
          </button>

          {/* Esboço */}
          <button
            type="button"
            className={styles.btnOutline}
            onClick={() => setOutlineOpen(true)}
            disabled={!hasTitle}
            title={!hasTitle ? 'Preencha o título do sermão' : 'Ver esboço do sermão'}
          >
            <FileText size={15} />
            <span>Esboço</span>
          </button>

          {/* Pré-visualizar PDF */}
          <button
            type="button"
            className={styles.btnSecondary}
            onClick={() => setPreviewOpen(true)}
            disabled={!hasTitle}
            title={!hasTitle ? 'Preencha o título do sermão para pré-visualizar' : 'Pré-visualizar PDF'}
          >
            <Eye size={15} />
            <span>Visualizar PDF</span>
          </button>

          {/* Exportar PDF */}
          {hasTitle ? (
            <PDFDownloadLink
              document={<SermonDocument state={state} stats={stats} />}
              fileName={filename}
              className={styles.btnPrimary}
            >
              {({ loading }) => (
                <>
                  <FileDown size={15} />
                  <span>{loading ? 'Gerando…' : 'Exportar PDF'}</span>
                </>
              )}
            </PDFDownloadLink>
          ) : (
            <button type="button" className={styles.btnPrimary} disabled>
              <FileDown size={15} />
              <span>Exportar PDF</span>
            </button>
          )}

          {/* Backup JSON */}
          <button
            type="button"
            className={styles.btnIcon}
            onClick={() => exportSermonJSON(state)}
            disabled={!hasTitle}
            title="Baixar cópia de segurança (.json)"
          >
            <Save size={16} />
          </button>

          {/* Reset */}
          <button
            type="button"
            className={styles.btnDanger}
            onClick={handleReset}
            title="Limpar formulário"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </header>

      <PDFPreviewModal
        isOpen={previewOpen}
        onClose={() => setPreviewOpen(false)}
        state={state}
        stats={stats}
        filename={filename}
      />

      <SermonOutline
        isOpen={outlineOpen}
        onClose={() => setOutlineOpen(false)}
        state={state}
        stats={stats}
      />

      <PresentationMode
        isOpen={presentMode}
        onClose={() => setPresentMode(false)}
        state={state}
        stats={stats}
      />
    </>
  )
}
