import { NextResponse } from 'next/server'
import axios from '../../../_lib/axios'
import { AxiosError } from 'axios'

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

    const response = await axios.post(
      '/api/v1/tasks',
      {
        task: {
          title: body.title,
          description: body.description,
          status: body.status,
          priority: body.priority,
          due_date: body.dueDate,
        },
      },
      {
        headers: {
          'access-token': accessToken[0],
          client: client[0],
          uid: uid[0],
        },
      },
    )

    if (response.status === 200) {
      return new NextResponse(JSON.stringify(response.data))
    } else {
      return new NextResponse(JSON.stringify({ message: 'タスクの作成に失敗しました。' }), {
        status: response.status,
      })
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data
      const errorStatus = error.response?.status
      if (errorStatus === 422) {
        // validation error
        return new NextResponse(JSON.stringify(errorMessage), {
          status: errorStatus,
        })
      }
      return new NextResponse(JSON.stringify({ message: 'サーバーエラーが発生しました。' }), {
        status: 500,
      })
    }
  }
}
