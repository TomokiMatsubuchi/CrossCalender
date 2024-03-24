'use client'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { Task, useTask } from '@/_hooks/useTask'

const Calendar = () => {
  const { tasks } = useTask()

  // タスクデータをカレンダーのイベント形式に変換
  const events = tasks.map((task: Task) => ({
    title: task.title, // ここでタスクの名前をイベントのタイトルとして使用
    start: task.dueDate, // タスクの期日をイベントの開始日として使用
  }))
  console.log(events, tasks)

  return <FullCalendar plugins={[dayGridPlugin]} initialView='dayGridMonth' events={events} />
}

export default Calendar
