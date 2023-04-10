import { VTimestampInput } from './calendar'
import moment from 'moment/moment'

export const DEFAULT_TYPE = 'day'
export const DEFAULT_MAX_DAYS = 7
export const DEFAULT_VALUE = Date.now()
export const DEFAULT_WEEK_DAYS = [0, 1, 2, 3, 4, 5, 6]
export const WEEK_DAYS_TEXT = ['日', '一', '二', '三', '四', '五', '六']
export const DEFAULT_WEEK_SKIPS = [1, 1, 1, 1, 1, 1, 1]
export const DEFAULT_CALENDAR_GROUPS = []

export const CALENDAR_EVENT_MIN_DURATION = 10
export const NO_NAME_EVENT_VALUE = '无标题'


export function getDayNowTime(day:VTimestampInput):VTimestampInput {
  const currentHour = new Date()
    .getHours()
  const time = moment(day)
    .hours(currentHour)
    .valueOf()
  return time
}

export function getValueFormat(value:VTimestampInput, type:string):string {
  let str = ''
  switch (type) {
  case 'month':{
    str = moment(value)
      .format('YYYY年MM月')
    break
  }
  case 'week' :{
    str = moment(value)
      .format('YYYY年MM月')
    break
  }
  case 'day' :{
    str = moment(value)
      .format('YYYY年MM月DD日')
    break
  }
  }
  return str
}
