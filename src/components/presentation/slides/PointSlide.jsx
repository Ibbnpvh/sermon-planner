import styles from './Slides.module.css'

export function PointSlide({ data, index, total, fontSize }) {
  const scale = fontSize ?? 1
  const subTopics = (data.subTopics ?? []).filter(s => s.text?.trim())
  const biblicalRefs = (data.biblicalRefs ?? []).filter(r => r.text?.trim())

  return (
    <div className={styles.slide}>
      <div className={styles.pointSlideContent}>
        <div className={styles.pointBadge} style={{ fontSize: `${0.85 * scale}rem` }}>
          <span className={styles.pointNum}>{index + 1}</span>
          <span className={styles.pointOf}>de {total}</span>
        </div>
        <h2 className={styles.pointTitle} style={{ fontSize: `${2.6 * scale}rem` }}>
          {data.pointTitle || `Ponto ${index + 1}`}
        </h2>
        {subTopics.length > 0 && (
          <ul className={styles.subList}>
            {subTopics.map(s => (
              <li key={s.id} className={styles.subItem} style={{ fontSize: `${1.5 * scale}rem` }}>
                {s.text}
              </li>
            ))}
          </ul>
        )}
        {biblicalRefs.length > 0 && (
          <div className={styles.refList}>
            {biblicalRefs.map(r => (
              <p key={r.id} className={styles.refItem} style={{ fontSize: `${1.1 * scale}rem` }}>
                {r.text}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
