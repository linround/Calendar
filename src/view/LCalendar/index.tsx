import React, {
  useMemo,
  useState,
  useEffect
} from 'react'
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
  parseTimesStamp,
  DAYS_IN_MONTH_MAX,
  validateTimestamp,
  getTimestampIdentifier, updateFormatted, updateRelative, timestampToDate
} from './utils/timesStamp'
import styles from './style.module.less'
import { creatEvents } from './utils/events'
import MenuHeader from './modules/MenuHeader'
import { IEvents } from './components/dayPropsType'
import DayComponent from './components/DayComponent'





export default function () {
  const [events, setEvents] = useState<IEvents>(creatEvents())
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

        // 以下即: (mousemoveTime-mousedownTime) + start
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




  const DEFAULT_TYPE = 'week'
  const DEFAULT_MAX_DAYS = 7
  const DEFAULT_WEEK_DAYS = [0, 1, 2, 3, 4, 5, 6]
  const [maxDays, setMaxDays] = useState<number>(DEFAULT_MAX_DAYS)
  const [type, setType] = useState<string>(DEFAULT_TYPE)
  const [value, setValue] = useState<string|number|Date>('')
  const [weekDays, setWeekDays] = useState(DEFAULT_WEEK_DAYS)
  const [start, setStart] = useState<string>(parseTimesStamp(Date.now())?.date as string)
  const [end, setEnd] = useState<string>(parseTimesStamp(Date.now())?.date as string)
  const [times] = useState<{now:CalendarTimestamp | null, today:CalendarTimestamp | null}>({
    now: parseTimesStamp('0000-00-00 00:00', true),
    today: parseTimesStamp('0000-00-00', true),
  })
  const parsedStart = useMemo(() => parseTimesStamp(start, true), [start]) as CalendarTimestamp
  const parsedEnd = useMemo(() => {
    const start:CalendarTimestamp = parsedStart as CalendarTimestamp
    const endVal:CalendarTimestamp = end ? parseTimesStamp(end) || start : start
    return getTimestampIdentifier(endVal) < getTimestampIdentifier(start) ? start : endVal
  }, [end])
  const parsedValue = useMemo(() => (validateTimestamp(value) ?
    parseTimesStamp(value, true) :
    (parsedStart || times.today)), [value])


  // 由于move会改变value
  // 所以move会改变 parsedValue
  // parsedValue 会改变当前页面的显示日期
  useEffect(() => {
    const around = parsedValue as CalendarTimestamp
    let newStart = around.date
    let newEnd = around.date
    switch (type) {
    case 'month':{
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
  }, [parsedValue])

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
  }, [type])


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
    updateRelative(moved, times.now as CalendarTimestamp)
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
          setType={setType}
          prev={(amount) => move(amount)}
          next={(amount) => move(amount)} />
        <DayComponent
          onMousedownEvent={onMousedownEvent}
          onTimeContainerMousedown={onTimeContainerMousedown}
          onTimeContainerMousemove={onTimeContainerMousemove}
          onTimeContainerMouseup={onTimeContainerMouseup}
          events={events}
          type={type}
          parsedStart={parsedStart}
          parsedEnd={parsedEnd}
          times={times}
          maxDays={maxDays} />
      </div>
    </div>
  )
}
