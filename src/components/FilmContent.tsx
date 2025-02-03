// utils/FilmsContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react'

export interface Film {
  id: number
  film: string
  ozet: string
  tür: string
  oyuncular: string
  yönetmen: string
  vizyon: string
  sure: string
}

interface FilmsContextProps {
  films: Film[]
  setFilms: (films: Film[]) => void
}

const FilmsContext = createContext<FilmsContextProps | undefined>(undefined)

export const FilmsProvider = ({ children }: { children: ReactNode }) => {
  const [films, setFilms] = useState<Film[]>([])

  return <FilmsContext.Provider value={{ films, setFilms }}>{children}</FilmsContext.Provider>
}

export const useFilms = () => {
  const context = useContext(FilmsContext)
  if (!context) {
    throw new Error('useFilms must be used within a FilmsProvider')
  }
  return context
}
