'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import FlashMessageDisplay from '@/_components/ui-parts/layouts/flashMessage'

interface FlashMessage {
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
}

interface FlashMessageContextType {
  flashMessage: FlashMessage | null
  setFlashMessage: (message: FlashMessage | null) => void
}

const FlashMessageContext = createContext<FlashMessageContextType | undefined>(undefined)

export const FlashMessageProvider = ({ children }: { children: ReactNode }) => {
  const [flashMessage, setFlashMessage] = useState<FlashMessage | null>(null)

  return (
    <FlashMessageContext.Provider value={{ flashMessage, setFlashMessage }}>
      <FlashMessageDisplay />
      {children}
    </FlashMessageContext.Provider>
  )
}

export const useFlashMessage = () => {
  const context = useContext(FlashMessageContext)
  if (context === undefined) {
    throw new Error('useFlashMessage must be used within a FlashMessageProvider')
  }
  return context
}

// 自動的にメッセージをクリアするカスタムフック
export const useAutoClearFlashMessage = () => {
  const { flashMessage, setFlashMessage } = useFlashMessage()

  useEffect(() => {
    console.log('flashMessage', flashMessage)

    if (flashMessage !== null) {
      const timer = setTimeout(() => {
        setFlashMessage(null)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [flashMessage, setFlashMessage])

  return { flashMessage, setFlashMessage }
}
