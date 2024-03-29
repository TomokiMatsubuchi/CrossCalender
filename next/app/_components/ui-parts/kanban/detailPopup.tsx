import { Column } from '@/_hooks/useColumn'
import { Task, TaskPriority } from '@/_hooks/useTask'
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material'
import React, { useEffect, useState } from 'react'

interface DetailPopupProps {
  open: boolean
  handleClose: () => void
  selectedTask: Task | null
  columns: Column[]
  onEditTask: (task: Task) => void
  errors: Record<string, string[]> | null
}

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const DetailPopup: React.FC<DetailPopupProps> = ({
  open,
  handleClose,
  selectedTask,
  columns,
  onEditTask,
  errors,
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTask, setEditedTask] = useState<Task | null>(null)

  useEffect(() => {
    setEditedTask(selectedTask)
  }, [selectedTask])

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    if (editedTask) {
      onEditTask(editedTask)
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditedTask(selectedTask)
  }

  return (
    <Modal
      open={open}
      onClose={() => {
        handleClose()
        setIsEditing(false)
      }}
      aria-labelledby='task-detail-title'
      aria-describedby='task-detail-description'
    >
      <Box sx={modalStyle}>
        {isEditing ? (
          <>
            <TextField
              fullWidth
              label='タイトル'
              variant='outlined'
              value={editedTask?.title || ''}
              onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value } as Task)}
              error={!!errors?.title}
              helperText={errors?.title?.join(', ')}
            />
            <TextField
              fullWidth
              label='説明'
              variant='outlined'
              multiline
              rows={4}
              sx={{ mt: 2 }}
              value={editedTask?.description || ''}
              onChange={(e) =>
                setEditedTask({ ...editedTask, description: e.target.value } as Task)
              }
              error={!!errors?.description}
              helperText={errors?.description?.join(', ')}
            />
            <TextField
              fullWidth
              label='期限'
              variant='outlined'
              type='date'
              sx={{ mt: 2 }}
              value={editedTask?.dueDate?.toISOString().split('T')[0] || ''}
              onChange={(e) =>
                setEditedTask({ ...editedTask, dueDate: new Date(e.target.value) } as Task)
              }
              error={!!errors?.dueDate}
              helperText={errors?.dueDate?.join(', ')}
            />
            <FormControl fullWidth sx={{ mt: 2 }} error={!!errors?.priority}>
              <InputLabel>優先度</InputLabel>
              <Select
                value={editedTask?.priority?.toString() || ''}
                label='優先度'
                onChange={(e) =>
                  setEditedTask({ ...editedTask, priority: parseInt(e.target.value, 10) } as Task)
                }
              >
                {Object.entries(TaskPriority)
                  .filter(([key]) => !parseInt(key))
                  .map(([key, value]) => (
                    <MenuItem key={key} value={value}>
                      {key}
                    </MenuItem>
                  ))}
              </Select>
              <FormHelperText>{errors?.priority?.join(', ')}</FormHelperText>
            </FormControl>
            <FormControl fullWidth sx={{ mt: 2 }} error={!!errors?.status}>
              <InputLabel>進行状況</InputLabel>
              <Select
                value={editedTask?.status || ''}
                label='進行状況'
                onChange={(e) => setEditedTask({ ...editedTask, status: e.target.value } as Task)}
              >
                {columns.map((column) => (
                  <MenuItem key={column.id} value={column.name}>
                    {column.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{errors?.status?.join(', ')}</FormHelperText>
            </FormControl>
            <Box sx={{ display: 'flex', justifyContent: 'end', gap: '1rem', mt: 2 }}>
              <Button onClick={handleSave} variant='contained' color='primary'>
                保存
              </Button>
              <Button onClick={handleCancel} variant='outlined' color='primary'>
                キャンセル
              </Button>
            </Box>
          </>
        ) : (
          <>
            <Typography id='task-detail-title' variant='h6' component='h2'>
              {selectedTask?.title}
            </Typography>
            <Typography id='task-detail-description' sx={{ mt: 2 }}>
              {selectedTask?.description}
            </Typography>
            <Typography sx={{ mt: 2 }}>
              期限:
              {selectedTask?.dueDate
                ? new Date(selectedTask.dueDate).toLocaleDateString()
                : '未設定'}
            </Typography>
            <Typography sx={{ mt: 2 }}>
              優先度: {TaskPriority[selectedTask?.priority ?? 0]}
            </Typography>
            <Typography sx={{ mt: 2 }}>進行状況: {selectedTask?.status}</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'end', gap: '1rem', mt: 2 }}>
              <Button onClick={handleEdit} variant='contained' color='primary'>
                編集
              </Button>
              <Button onClick={handleClose} variant='outlined' color='primary'>
                閉じる
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  )
}

export default DetailPopup
