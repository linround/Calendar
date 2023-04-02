import React, { createRef, ReactElement } from 'react'
import { ISlotMetrics } from '../utils/timeSlots'

interface IEventContainerWrapper {
  slotMetrics:ISlotMetrics
}
export function EventContainerWrapper(props:React.PropsWithChildren<IEventContainerWrapper>) {
  const { children, } = props
  // 事件容器的子节点
  const events = (children as ReactElement).props.children
  const ref = createRef<HTMLDivElement>()

  const Content = () => React.cloneElement(children as ReactElement, {
    children: (
      <React.Fragment>
        {events}
      </React.Fragment>
    ),
  })
  return (
    <div ref={ref}>
      <Content />
    </div>
  )
}
