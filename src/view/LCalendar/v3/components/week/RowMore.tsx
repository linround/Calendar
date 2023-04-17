import { eventsInSlot, ISegments } from '../../../utils/segments/eventSegments'

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
      style={{
        flexBasis: width,
        maxWidth: width,
      }}>
      <div>
        + {count} more
      </div>
    </div>
  )
}
