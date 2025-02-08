import React, { useEffect, useState } from 'react'

interface TypewriterMessageProps {
  texts: string[] // Birden fazla metin parçası
  speed?: number // milisaniye cinsinden harf gösterim hızı (varsayılan: 50ms)
  onComplete?: () => void // Tüm metinler yazıldığında çağrılacak fonksiyon
}

const TypewriterMessage: React.FC<TypewriterMessageProps> = ({ texts, speed = 50, onComplete }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    if (currentTextIndex >= texts.length) {
      if (onComplete) onComplete() // Tüm metinler yazıldığında onComplete çağrılır
      return
    }

    const currentText = texts[currentTextIndex]
    let index = 0

    const intervalId = setInterval(() => {
      setDisplayed((prev) => prev + currentText[index])
      index++
      if (index >= currentText.length) {
        clearInterval(intervalId)
        setCurrentTextIndex((prev) => prev + 1) // Bir sonraki metne geç
        setDisplayed((prev) => prev + '\n') // Metinler arasına boşluk ekle
      }
    }, speed)

    return () => clearInterval(intervalId)
  }, [texts, speed, currentTextIndex, onComplete])

  return <>{displayed}</>
}

export default TypewriterMessage
