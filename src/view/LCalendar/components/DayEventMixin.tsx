import React, { useRef } from 'react'
import { mouseEvent } from './type'
import { IMouseEvent } from '../utils/calendar'
import { IEventsRect } from '../utils/events'
interface  IProps {
  rect:IEventsRect
  className:string
  onClickEvent:()=>void
  onMousedownEvent:()=>void
  onMouseupEvent:()=>void
  isCreate:boolean
}
export const RenderEvent = React.forwardRef((props:IProps, ref) => {
  const { rect,
    className,
    onMouseupEvent = mouseEvent<IMouseEvent>(),
    onClickEvent = mouseEvent<IMouseEvent>(),
    onMousedownEvent = mouseEvent<IMouseEvent>(),
    isCreate, } = props
  const nullRef = useRef(null)
  return (
    <div
      ref={(isCreate ? ref : nullRef) as React.ForwardedRef<HTMLDivElement> }
      className={className}
      onClick={(nativeEvent) => onClickEvent({
        nativeEvent,
        event: rect.event,
      })}
      onMouseDown={(nativeEvent) => {
        if (nativeEvent.button === 0) {
          onMousedownEvent({
            nativeEvent,
            event: rect.event,
          })
        }
      }}
      onMouseUp={(nativeEvent) => {
        if (nativeEvent.button === 0) {
          onMouseupEvent({
            nativeEvent,
            event: rect.event,
          })
        }
      }}
      style={{ ...rect.style, } }>
      <div>
        {rect.content.title}
      </div>
      <div>{rect.content.timeRange}</div>
    </div>
  )
})
