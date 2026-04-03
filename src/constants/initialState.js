import { generateId } from '../utils/generateId'

export const createInitialState = () => ({
  preacherInfo: {
    preacherName: '',
    date: '',
    location: '',
    occasion: '',
  },
  titleTheme: {
    sermonTitle: '',
    centralTheme: '',
    keyVerse: '',
    keyVerseReference: '',
  },
  introduction: {
    openingHook: '',
    context: '',
    transition: '',
  },
  mainPoints: [],
  illustrations: [],
  conclusion: {
    closingText: '',
    callToAction: '',
    finalPrayer: '',
  },
  references: [],
  personalNotes: '',
})

export const createMainPoint = () => ({
  id: generateId(),
  pointTitle: '',
  subTopics: [],
  biblicalRefs: [],
  illustrations: [],
})

export const createSubTopic = () => ({ id: generateId(), text: '' })
export const createBibleRef  = () => ({ id: generateId(), text: '' })
export const createInlineIllustration = () => ({ id: generateId(), title: '', body: '' })
export const createStandaloneIllustration = () => ({ id: generateId(), title: '', body: '', linkedPointId: null })
export const createReference = () => ({ id: generateId(), citation: '' })
