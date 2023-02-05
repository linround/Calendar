import {
  IMonthMouseTime, IMouseEvent, IMouseTime
} from '../utils/calendar'



interface IHandleEvent<E, T> {
  onMousedownEvent:(e: E) => E
  onTimeContainerMouseup: (time:T) => T
  onTimeContainerMousemove: (time:T) => T
  onTimeContainerMousedown: (time:T) => T
}



export interface IDayProps extends IHandleEvent<IMouseEvent, IMouseTime>{
  firstTime?: number|string|object
}

export type IMonthProps  = IHandleEvent<IMouseEvent, IMonthMouseTime>


