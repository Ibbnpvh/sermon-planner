import styles from './Slides.module.css'

const LABELS = {
  intro: 'Introdução',
  conclusion: 'Conclusão',
  prayer: 'Oração Final',
}

export function TextSlide({ type, data, fontSize }) {
  const scale = fontSize ?? 1
  const label = LABELS[type] ?? ''

  // Build list of content blocks based on type
  const blocks = []

  if (type === 'intro') {
    if (data.openingHook?.trim()) blocks.push({ key: 'hook', text: data.openingHook })
    if (data.context?.trim()) blocks.push({ key: 'ctx', text: data.context })
  } else if (type === 'conclusion') {
    if (data.closingText?.trim()) blocks.push({ key: 'close', text: data.closingText })
    if (data.callToAction?.trim()) blocks.push({ key: 'cta', text: data.callToAction, highlight: true })
  } else if (type === 'prayer') {
    if (data.text?.trim()) blocks.push({ key: 'prayer', text: data.text })
  }

  return (
    <div className={styles.slide}>
      <div className={styles.textSlideContent}>
        <p className={styles.slideLabel} style={{ fontSize: `${0.85 * scale}rem` }}>
          {label}
        </p>
        {blocks.map(b => (
          <p
            key={b.key}
            className={b.highlight ? styles.highlightText : styles.bodyText}
            style={{ fontSize: `${1.6 * scale}rem` }}
          >
            {b.text}
          </p>
        ))}
      </div>
    </div>
  )
}
