import {
  genTimedEvents, IEventsRect, isEventOn
} from '../../../utils/events'
import React, { useState } from 'react'
import styles from './style/event.module.less'
import { EventWrapperComponent } from './EventWrapper'
import classnames from 'classnames'
import { DEFAULT_EVENT } from '../../../props/propsContext'
import { getDayIdentifier } from '../../../utils/timesStamp'
import { CalendarEventVisual } from '../../../utils/modes/common'
import {
  CalendarDayBodySlotScope, CalendarEvent, CalendarEventParsed, CalendarTimestamp
} from '../../../utils/calendar'
import { stack } from '../../../utils/modes/stack'
import { DEFAULT_WEEK_DAYS } from '../../../utils/time'

interface IProps {
  day:CalendarTimestamp
  events:CalendarEventParsed[]
  getSlotScope: (timestamp: CalendarTimestamp)=> CalendarDayBodySlotScope
  days:CalendarTimestamp[]
  firstMinute:number

  daysContainer:HTMLDivElement
  scrollContainer: HTMLDivElement
}
export function EventComponent(props:React.PropsWithChildren<IProps>) {
  const {
    events,
    day,
    getSlotScope,
    days,
    firstMinute,
    daysContainer,
    scrollContainer,
  } = props
  const overLap = stack(
    events, DEFAULT_WEEK_DAYS[0], DEFAULT_EVENT.eventOverlapThreshold
  )
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
        <EventWrapperComponent
          key={index}
          days={days}
          event={rect.event}
          firstMinute={firstMinute}
          daysContainer={daysContainer}
          scrollContainer={scrollContainer}
        >
          <div style={rect.style} className={classnames({
            [styles.eventContainer]: true,
            [DEFAULT_EVENT.eventClass]: true,
          })}>
            <div>{rect.content.title}</div>
            <div>{rect.content.timeRange}</div>
          </div>
        </EventWrapperComponent>
      ))}
    </>
  )
}
