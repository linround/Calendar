import React  from 'react'
import {
  IMonthDay, IMonthWeek, IWeekSegments
} from './type'
import { GenSingleDay } from './GenSingleDay'
import monthStyle from './month.module.less'
import { EventRow } from './EventRow'
import { EventRowEnd } from './EventRowEnd'
import { IDayProps } from './dayPropsType'

interface IWeekComponent extends Partial<IDayProps>{
  weekSegments: IWeekSegments
  weekDays:IMonthWeek
}
type IMouseType = 'onmousedown' | 'onmousemove' | 'onmouseup'

function calcMonthTimes(
  e:React.MouseEvent, rang:IMonthDay[], type:IMouseType
) {
  const { left, width, } = e.currentTarget.getBoundingClientRect()
  const { clientX, } = e
  const block = Math.floor((clientX - left) / (width / rang.length))
  const time = {
    ...rang[block],
    type,
  }
  return time
}

export function WeekComponent(props:React.PropsWithChildren<IWeekComponent >) {
  const { weekSegments, weekDays, } = props
  const { levels, extra, slots, range, } = weekSegments
  return (
    <div
      className={monthStyle.monthWeekContainer}
      onMouseDown={(e) => calcMonthTimes(
        e, range, 'onmousedown'
      )}
      onMouseMove={(e) => calcMonthTimes(
        e, range, 'onmousemove'
      )}>
      <div className={monthStyle.monthModal}>
        {
          weekDays.map((d, index) => (
            <div
              className={monthStyle.monthModalItem}
              key={index}></div>
          ))
        }
      </div>
      <div className={monthStyle.monthWeekRowHead}>
        {weekDays.map((day, index) => (<GenSingleDay day={day} key={index} />))}
      </div>
      <div className={monthStyle.monthWeekRowEvents}>
        {
          levels.map((segs, index) => (
            <EventRow segments={segs} key={index} slots={slots as number} />
          ))
        }
        {
          !!extra.length && (
            <EventRowEnd segments={extra} slots={slots} />
          )
        }
      </div>
    </div>
  )
}





