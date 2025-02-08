import { useToast } from '@apideck/components'
import { ReactNode, createContext, useContext, useState } from 'react'

interface Message {
  role: 'user' | 'system' | 'assistant'
  content: string
  timestamp: Date
}

interface ContextProps {
  messages: Message[]
  addMessage: (message: Message) => Promise<void>
  isLoadingAnswer: boolean
}

const ChatsContext = createContext<Partial<ContextProps>>({})

export function MessagesProvider({ children }: { children: ReactNode }) {
  const { addToast } = useToast()
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoadingAnswer, setIsLoadingAnswer] = useState(false)

  const addMessage = async (message: Message) => {
    setIsLoadingAnswer(true)
    try {
      // Mevcut mesajların üzerine yeni mesajı ekleyin
      setMessages((prevMessages) => [...prevMessages, message])
    } catch (error) {
      addToast({ title: 'An error occurred while sending the message', type: 'error' })
    } finally {
      setIsLoadingAnswer(false)
    }
  }

  return (
    <ChatsContext.Provider value={{ messages, addMessage, isLoadingAnswer }}>
      {children}
    </ChatsContext.Provider>
  )
}

export const useMessages = () => {
  return useContext(ChatsContext) as ContextProps
}
