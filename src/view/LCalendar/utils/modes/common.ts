import {
  CalendarDaySlotScope,
  CalendarEvent, CalendarEventParsed, CalendarTimestamp
} from '../calendar'
import { getTimestampIdentifier } from '../timesStamp'
const MILLIS_IN_DAY = 24 * 60 * 60 * 1000

export interface CalendarEventVisual {
  event: CalendarEventParsed
  columnCount: number
  column: number
  left: number
  width: number
}
export interface ColumnGroup {
  start: number
  end: number
  visuals: CalendarEventVisual[]
}


export interface IMonthPlaceholder {
  placeholder?: boolean
}

export interface IMonthEventStyle extends IMonthPlaceholder{
  event: CalendarEvent
  day: CalendarDaySlotScope
  start: boolean
  end: boolean
  timed: boolean
  style: {
    height:number
    width: number
    marginBottom: number
  }
}


export function getVisuals(events:CalendarEventParsed[], minStart = 0):CalendarEventVisual[] {
  const visuals = events.map((event) => ({
    event,
    columnCount: 0,
    column: 0,
    left: 0,
    width: 100,
  }))
  // 按照开始时间，从小到达排序 [1,2,3,4]
  // 开始时间一样，按照结束时间，从大到小排序 [4,3,2,1]
  visuals.sort((a, b) => (Math.max(minStart, a.event.startTimestampIdentifier) - Math.max(minStart, b.event.startTimestampIdentifier)) ||
    (b.event.endTimestampIdentifier - a.event.endTimestampIdentifier))
  return visuals
}


export function getRange(event:CalendarEventParsed):[number, number] {
  return [event.startTimestampIdentifier, event.endTimestampIdentifier]
}
export function getDayRange(event:CalendarEventParsed):[number, number] {
  return [event.startIdentifier, event.endIdentifier]
}
export function getNormalizedRange(event:CalendarEventParsed, dayStart:number):[number, number] {
  return [Math.max(dayStart, event.startTimestampIdentifier), Math.min(dayStart + MILLIS_IN_DAY, event.endTimestampIdentifier)]
}


export function hasOverlap(
  s0:number, e0:number, s1:number, e1:number, exclude = true
):boolean {
  // 一无堆叠
  //    -------s0-----e0
  // -s1--e1-
  // 二无堆叠
  //    ----s0-----e0-
  // -------------------s1--e1-

  // 前者等于也算无堆叠   后者等于算有堆叠

  // 最终 返回false 代表无堆叠
  //     返回true  代表有堆叠
  return exclude ? !(s0 >= e1 || e0 <= s1) : !(s0 > e1 || e0 < s1)
}
export function setColumnCount(groups:ColumnGroup[]) {
  groups.forEach((group) => {
    group.visuals.forEach((groupVisual) => {
      groupVisual.columnCount = groups.length
    })
  })
}

export function getOpenGroup(
  groups:ColumnGroup[], start:number, end:number, timed:boolean
):number {
  for (let i = 0; i < groups.length; i++) {
    const group = groups[i]
    let intersected = false
    // 如果当前事件的时间段 和 当前组存在堆叠
    if (hasOverlap(
      start, end, group.start, group.end, timed
    )) {
      for (let k = 0; k < group.visuals.length; k++) {
        const groupVisual = group.visuals[k]
        const [groupStart, groupEnd] = timed ? getRange(groupVisual.event) : getDayRange(groupVisual.event)

        if (hasOverlap(
          start, end, groupStart, groupEnd, timed
        )) {
          intersected = true
          break
        }
      }
    }
    if (!intersected) {
      return i
    }
  }
  return -1
}


export function getOverlapGroupHandler(firstWeekday:number) {
  const handler = {
    groups: [] as ColumnGroup[],
    min: -1,
    max: -1,
    reset: () => {
      handler.max = -1
      handler.min = -1
      handler.groups = []
    },
    // 得到某天 中的日历事件的视图
    getVisuals(
      day:CalendarTimestamp, dayEvents:CalendarEventParsed[], timed:boolean, reset:boolean
    ) {
      //
      if (day.weekday === firstWeekday) {
        handler.reset()
      }
      const dayStart = getTimestampIdentifier(day)

      // 设置 columnCount,column,left,width基本属性，并按照规则排序
      const visuals = getVisuals(dayEvents, dayStart)
      visuals.forEach((visual) => {
        const [start, end] = timed ? getRange(visual.event) : getDayRange(visual.event)
        if (handler.groups.length > 0 && !hasOverlap(
          start, end, handler.min, handler.max, timed
        )) {
          // 如果没有堆叠
          setColumnCount(handler.groups)
          handler.reset()
        }
        let targetGroup = getOpenGroup(
          handler.groups, start, end, timed
        )
        if (targetGroup === -1) {
          targetGroup = handler.groups.length

          handler.groups.push({ start, end, visuals: [], })
        }
        const target = handler.groups[targetGroup]
        target.visuals.push(visual)
        target.start = Math.min(target.start, start)
        target.end = Math.max(target.end, end)

        visual.column = targetGroup

        if (handler.min === -1) {
          handler.min = start
          handler.max = end
        } else {
          handler.min = Math.min(handler.min, start)
          handler.max = Math.max(handler.max, end)
        }
      })


      setColumnCount(handler.groups)

      if (timed) {
        handler.reset()
      }
      return visuals
    },
  }
  return handler
}
