// TaskDialog.tsx
import { Column } from '@/_hooks/useColumn'
import { Task, TaskPriority } from '@/_hooks/useTask'
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

interface CreateTaskProps {
  open: boolean
  handleClose: () => void
  column: Column | null
  columns: Column[]
  onCreateTask: (task: Task) => Promise<Boolean>
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
  const defaultTask = {
    title: '',
    description: '',
    dueDate: new Date(),
    priority: 2,
    status: column?.name || '',
  }
  const [newTask, setNewTask] = useState<Task>(defaultTask)

  useEffect(() => {
    setNewTask((currentTask) => ({
      ...currentTask,
      status: column?.name || '',
      dueDate: new Date(),
    }))
  }, [column])

  const handleCreateTask = async (task: Task) => {
    const result = await onCreateTask(task)
    if (result) {
      setNewTask(defaultTask)
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
        <FormControl fullWidth margin='dense' variant='outlined' error={!!errors?.priority}>
          <InputLabel id='priority-label'>優先度</InputLabel>
          <Select
            labelId='priority-label'
            id='priority'
            value={newTask.priority?.toString() || ''}
            onChange={(e) => setNewTask({ ...newTask, priority: parseInt(e.target.value, 10) })}
            label='優先度'
          >
            {Object.entries(TaskPriority)
              .filter(([key]) => !parseInt(key))
              .map(([key, value]) => (
                <MenuItem key={value} value={value}>
                  {key}
                </MenuItem>
              ))}
          </Select>
          <FormHelperText>{errors?.priority?.join(', ')}</FormHelperText>
        </FormControl>
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
        <Button onClick={() => handleCreateTask(newTask)} variant='contained' color='primary'>
          作成
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CreateTaskPopup
