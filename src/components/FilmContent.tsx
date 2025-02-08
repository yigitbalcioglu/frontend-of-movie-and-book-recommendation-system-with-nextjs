// utils/FilmsContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react'
import { useToast } from '@apideck/components'

export interface Film {
  id: number
  film: string
  ozet: string
  tür: string
  oyuncular: string
  yönetmen: string
  vizyon: string
  sure: string
  timestamp: Date
}

interface FilmsContextProps {
  films: Film[]
  addFilms: (films: Film[]) => void
  isLoadingAnswer: boolean
}

const FilmsContext = createContext<FilmsContextProps | undefined>(undefined)

export const FilmsProvider = ({ children }: { children: ReactNode }) => {
  const [films, setFilms] = useState<Film[]>([])
  const { addToast } = useToast()
  const [isLoadingAnswer, setIsLoadingAnswer] = useState(false)

  const addFilms = async (films: Film[]) => {
    setIsLoadingAnswer(true)
    try {
      // Mevcut mesajların üzerine yeni mesajı ekleyin
      setFilms((prevFilms) => [...prevFilms, ...films])
    } catch (error) {
      addToast({ title: 'An error occurred while sending the message', type: 'error' })
    } finally {
      setIsLoadingAnswer(false)
    }
  }

  return (
    <FilmsContext.Provider value={{ films, addFilms, isLoadingAnswer }}>
      {children}
    </FilmsContext.Provider>
  )
}

export const useFilms = () => {
  return useContext(FilmsContext) as FilmsContextProps
}
