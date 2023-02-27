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
export const CreatePopoverContent = React.forwardRef((props:IContentProps, ref:React.ForwardedRef<HTMLDivElement>) => {
  const { left,
    top,
    onClose,
    onConfirm,
    ...bodyProps } = props

  return (
    <div
      ref={ref}
      className={styles.createEventPopoverContainer}
      style={{ left, top, }}>
      {CreatePopoverMixin.renderHeader(onClose)}
      {CreatePopoverMixin.renderBody(bodyProps)}
      {CreatePopoverMixin.renderFooter(onConfirm)}
    </div>
  )
})
