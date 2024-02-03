'use client'

import { Box, Typography, Button } from '@mui/material'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        bgcolor: 'background.default',
        color: 'text.primary',
      }}
    >
      <Typography variant='h2' component='h1' gutterBottom>
        Cross Calendar
      </Typography>
      <Typography variant='h5' component='h2' gutterBottom>
        複数のカレンダーを一つにまとめるアプリ
      </Typography>
      <Button
        variant='contained'
        color='primary'
        size='large'
        onClick={() => router.push('/sign-in')}
      >
        今すぐ始める
      </Button>
    </Box>
  )
}
