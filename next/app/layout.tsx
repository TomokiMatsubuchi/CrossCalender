import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import React, { memo } from 'react'
import { CurrentUserProvider } from './_components/context/currentUserContext'
import Footer from './_components/ui-parts/layouts/footer'
import Header from './_components/ui-parts/layouts/header'
import { RouteGuard } from './_components/ui-parts/layouts/routeGurd'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Cross Calendar',
  description: '複数のカレンダーを一つにまとめるアプリ',
}

const MemoizedHeader = memo(Header)
const MemoizedFooter = memo(Footer)

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
            <RouteGuard>
              <>
                <MemoizedHeader />
                {children}
                <MemoizedFooter />
              </>
            </RouteGuard>
          </AppRouterCacheProvider>
        </CurrentUserProvider>
      </body>
    </html>
  )
}
