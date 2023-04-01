import { NoopWrapper } from './NoopWrapper'
import style from './style/timeGutter.module.less'
import { TimeSlotGroup } from './TimeSlotGroup'
import localizer from '../../utils/segments/localizer'
import { getSlotMetrics } from '../utils/timeSlots'
import { useState } from 'react'

const TimeGutterWrapper = NoopWrapper

const renderSlot = (value:Date, index:number):JSX.Element => (
  <span key={index}>
    {localizer.format(value, 'HH-mm a')}
  </span>
)




interface ITimeGutterProps {
  min:Date
  max:Date
  timeslots: number
  step:number
}
export function TimeGutter(props:ITimeGutterProps) {
  const { min, max, step, timeslots, } = props
  const [slotMetrics] = useState(getSlotMetrics({ min, max, step, timeslots, }))

  return (
    <TimeGutterWrapper>
      <div className={style.v2TimeGutter}>
        {slotMetrics.groups.map((group, idx) => (
          <TimeSlotGroup
            group={group}
            renderSlot={renderSlot}
            key={idx}
          />
        ))}
      </div>
    </TimeGutterWrapper>
  )
}
