import React from 'react'
import { IProps } from './type'

const App: React.FC<IProps> = (props) => {
  const { events, } = props
  console.log(events)
  return (
    <div>
      DayCalendar
    </div>
  )
}

export default App
