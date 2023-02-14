import styles from './createEventPopover.module.less'
import mainStyles from '../style.module.less'
import { SvgIcon } from '../../../components'
import { Input } from 'antd'
import React from 'react'
import { IMixinPopoverBody } from './helpers'

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
    const namePlaceholder = '标题'
    const locationPlaceholder = '地点'
    const { name, setName, location, setLocation, } = props
    return (
      <div className={styles.createEventPopoverBody}>
        <div className={styles.createEventPopoverName}>
          <Input
            defaultValue={name}
            placeholder={namePlaceholder}
            onChange={(e) => setName(e.target.value)} />
        </div>
        <div className={styles.createEventPopoverInputItem}>
          <div className={styles.createEventPopoverInputIcon}>
            <SvgIcon iconName='popover_location' />
          </div>
          <Input
            defaultValue={location}
            placeholder={locationPlaceholder}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
      </div>
    )
  },
  renderFooter(onConfirm:()=>void):JSX.Element {
    return (
      <div>
        <button >更多选项</button>
        <button onClick={onConfirm}>确认</button>
      </div>
    )
  },
}
