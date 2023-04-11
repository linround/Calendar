import { IEventsRect } from '../../../utils/events'
import React from 'react'
import styles from './style/event.module.less'
import { EventWrapperComponent } from './EventWrapper'
import classnames from 'classnames'
import { DEFAULT_EVENT } from '../../../props/propsContext'

interface IProps {
  rect:IEventsRect

}
export function EventComponent(props:React.PropsWithChildren<IProps>) {
  const { rect: { event, style, content, }, } = props

  return (
    <EventWrapperComponent event={event}>
      <div style={style} className={classnames({
        [styles.eventContainer]: true,
        [DEFAULT_EVENT.eventClass]: true,
      })}>
        <div>{content.title}</div>
        <div>{content.timeRange}</div>
      </div>
    </EventWrapperComponent>

  )
}
