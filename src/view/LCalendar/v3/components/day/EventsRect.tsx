import React from 'react'
import styles from './style/event.module.less'
import { EVENT_DEFAULT_BG_TITLE, IEventsRect } from '../../../utils/events'
import { EventWrapperComponent } from './EventWrapper'
import classnames from 'classnames'
import { DEFAULT_EVENT } from '../../../props/propsContext'
import { CalendarTimestamp } from '../../../utils/calendar'
import { IEventAction } from '../../utils'


interface IProps {
  visualsRect:IEventsRect[]
  firstMinute:number
  className?:string,
  days:CalendarTimestamp[]
  daysContainer:HTMLDivElement
  scrollContainer: HTMLDivElement
  eventAction:IEventAction
}
export const EventsRect = function(props:React.PropsWithChildren<IProps>) {
  const {
    visualsRect,
    firstMinute,
    days,
    daysContainer,
    scrollContainer,
    className = '',
    eventAction,
  } = props

  return (
    <>
      {visualsRect.map((rect, index) => (
        <EventWrapperComponent
          key={index}
          days={days}
          eventAction={eventAction}
          event={rect.event}
          firstMinute={firstMinute}
          daysContainer={daysContainer}
          scrollContainer={scrollContainer}
        >
          <div
            style={rect.style}
            className={classnames({
              [styles.eventContainer]: true,
              [className]: true,
              [DEFAULT_EVENT.eventClass]: true,
            })}>
            <div>{rect.content.title || EVENT_DEFAULT_BG_TITLE}</div>
            <div>{rect.content.timeRange}</div>
          </div>
        </EventWrapperComponent>
      ))}
    </>
  )
}
