import React, {
  ReactElement, useCallback, useContext
} from 'react'
import { mousedownController } from '../../utils/mouseDown'
import { Selector } from '../../utils/selector'
import { NORMAL_ACTION } from '../../utils'
import { EventContext, MouseEventContext } from '../../../props/propsContext'


export function RowMoreWrapper(props:React.PropsWithChildren) {
  const { children, } = props
  const {
    setShowCreatePopoverV3,
    setNormalPopoverRef,
    setNormalEvent,
    setCreatePopoverRefV3,
    setShowNormalPopover,
  } = useContext(MouseEventContext)
  const { setCreatedEvent, } = useContext(EventContext)

  const clearCreatePopover = useCallback(() => {
    setCreatePopoverRefV3(null)
    setCreatedEvent(null)
    setShowCreatePopoverV3(false)
  }, [setCreatePopoverRefV3, setCreatedEvent, setShowCreatePopoverV3])

  const clearNormalPopover = useCallback(() => {
    setNormalEvent(null)
    setNormalPopoverRef(null)
    setShowNormalPopover(false)
  }, [setNormalEvent, setNormalPopoverRef, setShowNormalPopover])



  const selector = new Selector()
  selector.on('beforeSelect', () => {
    mousedownController.setState(NORMAL_ACTION)
    return false
  })
  selector.on('selecting', () => false)
  selector.on('select', () => {
    mousedownController.clearState()
  })
  return React.cloneElement(children as ReactElement, {
    onMouseDown(e:React.MouseEvent) {
      selector.handleInitialEvent(e)
      clearCreatePopover()
      clearNormalPopover()
    },
  })
}
