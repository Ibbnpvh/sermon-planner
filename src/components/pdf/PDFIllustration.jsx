import { View, Text, StyleSheet } from '@react-pdf/renderer'
import { theme } from '../../styles/theme'

const s = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
    padding: 14,
    backgroundColor: theme.colors.lightGold,
    borderRadius: 4,
    borderLeftWidth: 3,
    borderLeftColor: theme.colors.gold,
  },
  title: {
    fontFamily: theme.fonts.body,
    fontSize: 11,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: theme.colors.navy,
    marginBottom: 6,
  },
  body: {
    fontFamily: theme.fonts.body,
    fontSize: 10,
    color: theme.colors.black,
    lineHeight: 1.6,
  },
})

export function PDFIllustration({ illustration }) {
  return (
    <View style={s.wrapper} wrap={false}>
      {illustration.title?.trim() ? <Text style={s.title}>{illustration.title}</Text> : null}
      {illustration.body?.trim()  ? <Text style={s.body}>{illustration.body}</Text>   : null}
    </View>
  )
}
