'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { useCurrentUser } from '../../context/currentUserContext'

export const RouteGuard = ({ children }: { children: JSX.Element }) => {
  const router = useRouter()
  const pathName = usePathname()
  const currentUserContext = useCurrentUser()
  const { currentUser } = currentUserContext || {}
  const withOutAuthRoutes = ['/sign-in', '/sign-up', '/']

  useEffect(() => {
    if (!currentUser) {
      if (!withOutAuthRoutes.includes(pathName)) {
        router.push('/sign-in')
      }
    } else {
      if (withOutAuthRoutes.includes(pathName)) {
        router.back() // 認証がいらないページに行こうとしたら、前のページに戻るようにする。
        // TODO: エラーメッセージを表示する。
      }
    }
  }, [currentUser, router, pathName])

  return children
}
