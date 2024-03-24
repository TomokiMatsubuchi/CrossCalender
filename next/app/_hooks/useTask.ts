import { useState, useCallback, useEffect } from 'react'
import axios, { AxiosError } from 'axios'

export interface Task {
  id?: React.Key
  description?: string
  dueDate?: Date
  priority?: number
  status?: string
  title?: string
  createdAt?: Date
  updatedAt?: Date
  columnId?: number
  userId?: number
}

export enum TaskPriority {
  低 = 1,
  中,
  高,
}

export const useTask = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [taskErrors, setTaskErrors] = useState<Record<string, string[]> | null>(null)

  const handleApiValidate = (error: unknown) => {
    if (error instanceof AxiosError && error.response && error.response.data.errors) {
      const formattedErrors = error.response.data.errors.reduce(
        (acc: { [x: string]: any }, errorObj: ArrayLike<unknown> | { [s: string]: unknown }) => {
          const [field, message] = Object.entries(errorObj)[0]
          acc[field] = acc[field] ? [...acc[field], message] : [message]
          return acc
        },
        {},
      )
      setTaskErrors(formattedErrors)
    } else {
      console.error('APIの呼び出し中にエラーが発生しました。', error)
    }
  }

  const fetchTasks = useCallback(async () => {
    try {
      const response = await axios.get('/api/tasks/index')
      setTaskErrors(null)
      const tasks = response.data.map((task: any) => {
        task.dueDate = task.due_date ? new Date(task.due_date) : null
        return task as Task
      })
      setTasks(tasks)
    } catch (error) {
      console.error('タスク情報の取得に失敗しました。', error)
    }
  }, [])

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  const createTask = useCallback(async (newTask: Task) => {
    try {
      const response = await axios.post('/api/tasks/create', newTask)
      setTaskErrors(null)
      return response.data
    } catch (error) {
      handleApiValidate(error)
    }
  }, [])

  const updateTask = useCallback(async (task: Task) => {
    try {
      const response = await axios.patch(`/api/tasks/update`, task)
      setTaskErrors(null)
      return response.data
    } catch (error) {
      handleApiValidate(error)
    }
  }, [])

  const deleteTask = useCallback(async (taskId: React.Key) => {
    try {
      const response = await axios.delete(`/api/tasks/delete/${taskId}`)
      setTaskErrors(null)
      return response.data
    } catch (error) {
      handleApiValidate(error)
    }
  }, [])

  return { createTask, updateTask, deleteTask, taskErrors, setTaskErrors, tasks }
}
