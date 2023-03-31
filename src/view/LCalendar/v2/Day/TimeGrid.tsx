import { DayColumn } from './DayColumn'
import { TimeGridHeader } from './TimeGridHeader'
import { TimeGutter } from './TimeGutter'
import timeGridStyle from './style/timeGrid.module.less'


function RenderEvents() {
  return (
    <DayColumn></DayColumn>
  )
}




export function TimeGrid() {
  return (
    <div className={timeGridStyle.v2TimeView}>
      <TimeGridHeader />
      <div className={timeGridStyle.v2TimeContent}>
        <TimeGutter />
        <RenderEvents />
      </div>
    </div>
  )
}
