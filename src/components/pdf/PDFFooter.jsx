import { View, Text, StyleSheet } from '@react-pdf/renderer'
import { theme } from '../../styles/theme'

const s = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 50,
    right: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 0.5,
    borderTopColor: theme.colors.border,
    paddingTop: 8,
  },
  left: {
    fontFamily: theme.fonts.body,
    fontSize: 8,
    color: theme.colors.gray,
    fontStyle: 'italic',
  },
  center: {
    fontFamily: theme.fonts.body,
    fontSize: 8,
    color: theme.colors.gray,
  },
  right: {
    fontFamily: theme.fonts.body,
    fontSize: 8,
    color: theme.colors.gray,
  },
})

export function PDFFooter({ date }) {
  const formatDate = (d) => {
    if (!d) return ''
    const [y, m, day] = d.split('-')
    return `${day}/${m}/${y}`
  }

  return (
    <View style={s.footer} fixed>
      <Text style={s.left}>Planejador de Sermão</Text>
      <Text style={s.center} render={({ pageNumber, totalPages }) => `Página ${pageNumber} de ${totalPages}`} />
      <Text style={s.right}>{formatDate(date)}</Text>
    </View>
  )
}
