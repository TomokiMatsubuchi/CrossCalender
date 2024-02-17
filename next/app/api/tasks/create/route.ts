import { NextResponse } from 'next/server'
import axios from '../../../_lib/axios'

export const POST = async (req: Request) => {
  const cookies = req.headers.get('Cookie')
  const accessToken = cookies?.match(/(?<=accessToken=)[^;]+/)
  const client = cookies?.match(/(?<=client=)[^;]+/)
  const uid = cookies?.match(/(?<=uid=)[^;]+/)

  if (!accessToken || !client || !uid) {
    return new NextResponse(JSON.stringify({ message: '非ログイン状態です。' }), {
      status: 401,
    })
  }

  try {
    const body = await req.json()
    console.log(body)

    const response = await axios.post('/api/v1/tasks', body, {
      headers: {
        'access-token': accessToken[0],
        client: client[0],
        uid: uid[0],
      },
    })

    if (response.status === 200) {
      return new NextResponse(JSON.stringify(response.data))
    } else {
      return new NextResponse(JSON.stringify({ message: 'タスクの作成に失敗しました。' }), {
        status: response.status,
      })
    }
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: 'サーバーエラーが発生しました。' }), {
      status: 500,
    })
  }
}
