import { VTimestampInput } from '../utils/calendar'
import localizer from '../utils/segments/localizer'
import { WEEK_DAYS_TEXT } from '../utils/time'
import { padNumber } from '../utils/timesStamp'
import React, { HTMLAttributes, InputHTMLAttributes } from 'react'




export const POPOVER_WIDTH_DEF = 300
export const IS_FULL_WIDTH = 'is_full_width'
export const IS_HIGH_LEVEL = 'is_high_level'
export const IS_DRAGGED = 'is_dragged'




export type IDefaultValue = string | number | ReadonlyArray<string> | undefined;
export interface IMixinPopoverHeader {
  onClose:()=>void
}
export interface IMixinPopoverBody {
  name: IDefaultValue
  setName: React.Dispatch<React.SetStateAction<IDefaultValue>>
  location: string | undefined,
  setLocation:React.Dispatch<React.SetStateAction<string|undefined>>
  start: number,
  setStart:React.Dispatch<React.SetStateAction<number>>
  end: number,
  setEnd:React.Dispatch<React.SetStateAction<number>>
}
















export const calcPosition = (content:Element, container:Element):{left:number, top:number} => {
  const { left: contentLeft, top: contentTop, } = content.getBoundingClientRect()
  const { left: containerLeft, top: containerTop, } = container.getBoundingClientRect()
  // console.log('content', { contentLeft, contentTop, })
  // console.log('container', { containerLeft, containerTop, })
  return  {
    left: contentLeft + 10,
    top: contentTop + 10,
  }
}

const joiner = '~'
export function getEventTimeLabel(start:VTimestampInput, end:VTimestampInput):string {
  const startDate = new Date(start)
  const endDate = new Date(end)

  const startHour = padNumber(startDate.getHours(), 2)
  const startMinute = padNumber(startDate.getMinutes(), 2)

  const endHour = padNumber(endDate.getHours(), 2)
  const endMinute = padNumber(endDate.getMinutes(), 2)
  return `${startHour}:${startMinute}${joiner}${endHour}:${endMinute}`
}
export function getEventDayLabel(start:VTimestampInput, end:VTimestampInput):string {

  const startDate = new Date(start)
  const endDate = new Date(end)

  const startYear:string|number = `${startDate.getFullYear()}年`
  const startMonth:string|number = `${startDate.getMonth() + 1}月`
  const startDay:string|number = `${startDate.getDate()}日`

  const endYear:string|number = `${endDate.getFullYear()}年`
  const endMonth:string|number = `${endDate.getMonth() + 1}月`
  const endDay:string|number = `${endDate.getDate()}日`

  const weekday:string|number = `周${WEEK_DAYS_TEXT[startDate.getDay()]}`

  if (localizer.eq(
    start, end, 'year'
  )) {
    if (localizer.eq(
      start, end, 'month'
    )) {
      if (localizer.eq(
        start, end, 'day'
      )) {
      //  同年同月同日
        return `${startYear}${startMonth}${startDay} ${weekday}`
      }
      //  同年同月不同日
      return `${startYear}${startMonth}${startDay}${joiner}${endDay}`
    }
    //  同年不同月
    return `${startYear}${startMonth}${startDay}${joiner}${endMonth}${endDay}`
  }
  // 不同年
  return `${startYear}${startMonth}${startDay}${joiner}${endYear}${endMonth}${endDay} ${weekday}`

}
