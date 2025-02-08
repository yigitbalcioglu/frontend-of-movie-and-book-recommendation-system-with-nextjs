// components/FilmList.tsx
import React from 'react'
import { useFilms } from './FilmContent'

const FilmList: React.FC = () => {
  const { films } = useFilms()

  if (!films.length) {
    return <div className="max-w-5xl mx-auto p-4">Welcome! How can I assist you today?</div>
  }

  return (
    <div className="max-w-5xl  mx-auto p-4">
      <h2 className="text-2xl font-bold bg-black mb-4">Önerilen Filmler</h2>
      <div className="grid grid-cols-1 gap-6">
        {films.map((film) => (
          <div key={film.id} className="border rounded-lg p-4 shadow-lg bg-white">
            <h3 className="text-xl font-semibold">{film.film}</h3>
            <p className="text-sm text-gray-600 mb-2">{film.tür}</p>
            <p className="text-gray-800">{film.ozet}</p>
            <p className="text-sm text-gray-500 mt-2">
              🎬 <strong>Yönetmen:</strong> {film.yönetmen}
            </p>
            <p className="text-sm text-gray-500">
              🎭 <strong>Oyuncular:</strong> {film.oyuncular}
            </p>
            <p className="text-sm text-gray-500">
              📅 <strong>Vizyon Tarihi:</strong> {film.vizyon} | ⏳ <strong>Süre:</strong>{' '}
              {film.sure}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FilmList
