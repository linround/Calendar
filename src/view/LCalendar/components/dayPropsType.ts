import { IMonthMouseTime, IMouseEvent } from '../utils/calendar'
import { ISlots } from './type'


export interface ICalendarHandleEvent<E> {
  onClickEvent:(e:E)=>E
  onMousedownEvent:(e: E) => E
  onMouseupEvent:(e: E) => E
}

interface IHandleEvent<E, T> {
  onClickEvent:(e:E)=>E
  onMousedownEvent:(e: E) => E
  onMouseupEvent:(e: E) => E

  onTimeContainerClick: (time:T) => T
  onTimeContainerMouseup: (time:T) => T
  onTimeContainerMousemove: (time:T) => T
  onTimeContainerMousedown: (time:T) => T
}



export interface IDayProps {
  firstTime?: number|string|object
}

export interface IMonthProps  extends IHandleEvent<IMouseEvent, IMonthMouseTime> {
  onShowMore:(arg:ISlots) => void
}


