import React, { useContext, useState } from 'react'
import { MonthComponent } from '../components/MonthComponent'
import { EventContext } from '../props/propsContext'
import { CalendarEvent, IMouseTime } from '../utils/calendar'
import { toTime } from '../utils/timesStamp'

export function MonthWrapper() {
  const { events, setEvents, } = useContext(EventContext)
  const [dragEvent, setDragEvent] = useState<CalendarEvent | null>(null)
  const [dragTime, setDragTime] = useState<number|null>(null)
  const [mousedownTime, setMousedownTime] = useState<number|null>(null)
  const [mousemoveTime, setMousemoveTime] = useState<number|null>(null)
  const [createEvent, setCreateEvent] = useState<CalendarEvent | null>(null)
  const [createStart, setCreateStart] = useState<number| null>(null)
  const onTimeContainerMousedown = (tms:IMouseTime) => {
    const time = toTime(tms)
    setMousedownTime(time)
    // 在这里设置mousemoveTime
    // 由于鼠标一直在移动，所以确保点击下去的时候不是之前设置的time值
    setMousemoveTime(null)
  }
  return (
    <MonthComponent

    />
  )
}
