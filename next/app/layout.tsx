import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import React, { memo } from 'react'
import { CurrentUserProvider } from './_components/context/currentUserContext'
import Footer from './_components/ui-parts/layouts/footer'
import Header from './_components/ui-parts/layouts/header'
import { RouteGuard } from './_components/ui-parts/layouts/routeGuard'
import SideBar from './_components/ui-parts/layouts/sideBar'
import { FlashMessageProvider } from './_components/context/flashMessageContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Cross Calendar',
  description: '複数のカレンダーを一つにまとめるアプリ',
}

const MemoizedHeader = memo(Header)
const MemoizedFooter = memo(Footer)
const MemoizedSideBar = memo(SideBar)

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ja'>
      <body className={inter.className}>
        <CurrentUserProvider>
          <AppRouterCacheProvider>
            <FlashMessageProvider>
              <RouteGuard>
                <>
                  <MemoizedHeader />
                  <MemoizedSideBar>{children}</MemoizedSideBar>
                  <MemoizedFooter />
                </>
              </RouteGuard>
            </FlashMessageProvider>
          </AppRouterCacheProvider>
        </CurrentUserProvider>
      </body>
    </html>
  )
}
