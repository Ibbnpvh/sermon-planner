import { useReducer, useEffect, useRef } from 'react'
import { createInitialState } from '../constants/initialState'
import { loadSermon, saveSermon } from '../utils/libraryStorage'

// ─── Reducer ────────────────────────────────────────────────────────────────

function sermonReducer(state, action) {
  switch (action.type) {

    // Preacher Info
    case 'SET_PREACHER_FIELD':
      return { ...state, preacherInfo: { ...state.preacherInfo, [action.field]: action.value } }

    // Title & Theme
    case 'SET_TITLE_THEME_FIELD':
      return { ...state, titleTheme: { ...state.titleTheme, [action.field]: action.value } }

    // Introduction
    case 'SET_INTRODUCTION_FIELD':
      return { ...state, introduction: { ...state.introduction, [action.field]: action.value } }

    // Main Points
    case 'ADD_MAIN_POINT':
      return { ...state, mainPoints: [...state.mainPoints, action.point] }

    case 'REMOVE_MAIN_POINT':
      return { ...state, mainPoints: state.mainPoints.filter(p => p.id !== action.id) }

    case 'UPDATE_MAIN_POINT_TITLE':
      return {
        ...state,
        mainPoints: state.mainPoints.map(p =>
          p.id === action.id ? { ...p, pointTitle: action.value } : p
        ),
      }

    case 'MOVE_MAIN_POINT': {
      const pts = [...state.mainPoints]
      const [removed] = pts.splice(action.from, 1)
      pts.splice(action.to, 0, removed)
      return { ...state, mainPoints: pts }
    }

    // Sub-topics
    case 'ADD_SUBTOPIC':
      return {
        ...state,
        mainPoints: state.mainPoints.map(p =>
          p.id === action.pointId ? { ...p, subTopics: [...p.subTopics, action.subTopic] } : p
        ),
      }

    case 'REMOVE_SUBTOPIC':
      return {
        ...state,
        mainPoints: state.mainPoints.map(p =>
          p.id === action.pointId
            ? { ...p, subTopics: p.subTopics.filter(s => s.id !== action.subTopicId) }
            : p
        ),
      }

    case 'UPDATE_SUBTOPIC':
      return {
        ...state,
        mainPoints: state.mainPoints.map(p =>
          p.id === action.pointId
            ? { ...p, subTopics: p.subTopics.map(s => s.id === action.subTopicId ? { ...s, text: action.value } : s) }
            : p
        ),
      }

    // Biblical References (inside a point)
    case 'ADD_BIBLICAL_REF':
      return {
        ...state,
        mainPoints: state.mainPoints.map(p =>
          p.id === action.pointId ? { ...p, biblicalRefs: [...p.biblicalRefs, action.ref] } : p
        ),
      }

    case 'REMOVE_BIBLICAL_REF':
      return {
        ...state,
        mainPoints: state.mainPoints.map(p =>
          p.id === action.pointId
            ? { ...p, biblicalRefs: p.biblicalRefs.filter(r => r.id !== action.refId) }
            : p
        ),
      }

    case 'UPDATE_BIBLICAL_REF':
      return {
        ...state,
        mainPoints: state.mainPoints.map(p =>
          p.id === action.pointId
            ? { ...p, biblicalRefs: p.biblicalRefs.map(r => r.id === action.refId ? { ...r, text: action.value } : r) }
            : p
        ),
      }

    // Inline Illustrations (inside a point)
    case 'ADD_INLINE_ILLUSTRATION':
      return {
        ...state,
        mainPoints: state.mainPoints.map(p =>
          p.id === action.pointId ? { ...p, illustrations: [...p.illustrations, action.illustration] } : p
        ),
      }

    case 'REMOVE_INLINE_ILLUSTRATION':
      return {
        ...state,
        mainPoints: state.mainPoints.map(p =>
          p.id === action.pointId
            ? { ...p, illustrations: p.illustrations.filter(i => i.id !== action.illustrationId) }
            : p
        ),
      }

    case 'UPDATE_INLINE_ILLUSTRATION':
      return {
        ...state,
        mainPoints: state.mainPoints.map(p =>
          p.id === action.pointId
            ? {
                ...p,
                illustrations: p.illustrations.map(i =>
                  i.id === action.illustrationId ? { ...i, [action.field]: action.value } : i
                ),
              }
            : p
        ),
      }

    // Standalone Illustrations
    case 'ADD_STANDALONE_ILLUSTRATION':
      return { ...state, illustrations: [...state.illustrations, action.illustration] }

    case 'REMOVE_STANDALONE_ILLUSTRATION':
      return { ...state, illustrations: state.illustrations.filter(i => i.id !== action.id) }

    case 'UPDATE_STANDALONE_ILLUSTRATION':
      return {
        ...state,
        illustrations: state.illustrations.map(i =>
          i.id === action.id ? { ...i, [action.field]: action.value } : i
        ),
      }

    // Conclusion
    case 'SET_CONCLUSION_FIELD':
      return { ...state, conclusion: { ...state.conclusion, [action.field]: action.value } }

    // References
    case 'ADD_REFERENCE':
      return { ...state, references: [...state.references, action.reference] }

    case 'REMOVE_REFERENCE':
      return { ...state, references: state.references.filter(r => r.id !== action.id) }

    case 'UPDATE_REFERENCE':
      return {
        ...state,
        references: state.references.map(r =>
          r.id === action.id ? { ...r, citation: action.value } : r
        ),
      }

    // Personal Notes
    case 'SET_PERSONAL_NOTES':
      return { ...state, personalNotes: action.value }

    // Load a different sermon (switch active)
    case 'LOAD_SERMON':
      return action.data

    // Reset
    case 'RESET_STATE':
      return createInitialState()

    default:
      return state
  }
}

// ─── Hook ───────────────────────────────────────────────────────────────────

export function useSermonState(sermonId) {
  const initial = (sermonId ? loadSermon(sermonId) : null) ?? createInitialState()
  const [state, dispatch] = useReducer(sermonReducer, initial)

  // When sermonId changes externally, load the new sermon
  const prevIdRef = useRef(sermonId)
  useEffect(() => {
    if (sermonId && sermonId !== prevIdRef.current) {
      prevIdRef.current = sermonId
      const data = loadSermon(sermonId) ?? createInitialState()
      dispatch({ type: 'LOAD_SERMON', data })
    }
  }, [sermonId])

  // Debounced save to per-sermon key
  const debounceRef = useRef(null)
  useEffect(() => {
    if (!sermonId) return
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => saveSermon(sermonId, state), 300)
    return () => clearTimeout(debounceRef.current)
  }, [state, sermonId])

  return { state, dispatch }
}
