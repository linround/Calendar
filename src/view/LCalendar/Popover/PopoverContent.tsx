import React from 'react'
import styles from './normalEventPopover.module.less'
import { EventDetailMixin } from './EventDetailMixin'
import { INormalPopoverContentProps } from './helpers'

export function PopoverContent(props:React.PropsWithChildren<INormalPopoverContentProps>) {
  const { event, } = props
  return (
    <>
      <div className={styles.popoverHeader}>
        {EventDetailMixin.renderHeader(props)}
      </div>
      <div className={styles.popoverBody}>
        {EventDetailMixin.renderNameTime(event)}
        {EventDetailMixin.renderLocation(event)}
        {EventDetailMixin.renderPersonnel(event)}
        {EventDetailMixin.renderAuthor(event)}
      </div>
    </>
  )
}
