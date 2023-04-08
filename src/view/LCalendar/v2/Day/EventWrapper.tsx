import React, { useContext } from 'react'
import { CalendarEvent } from '../../utils/calendar'
import { CalendarContext } from '../createContext'
export interface IEventWrapper {
  type:string
  event:CalendarEvent
}
export function EventWrapper(props:React.PropsWithChildren<IEventWrapper>) {
  const context = useContext(CalendarContext)
  const { event, children, } = props
  const handleStartDrag = () => {
    context.draggable.onBeginAction(event, 'move')
  }
  return React.cloneElement(children as React.DetailedReactHTMLElement<any, any>, {
    onMouseDown: handleStartDrag,
  })
}
