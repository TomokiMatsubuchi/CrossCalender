'use client'
import { Button, Stack, TextField, Typography } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function SignIn() {
  const router = useRouter()
  return (
    <Stack height='100lvh' justifyContent='center' alignItems='center' gap='32px'>
      <Typography id='login_heading' variant='h1' fontSize='1.5rem'>
        ログイン
      </Typography>
      <Stack component='form' width={560} gap='24px' aria-labelledby='login_heading'>
        <TextField label='メールアドレス' />
        <TextField label='パスワード' />
        <Button variant='contained'>ログイン</Button>
      </Stack>
      <Link href='/sign-up' style={{ textDecoration: 'none' }}>
        <Typography variant='body2'>アカウントをお持ちでない方はこちら</Typography>
      </Link>
    </Stack>
  )
}
