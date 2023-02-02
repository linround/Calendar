import { CalendarEvent } from '../utils/calendar'
import eventMixinStyle from './eventMixin.module.less'
import classnames from 'classnames'
import { eventsInSlot, ISegments } from '../utils/segments/eventSegments'
import localizer from '../utils/segments/localizer'

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
    event: CalendarEvent
  ) {
    const width = ((Math.abs(len) / slots) * 100) + '%'
    const bgColor = event.color
    const className = classnames({
      [eventMixinStyle.eventMixinContainer]: true,
      [eventMixinStyle.isEvent]: true,
    })
    return (
      <div
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
    return (
      <span className={eventMixinStyle.eventMixinMoreContent}>
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
