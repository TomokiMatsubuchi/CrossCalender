// TaskDialog.tsx
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material'
import axios from 'axios'
import React from 'react'
import { Column, Task } from '../../../kanban/page'

interface TaskDialogProps {
  open: boolean
  handleClose: () => void
  newTask: Task
  setNewTask: React.Dispatch<React.SetStateAction<any>>
  fetchTasks: () => void
  columns: Column[]
}

const TaskDialog: React.FC<TaskDialogProps> = ({
  open,
  handleClose,
  newTask,
  setNewTask,
  fetchTasks,
  columns,
}) => {
  const createTask = async () => {
    try {
      await axios.post('/api/tasks/create', { task: newTask })
      fetchTasks()
      handleClose()
    } catch (error) {
      console.error('タスクの作成に失敗しました。', error)
    }
  }
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='新タスク作成'
      aria-describedby='新タスクを作成するためのダイアログ'
    >
      <DialogTitle id='dialog-title'>新タスク</DialogTitle>
      <DialogContent>
        <DialogContentText>新しいタスクを作成してください。</DialogContentText>
        <TextField
          autoFocus
          margin='dense'
          id='title'
          label='タイトル'
          type='text'
          fullWidth
          variant='outlined'
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <TextField
          margin='dense'
          id='description'
          label='説明'
          type='text'
          fullWidth
          multiline
          rows={4}
          variant='outlined'
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        />
        <TextField
          margin='dense'
          id='dueDate'
          label='期限'
          type='date'
          fullWidth
          variant='outlined'
          value={newTask.dueDate?.toISOString().split('T')[0]}
          onChange={(e) => setNewTask({ ...newTask, due_date: new Date(e.target.value) })}
        />
        <TextField
          margin='dense'
          id='priority'
          label='優先度'
          type='number'
          fullWidth
          variant='outlined'
          value={newTask.priority}
          onChange={(e) => setNewTask({ ...newTask, priority: parseInt(e.target.value, 10) })}
        />
        <FormControl fullWidth margin='dense' variant='outlined'>
          <InputLabel id='status-label'>ステータス</InputLabel>
          <Select
            labelId='status-label'
            id='status'
            value={newTask.status}
            onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
            label='ステータス'
          >
            {columns.map((column) => (
              <MenuItem key={column.id} value={column.id}>
                {column.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary'>
          キャンセル
        </Button>
        <Button onClick={createTask} variant='contained' color='primary'>
          作成
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default TaskDialog
