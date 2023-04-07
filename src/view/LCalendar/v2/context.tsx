import React, {  useState } from 'react'
import { CalendarEvent } from '../utils/calendar'
import { CalendarContext } from './createContext'

export interface IInteractingInfo {
  end:Date
  start:Date
  event:CalendarEvent
}
export type IAction = 'move'|'resize'
export type IDirection = 'UP'|'DOWN'
export interface IState extends Partial<IInteractingInfo>{
  interacting?:boolean
  action?:IAction
  direction?:IDirection
}
export interface IContextProps {
  onEventDrop:(data:IInteractingInfo) =>void
  onEventResize:(data:IInteractingInfo) => void
  dragAndDropAction?:IState
  draggableAccessor?:string
  resizableAccessor?:string
}
export const CalContext = (props:React.PropsWithChildren<IContextProps>):JSX.Element => {
  const [state, setState] = useState<IState>({ interacting: true, })
  const handleInteractionStart = () => {
    if (state.interacting === false) {
      setState({ ...state, interacting: true, })
    }
  }
  const handleInteractionEnd = (interactionInfo?:IInteractingInfo) => {
    const { action, event, } = state
    if (!action) return
    setState({
      action: undefined,
      event: undefined,
      interacting: false,
    })
    if (!interactionInfo) return
    interactionInfo.event = event as CalendarEvent

    const { onEventDrop, onEventResize, } = props
    if (action === 'move') {
      onEventDrop(interactionInfo)
    }
    if (action === 'resize') {
      onEventResize(interactionInfo)
    }

  }
  const handleBeginAction = (
    event:CalendarEvent, action:IAction, direction?:IDirection
  ) => {
    setState({ event, action, direction, })
  }


  const contextValue = {
    onStart: handleInteractionStart,
    onEnd: handleInteractionEnd,
    onBeginAction: handleBeginAction,
    draggableAccessor: props.draggableAccessor,
    resizableAccessor: props.resizableAccessor,
    dragAndDropAction: state,
  }
  return (
    <CalendarContext.Provider value={contextValue}>
      {props.children}
    </CalendarContext.Provider>
  )
}
