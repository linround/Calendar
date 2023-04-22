import { CalendarEvent } from '../../utils/calendar'
import { NO_NAME_EVENT_VALUE } from '../../utils/time'
import localizer from '../../utils/segments/localizer'

export const ALL_DAY_LABEL = '全天'

export function moreEventItemLabel(event:CalendarEvent):string {
  const title = event.eventName || `(${NO_NAME_EVENT_VALUE})`
  const { allDay, start, } = event
  const timeLabel = allDay ? ALL_DAY_LABEL :
    localizer.format(start, 'HH:mm')
  return `${timeLabel}  ${title}`

}
