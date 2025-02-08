// utils/BooksContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react'
import { useToast } from '@apideck/components'

export interface Book {
  id: number
  name: string
  author: string
  publisher: string
  publication_year: number // publication_year bir sayı olmalı
  ISBN: string // ISBN uzun olabileceği için String kullanıyoruz
  book_type: string
  explanation: string
  book_img: string // "url" yerine "String" olmalı
  timestamp: Date
}

interface BooksContextProps {
  books: Book[] // books olarak güncellendi
  addBooks: (books: Book[]) => void
  isLoadingAnswer: boolean
}

const BooksContext = createContext<BooksContextProps | undefined>(undefined)

export const BooksProvider = ({ children }: { children: ReactNode }) => {
  const [books, setBooks] = useState<Book[]>([])
  const { addToast } = useToast()
  const [isLoadingAnswer, setIsLoadingAnswer] = useState(false)

  const addBooks = async (books: Book[]) => {
    setIsLoadingAnswer(true)
    try {
      // Mevcut kitapların üzerine yeni kitapları ekleyin
      setBooks((prevBooks) => [...prevBooks, ...books])
    } catch (error) {
      addToast({ title: 'An error occurred while sending the message', type: 'error' })
    } finally {
      setIsLoadingAnswer(false)
    }
  }

  return (
    <BooksContext.Provider value={{ books, addBooks, isLoadingAnswer }}>
      {children}
    </BooksContext.Provider>
  )
}

export const useBooks = () => {
  return useContext(BooksContext) as BooksContextProps
}
