import { ISegments } from '../../../utils/segments/eventSegments'
import { RowExtra } from './RowExtra'
import { EventRow } from './EventRow'
import style from './style/week.module.less'
import { IMonth } from '../../../components/type'
import { CalendarTimestamp } from '../../../utils/calendar'

interface IProps{
  levels:ISegments[][]
  extra:ISegments[]
  rowSegments:ISegments[]
  slots:number
  container:HTMLDivElement
  month:IMonth
  dates?:CalendarTimestamp[]
}
export function EventRows(props:IProps) {
  const {
    levels,
    slots,
    extra,
    month,
    container,
    rowSegments,
    dates,
  } = props
  return (
    <div>
      <div className={style.weekEvents}>
        {levels.map((segs, index) => (
          <EventRow
            key={index}
            slots={slots}
            segments={segs}
            month={month}
            container={container} />))}
        {!!extra.length && (
          <RowExtra
            dates={dates}
            rowSegments={rowSegments}
            slots={slots}
            segments={extra}
            month={month}
            container={container} />
        )}
      </div>
    </div>
  )
}
