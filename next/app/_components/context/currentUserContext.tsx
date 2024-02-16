'use client'

import axios from 'axios'
import { createContext, useContext, ReactNode, useState, useEffect } from 'react'

// currentUserの型定義を更新
interface CurrentUser {
  id: number
  uid: string
  email: string
  name: string | null
  image: string | null
}

// ContextとそのProviderの作成
interface CurrentUserContextType {
  currentUser: CurrentUser | null
  setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUser | null>>
}

const CurrentUserContext = createContext<CurrentUserContextType | null>(null)

export const CurrentUserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null)

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get('/api/auth/current-user')
        setCurrentUser({
          id: response.data.id,
          uid: response.data.uid,
          email: response.data.email,
          name: response.data.name,
          image: response.data.image,
        })
      } catch (error) {
        console.error('現在のユーザーの取得に失敗しました。', error)
      }
    }

    fetchCurrentUser()
  }, [])

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  )
}

// Contextを使用するためのカスタムフック
export const useCurrentUser = () => useContext(CurrentUserContext)
