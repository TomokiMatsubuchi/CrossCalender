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
  FormHelperText,
} from '@mui/material'
import React, { useState, useEffect } from 'react'
import { Column, Task } from '@/kanban/page'

interface CreateTaskProps {
  open: boolean
  handleClose: () => void
  column: Column | null
  columns: Column[]
  onCreateTask: (task: Task) => Promise<void>
  errors: Record<string, string[]> | null
}

const CreateTaskPopup: React.FC<CreateTaskProps> = ({
  open,
  handleClose,
  column,
  columns,
  onCreateTask,
  errors,
}) => {
  const [newTask, setNewTask] = useState<Task>({
    title: '',
    description: '',
    dueDate: new Date(),
    priority: 0,
    status: column?.name || '',
  })

  useEffect(() => {
    setNewTask((currentTask) => ({
      ...currentTask,
      status: column?.name || '',
      dueDate: new Date(),
    }))
  }, [column])

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
          error={!!errors?.title}
          helperText={errors?.title?.join(', ')}
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
          error={!!errors?.description}
          helperText={errors?.description?.join(', ')}
        />
        <TextField
          margin='dense'
          id='dueDate'
          label='期限'
          type='date'
          fullWidth
          variant='outlined'
          value={newTask.dueDate?.toISOString().split('T')[0]}
          onChange={(e) => setNewTask({ ...newTask, dueDate: new Date(e.target.value) })}
          error={!!errors?.dueDate}
          helperText={errors?.dueDate?.join(', ')}
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
          error={!!errors?.priority}
          helperText={errors?.priority?.join(', ')}
        />
        <FormControl fullWidth margin='dense' variant='outlined' error={!!errors?.status}>
          <InputLabel id='status-label'>ステータス</InputLabel>
          <Select
            labelId='status-label'
            id='status'
            value={newTask.status}
            onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
            label='ステータス'
          >
            {columns.map((column) => (
              <MenuItem key={column.id} value={column.name}>
                {column.name}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{errors?.status?.join(', ')}</FormHelperText>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary'>
          キャンセル
        </Button>
        <Button onClick={() => onCreateTask(newTask)} variant='contained' color='primary'>
          作成
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CreateTaskPopup
