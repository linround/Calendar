import React, {
  createRef, ReactElement, useState
} from 'react'
import { CalendarEvent } from '../../../utils/calendar'
import { ICoordinates } from '../../../v2/utils/selection'
import { Selector } from '../../utils/selector'

interface IProps {
  event:CalendarEvent
}
export function EventWrapperComponent(props:React.PropsWithChildren<IProps>) {
  const { event, } = props
  const [newEvent, setNewEvent] = useState<CalendarEvent|null>()
  let initCoordinates:ICoordinates

  const ref = createRef()
  const selector:Selector = new Selector()

  selector.on('beforeSelect', (data:ICoordinates) => {
    initCoordinates = data
    setNewEvent(event)
    console.log(event, initCoordinates)
  })
  selector.on('selecting', (data:ICoordinates) => {

  })
  selector.on('select', (data:ICoordinates) => {
    setNewEvent(null)
  })
  return (
    <>
      {newEvent && newEvent.eventName}
      {
        React.cloneElement(props.children as ReactElement, {
          ref: ref,
          onMouseDown(e:React.MouseEvent) {
            selector.handleInitialEvent(e)
          },
        })
      }
    </>
  )
}
