export interface ICalendar {
  type: string
  value: string | number | Date
}
export interface  IBase{
  start: string
  end: string
  weekdays: number[] | string
}

export interface IIntervals {
  maxDays: number
  intervalWidth: number | string
}


export interface IDayProps extends ICalendar, IBase, IIntervals{}

