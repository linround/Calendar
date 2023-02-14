import styles from './createEventPopover.module.less'
import mainStyles from '../style.module.less'
import { SvgIcon } from '../../../components'
import React from 'react'
import { IMixinPopoverBody } from './helpers'

export const CreatePopoverMixin = {
  renderHeader(onClose:()=>void):JSX.Element {
    return (
      <div className={styles.createEventPopoverHeader}>
        <span
          onClick={onClose}>
          <SvgIcon
            iconName='popover_x'
            className={mainStyles.iconHover}/>
        </span>
      </div>
    )
  },
  renderBody(props:IMixinPopoverBody):JSX.Element {
    const { name, setName, } = props
    return (
      <div>
        <input defaultValue={name} onChange={(e) => setName(e.target.value)}  />
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
