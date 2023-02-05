import {
  CalendarEvent,
  IMonthMouseTime, IMouseEvent, IMouseTime
} from '../utils/calendar'
import React from 'react'
import { ISlots } from './type'



interface IHandleEvent<E, T> {
  onMousedownEvent:(e: E) => E
  onTimeContainerMouseup: (time:T) => T
  onTimeContainerMousemove: (time:T) => T
  onTimeContainerMousedown: (time:T) => T
}



export interface IDayProps extends IHandleEvent<IMouseEvent, IMouseTime>{
  firstTime?: number|string|object
}

export interface IMonthProps  extends IHandleEvent<IMouseEvent, IMonthMouseTime> {
  onShowMore:(arg:ISlots) => void
}


