import { createContext, useContext, useReducer, useEffect } from 'react'
import { generateId } from '../utils/generateId'
import { createInitialState } from '../constants/initialState'
import {
  loadLibrary, saveLibrary,
  loadActiveId, saveActiveId,
  loadSermon, saveSermon, deleteSermon,
  migrateFromLegacy,
} from '../utils/libraryStorage'

// ─── Context ─────────────────────────────────────────────────────────────────

const LibraryContext = createContext(null)

// ─── Reducer ─────────────────────────────────────────────────────────────────

function libraryReducer(state, action) {
  switch (action.type) {

    case 'INIT':
      return { sermons: action.sermons, activeId: action.activeId }

    case 'CREATE_SERMON': {
      const entry = {
        id: action.id,
        title: action.title || 'Novo Sermão',
        date: action.date || '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      return {
        sermons: [entry, ...state.sermons],
        activeId: action.id,
      }
    }

    case 'SELECT_SERMON':
      return { ...state, activeId: action.id }

    case 'DELETE_SERMON': {
      const remaining = state.sermons.filter(s => s.id !== action.id)
      const newActiveId = action.id === state.activeId
        ? (remaining[0]?.id ?? null)
        : state.activeId
      return { sermons: remaining, activeId: newActiveId }
    }

    case 'DUPLICATE_SERMON': {
      const src = state.sermons.find(s => s.id === action.sourceId)
      if (!src) return state
      const entry = {
        id: action.newId,
        title: src.title + ' (cópia)',
        date: src.date,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      const idx = state.sermons.findIndex(s => s.id === action.sourceId)
      const next = [...state.sermons]
      next.splice(idx + 1, 0, entry)
      return { sermons: next, activeId: action.newId }
    }

    case 'UPDATE_META': {
      return {
        ...state,
        sermons: state.sermons.map(s =>
          s.id === action.id
            ? { ...s, title: action.title ?? s.title, date: action.date ?? s.date, updatedAt: new Date().toISOString() }
            : s
        ),
      }
    }

    default:
      return state
  }
}

// ─── Provider ────────────────────────────────────────────────────────────────

export function LibraryProvider({ children }) {
  const [library, dispatch] = useReducer(libraryReducer, { sermons: [], activeId: null })

  // ── Bootstrap: migrate legacy or load existing ──────────────────────────
  useEffect(() => {
    // Try migration first
    const migrated = migrateFromLegacy(generateId)
    if (migrated) {
      dispatch({ type: 'INIT', sermons: [migrated.entry], activeId: migrated.id })
      return
    }

    // Load existing library
    const sermons = loadLibrary() ?? []
    let activeId = loadActiveId()

    // If library is empty, create a blank first sermon
    if (sermons.length === 0) {
      const id = generateId()
      const entry = {
        id,
        title: 'Meu Primeiro Sermão',
        date: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      saveSermon(id, createInitialState())
      saveLibrary([entry])
      saveActiveId(id)
      dispatch({ type: 'INIT', sermons: [entry], activeId: id })
      return
    }

    // Validate activeId
    if (!activeId || !sermons.find(s => s.id === activeId)) {
      activeId = sermons[0].id
    }

    dispatch({ type: 'INIT', sermons, activeId })
  }, [])

  // ── Persist library index ──────────────────────────────────────────────
  useEffect(() => {
    if (library.sermons.length === 0) return
    saveLibrary(library.sermons)
    saveActiveId(library.activeId)
  }, [library.sermons, library.activeId])

  // ── Public actions ─────────────────────────────────────────────────────

  function createSermon(initialData, title) {
    const id = generateId()
    const data = initialData ?? createInitialState()
    saveSermon(id, data)
    dispatch({ type: 'CREATE_SERMON', id, title: title || data.titleTheme?.sermonTitle || 'Novo Sermão', date: data.preacherInfo?.date || '' })
    return id
  }

  function selectSermon(id) {
    dispatch({ type: 'SELECT_SERMON', id })
  }

  function removeSermon(id) {
    if (!window.confirm('Excluir este sermão? Esta ação não pode ser desfeita.')) return
    deleteSermon(id)
    dispatch({ type: 'DELETE_SERMON', id })
  }

  function duplicateSermon(sourceId) {
    const sourceData = loadSermon(sourceId)
    if (!sourceData) return
    const newId = generateId()
    saveSermon(newId, { ...sourceData })
    dispatch({ type: 'DUPLICATE_SERMON', sourceId, newId })
  }

  function updateMeta(id, title, date) {
    dispatch({ type: 'UPDATE_META', id, title, date })
  }

  return (
    <LibraryContext.Provider value={{ library, createSermon, selectSermon, removeSermon, duplicateSermon, updateMeta }}>
      {children}
    </LibraryContext.Provider>
  )
}

export function useLibrary() {
  const ctx = useContext(LibraryContext)
  if (!ctx) throw new Error('useLibrary must be used inside LibraryProvider')
  return ctx
}
