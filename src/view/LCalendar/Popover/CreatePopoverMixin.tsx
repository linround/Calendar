import React from 'react'
import {
  Input, Button, TextField
} from '@mui/material'
import classnames from 'classnames'
import { IMixinPopoverBody } from './helpers'
import mainStyles from '../style.module.less'
import { SvgIcon } from '../../../components'
import TimePicker from './SingleComponent/TimePicker'
import styles from './createEventPopover.module.less'

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
    const namePlaceholder = '输入标题'
    const locationPlaceholder = '输入地点'
    return (
      <div className={styles.createEventPopoverBody}>
        <div className={styles.createEventPopoverName}>
          <Input
            fullWidth={true}
            defaultValue={event.name}
            placeholder={namePlaceholder}
            onChange={(e) => {
              setEventKeyValue('name', e.target.value)
            }} />
        </div>
        <div className={styles.createEventPopoverInputItem}>
          <div className={styles.createEventPopoverInputIcon}>
            <SvgIcon iconName='popover-clock' />
          </div>
          <TimePicker time={event.start} />
          ~
          <TimePicker  time={event.end} />
        </div>
        <div className={styles.createEventPopoverInputItem}>
          <div className={styles.createEventPopoverInputIcon}>
            <SvgIcon iconName='popover_location' />
          </div>
          <TextField
            fullWidth={true}
            defaultValue={location}
            placeholder={locationPlaceholder}
            onChange={(e) => setEventKeyValue('location', e.target.value)}/>

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
