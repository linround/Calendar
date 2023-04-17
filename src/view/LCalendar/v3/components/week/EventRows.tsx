import { ISegments } from '../../../utils/segments/eventSegments'
import { RowExtra } from './RowExtra'
import { EventRow } from './EventRow'
import style from './style/week.module.less'

interface IProps{
  levels:ISegments[][]
  extra:ISegments[]
  slots:number
}
export function EventRows(props:IProps) {
  const { levels, slots, extra, } = props
  return (
    <div>
      <div className={style.weekEvents}>
        {levels.map((segs, index) => (
          <EventRow key={index} slots={slots} segments={segs} />
        ))}
        {!!extra.length && (
          <RowExtra slots={slots} segments={extra} />
        )}
      </div>
    </div>
  )
}
