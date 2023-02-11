import { IGlobalCache } from '../props/type'
import { CalendarEvent } from '../utils/calendar'
import React from 'react'

export const typeOptions = [
  {
    label: '日',
    key: 'day',
  },
  {
    label: '周',
    key: 'week',
  },
  {
    label: '月',
    key: 'month',
  }
]


export interface IDayWrapper {
  globalCache:IGlobalCache,
  clearCreateEvent:()=>void,
  setGlobalCacheValue: (k:keyof IGlobalCache, v: any) => void,
  dragEvent:CalendarEvent | null,
  setDragEvent:React.Dispatch<React.SetStateAction<CalendarEvent|null>>,
  createEvent:CalendarEvent | null
  setCreateEvent:React.Dispatch<React.SetStateAction<CalendarEvent|null>>,
  dragTime:number|null,
  setDragTime:React.Dispatch<React.SetStateAction<number|null>>,
  mousedownTime:number|null,
  setMousedownTime:React.Dispatch<React.SetStateAction<number|null>>,
  mousemoveTime:number|null,
  setMousemoveTime:React.Dispatch<React.SetStateAction<number|null>>,
  createStart:number|null,
  setCreateStart:React.Dispatch<React.SetStateAction<number|null>>,
}
