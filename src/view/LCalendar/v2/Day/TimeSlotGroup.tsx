import { NoopWrapper } from './NoopWrapper'
import React from 'react'

const Wrapper = NoopWrapper
interface IProps {
  group:Date[]
  renderSlot:(value:Date, index:number)=>any
}
export function TimeSlotGroup(props:React.PropsWithChildren<IProps>) {
  const { group, renderSlot, } = props
  return (
    <div>
      {group.map((value, index) => (
        <Wrapper key={index}>
          <div>
            { renderSlot && renderSlot(value, index) }
          </div>
        </Wrapper>
      ))}
    </div>
  )
}
