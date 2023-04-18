import style from './style/headerContent.module.less'
import React from 'react'
import { CalendarEventParsed, CalendarTimestamp } from '../../../utils/calendar'
import {
  eventLevels, eventSegments, eventsForRange, sortEvents
} from '../../../utils/segments/eventSegments'
import { toTime } from '../../../utils/timesStamp'
import { endOf, startOf } from '../../../utils/segments/localizer'
import { HeaderRow } from './HeaderRow'

interface IProps {
  intervalWidth: number
  height:number
  days:CalendarTimestamp[]
  events:CalendarEventParsed[]
  maxRow:number
  minRow:number
}
export function HeaderContent(props:React.PropsWithChildren<IProps>) {
  const {
    intervalWidth,
    height,
    days,
    events,
    maxRow,
  } = props
  const inputEvents = events.map((e) => e.input)
  const startTime = startOf(toTime(days[0]), 'day')
  const endTime = endOf(toTime(days[days.length - 1]), 'day')
  const rangeEvent = eventsForRange(
    inputEvents, startTime, endTime
  )
  rangeEvent.sort((a, b) => sortEvents(a, b))
  // 处理这周事件的布局
  const segments = inputEvents.map((event) => eventSegments(event,
    days.map((day) => toTime(day))))

  // 这里将创建日历部分提取到最上层
  const normalSegments = segments.filter((segment) => !segment.event.isCreate && !segment.event.isDragging)
  const createSegments = segments.filter((segment) => segment.event.isCreate || segment.event.isDragging)
  const { levels, extra, } = eventLevels([...createSegments, ...normalSegments], Math.max(maxRow - 1, 1))
  const slots = days.length

  console.log(levels, rangeEvent)

  return (
    <div className={style.headerContent} style={{ marginRight: 10, }}>
      <div className={style.headerInterVals} style={{ width: intervalWidth, height, }} >
        全天
      </div>
      <div className={style.headerDays}>
        {days.map((day) => (
          <div className={style.headerItem} key={day.date}>{day.date}</div>
        ))}
        <HeaderRow
          slots={slots}
          levels={levels}
          days={days}
          extra={extra} />
      </div>

    </div>
  )
}
