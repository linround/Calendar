import { DayColumnWrapper } from './DayColumnWrapper'
import { getSlotMetrics, ISlotMetrics } from '../utils/timeSlots'
import React, {
  createRef, ReactElement, useState
} from 'react'
import { TimeSlotGroup } from './TimeSlotGroup'
import style from './style/dayColumn.module.less'
import { EventContainerWrapper } from './EventContainerWrapper'
import { CalendarEvent } from '../../utils/calendar'
import { getStyledEvents } from '../utils/dayEventLayout'
import { accessors } from '../../utils/segments/accessors'
import localizer from '../../utils/segments/localizer'
import { TimeGridEvent } from './TimeGridEvent'

interface IDayColumn{
  min: Date
  max:Date
  step: number
  timeslots: number
  events: CalendarEvent[]
}
export function DayColumn(props:IDayColumn) {
  const { events, step, timeslots, } = props
  const [slotMetrics] = useState<ISlotMetrics>(getSlotMetrics(props))

  const containerRef = createRef<HTMLDivElement>()
  const renderEvents = ():ReactElement[] => {
    const styleEvents = getStyledEvents({
      events,
      slotMetrics,
      minimumStartDifference: Math.ceil((step * timeslots) / 2),
    })
    return styleEvents.map(({ event, style, }, index) => {
      const start = accessors.start(event)
      const end = accessors.end(event)
      const format = 'hh:mm'
      const label = `${localizer.format(start, format)}-${localizer.format(end, format)}`
      return (
        <TimeGridEvent
          key={index}
          label={label}
          style={style}
          event={event}
        />
      )
    })
  }
  return (
    <DayColumnWrapper ref={containerRef} className={style.v2DaySlot} >
      {slotMetrics.groups.map((group, index) => (
        <TimeSlotGroup
          key={index}
          groupClassName={style.v2Group}
          groupItemClassName={style.v2GroupItem}
          group={group}/>
      ))}
      <EventContainerWrapper slotMetrics={slotMetrics}>
        <div className={style.v2EventsContainer}>
          {renderEvents()}
        </div>
      </EventContainerWrapper>
    </DayColumnWrapper>
  )
}
