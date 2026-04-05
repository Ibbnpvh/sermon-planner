/**
 * Calculates how complete a sermon is based on filled key sections.
 * Returns { filled, total, percent, sections }
 */
export function useSermonProgress(state) {
  if (!state) return { filled: 0, total: 8, percent: 0, sections: {} }

  const has = (str) => Boolean(str?.trim())

  const sections = {
    pregador:      has(state.preacherInfo?.preacherName),
    titulo:        has(state.titleTheme?.sermonTitle),
    tema:          has(state.titleTheme?.centralTheme) || has(state.titleTheme?.keyVerse),
    introducao:    has(state.introduction?.openingHook),
    pontos:        (state.mainPoints?.filter(p => has(p.pointTitle)).length ?? 0) >= 1,
    subTopicos:    (state.mainPoints?.some(p => p.subTopics?.some(s => has(s.text)))) ?? false,
    conclusao:     has(state.conclusion?.closingText) || has(state.conclusion?.callToAction),
    oracao:        has(state.conclusion?.finalPrayer),
  }

  const filled = Object.values(sections).filter(Boolean).length
  const total = Object.keys(sections).length
  const percent = Math.round((filled / total) * 100)

  return { filled, total, percent, sections }
}
