import { IEvent } from './type'
import DayCalendar from './Day/index'
export default function () {
  const events:IEvent[] = [
    {
      name: '1',
      color: '#000000',
      start: 1670898600000,
      end: 1670914800000,
      timed: true,
    },
    {
      name: '1',
      color: '#000000',
      start: 1670898600000,
      end: 1670914800000,
      timed: true,
    }
  ]
  return (
    <DayCalendar events={events} />
  )
}
