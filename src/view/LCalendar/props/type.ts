import { CalendarTimestamp, IValue } from '../utils/calendar'
import React from 'react'

export interface ITimes {
  now: CalendarTimestamp
  today: CalendarTimestamp
}

export interface IBaseContext {
  start: string
  setStart: React.Dispatch<React.SetStateAction<string>>
  end:string
  setEnd: React.Dispatch<React.SetStateAction<string>>
  weekDays: number[]
  setWeekDays: React.Dispatch<React.SetStateAction<number[]>>
  parsedWeekdays: number[]
  weekdaySkips:number[]
  times?: ITimes
  parsedEnd?: CalendarTimestamp
  parsedStart?:CalendarTimestamp
  parsedValue?:CalendarTimestamp
  days?:CalendarTimestamp[]
}
export interface ICalendarContext {
  value: IValue,
  setValue: React.Dispatch<React.SetStateAction<IValue>>
  type: string,
  setType: React.Dispatch<React.SetStateAction<string>>
}
export interface IIntervalsContext {
  maxDays: number
  setMaxDays: React.Dispatch<React.SetStateAction<number>>
  intervalHeight: number
  intervalWidth: number
  firstInterval: number
  intervalCount: number
  intervalMinutes: number
}
