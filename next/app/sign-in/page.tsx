'use client'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { Button, Stack, TextField, Typography, IconButton, InputAdornment } from '@mui/material'
import axios, { isAxiosError } from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useCurrentUser } from '../_components//context//currentUserContext'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const currentUserContext = useCurrentUser()

  if (!currentUserContext) return null
  const { currentUser, setCurrentUser } = currentUserContext

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      console.log(email, password)

      const response = await axios.post('/api/auth/sign-in', {
        email: email,
        password: password,
      })

      if (response.status === 200) {
        setCurrentUser(response.data)
        router.push('/kanban')
      } else {
        setError('メールアドレスまたはパスワードが間違っています')
      }
    } catch (error) {
      if (isAxiosError(error)) {
        setError(error.response?.data?.message || error.message)
      } else {
        setError('予期せぬエラーが発生しました。')
      }
    }
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  return (
    <Stack height='100vh' justifyContent='center' alignItems='center' gap='32px'>
      <Typography id='login_heading' variant='h1' fontSize='1.5rem'>
        ログイン
      </Typography>
      <Stack
        component='form'
        onSubmit={handleSubmit}
        width={560}
        gap='24px'
        aria-labelledby='login_heading'
      >
        <TextField
          name='email'
          label='メールアドレス'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          name='password'
          label='パスワード'
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  aria-label='パスワードの表示切替'
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {error && <Typography color='error'>{error}</Typography>}
        <Button type='submit' variant='contained'>
          ログイン
        </Button>
      </Stack>
      <Link href='/sign-up' style={{ textDecoration: 'none' }}>
        <Typography variant='body2'>アカウントをお持ちでない方はこちら</Typography>
      </Link>
    </Stack>
  )
}
