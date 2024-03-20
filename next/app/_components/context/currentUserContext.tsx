'use client'

import axios from 'axios'
import { createContext, useContext, ReactNode, useState, useEffect, useMemo } from 'react'

interface CurrentUser {
  id: number
  uid: string
  email: string
  name: string | null
  image: string | null
}

interface CurrentUserContextType {
  currentUser: CurrentUser | null
  setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUser | null>>
}

const CurrentUserContext = createContext<CurrentUserContextType | null>(null)

export const CurrentUserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null)
  const [isFetching, setIsFetching] = useState(false)

  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (!isFetching) {
        setIsFetching(true)
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
        } finally {
          setIsFetching(false)
        }
      }
    }

    fetchCurrentUser()
  }, [])

  const providerValue = useMemo(
    () => ({ currentUser, setCurrentUser }),
    [currentUser, setCurrentUser],
  )

  return <CurrentUserContext.Provider value={providerValue}>{children}</CurrentUserContext.Provider>
}

export const useCurrentUser = () => useContext(CurrentUserContext)
