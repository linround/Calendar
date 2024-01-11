import { useContext, useMemo } from 'react'
import { EventContext } from './propsContext'
import { eventClassification, filterEvents } from '../v3/utils'
import { CalendarEvent, CalendarTimestamp } from '../utils/calendar'
import { endOf, startOf } from '../utils/segments/localizer'
import { toTime } from '../utils/timesStamp'
import {
  eventLevels, eventSegments, eventsForRange
} from '../utils/segments/eventSegments'


// 在周视图和日视图中需要渲染的事件分类
// normalEvents, 渲染在 body 中
// allDayEvents, 渲染在 header 中
// crossDaysEvents,渲染在 header 中
export function useClassifiedEventsInWeekAndDayHook() {

  const {
    events,
  } = useContext(EventContext)
  // 为已有的事件进行分类
  const classifiedEvents = useMemo(() => eventClassification(filterEvents([...events] as CalendarEvent[])),
    [events])

  return {
    classifiedEvents,
  }
}
export function useEditingEventsSegmentsInWeekAndDayHeaderHook(days:CalendarTimestamp[]) {

  const startTime = startOf(toTime(days[0]), 'day')
  const endTime = endOf(toTime(days[days.length - 1]), 'day')
  const {
    createdEvent,
    draggedEvent,
  } = useContext(EventContext)
  // 为已有的事件进行分类
  const classifiedEvents = useMemo(() => eventClassification(filterEvents([createdEvent, draggedEvent] as CalendarEvent[])),
    [createdEvent, draggedEvent])
  const rangeEvent = eventsForRange(
    filterEvents([...classifiedEvents.allDayEvents, ...classifiedEvents.crossDaysEvents]), startTime, endTime
  )

  const segments = rangeEvent.map((event) => eventSegments(event,
    days.map((day) => toTime(day))))

  const { levels, } = eventLevels(segments, 1)


  return {
    levels,
  }
}



