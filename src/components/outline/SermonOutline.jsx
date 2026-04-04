import { useRef } from 'react'
import { Modal } from '../ui/Modal'
import styles from './SermonOutline.module.css'

function hasText(str) {
  return Boolean(str?.trim())
}

export function SermonOutline({ isOpen, onClose, state, stats }) {
  const printRef = useRef(null)

  const handlePrint = () => {
    const content = printRef.current?.innerHTML
    if (!content) return
    const win = window.open('', '_blank')
    win.document.write(`<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <title>Esboço — ${state.titleTheme?.sermonTitle || 'Sermão'}</title>
  <style>
    body { font-family: Georgia, serif; max-width: 680px; margin: 40px auto; color: #1a2744; }
    h1 { font-size: 1.4rem; margin-bottom: 4px; }
    .meta { color: #666; font-size: 0.85rem; margin-bottom: 20px; }
    .section-title { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.1em; color: #999; margin: 18px 0 4px; font-family: Arial, sans-serif; }
    .verse-box { border-left: 3px solid #c9a84c; padding: 8px 14px; background: #fafaf7; margin: 8px 0 14px; font-style: italic; font-size: 0.95rem; }
    .point { margin: 10px 0 4px; font-weight: bold; }
    .point-num { display: inline-block; width: 22px; height: 22px; background: #1a2744; color: #c9a84c; border-radius: 50%; text-align: center; line-height: 22px; font-size: 0.75rem; margin-right: 8px; }
    .sub { margin-left: 36px; color: #444; font-size: 0.9rem; margin-top: 2px; }
    .sub::before { content: '• '; color: #c9a84c; }
    .conclusion { margin-top: 14px; font-size: 0.95rem; }
    hr { border: none; border-top: 1px solid #eee; margin: 20px 0; }
    @media print { body { margin: 20px; } }
  </style>
</head>
<body>${content}</body>
</html>`)
    win.document.close()
    win.focus()
    win.print()
    win.close()
  }

  if (!state) return null

  const { titleTheme, preacherInfo, introduction, mainPoints, conclusion } = state

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Esboço do Sermão">
      <div className={styles.toolbar}>
        <span className={styles.stats}>
          {stats?.words > 0 && `${stats.duration} · ${stats.words.toLocaleString('pt-BR')} palavras`}
        </span>
        <button type="button" className={styles.printBtn} onClick={handlePrint}>
          Imprimir Esboço
        </button>
      </div>

      <div ref={printRef} className={styles.outline}>
        <h1 className={styles.title}>{titleTheme?.sermonTitle || '—'}</h1>
        {(preacherInfo?.preacherName || preacherInfo?.date || preacherInfo?.church) && (
          <p className={styles.meta}>
            {[preacherInfo.preacherName, preacherInfo.church, preacherInfo.date].filter(Boolean).join(' · ')}
          </p>
        )}

        {hasText(titleTheme?.centralTheme) && (
          <>
            <p className={styles.sectionTitle}>Tema Central</p>
            <p className={styles.themeText}>{titleTheme.centralTheme}</p>
          </>
        )}

        {hasText(titleTheme?.keyVerse) && (
          <div className={styles.verseBox}>
            <p className={styles.verseText}>{titleTheme.keyVerse}</p>
          </div>
        )}

        {hasText(introduction?.openingHook) && (
          <>
            <p className={styles.sectionTitle}>Introdução</p>
            <p className={styles.bodyText}>{introduction.openingHook}</p>
          </>
        )}

        {mainPoints?.length > 0 && (
          <>
            <p className={styles.sectionTitle}>Pontos Principais</p>
            {mainPoints.map((pt, i) => (
              <div key={pt.id} className={styles.point}>
                <div className={styles.pointHeader}>
                  <span className={styles.pointNum}>{i + 1}</span>
                  <span className={styles.pointTitle}>{pt.pointTitle || `Ponto ${i + 1}`}</span>
                </div>
                {pt.subTopics?.filter(s => hasText(s.text)).map(s => (
                  <p key={s.id} className={styles.sub}>{s.text}</p>
                ))}
                {pt.biblicalRefs?.filter(r => hasText(r.text)).map(r => (
                  <p key={r.id} className={styles.bibleRef}>{r.text}</p>
                ))}
              </div>
            ))}
          </>
        )}

        {(hasText(conclusion?.closingText) || hasText(conclusion?.callToAction)) && (
          <>
            <hr className={styles.divider} />
            <p className={styles.sectionTitle}>Conclusão</p>
            {hasText(conclusion.closingText) && (
              <p className={styles.bodyText}>{conclusion.closingText}</p>
            )}
            {hasText(conclusion.callToAction) && (
              <p className={styles.callToAction}>{conclusion.callToAction}</p>
            )}
          </>
        )}
      </div>
    </Modal>
  )
}
