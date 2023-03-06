import {
  CalendarDayBodySlotScope,
  CalendarEvent, CalendarEventParsed, CalendarTimestamp, VTimestampInput
} from './calendar'
import {
  isTimedLess, parseTimeStamp, updateHasTime,
  getDayIdentifier, getTimestampIdentifier, MINUTES_IN_DAY
} from './timesStamp'
import { CalendarEventVisual } from './modes/common'
import React from 'react'


const EVENT_DEFAULT_BG_COLOR = 'white'
const EVENT_DEFAULT_BG_TITLE = '无标题'
const EVENT_MIN_HEIGHT = 20
export function parseEvent(
  input: CalendarEvent,
  index:number,
  startProperty: string,
  endProperty:string,
  eventTimed = false,
  category: string | false = false
): CalendarEventParsed {
  const startInput = input[startProperty]
  const endInput = input[endProperty]
  const startParsed = parseTimeStamp(startInput, true)
  const endParsed = endInput ? parseTimeStamp(endInput, true) : startParsed


  const start:CalendarTimestamp = isTimedLess(startInput) ?
    updateHasTime(startParsed as CalendarTimestamp, eventTimed) :
    startParsed as CalendarTimestamp
  const end:CalendarTimestamp = isTimedLess(endInput) ?
    updateHasTime(endParsed as CalendarTimestamp, eventTimed) :
    endParsed as CalendarTimestamp

  const startIdentifier: number = getDayIdentifier(start)
  const startTimestampIdentifier: number = getTimestampIdentifier(start)

  const endIdentifier: number = getDayIdentifier(end)
  // 2359
  const endOffset: number = start.hasTime ? 0 : 2359
  const endTimestampIdentifier: number = getTimestampIdentifier(end) + endOffset

  const allDay = !start.hasTime
  return {
    input,
    start,
    startIdentifier,
    startTimestampIdentifier,
    end,
    endIdentifier,
    endTimestampIdentifier,
    allDay,
    index,
    category,
  }

}



// 判断时间是否在这天有交集
export function isEventOn(event:CalendarEventParsed, dayIdentifier:number):boolean {
  // 都是以日为单位
  return event.startIdentifier <= dayIdentifier && event.endIdentifier >= dayIdentifier
}
export function isEventStart(
  event: CalendarEventParsed, day:CalendarTimestamp, dayIdentifier:number, firstWeekday: number
) : boolean {
  return dayIdentifier === event.startIdentifier || (firstWeekday === day.weekday && isEventOn(event, dayIdentifier))
}



interface IEventStyle {
  top: string
  height:string
  left:string
  width:string
  backgroundColor: string,
}
interface IEventContent {
  title: string
  timeRange: string
}
export interface IEventsRect {
  event: CalendarEvent
  style: IEventStyle
  content: IEventContent
}

function isEventHiddenOn(event:CalendarEventParsed, day:CalendarTimestamp):boolean {
  // ---------event.end.time
  // 事件结束时间正好是今天的凌晨零点，并且事件的开始日期不是今天
  return event.end.time === '00:00' && event.end.date === day.date && event.start.date !== day.date
}


export function genTimeVisualContent(eventParsed:CalendarEventParsed) {
  const { input, start, end, } = eventParsed
  const { eventColor = EVENT_DEFAULT_BG_COLOR, eventName = EVENT_DEFAULT_BG_TITLE, } = input
  return {
    title: eventName,
    timeRange: `${start.time}-${end.time}`,
    backgroundColor: eventColor,
  }
}
export function genTimedEvents({ event, left, width, }:CalendarEventVisual, day:CalendarDayBodySlotScope):IEventsRect|false {
  if (day.timeDelta(event.end) < 0 || day.timeDelta(event.start) > 1 || isEventHiddenOn(event, day)) {
    return false
  }
  const dayIdentifier = getDayIdentifier(day)
  const start = event.startIdentifier >= dayIdentifier
  const end = event.endIdentifier > dayIdentifier
  const top = start ? day.timeToY(event.start) : 0
  const bottom = end ? day.timeToY(MINUTES_IN_DAY) : day.timeToY(event.end)
  const height = Math.max(EVENT_MIN_HEIGHT, bottom - top)

  const inputContent = genTimeVisualContent(event)
  return {
    event: event.input,
    content: {
      timeRange: inputContent.timeRange,
      title: inputContent.title,
    },
    style: {
      top: `${top}px`,
      height: `${height}px`,
      left: `${left}%`,
      width: `${width}%`,
      backgroundColor: inputContent.backgroundColor,
    },
  }
}


export function createTimeEvent(start:VTimestampInput, end:VTimestampInput):CalendarEvent {
  return {
    eventName: '',
    eventLocation: '',
    eventColor: 'black',
    start,
    end,
    eventTimed: true,
    allDay: false,
    isCreate: true,
    isDragging: true,
    userName: '作者',
    eventPersonnel: '人员',
  }
}

export function stopDefaultEvent(e:React.MouseEvent) {
  if (e.stopPropagation) {
    e.stopPropagation()
  }
  if (e.preventDefault) {
    e.preventDefault()
  }
}
