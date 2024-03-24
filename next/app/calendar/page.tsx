'use client'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import jaLocale from '@fullcalendar/core/locales/ja'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import { Task, useTask } from '@/_hooks/useTask'
import { useState } from 'react'
import TaskDetail from '@/_components/ui-parts/calendar/taskDetail'

const Calendar = () => {
  const { tasks } = useTask()
  const [isDetailTask, setIsDetailTask] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)

  const events = tasks.map((task: Task) => ({
    id: task.id?.toString(),
    title: task.title,
    start: task.dueDate,
    color: task.priority === 3 ? 'red' : task.priority === 2 ? 'orange' : 'green',
  }))

  const showTask = (id: string) => {
    const task = tasks.find((task) => task.id === Number(id)) || null
    setSelectedTask(task)
    setIsDetailTask(true)
  }

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
        initialView='dayGridMonth'
        locales={[jaLocale]}
        locale='ja'
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek listWeek',
        }}
        events={events}
        eventClick={(clickInfo) => showTask(clickInfo.event.id)}
      />
      <TaskDetail task={selectedTask} open={isDetailTask} onClose={() => setIsDetailTask(false)} />
    </>
  )
}

export default Calendar
