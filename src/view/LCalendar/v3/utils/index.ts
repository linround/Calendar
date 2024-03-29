import { CalendarEvent } from '../../utils/calendar'
import localizer from '../../utils/segments/localizer'


export const CREATE_ACTION = 'create' // 点击空白处 创建事件
export const CREATED_ACTION = 'created' // 点击的是新建的事件
export const DRAGGED_ACTION = 'dragged'// 被创建的拖拽事件的副本
export const NORMAL_ACTION = 'normal' // 普通的已经创建的事件
export const RESIZE_ACTION_END = 'resizeEnd' // 重置事件的结束时间
export const MORE_ACTION = 'more'


export type IEventAction =
  typeof NORMAL_ACTION|
  typeof CREATED_ACTION|
  typeof DRAGGED_ACTION|
  typeof CREATE_ACTION|
  typeof RESIZE_ACTION_END|
  typeof MORE_ACTION

export function filterEvents(events:CalendarEvent []):CalendarEvent[] {
  return events.filter((e) => !!e)
}
export function adjustTime(aTime:number, bTime:number) {
  const startTime = aTime < bTime ?  aTime : bTime
  const endTime = aTime < bTime ? localizer.endOf(bTime, 'day') : localizer.endOf(aTime, 'day')
  return {
    startTime,
    endTime: endTime.valueOf(),
  }
}


export interface IEventClassification {
  crossDaysEvents:CalendarEvent[] // 跨天事件
  allDayEvents:CalendarEvent[] // 全天事件
  normalEvents:CalendarEvent[] // 普通的事件
}


/*
* 划分事件的种类
* 普通的事件
* 全天的事件
* 跨天的事件（事件的开始时间和结束时间不再同一天）
*
* */
export function eventClassification(events:CalendarEvent[]):IEventClassification {
  const crossDaysEvents:CalendarEvent[] = []
  const allDayEvents:CalendarEvent[] = []
  const normalEvents:CalendarEvent[] = []
  events.map((event) => {
    if (event.allDay) {
      allDayEvents.push(event)
    } else if (!localizer.isSameDate(event.start, event.end)) {
      crossDaysEvents.push(event)
    } else {
      normalEvents.push(event)
    }
  })
  return {
    normalEvents,
    allDayEvents,
    crossDaysEvents,
  }
}


export function elementScrollIntoView(ele:Element) {
  ele &&  ele.scrollIntoView({
    behavior: 'smooth',
  })
}
