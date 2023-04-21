import { CalendarEvent, VTimestampInput } from '../calendar'
import { endOfRange } from './helper'
import localizer, { ILocalizer } from './localizer'
import { accessors, IAccessors } from './accessors'


export function inRange(
  e:CalendarEvent, start:VTimestampInput, end:VTimestampInput,
  accessors:IAccessors, localizer:ILocalizer
) {
  const event = {
    start: accessors.start(e),
    end: accessors.end(e),
  }
  const range = { start, end, }
  return localizer.inEventRange({ event, range, })
}

export function eventsForRange(
  events:CalendarEvent[], start:VTimestampInput, end:VTimestampInput
):CalendarEvent[] {
  return events.filter((event) => inRange(
    event, start, end, accessors, localizer
  ))
}
export function eventsForWeek(
  events:CalendarEvent[], start:VTimestampInput, end:VTimestampInput,
  accessors:IAccessors, localizer:ILocalizer
) {
  return events.filter((event) => inRange(
    event, start, end, accessors, localizer
  ))
}
export interface ISegments {
  event:CalendarEvent
  span: number
  left:number
  right:number
}
export function eventSegments (event: CalendarEvent,
  range:VTimestampInput[]):ISegments {
  const { first, last, } = endOfRange({ dateRange: range, localizer, })
  const slots = localizer.diff(
    first, last, 'day'
  )
  const start = localizer.max(localizer.startOf(accessors.start(event), 'day'), first)

  const end = localizer.min(localizer.ceil(accessors.end(event), 'day'), last)
  const padding = range.findIndex((day) => localizer.isSameDate(day, start))
  let span = localizer.diff(
    start, end, 'day'
  )
  span = Math.min(span, slots)
  span = Math.max(span - localizer.segmentOffset, 1)
  return {
    event,
    span,
    left: (padding + 1),
    right: Math.max(padding + span, 1),
  }
}


export function segsOverlap(seg:ISegments, otherSegs:ISegments[]) {
  return otherSegs.some((otherSeg) => seg.right >= otherSeg.left && seg.left <= otherSeg.right)
}
export function eventLevels(rowSegments:ISegments[], limit = Infinity):{levels:ISegments[][], extra:ISegments[]} {
  let i
  let j
  let seg
  const levels:ISegments[][] = []
  const extra:ISegments[] = []
  for (i = 0;i < rowSegments.length;i++) {
    seg = rowSegments[i]
    for (j = 0;j < levels.length;j++) {
      if (!segsOverlap(seg, levels[j])) {
        break
      }
    }
    if (j >= limit) {
      extra.push(seg)
    } else {
      (levels[j] || (levels[j] = [])).push(seg)
    }
  }
  for (i = 0;i < levels.length;i++) {
    levels[i].sort((a, b) => a.left - b.left)
  }
  return { levels, extra, }
}
export function eventsInSlot(segments:ISegments[], slot:number):number {
  return segments.filter((seg) => isSegmentInSlot(seg, slot)).length
}
export function isSegmentInSlot(seg:ISegments, slot:number):boolean {
  return seg.left <= slot && seg.right >= slot
}

export function getEventsInSot(slot:number, segments:ISegments[]) {
  return segments
    .filter((seg) => isSegmentInSlot(seg, slot))
    .map((seg) => seg.event)
}

export function sortEvents(eventA:CalendarEvent, eventB:CalendarEvent):number {
  const evtA = {
    start: accessors.start(eventA),
    end: accessors.end(eventA),
    allDay: accessors.allDay(eventA),
  }
  const evtB = {
    start: accessors.start(eventB),
    end: accessors.end(eventB),
    allDay: accessors.allDay(eventB),
  }
  return +localizer.sortEvents({ evtA, evtB, })
}


