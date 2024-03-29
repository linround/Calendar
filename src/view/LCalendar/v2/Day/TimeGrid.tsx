import { DayColumn } from './DayColumn'
import { TimeGridHeader } from './TimeGridHeader'
import { TimeGutter } from './TimeGutter'
import timeGridStyle from './style/timeGrid.module.less'
import { CalendarEvent } from '../../utils/calendar'
import { inRange } from '../utils/eventLevels'
import { accessors } from '../../utils/segments/accessors'
import classnames from 'classnames'
import { timeViewContainer } from '../utils/day'


interface IRenderEvents {
  min:Date
  max:Date
  timeslots: number
  step:number
  events:CalendarEvent[]
}
function RenderEvents(props:IRenderEvents) {
  const { events,
    min,
    max,
    timeslots,
    step, } = props
  const dayEvents = events as CalendarEvent[]
  return (
    <DayColumn
      max={max}
      min={min}
      timeslots={timeslots}
      step={step}
      events={dayEvents}
    />
  )
}



interface ITimeGrid {
  min:Date
  max:Date
  timeslots: number
  step:number
  events:CalendarEvent[]
  range: Date[]
}
export function TimeGrid(props:ITimeGrid) {
  const { min, max, timeslots, step, events, range, } = props
  const start = range[0]
  const end = range[range.length - 1]
  const allDayEvents = []
  const rangeEvents = [] as CalendarEvent[]
  events.forEach((event) => {
    if (inRange(
      event, start, end
    )) {
      if (accessors.allDay(event)) {
        allDayEvents.push(event)
      } else {
        rangeEvents.push(event)
      }
    }
  })
  return (
    <>
      <div className={classnames({
        [timeGridStyle.v2TimeView]: true,
        [timeViewContainer]: true,
      })}>
        <TimeGridHeader />
        <div  className={timeGridStyle.v2TimeContent}>
          <TimeGutter
            min={min}
            max={max}
            timeslots={timeslots}
            step={step}
          />
          <RenderEvents
            min={min}
            max={max}
            timeslots={timeslots}
            step={step}
            events={rangeEvents}
          />
        </div>
      </div>
    </>


  )
}
