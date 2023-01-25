import { IEvents } from './components/dayPropsType'
import styles from './style.module.less'
import DayComponent from './components/DayComponent'
import MenuHeader from './modules/MenuHeader'
import React, { useEffect, useState } from 'react'
import {
  CalendarEvent, IMouseEvent, IMouseTime
} from './utils/calendar'
import {
  getEndOfWeek,
  getStartOfWeek, parseDate
} from './utils/timesStamp'



const dateStr = '2023-01-25 00:45:00'
const eventStart = new Date(dateStr)
  .valueOf()
const eventEnd = eventStart + (2 * 60 * 60 * 1000)
const otherEnd = eventEnd + (4 * 60 * 60 * 1000)

const otherStart = eventStart + (2 * 60 * 60 * 1000) + 15 * 60 * 1000
const otherEnd2 = otherStart + (6 * 60 * 60 * 1000)


export default function () {
  const [events, setEvents] = useState<IEvents>([

    {
      name: 'green',
      color: 'green',
      start: otherStart,
      end: otherEnd,
      timed: true,
    },
    {
      name: 'red',
      color: 'red',
      start: otherStart,
      end: otherEnd2,
      timed: true,
    },
    {
      name: 'black',
      color: 'black',
      start: eventStart,
      end: otherEnd,
      timed: true,
    },
    {
      name: 'blue',
      color: 'blue',
      start: eventStart,
      end: eventEnd,
      timed: true,
    }
  ])
  // 处理拖拽事件时的时间边界问题
  const roundTime = (time:number, down = true):number => {
    const roundTo = 15
    const roundDownTime = roundTo * 60 * 1000
    return down ?
      time - (time % roundDownTime) :
      time + (roundDownTime - (time % roundDownTime))
  }
  // 转换点击的时间为时间戳
  const toTime = (tms:IMouseTime):number => new Date(
    tms.year, tms.month - 1, tms.day, tms.hour, tms.minute
  )
    .getTime()


  const [dragEvent, setDragEvent] = useState<CalendarEvent | null>(null)
  const [dragTime, setDragTime] = useState<number|null>(null)
  const [mousedownTime, setMousedownTime] = useState<number|null>(null)
  const [mousemoveTime, setMousemoveTime] = useState<number|null>(null)

  const onMousedownEvent = ({ event, }: IMouseEvent) => {
    setDragEvent(event)
  }
  const onTimeContainerMousedown = (tms:IMouseTime) => {
    const time = toTime(tms)
    setMousedownTime(time)
  }
  useEffect(() => {
    if (dragEvent && mousedownTime) {
      const start = dragEvent.start
      const dragTime = mousedownTime - start
      setDragTime(dragTime)
    }
  }, [dragEvent, mousedownTime])

  const onTimeContainerMousemove = (tms:IMouseTime) => {
    const time = toTime(tms)
    setMousemoveTime(time)
  }
  const onTimeContainerMouseup = (time:IMouseTime) => {
    setDragEvent(null)
    setMousedownTime(null)
    setMousemoveTime(null)
  }


  useEffect(() => {
    if (dragEvent && mousedownTime) {
      if (dragTime && mousemoveTime) {
        const start = dragEvent.start
        const end = dragEvent.end
        // 计算事件的时长
        const duration = end - start
        //                      以下即: (mousemoveTime-mousedownTime) + start
        // 从而得到了一个新的开始时间
        const newStartTime = mousemoveTime - dragTime
        const newStart = roundTime(newStartTime)
        const newEnd = newStart + duration
        dragEvent.start = newStart
        dragEvent.end = newEnd


        const index = events.findIndex((e) => e === dragEvent)
        events.splice(
          index, 1, dragEvent
        )
        setEvents([...events])
      }
    }
  }, [mousemoveTime, dragTime])

  const around = parseDate(new Date())
  const weekDays = [0, 1, 2, 3, 4, 5, 6]
  const start = getStartOfWeek(
    around, weekDays, around
  ).date
  const end = getEndOfWeek(
    around, weekDays, around
  ).date
  return (
    <div className={styles.mainContainer}>
      <div className={styles.mainLeft}></div>
      <div className={styles.mainRight}>
        <MenuHeader />
        <DayComponent
          onMousedownEvent={onMousedownEvent}
          onTimeContainerMousedown={onTimeContainerMousedown}
          onTimeContainerMousemove={onTimeContainerMousemove}
          onTimeContainerMouseup={onTimeContainerMouseup}
          events={events} type={'week'}
          start={start}
          end={end}
          maxDays={7} />
      </div>
    </div>
  )
}
