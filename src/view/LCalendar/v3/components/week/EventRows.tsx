import { ISegments } from '../../../utils/segments/eventSegments'
import { RowExtra } from './RowExtra'
import { EventRow } from './EventRow'
import style from './style/week.module.less'
import { IMonth } from '../../../components/type'

interface IProps{
  levels:ISegments[][]
  extra:ISegments[]
  slots:number
  container:HTMLDivElement
  month:IMonth
}
export function EventRows(props:IProps) {
  const {
    levels,
    slots,
    extra,
    month,
    container,
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
          <RowExtra slots={slots} segments={extra} />
        )}
      </div>
    </div>
  )
}
