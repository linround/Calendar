import React, { useRef } from 'react'
import {
  CalendarDayBodySlotScope, CalendarEvent, CalendarTimestamp
} from '../../../utils/calendar'
import classnames from 'classnames'
import { EventComponent } from './Event'
import style from './style/dayColumn.module.less'
import { DEFAULT_EVENT } from '../../../props/propsContext'
import { V3DayColumnWrapperComponent } from './DayColumnWrapper'
import { parseEvent } from '../../../utils/events'

interface IProps {
  intervals:CalendarTimestamp[][]
  intervalWidth:number
  intervalHeight:number
  days:CalendarTimestamp[]
  events:CalendarEvent[]
  getSlotScope: (timestamp: CalendarTimestamp)=> CalendarDayBodySlotScope
  scrollContainer: HTMLDivElement
  firstMinute:number
}
export function V3DayColumnComponent(props:React.PropsWithChildren<IProps>) {
  const {
    intervals,
    intervalHeight,
    days,
    events,
    firstMinute,
    getSlotScope,
    scrollContainer,
  } = props
  const parsedEvents = events.map((input, index) => parseEvent(
    input,
    index,
    DEFAULT_EVENT.eventStart,
    DEFAULT_EVENT.eventEnd,
    !!input[DEFAULT_EVENT.eventTimed]
  ))
  const dayInterval = intervals[0] || []

  const daysContainer = useRef<HTMLDivElement|null>(null)
  return (
    <div className={style.dayContainer} ref={daysContainer}>
      {days.map((day, idx) => (
        <V3DayColumnWrapperComponent
          days={days}
          key={idx}
          firstMinute={firstMinute}
          scrollContainer={scrollContainer}
          daysContainer={daysContainer.current as HTMLDivElement}
        >
          <div
            className={classnames({
              [style.dayBody]: true,
              [DEFAULT_EVENT.eventViewContainer]: true,
            })}>
            {dayInterval.map((interval, index) => (
              <div className={style.dayBodyInterval}
                style={{ height: intervalHeight, }}
                key={index} />))}

            <div className={style.dayEvents}>
              <EventComponent
                firstMinute={firstMinute}
                scrollContainer={scrollContainer}
                daysContainer={daysContainer.current as HTMLDivElement}
                days={days}
                events={parsedEvents}
                day={day}
                getSlotScope={getSlotScope}  />
            </div>
          </div>
        </V3DayColumnWrapperComponent>
      ))}
    </div>


  )
}
