import React from 'react'
import { CalendarEvent } from '../utils/calendar'
import styles from './style.module.less'
import { EventDetailMixin } from './EventDetailMixin'

export function PopoverContent(props:React.PropsWithChildren<{event:CalendarEvent}>) {
  const { event, } = props
  return (
    <>
      <div className={styles.popoverHeader}>
        {
          EventDetailMixin.renderHeader(event)
        }
      </div>
      <div className={styles.popoverBody}>

        {
          [
            EventDetailMixin.renderNameTime(event),
            EventDetailMixin.renderLocation(event),
            EventDetailMixin.renderPersonnel(event),
            EventDetailMixin.renderAuthor(event)
          ]
        }
      </div>
    </>
  )
}
