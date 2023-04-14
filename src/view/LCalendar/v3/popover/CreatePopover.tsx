import {
  createRef,
  useContext, useLayoutEffect, useMemo, useState
} from 'react'
import style from './style/createPopover.module.less'
import { EventContext, MouseEventContext } from '../../props/propsContext'
import commonStyle from '../../commonStyle/popover.module.less'
import { calcPosition, IEventKeyValue } from '../../Popover/helpers'
import classnames from 'classnames'
import { CreatePopoverContent } from '../../Popover/CreatePopoverContent'
import { handleCreateEvent } from '../../../../api'
import { SUCCESS_CODE } from '../../../../request'
import { CalendarEvent } from '../../utils/calendar'

export function CreatePopover() {
  const {
    createPopoverRefV3,
    setCreatePopoverRefV3,
    showCreatePopoverV3,
    setShowCreatePopoverV3,
    dayScrollRef,
    updateEventList,
  } = useContext(MouseEventContext)

  const eventRef = createRef<any>()
  const [left, setLeft] = useState(0)
  const [top, setTop] = useState(0)
  // 此处使用 useLayoutEffect 来优化页面抖动的问题
  useLayoutEffect(() => {
    if (createPopoverRefV3 && eventRef.current) {
      const { left, top, } = calcPosition(
        createPopoverRefV3, dayScrollRef as Element, eventRef.current
      )
      // 这里无法在全局处理
      setLeft(Math.max(0, left))
      setTop(Math.max(0, top))
      return
    }
  }, [createPopoverRefV3?.getBoundingClientRect(), createPopoverRefV3, eventRef.current])

  const className = classnames({
    [commonStyle.popover]: true,
    [style.popoverContainer]: true,
  })

  const { createdEvent, setCreatedEvent, } = useContext(EventContext)

  function setEventKeyValue (key:string, v:IEventKeyValue) {
    (createdEvent as CalendarEvent)[key] = v
    setCreatedEvent({ ...createdEvent, })
  }
  function clear() {
    setCreatedEvent(null)
    setCreatePopoverRefV3(null)
    setShowCreatePopoverV3(false)
  }
  const onConfirm = async () => {
    const { code, } = await handleCreateEvent(createdEvent as CalendarEvent)
    if (code === SUCCESS_CODE) {
      clear()
      updateEventList()
    }
  }

  const onClose = () => {
    clear()
  }
  return (
    <>
      {
        (createPopoverRefV3 && showCreatePopoverV3) && (
          <div
            style={{ top, left, }}
            className={className}
            ref={eventRef}>
            <CreatePopoverContent
              setEventKeyValue={setEventKeyValue}
              event={createdEvent as CalendarEvent}
              onClose={onClose}
              onConfirm={onConfirm}
            />
          </div>
        )
      }
    </>
  )
}
