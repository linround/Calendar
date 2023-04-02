import { VIEWS } from './Views'

function View() {
  const name = 'day'
  const CalendarView = VIEWS[name]
  return (
    <CalendarView />
  )
}

export function Calendar() {
  return (
    <>
      <View />
    </>
  )
}
