import { CalendarTimestamp } from '../utils/calendar'
import React from 'react'
import monthStyle from './month.module.less'
import dayStyle from '../components/day.module.less'
import Button from '@mui/material/Button'

interface IGenDayProp {
  day:CalendarTimestamp
}
export function GenSingleDay(props:React.PropsWithChildren<IGenDayProp>) {
  const { day, } = props
  return (
    <div className={monthStyle.monthWeekDay}>
      <Button className={dayStyle.dayHeaderDayValue} variant="contained">
        {day.day}
      </Button>
    </div>
  )
}
