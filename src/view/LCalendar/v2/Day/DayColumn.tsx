import { DayColumnWrapper } from './DayColumnWrapper'
import { getSlotMetrics, ISlotMetrics } from '../utils/timeSlots'
import React, { createRef, useState } from 'react'
import { TimeSlotGroup } from './TimeSlotGroup'
import style from './style/dayColumn.module.less'
import { EventContainerWrapper } from './EventContainerWrapper'
import { CalendarEvent } from '../../utils/calendar'
import { getStyledEvents } from '../utils/dayEventLayout'

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
  const RenderEvents = () => {
    const styleEvents = getStyledEvents({
      events,
      slotMetrics,
      minimumStartDifference: Math.ceil((step * timeslots) / 2),
    })

    return (<>events</>)
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
          <RenderEvents />
        </div>
      </EventContainerWrapper>
    </DayColumnWrapper>
  )
}
