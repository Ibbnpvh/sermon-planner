import { Page, View, Text, Svg, Line, StyleSheet } from '@react-pdf/renderer'
import { theme } from '../../styles/theme'

const s = StyleSheet.create({
  page: {
    backgroundColor: theme.colors.offWhite,
    paddingTop: 0,
    paddingBottom: 0,
    paddingHorizontal: 0,
    fontFamily: theme.fonts.body,
  },
  topRule: {
    height: 6,
    backgroundColor: theme.colors.gold,
  },
  inner: {
    flex: 1,
    paddingHorizontal: 60,
    paddingTop: 50,
    paddingBottom: 50,
    flexDirection: 'column',
    alignItems: 'center',
  },
  logoBox: {
    width: 80,
    height: 80,
    borderWidth: 2,
    borderColor: theme.colors.navy,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  logoText: {
    fontFamily: theme.fonts.heading,
    fontSize: 36,
    color: theme.colors.navy,
    fontWeight: 'bold',
  },
  ornamentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
    width: '100%',
  },
  ornamentLine: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.gold,
  },
  ornamentDiamond: {
    marginHorizontal: 10,
    fontFamily: theme.fonts.heading,
    fontSize: 12,
    color: theme.colors.gold,
  },
  sermonTitle: {
    fontFamily: theme.fonts.heading,
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.navy,
    textAlign: 'center',
    lineHeight: 1.3,
    marginBottom: 10,
  },
  centralTheme: {
    fontFamily: theme.fonts.body,
    fontSize: 13,
    fontStyle: 'italic',
    color: theme.colors.gray,
    textAlign: 'center',
    marginBottom: 32,
  },
  verseBox: {
    width: '100%',
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.gold,
    backgroundColor: theme.colors.white,
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginBottom: 40,
    borderRadius: 2,
  },
  verseText: {
    fontFamily: theme.fonts.body,
    fontSize: 11,
    fontStyle: 'italic',
    color: theme.colors.black,
    lineHeight: 1.6,
    marginBottom: 6,
  },
  verseRef: {
    fontFamily: theme.fonts.heading,
    fontSize: 10,
    fontWeight: 'bold',
    color: theme.colors.navy,
    textAlign: 'right',
  },
  infoSection: {
    width: '100%',
    borderTopWidth: 0.5,
    borderTopColor: theme.colors.border,
    paddingTop: 20,
    marginTop: 'auto',
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 0,
  },
  infoCell: {
    width: '50%',
    paddingVertical: 6,
    paddingHorizontal: 0,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 0,
  },
  infoLabel: {
    fontFamily: theme.fonts.body,
    fontSize: 9,
    fontWeight: 'bold',
    color: theme.colors.gray,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    width: 70,
  },
  infoValue: {
    fontFamily: theme.fonts.body,
    fontSize: 11,
    color: theme.colors.navy,
    flex: 1,
  },
  bottomRule: {
    height: 4,
    backgroundColor: theme.colors.navy,
  },
})

function formatDate(d) {
  if (!d) return '—'
  const [y, m, day] = d.split('-')
  return `${day}/${m}/${y}`
}

export function PDFCoverPage({ state, stats }) {
  const { preacherInfo, titleTheme } = state
  const duration = stats?.duration && stats.duration !== '—' ? stats.duration : null

  return (
    <Page size="A4" style={s.page}>
      <View style={s.topRule} />
      <View style={s.inner}>
        {/* Logo placeholder */}
        <View style={s.logoBox}>
          <Text style={s.logoText}>✝</Text>
        </View>

        {/* Ornamental divider */}
        <View style={s.ornamentRow}>
          <View style={s.ornamentLine} />
          <Text style={s.ornamentDiamond}>◆</Text>
          <View style={s.ornamentLine} />
        </View>

        {/* Series */}
        {preacherInfo.series ? (
          <Text style={s.centralTheme}>{preacherInfo.series}</Text>
        ) : null}

        {/* Sermon Title */}
        <Text style={s.sermonTitle}>
          {titleTheme.sermonTitle || 'Título do Sermão'}
        </Text>

        {/* Central Theme */}
        {titleTheme.centralTheme ? (
          <Text style={s.centralTheme}>{titleTheme.centralTheme}</Text>
        ) : null}

        {/* Key Verse */}
        {(titleTheme.keyVerse || titleTheme.keyVerseReference) ? (
          <View style={s.verseBox}>
            {titleTheme.keyVerse ? <Text style={s.verseText}>"{titleTheme.keyVerse}"</Text> : null}
            {titleTheme.keyVerseReference ? <Text style={s.verseRef}>— {titleTheme.keyVerseReference}</Text> : null}
          </View>
        ) : null}

        {/* Preacher Info */}
        <View style={s.infoSection}>
          <View style={s.infoGrid}>
            {preacherInfo.preacherName ? (
              <View style={s.infoCell}>
                <Text style={s.infoLabel}>Pregador</Text>
                <Text style={s.infoValue}>{preacherInfo.preacherName}</Text>
              </View>
            ) : null}
            {preacherInfo.date ? (
              <View style={s.infoCell}>
                <Text style={s.infoLabel}>Data</Text>
                <Text style={s.infoValue}>{formatDate(preacherInfo.date)}</Text>
              </View>
            ) : null}
            {preacherInfo.church ? (
              <View style={s.infoCell}>
                <Text style={s.infoLabel}>Igreja</Text>
                <Text style={s.infoValue}>{preacherInfo.church}</Text>
              </View>
            ) : null}
            {preacherInfo.location ? (
              <View style={s.infoCell}>
                <Text style={s.infoLabel}>Local</Text>
                <Text style={s.infoValue}>{preacherInfo.location}</Text>
              </View>
            ) : null}
            {preacherInfo.occasion ? (
              <View style={s.infoCell}>
                <Text style={s.infoLabel}>Ocasião</Text>
                <Text style={s.infoValue}>{preacherInfo.occasion}</Text>
              </View>
            ) : null}
            {duration ? (
              <View style={s.infoCell}>
                <Text style={s.infoLabel}>Duração aprox.</Text>
                <Text style={s.infoValue}>{duration}</Text>
              </View>
            ) : null}
          </View>
        </View>
      </View>
      <View style={s.bottomRule} />
    </Page>
  )
}
