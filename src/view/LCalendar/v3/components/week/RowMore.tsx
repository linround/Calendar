import { eventsInSlot, ISegments } from '../../../utils/segments/eventSegments'
import style from './style/rowMore.module.less'

interface IProps {
  slots:number
  segments:ISegments[]
  slot:number
}
export function RowMore(props:IProps) {
  const { segments, slot, slots, } = props
  const width = ((1 / slots) * 100) + '%'
  const count = eventsInSlot(segments, slot)
  return (
    <div
      className={style.rowMore}
      style={{
        flexBasis: width,
        maxWidth: width,
      }}>
      <div
        className={style.rowMoreContent}>
        +{count}更多
      </div>
    </div>
  )
}
