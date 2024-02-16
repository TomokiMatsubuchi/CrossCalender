'use client'

import { Button, Grid, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import TaskDialog from '../_components/ui-parts/kanban/create-popup'
import axios from '../_lib/axios'

export interface Task {
  id: React.Key
  description?: string
  dueDate?: Date
  priority?: number
  status?: string
  title?: string
  createdAt: Date
  updatedAt: Date
  columnId: number
  userId: number
}

const fetchTasks = async (setTasks: {
  (value: React.SetStateAction<Task[]>): void
  (value: React.SetStateAction<Task[]>): void
  (arg0: any): void
}) => {
  const response = await axios.get('/api/v1/tasks')
  setTasks(response.data)
}

const KanbanPage = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [open, setOpen] = useState(false)
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    due_date: new Date(),
    priority: 1,
    status: '未着手',
  })

  useEffect(() => {
    fetchTasks(setTasks)
  }, [])

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div>
      <Button variant='contained' onClick={handleOpen}>
        新規タスクを追加
      </Button>
      <TaskDialog
        open={open}
        handleClose={handleClose}
        newTask={newTask}
        setNewTask={setNewTask}
        fetchTasks={() => fetchTasks(setTasks)}
      />
      <Grid container spacing={2} style={{ marginTop: '20px' }}>
        {tasks.map((task) => (
          <Grid item xs={12} md={4} key={task.id}>
            <Paper elevation={3} style={{ padding: '16px', margin: '8px' }}>
              <Typography variant='h6'>{task.title}</Typography>
              <Typography color='textSecondary'>{task.description}</Typography>
              <Typography variant='body2'>{task.dueDate?.toLocaleDateString()}</Typography>
              <Typography variant='body2'>優先度: {task.priority}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default KanbanPage
