import { IMonthDay } from '../components/type'
import { CalendarTimestamp } from '../utils/calendar'
import { getDayIdentifier } from '../utils/timesStamp'

export function isActiveDay(monthDay:IMonthDay, value:CalendarTimestamp) {
  const selectedDay = getDayIdentifier(value)
  const day = getDayIdentifier(monthDay.day)
  return day === selectedDay
}

export interface ISimpleControllerProps {
  prev: (amount: number) => any
  next: (amount: number) => any
}


export interface calendarGroup {
  [prop:string] :any
}

export function createCalendarGroup() {
  return [
    {
      id: 1,
      name: '主日历',
      type: 0, // 0自己的日历 1订阅的日历
      color: 'blue',
    },
    {
      id: 2,
      name: '读书',
      type: 0, // 0自己的日历 1订阅的日历
      color: 'green',
    },
    {
      id: 3,
      name: '张三的日历',
      type: 1, // 0自己的日历 1订阅的日历
      color: 'red',
    },
    {
      id: 4,
      name: '王二的日历',
      type: 1, // 0自己的日历 1订阅的日历
      color: 'yellow',
    }
  ]
}
