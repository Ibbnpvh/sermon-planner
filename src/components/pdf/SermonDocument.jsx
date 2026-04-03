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

export function SermonDocument({ state }) {
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
      <PDFCoverPage state={state} />

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
