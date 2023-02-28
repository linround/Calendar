import { CreatePopoverMixin } from './CreatePopoverMixin'
import React from 'react'
import { IMixinPopoverBody, IMixinPopoverHeader } from './helpers'


interface IContentProps extends IMixinPopoverHeader, IMixinPopoverBody{
  onClose: () => void
  onConfirm:()=> void
}
export const CreatePopoverContent = (props:IContentProps) => {
  const { onClose,
    onConfirm,
    ...bodyProps } = props

  return (
    <>
      {CreatePopoverMixin.renderHeader(onClose)}
      {CreatePopoverMixin.renderBody(bodyProps)}
      {CreatePopoverMixin.renderFooter(onConfirm)}
    </>
  )
}
