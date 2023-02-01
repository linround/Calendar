import { CalendarEvent } from '../calendar'
function accessor(data:CalendarEvent, field:string) {
  return data[field]
}

export const accessors = {
  start: (data:CalendarEvent) => accessor(data, 'start'),
  end: (data:CalendarEvent) => accessor(data, 'end'),
  allDay: (data:CalendarEvent) => accessor(data, 'allDay'),
}

