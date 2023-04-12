import React, { useContext } from 'react'
import { getVisualsRect } from '../../utils/eventsLayout'
import {  EventContext } from '../../../props/propsContext'
import { EventsRect } from './EventsRect'
import {
  CalendarDayBodySlotScope, CalendarEventParsed, CalendarTimestamp
} from '../../../utils/calendar'
import styles from './style/event.module.less'

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
  return (
    <>
      <EventsRect
        visualsRect={draggedVisualsRect}
        className={styles.eventDragged}
        firstMinute={firstMinute}
        days={days}
        daysContainer={daysContainer}
        scrollContainer={scrollContainer} />
      <EventsRect
        visualsRect={eventVisualsRect}
        firstMinute={firstMinute}
        days={days}
        daysContainer={daysContainer}
        scrollContainer={scrollContainer} />
    </>
  )
}
