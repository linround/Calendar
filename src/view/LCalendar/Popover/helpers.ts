import { CalendarEvent, VTimestampInput } from '../utils/calendar'
import localizer from '../utils/segments/localizer'
import { WEEK_DAYS_TEXT } from '../utils/time'
import { padNumber } from '../utils/timesStamp'


export const POPOVER_WIDTH_DEF = 400
export const IS_FULL_WIDTH = 'is_full_width'
export const IS_HIGH_LEVEL = 'is_high_level'
export const IS_DRAGGED = 'is_dragged'




export type IDefaultValue = string | number | ReadonlyArray<string> | undefined;
export interface IMixinPopoverHeader {
  onClose:()=>void
}
export type IEventKeyValue = string|number|null|undefined|boolean
export interface IMixinPopoverBody {
  event:CalendarEvent
  setEventKeyValue:(key:string, value:IEventKeyValue)=>void
}



// 详情popover弹框所传入的参数
export interface INormalPopoverContentProps {
  event: CalendarEvent
  deleteEvent: (e:CalendarEvent)=>void
}

export interface IMorePosition{
  width:number
  top:number
  left:number
  bottom:number
}
export function calcMoreContainer(eventElement:Element):IMorePosition {
  const eventRect = eventElement.getBoundingClientRect()
  const width = eventRect.right - eventRect.left
  const { top, left, right, bottom, } = eventRect


  return {
    top, left, width, bottom,
  }

}











export const calcPosition = (
  content:Element, container:Element, eventRef?:Element
):{left:number, top:number} => {
  const {
    left: contentLeft,
    right: contentRight,
    top: contentTop,
    bottom: contentBottom,
  } = content.getBoundingClientRect()

  const {
    right: containerRight,
    top: containerTop,
    bottom: containerBottom,
  } = container.getBoundingClientRect()

  let startTop = contentTop
  let startLeft = contentLeft
  if (eventRef) {
    const {
      left: eventLeft,
      right: eventRight,
      top: eventTop,
      bottom: eventBottom,
    } = eventRef.getBoundingClientRect()
    const eventWidth = eventRight - eventLeft
    const eventHeight = eventBottom - eventTop
    // 可以在左边
    if (contentLeft > eventWidth) {
      startLeft = contentLeft - eventWidth
    } else if (containerRight - contentRight > eventWidth) {
    //   可以在右边
      startLeft = contentRight
      // 在右边边的时候 考虑下部分是否被隐藏
    } else if (containerBottom - contentBottom > eventHeight) {
    //  可以在下边
      startTop = contentBottom
    } else if (contentTop - containerTop > eventHeight) {
    //  可以在上边
      startTop = contentTop - eventHeight
    }

    // 如果小于页面底部
    if (startTop + eventHeight > containerBottom) {
      startTop = containerBottom - eventHeight - 50
    }


    return {
      left: startLeft,
      top: startTop,
    }
  }




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
