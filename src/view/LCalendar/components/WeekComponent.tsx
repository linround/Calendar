import React  from 'react'
import {
  defaultShowMore,
  IMonthDay, IMonthWeek, ISlots, IWeekSegments, mouseDayTime, mouseEvent
} from './type'
import { GenSingleDay } from './GenSingleDay'
import monthStyle from './month.module.less'
import { EventRow } from './EventRow'
import { EventRowEnd } from './EventRowEnd'
import {  IMonthProps } from './dayPropsType'
import {
  CalendarEvent,
  IMonthMouseTime, IMouseEvent, IMouseTime
} from '../utils/calendar'

interface IWeekComponent extends IMonthProps{
  weekSegments: IWeekSegments
  weekDays:IMonthWeek
}

function calcMonthTimes(
  e:React.MouseEvent, rang:IMonthDay[], type:string
):IMonthMouseTime {
  const { left, width, } = e.currentTarget.getBoundingClientRect()
  const { clientX, } = e
  const block = Math.floor((clientX - left) / (width / rang.length))

  return {
    ... rang[block],
    type,
    nativeEvent: e,
  }
}

export function WeekComponent(props:React.PropsWithChildren<IWeekComponent >) {
  const { weekSegments,
    weekDays,
    onShowMore = (arg:ISlots) => undefined,
    onClickEvent = mouseEvent<IMouseEvent>(),
    onMousedownEvent = mouseEvent<IMouseEvent>(),
    onTimeContainerMouseup = mouseDayTime<IMonthMouseTime>(),
    onTimeContainerMousemove = mouseDayTime<IMonthMouseTime>(),
    onTimeContainerMousedown = mouseDayTime<IMonthMouseTime>(), } = props
  const { levels, extra, slots, range, } = weekSegments
  const handleShowMore = (slot:number, nativeEvent:React.MouseEvent) => {
    const events = weekSegments.getEventsForSlot(slot)
    onShowMore({
      events,
      nativeEvent,
    })
  }
  return (
    <div
      className={monthStyle.monthWeekContainer}
      onMouseUp={(e) => onTimeContainerMouseup(calcMonthTimes(
        e, range, 'onmouseup'
      ))}
      onMouseDown={(e) => onTimeContainerMousedown(calcMonthTimes(
        e, range, 'onmousedown'
      )) }
      onMouseMove={(e) => onTimeContainerMousemove(calcMonthTimes(
        e, range, 'onmousemove'
      ))}>
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
            <EventRow
              segments={segs}
              key={index}
              slots={slots as number}
              onClickEvent={onClickEvent}
              onMousedownEvent={onMousedownEvent} />
          ))
        }
        {
          !!extra.length && (
            <EventRowEnd segments={extra} slots={slots} showMore={(slot, e) => handleShowMore(slot, e)}  />
          )
        }
      </div>
    </div>
  )
}





