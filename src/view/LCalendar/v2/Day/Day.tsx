import { TimeGrid } from './TimeGrid'
import localizer from '../../utils/segments/localizer'
import { CalendarEvent } from '../../utils/calendar'
import { createEvents } from './events'
import { dayRange } from '../utils/day'

interface IDayProps {
  min?: Date
  max?:Date
  step?: number
  timeslots?: number
  events:CalendarEvent[]
}
// 时间分组规则
// 计算最大到最小的时间间距
// 每个小格30 分组
// 每个小组有2个格子组成
export function Day(props:IDayProps) {
  const {
    min = localizer.startOf(new Date(), 'day'),
    max = localizer.endOf(new Date(), 'day'),
    step = 30,
    timeslots = 2,
    events,
  } = props
  const range = dayRange(new Date())
  return (
    <TimeGrid
      min={min}
      max={max}
      step={step}
      timeslots={timeslots}
      events={events}
      range={range}
    />
  )
}
