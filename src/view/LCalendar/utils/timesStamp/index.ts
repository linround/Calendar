import {
  CalendarTimestamp, IMouseTime, VTimestampInput
} from '../calendar'
export const OFFSET_YEAR = 10000
export const OFFSET_MONTH = 100
export const OFFSET_HOUR = 100
export const OFFSET_TIME = 10000
export const PARSE_REGEX = /^(\d{4})-(\d{1,2})(-(\d{1,2}))?(\D+(\d{1,2}))?(:(\d{1,2}))?(:(\d{1,2}))?$/

export const PARSE_TIME = /(\d\d?)(:(\d\d?)|)(:(\d\d?)|)/
export const MINUTES_IN_DAY = 24 * 60
export const WIDTH_FULL = 100
export const WIDTH_START = 95
export const DAYS_IN_WEEK = 7
export const MINUTE_MAX = 59
export const HOUR_MAX = 23

export const DAYS_IN_MONTH: number[] =
  [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
export const DAYS_IN_MONTH_LEAP: number[] =
  [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
export const DAYS_IN_MONTH_MIN = 28
export const DAYS_IN_MONTH_MAX = 31
export const MONTH_MAX = 12
export const MONTH_MIN = 1
export const DAY_MIN = 1
export const MINUTES_IN_HOUR = 60
export const ROUND_TIME = 10



export type CalendarTimestampOperation = (timestamp:CalendarTimestamp) => CalendarTimestamp

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


export function timestampToDate(timestamp:CalendarTimestamp):Date {
  const time = `${padNumber(timestamp.hour, 2)}:${padNumber(timestamp.minute, 2)}`
  const date = timestamp.date
  return new Date(`${date}T${time}:00+00:00`)
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

// is可做进一步的类型检查
export function isTimedLess(input:VTimestampInput):input is (Date | number) {
  return  (input instanceof Date) || (typeof input === 'number' && Number.isFinite(input))
}

export function updateHasTime(
  timestamp:CalendarTimestamp, hasTime:boolean, now?:CalendarTimestamp
):CalendarTimestamp {
  if (timestamp.hasTime !== hasTime) {
    timestamp.hasTime = hasTime
    if (!hasTime) {
      timestamp.hour = HOUR_MAX
      timestamp.minute = MINUTE_MAX
      timestamp.time = getTime(timestamp)
    }
    if (now) {
      updateRelative(
        timestamp, now, timestamp.hasTime
      )
    }
  }
  return timestamp
}

// 转换点击的时间为时间戳
export const toTime = (tms:IMouseTime):number => new Date(
  tms.year, tms.month - 1, tms.day, tms.hour, tms.minute
)
  .getTime()

// 处理拖拽事件时的时间边界问题
export const roundTime = (time:number, down = true):number => {
  const roundDownTime = ROUND_TIME * 60 * 1000
  return down ?
    time - (time % roundDownTime) :
    time + (roundDownTime - (time % roundDownTime))
}



export function trsTime(time:VTimestampInput) {

}

export function parseTimeStamp (input: VTimestampInput, required: true, now?: CalendarTimestamp): CalendarTimestamp
export function parseTimeStamp(
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


export function updateWeekday(timestamp:CalendarTimestamp):CalendarTimestamp {
  timestamp.weekday = getWeekday(timestamp)
  return timestamp
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

export function isOutSide(
  day:CalendarTimestamp, start:CalendarTimestamp, end:CalendarTimestamp
):boolean {
  const dayIdentifier = getDayIdentifier(day)
  return dayIdentifier < getDayIdentifier(start) ||
    dayIdentifier > getDayIdentifier(end)
}


export function weekdayFormatter(day:CalendarTimestamp) {
  const intlFormatter = new Intl.DateTimeFormat('zh-cn', {
    timeZone: 'UTC',
    weekday: 'short',
  })
  return intlFormatter.format(timestampToDate(day))
}

export function getTimestampLabel(timestamp:CalendarTimestamp):string {
  if (timestamp.hour === 0 && timestamp.minute === 0) {
    return ''
  }
  return timestamp.time

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

export function parseTime(input:any):number|false {
  if (typeof  input === 'number') {
    // 可以是数字 23点
    return input
  } else if (typeof input === 'string') {
    //可以是字符串 hh:mm:ss
    const parts = PARSE_TIME.exec(input)
    if (!parts) {
      return false
    }
    return (parseInt(parts[1], 10) * 60) + (parseInt((parts[3]), 10) || 0)
  } else if (typeof input === 'object') {
    if (typeof input.hour !== 'number' || typeof input.minute !== 'number') {
      return false
    }
    return (input.hour * 60) + input.minute
  }
  return false

}

export function updateMinutes (
  timestamp: CalendarTimestamp, minutes: number, now?: CalendarTimestamp
): CalendarTimestamp {
  timestamp.hasTime = true
  timestamp.hour = Math.floor(minutes / MINUTES_IN_HOUR)
  timestamp.minute = minutes % MINUTES_IN_HOUR
  timestamp.time = getTime(timestamp)
  if (now) {
    updateRelative(
      timestamp, now, true
    )
  }

  return timestamp
}
export function createIntervalList (
  timestamp: CalendarTimestamp, first: number,
  minutes: number, count: number, now?: CalendarTimestamp
): CalendarTimestamp[] {
  const intervals: CalendarTimestamp[] = []

  for (let i = 0; i < count; i++) {

    const min = first + (i * minutes)
    const int = copyTimestamp(timestamp)
    intervals.push(updateMinutes(
      int, min, now
    ))
  }

  return intervals
}
export type VTime = number|string| {
  hour: number
  minute: number
}


export function nextDay (timestamp: CalendarTimestamp): CalendarTimestamp {
  timestamp.day += 1
  timestamp.weekday = (timestamp.weekday + 1) % DAYS_IN_WEEK
  if (timestamp.day > DAYS_IN_MONTH_MIN &&
    timestamp.day > daysInMonth(timestamp.year, timestamp.month)) {
    timestamp.day = DAY_MIN
    timestamp.month += 1
    if (timestamp.month > MONTH_MAX) {
      timestamp.month = MONTH_MIN
      timestamp.year += 1
    }
  }

  return timestamp
}
export function prevDay(timestamp:CalendarTimestamp) :CalendarTimestamp {
  timestamp.day -= 1
  timestamp.weekday = (timestamp.weekday + 6) % DAYS_IN_WEEK
  if (timestamp.day < DAY_MIN) {
    timestamp.month -= 1
    if (timestamp.month < MONTH_MIN) {
      timestamp.year -= 1
      timestamp.month = MONTH_MAX
    }
    timestamp.day = daysInMonth(timestamp.year, timestamp.month)
  }
  return timestamp
}

export function findWeekday(
  timestamp:CalendarTimestamp, weekday:number, mover:CalendarTimestampOperation = nextDay, maxDays = 6
):CalendarTimestamp {
  // 在eslint中设置了不允许修改函数的参数，所以设置一个中间值
  let days = maxDays
  while (timestamp.weekday !== weekday && days >= 0) {
    // 在此处使用这个中间值
    days = days - 1
    mover(timestamp)
  }
  return timestamp
}

export function getEndOfMonth(timestamp:CalendarTimestamp):CalendarTimestamp {
  const end = copyTimestamp(timestamp)
  end.day = daysInMonth(end.year, end.month)
  updateWeekday(end)
  updateFormatted(end)
  return end
}

export function getStartOfMonth(timestamp:CalendarTimestamp):CalendarTimestamp {
  const start = copyTimestamp(timestamp)
  start.day = DAY_MIN
  // 得到周几
  updateWeekday(start)
  // 格式化时间和日期
  updateFormatted(start)
  return start
}

export function getStartOfWeek(
  timestamp:CalendarTimestamp, weekdays:number[], today?:CalendarTimestamp
):CalendarTimestamp {
  const start = copyTimestamp(timestamp)
  // 找到设置的一周的第一天的日期
  findWeekday(
    start, weekdays[0], prevDay
  )
  updateFormatted(start)
  if (today) {
    updateRelative(
      start, today, start.hasTime
    )
  }
  return start
}

export function validateTimestamp(input:any) :input is VTimestampInput {
  return (typeof input === 'number' && Number.isFinite(input)) ||
    (typeof input === 'string' && !!PARSE_REGEX.exec(input)) ||
    (input instanceof Date)
}


export function getEndOfWeek(
  timestamp:CalendarTimestamp, weekDays:number[], today?:CalendarTimestamp
):CalendarTimestamp {
  const end = copyTimestamp(timestamp)
  findWeekday(end, weekDays[weekDays.length - 1])
  updateFormatted(end)
  if (today) {
    updateRelative(
      end, today, end.hasTime
    )
  }
  return end
}
