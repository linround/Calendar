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
      groupId: 1,
      userId: '',
      groupType: 0, // 0自己的日历 1订阅的日历
      groupName: '主日历',
      groupColor: 'blue',
    },
    {
      groupId: 2,
      userId: '',
      groupType: 0, // 0自己的日历 1订阅的日历
      groupName: '主日历',
      groupColor: 'blue',
    },
    {
      groupId: 3,
      userId: '',
      groupType: 1, // 0自己的日历 1订阅的日历
      groupName: '主日历',
      groupColor: 'blue',
    },
    {
      groupId: 4,
      userId: '',
      groupType: 1, // 0自己的日历 1订阅的日历
      groupName: '主日历',
      groupColor: 'blue',
    }
  ]
}
