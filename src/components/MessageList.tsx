import React from 'react'
import { useMessages } from '../utils/useMessages'
import TypewriterMessage from './TypeWriterMessage'  // Oluşturduğumuz typewriter bileşeni

const MessagesList = () => {
  const { messages, isLoadingAnswer } = useMessages()

  return (
    <div className="max-w-3xl mx-auto pt-8">
      {messages?.map((message, i) => {
        if (message.role === 'system') return null
        const isUser = message.role === 'user'

        return (
          <div
            key={i}
            id={`message-${i}`}
            className={`flex mb-4 fade-up ${isUser ? 'justify-end' : 'justify-start'}`}
          >
            {!isUser && <img src="/img/logo.png" className="w-9 h-9 rounded-full" alt="avatar" />}
            <div
              className={`group relative px-3 py-2 rounded-lg ${
                isUser
                  ? 'mr-2 bg-gradient-to-br from-primary-700 to-primary-600 text-white'
                  : 'ml-2 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200'
              }`}
              style={{ maxWidth: 'calc(100% - 45px)' }}
            >
              {isUser ? (
                message.content
              ) : (
                // Kullanıcı dışı mesajlar için typewriter efektini uygula
                <TypewriterMessage text={message.content} speed={50} />
              )}
            </div>
            {isUser && (
              <img src="/img/user.png" className="w-9 h-9 rounded-full cursor-pointer" alt="avatar" />
            )}
          </div>
        )
      })}

      {/* Backend cevap bekleniyorsa loading animasyonu */}
      {isLoadingAnswer && (
        <div className="flex items-center mb-4">
          <img src="/img/logo.png" className="w-9 h-9 rounded-full" alt="avatar" />
          <div className="ml-2 p-2.5 px-4 bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center">
            <span className="mr-2">Sistem düşünüyor...</span>
            <div className="loader-dots flex space-x-1">
              <div className="w-2 h-2 bg-gray-500 dark:bg-gray-300 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-500 dark:bg-gray-300 rounded-full animate-bounce delay-150"></div>
              <div className="w-2 h-2 bg-gray-500 dark:bg-gray-300 rounded-full animate-bounce delay-300"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MessagesList
