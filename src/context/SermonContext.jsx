import { createContext, useContext, useEffect, useRef } from 'react'
import { useSermonState } from '../hooks/useSermonState'
import { useLibrary } from './LibraryContext'

const SermonContext = createContext(null)

export function SermonProvider({ children }) {
  const { library, updateMeta } = useLibrary()
  const activeId = library.activeId
  const { state, dispatch } = useSermonState(activeId)

  // Keep library index in sync with title/date changes
  const syncRef = useRef(null)
  useEffect(() => {
    if (!activeId) return
    clearTimeout(syncRef.current)
    syncRef.current = setTimeout(() => {
      updateMeta(
        activeId,
        state.titleTheme?.sermonTitle || 'Sem título',
        state.preacherInfo?.date || ''
      )
    }, 600)
    return () => clearTimeout(syncRef.current)
  }, [state.titleTheme?.sermonTitle, state.preacherInfo?.date, activeId])

  return (
    <SermonContext.Provider value={{ state, dispatch, activeId }}>
      {children}
    </SermonContext.Provider>
  )
}

export function useSermon() {
  const ctx = useContext(SermonContext)
  if (!ctx) throw new Error('useSermon must be used inside SermonProvider')
  return ctx
}
