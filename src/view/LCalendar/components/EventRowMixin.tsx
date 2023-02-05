import { CalendarEvent, IMouseEvent } from '../utils/calendar'
import eventMixinStyle from './eventMixin.module.less'
import classnames from 'classnames'
import { eventsInSlot, ISegments } from '../utils/segments/eventSegments'
import { mouseEvent } from './type'

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
  renderMoreContent(segments:ISegments[], slot:number) {
    const count = eventsInSlot(segments, slot)
    const onClick = () => {
      console.log(segments, slot)
    }
    return (
      <span className={eventMixinStyle.eventMixinMoreContent} onClick={onClick}>
        + {count} more
      </span>
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
