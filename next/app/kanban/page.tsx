'use client'

import { Button, IconButton, TextField } from '@mui/material'
import React, { useState, useCallback } from 'react'
import DetailPopup from '../_components/ui-parts/kanban/detailPopup'
import CreateTaskPopup from '@/_components/ui-parts/kanban/createPopup'
import { Task, useTask } from '@/_hooks/useTask'
import { Column, useColumn } from '@/_hooks/useColumn'
import EditIcon from '@mui/icons-material/Edit'
import SaveIcon from '@mui/icons-material/Save'

const KanbanPage = () => {
  const { createTask, updateTask, deleteTask, taskErrors, setTaskErrors } = useTask()
  const { columns, setColumns, fetchColumns, updateColumn } = useColumn()
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [isDetailPopupOpen, setIsDetailPopupOpen] = useState(false)
  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false)
  const [selectedColumn, setSelectedColumn] = useState<Column | null>(null)
  const [editingColumnId, setEditingColumnId] = useState<number | null>(null)
  const [editColumnName, setEditColumnName] = useState('')

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task)
    setIsDetailPopupOpen(true)
  }

  const handleCloseDetailPopup = () => {
    setTaskErrors(null)
    setIsDetailPopupOpen(false)
  }

  const handleOpenCreateTaskPopup = (column: Column) => {
    setSelectedColumn(column)
    setIsCreatePopupOpen(true)
  }

  const handleCloseCreateTaskPopup = () => {
    setTaskErrors(null)
    setIsCreatePopupOpen(false)
  }

  const handleCreateTask = useCallback(
    async (newTask: Task) => {
      if (await createTask(newTask)) {
        await fetchColumns()
        handleCloseCreateTaskPopup()
        return true
      }
      return false
    },
    [createTask, fetchColumns],
  )

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

  const handleSaveEditColumnName = useCallback(
    async (columnId: number, newName: string) => {
      try {
        await updateColumn(columnId, newName)
        setColumns((prevColumns) =>
          prevColumns.map((column) =>
            column.id === columnId ? { ...column, name: newName } : column,
          ),
        )
      } catch (err) {
        console.error(err)
      } finally {
        setEditingColumnId(null)
      }
    },
    [updateColumn, setColumns],
  )

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', overflowX: 'auto' }}>
      {columns.map((column) => (
        <div
          key={column.id}
          style={{
            minWidth: '30%',
            width: '400px',
            margin: '20px',
            padding: '10px',
            backgroundColor: '#f0f0f0',
            borderRadius: '10px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          <div
            style={{
              borderBottom: '2px solid #333',
              paddingBottom: '10px',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            {editingColumnId === column.id ? (
              <>
                <TextField
                  value={editColumnName}
                  onChange={(e) => setEditColumnName(e.target.value)}
                  style={{ flex: 8 }}
                />
                <IconButton
                  onClick={() => {
                    handleSaveEditColumnName(column.id, editColumnName)
                  }}
                  style={{ flex: 2, margin: '0 auto', backgroundColor: '#f0f0f0' }}
                >
                  <SaveIcon />
                </IconButton>
              </>
            ) : (
              <>
                <h2 style={{ flex: 8 }}>{column.name}</h2>
                <IconButton
                  onClick={() => {
                    setEditingColumnId(column.id)
                    setEditColumnName(column.name)
                  }}
                  style={{ flex: 2, margin: '0 auto', backgroundColor: '#f0f0f0' }}
                >
                  <EditIcon />
                </IconButton>
              </>
            )}
          </div>
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
            onClick={() => handleOpenCreateTaskPopup(column)}
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
        errors={taskErrors}
      />
      <CreateTaskPopup
        open={isCreatePopupOpen}
        handleClose={handleCloseCreateTaskPopup}
        column={selectedColumn}
        columns={columns}
        onCreateTask={handleCreateTask}
        errors={taskErrors}
      />
    </div>
  )
}

export default KanbanPage
