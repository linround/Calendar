import React, { useContext } from 'react'
import styles from './style.module.less'
import { SvgIcon } from '../../../components'
import Button from '@mui/material/Button'
import {
  CalendarContext, EventContext, MouseEventContext
} from '../props/propsContext'
import { getDayNowTime } from '../utils/time'
import { ROUND_TIME, roundTime } from '../utils/timesStamp'
import { createTimeEvent } from '../utils/events'
import { ISideAdd } from '../modules/options'

export function CreateButton(props:ISideAdd) {
  const { value, } = useContext(CalendarContext)
  const { setShowCreatePopover, } = useContext(MouseEventContext)
  const { resetEvents, } = useContext(EventContext)
  const { setCreateEvent, } = props

  const onCreateClick = () => {
    const dayTime = getDayNowTime(value)
    const startTime = roundTime(dayTime as number, false)
    const endTime = startTime + (ROUND_TIME  * 60 * 1000)
    const createEvent = createTimeEvent(startTime, endTime)
    setCreateEvent(createEvent)
    setShowCreatePopover(true)
    resetEvents(createEvent, createEvent)
  }
  return (
    <div className={styles.sideCreate}>
      <Button
        className={styles.sideCreateButton}
        onClick={onCreateClick}>
        <SvgIcon iconName='popover_plus' />
        添加日程
      </Button>
    </div>
  )
}
