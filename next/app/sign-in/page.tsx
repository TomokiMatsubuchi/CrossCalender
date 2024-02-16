'use client'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { Button, Stack, TextField, Typography, IconButton, InputAdornment } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session) {
      router.push('/kanban')
    }
  }, [session, router])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const result = await signIn('credentials', {
      redirect: false,
      email: email,
      password: password,
    })

    if (result?.error === '401') {
      return alert('メールアドレスまたはパスワードが間違っています')
    }
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  if (status === 'loading') {
    return <Typography>読み込み中...</Typography>
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
