export interface ICalendar {
  type: string
  value: string | number | Date
}
export interface  IBase{
  start: string
  end: string
  weekdays: number[] | string
}

export interface IEvent {
  name?: string
  color?: string
  start: number
  end: number
  timed?: boolean
}
export type IEvents = IEvent[]

export interface IIntervals {
  maxDays: number
  intervalWidth: number | string
  firstTime?: number|string|object
  firstInterval: number|string
  intervalMinutes: string |number
  intervalCount: number | string
  intervalHeight: number |string
}


export interface IDayProps extends ICalendar, IBase, IIntervals{
  events: IEvents
}

