'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { useCurrentUser } from '../../context/currentUserContext'
import { useAutoClearFlashMessage } from '@/_components/context/flashMessageContext'

export const RouteGuard = ({ children }: { children: JSX.Element }) => {
  const router = useRouter()
  const pathName = usePathname()
  const currentUserContext = useCurrentUser()
  const { currentUser } = currentUserContext || {}
  const withOutAuthRoutes = ['/sign-in', '/sign-up', '/']
  const { setFlashMessage } = useAutoClearFlashMessage()

  useEffect(() => {
    if (!currentUser) {
      if (!withOutAuthRoutes.includes(pathName)) {
        router.push('/sign-in')
      }
    } else {
      if (withOutAuthRoutes.includes(pathName)) {
        router.back() // 認証がいらないページに行こうとしたら、前のページに戻るようにする。
        setFlashMessage({
          message: 'すでにログインしています。',
          type: 'error',
        })
      }
    }
  }, [currentUser, router, pathName])

  return children
}
