import { CalendarEvent, IMouseEvent } from '../utils/calendar'
import eventMixinStyle from './eventMixin.module.less'
import classnames from 'classnames'
import { eventsInSlot, ISegments } from '../utils/segments/eventSegments'
import { defaultShowMore, mouseEvent } from './type'
import React from 'react'

export const EventRowMixin = {
  renderSpan(slots:number,
    len:number) {
    const width = ((Math.abs(len) / slots) * 100) + '%'
    return (
      <div
        style={{
          flexBasis: width,
          maxWidth: width,
        }}>
      </div>
    )
  },
  renderEvent(
    slots:number,
    len:number,
    content:any = '',
    event: CalendarEvent,
    onMousedownEvent: (event:IMouseEvent) => IMouseEvent = mouseEvent<IMouseEvent>()
  ) {
    const width = ((Math.abs(len) / slots) * 100) + '%'
    const bgColor = event.color
    const className = classnames({
      [eventMixinStyle.eventMixinContainer]: true,
      [eventMixinStyle.isEvent]: true,
    })
    return (
      <div
        onMouseDown={(nativeEvent) => onMousedownEvent({
          nativeEvent,
          event,
        })}
        className={className}
        style={{
          flexBasis: width,
          maxWidth: width,
          backgroundColor: bgColor,
        }}>
        {content}
      </div>
    )
  },
  renderMoreContent(
    segments:ISegments[], slot:number, showMore = defaultShowMore
  ) {
    const count = eventsInSlot(segments, slot)
    return (
      <div className={eventMixinStyle.eventMixinMoreContent} onClick={(e) => showMore(slot, e)}>
        + {count} more
      </div>
    )
  },
  renderMore(
    slots:number,
    len:number,
    content:any = ''
  ) {
    const width = ((Math.abs(len) / slots) * 100) + '%'
    const className = classnames({
      [eventMixinStyle.eventMixinMore]: true,
      [eventMixinStyle.isMore]: true,
    })

    return (
      <div
        className={className}
        style={{
          flexBasis: width,
          maxWidth: width,
        }}>
        {content}
      </div>
    )
  },
}
