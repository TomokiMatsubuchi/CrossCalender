'use client'

import { Button } from '@mui/material'
import axios, { AxiosError } from 'axios'
import React, { useEffect, useState, useCallback } from 'react'
import DetailPopup from '../_components/ui-parts/kanban/detailPopup'
import CreateTaskPopup from '@/_components/ui-parts/kanban/createPopup'

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

export interface Column {
  id: number
  name: string
  position: number
  tasks: Task[]
}

const KanbanPage = () => {
  const [columns, setColumns] = useState<Column[]>([])
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [isDetailPopupOpen, setIsDetailPopupOpen] = useState(false)
  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false)
  const [selectedColumn, setSelectedColumn] = useState<Column | null>(null)
  const [errors, setErrors] = useState<Record<string, string[]> | null>(null)

  // TODO: TaskのCRUDについての処理をuseTask()のカスタムフックに切り出す
  const fetchColumns = async () => {
    try {
      const response = await axios.get('/api/columns/index')
      setColumns(response.data)
    } catch (error) {
      console.error('カラム情報の取得に失敗しました。', error)
    }
  }

  const updateTask = async (task: Task) => {
    try {
      const response = await axios.patch(`/api/tasks/update`, task)
      if (response.status === 200) {
        console.log('タスクの更新に成功しました。', response.data)
        setErrors(null)
      } else {
        console.error('タスクの更新に失敗しました。', response)
      }
    } catch (error) {
      if (error instanceof AxiosError && error.response && error.response.data.errors) {
        const formattedErrors = error.response.data.errors.reduce(
          (acc: { [x: string]: any }, errorObj: ArrayLike<unknown> | { [s: string]: unknown }) => {
            const [field, message] = Object.entries(errorObj)[0]
            acc[field] = acc[field] ? [...acc[field], message] : [message]
            return acc
          },
          {},
        )
        setErrors(formattedErrors)
      }
      console.error('タスクの更新中にエラーが発生しました。', error)
    }
  }

  useEffect(() => {
    fetchColumns()
  }, [])

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task)
    setIsDetailPopupOpen(true)
  }

  const handleCloseDetailPopup = () => {
    setErrors(null)
    setIsDetailPopupOpen(false)
  }

  const handleCreateTask = (column: Column) => {
    setSelectedColumn(column)
    setIsCreatePopupOpen(true)
  }

  const handleCloseCreatePopup = () => {
    setErrors(null)
    setIsCreatePopupOpen(false)
  }

  const handleEditTask = useCallback((editedTask: Task) => {
    updateTask(editedTask)
    setColumns((prevColumns) => {
      const originalTask = prevColumns
        .find((column) => column.tasks.some((task) => task.id === editedTask.id))
        ?.tasks.find((task) => task.id === editedTask.id)
      const statusChanged = originalTask && originalTask.status !== editedTask.status

      if (statusChanged) {
        return prevColumns.map((column) => {
          const filteredTasks = column.tasks.filter((task) => task.id !== editedTask.id)
          if (column.name === editedTask.status) {
            return {
              ...column,
              tasks: [...filteredTasks, editedTask],
            }
          } else {
            return {
              ...column,
              tasks: filteredTasks,
            }
          }
        })
      } else {
        return prevColumns.map((column) => ({
          ...column,
          tasks: column.tasks.map((task) => (task.id === editedTask.id ? editedTask : task)),
        }))
      }
    })
    setSelectedTask(editedTask)
  }, [])

  const createTask = async (newTask: Task) => {
    try {
      await axios.post('/api/tasks/create', newTask)
      setErrors(null)
    } catch (error) {
      if (error instanceof AxiosError && error.response && error.response.data.errors) {
        const formattedErrors = error.response.data.errors.reduce(
          (acc: { [x: string]: any }, errorObj: { [s: string]: unknown } | ArrayLike<unknown>) => {
            const [field, message] = Object.entries(errorObj)[0]
            acc[field] = acc[field] ? [...acc[field], message] : [message]
            return acc
          },
          {},
        )
        setErrors(formattedErrors)
      }
      console.error('タスクの作成に失敗しました。', error)
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', overflowX: 'auto' }}>
      {columns.map((column) => (
        <div
          key={column.id}
          style={{
            minWidth: '300px',
            margin: '20px',
            padding: '10px',
            backgroundColor: '#f0f0f0',
            borderRadius: '10px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          <h2 style={{ borderBottom: '2px solid #333', paddingBottom: '10px' }}>{column.name}</h2>
          {column.tasks.map((task) => (
            <div
              key={task.id}
              style={{
                margin: '10px 0',
                padding: '10px',
                backgroundColor: 'white',
                borderRadius: '5px',
                boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                cursor: 'pointer',
              }}
              onClick={() => handleTaskClick(task)}
            >
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                <span style={{ fontSize: '12px', color: '#666' }}>
                  {task.dueDate?.toLocaleDateString()}
                </span>
                <span
                  style={{
                    fontSize: '12px',
                    color: task.priority === 3 ? 'red' : task.priority === 2 ? 'orange' : 'green',
                  }}
                >
                  {task.priority === 3 ? '高' : task.priority === 2 ? '中' : '低'}
                </span>
              </div>
            </div>
          ))}
          <Button
            variant='contained'
            color='primary'
            fullWidth
            onClick={() => handleCreateTask(column)}
          >
            {column.name}に新規タスクを追加
          </Button>
        </div>
      ))}
      <DetailPopup
        open={isDetailPopupOpen}
        handleClose={handleCloseDetailPopup}
        selectedTask={selectedTask}
        columns={columns}
        onEditTask={handleEditTask}
        errors={errors}
      />
      <CreateTaskPopup
        open={isCreatePopupOpen}
        handleClose={handleCloseCreatePopup}
        column={selectedColumn}
        columns={columns}
        onCreateTask={createTask}
        errors={errors}
      />
    </div>
  )
}

export default KanbanPage
