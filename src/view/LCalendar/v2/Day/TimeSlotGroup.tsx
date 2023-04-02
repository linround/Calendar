import { NoopWrapper } from './NoopWrapper'
import React from 'react'
import style from './style/timeSlotGroup.module.less'
import classnames from 'classnames'

const Wrapper = NoopWrapper
interface IProps {
  group:Date[]
  renderSlot?:(value:Date, index:number)=>any
  groupClassName?: string
  groupItemClassName?: string
}
export function TimeSlotGroup(props:React.PropsWithChildren<IProps>) {
  const { group, renderSlot, groupClassName = '', groupItemClassName = '', } = props

  return (
    <div className={classnames({
      [style.v2TimeSlotGroup]: true,
      [groupClassName]: true,
    })}>
      {group.map((value, index) => (
        <Wrapper key={index}>
          <div className={classnames({
            [style.v2TimeSlot]: true,
            [groupItemClassName]: true,
          })}>
            { renderSlot && renderSlot(value, index) }
          </div>
        </Wrapper>
      ))}
    </div>
  )
}
