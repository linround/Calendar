import { NoopWrapper } from './NoopWrapper'
import React from 'react'

const Wrapper = NoopWrapper
interface IProps {
  group:Date[]
}
export function TimeSlotGroup(props:React.PropsWithChildren<IProps>) {
  const { group, } = props
  return (
    <div>
      {group.map((value, idx) => (
        <Wrapper key={idx}>
          <div></div>
        </Wrapper>
      ))}
    </div>
  )
}
