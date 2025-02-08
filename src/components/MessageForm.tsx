// components/MessageForm.tsx
import { Button, TextArea } from '@apideck/components'
import { useState } from 'react'
import { useMessages } from 'utils/useMessages'
import { useFilms, Film } from './FilmContent'
import { useBooks, Book } from './BookContent'
import { IoArrowUpCircleOutline } from 'react-icons/io5'

const MessageForm = () => {
  const [content, setContent] = useState('')
  const { addMessage } = useMessages()
  const { addFilms } = useFilms() // Film verisini güncellemek için kullanın
  const { addBooks } = useBooks() // Kitap verisini güncellemek için kullanın
  const [submitted, setSubmitted] = useState(false)
  const [waiting, setWaiting] = useState(false)
  const [option, setOption] = useState<'movies' | 'books'>('movies') // Seçim butonu için state

  const handleSubmit = async (e?: React.FormEvent<unknown>) => {
    e?.preventDefault()
    setSubmitted(true)
    setWaiting(true)
    setContent('')
    addMessage({ role: 'user', content, timestamp: new Date() })

    try {
      const response = await fetch('http://localhost:8000/api/search/' + option, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: content })
      })

      if (!response.ok) {
        console.error('API isteğinde hata:', response.statusText)
        return
      }

      const data = await response.json()

      // Eğer gelen veri data.movies şeklinde ise:
      if (data.movies && Array.isArray(data.movies)) {
        // API'den gelen veriyi Film arayüzüne uygun hale getir
        const formattedMovies: Film[] = data.movies.map((movie: any) => ({
          id: movie.id, // API'den gelen id
          film: movie.film, // API'den gelen film adı
          ozet: movie.ozet, // API'den gelen özet
          tür: movie.tür, // API'den gelen tür
          oyuncular: movie.yuncular, // API'den gelen oyuncular
          yönetmen: movie.yönetmen, // API'den gelen yönetmen
          vizyon: movie.vizyon, // API'den gelen vizyon tarihi
          sure: movie.sure, // API'den gelen süre
          timestamp: Date.now() // Şu anki zamanı ekleyin
        }))

        // Context'i güncelle
        addFilms(formattedMovies) // Diziyi doğrudan set et
      } else if (data.books && Array.isArray(data.books)) {
        const formattedBooks: Book[] = data.books.map((book: any) => ({
          id: book.id, // API'den gelen id
          name: book.name,
          author: book.author,
          publisher: book.publisher,
          publication_year: book.publication_year, // publication_year bir sayı olmalı
          ISBN: book.ISBN, // ISBN uzun olabileceği için String kullanıyoruz
          book_type: book.book_type,
          explanation: book.explanation,
          book_img: book.book_img, // "url" yerine "String" olmalı
          timestamp: Date.now() // Şu anki zamanı ekleyin
        }))

        // Context'i güncelle
        addBooks(formattedBooks) // Diziyi doğrudan set et
      } else {
        console.warn('Beklenmedik veri yapısı:', data)
        addFilms([])
        addBooks([])
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setWaiting(false)
    }
  }

  const handleButton = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true) // Form gönderildiğinde state güncellenir
    setTimeout(() => {
      setSubmitted(false) // 3 saniye sonra form eski yerine gelir
    }, 3000)
  }

  return (
    <div className={`flex flex-col items-center h-screen ${submitted ? '' : 'justify-center'}`}>
      <form
        className={`w-full max-w-3xl rounded-2xl bg-[#303030] shadow-lg p-5 h-[200px] ${
          waiting ? 'hidden' : ''
        }`}
        onSubmit={handleSubmit}
      >
        <TextArea
          name="content"
          placeholder={
            option === 'movies'
              ? 'Bir film önerisi almak ister misin?'
              : 'Bir kitap önerisi almak ister misin?'
          }
          rows={3}
          value={content}
          autoFocus
          className="bg-[#303030] p-2 text-white rounded-xl shadow-sm"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
        />

        {/* Seçim Butonları */}
        <div className="flex justify-between">
          <div className="mt-2 flex items-center relative">
            <div className="relative flex items-center border border-[#DE981D] rounded-lg p-1">
              {/* Arka Plan Animasyonu */}
              <div
                className={`absolute bg-[#DE981D] h-[90%] rounded-md transition-all duration-300 ${
                  option === 'movies' ? 'left-1' : 'left-[calc(100%-4.1rem)]'
                }`}
                style={{ width: 'calc(50% - 0.5rem)' }}
              ></div>

              {/* Film Butonu */}
              <button
                type="button"
                onClick={() => setOption('movies')}
                className={`relative z-10 px-4 py-2 text-white rounded-md transition-colors duration-300 ${
                  option === 'movies' ? 'text-black' : 'hover:text-black'
                }`}
              >
                Film
              </button>

              {/* Kitap Butonu */}
              <button
                type="button"
                onClick={() => setOption('books')}
                className={`relative z-10 px-4 py-2 text-white rounded-md transition-colors duration-300 ${
                  option === 'books' ? 'text-black' : 'hover:text-black'
                }`}
              >
                Kitap
              </button>
            </div>
          </div>

          {/* Gönder Butonu */}
          <div className="flex justify-end items-end">
            <Button type="submit" onSubmit={handleButton} size="regular">
              {/* content boşsa gri, doluysa normal renk */}
              <IoArrowUpCircleOutline
                size={48}
                className={content ? 'text-white' : 'text-gray-500'} // Tailwind CSS örneği
              />
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default MessageForm
