import styles from './createEventPopover.module.less'
import { CreatePopoverMixin } from './CreatePopoverMixin'
import React from 'react'
import { IMixinPopoverBody, IMixinPopoverHeader } from './helpers'


interface IContentProps extends IMixinPopoverHeader, IMixinPopoverBody{
  left:number
  top: number
  onClose: () => void
  onConfirm:()=> void
}
export const CreatePopoverContent = (props:IContentProps) => {
  const { left, top,  onClose, onConfirm, setName, name, } = props

  return (
    <div
      className={styles.createEventPopoverContainer}
      style={{ left, top, }}>
      { (
        <>
          {CreatePopoverMixin.renderHeader(onClose)}
          {CreatePopoverMixin.renderBody({ setName, name, })}
          {CreatePopoverMixin.renderFooter(onConfirm)}
        </>
      )
      }
    </div>
  )
}
