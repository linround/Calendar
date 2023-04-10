import React from 'react'
import style from './style/dayHeader.module.less'
import { CalendarTimestamp } from '../../../utils/calendar'
import { weekdayFormatter } from '../../../utils/timesStamp'
import Button from '@mui/material/Button'
interface IProps {
  intervalWidth:number
  days: CalendarTimestamp[]
}
export function V3DayHeaderComponent(props:React.PropsWithChildren<IProps>) {
  const { intervalWidth, days, } = props
  return (
    <div className={style.dayHeader} style={{ marginRight: 10, }}>
      <div className={style.dayHeaderInterVals} style={{ width: intervalWidth, }} />
      {days.map((day) => (
        <div className={style.dayHeaderItem} key={day.date}>
          <div className={style.dayHeaderItemLabel}>
            {weekdayFormatter(day)}
          </div>
          <div>
            <Button variant='contained' className={style.dayHeaderItemValue}>
              {day.day}
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
