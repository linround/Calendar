import {
  CalendarDayBodySlotScope,
  CalendarEvent, CalendarEventParsed, CalendarTimestamp
} from './calendar'
import {
  isTimedLess, parseTimeStamp, updateHasTime,
  getDayIdentifier, getTimestampIdentifier, MINUTES_IN_DAY
} from './timesStamp'
import { CalendarEventVisual } from './modes/common'


const EVENT_DEFAULT_BG_COLOR = 'white'
const EVENT_DEFAULT_BG_TITLE = '无标题'
const EVENT_MIN_HEIGHT = 20
export function parseEvent(
  input: CalendarEvent,
  index:number,
  startProperty: string,
  endProperty:string,
  timed = false,
  category: string | false = false
): CalendarEventParsed {
  const startInput = input[startProperty]
  const endInput = input[endProperty]
  const startParsed = parseTimeStamp(startInput, true)
  const endParsed = endInput ? parseTimeStamp(endInput, true) : startParsed


  const start:CalendarTimestamp = isTimedLess(startInput) ?
    updateHasTime(startParsed as CalendarTimestamp, timed) :
    startParsed as CalendarTimestamp
  const end:CalendarTimestamp = isTimedLess(endInput) ?
    updateHasTime(endParsed as CalendarTimestamp, timed) :
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


export function creatEvents() {
  const now = new Date()

  const year = now.getFullYear()
  const month = now.getMonth()
  return [
    {
      id: 0,
      title: 'All Day Event very long title',
      start: new Date(
        year, month, 0
      ),
      end: new Date(
        year, month, 1
      ),
    },
    {
      id: 1,
      title: 'Long Event',
      start: new Date(
        year, month, 7
      ),
      end: new Date(
        year, month, 10
      ),
    },

    {
      id: 2,
      title: 'DTS STARTS',
      start: new Date(
        year, month, 13, 0, 0, 0
      ),
      end: new Date(
        year, month, 20, 0, 0, 0
      ),
    },

    {
      id: 3,
      title: 'DTS ENDS',
      start: new Date(
        year, month, 6, 0, 0, 0
      ),
      end: new Date(
        year, month, 13, 0, 0, 0
      ),
    },

    {
      id: 4,
      title: 'Some Event',
      start: new Date(
        year, month, 9, 0, 0, 0
      ),
      end: new Date(
        year, month, 10, 0, 0, 0
      ),
    },
    {
      id: 5,
      title: 'Conference',
      start: new Date(
        year, month, 11
      ),
      end: new Date(
        year, month, 13
      ),
      desc: 'Big conference for important people',
    },
    {
      id: 6,
      title: 'Meeting',
      start: new Date(
        year, month, 12, 10, 30, 0, 0
      ),
      end: new Date(
        year, month, 12, 12, 30, 0, 0
      ),
      desc: 'Pre-meeting meeting, to prepare for the meeting',
    },
    {
      id: 7,
      title: 'Lunch',
      start: new Date(
        year, month, 12, 12, 0, 0, 0
      ),
      end: new Date(
        year, month, 12, 13, 0, 0, 0
      ),
      desc: 'Power lunch',
    },
    {
      id: 8,
      title: 'Meeting',
      start: new Date(
        year, month, 12, 14, 0, 0, 0
      ),
      end: new Date(
        year, month, 12, 15, 0, 0, 0
      ),
    },
    {
      id: 9,
      title: 'Happy Hour',
      start: new Date(
        year, month, 12, 17, 0, 0, 0
      ),
      end: new Date(
        year, month, 12, 17, 30, 0, 0
      ),
      desc: 'Most important meal of the day',
    },
    {
      id: 10,
      title: 'Dinner',
      start: new Date(
        year, month, 12, 20, 0, 0, 0
      ),
      end: new Date(
        year, month, 12, 21, 0, 0, 0
      ),
    },
    {
      id: 11,
      title: 'Planning Meeting with Paige',
      start: new Date(
        year, month, 13, 8, 0, 0
      ),
      end: new Date(
        year, month, 13, 10, 30, 0
      ),
    },
    {
      id: 11.1,
      title: 'Inconvenient Conference Call',
      start: new Date(
        year, month, 13, 9, 30, 0
      ),
      end: new Date(
        year, month, 13, 12, 0, 0
      ),
    },
    {
      id: 11.2,
      title: 'Project Kickoff - Lou\'s Shoes',
      start: new Date(
        year, month, 13, 11, 30, 0
      ),
      end: new Date(
        year, month, 13, 14, 0, 0
      ),
    },
    {
      id: 11.3,
      title: 'Quote Follow-up - Tea by Tina',
      start: new Date(
        year, month, 13, 15, 30, 0
      ),
      end: new Date(
        year, month, 13, 16, 0, 0
      ),
    },
    {
      id: 12,
      title: 'Late Night Event',
      start: new Date(
        year, month, 17, 19, 30, 0
      ),
      end: new Date(
        year, month, 18, 2, 0, 0
      ),
    },
    {
      id: 12.5,
      title: 'Late Same Night Event',
      start: new Date(
        year, month, 17, 19, 30, 0
      ),
      end: new Date(
        year, month, 17, 23, 30, 0
      ),
    },
    {
      id: 13,
      title: 'Multi-day Event',
      start: new Date(
        year, month, 20, 19, 30, 0
      ),
      end: new Date(
        year, month, 22, 2, 0, 0
      ),
    },
    {
      id: 15,
      title: 'Point in Time Event',
      start: now,
      end: now,
    },
    {
      id: 16,
      title: 'Video Record',
      start: new Date(
        year, month, 14, 15, 30, 0
      ),
      end: new Date(
        year, month, 14, 19, 0, 0
      ),
    },
    {
      id: 17,
      title: 'Dutch Song Producing',
      start: new Date(
        year, month, 14, 16, 30, 0
      ),
      end: new Date(
        year, month, 14, 20, 0, 0
      ),
    },
    {
      id: 18,
      title: 'Itaewon Halloween Meeting',
      start: new Date(
        year, month, 14, 16, 30, 0
      ),
      end: new Date(
        year, month, 14, 17, 30, 0
      ),
    },
    {
      id: 19,
      title: 'Online Coding Test',
      start: new Date(
        year, month, 14, 17, 30, 0
      ),
      end: new Date(
        year, month, 14, 20, 30, 0
      ),
    },
    {
      id: 20,
      title: 'An overlapped Event',
      start: new Date(
        year, month, 14, 17, 0, 0
      ),
      end: new Date(
        year, month, 14, 18, 30, 0
      ),
    },
    {
      id: 21,
      title: 'Phone Interview',
      start: new Date(
        year, month, 14, 17, 0, 0
      ),
      end: new Date(
        year, month, 14, 18, 30, 0
      ),
    },
    {
      id: 22,
      title: 'Cooking Class',
      start: new Date(
        year, month, 14, 17, 30, 0
      ),
      end: new Date(
        year, month, 14, 19, 0, 0
      ),
    },
    {
      id: 23,
      title: 'Go to the gym',
      start: new Date(
        year, month, 14, 18, 30, 0
      ),
      end: new Date(
        year, month, 14, 20, 0, 0
      ),
    }
  ].map((day) => ({
    ...day,
    name: day.title,
    color: 'blue',
    start: day.start.valueOf(),
    end: day.end.valueOf(),
    timed: true,
  }))
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
  const { color = EVENT_DEFAULT_BG_COLOR, name = EVENT_DEFAULT_BG_TITLE, } = input
  return {
    title: name,
    timeRange: `${start.time}-${end.time}`,
    backgroundColor: color,
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

export function stopDefaultEvent(e:MouseEvent) {
  if (e.stopPropagation) {
    e.stopPropagation()
  }
  if (e.preventDefault) {
    e.preventDefault()
  }
}
