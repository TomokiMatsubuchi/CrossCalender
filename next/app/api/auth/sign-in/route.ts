import { isAxiosError } from 'axios'
import { NextResponse } from 'next/server'
import axios from '../../../_lib/axios'

interface SignInCredentials {
  email: string
  password: string
}

export const POST = async (req: Request) => {
  try {
    const credentials: SignInCredentials = await req.json()

    const response = await axios.post('/api/v1/auth/sign_in', credentials)
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

      console.log('ログイン成功:', response.data)
      return res
    } else {
      console.error('ログイン失敗:', response)
      return new NextResponse(
        JSON.stringify({ message: 'メールアドレスまたはパスワードが間違っています。' }),
        {
          status: response.status,
        },
      )
    }
  } catch (error) {
    if (isAxiosError(error) && error.response && error.response.status === 401) {
      return new NextResponse(
        JSON.stringify({ message: 'メールアドレスまたはパスワードが間違っています。' }),
        {
          status: 401,
        },
      )
    } else {
      return new NextResponse(JSON.stringify({ message: 'サーバーエラーが発生しました。' }), {
        status: 500,
      })
    }
  }
}
