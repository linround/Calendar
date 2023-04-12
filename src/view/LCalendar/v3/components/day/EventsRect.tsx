import React from 'react'
import { IEventsRect } from '../../../utils/events'
import { EventWrapperComponent } from './EventWrapper'
import classnames from 'classnames'
import styles from './style/event.module.less'
import { DEFAULT_EVENT } from '../../../props/propsContext'
import { CalendarTimestamp } from '../../../utils/calendar'

interface IProps {
  visualsRect:IEventsRect[]
  firstMinute:number
  className?:string,
  days:CalendarTimestamp[]
  daysContainer:HTMLDivElement
  scrollContainer: HTMLDivElement
}
export function EventsRect(props:React.PropsWithChildren<IProps>) {
  const {
    visualsRect,
    firstMinute,
    days,
    daysContainer,
    scrollContainer,
    className = '',
  } = props
  return (
    <>
      {visualsRect.map((rect, index) => (
        <EventWrapperComponent
          key={index}
          days={days}
          event={rect.event}
          firstMinute={firstMinute}
          daysContainer={daysContainer}
          scrollContainer={scrollContainer}
        >
          <div style={rect.style} className={classnames({
            [styles.eventContainer]: true,
            [className]: true,
            [DEFAULT_EVENT.eventClass]: true,
          })}>
            <div>{rect.content.title}</div>
            <div>{rect.content.timeRange}</div>
          </div>
        </EventWrapperComponent>
      ))}
    </>
  )
}
