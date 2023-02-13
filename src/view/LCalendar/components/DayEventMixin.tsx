import React, { useRef } from 'react'
import { mouseEvent } from './type'
import { IMouseEvent } from '../utils/calendar'
import { IEventsRect } from '../utils/events'
import classnames from 'classnames'
import styles from './day.module.less'
import {
  IS_DRAGGED, IS_FULL_WIDTH, IS_HIGH_LEVEL
} from '../Popover/helpers'
interface  IProps {
  rect:IEventsRect
  className:string
  onClickEvent:()=>void
  onMousedownEvent:()=>void
  onMouseupEvent:()=>void
}
export const RenderEvent = React.forwardRef((props:IProps, ref) => {
  const { rect,
    className,
    onMouseupEvent = mouseEvent<IMouseEvent>(),
    onClickEvent = mouseEvent<IMouseEvent>(),
    onMousedownEvent = mouseEvent<IMouseEvent>(), } = props
  const nullRef = useRef(null)
  const isCreate = rect.event.isCreate
  const isDragging = rect.event.isDragging
  const isDragged = rect.event.dragged
  const newClassName = classnames({
    [className]: true,
    // create事件，在鼠标松开之后会形成新的布局
    // 所以create事件 这个时候需要再顶层
    [styles.isHighLevel]: (isCreate || isDragging),
    // 在拖拽过程中这个日历事件需要保持最宽覆盖
    [styles.isFullWidth]: (isCreate || isDragging),
    [styles.isDragged]: isDragged,
    [styles.boxShadow]: isDragging,
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
