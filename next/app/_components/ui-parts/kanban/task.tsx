import { Paper, Typography } from '@mui/material'
import { useDrag, useDrop } from 'react-dnd'
import { Task } from '../../../kanban/page'

interface TaskComponentProps {
  task: Task
  index: number
  moveTask: (dragIndex: number, hoverIndex: number, newStatus: string) => void
  column: string
}

const TaskComponent = ({ task, index, moveTask, column }: TaskComponentProps) => {
  const [, drag, preview] = useDrag(() => ({
    type: 'task',
    item: { index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  const [, drop] = useDrop({
    accept: 'task',
    hover(item: { index: number }) {
      if (item.index !== index) {
        moveTask(item.index, index, column) // ここでcolumnをnewStatusとして渡す
        item.index = index // ドラッグされたアイテムのインデックスを更新
      }
    },
  })

  return (
    <Paper
      ref={(node) => drag(drop(node))}
      key={task.id}
      elevation={1}
      sx={{ margin: '8px 0', padding: '16px' }}
    >
      <div ref={preview}>
        <Typography variant='h6'>{task.title}</Typography>
        <Typography color='textSecondary'>{task.description}</Typography>
        <Typography variant='body2'>{task.dueDate?.toLocaleDateString()}</Typography>
        <Typography variant='body2'>優先度: {task.priority}</Typography>
      </div>
    </Paper>
  )
}
export default TaskComponent
