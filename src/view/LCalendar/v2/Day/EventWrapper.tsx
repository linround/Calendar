import React from 'react'
import { CalendarEvent } from '../../utils/calendar'
export interface IEventWrapper {
  type:string
  event:CalendarEvent
}
export function EventWrapper(props:React.PropsWithChildren<IEventWrapper>) {
  return (
    <>
      {props.children}
    </>
  )
}
