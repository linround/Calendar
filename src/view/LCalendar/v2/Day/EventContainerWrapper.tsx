import React, {
  createRef, ReactElement, useState
} from 'react'
import { ISlotMetrics } from '../utils/timeSlots'

interface IEventContainerWrapper {
  slotMetrics:ISlotMetrics
}
export function EventContainerWrapper(props:React.PropsWithChildren<IEventContainerWrapper>) {

  const ref = createRef<HTMLDivElement>()

  const Content = () => {
    const { children, slotMetrics, } = props
    // 事件容器的子节点
    const events = (children as ReactElement).props.children
    return (
      React.cloneElement(children as ReactElement, {
        children: (
          <React.Fragment>
            {events}
          </React.Fragment>
        ),
      })
    )
  }
  return (
    <div ref={ref}>
      <Content />
    </div>
  )
}
