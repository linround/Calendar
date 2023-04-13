import React, {
  useContext, useEffect, useRef
} from 'react'
import { getVisualsRect } from '../../utils/eventsLayout'
import { EventContext, MouseEventContext } from '../../../props/propsContext'
import { EventsRect } from './EventsRect'
import {
  CalendarDayBodySlotScope, CalendarEventParsed, CalendarTimestamp
} from '../../../utils/calendar'
import styles from './style/event.module.less'
import {
  CREATED_ACTION, DRAGGED_ACTION, NORMAL_ACTION
} from '../../utils'

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
    parsedDraggedEvent, parsedCreatedEvent,
  } = useContext(EventContext)
  const draggedVisualsRect = getVisualsRect(
    day, parsedDraggedEvent, getSlotScope
  )
  const createdVisualsRect = getVisualsRect(
    day, parsedCreatedEvent, getSlotScope
  )
  const { setCreatePopoverRefV3,
    setShowCreatePopoverV3,
    setShowNormalPopover,
    setNormalPopoverRef,
    setNormalEvent, clearPagePopover, updateEventList, } = useContext(MouseEventContext)

  const createRef = useRef<HTMLDivElement|null>(null)
  useEffect(() => {
    setCreatePopoverRefV3(createRef.current)
    setShowCreatePopoverV3(true)
  }, [createRef.current])
  return (
    <>
      <EventsRect
        ref={createRef}
        eventAction={CREATED_ACTION}
        className={styles.eventDragged}
        visualsRect={createdVisualsRect}
        firstMinute={firstMinute}
        days={days}
        daysContainer={daysContainer}
        scrollContainer={scrollContainer} />
      <EventsRect
        eventAction={DRAGGED_ACTION}
        visualsRect={draggedVisualsRect}
        className={styles.eventDragged}
        firstMinute={firstMinute}
        days={days}
        daysContainer={daysContainer}
        scrollContainer={scrollContainer} />
      <EventsRect
        eventAction={NORMAL_ACTION}
        visualsRect={eventVisualsRect}
        firstMinute={firstMinute}
        days={days}
        daysContainer={daysContainer}
        scrollContainer={scrollContainer} />
    </>
  )
}
