'use client'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import {
  Button,
  Stack,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  FormHelperText,
} from '@mui/material'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useCurrentUser } from '../_components/context/currentUserContext'

export default function SignUp() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const currentUserContext = useCurrentUser()

  if (!currentUserContext) return null
  const { currentUser, setCurrentUser } = currentUserContext

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (password !== passwordConfirmation) {
      setError('パスワードとパスワード確認が一致しません。')
      return
    }
    try {
      const response = await axios.post('/api/auth/sign-up', {
        email,
        password,
        passwordConfirmation,
        name,
      })
      if (response.status === 200) {
        setCurrentUser(response.data)
        router.push('/kanban')
      } else {
        setError('アカウント作成に失敗しました。')
      }
    } catch (error) {
      setError('アカウント作成に失敗しました。')
    }
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleClickShowPasswordConfirmation = () => {
    setShowPasswordConfirmation(!showPasswordConfirmation)
  }

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const isFormValid =
    name && email && password && passwordConfirmation && password === passwordConfirmation

  return (
    <Stack height='100vh' justifyContent='center' alignItems='center' gap='32px'>
      <Typography id='signup_heading' variant='h1' fontSize='1.5rem'>
        新規アカウント作成
      </Typography>
      <Stack
        component='form'
        width={560}
        gap='24px'
        aria-labelledby='signup_heading'
        onSubmit={handleSubmit}
      >
        <TextField label='名前' value={name} onChange={(e) => setName(e.target.value)} required />
        <TextField
          label='メールアドレス'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label='パスワード'
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
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
        <TextField
          label='パスワード(確認)'
          type={showPasswordConfirmation ? 'text' : 'password'}
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          required
          error={password !== passwordConfirmation}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  aria-label='パスワード確認の表示切替'
                  onClick={handleClickShowPasswordConfirmation}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPasswordConfirmation ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {error && <FormHelperText error>{error}</FormHelperText>}
        <Button type='submit' variant='contained' disabled={!isFormValid}>
          アカウント作成
        </Button>
      </Stack>
    </Stack>
  )
}
