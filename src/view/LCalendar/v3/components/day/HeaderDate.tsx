import { CalendarTimestamp } from '../../../utils/calendar'
import React from 'react'
import style from './style/dayHeader.module.less'
import { weekdayFormatter } from '../../../utils/timesStamp'
import Button from '@mui/material/Button'

interface IProps {
  days:CalendarTimestamp[]
}
export function HeaderDate(props:React.PropsWithChildren<IProps>) {
  const { days, } = props
  return (
    <>{days.map((day) => (
      <div className={style.dayHeaderItem} key={day.date}>
        <div className={style.dayHeaderItemLabel}>
          {weekdayFormatter(day)}
        </div>
        <div>
          <Button variant='contained' className={style.dayHeaderItemValue}>
            {day.day}
          </Button>
        </div>
      </div>))}</>
  )
}
