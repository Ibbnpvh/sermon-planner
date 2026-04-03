import { View, Text, Svg, Line, StyleSheet } from '@react-pdf/renderer'
import { theme } from '../../styles/theme'

const s = StyleSheet.create({
  wrapper: {
    marginBottom: 14,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  title: {
    fontFamily: theme.fonts.heading,
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.navy,
    letterSpacing: 0.5,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})

export function PDFSectionHeader({ title }) {
  return (
    <View style={s.wrapper}>
      <View style={s.row}>
        <Text style={s.title}>{title}</Text>
      </View>
      {/* Ornamental divider: line ◆ line */}
      <Svg height="8" style={{ width: '100%' }}>
        <Line x1="0" y1="4" x2="200" y2="4" strokeWidth={0.8} stroke={theme.colors.gold} />
        <Line x1="210" y1="4" x2="410" y2="4" strokeWidth={0.8} stroke={theme.colors.gold} />
      </Svg>
    </View>
  )
}
