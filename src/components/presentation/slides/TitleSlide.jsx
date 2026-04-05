import styles from './Slides.module.css'

export function TitleSlide({ data, preacherInfo, fontSize }) {
  const scale = fontSize ?? 1
  return (
    <div className={styles.slide}>
      <div className={styles.titleSlideContent}>
        {preacherInfo.series && (
          <p className={styles.seriesLabel} style={{ fontSize: `${0.85 * scale}rem` }}>
            {preacherInfo.series}
          </p>
        )}
        {data.centralTheme && (
          <p className={styles.centralTheme} style={{ fontSize: `${1.1 * scale}rem` }}>
            {data.centralTheme}
          </p>
        )}
        <h1 className={styles.sermonTitle} style={{ fontSize: `${3.2 * scale}rem` }}>
          {data.sermonTitle || 'Sermão'}
        </h1>
        {(data.keyVerse || data.keyVerseReference) && (
          <div className={styles.verseBlock}>
            {data.keyVerse && (
              <p className={styles.verseText} style={{ fontSize: `${1.25 * scale}rem` }}>
                "{data.keyVerse}"
              </p>
            )}
            {data.keyVerseReference && (
              <p className={styles.verseRef} style={{ fontSize: `${1 * scale}rem` }}>
                — {data.keyVerseReference}
              </p>
            )}
          </div>
        )}
        {(preacherInfo.preacherName || preacherInfo.date) && (
          <p className={styles.preacherMeta} style={{ fontSize: `${0.9 * scale}rem` }}>
            {[preacherInfo.preacherName, preacherInfo.church, preacherInfo.date]
              .filter(Boolean)
              .join(' · ')}
          </p>
        )}
      </div>
    </div>
  )
}
