import { useContext, useMemo } from 'react'
import { EventContext } from './propsContext'
import { eventClassification, filterEvents } from '../v3/utils'
import { CalendarEvent } from '../utils/calendar'


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




