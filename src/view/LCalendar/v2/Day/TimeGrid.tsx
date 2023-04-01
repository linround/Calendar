import { DayColumn } from './DayColumn'
import { TimeGridHeader } from './TimeGridHeader'
import { TimeGutter } from './TimeGutter'
import timeGridStyle from './style/timeGrid.module.less'
import { CalendarEvent } from '../../utils/calendar'


interface IRenderEvents {
  range:Date[]
  events: CalendarEvent[]
  now: Date
}
function RenderEvents(props:IRenderEvents) {
  console.log(props)
  return (
    <DayColumn></DayColumn>
  )
}



interface ITimeGrid {
  min:Date
  max:Date
  timeslots: number
  step:number
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
        <RenderEvents />
      </div>
    </div>
  )
}
