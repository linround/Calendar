import { CalendarTimestamp, VTimestampInput } from '../calendar'
export const OFFSET_YEAR = 10000
export const OFFSET_MONTH = 100
export const OFFSET_HOUR = 100
export const OFFSET_TIME = 10000
export const PARSE_REGEX = /^(\d{4})-(\d{1,2})(-(\d{1,2}))?(\D+(\d{1,2}))?(:(\d{1,2}))?(:(\d{1,2}))?$/

export const DAYS_IN_WEEK = 7

export const DAYS_IN_MONTH: number[] =
  [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
export const DAYS_IN_MONTH_LEAP: number[] =
  [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
export const DAYS_IN_MONTH_MIN = 28
export const DAYS_IN_MONTH_MAX = 31
export const MONTH_MAX = 12
export const MONTH_MIN = 1
export const DAY_MIN = 1

export function padNumber(value:number, length: number):string {
  let padded = String(value)
  while (padded.length < length) {
    padded = '0' + padded
  }
  return padded
}


export function getTime(timesStamp:CalendarTimestamp):string {
  if (!timesStamp.hasTime) {
    return ''
  }
  return `${padNumber(timesStamp.hour, 2)}:${padNumber(timesStamp.minute, 2)}`
}

export function getDate(timesStamp:CalendarTimestamp):string {
  let str = `${padNumber(timesStamp.year, 4)}-${padNumber(timesStamp.month, 2)}`
  if (timesStamp.hasDay) {
    str += `-${padNumber(timesStamp.day, 2)}`
  }
  return str
}

export function updateFormatted(timesStamp:CalendarTimestamp):CalendarTimestamp {
  timesStamp.time = getTime(timesStamp) // time的格式 00-00
  timesStamp.date = getDate(timesStamp) // 年月日 0000-00-00
  return timesStamp
}

export function parseDate(date:Date):CalendarTimestamp {
  return updateFormatted({
    date: '',
    time: '',
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    weekday: date.getDay(),
    hour: date.getHours(),
    minute: date.getMinutes(),
    hasDay: true,
    hasTime: true,
    past: false,
    present: true,
    future: false,
  })
}

// 将日期转换为数字形式的年月日 2020-01-01 转变为 20200101
export function getDayIdentifier (timestamp: { year: number, month: number, day: number }): number {
  return (timestamp.year * OFFSET_YEAR) + (timestamp.month * OFFSET_MONTH) + timestamp.day
}

export function getTimeIdentifier(timestamp:{hour:number, minute:number}) {
  return (timestamp.hour * OFFSET_HOUR) + timestamp.minute
}


export function getWeekday(timestamp:CalendarTimestamp):number {
  const date = `${timestamp.year}-${timestamp.month}-${timestamp.day}`
  return new Date(date)
    .getDay()
}
function updateWeekday(timestamp:CalendarTimestamp):CalendarTimestamp {
  timestamp.weekday = getWeekday(timestamp)
  return timestamp
}
export function getWeekdaySkips (weekdays: number[]): number[] {
  const skips: number[] = [1, 1, 1, 1, 1, 1, 1]
  const filled: number[] = [0, 0, 0, 0, 0, 0, 0]
  for (let i = 0; i < weekdays.length; i++) {
    filled[weekdays[i]] = 1
  }
  for (let k = 0; k < DAYS_IN_WEEK; k++) {
    let skip = 1
    for (let j = 1; j < DAYS_IN_WEEK; j++) {
      const next = (k + j) % DAYS_IN_WEEK
      if (filled[next]) {
        break
      }
      skip += 1
    }
    skips[k] = filled[k] * skip
  }

  return skips
}
export function parseTimesStamp(
  input:VTimestampInput, required = false, now?:CalendarTimestamp
):CalendarTimestamp | null {
  let value = input // 这里重新赋值，主要是为了eslint代码检查 不能直接修改函数参数值
  if (typeof input === 'number' && Number.isFinite(input)) {
    value = new Date(input)
  }
  if (value instanceof Date) {
    const date:CalendarTimestamp = parseDate(value)
    if (now) {
      updateRelative(
        date, now, date.hasTime
      )
    }
    return date
  }
  if (typeof value !== 'string') {
    if (required) {
      throw new Error()
    }
    return null
  }

  const parts = PARSE_REGEX.exec(value)
  if (!parts) {
    if (required) {
      throw new Error()
    }
    return null
  }
  const timestamp:CalendarTimestamp = {
    date: value,
    time: '',
    year: parseInt(parts[1], 10),
    month: parseInt(parts[2], 10) || 1,
    day: parseInt(parts[4], 10) || 1,
    hour: parseInt(parts[6], 10) || 0,
    minute: parseInt(parts[8], 10) || 0,
    weekday: 0,
    hasDay: !!parts[4],
    hasTime: !!(parts[6] && parts[8]),
    past: false,
    present: false,
    future: false,
  }
  updateWeekday(timestamp)
  updateFormatted(timestamp)

  if (now) {
    updateRelative(
      timestamp, now, timestamp.hasTime
    )
  }
  return timestamp
}


export function getTimestampIdentifier(timestamp:CalendarTimestamp):number {
  return (getDayIdentifier(timestamp) * OFFSET_TIME) + getTimeIdentifier(timestamp)
}
export function copyTimestamp (timestamp: CalendarTimestamp): CalendarTimestamp {
  const { date, time, year, month, day, weekday, hour, minute, hasDay, hasTime, past, present, future, } = timestamp

  return { date, time, year, month, day, weekday, hour, minute, hasDay, hasTime, past, present, future, }
}
// 闰年
// 公元年分非4的倍数，为平年。
// 公元年分为4的倍数但非100的倍数，为闰年。
// 公元年分为100的倍数但非400的倍数，为平年。
// 公元年分为400的倍数为闰年。
export function isLeapYear (year: number): boolean {
  return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)
}

export function daysInMonth (year: number, month: number) {
  return isLeapYear(year) ? DAYS_IN_MONTH_LEAP[month] : DAYS_IN_MONTH[month]
}

export function updateRelative (
  timestamp: CalendarTimestamp, now: CalendarTimestamp, time = false
): CalendarTimestamp {
  let a = getDayIdentifier(now)
  let b = getDayIdentifier(timestamp)
  let present = a === b

  if (timestamp.hasTime && time && present) {
    a = getTimeIdentifier(now)
    b = getTimeIdentifier(timestamp)
    present = a === b
  }

  timestamp.past = b < a
  timestamp.present = present
  timestamp.future = b > a

  return timestamp
}
export function relativeDays (
  timestamp: CalendarTimestamp,
  mover = nextDay,
  days = 1
): CalendarTimestamp {
  // eslint-disable-next-line no-param-reassign,no-plusplus
  while (--days >= 0) mover(timestamp)

  return timestamp
}


export function nextDay (timestamp: CalendarTimestamp): CalendarTimestamp {
  timestamp.day += 1
  timestamp.weekday = (timestamp.weekday + 1) % DAYS_IN_WEEK
  if (timestamp.day > DAYS_IN_MONTH_MIN && timestamp.day > daysInMonth(timestamp.year, timestamp.month)) {
    timestamp.day = DAY_MIN
    timestamp.month += 1
    if (timestamp.month > MONTH_MAX) {
      timestamp.month = MONTH_MIN
      timestamp.year += 1
    }
  }

  return timestamp
}
export function createDayList(
  start:CalendarTimestamp,
  end:CalendarTimestamp,
  now:CalendarTimestamp,
  weekdaySkips: number[],
  max = 42,
  min = 0
):CalendarTimestamp[] {
  const stop = getDayIdentifier(end)
  const days:CalendarTimestamp[] = []
  let current = copyTimestamp(start)
  let currentIdentifier = 0
  let stopped = currentIdentifier === stop
  if (stop < getDayIdentifier(start)) {
    throw new Error()
  }
  while ((!stopped || days.length < min) && days.length < max) {
    currentIdentifier = getDayIdentifier(current)
    // 一直到结束的日期即可结束
    stopped = stopped || currentIdentifier === stop
    if (weekdaySkips[current.weekday] === 0) {
      current = nextDay(current)
      continue
    }
    const day = copyTimestamp(current)
    // 时间和年份格式化
    updateFormatted(day)
    // 当前日与now之间的关系
    updateRelative(day, now)
    days.push(day)
    // current继续后移
    current = relativeDays(
      current, nextDay, weekdaySkips[current.weekday]
    )
  }

  if (!days.length) throw new Error()

  return days
}
