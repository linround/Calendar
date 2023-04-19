import React, { useState } from 'react'
import style from './style/dayHeader.module.less'
import { CalendarEventParsed, CalendarTimestamp } from '../../../utils/calendar'
import { HeaderContent } from './HeaderContent'
import { HeaderDate } from './HeaderDate'

interface IProps {
  intervalWidth:number
  days: CalendarTimestamp[]
  events:CalendarEventParsed[]
}
export function V3DayHeaderComponent(props:React.PropsWithChildren<IProps>) {
  const {
    intervalWidth,
    events,
    days,
  } = props
  const [
    fold,
    setFold
  ] = useState<boolean>(true)
  return (
    <>
      <div className={style.dayHeader} style={{ marginRight: 10, }}>
        <div className={style.dayHeaderInterVals} style={{ width: intervalWidth, }} />
        <HeaderDate days={days} />
      </div>
      <HeaderContent
        fold={fold}
        setFold={setFold}
        maxHeight={100}
        days={days}
        events={events}
        maxRow={3}
        minRow={0}
        intervalWidth={intervalWidth} />
    </>
  )
}
