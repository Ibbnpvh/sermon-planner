function hasText(str) {
  return Boolean(str?.trim())
}

/**
 * Builds a flat slides array from the sermon state.
 * Each slide has: { type, data, ...extraProps }
 */
export function buildSlides(state) {
  if (!state) return []
  const slides = []

  // 1. Title slide — always present
  slides.push({
    type: 'title',
    data: state.titleTheme ?? {},
    preacherInfo: state.preacherInfo ?? {},
  })

  // 2. Introduction — if any content
  const intro = state.introduction ?? {}
  if (hasText(intro.openingHook) || hasText(intro.context) || hasText(intro.transition)) {
    slides.push({ type: 'intro', data: intro })
  }

  // 3. One slide per main point
  const points = state.mainPoints ?? []
  points.forEach((pt, i) => {
    if (hasText(pt.pointTitle) || pt.subTopics?.some(s => hasText(s.text))) {
      slides.push({
        type: 'point',
        data: pt,
        index: i,
        total: points.length,
      })
    }
  })

  // 4. Conclusion
  const conc = state.conclusion ?? {}
  if (hasText(conc.closingText) || hasText(conc.callToAction)) {
    slides.push({ type: 'conclusion', data: conc })
  }

  // 5. Final prayer (separate slide)
  if (hasText(conc.finalPrayer)) {
    slides.push({ type: 'prayer', data: { text: conc.finalPrayer } })
  }

  return slides
}
