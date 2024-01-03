import React, { useContext } from 'react'
import {
  Button, Input, TextField
} from '@mui/material'
import {
  Checkbox, DatePicker, DatePickerProps
} from 'antd'
import classnames from 'classnames'
import { IMixinPopoverBody } from './helpers'
import mainStyles from '../style.module.less'
import { SvgIcon } from '../../../components'
import styles from './createEventPopover.module.less'
import { MyTimePicker } from './SingleComponent/MyTimePicker'
import { EventContext } from '../props/propsContext'


export const CreatePopoverMixin = {
  renderHeader(onClose:()=>void):JSX.Element {
    return (
      <div className={styles.createEventPopoverHeader}>
        <span>
          <SvgIcon iconName='popover-align-justify' className={mainStyles.iconHover}/>
        </span>
        <span onClick={onClose}>
          <SvgIcon iconName='popover_x' className={mainStyles.iconHover}/>
        </span>
      </div>
    )
  },
  renderBody(props:IMixinPopoverBody):JSX.Element {
    const { event, setEventKeyValue, } = props
    const {  setCreatedEvent, } = useContext(EventContext)

    const namePlaceholder = '输入标题'
    const locationPlaceholder = '输入地点'
    const onDateChange:DatePickerProps['onChange'] = (date, dateString) => {
      console.log(date, dateString)
    }
    const onSelectStartTime = (timeStamp:number) => {
      const duration = event.end - event.start
      setCreatedEvent({
        ...event,
        start: timeStamp,
        end: timeStamp + duration,
      })
    }
    const onSelectEndTime = (timeStamp:number) => {

      setCreatedEvent({
        ...event,
        end: timeStamp,
      })
    }

    return (
      <div className={styles.createEventPopoverBody}>
        <div className={styles.createEventPopoverName}>
          <Input
            fullWidth={true}
            defaultValue={event.eventName}
            placeholder={namePlaceholder}
            onChange={(e) => {
              setEventKeyValue('eventName', e.target.value)
            }} />
        </div>
        <div className={styles.createEventPopoverInputItem}>
          <div className={styles.createEventPopoverInputIcon}>
            <SvgIcon iconName='popover-clock' />
          </div>
          <DatePicker onChange={onDateChange}  />
          <MyTimePicker
            isStart={true}
            time={event.start}
            event={event}
            selectTime={onSelectStartTime} />
          ~
          <MyTimePicker
            isStart={false}
            time={event.end}
            event={event}
            selectTime={onSelectEndTime} />
          <Checkbox>全天</Checkbox>

        </div>
        <div className={styles.createEventPopoverInputItem}>
          <div className={styles.createEventPopoverInputIcon}>
            <SvgIcon iconName='popover_location' />
          </div>
          <TextField
            fullWidth={true}
            defaultValue={event.eventLocation}
            placeholder={locationPlaceholder}
            onChange={(e) => setEventKeyValue('eventLocation', e.target.value)}/>

        </div>
      </div>
    )
  },
  renderFooter(onConfirm:()=>void):JSX.Element {
    const confirmClassName = classnames({
      [styles.createEventPopoverFooterButton]: true,
      [styles.createEventPopoverFooterConfirm]: true,
    })
    const cancelClassName = classnames({
      [styles.createEventPopoverFooterButton]: true,
      [styles.createEventPopoverFooterCancel]: true,
    })
    return (
      <div className={styles.createEventPopoverFooter}>
        <Button variant="outlined"  className={cancelClassName}>更多选项</Button >
        <Button variant="contained" className={confirmClassName} onClick={onConfirm}>确认</Button >
      </div>
    )
  },
}
