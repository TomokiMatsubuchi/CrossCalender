import { Button, Link, Stack, TextField, Typography } from '@mui/material'

export default function SignUp() {
  return (
    <Stack height='100vh' justifyContent='center' alignItems='center' gap='32px'>
      <Typography id='signup_heading' variant='h1' fontSize='1.5rem'>
        新規アカウント作成
      </Typography>
      <Stack component='form' width={560} gap='24px' aria-labelledby='signup_heading'>
        <TextField label='名前' />
        <TextField label='メールアドレス' />
        <TextField label='パスワード' type='password' />
        <Button variant='contained'>アカウント作成</Button>
      </Stack>
    </Stack>
  )
}
