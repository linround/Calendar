import { CalendarTimestamp } from '../calendar'

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
