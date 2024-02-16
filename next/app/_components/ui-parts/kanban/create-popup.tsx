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
import { useSession } from 'next-auth/react' // next-authからuseSessionをインポート
import React from 'react'
import axios from '../../../_lib/axios'

interface TaskDialogProps {
  open: boolean
  handleClose: () => void
  newTask: any
  setNewTask: React.Dispatch<React.SetStateAction<any>>
  fetchTasks: () => void // タスクを再取得するための関数をpropsとして追加
}

const TaskDialog: React.FC<TaskDialogProps> = ({
  open,
  handleClose,
  newTask,
  setNewTask,
  fetchTasks,
}) => {
  const { data: session } = useSession() // セッションデータを取得

  // タスク作成処理を追加
  const createTask = async () => {
    if (!session) {
      console.error('ユーザーが認証されていません。')
      return
    }
    try {
      await axios.post('/api/v1/tasks', { task: { ...newTask, user_id: session.userId } }) // sessionからuserIdを取得して送信
      fetchTasks() // タスク作成後にタスクリストを再取得
      handleClose() // ダイアログを閉じる
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
          value={newTask.due_date.toISOString().split('T')[0]}
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
            <MenuItem value='未着手'>未着手</MenuItem>
            <MenuItem value='着手中'>着手中</MenuItem>
            <MenuItem value='完了'>完了</MenuItem>
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
