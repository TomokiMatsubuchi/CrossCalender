import { useState, useCallback, useEffect } from 'react'
import axios, { AxiosError } from 'axios'
import { Task } from './useTask'

export interface Column {
  id: number
  name: string
  position: number
  tasks: Task[]
}

export const useColumn = () => {
  const [columns, setColumns] = useState<Column[]>([])
  const [columnErrors, setColumnErrors] = useState<Record<string, string[]> | null>(null)

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
      setColumnErrors(formattedErrors)
    } else {
      console.error('APIの呼び出し中にエラーが発生しました。', error)
    }
  }

  const fetchColumns = useCallback(async () => {
    try {
      const response = await axios.get('/api/columns/index')
      setColumns(response.data)
    } catch (error) {
      console.error('カラム情報の取得に失敗しました。', error)
    }
  }, [])

  useEffect(() => {
    fetchColumns()
  }, [fetchColumns])

  const createColumn = useCallback(
    async (newColumn: Column) => {
      try {
        const response = await axios.post('/api/columns/create', newColumn)
        setColumnErrors(null)
        fetchColumns()
        return response.data
      } catch (error) {
        handleApiValidate(error)
      }
    },
    [fetchColumns],
  )

  const updateColumn = useCallback(
    async (column: Column) => {
      try {
        const response = await axios.patch(`/api/columns/update`, column)
        setColumnErrors(null)
        fetchColumns()
        return response.data
      } catch (error) {
        handleApiValidate(error)
      }
    },
    [fetchColumns],
  )

  const deleteColumn = useCallback(
    async (columnId: React.Key) => {
      try {
        const response = await axios.delete(`/api/columns/delete/${columnId}`)
        setColumnErrors(null)
        fetchColumns()
        return response.data
      } catch (error) {
        handleApiValidate(error)
      }
    },
    [fetchColumns],
  )

  return {
    columns,
    setColumns,
    fetchColumns,
    createColumn,
    updateColumn,
    deleteColumn,
    columnErrors,
    setColumnErrors,
  }
}
