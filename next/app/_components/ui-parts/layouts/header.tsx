'use client'

import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const Header = () => {
  const [elevate, setElevate] = useState(false)

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
          <Link href='/' style={{ textDecoration: 'none', flexGrow: 1, color: 'inherit' }}>
            <Typography variant='h6' component='div'>
              Cross Calender
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <Link href='/sign-in' style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography variant='h6' component='div'>
                Login
              </Typography>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar /> {/* これはAppBarの高さ分のスペースを確保するために必要です */}
    </Box>
  )
}

export default Header
