'use client'

import { AppBar, Box, Toolbar, Typography } from '@mui/material'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useCurrentUser } from '@/_components/context/currentUserContext'
import MyAccountMenu from '@/_components/ui-elements/layouts/myAccountMenu'

const Header = () => {
  const [elevate, setElevate] = useState(false)
  const currentUser = useCurrentUser()?.currentUser
  const isAuthenticated = Boolean(currentUser)

  useEffect(() => {
    const handleScroll = () => {
      setElevate(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position='fixed'
        sx={{
          backgroundColor: elevate ? 'primary.light' : 'primary.main',
          transition: 'background-color 0.3s',
        }}
      >
        <Toolbar>
          {isAuthenticated ? (
            <Link href='/kanban' style={{ textDecoration: 'none', flexGrow: 1, color: 'inherit' }}>
              <Typography variant='h6' component='div'>
                Cross Calender
              </Typography>
            </Link>
          ) : (
            <Link href='/' style={{ textDecoration: 'none', flexGrow: 1, color: 'inherit' }}>
              <Typography variant='h6' component='div'>
                Cross Calender
              </Typography>
            </Link>
          )}
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
            {isAuthenticated ? (
              <MyAccountMenu />
            ) : (
              <Link href='/sign-in' style={{ textDecoration: 'none', color: 'inherit' }}>
                <Typography variant='h6' component='div'>
                  ログイン
                </Typography>
              </Link>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </Box>
  )
}

export default Header
