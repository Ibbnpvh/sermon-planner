// Average speaking rate in words per minute
const WPM = 130

function countStr(str) {
  if (!str || typeof str !== 'string') return 0
  return str.trim().split(/\s+/).filter(Boolean).length
}

export function useSermonStats(state) {
  if (!state) return { words: 0, duration: '—', sections: {} }

  const { titleTheme, introduction, mainPoints, illustrations, conclusion } = state

  const titleWords = countStr(titleTheme?.sermonTitle) + countStr(titleTheme?.centralTheme) + countStr(titleTheme?.keyVerse)

  const introWords =
    countStr(introduction?.openingHook) +
    countStr(introduction?.context) +
    countStr(introduction?.transition)

  const pointsWords = (mainPoints ?? []).reduce((acc, p) => {
    let w = countStr(p.pointTitle)
    w += (p.subTopics ?? []).reduce((a, s) => a + countStr(s.text), 0)
    w += (p.biblicalRefs ?? []).reduce((a, r) => a + countStr(r.text), 0)
    w += (p.illustrations ?? []).reduce((a, i) => a + countStr(i.title) + countStr(i.body), 0)
    return acc + w
  }, 0)

  const illusWords = (illustrations ?? []).reduce(
    (acc, i) => acc + countStr(i.title) + countStr(i.body), 0
  )

  const conclusionWords =
    countStr(conclusion?.closingText) +
    countStr(conclusion?.callToAction) +
    countStr(conclusion?.finalPrayer)

  const total = titleWords + introWords + pointsWords + illusWords + conclusionWords
  const minutes = Math.round(total / WPM)

  let duration
  if (total === 0) duration = '—'
  else if (minutes < 1) duration = '< 1 min'
  else duration = `~${minutes} min`

  return {
    words: total,
    duration,
    sections: {
      title: titleWords,
      intro: introWords,
      points: pointsWords,
      illustrations: illusWords,
      conclusion: conclusionWords,
    },
  }
}
