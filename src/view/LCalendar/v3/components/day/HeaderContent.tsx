import style from './style/headerContent.module.less'
import React, { useRef } from 'react'
import { CalendarEvent, CalendarTimestamp } from '../../../utils/calendar'
import {
  eventLevels, eventSegments, eventsForRange, sortEvents
} from '../../../utils/segments/eventSegments'
import { toTime } from '../../../utils/timesStamp'
import { endOf, startOf } from '../../../utils/segments/localizer'
import { HeaderRow } from './HeaderRow'
import { HeaderIntervals } from './HeaderIntervals'
import { HeaderBodyWrapper } from './HeaderBodyWrapper'

interface IProps {
  intervalWidth: number
  maxHeight:number
  days:CalendarTimestamp[]
  events:CalendarEvent[]
  maxRow:number
  minRow:number
  fold:boolean
  onMore:()=>void
}
export function HeaderContent(props:React.PropsWithChildren<IProps>) {
  const {
    intervalWidth,
    maxHeight,
    days,
    events,
    maxRow,
    fold,
    onMore,
  } = props
  const startTime = startOf(toTime(days[0]), 'day')
  const endTime = endOf(toTime(days[days.length - 1]), 'day')
  const rangeEvent = eventsForRange(
    events, startTime, endTime
  )
  rangeEvent.sort((a, b) => sortEvents(a, b))



  // 处理这周事件的布局
  const segments = rangeEvent.map((event) => eventSegments(event,
    days.map((day) => toTime(day))))

  // 这里将创建日历部分提取到最上层
  const normalSegments = segments.filter((segment) => !segment.event.isCreate && !segment.event.isDragging)
  const createSegments = segments.filter((segment) => segment.event.isCreate || segment.event.isDragging)
  const { levels, extra, } = eventLevels([
    ...createSegments,
    ...normalSegments
  ], Math.max((fold ? Infinity : maxRow) - 1, 1))
  const slots = days.length


  const container = useRef<HTMLDivElement>(null)
  return (
    <div className={style.headerContent} >
      <HeaderIntervals
        fold={fold}
        onMore={onMore}
        intervalWidth={intervalWidth} />
      <HeaderBodyWrapper
        container={container.current as HTMLDivElement}
        days={days}>
        <div
          className={style.headerBody} >
          <div
            ref={container}
            style={{ paddingRight: 10, }}
            className={style.headerDays}>
            {days.map((day) => (
              <div className={style.headerItem} key={day.date}/>
            ))}
          </div>

          <HeaderRow
            onMore={onMore}
            fold={fold}
            slots={slots}
            levels={levels}
            days={days}
            extra={extra} />
        </div>
      </HeaderBodyWrapper>

    </div>
  )
}
