import { CalendarEvent } from '../../utils/calendar'
import { ISlotMetrics } from './timeSlots'

interface IStyledEventsParams{
  events: CalendarEvent[]
  minimumStartDifference: number // 渲染的最小起始差
  slotMetrics:ISlotMetrics // 相关分组
  algorithm:string
}
export function getStyledEvents(params:IStyledEventsParams) {}
