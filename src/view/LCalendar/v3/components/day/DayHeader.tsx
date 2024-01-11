import React, { useState } from 'react'
import style from './style/dayHeader.module.less'
import { CalendarTimestamp } from '../../../utils/calendar'
import { HeaderContent } from './HeaderContent'
import { HeaderDate } from './HeaderDate'
import { useClassifiedEventsInWeekAndDayHook } from '../../../props/useEventsHook'

interface IProps {
  intervalWidth:number
  days: CalendarTimestamp[]
}
export function V3DayHeaderComponent(props:React.PropsWithChildren<IProps>) {
  const {
    intervalWidth,
    days,
  } = props
  const [
    fold,
    setFold
  ] = useState<boolean>(false)
  const onMore = () => {
    setFold(!fold)
  }

  const { classifiedEvents, } = useClassifiedEventsInWeekAndDayHook()
  return (
    <>
      <div className={style.dayHeader} style={{ marginRight: 10, }}>
        <div className={style.dayHeaderInterVals} style={{ width: intervalWidth, }} />
        <HeaderDate days={days} />
      </div>
      <HeaderContent
        fold={fold}
        onMore={onMore}
        maxHeight={100}
        days={days}
        events={[
          ...classifiedEvents.crossDaysEvents,
          ...classifiedEvents.allDayEvents
        ]}
        maxRow={3}
        minRow={0}
        intervalWidth={intervalWidth} />
    </>
  )
}
