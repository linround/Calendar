import { IMonth, IMonthWeek } from '../../../components/type'
import React from 'react'
import style from './style/week.module.less'
import monthStyle from '../../../components/month.module.less'
import { GenSingleDay } from '../../../components/GenSingleDay'
import { CalendarEvent } from '../../../utils/calendar'
import {
  eventLevels,
  eventSegments,
  eventsForWeek,
  isSegmentInSlot,
  sortEvents
} from '../../../utils/segments/eventSegments'
import { accessors } from '../../../utils/segments/accessors'
import localizer from '../../../utils/segments/localizer'
import { EventRows } from './EventRows'

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
  // 获取一周的事件
  const weekEvents = eventsForWeek(
    events,
    weekDays[0].value,
    weekDays[weekDays.length - 1].value,
    accessors,
    localizer
  )

  // 对这周的事件进行排序
  weekEvents.sort((a, b) => sortEvents(
    a, b, accessors, localizer
  ))

  // 处理这周事件的布局
  const segments = weekEvents.map((event) => eventSegments(
    event,
    weekDays.map((day) => day.value),
    accessors,
    localizer
  ))


  // 这里将创建日历部分提取到最上层
  const normalSegments = segments.filter((segment) => !segment.event.isCreate && !segment.event.isDragging)
  const createSegments = segments.filter((segment) => segment.event.isCreate || segment.event.isDragging)

  const { levels, extra, } = eventLevels([...createSegments, ...normalSegments],
    Math.max(maxRows - 1, 1))
  const slots = weekDays.length

  const handleShowMore = (slot:number, nativeEvent:React.MouseEvent) => {
    const events = segments
      .filter((seg) => isSegmentInSlot(seg, slot))
      .map((seg) => seg.event)
    console.log(events, nativeEvent)
  }
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
        month={month}
        container={container}
        levels={levels}
        extra={extra}
        slots={slots}
      />
    </div>
  )
}
