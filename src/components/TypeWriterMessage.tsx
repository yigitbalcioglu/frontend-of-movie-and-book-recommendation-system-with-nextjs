import React, { useEffect, useState } from 'react'

interface TypewriterMessageProps {
  text: string
  speed?: number // milisaniye cinsinden harf gösterim hızı (varsayılan: 50ms)
}

const TypewriterMessage: React.FC<TypewriterMessageProps> = ({ text, speed = 50 }) => {
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    let index = 0
    const intervalId = setInterval(() => {
      setDisplayed(text.slice(0, index + 1))
      index++
      if (index >= text.length) {
        clearInterval(intervalId)
      }
    }, speed)

    return () => clearInterval(intervalId)
  }, [text, speed])

  return <>{displayed}</>
}

export default TypewriterMessage
