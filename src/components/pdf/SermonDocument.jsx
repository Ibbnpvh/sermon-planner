import '../../utils/pdfFonts'
import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer'
import { theme } from '../../styles/theme'
import { PDFCoverPage } from './PDFCoverPage'
import { PDFSectionHeader } from './PDFSectionHeader'
import { PDFMainPoint } from './PDFMainPoint'
import { PDFIllustration } from './PDFIllustration'
import { PDFFooter } from './PDFFooter'

const PAGE = {
  size: 'A4',
  style: StyleSheet.create({
    page: {
      backgroundColor: theme.colors.white,
      paddingTop: 50,
      paddingBottom: 70,
      paddingHorizontal: 50,
      fontFamily: theme.fonts.body,
    },
    label: {
      fontFamily: theme.fonts.heading,
      fontSize: 8,
      fontWeight: 'bold',
      color: theme.colors.gray,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      marginBottom: 6,
    },
    bodyText: {
      fontFamily: theme.fonts.body,
      fontSize: 11,
      color: theme.colors.black,
      lineHeight: 1.6,
      marginBottom: 14,
    },
    subSection: {
      marginBottom: 16,
    },
    verseBox: {
      borderLeftWidth: 4,
      borderLeftColor: theme.colors.gold,
      backgroundColor: theme.colors.offWhite,
      padding: 12,
      marginBottom: 16,
      borderRadius: 2,
    },
    verseText: {
      fontFamily: theme.fonts.body,
      fontSize: 11,
      fontStyle: 'italic',
      color: theme.colors.black,
      lineHeight: 1.6,
      marginBottom: 4,
    },
    verseRef: {
      fontFamily: theme.fonts.heading,
      fontSize: 10,
      fontWeight: 'bold',
      color: theme.colors.navy,
      textAlign: 'right',
    },
    refList: {
      paddingLeft: 12,
    },
    refItem: {
      fontFamily: theme.fonts.body,
      fontSize: 10,
      color: theme.colors.black,
      lineHeight: 1.5,
      marginBottom: 4,
    },
    noContent: {
      fontFamily: theme.fonts.body,
      fontSize: 10,
      fontStyle: 'italic',
      color: theme.colors.gray,
    },
  }),
}

const s = PAGE.style

function hasText(str) {
  return Boolean(str?.trim())
}

const roteiroStyles = StyleSheet.create({
  page: {
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingBottom: 70,
    paddingHorizontal: 50,
    fontFamily: theme.fonts.body,
  },
  heading: {
    fontFamily: theme.fonts.heading,
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.navy,
    marginBottom: 4,
  },
  subheading: {
    fontFamily: theme.fonts.body,
    fontSize: 10,
    fontStyle: 'italic',
    color: theme.colors.gray,
    marginBottom: 20,
  },
  label: {
    fontFamily: theme.fonts.heading,
    fontSize: 7,
    fontWeight: 'bold',
    color: theme.colors.gray,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#e8e0d0',
  },
  numBox: {
    width: 20,
    height: 20,
    backgroundColor: theme.colors.navy,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    flexShrink: 0,
    marginTop: 1,
  },
  numText: {
    fontFamily: theme.fonts.heading,
    fontSize: 9,
    fontWeight: 'bold',
    color: theme.colors.gold,
  },
  rowContent: {
    flex: 1,
  },
  pointTitle: {
    fontFamily: theme.fonts.heading,
    fontSize: 12,
    fontWeight: 'bold',
    color: theme.colors.navy,
    marginBottom: 2,
  },
  sub: {
    fontFamily: theme.fonts.body,
    fontSize: 9,
    color: '#555',
    marginLeft: 4,
    lineHeight: 1.4,
    marginBottom: 1,
  },
  verseBox: {
    borderLeftWidth: 3,
    borderLeftColor: theme.colors.gold,
    backgroundColor: theme.colors.offWhite,
    padding: 8,
    marginBottom: 14,
  },
  verseText: {
    fontFamily: theme.fonts.body,
    fontSize: 10,
    fontStyle: 'italic',
    color: theme.colors.black,
    lineHeight: 1.5,
  },
  introText: {
    fontFamily: theme.fonts.body,
    fontSize: 10,
    color: '#333',
    lineHeight: 1.5,
    marginBottom: 14,
  },
  conclusionBox: {
    backgroundColor: theme.colors.offWhite,
    borderLeftWidth: 3,
    borderLeftColor: theme.colors.navy,
    padding: 10,
    marginTop: 6,
  },
  conclusionText: {
    fontFamily: theme.fonts.body,
    fontSize: 10,
    color: theme.colors.navy,
    lineHeight: 1.5,
  },
  divider: {
    borderTopWidth: 0.5,
    borderTopColor: theme.colors.gold,
    marginVertical: 12,
  },
})

const rs = roteiroStyles

function RoteiroRapido({ state, stats }) {
  const { titleTheme, introduction, mainPoints, conclusion } = state
  const duration = stats?.duration && stats.duration !== '—' ? stats.duration : null

  return (
    <Page size="A4" style={rs.page}>
      <Text style={rs.heading}>{titleTheme?.sermonTitle || 'Sermão'}</Text>
      <Text style={rs.subheading}>
        Roteiro Rápido{duration ? ` · ${duration}` : ''}
      </Text>

      {titleTheme?.keyVerse ? (
        <View style={rs.verseBox}>
          <Text style={rs.verseText}>"{titleTheme.keyVerse}"</Text>
        </View>
      ) : null}

      {introduction?.openingHook ? (
        <>
          <Text style={rs.label}>Introdução</Text>
          <Text style={rs.introText}>{introduction.openingHook}</Text>
        </>
      ) : null}

      {(mainPoints ?? []).length > 0 && (
        <>
          <Text style={rs.label}>Pontos</Text>
          {mainPoints.map((pt, i) => (
            <View key={pt.id} style={rs.row}>
              <View style={rs.numBox}>
                <Text style={rs.numText}>{i + 1}</Text>
              </View>
              <View style={rs.rowContent}>
                <Text style={rs.pointTitle}>{pt.pointTitle || `Ponto ${i + 1}`}</Text>
                {(pt.subTopics ?? []).filter(s => s.text?.trim()).map(s => (
                  <Text key={s.id} style={rs.sub}>• {s.text}</Text>
                ))}
              </View>
            </View>
          ))}
        </>
      )}

      {(conclusion?.closingText || conclusion?.callToAction) && (
        <>
          <View style={rs.divider} />
          <Text style={rs.label}>Conclusão</Text>
          <View style={rs.conclusionBox}>
            {conclusion.closingText ? (
              <Text style={rs.conclusionText}>{conclusion.closingText}</Text>
            ) : null}
            {conclusion.callToAction ? (
              <Text style={[rs.conclusionText, { fontWeight: 'bold', marginTop: 6 }]}>
                {conclusion.callToAction}
              </Text>
            ) : null}
          </View>
        </>
      )}
    </Page>
  )
}

export function SermonDocument({ state, stats }) {
  const { preacherInfo, titleTheme, introduction, mainPoints, illustrations, conclusion, references } = state

  const standaloneIllustrations = illustrations.filter(i => !i.linkedPointId)

  return (
    <Document
      title={titleTheme.sermonTitle || 'Sermão'}
      author={preacherInfo.preacherName || ''}
      subject={titleTheme.centralTheme || ''}
      language="pt-BR"
    >
      {/* Capa */}
      <PDFCoverPage state={state} stats={stats} />

      {/* Roteiro Rápido */}
      <RoteiroRapido state={state} stats={stats} />

      {/* Introdução */}
      {(hasText(introduction.openingHook) || hasText(introduction.context) || hasText(introduction.transition)) && (
        <Page size="A4" style={s.page}>
          <PDFSectionHeader title="Introdução" />
          {hasText(introduction.openingHook) && (
            <View style={s.subSection}>
              <Text style={s.label}>Gancho de Abertura</Text>
              <Text style={s.bodyText}>{introduction.openingHook}</Text>
            </View>
          )}
          {hasText(introduction.context) && (
            <View style={s.subSection}>
              <Text style={s.label}>Contexto e Apresentação</Text>
              <Text style={s.bodyText}>{introduction.context}</Text>
            </View>
          )}
          {hasText(introduction.transition) && (
            <View style={s.subSection}>
              <Text style={s.label}>Transição para o Tema</Text>
              <Text style={s.bodyText}>{introduction.transition}</Text>
            </View>
          )}
          <PDFFooter date={preacherInfo.date} />
        </Page>
      )}

      {/* Pontos Principais */}
      {mainPoints.length > 0 && (
        <Page size="A4" style={s.page}>
          <PDFSectionHeader title="Pontos Principais" />
          {mainPoints.map((pt, i) => (
            <PDFMainPoint key={pt.id} point={pt} index={i} />
          ))}
          <PDFFooter date={preacherInfo.date} />
        </Page>
      )}

      {/* Ilustrações Standalone */}
      {standaloneIllustrations.filter(i => hasText(i.title) || hasText(i.body)).length > 0 && (
        <Page size="A4" style={s.page}>
          <PDFSectionHeader title="Ilustrações e Histórias" />
          {standaloneIllustrations
            .filter(i => hasText(i.title) || hasText(i.body))
            .map(ill => (
              <PDFIllustration key={ill.id} illustration={ill} />
            ))}
          <PDFFooter date={preacherInfo.date} />
        </Page>
      )}

      {/* Conclusão */}
      {(hasText(conclusion.closingText) || hasText(conclusion.callToAction) || hasText(conclusion.finalPrayer)) && (
        <Page size="A4" style={s.page}>
          <PDFSectionHeader title="Conclusão e Aplicação" />
          {hasText(conclusion.closingText) && (
            <View style={s.subSection}>
              <Text style={s.label}>Encerramento</Text>
              <Text style={s.bodyText}>{conclusion.closingText}</Text>
            </View>
          )}
          {hasText(conclusion.callToAction) && (
            <View style={s.subSection}>
              <Text style={s.label}>Chamado à Ação</Text>
              <Text style={s.bodyText}>{conclusion.callToAction}</Text>
            </View>
          )}
          {hasText(conclusion.finalPrayer) && (
            <View style={s.subSection}>
              <Text style={s.label}>Oração Final</Text>
              <Text style={s.bodyText}>{conclusion.finalPrayer}</Text>
            </View>
          )}
          <PDFFooter date={preacherInfo.date} />
        </Page>
      )}

      {/* Referências */}
      {references.filter(r => hasText(r.citation)).length > 0 && (
        <Page size="A4" style={s.page}>
          <PDFSectionHeader title="Referências Bibliográficas" />
          <View style={s.refList}>
            {references.filter(r => hasText(r.citation)).map((ref, i) => (
              <Text key={ref.id} style={s.refItem}>{i + 1}. {ref.citation}</Text>
            ))}
          </View>
          <PDFFooter date={preacherInfo.date} />
        </Page>
      )}
    </Document>
  )
}
