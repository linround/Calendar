import React, { useRef } from 'react'
import { mouseEvent } from './type'
import { IMouseEvent } from '../utils/calendar'
import { IEventsRect } from '../utils/events'
import classnames from 'classnames'
import { IS_FULL_WIDTH, IS_HIGH_LEVEL } from '../Popover/helpers'
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
  console.log(className)
  const newClassName = classnames({
    [className]: true,
    [IS_HIGH_LEVEL]: isCreate,
    [IS_FULL_WIDTH]: isCreate,
  })
  return (
    <div
      ref={(isCreate ? ref : nullRef) as React.ForwardedRef<HTMLDivElement> }
      className={newClassName}
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
