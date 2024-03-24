import React from 'react'
import { Task } from '@/_hooks/useTask'
import { Box, Typography, Chip, Modal } from '@mui/material'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment'

interface TaskDetailProps {
  task: Task | null
  open: boolean
  onClose: () => void
}

const TaskDetail: React.FC<TaskDetailProps> = ({ task, open, onClose }) => {
  if (!task) return null

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby='task-detail-title'
      aria-describedby='task-detail-description'
    >
      <Box
        sx={{
          position: 'absolute' as 'absolute',
          right: '0%',
          width: 400,
          height: '100%',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography
          id='task-detail-title'
          variant='h4'
          component='h1'
          sx={{ fontWeight: 'bold', color: 'primary.main', mb: 2 }}
        >
          {task.title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Chip
            label={task.priority === 3 ? '高' : task.priority === 2 ? '中' : '低'}
            color={task.priority === 3 ? 'error' : task.priority === 2 ? 'warning' : 'success'}
            size='small'
          />
          <hr />
          <Typography variant='body2' sx={{ ml: 1, display: 'flex', alignItems: 'center' }}>
            {task.dueDate && new Date(task.dueDate) < new Date() ? (
              <Box
                component='span'
                sx={{ color: 'error.main', ml: 1, display: 'flex', alignItems: 'center' }}
              >
                期限: {task.dueDate?.toLocaleDateString()}
                <LocalFireDepartmentIcon />
              </Box>
            ) : task.dueDate ? (
              <span>
                期限まで: あと
                {Math.ceil(
                  (new Date(task.dueDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24),
                )}
                日
              </span>
            ) : (
              ''
            )}
          </Typography>
        </Box>
        <Typography
          id='task-detail-description'
          variant='body1'
          sx={{ mt: 1, mb: 2, bgcolor: 'action.hover', p: 2, borderRadius: '4px' }}
        >
          {/* 詳細をマークダウン形式で記載できるようにする。 */}
          {task.description}
        </Typography>
      </Box>
    </Modal>
  )
}

export default TaskDetail
