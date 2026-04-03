import { createContext, useContext } from 'react'
import { useSermonState } from '../hooks/useSermonState'

const SermonContext = createContext(null)

export function SermonProvider({ children }) {
  const { state, dispatch } = useSermonState()
  return (
    <SermonContext.Provider value={{ state, dispatch }}>
      {children}
    </SermonContext.Provider>
  )
}

export function useSermon() {
  const ctx = useContext(SermonContext)
  if (!ctx) throw new Error('useSermon must be used inside SermonProvider')
  return ctx
}
