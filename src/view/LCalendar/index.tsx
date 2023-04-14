import React, {
  createRef, useContext, useEffect, useLayoutEffect, useState
} from 'react'
import {
  BaseContext, CalendarContext, EventContext, IntervalsContext, MouseEventContext
} from './props/propsContext'
import { V3PopoverComponent } from './v3/popover'
import { DEFAULT_MAX_DAYS, DEFAULT_WEEK_DAYS } from './utils/time'
import { IGlobalCache, ITimes } from './props/type'
import {
  CalendarEvent, CalendarTimestamp, VTimestampInput
} from './utils/calendar'
import {
  copyTimestamp,
  DAY_MIN,
  DAYS_IN_MONTH_MAX,
  DAYS_IN_WEEK,
  getEndOfMonth,
  getEndOfWeek,
  getStartOfMonth,
  getStartOfWeek,
  nextDay,
  prevDay,
  relativeDays,
  timestampToDate,
  updateFormatted,
  updateRelative,
  updateWeekday
} from './utils/timesStamp'
import styles from './style.module.less'
import { PopoverComponents } from './Popover'
import MenuHeader from './modules/MenuHeader'
import { SideComponent } from './SideComponent'
import { DayWrapper } from './modules/DayWrapper'
import { MonthWrapper } from './modules/MonthWrapper'


const globalCache:IGlobalCache = {
  isCreate: false,
  dragSource: null,
  isDragging: false,
  draggingEvent: null,
  currentCreateEvent: null,
  currentMousedownRef: null,
  currentMousedownEvent: null,
}



export default function () {
  const { setEnd,
    setStart,
    weekDays,
    setWeekDays,
    times,
    parsedValue, } = useContext(BaseContext)
  const { events, setEvents, } = useContext(EventContext)
  const { type, value, setValue, setType, } = useContext(CalendarContext)
  const {  setMaxDays, } = useContext(IntervalsContext)
  const { setCreatePopoverRef, } = useContext(MouseEventContext)



  const [dragEvent, setDragEvent] = useState<CalendarEvent | null>(null)
  const [createEvent, setCreateEvent] = useState<CalendarEvent | null>(null)
  const [dragTime, setDragTime] = useState<VTimestampInput|null>(null)
  const [mousedownTime, setMousedownTime] = useState<VTimestampInput|null>(null)
  const [mousemoveTime, setMousemoveTime] = useState<VTimestampInput|null>(null)
  const [createStart, setCreateStart] = useState<VTimestampInput| null>(null)




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
  useLayoutEffect(() => {
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


  function move(amount = 1, calendarType:string):void {
    const moved = copyTimestamp(parsedValue as CalendarTimestamp)

    const forward = amount > 0
    const mover = forward ? nextDay : prevDay
    const limit = forward ? DAYS_IN_MONTH_MAX : DAY_MIN
    let newAmount = forward ? amount : -amount
    while ((newAmount -= 1) >= 0) {
      switch (calendarType) {
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

  const setGlobalCacheValue = (key: keyof IGlobalCache, val:any):void => {
    globalCache[key] = val
  }



  function clearCreateEvent() {
    setEvents(events.filter((e) => !e.isCreate))
  }



  const ref = createRef<Element>()

  useEffect(() => {
    if (ref) {
      setCreatePopoverRef(ref.current)
    } else {
      setCreatePopoverRef(null)
    }
  }, [ref.current, events])


  return (
    <>
      <V3PopoverComponent />
      <PopoverComponents />
      <div
        className={styles.mainContainer}>
        <div className={styles.mainLeft}>
          <SideComponent
            setCreateEvent={setCreateEvent}
            prev={(amount) => move(amount, 'month')}
            next={(amount) => move(amount, 'month')} />
        </div>
        <div className={styles.mainCenter}>
          <MenuHeader
            value={value}
            type={type}
            setToday={setValue}
            setType={setType}
            prev={(amount) => move(amount, type)}
            next={(amount) => move(amount, type)} />
          {
            type === 'month' ?
              <MonthWrapper
                dragEvent={dragEvent}
                setDragEvent={setDragEvent}
                createEvent={createEvent}
                setCreateEvent={setCreateEvent}
                dragTime={dragTime}
                setDragTime={setDragTime}
                mousedownTime={mousedownTime}
                setMousedownTime={setMousedownTime}
                mousemoveTime={mousemoveTime}
                setMousemoveTime={setMousemoveTime}
                createStart={createStart}
                setCreateStart={setCreateStart}
                setGlobalCacheValue={setGlobalCacheValue}
                globalCache={globalCache}
                clearCreateEvent={clearCreateEvent}
                ref={ref}
              /> :
              <DayWrapper />
          }
        </div>
      </div>
    </>

  )
}
