import { CalendarEvent, VTimestampInput } from '../calendar'
function accessor(data:CalendarEvent, field:string) {
  return data[field]
}
export interface IAccessors {
  start:(data:CalendarEvent) => VTimestampInput
  end:(data:CalendarEvent) => VTimestampInput
  allDay:(data:CalendarEvent) => (string|number|boolean|null|undefined)
}

export const accessors = {
  start: (data:CalendarEvent) => accessor(data, 'start'),
  end: (data:CalendarEvent) => accessor(data, 'end'),
  allDay: (data:CalendarEvent) => accessor(data, 'allDay'),

  tooltip: (data:CalendarEvent) => accessor(data, 'tooltip'),
  title: (data:CalendarEvent) => accessor(data, 'title'),
}

