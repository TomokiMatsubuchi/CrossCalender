import { isAxiosError } from 'axios'
import { NextResponse } from 'next/server'
import axios from '../../../_lib/axios'

interface SignUpCredentials {
  email: string
  password: string
  passwordConfirmation: string
  name: string
}

export const POST = async (req: Request) => {
  try {
    const credentials: SignUpCredentials = await req.json()

    const response = await axios.post('/api/v1/auth', credentials)
    if (response.status === 200) {
      const { headers, data } = response
      const accessToken = headers['access-token']
      const client = headers['client']
      const uid = headers['uid']

      const res = new NextResponse(JSON.stringify(data))
      res.headers.append(
        'Set-Cookie',
        `accessToken=${accessToken}; Path=/; Secure; HttpOnly; SameSite=Strict`,
      )
      res.headers.append(
        'Set-Cookie',
        `client=${client}; Path=/; Secure; HttpOnly; SameSite=Strict`,
      )
      res.headers.append('Set-Cookie', `uid=${uid}; Path=/; Secure; HttpOnly; SameSite=Strict`)

      console.log('アカウント作成成功:', response.data)

      return res
    } else {
      console.error('アカウント作成失敗:', response)
      return new NextResponse(JSON.stringify({ message: 'アカウント作成に失敗しました。' }), {
        status: response.status,
      })
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      return new NextResponse(JSON.stringify({ message: 'アカウント作成に失敗しました。' }), {
        status: error.response.status,
      })
    } else {
      return new NextResponse(JSON.stringify({ message: 'サーバーエラーが発生しました。' }), {
        status: 500,
      })
    }
  }
}
