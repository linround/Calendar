import { NoopWrapper } from './NoopWrapper'
import style from './style/timeGutter.module.less'
import { TimeSlotGroup } from './TimeSlotGroup'

const TimeGutterWrapper = NoopWrapper

export function TimeGutter() {
  const slotMetrics = {
    groups: [],
  }
  return (
    <TimeGutterWrapper>
      <div className={style.v2TimeGutter}>
        {slotMetrics.groups.map((group, idx) => (
          <TimeSlotGroup
            key={idx}
          />
        ))}
      </div>
    </TimeGutterWrapper>
  )
}
