'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { useCurrentUser } from '../../context/currentUserContext'

export const RouteGuard = ({ children }: { children: JSX.Element }) => {
  const router = useRouter()
  const pathName = usePathname()
  const currentUserContext = useCurrentUser()
  const { currentUser } = currentUserContext || {}

  useEffect(() => {
    if (!currentUser) {
      if (pathName !== '/sign-in' && pathName !== '/sign-up' && pathName !== '/') {
        router.push('/sign-in')
      }
    } else {
      if (pathName === '/sign-in' || pathName === '/sign-up') {
        router.push('/kanban')
      }
    }
  }, [currentUser, router, pathName])

  return children
}
