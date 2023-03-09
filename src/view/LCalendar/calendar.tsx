import LCalendar from './index'
import { VisualContext } from './props/VisualContext'
export function CalendarPage() {
  return (
    <VisualContext value={{}}>
      <LCalendar />
    </VisualContext>
  )
}
