import { useToast } from '@apideck/components'
import { ReactNode, createContext, useContext, useEffect, useState } from 'react'

interface Message {
  role: 'user' | 'system' | 'assistant'
  content: string
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

  useEffect(() => {
    // Initialize the chat with a welcome message if there are no messages
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        role: 'system',
        content: 'Welcome! How can I assist you today?'
      }
      setMessages([welcomeMessage])
    }
  }, [messages.length])

  const addMessage = async (message: Message) => {
    setIsLoadingAnswer(true)
    try {
      // Add the new message to the messages array
      setMessages((prevMessages) => [...prevMessages, message])
    } catch (error) {
      // Show a toast notification in case of an error
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
