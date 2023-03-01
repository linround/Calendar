import { IGlobalCache } from '../props/type'
import { CalendarEvent, VTimestampInput } from '../utils/calendar'
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
  setGlobalCacheValue: (k:keyof IGlobalCache, v: any) => void,
  globalCache:IGlobalCache,
  clearCreateEvent:()=>void,
  dragEvent:CalendarEvent | null,
  setDragEvent:React.Dispatch<React.SetStateAction<CalendarEvent|null>>,
  createEvent:CalendarEvent | null
  setCreateEvent:React.Dispatch<React.SetStateAction<CalendarEvent|null>>,
  dragTime:VTimestampInput|null,
  setDragTime:React.Dispatch<React.SetStateAction<VTimestampInput|null>>,
  mousedownTime:VTimestampInput|null,
  setMousedownTime:React.Dispatch<React.SetStateAction<VTimestampInput|null>>,
  mousemoveTime:VTimestampInput|null,
  setMousemoveTime:React.Dispatch<React.SetStateAction<VTimestampInput|null>>,
  createStart:VTimestampInput|null,
  setCreateStart:React.Dispatch<React.SetStateAction<VTimestampInput|null>>,
}

export interface IMonthWrapper {
  createEvent:CalendarEvent | null
  setCreateEvent:React.Dispatch<React.SetStateAction<CalendarEvent|null>>,
  dragEvent:CalendarEvent | null,
  setDragEvent:React.Dispatch<React.SetStateAction<CalendarEvent|null>>,
  dragTime:VTimestampInput|null,
  setDragTime:React.Dispatch<React.SetStateAction<VTimestampInput|null>>,
  mousedownTime:VTimestampInput|null,
  setMousedownTime:React.Dispatch<React.SetStateAction<VTimestampInput|null>>,
  mousemoveTime:VTimestampInput|null,
  setMousemoveTime:React.Dispatch<React.SetStateAction<VTimestampInput|null>>,
  createStart:VTimestampInput|null,
  setCreateStart:React.Dispatch<React.SetStateAction<VTimestampInput|null>>,

  setGlobalCacheValue: (k:keyof IGlobalCache, v: any) => void,
  globalCache:IGlobalCache,
  clearCreateEvent:()=>void,
}

export interface ISideAdd {
  setCreateEvent:React.Dispatch<React.SetStateAction<CalendarEvent|null>>,
}

