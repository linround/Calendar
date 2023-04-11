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
  const [newV, setNewV] = useState<number|null>()
  let initCoordinates:ICoordinates

  const ref = createRef()
  const selector:Selector = new Selector()

  selector.on('beforeSelect', (data:ICoordinates) => {
    initCoordinates = data
  })
  selector.on('selecting', (data:ICoordinates) => {
    setNewV((data.clientY - initCoordinates?.pageY))
  })
  selector.on('select', (data:ICoordinates) => {
    setNewV(null)
  })
  return (
    <>
      {newV}
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
