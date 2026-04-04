import { generateId } from '../utils/generateId'

// Each template factory returns a full state object
// with pre-filled structural guidance for the preacher.

export const TEMPLATE_META = [
  {
    id: 'blank',
    label: 'Em branco',
    icon: '📄',
    description: 'Começa do zero, sem estrutura pré-definida.',
  },
  {
    id: 'expositivo',
    label: 'Expositivo',
    icon: '📖',
    description: 'Passa por um trecho bíblico versículo por versículo, explicando o texto.',
  },
  {
    id: 'tematico',
    label: 'Temático',
    icon: '✝️',
    description: 'Desenvolve um tema central com 3 pontos de apoio e aplicação prática.',
  },
  {
    id: 'narrativo',
    label: 'Narrativo',
    icon: '📜',
    description: 'Conta uma história bíblica com desenvolvimento dramático e lição.',
  },
  {
    id: 'evangelistico',
    label: 'Evangelístico',
    icon: '🕊️',
    description: 'Apresenta o evangelho com clareza e termina com chamado ao compromisso.',
  },
]

function makePoint(title, subtopics = []) {
  return {
    id: generateId(),
    pointTitle: title,
    subTopics: subtopics.map(t => ({ id: generateId(), text: t })),
    biblicalRefs: [],
    illustrations: [],
  }
}

export function createTemplate(id) {
  const base = {
    preacherInfo: { preacherName: '', date: '', location: '', occasion: '' },
    titleTheme: { sermonTitle: '', centralTheme: '', keyVerse: '', keyVerseReference: '' },
    introduction: { openingHook: '', context: '', transition: '' },
    mainPoints: [],
    illustrations: [],
    conclusion: { closingText: '', callToAction: '', finalPrayer: '' },
    references: [],
    personalNotes: '',
  }

  switch (id) {
    case 'expositivo':
      return {
        ...base,
        titleTheme: {
          ...base.titleTheme,
          centralTheme: 'Exposição do texto bíblico escolhido',
        },
        introduction: {
          openingHook: 'Contextualize o livro e o autor. Por que este texto é relevante hoje?',
          context: 'Apresente o contexto histórico, cultural e literário da passagem.',
          transition: 'Leia o texto em voz alta e apresente a mensagem central que ele comunica.',
        },
        mainPoints: [
          makePoint('O que o texto diz (Observação)', [
            'Identifique os personagens, ações e contexto do trecho',
            'Destaque palavras-chave no idioma original, se possível',
          ]),
          makePoint('O que o texto significa (Interpretação)', [
            'Qual era o significado para o ouvinte original?',
            'Como se encaixa no arco da redenção bíblica?',
          ]),
          makePoint('O que o texto exige de nós (Aplicação)', [
            'Aplicação prática para a vida diária',
            'Um passo concreto que a congregação pode dar esta semana',
          ]),
        ],
        conclusion: {
          closingText: 'Reafirme a mensagem central do texto em uma frase.',
          callToAction: 'Convide a congregação a agir com base no que aprenderam.',
          finalPrayer: 'Ore pedindo ao Espírito Santo que aplique a Palavra ao coração de cada um.',
        },
      }

    case 'tematico':
      return {
        ...base,
        titleTheme: {
          ...base.titleTheme,
          centralTheme: 'Descreva o tema central em uma frase clara',
        },
        introduction: {
          openingHook: 'Comece com uma pergunta provocadora ou uma situação do cotidiano que o tema responde.',
          context: 'Por que este tema é urgente para a congregação hoje? Qual necessidade ele atende?',
          transition: 'Apresente o versículo-chave e mostre como ele ilumina o tema.',
        },
        mainPoints: [
          makePoint('Ponto I — O Problema (Por quê precisamos disto?)', [
            'Descreva a necessidade humana ou o desafio espiritual',
            'Use uma ilustração ou estatística para tornar concreto',
          ]),
          makePoint('Ponto II — O Princípio (O que a Bíblia diz?)', [
            'Desenvolva a verdade bíblica central do tema',
            'Conecte com outros textos que reforçam o mesmo princípio',
          ]),
          makePoint('Ponto III — A Prática (Como vivemos isso?)', [
            'Aplicação prática e específica',
            'Dê exemplos concretos e alcançáveis',
          ]),
        ],
        conclusion: {
          closingText: 'Resuma os três pontos em uma declaração de verdade unificadora.',
          callToAction: 'Desafie cada pessoa a escolher um passo prático de mudança.',
          finalPrayer: 'Ore pedindo graça para viver o que foi pregado.',
        },
      }

    case 'narrativo':
      return {
        ...base,
        titleTheme: {
          ...base.titleTheme,
          centralTheme: 'A lição central que a narrativa ensina',
        },
        introduction: {
          openingHook: 'Crie suspense: "Imagine que você estava lá naquele dia..."',
          context: 'Situe o ouvinte no mundo da narrativa: tempo, lugar, personagens.',
          transition: 'Apresente o conflito ou tensão central da história.',
        },
        mainPoints: [
          makePoint('A Cena — O que estava em jogo?', [
            'Descreva o cenário com detalhes vívidos',
            'Apresente os personagens e suas motivações',
          ]),
          makePoint('O Clímax — O momento decisivo', [
            'O ponto de virada da história',
            'A intervenção de Deus ou a decisão do protagonista',
          ]),
          makePoint('A Resolução — O que mudou e por quê importa?', [
            'O desfecho da narrativa',
            'A lição teológica e sua relevância para nós hoje',
          ]),
        ],
        conclusion: {
          closingText: 'Conecte o final da história com a história maior da redenção.',
          callToAction: 'Convide a congregação a se ver dentro da narrativa bíblica.',
          finalPrayer: 'Ore para que Deus escreva uma nova história na vida de cada pessoa presente.',
        },
      }

    case 'evangelistico':
      return {
        ...base,
        titleTheme: {
          ...base.titleTheme,
          centralTheme: 'Jesus Cristo é o único caminho para a reconciliação com Deus',
          keyVerseReference: 'João 3:16',
          keyVerse: 'Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.',
        },
        introduction: {
          openingHook: 'Inicie com uma pergunta universal: "Se você fosse a Deus hoje, qual seria sua resposta?"',
          context: 'Toda pessoa tem uma busca por sentido, perdão e esperança. O evangelho responde a essas três perguntas.',
          transition: 'A Bíblia apresenta uma solução surpreendente e gratuita para o maior problema da humanidade.',
        },
        mainPoints: [
          makePoint('O Problema — Todos pecamos e estamos separados de Deus', [
            'Romanos 3:23 — "Todos pecaram e destituídos estão da glória de Deus"',
            'O pecado tem consequências eternas',
          ]),
          makePoint('A Solução — Jesus pagou o preço que não poderíamos pagar', [
            'Romanos 5:8 — "Deus prova o seu amor para conosco pelo fato de Cristo ter morrido por nós"',
            'A ressurreição confirma que o pagamento foi aceito',
          ]),
          makePoint('A Resposta — Como receber esta graça?', [
            'Arrependimento: virar as costas ao pecado',
            'Fé: confiar em Jesus como Senhor e Salvador',
            'Romanos 10:9 — Confessar e crer de coração',
          ]),
        ],
        conclusion: {
          closingText: 'O evangelho não é uma religião de esforço, mas uma relação de graça. Deus já fez tudo — a pergunta é: o que você fará com isso?',
          callToAction: 'Convide as pessoas a orarem em silêncio, entregando suas vidas a Cristo. Ofereça para orar com quem desejar dar este passo.',
          finalPrayer: 'Ore em voz alta, guiando os que estão respondendo ao chamado.',
        },
      }

    case 'blank':
    default:
      return base
  }
}
