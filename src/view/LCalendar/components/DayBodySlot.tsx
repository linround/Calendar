import React, { useContext, useMemo } from 'react'
import {
  CalendarDayBodySlotScope, CalendarEventParsed, IMouseEvent
} from '../utils/calendar'
import { BaseContext, EventContext } from '../props/propsContext'
import { genTimedEvents, IEventsRect } from '../utils/events'
import { CalendarEventVisual } from '../utils/modes/common'
import classnames from 'classnames'
import dayStyle from './day.module.less'
import { IS_EVENT, mouseEvent } from './type'
import { RenderEvent } from './DayEventMixin'
import { ICalendarHandleEvent } from './dayPropsType'

interface IProps extends ICalendarHandleEvent<IMouseEvent> {
  day:CalendarDayBodySlotScope
  getEventsForDayTimed:(day:CalendarDayBodySlotScope) =>  CalendarEventParsed[]
  categoryMode:boolean
}
export const DayBodySlot = React.forwardRef((props:IProps, ref) => {
  const { day, getEventsForDayTimed, categoryMode,
    onClickEvent = mouseEvent<IMouseEvent>(),
    onMousedownEvent = mouseEvent<IMouseEvent>(),
    onMouseupEvent = mouseEvent<IMouseEvent>(), } = props
  const {
    parsedEvents,
    eventOverlapThreshold, eventModeFunction,
  } = useContext(EventContext)

  const {
    parsedWeekdays,
  } = useContext(BaseContext)
  const parsedEventOverlapThreshold = useMemo<number>(() => eventOverlapThreshold, [eventOverlapThreshold])


  const mode = eventModeFunction(
    parsedEvents,
    parsedWeekdays[0],
    parsedEventOverlapThreshold
  )

  const events = getEventsForDayTimed(day)



  // 过滤出来拖拽的事件
  // 新建的event再拉伸是也被定义为dragging
  // 如果对其进行点击拖拽，就会产生两个dragging
  const draggingEvents = events.filter((e) => e.input.isDragging)
  let normalEvents:CalendarEventParsed[] = []
  let draggingEventRects:IEventsRect[] = []
  if (draggingEvents.length > 0) {
    const draggingEventVisuals = draggingEvents.map((event) => ({
      event, left: 0, width: 100,
    }))
    draggingEventRects = draggingEventVisuals.map((visual) => genTimedEvents(visual as CalendarEventVisual, day) as IEventsRect)
      .filter((i) => i)
  }





  normalEvents = events.filter((e) => !e.input.isDragging)
  const visuals = mode(
    day, normalEvents, true, categoryMode
  )
  const visualsRect = visuals.map((visual: CalendarEventVisual) => genTimedEvents(visual,
    day))
    .filter((i: any) => i !== false) as IEventsRect[]
  const className = classnames({
    [dayStyle.dayBodyTimedItem]: true,
    [IS_EVENT]: true,
  })
  return (
    <>
      {/*在边界事件中比如00:00这个时间点，可以当作某天的节苏或另一天的开始,
           在这个时间点虽然有事件，但不会形成图像createEventRect
        */}
      {draggingEventRects.map((rect, index) => (
        <RenderEvent
          key={`${index}${rect.event.id}`}
          rect={rect}
          className={className}
          onClickEvent={onClickEvent}
          onMousedownEvent={onMousedownEvent}
          onMouseupEvent={onMouseupEvent}
          ref={ref}
        />
      ))}
      {
        visualsRect
          .map((rect, index) => (
            <RenderEvent
              key={`${index}${rect.event.id}`}
              rect={rect}
              className={className}
              onClickEvent={onClickEvent}
              onMousedownEvent={onMousedownEvent}
              onMouseupEvent={onMouseupEvent}
              ref={null}
            />
          ))
      }
    </>
  )
})
