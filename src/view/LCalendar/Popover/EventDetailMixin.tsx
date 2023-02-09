import { CalendarEvent } from '../utils/calendar'
import styles from './style.module.less'
import { getEventDayLabel, getEventTimeLabel } from './helpers'
import React from 'react'
import mainStyles from '../style.module.less'
import { SvgIcon } from '../../../components'

export const EventDetailMixin = {
  renderPersonnel(event:CalendarEvent) {
    const { personnel, } = event
    return (
      <div className={styles.popoverBodyItem}>
        <SvgIcon iconName='popover_users' className={styles.popoverBodyIcon}/>
        <div className={styles.popoverBodyItemContent}>{personnel}</div>
      </div>
    )
  },
  renderLocation(event:CalendarEvent) {
    const { location, } = event
    return (
      <div className={styles.popoverBodyItem}>
        <SvgIcon iconName='popover_location' className={styles.popoverBodyIcon}/>
        <div className={styles.popoverBodyItemContent}>{location}</div>
      </div>
    )
  },
  renderAuthor(event:CalendarEvent) {
    const { author, } = event
    return (
      <div className={styles.popoverBodyItem}>
        <SvgIcon iconName='popover_calendar' className={styles.popoverBodyIcon}/>
        <div className={styles.popoverBodyItemContent}>
          {author}
        </div>
      </div>
    )
  },
  renderNameTime(event:CalendarEvent) {
    const { name, start, end,  } = event
    return (
      <div className={styles.popoverBodyNameTime}>
        <SvgIcon iconName='popover_flag' className={styles.popoverBodyIcon}/>
        <div>
          <div className={styles.popoverBodyName}>{name}</div>
          <div className={styles.popoverBodyTime}>
            {getEventDayLabel(start, end)} {getEventTimeLabel(start, end)}
          </div>

        </div>
      </div>
    )
  },
  renderHeader(event:CalendarEvent) {
    const handleClick = (type:string, calendarEvent:CalendarEvent) => {
      console.log(calendarEvent)
    }
    return (
      <>
        <div style={{
          flex: 1,
        }}></div>
        <div className={mainStyles.iconHover}>
          <SvgIcon iconName='popover_edit'/>
        </div>
        <div className={mainStyles.iconHover}>
          <SvgIcon iconName='popover_trash'/>
        </div>
        <div className={mainStyles.iconHover} onClick={() => handleClick('delete', event)}>
          <SvgIcon iconName='popover_x'/>
        </div>
      </>
    )
  },
  renderFooter(event:CalendarEvent) {
    return (
      <>
        <div style={{
          flex: 1,
        }}></div>
        <div className={styles.popoverFooterMoreButton}>更多选项</div>
        <div className={styles.popoverFooterSaveButton}>保存</div>
      </>
    )
  },
}
