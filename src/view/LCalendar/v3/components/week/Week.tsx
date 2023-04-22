import { IMonth, IMonthWeek } from '../../../components/type'
import React, { useContext } from 'react'
import style from './style/week.module.less'
import monthStyle from '../../../components/month.module.less'
import { GenSingleDay } from '../../../components/GenSingleDay'
import { CalendarEvent } from '../../../utils/calendar'
import {
  eventLevels, eventSegments, eventsForRange, sortEvents
} from '../../../utils/segments/eventSegments'
import { endOf, startOf } from '../../../utils/segments/localizer'
import { EventRows } from './EventRows'
import { toTime } from '../../../utils/timesStamp'
import { EventContext } from '../../../props/propsContext'

interface IProps {
  weekDays:IMonthWeek
  events:CalendarEvent[]
  maxRows:number
  minRows:number
  container:HTMLDivElement
  month:IMonth
}
export function V3WeekComponent(props:React.PropsWithChildren<IProps>) {
  const {
    weekDays,
    events,
    maxRows,
    minRows,
    container,
    month,
  } = props
  const { createdEvent, draggedEvent, } = useContext(EventContext)
  const weekStart = startOf(toTime(weekDays[0]), 'day')
  const weekEnd = endOf(toTime(weekDays[weekDays.length - 1]), 'day')
  // 获取一周的事件
  const weekEvents = eventsForRange(
    events,
    weekStart,
    weekEnd
  )
  // 对这周的事件进行排序
  weekEvents.sort((a, b) => sortEvents(a, b))

  // 处理这周事件的布局
  const segments = weekEvents.map((event) => eventSegments(event,
    weekDays.map((day) => startOf(toTime(day), 'day'))))


  // 这里将创建日历部分提取到最上层
  const draggingSegments = segments.filter((segment) =>  segment.event === draggedEvent)
  const createSegments = segments.filter((segment) => segment.event === createdEvent)
  const normalSegments = segments.filter((segment) => segment.event !== draggedEvent && segment.event !== createdEvent)

  const { levels, extra, } = eventLevels([...draggingSegments, ...createSegments, ...normalSegments],
    Math.max(maxRows - 1, 1))
  const slots = weekDays.length

  return (
    <div className={style.weekContainer}>
      <div className={style.weekModal}>
        {weekDays.map((d, index) => (
          <div className={monthStyle.monthModalItem} key={index} />))}
      </div>
      <div className={style.weekHead}>
        {weekDays.map((day, index) => (<GenSingleDay day={day} key={index} />))}
      </div>
      <EventRows
        dates={weekDays}
        rowSegments={segments}
        month={month}
        container={container}
        levels={levels}
        extra={extra}
        slots={slots}
      />
    </div>
  )
}
