import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Paper, Typography } from '@mui/material'
import { Task } from '../../../kanban/page'

interface TaskComponentProps {
  task: Task
  index: number
  columnId: number
}

const TaskComponent: React.FC<TaskComponentProps> = ({ task, index, columnId }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: JSON.stringify({ columnId, index }),
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <Paper
      ref={setNodeRef}
      style={{ padding: '16px', margin: '8px', ...style }}
      {...attributes}
      {...listeners}
    >
      <Typography variant='h6'>{task.title}</Typography>
      <Typography color='textSecondary'>{task.description}</Typography>
      <Typography variant='body2'>{task.dueDate?.toLocaleDateString()}</Typography>
      <Typography variant='body2'>優先度: {task.priority}</Typography>
    </Paper>
  )
}

export default TaskComponent
