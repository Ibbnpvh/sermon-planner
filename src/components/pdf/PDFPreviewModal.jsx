import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer'
import { Modal } from '../ui/Modal'
import { SermonDocument } from './SermonDocument'
import styles from './PDFPreviewModal.module.css'

export function PDFPreviewModal({ isOpen, onClose, state, stats, filename }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Pré-visualização do PDF" wide>
      <div className={styles.wrapper}>
        <PDFViewer className={styles.viewer} showToolbar={false}>
          <SermonDocument state={state} stats={stats} />
        </PDFViewer>
        <div className={styles.footer}>
          <PDFDownloadLink
            document={<SermonDocument state={state} stats={stats} />}
            fileName={filename}
            className={styles.downloadBtn}
          >
            {({ loading }) => loading ? 'Preparando PDF...' : '⬇ Baixar PDF'}
          </PDFDownloadLink>
        </div>
      </div>
    </Modal>
  )
}
