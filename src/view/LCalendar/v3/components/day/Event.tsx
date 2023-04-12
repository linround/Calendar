import React, { useContext } from 'react'
import styles from './style/event.module.less'
import { EventWrapperComponent } from './EventWrapper'
import classnames from 'classnames'
import { DEFAULT_EVENT, EventContext } from '../../../props/propsContext'
import {
  CalendarDayBodySlotScope, CalendarEventParsed, CalendarTimestamp
} from '../../../utils/calendar'
import { getVisualsRect } from '../../utils/eventsLayout'

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
  const eventVisualsRect = getVisualsRect(
    day, events, getSlotScope
  )
  const {
    parsedDraggedEvent,
  } = useContext(EventContext)
  const draggedVisualsRect = getVisualsRect(
    day, parsedDraggedEvent, getSlotScope
  )
  draggedVisualsRect.map((rect) => rect.style.zIndex = 100)
  return (
    <>
      {[...draggedVisualsRect, ...eventVisualsRect].map((rect, index) => (
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
