import { createContext } from 'react'
import { IContextState } from './context'


export interface IDraggable {
  onStart?: (...args:any[])=>void,
  onEnd?: (...args:any[])=>void,
  onBeginAction?: (...args:any[])=>void,
  draggableAccessor?: string,
  resizableAccessor?: string,
  dragAndDropAction?: IContextState,
}
export interface IContextProps {
  draggable:IDraggable
}
export const CalendarContext = createContext<IContextProps>({
  draggable: {},
})
