'use client'

import { Button } from '@mui/material'
import axios from 'axios'
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

  const fetchColumns = async () => {
    try {
      const response = await axios.get('/api/columns/index')
      console.log(response.data)

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
      } else {
        console.error('タスクの更新に失敗しました。', response)
      }
    } catch (error) {
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
    setIsDetailPopupOpen(false)
  }

  const handleCreateTask = (column: Column) => {
    setSelectedColumn(column)
    setIsCreatePopupOpen(true)
  }

  const handleCloseCreatePopup = () => {
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
      // taskの作成には成功したので、次はエラー時のバリデーションメッセージをRailsから受け取り表示できるようにする。
    } catch (error) {
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
      />
      <CreateTaskPopup
        open={isCreatePopupOpen}
        handleClose={handleCloseCreatePopup}
        column={selectedColumn}
        columns={columns}
        onCreateTask={createTask}
      />
    </div>
  )
}

export default KanbanPage
