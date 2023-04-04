import { CalendarEvent } from '../../utils/calendar'
import { ISlotMetrics } from './timeSlots'
import { IOverlapResult, overlap } from './overlap'

interface IStyledEventsParams{
  events: CalendarEvent[]
  minimumStartDifference: number // 渲染的最小起始差
  slotMetrics:ISlotMetrics // 相关分组
}

export function getStyledEvents(params:IStyledEventsParams):IOverlapResult[] {

  return overlap(params)
}
