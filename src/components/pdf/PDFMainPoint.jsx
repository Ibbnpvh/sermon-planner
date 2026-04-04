import { View, Text, StyleSheet } from '@react-pdf/renderer'
import { theme } from '../../styles/theme'

const s = StyleSheet.create({
  wrapper: {
    marginBottom: 20,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
    gap: 8,
  },
  numberBadge: {
    width: 22,
    height: 22,
    backgroundColor: theme.colors.navy,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginTop: 1,
  },
  numberText: {
    fontFamily: theme.fonts.heading,
    fontSize: 9,
    fontWeight: 'bold',
    color: theme.colors.gold,
  },
  pointTitle: {
    fontFamily: theme.fonts.heading,
    fontSize: 13,
    fontWeight: 'bold',
    color: theme.colors.navy,
    flex: 1,
    lineHeight: 1.3,
  },
  // Sub-topics
  subTopicsBox: {
    borderLeftWidth: 3,
    borderLeftColor: theme.colors.gold,
    paddingLeft: 12,
    paddingVertical: 4,
    marginBottom: 8,
    marginLeft: 10,
  },
  subTopicRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    marginBottom: 4,
  },
  bullet: {
    color: theme.colors.gold,
    fontSize: 9,
    lineHeight: 1.6,
    flexShrink: 0,
  },
  subTopicText: {
    fontFamily: theme.fonts.body,
    fontSize: 10,
    color: theme.colors.black,
    flex: 1,
    lineHeight: 1.5,
  },
  // Biblical refs
  refsBox: {
    backgroundColor: '#f1f0ec',
    borderRadius: 4,
    padding: 10,
    marginBottom: 8,
    marginLeft: 10,
  },
  refLabel: {
    fontFamily: theme.fonts.heading,
    fontSize: 8,
    fontWeight: 'bold',
    color: theme.colors.gray,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  refText: {
    fontFamily: theme.fonts.body,
    fontSize: 10,
    fontStyle: 'italic',
    color: theme.colors.black,
    lineHeight: 1.5,
    marginBottom: 2,
  },
  // Illustrations
  illBox: {
    backgroundColor: theme.colors.lightGold,
    borderRadius: 4,
    padding: 10,
    marginBottom: 4,
    marginLeft: 10,
  },
  illTitle: {
    fontFamily: theme.fonts.body,
    fontSize: 10,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: theme.colors.navy,
    marginBottom: 4,
  },
  illBody: {
    fontFamily: theme.fonts.body,
    fontSize: 10,
    color: theme.colors.black,
    lineHeight: 1.5,
  },
  illLabel: {
    fontFamily: theme.fonts.heading,
    fontSize: 8,
    fontWeight: 'bold',
    color: '#7c5c00',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  divider: {
    height: 0.5,
    backgroundColor: theme.colors.border,
    marginTop: 16,
  },
})

export function PDFMainPoint({ point, index }) {
  const hasSubTopics = point.subTopics?.some(s => s.text?.trim())
  const hasRefs = point.biblicalRefs?.some(r => r.text?.trim())
  const hasIlls = point.illustrations?.some(i => i.title?.trim() || i.body?.trim())

  return (
    <View style={s.wrapper} wrap={false}>
      <View style={s.titleRow}>
        <View style={s.numberBadge}>
          <Text style={s.numberText}>{index + 1}</Text>
        </View>
        <Text style={s.pointTitle}>{point.pointTitle || `Ponto ${index + 1}`}</Text>
      </View>

      {hasSubTopics && (
        <View style={s.subTopicsBox}>
          {point.subTopics.filter(st => st.text?.trim()).map(st => (
            <View key={st.id} style={s.subTopicRow}>
              <Text style={s.bullet}>▸</Text>
              <Text style={s.subTopicText}>{st.text}</Text>
            </View>
          ))}
        </View>
      )}

      {hasRefs && (
        <View style={s.refsBox}>
          <Text style={s.refLabel}>Referências Bíblicas</Text>
          {point.biblicalRefs.filter(r => r.text?.trim()).map(r => (
            <Text key={r.id} style={s.refText}>{r.text}</Text>
          ))}
        </View>
      )}

      {hasIlls && (
        <View style={s.illBox}>
          <Text style={s.illLabel}>Ilustrações</Text>
          {point.illustrations.filter(i => i.title?.trim() || i.body?.trim()).map(i => (
            <View key={i.id}>
              {i.title?.trim() ? <Text style={s.illTitle}>{i.title}</Text> : null}
              {i.body?.trim()  ? <Text style={s.illBody}>{i.body}</Text>   : null}
            </View>
          ))}
        </View>
      )}

      <View style={s.divider} />
    </View>
  )
}
