import { NoopWrapper } from './NoopWrapper'
import React from 'react'
import style from './style/timeSlotGroup.module.less'

const Wrapper = NoopWrapper
interface IProps {
  group:Date[]
  renderSlot:(value:Date, index:number)=>any
}
export function TimeSlotGroup(props:React.PropsWithChildren<IProps>) {
  const { group, renderSlot, } = props
  return (
    <div className={style.v2TimeSlotGroup}>
      {group.map((value, index) => (
        <Wrapper key={index}>
          <div className={style.v2TimeSlot}>
            { renderSlot && renderSlot(value, index) }
          </div>
        </Wrapper>
      ))}
    </div>
  )
}
