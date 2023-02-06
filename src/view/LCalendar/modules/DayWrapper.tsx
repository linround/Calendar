import React, {
  useCallback, useContext, useEffect, useState
} from 'react'
import DayComponent from '../components/DayComponent'
import { EventContext } from '../props/propsContext'
import {
  CalendarEvent, IMouseEvent, IMouseTime
} from '../utils/calendar'
import {
  isTruth,
  ROUND_TIME,
  roundTime,
  toTime
} from '../utils/timesStamp'

export function DayWrapper() {

  const { events, setEvents, } = useContext(EventContext)
  const [dragEvent, setDragEvent] = useState<CalendarEvent | null>(null)
  const [dragTime, setDragTime] = useState<number|null>(null)
  const [mousedownTime, setMousedownTime] = useState<number|null>(null)
  const [mousemoveTime, setMousemoveTime] = useState<number|null>(null)
  const [createEvent, setCreateEvent] = useState<CalendarEvent | null>(null)
  const [createStart, setCreateStart] = useState<number| null>(null)

  const onMousedownEvent = (e: IMouseEvent) => {
    const { event, } = e
    setDragEvent(event)
    return e
  }


  const onTimeContainerMousedown = (tms:IMouseTime) => {
    const time = toTime(tms)
    setMousedownTime(time)
    // 在这里设置mousemoveTime
    // 由于鼠标一直在移动，所以确保点击下去的时候不是之前设置的time值
    setMousemoveTime(null)
    return tms
  }

  const onTimeContainerMousemove = useCallback((tms:IMouseTime) => {
    if (!mousedownTime) return tms
    const time = toTime(tms)
    setMousemoveTime(time)
    return tms
  }, [mousedownTime])


  const onTimeContainerMouseup = (tms:IMouseTime) => {
    setDragEvent(null)
    setMousedownTime(null)
    setMousemoveTime(null)
    setCreateEvent(null)
    setCreateStart(null)
    return tms
  }






  const resetEvents = (oldEvent:CalendarEvent, newEvent:CalendarEvent):void => {
    const index = events.findIndex((e) => e === oldEvent)
    events.splice(
      index, 1, newEvent
    )
    setEvents([...events])
  }



  // 以下处理是对原有的日历时间进行拖拽
  // 还是新建的日历事件
  // 对于新建的日历事件 依赖dragEvent(被拖拽的事件) 和 点击处的时间点(mousedownTime)
  // 最终设置拖拽的时间段 dragTime
  useEffect(() => {
    if (dragEvent && mousedownTime) {
      const start = dragEvent.start
      const dragTime = mousedownTime - start
      setDragTime(dragTime)
    } else if (mousedownTime && !dragEvent) {
      const createStart = roundTime(mousedownTime)
      const createEnd = createStart + (ROUND_TIME  * 60 * 1000)
      const createEvent = {
        name: `日历事件 ${events.length}`,
        color: 'green',
        start: createStart,
        end: createEnd,
        timed: true,
        allDay: false,
        title: `日历事件 ${events.length}`,
      }
      setEvents([...events, createEvent])
      setCreateEvent(createEvent)
      setCreateStart(createStart)
    }
  }, [mousedownTime, dragEvent])


  // 通过监听move事件的时间点，设置事件时间段
  // 单独的将 createEvent 这个事件的逻辑提取出来
  useEffect(() => {
    if (createEvent &&
      mousemoveTime &&
      createStart) {
      const mouseRound = roundTime(mousemoveTime)
      createEvent.start = Math.min(mouseRound, createStart)
      createEvent.end = Math.max(mouseRound, createStart)
      resetEvents(createEvent, createEvent)
    }
  }, [createEvent, mousemoveTime, createStart])



  // 以下是点击日历事件，对日历事件进行拖拽的逻辑
  // 主要依赖拖拽的时间段 dragTime
  useEffect(() => {
    if (dragEvent) {
      if (isTruth(dragTime) && mousemoveTime) {
        const { start, end, } = dragEvent
        // 计算事件的时长
        const duration = end - start
        // 以下即: (mousemoveTime-mousedownTime) + start
        // 从而得到了一个新的开始时间
        const newStartTime = mousemoveTime - dragTime
        const newStart = roundTime(newStartTime)
        const newEnd = newStart + duration
        dragEvent.start = newStart
        dragEvent.end = newEnd

        resetEvents(dragEvent, dragEvent)

      }
    }
  }, [mousemoveTime, dragTime])






  return (
    <>
      <DayComponent
        onMousedownEvent={onMousedownEvent}
        onTimeContainerMousedown={onTimeContainerMousedown}
        onTimeContainerMousemove={onTimeContainerMousemove}
        onTimeContainerMouseup={onTimeContainerMouseup} />
    </>
  )
}
