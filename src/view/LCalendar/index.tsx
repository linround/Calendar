import React, {
  useState,
  useEffect,
  useContext
} from 'react'
import { DayWrapper } from './modules/DayWrapper'
import { MonthWrapper } from './modules/MonthWrapper'
import {
  DEFAULT_MAX_DAYS,
  DEFAULT_WEEK_DAYS
} from './utils/time'
import { ITimes } from './props/type'
import {
  IMouseTime,
  IMouseEvent,
  CalendarEvent,
  CalendarTimestamp
} from './utils/calendar'
import {
  toTime,
  nextDay,
  prevDay,
  DAY_MIN,
  roundTime,
  relativeDays,
  DAYS_IN_WEEK,
  getEndOfWeek,
  copyTimestamp,
  updateWeekday,
  getStartOfWeek,
  updateRelative,
  timestampToDate,
  updateFormatted,
  DAYS_IN_MONTH_MAX, ROUND_TIME, getStartOfMonth, getEndOfMonth
} from './utils/timesStamp'
import styles from './style.module.less'
import MenuHeader from './modules/MenuHeader'
import DayComponent from './components/DayComponent'
import { MonthComponent } from './components/MonthComponent'
import {
  BaseContext, CalendarContext, EventContext, IntervalsContext
} from './props/propsContext'






export default function () {
  const { events, setEvents, } = useContext(EventContext)
  const [dragEvent, setDragEvent] = useState<CalendarEvent | null>(null)
  const [dragTime, setDragTime] = useState<number|null>(null)
  const [mousedownTime, setMousedownTime] = useState<number|null>(null)
  const [mousemoveTime, setMousemoveTime] = useState<number|null>(null)
  const [createEvent, setCreateEvent] = useState<CalendarEvent | null>(null)
  const [createStart, setCreateStart] = useState<number| null>(null)

  const onMousedownEvent = ({ event, }: IMouseEvent) => {
    setDragEvent(event)
  }
  const onContextMenuEvent = ({ event, }:IMouseEvent) => {
    console.log('onTimeContainerContextMenu', event)
  }



  const onTimeContainerMousedown = (tms:IMouseTime) => {
    const time = toTime(tms)
    setMousedownTime(time)
    // 在这里设置mousemoveTime
    // 由于鼠标一直在移动，所以确保点击下去的时候不是之前设置的time值
    setMousemoveTime(null)
  }



  const onTimeContainerMousemove = (tms:IMouseTime) => {
    const time = toTime(tms)
    setMousemoveTime(time)
  }






  const onTimeContainerMouseup = (time:IMouseTime) => {
    setDragEvent(null)
    setMousedownTime(null)
    setMousemoveTime(null)
    setCreateEvent(null)
    setCreateStart(null)
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





  // 以下是点击日历事件，对日历事件进行拖拽的逻辑
  // 主要依赖拖拽的时间段 dragTime
  useEffect(() => {
    if (dragEvent && mousedownTime) {
      if (dragTime && mousemoveTime) {
        const start = dragEvent.start
        const end = dragEvent.end
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




  const { setEnd,
    setStart,
    weekDays,
    setWeekDays,
    times,
    parsedValue, } = useContext(BaseContext)
  const { type, value, setValue, setType, } = useContext(CalendarContext)
  const {  setMaxDays, } = useContext(IntervalsContext)




  // 这里的是为了响应type的变化
  // 目前在周视图和日视图中
  // 修改 maxDays 和 weekDays
  useEffect(() => {
    const around = parsedValue as CalendarTimestamp
    let newMaxDays = DEFAULT_MAX_DAYS
    let newWeekdays = DEFAULT_WEEK_DAYS
    switch (type) {
    case 'month':{
      break
    }
    case 'week':{
      break
    }
    case 'day':{
      newMaxDays = 1
      newWeekdays = [around.weekday]
    }
    }
    setMaxDays(newMaxDays)
    setWeekDays(newWeekdays)
  }, [type, parsedValue])

  // 由于move会改变value
  // 所以move会改变 parsedValue
  // value 会改变当前页面的显示日期
  // 这里还会依赖到 maxDays weekDays
  // 当修改type完成后,根据上面两个值渲染新的页面
  useEffect(() => {
    const around = parsedValue as CalendarTimestamp
    let newStart = around.date
    let newEnd = around.date
    switch (type) {
    case 'month':{
      newStart = getStartOfMonth(around).date
      newEnd = getEndOfMonth(around).date
      break
    }
    case 'week':{
      newStart = getStartOfWeek(
        around, weekDays, around
      ).date
      newEnd = getEndOfWeek(
        around, weekDays, around
      ).date
      break
    }
    case 'day':{
      break
    }
    }
    setStart(newStart)
    setEnd(newEnd)
  }, [parsedValue, weekDays, type])
  // 点击下一天，应该提前更新parsedValue


  function move(amount = 1):void {
    const moved = copyTimestamp(parsedValue as CalendarTimestamp)
    const forward = amount > 0
    const mover = forward ? nextDay : prevDay
    const limit = forward ? DAYS_IN_MONTH_MAX : DAY_MIN
    let newAmount = forward ? amount : -amount
    while ((newAmount -= 1) >= 0) {
      switch (type) {
      case 'month':{
        moved.day = limit
        mover(moved)
        break
      }
      case 'week':{
        relativeDays(
          moved, mover, DAYS_IN_WEEK
        )
        break
      }
      case 'day':{
        relativeDays(
          moved, mover, 1
        )
        break
      }
      }
    }
    // 根据年月日 计算周几
    updateWeekday(moved)
    // 设置 time 和 date
    updateFormatted(moved)
    updateRelative(moved, (times as ITimes).now)
    if (value instanceof Date) {
      setValue(timestampToDate(moved))
    } else if (typeof value === 'number') {
      setValue(timestampToDate(moved)
        .getTime())
    } else {
      setValue(moved.date)
    }
  }


  return (
    <div className={styles.mainContainer}>
      <div className={styles.mainLeft}></div>
      <div className={styles.mainRight}>
        <MenuHeader
          type={type}
          setToday={setValue}
          setType={setType}
          prev={(amount) => move(amount)}
          next={(amount) => move(amount)} />
        {
          type === 'month' ?
            <MonthComponent
            /> :
            <DayComponent
              onMousedownEvent={onMousedownEvent}
              onContextMenuEvent={onContextMenuEvent}
              onTimeContainerMousedown={onTimeContainerMousedown}
              onTimeContainerMousemove={onTimeContainerMousemove}
              onTimeContainerMouseup={onTimeContainerMouseup} />
        }
      </div>
    </div>
  )
}
