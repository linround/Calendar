import { CalendarEvent } from '../../utils/calendar'
import { ISlotMetrics } from './timeSlots'
import { accessors } from '../../utils/segments/accessors'

interface IOverlap {
  events: CalendarEvent[]
  minimumStartDifference: number // 渲染的最小起始差
  slotMetrics:ISlotMetrics // 相关分组
}

class Event {
  public start : number
  public end :number
  public startMs:Date
  public endMs:Date
  public top:number
  public height:number
  public data:CalendarEvent
  constructor(data: CalendarEvent, slotMetrics:ISlotMetrics) {
    const {
      start,
      startDate,
      end,
      endDate,
      top,
      height,
    } = slotMetrics.getRange(accessors.start(data), accessors.end(data))
    this.start = start
    this.end = end
    this.startMs = startDate
    this.endMs = endDate
    this.top = top
    this.height = height
    this.data = data
  }
}

export default function overlap(params:IOverlap) {
  const { events, minimumStartDifference, slotMetrics, } = params
  const proxies = events.map((event) => new Event(event, slotMetrics))
}
