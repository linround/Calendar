import { IMonthWeek, IWeekSegments } from '../../../components/type'
import React from 'react'
import style from './style/week.module.less'
import monthStyle from '../../../components/month.module.less'
import { GenSingleDay } from '../../../components/GenSingleDay'
import { EventRow } from '../../../components/EventRow'
import { EventRowEnd } from '../../../components/EventRowEnd'

interface IProps {
  weekSegments: IWeekSegments
  weekDays:IMonthWeek
}
export function V3WeekComponent(props:React.PropsWithChildren<IProps>) {
  const { weekSegments, weekDays, } = props
  const { levels, extra, slots, range, } = weekSegments
  const handleShowMore = (slot:number, nativeEvent:React.MouseEvent) => {
    const events = weekSegments.getEventsForSlot(slot)
    console.log(events, nativeEvent)
  }
  return (
    <div className={style.weekContainer}>
      <div className={style.weekModal}>
        {weekDays.map((d, index) => (
          <div className={monthStyle.monthModalItem}
            key={index} />))}
      </div>
      <div className={style.weekHead}>
        {weekDays.map((day, index) => (<GenSingleDay day={day} key={index} />))}
      </div>
      <div className={style.weekEvents}>
        {
          levels.map((segs, index) => (
            <EventRow key={index} segments={segs}  slots={slots as number} />))
        }
        {!!extra.length && (
          <EventRowEnd
            slots={slots}
            segments={extra}
            showMore={(slot:number, e:React.MouseEvent) => handleShowMore(slot, e)}  />)}
      </div>
    </div>
  )
}
