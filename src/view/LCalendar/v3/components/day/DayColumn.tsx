import React from 'react'
import {
  CalendarDayBodySlotScope,
  CalendarEventParsed,
  CalendarTimestamp
} from '../../../utils/calendar'
import {
  genTimedEvents,
  IEventsRect,
  isEventOn
} from '../../../utils/events'
import classnames from 'classnames'
import { EventComponent } from './Event'
import { stack } from '../../../utils/modes/stack'
import style from './style/dayColumn.module.less'
import { DEFAULT_WEEK_DAYS } from '../../../utils/time'
import { DEFAULT_EVENT } from '../../../props/propsContext'
import { getDayIdentifier } from '../../../utils/timesStamp'
import { V3DayColumnWrapperComponent } from './DayColumnWrapper'
import { CalendarEventVisual } from '../../../utils/modes/common'

import { EventWrapperComponent } from './EventWrapper'
interface IProps {
  intervals:CalendarTimestamp[][]
  intervalWidth:number
  intervalHeight:number
  days:CalendarTimestamp[]
  events:CalendarEventParsed[]
  getSlotScope: (timestamp: CalendarTimestamp)=> CalendarDayBodySlotScope
}
export function V3DayColumnComponent(props:React.PropsWithChildren<IProps>) {
  const {
    intervals,
    intervalHeight,
    days,
    events,
    getSlotScope,
  } = props
  const dayInterval = intervals[0] || []
  const overLap = stack(
    events, DEFAULT_WEEK_DAYS[0], DEFAULT_EVENT.eventOverlapThreshold
  )

  const renderEvent = (day:CalendarTimestamp) => {
    const identifier = getDayIdentifier(day)
    const dayEvents = events.filter((event) => !event.allDay && isEventOn(event, identifier))
    const dayScope = getSlotScope(day)
    const visuals = overLap(
      dayScope, dayEvents, true, false
    )
    const visualsRect = visuals.map((visual: CalendarEventVisual) => genTimedEvents(visual,
      dayScope))
      .filter((i) => i) as IEventsRect[]
    return (
      <>
        {visualsRect.map((rect, index) => (
          <EventComponent rect={rect} key={index} />
        ))}
      </>
    )
  }
  return (
    <>
      {days.map((day, idx) => (
        <V3DayColumnWrapperComponent key={idx}>
          <div className={classnames({
            [style.dayBody]: true,
            [DEFAULT_EVENT.eventViewContainer]: true,
          })}>
            {dayInterval.map((interval, index) => (
              <div className={style.dayBodyInterval}
                style={{ height: intervalHeight, }}
                key={index} />))}

            <div className={style.dayEvents}>
              {renderEvent(day)}
            </div>
          </div>
        </V3DayColumnWrapperComponent>))}
    </>

  )
}
