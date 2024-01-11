import { useContext, useMemo } from 'react'
import { EventContext } from './propsContext'
import { eventClassification, filterEvents } from '../v3/utils'
import { CalendarEvent } from '../utils/calendar'


// 渲染已经创建的事件
export function useClassifiedEventsHook() {

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




