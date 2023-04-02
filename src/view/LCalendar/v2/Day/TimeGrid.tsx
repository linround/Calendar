import { DayColumn } from './DayColumn'
import { TimeGridHeader } from './TimeGridHeader'
import { TimeGutter } from './TimeGutter'
import timeGridStyle from './style/timeGrid.module.less'
import { CalendarEvent } from '../../utils/calendar'


interface IRenderEvents {
  min:Date
  max:Date
  timeslots: number
  step:number
  events:CalendarEvent[]
}
function RenderEvents(props:IRenderEvents) {
  return (
    <DayColumn {...props}></DayColumn>
  )
}



interface ITimeGrid {
  min:Date
  max:Date
  timeslots: number
  step:number
  events:CalendarEvent[]
}
export function TimeGrid(props:ITimeGrid) {
  const { min, max, timeslots, step, } = props
  return (
    <div className={timeGridStyle.v2TimeView}>
      <TimeGridHeader />
      <div className={timeGridStyle.v2TimeContent}>
        <TimeGutter
          min={min}
          max={max}
          timeslots={timeslots}
          step={step}
        />
        <RenderEvents
          {...props}
        />
      </div>
    </div>
  )
}
