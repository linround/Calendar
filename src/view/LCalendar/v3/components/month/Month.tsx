import { V3WeekComponent } from '../week/Week'
import { CommonMonthHeader } from '../../../components/CommonMonthHeader'
import {
  useContext, useEffect, useRef, useState
} from 'react'
import {
  BaseContext, EventContext, MouseEventContext
} from '../../../props/propsContext'
import style from './style/month.module.less'
import { CalendarEvent, CalendarTimestamp } from '../../../utils/calendar'
import { IMonth } from '../../../components/type'
import { MonthWrapper } from './MonthWrapper'
import { filterEvents } from '../../utils'

interface IProps {
  days:CalendarTimestamp[]
  events:CalendarEvent[]
}
export function V3MonthComponent(props:IProps) {
  const { days, events, } = props
  // 还需要处理maxRows和minRows的来源
  const [maxRows] = useState(3)
  const [minRows] = useState(0)

  const {
    parsedWeekdays,
  } = useContext(BaseContext)






  const weekDays = parsedWeekdays.length
  const month: IMonth = []
  for (let i = 0; i < days.length;i += weekDays) {
    const week = days.slice(i, i + weekDays)
    month.push(week)
  }



  // 存储该scroll滚动容器
  const containerRef = useRef<HTMLDivElement|null>(null)
  const { setDayScrollRef, } = useContext(MouseEventContext)
  useEffect(() => {
    if (containerRef) {
      setDayScrollRef(containerRef.current)
    }
  }, [containerRef])

  const {
    draggedEvent,
    createdEvent,
  } = useContext(EventContext)
  return (
    <div className={style.monthContainer}>
      <CommonMonthHeader />
      <MonthWrapper
        month={month}
        container={containerRef.current as HTMLDivElement}>
        <div className={style.monthBody} ref={containerRef} >
          {month.map((weekDays, index) => (
            <V3WeekComponent
              key={index}
              container={containerRef.current as HTMLDivElement}
              month={month}
              events={filterEvents([...events, createdEvent, draggedEvent]  as CalendarEvent[])}
              weekDays={weekDays}
              maxRows={maxRows}
              minRows={minRows}
            />
          ))}
        </div>
      </MonthWrapper>
    </div>
  )
}
