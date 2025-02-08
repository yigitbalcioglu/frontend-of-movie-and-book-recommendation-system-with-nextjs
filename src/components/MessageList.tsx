import React from 'react'
import { useMessages } from '../utils/useMessages'
import { useFilms } from './FilmContent'
import { useBooks } from './BookContent'

const MessagesList = () => {
  const { messages = [] } = useMessages()
  const { films = [] } = useFilms()
  const { books = [] } = useBooks()

  // Mesajları, filmleri ve kitapları birleştir
  const combinedMessages = [
    ...messages.map((message) => ({ ...message, type: 'message' })),
    ...films.map((film) => ({ ...film, type: 'film' })),
    ...books.map((book) => ({ ...book, type: 'book' })) // Kitapları ekleyin
  ].sort((a, b) => a.timestamp - b.timestamp) // Eğer timestamp varsa sıralama yapılabilir

  return (
    <div className="max-w-3xl mx-auto pt-8">
      {combinedMessages.map((item, i) => {
        if (item.type === 'message') {
          // Kullanıcı mesajı
          return (
            <div key={`message-${i}`} className="flex mb-4 fade-up justify-end">
              <div
                className="bg-[#303030] group relative px-3 py-2 rounded-3xl m-4 text-[#ECECEC]"
                style={{ maxWidth: 'calc(100% - 45px)' }}
              >
                {item.content}
              </div>
            </div>
          )
        } else if (item.type === 'film') {
          // Sistem yanıtı (film)
          return (
            <div key={`film-${i}`} className="flex my-4 fade-up justify-start">
              <div
                className="group relative px-3 py-2 rounded-lg mr-2 bg-gradient-to-br from-primary-700 to-primary-600 text-[#ECECEC]"
                style={{ maxWidth: 'calc(100% - 45px)' }}
              >
                <div>
                  <strong className="text-white font-semibold">{item.film}</strong>
                  <br />
                  <small>
                    <strong className="text-white">Tür:</strong> {item.tür}
                    <br />
                    <strong className="text-white">Yönetmen:</strong> {item.yönetmen}
                    <br />
                    <strong className="text-white">Vizyon Tarihi:</strong> {item.vizyon}
                    <br />
                    <strong className="text-white">Süresi:</strong> {item.sure}
                    <br />
                    <strong className="text-white">Özeti:</strong> {item.ozet}
                    <br />
                  </small>
                </div>
              </div>
            </div>
          )
        } else if (item.type === 'book') {
          // Sistem yanıtı (kitap)
          return (
            <div key={`book-${i}`} className="flex my-4 fade-up justify-start">
              <div
                className="group relative px-3 py-2 rounded-lg mr-2 bg-gradient-to-br from-primary-700 to-primary-600 text-[#ECECEC]"
                style={{ maxWidth: 'calc(100% - 45px)' }}
              >
                <div>
                  <strong className="text-white font-semibold">{item.name}</strong>
                  <br />
                  <small>
                    <strong className="text-white">Yazar:</strong> {item.author}
                    <br />
                    <strong className="text-white">Yayınevi:</strong> {item.publisher}
                    <br />
                    <strong className="text-white">Yayın Yılı:</strong> {item.publication_year}
                    <br />
                    <strong className="text-white">ISBN:</strong> {item.ISBN}
                    <br />
                    <strong className="text-white">Tür:</strong> {item.book_type}
                    <br />
                    <strong className="text-white">Açıklama:</strong> {item.explanation}
                    <br />
                    <img src={item.book_img} alt={item.name} className="w-40 h-40 rounded-lg" />
                  </small>
                </div>
              </div>
            </div>
          )
        }
        return null
      })}
    </div>
  )
}

export default MessagesList
