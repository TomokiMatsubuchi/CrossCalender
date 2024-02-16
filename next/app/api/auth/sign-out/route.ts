import { NextResponse } from 'next/server'
import axios from '../../../_lib/axios'

export const DELETE = async (req: Request) => {
  try {
    const cookies = req.headers.get('Cookie')
    const accessToken = cookies?.match(/(?<=accessToken=)[^;]+/)
    const client = cookies?.match(/(?<=client=)[^;]+/)
    const uid = cookies?.match(/(?<=uid=)[^;]+/)

    // 認証情報がない場合はエラーを返す
    if (!accessToken || !client || !uid) {
      return new NextResponse('認証情報が不足しています。', { status: 401 })
    }

    // リクエストヘッダーに認証情報を設定
    const config = {
      headers: {
        'access-token': accessToken,
        client: client,
        uid: uid,
      },
    }

    const axiosResponse = await axios.delete('/api/v1/auth/sign_out', config)
    if (axiosResponse.status === 200) {
      console.log('ログアウト成功:', axiosResponse.data)
      const deleteCookie = (name: string) =>
        `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`
      const cookiesToDelete = [
        deleteCookie('accessToken'),
        deleteCookie('client'),
        deleteCookie('uid'),
      ]
      const response = new NextResponse(null, { status: 200 })
      cookiesToDelete.forEach((cookie) => {
        response.headers.append('Set-Cookie', cookie)
      })
      return response
    } else {
      console.error('ログアウト失敗:', axiosResponse)
      return new NextResponse('ログアウト失敗', { status: axiosResponse.status })
    }
  } catch (error) {
    console.error('サーバーエラー:', error)
    return new NextResponse('サーバーエラーが発生しました。', { status: 500 })
  }
}
